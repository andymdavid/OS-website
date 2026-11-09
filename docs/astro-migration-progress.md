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

## Native route and publishing migration

The production command now builds Astro into `dist/`. All existing content/marketing/workshop/archive routes are generated, including 17 newsletter issues and the original standalone NStack page copied from public assets. Writing/newsletter data use watched and validated collections. Article share/related content and metadata have been ported. The podcast index is populated at build time with progressive Show More behaviour. Workshop sections hydrate separately and share a small signup controller.

The SPA entry/router, Helmet metadata, fallback HTML and old full-document/SEO generators are removed. The newsletter refresh script now writes one public archive source. Sitemap and LLM reference endpoints derive from native route templates and the collections; archived/noindex pages are excluded. nginx keeps the API proxy, adds text compression, immutable hashed Astro asset caching, the original marketing alias redirect and a genuine 404 document. NStack handling is retained. Alfabet fonts are converted to WOFF2 with all glyphs retained.

Validation so far: production build and output checks pass; 37 pages pass a mobile JS/no-JS browser sweep with no missing local resources or uncaught errors. The checker accepts an h2 for the archived company page, matching its existing heading structure. Writing/newsletter create, edit, slug rename, delete, sitemap update and duplicate rejection pass; fixtures are restored and final output rebuilt. npm audit reports zero vulnerabilities after aligning the Vite peer with Astro's Vite version and updating compatible transitive packages. Full visual comparisons, workshop/API-specific checks, development content watching, actual nginx response checks and matched performance runs remain to be completed before marking ready.

## Recovery and shader diagnosis — 9 November, 04:36 UTC

Recovered PR #1 at pushed commit `840315e`; no preview or browser-test process remained active. Re-ran production build, lint, publishing lifecycle checks, all 37 routes with JavaScript enabled/disabled, and mobile/desktop homepage/FAQ/mocked footer signup checks. Added a workshop checker covering both routes at 390px and 1440px: modal open, intercepted contact API error, retry, success, close, and podcast Show More. No real form submissions. `npm audit --omit=dev` reports zero vulnerabilities.

The homepage browser check now waits for the FAQ island to hydrate before clicking. Fonts-loaded homepage screenshots confirm the same heading font, size and bounding rectangle as baseline commit `0b29918` at 390px and 1440px. These are representative homepage checks, not full-site visual sign-off.

An unmodified Astro local mobile Lighthouse run attributed approximately 177 seconds of main-thread work to `HeroShaderBackground` and returned an incomplete-run warning (TBT approximately 168 seconds). This environment uses software WebGL; it is not evidence of hardware-accelerated browser performance or proof of Google's earlier failure. The shader now requests `failIfMajorPerformanceCaveat` and also checks the exposed renderer for SwiftShader/llvmpipe/softpipe/software rasterization, since Chromium can expose SwiftShader despite the standard guard. Those environments use the existing CSS gradient; accelerated devices retain the animated shader. Confirmed the software-rendered browser selects the static background. Matched measurements are being repeated after this change.

Flight Deck task reads/updates are blocked in this recovered strict-inbox session: task comments report the notification does not bind that location, and the CLI returns `agent_inbox_unbound_action` (403). The originating thread remains readable. Repository/PR evidence is recorded here while task access is unavailable. No managed services restarted and no deployment performed.

Final shader-fallback measurements: 100/99/100 local mobile performance, LCP 1.529–1.549 s, TBT 0–4 ms, no incomplete-run warnings. Raw compressed reports, settings and limitations are retained under `docs/performance/2026-11-09/`. Development writing watcher create/rename/delete checks and actual local nginx routing/compression/cache/MIME checks also pass. The workshop `/api/contact` handler is absent from the checked-in backend in both baseline and migration; real delivery is a release blocker pending deployment/backend confirmation. Full-site visual and hosted performance checks remain outstanding.

## Release completion — 9 November 2026

Operator explicitly authorized completion and public deployment. Live GET /api/contact returned 404, matching the absent checked-in handler. Workshop enquiry forms now open an encoded email draft to the site's established info@otherstuff.studio address, with clear instructions that the visitor must send it. Both Level Up and Speedrun use the appropriate subject; no delivery is claimed by the UI. Added associated field labels and updated browser checks to validate draft recipient/subject/body without sending email. The workshop hero now renders its text immediately rather than initially hiding native content behind a client animation.

Clean dependency installation, production build, lint and publishing lifecycle checks pass. Representative about, writing, newsletter and workshop layouts were checked at 390px and 1440px; none has horizontal overflow. Final browser and live deployment verification are recorded in the release handoff.

Final browser sweep passed all 37 routes with and without JavaScript. The visual check additionally found that generic workshop section rules applied a full-screen minimum height to the shared newsletter navigation strip; rules are now scoped to `main section`. Workshop checks assert first-screen headline positioning and pass at both widths after the final CSS build. Production build and lint pass after this correction. The existing external analytics script returns HTTP 200.
