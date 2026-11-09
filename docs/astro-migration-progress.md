# Astro migration progress

9 November 2026: foundation and article rendering proof implemented on `feat/astro-migration`.

`npm run build:astro` builds the three current writing articles to ignored `dist-astro/`. The existing production build and deployment path are unchanged. The Astro config isolates its output while routing migration is incomplete. Article content is native HTML; navigation, footer and the embedded chart are selectively hydrated React components.

Validated: pilot build; generated article headings/body, canonical URLs and structured-data presence. No browser parity or performance claim yet.

Remaining before a reviewable migration: homepage and all remaining routes including NStack; native validated content collections replacing the temporary generated-writing JSON dependency; complete article metadata, share and related-post parity; original font/visual parity; responsive assets; API/form checks; publishing lifecycle checks; browser checks; baseline profiling and matched performance measurements; dependency audit; full production build integration and release readiness. This foundation is not production-ready and is not the completed homepage/article pilot.

The previous delegated worker did not persist after the parent response. Work resumed directly; no background worker is currently active. Flight Deck task: c65011df-cc2c-4ec5-9046-43e1d50fa070.

## Homepage milestone

The foundation commit was local until 9 November 2026 03:53 UTC. The branch is now pushed to `origin/feat/astro-migration`.

The pilot now emits the homepage plus three writing articles. The homepage has a native Astro hero and booking anchor; static sections have no hydration, while navigation, demos, FAQ/comparison and signup/footer components hydrate individually. Shared Astro metadata preserves social tags and loads analytics with defer. Content remains visible without JavaScript. Footer shader rendering pauses when offscreen or in a hidden document and no longer measures layout every animation frame.

Display-sized WebP derivatives retain original images. The two footer portrait sources and banner cassette derivative total 4,408 bytes at the default sizes (926 + 782 + 2,700), versus approximately 5.5 MB of source images. Larger portrait and modal variants are available. This is asset-level evidence, not a measured whole-page score gain.

Validation: `npm run build:astro` emits four pages; `npm run check:astro` checks native homepage/booking/article body, canonical/schema and replacement asset references; `npm run lint` passes. Browser runtime initially lacked shared libraries; a temporary extracted runtime is being used to complete browser checks. No managed services restarted.

Browser verification completed: mobile (390px), desktop (1440px) and JavaScript-disabled content checks pass. Interactive runs also exercise FAQ hydration and the footer subscription success flow against an intercepted local API response; no real subscription is submitted. Third-party font/analytics requests are blocked and reduced motion is enabled in these functional tests, so they do not constitute visual parity or production performance evidence. Run a pilot preview on port 4567 and `npm run check:browser:astro` (or set ASTRO_PREVIEW_URL). This container needed browser shared libraries extracted under /tmp/os-browser-runtime and the corresponding LD_LIBRARY_PATH; normal Playwright environments should install supported browser dependencies.
