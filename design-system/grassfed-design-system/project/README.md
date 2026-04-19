# Grassfed Design System

Brand & UI system for **Grassfed (grsfd.ai)** — agentic AI cold email for real estate agents, at neighborhood and large scale.

---

## The company

Grassfed builds **agentic AI cold email** targeting homeowners for real estate professionals. Agents feed it a neighborhood, zip, or large-scale farming area; the system pulls homeowner records, drafts personalized outbound at volume, and sends. The pitch is **data + automation displacing postcards** — same intent, way more reach, a fraction of the cost.

### Product family

| Brand | What it is | Audience |
|---|---|---|
| **grsfd.ai** | Parent company / marketing site | Prospects, investors |
| **grsfd** | Core offer — neighborhood-scale cold email | Solo agents, small teams |
| **grsfd farm** | Large-scale "farming" offering for bigger territories | Brokerages, teams scaling outreach |
| _Market-intel chat_ | Free-tier lead-capture chat ("tell me a city, I'll show you the data") | Top of funnel |

### Sources the system was built from

- `uploads/grassfed-brand-palette.json` — canonical color tokens + type suggestions
- `uploads/Index.tsx` — source of the chat product (Header, WelcomeHero, QueryFormCard, EmailCaptureCard, CTAWallCard, ChatInput). Preserved at `reference/Index.tsx`
- **Logos** (user-uploaded, low-res PNGs at 135×90) — copied into `assets/logos/`. **Flagged: need SVG / high-res transparent versions.**
- `uploads/grsfd.ai.zip` — referenced but not received at build time; when re-attached, extract additional marketing components into `reference/`

---

## Index — what's in this folder

```
assets/
  logos/                 all six logo variants (grsfd, grsfd.ai, grsfd farm × light/dark)
  grassfed-brand-palette.json
colors_and_type.css      single stylesheet of design tokens + semantic type
preview/                 card HTMLs that populate the Design System tab
ui_kits/
  marketing/             grsfd.ai homepage recreation
  grsfd-core/            core cold-email dashboard
  grsfd-farm/            large-scale farming product
  chat/                  free-tier market-intel chat (from Index.tsx)
slides/                  pitch-deck template
reference/               original source files preserved for reference
README.md                this file
SKILL.md                 Agent Skill manifest
```

---

## Content fundamentals

**Voice: Premium & confident, data-driven, modern.** Every line earns its place. We lead with numbers when we have them. We sound like an ops-savvy operator, not a SaaS marketer.

### Rules

- **You, not we.** Address the agent directly. _"See how many emails are in your exact farm area"_ — not _"we help you see"_.
- **Numbers, always.** If a claim can be quantified, quantify it. _"~4,050 homeowner emails"_ > _"a lot of emails"_.
- **Sentence case.** Never Title Case UI copy. "Send a test email", not "Send A Test Email". Brand marks are lowercase: `grsfd`, `grsfd.ai`, `grsfd farm`.
- **Short paragraphs, breathing room.** The chat's `formatResponse` helper literally forces blank lines around bullets and bold counts — treat this as a house rule, not a bug.
- **Brand name interchange.** We use **"Grassfed"** (Title Case) in prose, storytelling, and when the audience is new to us — "Grassfed is agentic AI cold email". We use **"grsfd"** (lowercase, no periods except in `grsfd.ai`) in product chrome, logos, nav, UI, and once the reader knows who we are. Both are canonical; pick the one that fits the voice of the line. Full company is `grsfd.ai`; core offer is `grsfd`; large-scale is `grsfd farm`. Never `Grsfd`, never `GRSFD`.
- **No hedging.** Drop "just", "simply", "maybe", "kind of". If it's true, say it.
- **Comparative framing beats superlatives.** _"Way more homeowners, way faster, for way less than postcards cost"_ — the product has a clear foil (direct mail), use it.
- **Emoji: rare, intentional.** The only emoji in the product (`📬 📈 🔒 💡 🏡`) appear as P.S. markers in long AI responses. Don't scatter them in UI chrome.
- **Real-estate vocabulary, not tech-bro.** "Farm area", "homeowner", "outreach", "territory" — not "users", "leads", "prospects".

### Examples (verbatim from product)

> "AI real estate data & cold email is here."
>
> "See how many emails are in your exact farm area."
>
> "Use AI cold email to hit way more homeowners, way faster, for way less than what postcards cost."

> "I'd love to help you explore your market! Tell me a city or zip code and I'll pull up the homeowner data for you."

> "That's a **12×** lift over a typical postcard send."

Notice: contractions, em-dashes sparingly, bold for the number (never the adjective), direct imperative openers.

---

## Visual foundations

