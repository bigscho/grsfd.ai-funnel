#!/usr/bin/env python3
"""Replace the fake setTimeout form handler in an opt-in HTML file with a real
POST to /api/optin. Also adds a territory-zip field to the farm form.

Usage: wire-optin.py <grsfd|grsfd-farm> <path-to-01-optin.html>
"""
import re
import sys
from pathlib import Path

VARIANT, TARGET = sys.argv[1], Path(sys.argv[2])
html = TARGET.read_text()

# 1. Add an explicit Territory ZIP field to the farm form (after phone).
if VARIANT == "grsfd-farm" and 'name="zip"' not in html:
    phone_block = re.search(
        r'(<div class="field required">\s*<label>Phone</label>[^<]*<input name="phone"[^/]*/>\s*</div>)',
        html,
    )
    if phone_block:
        zip_block = (
            '\n      <div class="field required">\n'
            '        <label>Territory ZIP codes</label>\n'
            '        <input name="zip" placeholder="85251, 85254, 85255" required/>\n'
            '      </div>'
        )
        html = html.replace(phone_block.group(1), phone_block.group(1) + zip_block)

# 2. Replace the fake-submit <script> with a real fetch() handler.
if VARIANT == "grsfd":
    new_script = '''<script>
  // Pre-fill MLS from querystring into the form field
  const mls = new URLSearchParams(location.search).get('mls');
  const mlsInput = document.getElementById('mls-input');
  if (mls && mlsInput) mlsInput.value = mls;

  document.getElementById('optin').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type=submit]');
    const label = btn.querySelector('.btn-label');
    btn.disabled = true;
    label.textContent = 'Unlocking…';

    const data = Object.fromEntries(new FormData(e.target));
    const payload = { ...data, source: 'grsfd' };

    try {
      const res = await fetch('/api/optin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Submit failed');
    } catch (err) {
      console.error(err);
      label.textContent = 'Something went wrong — try again';
      btn.disabled = false;
      return;
    }

    const qs = new URLSearchParams({ mls: data.mlsId || '', ...data }).toString();
    location.href = '/unlock/results?' + qs;
  });
</script>'''
else:  # grsfd-farm
    new_script = '''<script>
  // Pre-fill zip from querystring (e.g. /farm/unlock?zip=85251)
  const zip = new URLSearchParams(location.search).get('zip');
  if (zip) {
    const zipInput = document.querySelector('input[name="zip"]');
    if (zipInput) zipInput.value = zip;
  }

  document.getElementById('optin').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type=submit]');
    const label = btn.querySelector('.btn-label');
    btn.disabled = true;
    label.textContent = 'Unlocking…';

    const data = Object.fromEntries(new FormData(e.target));
    const zipValue = (data.zip && String(data.zip).trim()) || zip || '';
    const payload = { ...data, zip: zipValue, source: 'grsfd-farm' };

    try {
      const res = await fetch('/api/optin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Submit failed');
    } catch (err) {
      console.error(err);
      label.textContent = 'Something went wrong — try again';
      btn.disabled = false;
      return;
    }

    const qs = new URLSearchParams({ ...(zipValue ? { zip: zipValue } : {}), ...data }).toString();
    location.href = '/farm/unlock/results?' + qs;
  });
</script>'''

html = re.sub(
    r"<script>\s*(?:// [^\n]*\n\s*)*(?:const mls[^\n]*\n\s*)?[^<]*?document\.getElementById\('optin'\)\.addEventListener\('submit',.*?</script>",
    lambda _m: new_script,
    html,
    count=1,
    flags=re.DOTALL,
)

TARGET.write_text(html)
print(f"wired {VARIANT} -> {TARGET}")
