/* ============================================================
   Grassfed — Just Listed / Just Sold signup funnel
   Demo only — no DB writes, no real lookups. All numbers fake.
   ============================================================ */

const state = {
  address: '',
  neighborCount: 0,
  visibleAddrs: [],
  blurredAddrs: [],
};

// ---------- Helpers ----------

/** Deterministic 32-bit hash of a string (FNV-1a). */
function hash32(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  return h;
}

/** Pseudo-random odd neighbor count derived from address. Range ~350–650. */
function neighborCountFor(addr) {
  const h = hash32(addr.toLowerCase().trim());
  const range = 300; // 350..650
  let n = 350 + (h % range);
  if (n % 2 === 0) n += 1;
  return n;
}

/** Seeded RNG for deterministic fake-address generation per input. */
function makeRng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xFFFFFFFF;
  };
}

const STREET_NAMES = [
  'Maple', 'Oak', 'Cedar', 'Pine', 'Birch', 'Willow', 'Aspen', 'Hickory',
  'Magnolia', 'Cypress', 'Sycamore', 'Juniper', 'Laurel', 'Linden',
  'Briarwood', 'Crestview', 'Highland', 'Ridgemont', 'Stonebrook',
  'Foxglove', 'Heatherfield', 'Wynnewood', 'Glenbrook', 'Hollyhock',
];
const STREET_SUFFIX = ['Dr', 'Ln', 'Ct', 'Way', 'Ave', 'Cir', 'Pl', 'Trl'];

/** Generate N fake addresses near the given input. Deterministic per input. */
function fakeNearby(inputAddr, n) {
  const rng = makeRng(hash32(inputAddr.toLowerCase().trim()));
  // Try to infer trailing city/state from input — fallback generic.
  const m = inputAddr.match(/,(.+)$/);
  const tail = m ? m[1].trim() : 'Austin, TX 78704';
  const out = [];
  for (let i = 0; i < n; i++) {
    const houseNum = Math.floor(100 + rng() * 9800);
    const street = STREET_NAMES[Math.floor(rng() * STREET_NAMES.length)];
    const suffix = STREET_SUFFIX[Math.floor(rng() * STREET_SUFFIX.length)];
    out.push(`${houseNum} ${street} ${suffix}, ${tail}`);
  }
  return out;
}

// ---------- Screen transitions ----------

function goTo(screen) {
  document.body.dataset.screen = screen;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// ---------- Screen 1: Hook ----------

document.getElementById('addr-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('addr-input');
  const v = input.value.trim();
  if (!v) {
    input.focus();
    return;
  }
  state.address = v;
  startReveal(v);
});

/* ===== Live reply feed (social proof on screen 1) =====
   Rolling stack of fake "agent X just got reply Y" cards.
   New card every ~3.5s; oldest fades out at top. */

const FEED_AGENTS = [
  { name: 'Sarah Jenkins',   loc: 'Sacramento, CA',  initials: 'SJ' },
  { name: 'Mike Roberts',    loc: 'Tampa, FL',        initials: 'MR' },
  { name: 'Aisha Patel',     loc: 'San Jose, CA',     initials: 'AP' },
  { name: 'Diego Hernandez', loc: 'Austin, TX',       initials: 'DH' },
  { name: 'Kelly O\'Brien',  loc: 'Boston, MA',       initials: 'KO' },
  { name: 'Marcus Chen',     loc: 'Seattle, WA',      initials: 'MC' },
  { name: 'Tasha Williams',  loc: 'Atlanta, GA',      initials: 'TW' },
  { name: 'Ben Stoltz',      loc: 'Denver, CO',       initials: 'BS' },
  { name: 'Priya Shah',      loc: 'Chicago, IL',      initials: 'PS' },
  { name: 'Hank Murphy',     loc: 'Nashville, TN',    initials: 'HM' },
  { name: 'Lena Brooks',     loc: 'Phoenix, AZ',      initials: 'LB' },
  { name: 'Yusef Adams',     loc: 'Charlotte, NC',    initials: 'YA' },
];

const FEED_SNIPPETS = [
  '"Hi, we\'ve actually been thinking about selling next spring — what would you list us at?"',
  '"Yes please send me the comp. We\'re curious."',
  '"How did you get our address? But yeah, send me your card."',
  '"We just refinanced but might be interested in a year. Stay in touch."',
  '"My neighbor just sold for over ask — what do you think we\'d get?"',
  '"Send me a free CMA when you have a sec."',
  '"My in-laws on the block are downsizing — I\'ll pass you their info."',
  '"Interested. Can you call me Thursday after 5?"',
  '"We saw the sign on the corner — is the buyer looking for more in the neighborhood?"',
  '"Yes I\'d love to know what our place is worth. Email it over."',
  '"Funny you should ask — we were just talking about listing."',
  '"Not selling but my cousin in the next town over is — DM me."',
];