### Color

Anchored in **brand green** — a deep, desaturated teal-green (`#1A5A50` foreground, `#0F3A29` navbar/footer dark). The lime accent (`#62A930`) is the **only** bright color and it does one job: mark **what's alive** — active states, data highlights, the word _Farm_, accent brackets in the logo, hover glows. Never use lime for large areas.

- **Warm off-white** (`#F6F5F1`) as the surface. Pure white is reserved for _cards_ — this elevation rule matters.
- **Dark mode = brand dark green**, not black. Navbar/footer/hero strips use `#0F3A29`. We don't ship a full dark theme; we ship dark surfaces _within_ the light app.
- **Shadows are green-tinted**, never neutral black — they should read as _under the surface_, not clipped out.

### Typography

- **Display: Space Grotesk** — geometric, slightly quirky, reads confident without being loud. Used for H1–H3, hero numbers, dashboard metric values.
- **Body: Inter** — workhorse for all UI copy, forms, tables, chat bubbles.
- **Mono: JetBrains Mono** — data tables, IDs, API fields.

Type scale jumps hard from body (16px) to display (48–80px) — premium brands use the gap to create drama. Avoid the middle. Tracking is tight (`-0.02em`) on large display; eyebrows go ALL CAPS at `0.12em` tracking, lime accent color.

**Substitution flag:** The original palette suggested _League Spartan_ as a third family. It's omitted — Space Grotesk already carries the display role and a third family dilutes the identity. The logo provides brand personality in the wordmark; type doesn't need to. **If you want League Spartan back, flag it and I'll add it as `--font-brand`.**

### Backgrounds

- **Surface = flat warm off-white with a subtle noise overlay** (`.noise-overlay`, SVG turbulence at ~4% opacity, multiply blend). Gives the page a printed-paper warmth without texture tropes.
- **Dark hero strips** use solid `--dark` — no gradient, no texture. The darkness is the statement.
- **Data-viz sections** use the `--grad-subtle` behind charts — barely-there green tint that reads as "data canvas".
- **`--grad-primary`** (green → lime, 135°) is reserved for one-per-page hero moments and premium CTAs. Never on small UI.

### Borders, corners, radii

- **Default radius: 10px** (`--radius-md`). Cards, inputs, buttons.
- **Pills: full rounded** (`--radius-full`) — for badges, filter chips, status tags.
- **Hero cards: 20–28px** — generous rounding signals premium.
- **Borders: 1px `--border`** (`#CED9D4`). Never pure gray — always the green-tinted neutral.
- **No double borders.** If it has a shadow, it doesn't need a border.

### Shadows & elevation

Three-tier elevation: **flat → card → floating**.
- `--shadow-sm` cards on surface, `--shadow-md` hover-raised cards, `--shadow-lg` modals/popovers, `--shadow-xl` command palette / major overlays. All tinted green.
- `--shadow-glow` is the accent focus ring — `0 0 0 4px` lime at 25% alpha. Use on focus, never on hover.

### Motion

- **Ease: `cubic-bezier(0.22, 1, 0.36, 1)`** (ease-out) for 95% of UI. Snap into place, settle.
- **Spring** (`--ease-spring`) is used sparingly for delightful micro-moments — toasts, checkmark fills, never on layout.
- **Durations: 120ms / 200ms / 360ms**. Most hovers are 120ms; state changes 200ms; enter/exit 360ms.
- **No bounces on primary actions.** Primary CTAs are snappy; the accent glow + subtle lift says "ready".
- Respect `prefers-reduced-motion`.

### Interaction states

| State | Treatment |
|---|---|
| Hover (primary btn) | `--primary-hover` (darken ~4%) + translate-Y(-1px) + `--shadow-md` |
| Hover (accent/lime) | `--accent-glow` + subtle brightness |
| Hover (ghost btn) | Background fades to `--secondary` |
| Press | Translate-Y(0), `--shadow-inner`, 90ms ease-out |
| Focus | `--shadow-glow` (lime focus ring, 4px) |
| Disabled | Opacity 0.5, cursor not-allowed, no hover |
| Loading | Spinner in-place; never swap button text mid-click |

### Layout

- **Content max-width: 1200px** for marketing, `max-w-3xl` (768px) for chat & forms. Side padding: 16px mobile → 24px → 32px.
- **8-column grid on desktop**, 4 on tablet, 1 on mobile. Gaps from `--space-6` (24px).
- **Vertical rhythm anchored on `--space-12` (48px)** between major sections; `--space-6` between cards within a section.
- **Sticky header** (`--dark`, full-width), **full-width dark footer**. The middle of the page is bright and airy.

### Transparency & blur

