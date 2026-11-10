# Homepage first paint and CSS delivery

The homepage now includes only its first-screen critical rules alongside the existing inline component styles. Four complete stylesheets download in parallel without blocking the hero and apply together after all have completed. Other routes retain normal Astro stylesheet delivery. The approved glass header, shader stills, fonts and logo animation are unchanged.

## Implementation

- `integrations/home-critical-css.mjs` runs after Astro's static build. Beasties 0.5.5 extracts the header/hero rules. Complete external stylesheets are preserved for cache reuse and interactive states.
- Marked main/footer content is temporarily omitted from selector matching and restored byte-for-byte afterwards. Existing ancestor markup stays present, so theme and draft overrides are included. All navigation states are explicitly retained. Missing content markers fail the build.
- Stylesheets use preload requests with completion handlers. A small inline loader applies all completed sheets in one task to avoid multiple expensive style/layout passes. Network failures also settle the group, allowing the successful sheets to apply.
- No-JavaScript visitors receive the original blocking links through `noscript`. Fragment navigation switches immediately to regular render-blocking stylesheet links rather than relying on first-screen CSS for a lower-page target.
- Remaining offscreen homepage sections use native `content-visibility: auto`, extending the existing treatment of the use-case grid and operating map. Content-box height estimates at mobile/tablet/desktop widths reserve space; `auto` remembers actual sizes after rendering. Unsupported browsers render normally. Content and normal section dimensions are unchanged; the browser may adjust scroll estimates as offscreen sections are rendered.
- Tailwind scans application and editorial sources explicitly, preventing docs, reports and test scripts from generating unnecessary utility rules.
- Beasties is build-only. It adds no browser dependency or WebGL. Do not change the approved header or gradient assets when tuning delivery.

## Performance evidence

Baseline: rebuilt main `a1c16ac170c40922395f115fc61a19a9bfbb116f`. Both versions used identical local gzip static serving, fresh Chromium 158 processes and Lighthouse 13.6 default mobile simulated throttling. Tests ran sequentially without other browser checks. Local latency/CPU differ from PageSpeed's servers; these are matched lab comparisons, not hosted PageSpeed results.

| Variant | FCP/LCP | Speed Index | TBT | Performance |
| --- | ---: | ---: | ---: | ---: |
| Matched baseline | 1.204s | 1.204s | 0ms | 100 |
| Candidate run 1 | 0.810s | 0.810s | 77ms | 100 |
| Candidate run 2 | 0.802s | 0.802s | 63ms | 100 |
| Final mobile, all categories | 0.885s | 0.885s | 105ms | 99 |

Final desktop scored 100 in all four categories, with FCP/LCP 0.262s, Speed Index 0.377s and TBT 0ms. Final mobile accessibility, best practices and SEO all scored 100; CLS was 0.00038. The render-blocking request audit lists no blocking stylesheets, versus four for the baseline. Main-thread work was 1.76–1.93s, compared with 2.05s in the matched baseline.

The gain is earlier visual progress with some work now occurring after first paint. TBT is higher than the baseline, although below 200ms in these runs. This is not a claim of zero blocking or guaranteed public scores. The extra compressed HTML is about 5.1KB (27,348 → 32,460 bytes); sampled total transfer grew approximately 4.9KB. Complete cacheable stylesheets remain available for other routes and warm navigation.

Earlier full inlining and independently applied deferred CSS versions were rejected: they raised TBT to 238–377ms. Grouping stylesheet application and skipping offscreen layout reduced that penalty. The prior inlining investigation is in PR #9.

## Verification

- Production build/native HTML, lint and `git diff --check`.
- All 37 routes with mobile JavaScript and no JavaScript, sitemap/archive/404 checks.
- Header/hero computed styles and positions match the baseline at 390/1440px, including when every full stylesheet is blocked. Screenshot comparisons pause animation only in the test browser.
- Navigation/keyboard/focus, mocked signup/exit modal, static shader stills/no WebGL and font fallbacks.
- A deliberately held stylesheet confirms no section stylesheet applies before the group is complete. FAQ, footer and direct `/#services` navigation pass afterwards.
- Mobile/desktop/no-JavaScript content and secondary image/video checks pass, including delayed hydration and mocked YouTube activation.
- Scrolling each affected section into view yields exactly the baseline section heights and text at 390/1440px. Screenshots and measurements accompany this report.

Run `npm run check:home-critical-css` against a built preview in addition to normal browser checks when changing the homepage or critical CSS integration. The source includes test/formatting assertions that catch missing theme rules and incomplete navigation states under delayed CSS.

Public release checks and hosted measurements are recorded on the PR after deployment; do not infer deployment from these local reports.