const MAX_FEED_CARDS = 5;
let feedReplyNum = 14;
let feedCardId = 0;
const liveFeedState = { stack: [] };

function randItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function relTime(secAgo) {
  if (secAgo < 60) return `${secAgo}s ago`;
  if (secAgo < 3600) return `${Math.floor(secAgo / 60)}m ago`;
  return `${Math.floor(secAgo / 3600)}h ago`;
}

function buildFeedCard(opts = {}) {
  const agent = randItem(FEED_AGENTS);
  const snippet = randItem(FEED_SNIPPETS);
  feedReplyNum += Math.floor(Math.random() * 3) + 1;
  const id = ++feedCardId;
  const secAgo = opts.initialSecAgo != null ? opts.initialSecAgo : 0;

  const el = document.createElement('div');
  el.className = 'feed-card';
  el.dataset.id = id;
  el.dataset.born = String(Date.now() - secAgo * 1000);
  el.innerHTML = `
    <div class="feed-avatar">${escapeHtml(agent.initials)}</div>
    <div class="feed-body">
      <div class="feed-row1">
        <span class="feed-name">${escapeHtml(agent.name)}</span>
        <span class="feed-loc">${escapeHtml(agent.loc)}</span>
      </div>
      <div class="feed-snippet">${escapeHtml(snippet)}</div>
    </div>
    <div class="feed-right">
      <span class="feed-reply-badge">Reply #${feedReplyNum}</span>
      <span class="feed-time">${relTime(secAgo)}</span>
    </div>
  `;
  return el;
}

function pushFeedCard(opts = {}) {
  const stack = document.getElementById('feed-stack');
  if (!stack) return;

  const isSeed = opts.initialSecAgo != null;

  // FLIP — capture existing positions before mutation.
  const existing = Array.from(stack.querySelectorAll('.feed-card'));
  const firstTops = existing.map((c) => c.getBoundingClientRect().top);

  // Build new card + insert at top.
  const card = buildFeedCard(opts);
  stack.insertBefore(card, stack.firstChild);

  // FLIP — invert existing cards to their old visual positions.
  if (!isSeed && existing.length > 0) {
    existing.forEach((c, i) => {
      const lastTop = c.getBoundingClientRect().top;
      const dy = firstTops[i] - lastTop;
      if (dy === 0) return;
      c.style.transition = 'none';
      c.style.transform = `translateY(${dy}px)`;
    });
    // Force layout commit, then PLAY (clear inverted transforms so they animate back).
    void stack.offsetHeight;
    requestAnimationFrame(() => {
      existing.forEach((c) => {
        c.style.transition = '';
        c.style.transform = '';
      });
    });
  }

  // Mark previous freshest as no-longer-fresh, this one is fresh (only for live additions).
  if (!isSeed) {
    stack.querySelectorAll('.feed-card.fresh').forEach((c) => c.classList.remove('fresh'));
    card.classList.add('fresh');
  }

  // Trigger entrance on the new card.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => card.classList.add('in'));
  });

  // Evict overflow from the bottom.
  const all = stack.querySelectorAll('.feed-card');
  if (all.length > MAX_FEED_CARDS) {
    for (let i = MAX_FEED_CARDS; i < all.length; i++) {
      const old = all[i];
      if (old.dataset.evicting) continue;
      old.dataset.evicting = '1';
      old.classList.add('leaving');
      setTimeout(() => old.remove(), 460);
    }
  }
}

function startLiveFeed() {
  // Seed with 4 cards, increasing age top→bottom.
  const seedAges = [8, 42, 95, 180];
  for (let i = seedAges.length - 1; i >= 0; i--) {
    pushFeedCard({ initialSecAgo: seedAges[i] });
  }

  // Roll cards in periodically.
  function loop() {
    pushFeedCard();
    refreshFeedTimes();
    setTimeout(loop, 3000 + Math.random() * 2200);
  }
  setTimeout(loop, 3200);

  // Tick relative timestamps every 12s.
  setInterval(refreshFeedTimes, 12000);

  // Gently bump the LIVE campaigns counter every 18-30s.
  const liveEl = document.getElementById('live-campaigns');
  function bump() {
    if (liveEl) {
      const n = parseInt(liveEl.textContent, 10) || 27;
      liveEl.textContent = String(n + 1);
    }
    setTimeout(bump, 18000 + Math.random() * 12000);
  }
  setTimeout(bump, 22000);
}

