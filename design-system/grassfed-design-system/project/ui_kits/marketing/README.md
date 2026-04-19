# Marketing site — grsfd.ai

Three-page marketing site for the MLS-first funnel pivot.

**Pages**
- `Grassfed Home.html` — homepage. Hero w/ MLS activation above fold, single-path funnel to grsfd farm.
- `Grassfed Farm.html` — `/farm` landing. Zip-code activation, farmer-direct messaging.
- `Pricing.html` — 3 tiers (Starter / Growth / Pro).

**Components** (Babel JSX, loaded in each page)
- `HomePage.jsx` — `Navbar`, `Hero` (w/ MLS activation), `HowItWorks`, `ProductFamily`, `DataStrip`
- `HomePageLower.jsx` — `Footer` + shared lower-page sections
- `FarmPage.jsx` — farm-specific hero, zip activation, farmer testimonial blocks
- `PricingPage.jsx` — pricing tiers, FAQ, CTA

**Conventions**
- All pages pull tokens from `../../colors_and_type.css`.
- Icons come from `../_shared/icons.js`.
- Logos: `grsfd-ai.png` on light, `grsfd-ai-dark.png` on dark. Same for sub-brands.

**Caveat:** copy + structure are based on the MLS-activation funnel direction from chat; the original grsfd.ai.zip source was not available. Swap in real components once received.
