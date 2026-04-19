# Working with the grsfd / Grassfed design system

This project is a **brand & design system** for Grassfed (the company) / grsfd (the product). Anything built here — decks, marketing pages, app screens, one-pagers — should pull from the same tokens, type, colors, and components. Consistency is the point.

## What's in this project

```
colors_and_type.css    Single source of truth for tokens (CSS custom props)
README.md              Design-system narrative: voice, tone, usage rules
assets/logos/          Logo lockups (transparent PNGs, on-white + on-dark variants)
preview/               One preview card per token/component, registered as assets
ui_kits/               Production-ready component exploration, organized by surface
decks/                 Pitch-deck shell and theme (imports colors_and_type.css)
```

## The first rule: check, don't invent

Before you write a color, font, component, or copy phrase from scratch — **look it up first**.

1. Is it a color? → `colors_and_type.css`, `--primary`, `--accent`, `--dark`, etc.
2. Is it typography? → Same file. `--font-display` (Fraunces), `--font-body` (Inter), `--font-mono` (JetBrains Mono).
3. Is it a component? → Look in `ui_kits/<surface>/` for similar existing components before building a new one.
4. Is it copy? → Read `README.md` for voice rules. Short sentences, no corporate fluff, **bold the numbers**.

Every surface in this project imports `colors_and_type.css` via `<link rel="stylesheet">`. Use the CSS variables — don't hard-code hex values unless you have a reason.

## Brand naming — interchange **Grassfed** and **grsfd**

Both are canonical. Pick the one that fits the voice of the line:

- **Grassfed** (Title Case) — prose, storytelling, narrative. "Grassfed is agentic AI cold email."
- **grsfd** (lowercase) — product chrome, logos, nav, UI, once the reader knows who we are.
- Full company URL: `grsfd.ai`
- Core product: `grsfd`
- Large-scale product: `grsfd farm` (always two words, lowercase)

Never `Grsfd`, never `GRSFD`.

## Logo usage

Three lockups exist in three variants each:
- `grsfd.png` / `grsfd-ai.png` / `grsfd-farm.png` — dark-green wordmark + lime brackets. **Use on white / cream / any light bg.**
- `grsfd-ondark.png` / `grsfd-ai-ondark.png` / `grsfd-farm-ondark.png` — cream wordmark + lime brackets. **Use on dark green / black / any dark bg.**
- `brackets-wide.png`, `brackets-diag.png`, `brackets-square.png` — standalone bracket frames. Use as **compositional devices** (section dividers, stat cards, image crops) — not as a logo substitute.

When composing a surface:
- Ask "is the background dark or light" → pick the matching variant.
- `grsfd.ai` = company mark. Use on site header, marketing, formal settings.
- `grsfd` = core product mark. Use inside the core product app, or in prose where scope is the individual-agent tier.
- `grsfd farm` = large-scale product mark. Use inside the farm app, team/brokerage marketing.

## Color tokens — the shortlist

| Token | Use |
|---|---|
| `--primary` | Dark teal-green. Primary buttons, headings on light. |
| `--accent` | Lime. Sparingly — CTAs, highlights, active states, the *one* thing that pops. |
| `--dark` | Deep forest. Full-bleed dark surfaces (hero, footer, sidebar, deck). |
| `--dark-fg` | Cream. Foreground on dark. |
| `--bg` | Warm cream. App/page background. |
| `--bg-elevated` | Pure white. Cards on cream. |
| `--fg` / `--fg-muted` | Body text / secondary text. |
| `--muted` | Light green-grey. Subtle fills, dividers, eyebrow labels. |
| `--grad-primary` | Radial lime→dark-green. The approved hero gradient. **Don't hand-roll your own.** |

## Type scale

Two moves only:
- **Display** (Fraunces, 600, tight tracking, -0.02em) for headlines and feature numbers.
- **Body** (Inter) for everything else. Variable weights (500 for emphasis, 700 for very short things).
- **Mono** (JetBrains Mono) for data, labels, eyebrows, serial numbers — anything that benefits from tabular feel.

Use the eyebrow pattern generously:
```html
<div class="eyebrow">Today</div>
<h2 class="section">Agents spend $2–4k...</h2>
```

## Components — UI kits as reference

`ui_kits/` contains four surface explorations:
- `marketing/` — public site: Hero, Sections (features, products, footer)
- `grsfd-core/` — solo-agent product: Dashboard, sidebar, sequence list
- `grsfd-farm/` — team workspace: FarmShell, VolumeDashboard, TerritoryTable
- `chat/` — top-of-funnel chat: ChatApp with welcome hero, query form, email gate, response bubbles, CTA wall

Each has a `README.md` and a shared `ui_kits/_shared/icons.js` (Lucide-like SVGs + a custom `Farm` icon that shows a 2×3 array of houses, not a single home).

When building something new, **read the matching surface's JSX first**. Copy patterns. Don't reinvent spacing, card treatment, or button styles.

## Iconography

- Lucide stroke-based icons at 1.75 stroke width, 24×24 viewBox.
- Custom `Farm` icon: 2×3 array of tiny house silhouettes (lime fill on center). Signals multi-household outreach.
- No emoji in product chrome unless explicitly briefed. Icons only.

## Decks

`decks/Grassfed Pitch.html` is the reference deck. Use `deck-stage.js` (the web-component shell from the starter) and `pitch.css` which extends `colors_and_type.css`. Slide rhythm:
- Cover / Close → `.slide.dark` or `.slide.accent-bg`
- Narrative → `.slide` (default cream)
- Wedge / reveal → `.slide.accent-bg` (the gradient, sparingly — 1–2 per deck)
- Every slide gets `data-label` for screen labels + page number + "Grassfed" corner mark.

## The gradient rule

There is **one approved gradient**: `--grad-primary`, a radial sweep from lime (bottom-left) through mid-green to dark green (top-right). It was chosen deliberately to avoid the muddy yellow-green middle you get from a naive linear green-to-lime. Don't hand-roll a gradient. If you need subtle fills, use `--grad-soft` or `--grad-subtle`.

## Things to not do

- Don't add emoji to product UI.
- Don't use `border-radius: 4px` chip around a logo — all logos are now transparent PNGs, no chip needed.
- Don't invent new gradients. Use `--grad-primary` or nothing.
- Don't use `Grsfd` (mixed case) or `GRSFD` (all caps).
- Don't use drop shadows heavier than `--shadow-sm` / `--shadow-md` — we're a grown-up system, not a 2015 card library.
- Don't add "placeholder" content to pad a design. If a section feels empty, redesign.
- Don't use any font outside the three in the system (Fraunces, Inter, JetBrains Mono).