function refreshFeedTimes() {
  document.querySelectorAll('.feed-card').forEach((card) => {
    const born = parseInt(card.dataset.born, 10);
    if (!born) return;
    const secAgo = Math.max(0, Math.floor((Date.now() - born) / 1000));
    const tEl = card.querySelector('.feed-time');
    if (tEl) tEl.textContent = relTime(secAgo);
  });
}

// Kick off live feed once DOM is ready.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startLiveFeed);
} else {
  startLiveFeed();
}

// ---------- Screen 5: Success + fake Calendly ----------

function hydrateSuccess() {
  const addrEl = document.getElementById('success-addr');
  if (addrEl) addrEl.textContent = state.address || 'your listing address';
  renderCalendly();
}

function renderCalendly() {
  const grid = document.getElementById('calendly-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const today = new Date();
  const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const slots = ['9:00a', '10:30a', '12:00p', '1:30p', '3:00p', '4:30p'];

  // Build 5 weekday columns starting from today, skipping weekends.
  let added = 0;
  let cursor = new Date(today);
  while (added < 5) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) {
      const col = document.createElement('div');
      col.className = 'cal-col';

      const day = document.createElement('div');
      day.className = 'cal-day';
      day.innerHTML = `
        <div class="cal-day-dow">${DOW[dow]}</div>
        <div class="cal-day-num">${cursor.getDate()}</div>
      `;
      col.appendChild(day);

      // Pick 2-3 available slots per day (seeded by date).
      const slotPicks = pickSlots(cursor, slots);
      slotPicks.forEach((t) => {
        const slot = document.createElement('button');
        slot.type = 'button';
        slot.className = 'cal-slot';
        slot.textContent = t;
        slot.dataset.date = cursor.toDateString();
        slot.dataset.time = t;
        slot.addEventListener('click', () => selectSlot(slot));
        col.appendChild(slot);
      });

      grid.appendChild(col);
      added++;
    }
    cursor.setDate(cursor.getDate() + 1);
  }
}

function pickSlots(date, allSlots) {
  // Deterministic pseudo-availability: each day shows 3 random slots.
  const seed = date.getFullYear() * 372 + (date.getMonth() + 1) * 31 + date.getDate();
  const rng = makeRng(seed);
  const shuffled = [...allSlots].sort(() => rng() - 0.5);
  return shuffled.slice(0, 3).sort((a, b) => allSlots.indexOf(a) - allSlots.indexOf(b));
}

function selectSlot(slot) {
  document.querySelectorAll('.cal-slot.selected').forEach((s) => s.classList.remove('selected'));
  slot.classList.add('selected');
  const btn = document.getElementById('calendly-confirm');
  btn.disabled = false;
  btn.innerHTML = `Confirm ${slot.dataset.time} on ${slot.dataset.date.split(' ').slice(0, 3).join(' ')} <span class="arrow">→</span>`;
}

document.getElementById('calendly-confirm').addEventListener('click', () => {
  const slot = document.querySelector('.cal-slot.selected');
  if (!slot) return;
  const btn = document.getElementById('calendly-confirm');
  btn.innerHTML = '✓ Booked. Calendar invite incoming.';
  btn.disabled = true;
  btn.style.background = 'var(--success)';
});

document.getElementById('skip-onboarding').addEventListener('click', (e) => {
  e.preventDefault();
  alert('(Demo) This would land in your Grassfed portal.');
});

// ---------- Stripe redirect handling ----------

(function handleStripeReturn() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get('status');
  if (status === 'success') {
    // Recover address from localStorage (Stripe redirect wiped state).
    const saved = localStorage.getItem('grsfd_signup_addr');
    if (saved) state.address = saved;
    hydrateSuccess();
    goTo('success');
    // Clean the URL so a refresh doesn't re-trigger.
    window.history.replaceState({}, '', '/signup/');
  } else if (status === 'canceled') {
    const saved = localStorage.getItem('grsfd_signup_addr');
    if (saved) state.address = saved;
    hydratePromo();
    goTo('promo');
    window.history.replaceState({}, '', '/signup/');
  }
})();

// ---------- Screen 2: Reveal (loader + reveal phases) ----------