- **Sparingly.** Use `backdrop-filter: blur(12px)` only on the sticky header when scrolled, and on the command palette overlay. Never on content cards — they read white-on-white and feel cheap.
- When a dark surface meets imagery, use a **protection gradient** (`linear-gradient(180deg, rgba(15,58,41,0) 0%, rgba(15,58,41,0.9) 100%)`) rather than a solid capsule.

### Imagery

- **Abstract / data-viz direction**: maps (warm off-white base, lime pins, green parcels), charts (green-on-green with one lime highlight), grain-overlaid aerial plots, neighborhood parcel diagrams, chart axes used as compositional devices.
- **Imagery color vibe: warm, slightly green-tinted, matte.** No cool-blue stock photography. If photos are used, desaturate and add the noise overlay.
- **No hand-drawn illustrations.** This is a data company, not a greeting card.

### Cards

Canonical card: white surface (`--bg-elevated`), 10–14px radius, 1px `--border`, `--shadow-sm`, internal padding `--space-6` (24px). Hover: lift 1px, `--shadow-md`, 200ms. No left-border accent stripes, no gradient fills.

### Layout rules (fixed elements)

- **Navbar**: 64px tall, always `--dark`, `--dark-fg` text, lime hover underlines.
- **Footer**: `--dark`, 4-column link grid, logo + tagline top-left.
- **Mobile bottom nav** (product surfaces only): 56px, `--bg-elevated`, top border.
- **Command palette / chat input**: bottom-anchored on mobile, floating card on desktop.

---

## Iconography

**Brand marks first.** The bracket corners (`[ ]` framing the wordmark) are the distinctive visual signature. Three standalone bracket frames shipped in `assets/logos/` (`brackets-wide.png`, `brackets-square.png`, `brackets-diag.png`) — use them as **compositional devices** (section dividers, stat-card frames, image crops) to reinforce brand without repeating the logo.

**Icon set: Lucide (CDN).** Loaded via `https://unpkg.com/lucide@latest` or the `lucide-react` package. Rationale:
- **Stroke-only, 2px weight, rounded caps** — matches the data-confident, airy feel.
- Wide coverage for real-estate (map pin, home, building, users, mail, send).
- CSS-colorable (so lime-accented active icons are one class).

**Sizing**: 16px (inline text), 20px (buttons), 24px (nav), 32px+ (hero).

**Stroke**: `stroke-width: 1.75` for premium feel (Lucide default is 2; slightly thinner reads higher-end).

**Color rules**:
- Default icons use `currentColor` (inherit text color).
- **Active/selected** icons shift to `--accent` (lime).
- Destructive actions use `--destructive`.

**Brand marks** (logos in `assets/logos/`) are never replaced by icons. The logo is a logo; an icon is a verb.

**Emoji**: reserved for AI chat responses only, as P.S. markers (`📬 📈 🔒 💡 🏡`). Never in chrome, buttons, nav, or headings.

**Unicode chars as icons**: arrows (`→`, `↗`) are fine inline in links and list items — they read as typographic, not iconic.

**Flagged substitution**: the original codebase may ship a custom icon set inside `grsfd.ai.zip` (not received at build). When re-attached, compare to Lucide — swap in custom icons if they exist, otherwise keep Lucide.

---

## What's in each UI kit

- `ui_kits/marketing/` — grsfd.ai homepage: sticky dark nav, hero with logo + tagline + data-viz illustration, product family cards (grsfd / grsfd farm), how-it-works, footer.
- `ui_kits/grsfd-core/` — core dashboard: farm-area map, homeowner count, campaign composer, send status, sequence editor.
- `ui_kits/grsfd-farm/` — large-scale variant: territory selector with hierarchy, volume dashboard, campaign scheduler, team seat roster.
- `ui_kits/chat/` — lighter recreation of the free-tier market-intel chat from `Index.tsx` (welcome hero, suggested chips, query form, email capture, CTA wall, chat input).

Each kit's `index.html` is an interactive click-through. Components live as sibling `.jsx` files.

---

## Caveats & open questions

1. **Logos are low-res 135×90 PNGs.** Fine for preview; need SVG / 2000px transparent versions for production.
2. **`grsfd.ai.zip` was not received.** The chat product was built from `Index.tsx` only; marketing site was inferred from palette + logos + product family. Re-attach the zip to unlock the real homepage components.
3. **No font files** — Space Grotesk, Inter, JetBrains Mono all served from Google Fonts CDN. If you want self-hosted for performance/privacy, ship the woff2s into `fonts/`.
4. **Icon set** assumed Lucide. If the real product uses something else, flag it.
5. **League Spartan dropped** (see Typography). Re-add if you want a third family.
