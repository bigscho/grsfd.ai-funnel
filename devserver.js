#!/usr/bin/env node
// Local dev server for grsfd-funnel.
// Serves /public statically + routes /api/* to ./api/*.js Vercel-style handlers.
//
// Usage:
//   node devserver.js              # listens on :4321
//   PORT=5000 node devserver.js
//
// Auto-loads .env.local into process.env if present.

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 4321;
const PUBLIC_DIR = path.join(__dirname, 'public');
const API_DIR = path.join(__dirname, 'api');

// --- Load .env.local (if present) ---
const envPath = path.join(__dirname, '.env.local');
if (existsSync(envPath)) {
  const lines = readFileSync(envPath, 'utf8').split('\n');
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
  console.log('  loaded .env.local');
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

/** Wrap node's ServerResponse to give it Vercel-style status().json() helpers. */
function vercelify(res) {
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (obj) => {
    if (!res.getHeader('Content-Type')) res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(obj));
    return res;
  };
  res.send = (body) => { res.end(body); return res; };
  return res;
}

async function handleApi(req, res, pathname) {
  // Strip /api/ prefix, append .js to find the handler file.
  const name = pathname.replace(/^\/api\//, '').replace(/\/+$/, '');
  const file = path.join(API_DIR, `${name}.js`);
  if (!existsSync(file)) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: `No API handler: /api/${name}` }));
    return;
  }

  // Parse body (Vercel auto-parses JSON for application/json).
  let body = null;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const raw = await readBody(req);
    const ct = req.headers['content-type'] || '';
    if (ct.includes('application/json')) {
      try { body = JSON.parse(raw); } catch { body = raw; }
    } else if (ct.includes('application/x-www-form-urlencoded')) {
      body = Object.fromEntries(new URLSearchParams(raw));
    } else {
      body = raw;
    }
  }
  req.body = body;

  vercelify(res);
  try {
    // Dynamic import each request (so edits to handlers reload). Cache-bust via timestamp.
    const url = pathToFileURL(file).href + `?t=${Date.now()}`;
    const mod = await import(url);
    const handler = mod.default;
    if (typeof handler !== 'function') {
      throw new Error(`Handler at ${name}.js does not export a default function`);
    }
    await handler(req, res);
  } catch (err) {
    console.error(`[api/${name}]`, err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: err.message || 'Handler error' }));
    }
  }
}

async function handleStatic(req, res, pathname) {
  // Resolve filesystem path safely under public/.
  let rel = decodeURIComponent(pathname);
  if (rel === '/' || rel === '') rel = '/index.html';
  // If path ends with / try index.html
  if (rel.endsWith('/')) rel += 'index.html';

  let fsPath = path.join(PUBLIC_DIR, rel);
  if (!fsPath.startsWith(PUBLIC_DIR)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  // If the path has no extension, try .html or directory/index.html (mimics vercel cleanUrls).
  let stats;
  try {
    stats = await stat(fsPath);
  } catch {
    if (!path.extname(fsPath)) {
      const tries = [`${fsPath}.html`, path.join(fsPath, 'index.html')];
      for (const t of tries) {
        try {
          stats = await stat(t);
          fsPath = t;
          break;
        } catch {}
      }
    }
  }
  if (!stats) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
    return;
  }
  if (stats.isDirectory()) {
    fsPath = path.join(fsPath, 'index.html');
    try {
      await stat(fsPath);
    } catch {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }
  }
  const ext = path.extname(fsPath).toLowerCase();
  const ct = MIME[ext] || 'application/octet-stream';
  const data = await readFile(fsPath);
  res.statusCode = 200;
  res.setHeader('Content-Type', ct);
  res.setHeader('Cache-Control', 'no-cache');
  res.end(data);
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const started = Date.now();
    if (pathname.startsWith('/api/')) {
      await handleApi(req, res, pathname);
    } else {
      await handleStatic(req, res, pathname);
    }
    console.log(`  ${req.method} ${pathname} → ${res.statusCode} (${Date.now() - started}ms)`);
  } catch (err) {
    console.error('  unhandled:', err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end('Server error');
    }
  }
});

server.listen(PORT, () => {
  console.log(`\n  grsfd-funnel dev server`);
  console.log(`  → http://localhost:${PORT}/`);
  console.log(`  → http://localhost:${PORT}/signup/`);
  if (!process.env.STRIPE_SECRET_KEY) {
    console.log(`\n  ⚠ STRIPE_SECRET_KEY not set. Drop sk_test_... in .env.local to enable checkout.\n`);
  } else {
    console.log(`  ✓ Stripe key loaded (test mode: ${process.env.STRIPE_SECRET_KEY.startsWith('sk_test_')})\n`);
  }
});