function startReveal(addr) {
  goTo('reveal');

  // Stamp the address into the loader.
  document.getElementById('loader-addr').textContent = addr;
  document.getElementById('reveal-addr').textContent = addr;

  // Ensure loader is visible and reveal is hidden.
  const loader = document.querySelector('.loader-wrap');
  const reveal = document.querySelector('.reveal-wrap');
  loader.hidden = false;
  reveal.hidden = true;

  // Reset step states.
  document.querySelectorAll('.loader-steps li').forEach((li) => {
    li.classList.remove('active', 'done');
  });

  // Sequence loader steps. Total ~2.4s.
  const steps = Array.from(document.querySelectorAll('.loader-steps li'));
  const stepDur = 600;
  steps.forEach((li, i) => {
    setTimeout(() => {
      // Mark previous as done
      if (i > 0) steps[i - 1].classList.replace('active', 'done');
      // Activate current
      li.classList.add('active');
    }, i * stepDur);
  });
  // Finalize: mark last as done, then reveal.
  setTimeout(() => {
    steps[steps.length - 1].classList.replace('active', 'done');
  }, steps.length * stepDur);

  setTimeout(() => {
    loader.hidden = true;
    reveal.hidden = false;
    runReveal(addr);
  }, steps.length * stepDur + 350);
}

function runReveal(addr) {
  // Compute neighbor count + addresses.
  const count = neighborCountFor(addr);
  state.neighborCount = count;
  state.visibleAddrs = fakeNearby(addr, 3);
  state.blurredAddrs = fakeNearby(addr + '::blurred', 5);

  // Render the address list.
  const listEl = document.getElementById('addr-list');
  listEl.innerHTML = '';
  state.visibleAddrs.forEach((a) => {
    listEl.appendChild(rowItem(a, false));
  });
  state.blurredAddrs.forEach((a) => {
    listEl.appendChild(rowItem(a, true));
  });
  const remaining = count - state.visibleAddrs.length;
  const footer = document.createElement('div');
  footer.className = 'addr-list-footer';
  footer.textContent = `+ ${remaining.toLocaleString()} more neighbors with valid emails`;
  listEl.appendChild(footer);

  // Animate counter.
  animateCounter(document.getElementById('neighbor-count'), 0, count, 1600);

  // Render + animate the neighborhood hit-map.
  renderHitMap(addr, count);
}

/**
 * Hit-map: dot grid representing the neighborhood.
 * ~93% hits (green) / ~7% misses (grey) — visually "very high hit rate."
 * Dots stagger-fade in with a small per-dot random delay (1.4s total spread).
 */
function renderHitMap(addr, count) {
  const COLS = 20;
  const ROWS = 14;
  const TOTAL = COLS * ROWS; // 280

  // Hit rate sits in a tight 91–96% band, deterministic per address.
  const rng = makeRng(hash32(addr.toLowerCase().trim()) ^ 0xC0FFEE);
  const hitRate = 0.91 + rng() * 0.05;
  const hitCount = Math.round(TOTAL * hitRate);

  // Build hit/miss assignment, then shuffle.
  const cells = new Array(TOTAL);
  for (let i = 0; i < TOTAL; i++) cells[i] = i < hitCount ? 'hit' : 'miss';
  // Fisher-Yates with the seeded RNG so the pattern is stable per address.
  for (let i = TOTAL - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  const map = document.getElementById('hit-map');
  map.innerHTML = '';
  map.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;

  const frag = document.createDocumentFragment();
  cells.forEach((kind, i) => {
    const d = document.createElement('span');
    d.className = `dot dot-${kind}`;
    // Small organic stagger: dots near the center light up sooner.
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const cx = (COLS - 1) / 2;
    const cy = (ROWS - 1) / 2;
    const dist = Math.sqrt((col - cx) ** 2 + (row - cy) ** 2);
    const maxDist = Math.sqrt(cx * cx + cy * cy);
    const radial = dist / maxDist;            // 0 center, 1 edge
    const jitter = rng() * 0.45;
    const delay = (radial * 0.9 + jitter) * 1200; // 0..~1400ms
    d.style.transitionDelay = `${delay.toFixed(0)}ms`;
    frag.appendChild(d);
  });
  map.appendChild(frag);

  // Trigger the fade-in on next frame.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      map.querySelectorAll('.dot').forEach((d) => d.classList.add('in'));
    });
  });

  // Animate the hit-rate readout.
  const rateEl = document.getElementById('hit-rate');
  const ratePct = Math.round(hitRate * 100);
  animateCounter(rateEl, 0, ratePct, 1600, (v) => `${v}% hit rate`);
}

function rowItem(addr, blurred) {
  const el = document.createElement('div');
  el.className = 'addr-row-item' + (blurred ? ' blurred' : '');
  el.innerHTML = `
    <span class="check">✓</span>
    <span class="addr-text">${escapeHtml(addr)}</span>
    <span class="badge">EMAIL ✓</span>
  `;
  return el;
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function animateCounter(el, from, to, ms, fmt) {
  const format = fmt || ((v) => v.toLocaleString());
  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / ms);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
    const val = Math.floor(from + (to - from) * eased);
    el.textContent = format(val);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = format(to);
  }
  requestAnimationFrame(tick);
}

