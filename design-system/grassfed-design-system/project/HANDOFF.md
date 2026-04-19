# Handoff Spec — grsfd.ai

**Status: NOT READY. Write after design is locked.**

---

This document gets written at the end of the design phase, not during it. Right now it would just be speculation about what we'll ship, and we'd have to rewrite it anyway once the pages and funnel are actually done.

## What gets finished before we write this

- [ ] Homepage (`/`) — all hero states mocked: idle, submitting, success-MLS, error, "I don't have an MLS" fallback
- [ ] `/farm` page — all hero states mocked (zip-code variant)
- [ ] `/pricing` page — 3 tiers, FAQ, CTA locked
- [ ] Post-capture "Claim your account" screen
- [ ] Mobile layouts for all of the above
- [ ] Copy review — every CTA, error message, eyebrow, empty state finalized
- [ ] Logos, OG images, favicon — all shipped

## What this doc will contain once written

- Route map → which design file maps to which Next.js route
- Component inventory — what to extract as shared (Navbar, Footer, Hero, etc.)
- Real API contracts (not the draft ones; the ones that survived design review)
- Full state specs for every interactive surface
- Assets checklist with paths
- Acceptance criteria per page
- Out-of-scope list with reasoning
- First-task order for the engineer

## Until then

Work against the files themselves:
- `colors_and_type.css` — design tokens
- `README.md` — voice, visual, brand rules
- `ui_kits/marketing/*.html` — page-level design sources
- `ui_kits/chat/` — free-tier chat reference

Come back to this file when the design is done.
