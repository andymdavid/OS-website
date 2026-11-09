# Astro migration progress

9 November 2026: foundation and article rendering proof implemented on `feat/astro-migration`.

`npm run build:astro` builds the three current writing articles to ignored `dist-astro/`. The existing production build and deployment path are unchanged. The Astro config isolates its output while routing migration is incomplete. Article content is native HTML; navigation, footer and the embedded chart are selectively hydrated React components.

Validated: pilot build; generated article headings/body, canonical URLs and structured-data presence. No browser parity or performance claim yet.

Remaining before a reviewable migration: homepage and all remaining routes including NStack; native validated content collections replacing the temporary generated-writing JSON dependency; complete article metadata, share and related-post parity; original font/visual parity; responsive assets; API/form checks; publishing lifecycle checks; browser checks; baseline profiling and matched performance measurements; dependency audit; full production build integration and release readiness. This foundation is not production-ready and is not the completed homepage/article pilot.

The previous delegated worker did not persist after the parent response. Work resumed directly; no background worker is currently active. Flight Deck task: c65011df-cc2c-4ec5-9046-43e1d50fa070.
