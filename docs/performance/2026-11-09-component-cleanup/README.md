# Native component cleanup

Baseline: deployed merge `b1ededec5c1b39cd2fd29b279ca74a6f4914cca4`.

Converted the homepage offer cards, operating map/micro visuals, use-case layout, comparison table, FAQ, booking CTA, logo strip and footer layouts to native Astro templates. Shared footer layouts are used across the site. Archived introductory/static sections also use native templates. Native booking markup uses real links. The FAQ uses grouped HTML details/summary, supports keyboard operation, and works without JavaScript. Only actual demos, forms, navigation and animated backgrounds require hydration. Server-rendered third-party icons are used at build time in the operating map.

Removed 36 files with no import path from page/content/script entry points (listed in removed.json), including replaced components, obsolete page variants and duplicate workshop shells/styles. The newsletter SEO overrides JSON remains because the publishing script reads it from disk rather than importing it. The supported archived routes remain available.

## Browser JavaScript comparison

| Scenario | Before | After | Change |
| --- | --- | --- | --- |
| JavaScript response bodies after scrolling the full homepage | 270,885 bytes | 250,621 bytes | −20,264 bytes / 7.48% |
| Distinct JavaScript requests | 21 | 17 | −4 |

Both 390px and 1440px runs returned these results. Each run used a fresh Playwright Chromium context, reduced motion, the same localhost Astro preview and all sections scrolled into view. Third-party analytics were blocked; Google Fonts were allowed. These are uncompressed response-body totals from local script requests, not compressed production transfer sizes, speed scores or guarantees. Native shells isolate the four animated demos and footer form/shader, so the number of islands increases from 8 to 9 while total JavaScript and requests decrease.

Reproduce with a built preview on port 4567 and `node scripts/measure-browser-javascript.mjs <label> <output-directory>` (or set ASTRO_PREVIEW_URL). This container also requires the extracted Chromium shared-library path in LD_LIBRARY_PATH.

Before/after JSON retains requested module paths, byte counts and page landmark geometry. All measured headings, use-case text cards, FAQ rows and booking CTA retain their geometry at both widths; FAQ toggle characters moved to CSS and are excluded from accessible text. Screenshots retain representative homepage/FAQ evidence. Animated demos were also checked on screen after their own visibility-triggered hydration.

The repository now contains 40 Astro templates (including page templates), up from 25, and 72 TSX files, down from 101. GitHub's eventual language percentage is not a performance metric and has not been overridden with Linguist settings.

## Validation

Production build, native HTML checks, lint and publishing lifecycle checks pass. All 37 local routes pass mobile JavaScript and no-JavaScript navigation without missing local resources or uncaught browser errors. Mobile/desktop homepage checks cover native FAQ click and keyboard operation, exclusive answer opening, booking href, article content and mocked footer subscription. Workshop email-draft and podcast progressive-display checks pass at both widths. No real subscription or email was submitted.
