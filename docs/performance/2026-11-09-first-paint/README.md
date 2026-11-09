# First-paint and secondary-route optimisation

This follows GTmetrix hZqh81Co (9 November 2026, 08:57 UTC, Seattle, Chrome 154/Lighthouse 12.6.1). Its homepage baseline was FCP/SI/LCP ~1.6s, TBT 8ms, CLS 0.01, 337KB/29 requests, performance 87 and structure 97. The implementation baseline is main/deployed 5cf7191 (PR #4). The changes in PR #5 preserve static backgrounds by request.

## Shipped changes

- Remove the background canvas, shader initialisation, graphics contexts, observers and animation loop. Hero, automation-partner hero and homepage footer use the existing static CSS gradient. The general footer's original 5,424,795-byte PNG is retained as source but delivered as an 8,512-byte WebP through a fingerprinted asset; it is not inlined into shared CSS, so homepage visitors do not download an unused background.
- Subset Alfabet Regular 50,640→17,852 bytes and Black 51,432→18,164 bytes, including the site's arrows. Disjoint Unicode fallback faces retain the full original fonts for extended characters. The complete original cmap is preserved across subset/fallback; shared characters retain identical horizontal metrics. Browser tests actually request Greek/extended fonts. No font family or heading weight was changed.
- Extract 17,484 bytes of shared offer-card CSS from 51,112 bytes of legacy animated-scene styles. The legacy React route imports both via the original stylesheet; native cards import only shared rules. Initial compressed stylesheet transfer falls from ~30.6KB to ~26.1KB. Shared Tailwind CSS remains; no claim is made that all unused styles are eliminated.
- Use content-visibility:auto and measured intrinsic-size estimates on the distant use-case and operating-map sections. Keep full SSR content, native search/anchors and accessible text. Initial layout counts remain around 1,100 elements; we did not erase meaningful content to lower a DOM audit number.
- Fingerprint common icons/logos; preserve stable legacy URLs. Remove duplicate Cache-Control fields, keep HTML revalidation and API no-store, and avoid immutable caching for errors. Local nginx checked one-year asset caching, a missing hashed asset returning revalidated 404, and invalid subscription returning no-store 400.
- Replace automation letter-scan downloads with small portraits, deliver responsive improvement diagrams, use the native sized logo carousel on that route, and remove a covered legacy hero-photo download. Keep original images available.
- Resize/fingerprint writing thumbnails and use Astro's static image pipeline for newsletter listing/feature/related thumbnails. Workshop YouTube loads only after activating a keyboard-accessible player facade; no-JavaScript visitors have a direct video link. Fix the audit's missing demo-button label and low-contrast text while preserving the demonstration layouts and motion.

## Matched homepage results

Three cold-browser runs per build/device, same machine, Chrome 158/Lighthouse 13.6.0, Astro previews on 4568 (baseline) and 4567 (after), identical Lighthouse throttling. Analytics is excluded on both preview hosts. These are not hosted GTmetrix results or field Core Web Vitals. Desktop uses Lighthouse's actual desktop config; the helper now asserts the form factor so a desktop label cannot silently retain mobile emulation.

| Median / fixed transfer | Before | After |
| --- | ---: | ---: |
| Mobile FCP / SI / LCP | 1,213ms | 1,209ms |
| Mobile TBT | 0ms | 0ms |
| Mobile CLS | 0.000382 | 0.000382 |
| Mobile main-thread work | 2,580ms | 1,993ms |
| Mobile transferred bytes | 438,476 | 318,289 (-27.4%) |
| Desktop FCP / LCP | 295ms | 290ms |
| Desktop SI | 330ms | 295ms |
| Desktop TBT | 0ms | 0ms |
| Desktop transferred bytes | 508,414 | 434,748 (-14.5%) |

Homepage performance was 100 in all six final matched runs. A separate final mobile all-category run scored 100 in performance, accessibility, best practices, SEO and agentic browsing, with no run warnings. First paint is effectively unchanged in the final build; do not present the earlier 1.06s candidate as a final improvement. Reduced bytes and main-thread work are demonstrated; delivery latency still needs an edge trial.

## Experiments and secondary audit

An isolated first-stage containment comparison kept fonts/styles static and disabled only containment in the comparison copy: 364,848→318,259 bytes, median main-thread work 2,663→2,149ms and TBT 82.5→34.5ms. Retained because it avoids an early offscreen image and rendering work. Additional preloads for Black/Silkscreen did not improve final-build paint (median 1,215ms vs 1,209ms); rejected. Font-family consolidation and SVG wordmark substitution were unnecessary once the brand subsets preserved appearance.

The secondary "before" diagnostics already include the first-stage font/static-background work; they are not original-release benchmarks. These are single mobile diagnostic runs, not medians or comparisons with the Seattle PDF.

| Route | Before secondary fixes | Final | Final performance / accessibility |
| --- | ---: | ---: | --- |
| /ai-automation/ | 10,794,538 bytes | 483,205 bytes | 100 / 100 |
| /speedrun/ | 6,900,202 bytes | 370,454 bytes | 100 / 100 |
| /writing/ | 5,893,134 bytes | 255,958 bytes | 99 / 100 |
| /newsletter/ | 19,480,861 bytes | 484,634 bytes | 100 / 100 |

Writing listing LCP improved 3,230→2,256ms. All four final diagnostics score 100 in best practices, SEO and agentic browsing. Sample newsletter article /newsletter/the-human-bottleneck/: performance 97, LCP 2,489ms, 1.72MB; editorial body images remain on the publisher's existing CDN and are a residual payload, separate from resized site thumbnails. Some secondary React registry/stylesheet overhead and critical chains remain; those are recorded opportunities, not falsely declared eliminated.

## Validation and reproduction

Build/native HTML, lint, publishing create/edit/slug-change/delete/duplicates, all 37 mobile JS/no-JS routes, homepage FAQ/booking/mocked signup, native navigation/keyboard/dialog focus, workshops/email drafts, podcast progressive display, analytics worker/bridge/DNT and regular-Chrome bfcache checks pass. New static-background checks verify no WebGL context requests, actual fallback-font loading and mobile/desktop gradients. Secondary checks scroll all four routes and verify bounded image sources, no unsolicited YouTube requests, keyboard player activation/focus and no-JS fallback. A production cold-load check caught an activation before hydration; the facade now stays disabled with a preparing state until its handler is ready. A delayed-module test verifies the first enabled activation starts the player. No real test subscriptions were submitted.

Homepage landmarks and writing/newsletter/workshop layout retain their measured geometry within 2px at 390/1440px. Automation has transient differences before delayed islands settle; stable mobile/desktop section/heading geometry matches after scrolling. Representative before/after hero/footer screenshots are retained here; animation phases in demos vary.

Font reproduction: FontTools 4.68.0 plus Brotli, then scripts/subset-delivery-fonts.py. Run npm run prepare:images for source derivatives, followed by npm run prepare:delivery. The explicit --reuse-images option is only for font/icon refreshes when the existing homepage source images/settings have not changed; it validates all reused files. Originals/licences remain. New writing thumbnails safely fall back to the original URL until derivatives are prepared. Newsletter images are built automatically from authorised public Beehiiv URLs; clean builds now need those remote images reachable, while Astro's cache avoids repeated work. No secret or subscription credential is used for image retrieval.

Compressed Lighthouse reports, network logs and before/after mobile traces are in reports/. Use scripts/measure-performance.mjs with PERFORMANCE_OUTPUT_DIR, PERFORMANCE_SAVE_TRACE=1 for first-run traces, and PERFORMANCE_ALL_CATEGORIES=1 for the broad audit. Preview analytics exclusion must be distinguished from the final real production relay acknowledgement.

## External blocker

No external CDN was configured. Public DNS delegates to Cloudflare, but the proxy/cache setting cannot be established from nameservers alone. CapRover management returns 403, and no Cloudflare zone credentials or DNS-management tool are available. See cdn-rollout.md for exact cache/bypass rules, regional verification, HTML purge and rollback. This is the remaining infrastructure task; do not call the rollout complete or promise the GTmetrix paint targets until it is measured.
