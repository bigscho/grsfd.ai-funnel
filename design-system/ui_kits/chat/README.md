# Market intel chat — grsfd.ai

Faithful recreation of the top-of-funnel chat product (`reference/Index.tsx`). Dark header, welcome hero, suggested chips, query form, email capture on first send, chat thread with bold-count formatting, CTA wall after 3 lookups.

**Files**
- `index.html` — composed chat app
- `Chat.jsx` — all components: `ChatHeader`, `WelcomeHero`, `SuggestedChips`, `QueryFormCard`, `EmailCaptureCard`, `ChatMessage`, `TypingIndicator`, `ChatInput`, `CTAWallCard`, `ChatApp`

**Flow** (from `Index.tsx`): first message → email capture modal → response reveals → 2 more lookups → CTA wall.

**This is a lighter pass** — marked for revisit per the user.