// ---------- Screen 2 CTA → Screen 3 ----------
document.getElementById('reveal-cta').addEventListener('click', () => {
  hydratePromo();
  goTo('promo');
});

// ---------- Screen 3: Promo / pre-checkout ----------

function hydratePromo() {
  // Stamp their address into the locked listing #1.
  const addrEl = document.getElementById('promo-addr-1');
  if (addrEl) addrEl.textContent = state.address || 'Your listing address';
}

// Optional listing slot toggles.
document.querySelectorAll('.listing-add-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const slot = btn.dataset.add;
    const listing = btn.closest('.listing');
    const inputWrap = listing.querySelector('.listing-input-wrap');
    const hint = listing.querySelector('.listing-hint');
    btn.hidden = true;
    if (hint) hint.hidden = true;
    inputWrap.hidden = false;
    const input = inputWrap.querySelector('.listing-input');
    input.focus();
  });
});

document.querySelectorAll('.listing-input').forEach((input) => {
  input.addEventListener('input', () => {
    const listing = input.closest('.listing');
    if (input.value.trim()) {
      listing.classList.remove('empty');
      listing.classList.add('filled');
    } else {
      listing.classList.remove('filled');
      listing.classList.add('empty');
    }
  });
});

document.querySelectorAll('.listing-clear').forEach((btn) => {
  btn.addEventListener('click', () => {
    const slot = btn.dataset.clear;
    const listing = btn.closest('.listing');
    const input = listing.querySelector('.listing-input');
    const inputWrap = listing.querySelector('.listing-input-wrap');
    const addBtn = listing.querySelector('.listing-add-btn');
    const hint = listing.querySelector('.listing-hint');
    input.value = '';
    inputWrap.hidden = true;
    if (addBtn) addBtn.hidden = false;
    if (hint) hint.hidden = false;
    listing.classList.remove('filled');
    listing.classList.add('empty');
  });
});

// CTA → checkout (wired in next step)
document.getElementById('promo-cta').addEventListener('click', async () => {
  const btn = document.getElementById('promo-cta');
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = 'Opening checkout…';
  try {
    await startCheckout();
  } catch (err) {
    console.error('Checkout error:', err);
    btn.innerHTML = original;
    btn.disabled = false;
    alert('Checkout failed to open. Check console.');
  }
});

async function startCheckout() {
  // Collect optional listings.
  const optionalListings = [];
  document.querySelectorAll('.listing-input').forEach((input) => {
    const v = input.value.trim();
    if (v) optionalListings.push(v);
  });

  // Persist address so we can recover it after the Stripe redirect.
  if (state.address) localStorage.setItem('grsfd_signup_addr', state.address);

  const payload = {
    primaryAddress: state.address,
    optionalListings,
  };

  const res = await fetch('/api/checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Checkout session creation failed: ${res.status} — ${txt}`);
  }

  const data = await res.json();

  // Mock mode (no STRIPE_SECRET_KEY) → show the local mock-checkout screen.
  if (data.mock) {
    hydrateMockCheckout();
    goTo('checkout');
    // Reset the promo CTA in case user comes back.
    const promoBtn = document.getElementById('promo-cta');
    promoBtn.disabled = false;
    promoBtn.innerHTML = 'Continue to secure checkout — $825 <span class="arrow">→</span>';
    return;
  }

  if (!data.url) throw new Error('No checkout URL returned');
  window.location.href = data.url;
}

// ---------- Screen 4: Mock Stripe checkout ----------

function hydrateMockCheckout() {
  const addrEl = document.getElementById('mock-addr');
  if (addrEl) addrEl.textContent = state.address || 'your listing address';
}

document.getElementById('mock-back').addEventListener('click', () => {
  goTo('promo');
});

document.getElementById('mock-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('mock-pay');
  const label = btn.querySelector('.mock-pay-label');
  const spinner = btn.querySelector('.mock-pay-spinner');
  btn.disabled = true;
  label.textContent = 'Processing…';
  spinner.hidden = false;
  setTimeout(() => {
    label.textContent = '✓ Payment confirmed';
    setTimeout(() => {
      hydrateSuccess();
      goTo('success');
      // Reset the button for any future re-entries.
      btn.disabled = false;
      label.textContent = 'Pay $825.00';
      spinner.hidden = true;
    }, 600);
  }, 1400);
});
