# Report-specific optimisation follow-up

Baseline: f319840 (PR #3). Implementation follows the 9 November PageSpeed mobile/desktop report p7e8o01he2 and the five-page GTmetrix PDF generated around 06:30 UTC.

Implemented: explicit client-logo dimensions; responsive content-hashed AVIF/WebP candidates and accurate image metadata; versioned delivery fonts with retained Unicode coverage/declared weight ranges; delayed handwriting font; inline font discovery and smaller stylesheet inlining; native navigation/exit-intent/shader controllers; no polling for title swapping; shader sizing via ResizeObserver and a 24fps cap; composited background pulses; revalidation-based HTML caching and immutable fingerprinted assets; Markdown links in LLM reference files.

Analytics now signs/encrypts in a worker and sends the unchanged CVM record_visit gift-wrap through a restricted same-origin bridge to the configured relay. The bridge validates signatures, destination, timestamps, origin, payload size and concurrency, then waits for relay OK. Relay OK establishes publication acceptance, not collector processing. Ephemeral keys are never persisted. Local tests verify encrypted request compatibility and both positive and negative relay acknowledgements without sending production visits. Third-party tracker execution and direct browser WebSockets are removed. Backend dependencies have their own pinned lockfile.

Build/lint, all 37 routes with/without JavaScript, homepage FAQ/booking/mocked subscription, keyboard/mobile navigation and newsletter-dialog focus, exit-intent cooldown, workshops/podcast interactions, publishing create/edit/rename/delete/duplicate handling, encrypted bridge ACK/rejection, worker signing, Do Not Track and preview exclusion checks pass. No real newsletter subscriptions were made. Dead React navigation/exit-intent implementations are removed.

Matched mobile Lighthouse 13.6.0 runs against separately built previews (three each, same machine/Chrome, analytics excluded on both):

| Metric | Before f319840 | After |
| --- | ---: | ---: |
| Transferred bytes | 851,120 | 438,476 (-48.5%) |
| Median LCP | 1,367 ms | 1,210 ms |
| Median TBT | 0 ms | 0 ms |
| Median CLS | 0.00036 | 0.00038 |
| Performance scores | 84, 100, 100 | 100, 100, 100 |

The initial baseline run had a 4.52s LCP outlier; all raw reports are retained compressed here. These are local comparisons, not replacements for hosted PageSpeed/GTmetrix. A separate after-run scored 100 in performance/accessibility/best-practices/SEO/agentic-browsing, with no run warnings. Render-blocking estimate remains 230ms; this pass reduces blocking stylesheet requests from eight to five, rather than claiming all CSS can disappear. Image delivery and LLM-link audits pass. Inline CSS increases raw HTML from roughly 96KB to 147KB; total transferred bytes still fall as above.

Full-scroll browser measurements at 390/1440px: JavaScript requests 17→14, uncompressed JavaScript 250,723→234,994 bytes, hydrated islands 9→5. These include demos loaded after scrolling; initial navigation/shader no longer loads React. Captured heading, CTA, FAQ and use-case geometry differed by less than 2px; mobile hero and desktop backgrounds were visually reviewed. Animation phase and shader variation are expected.

Report surface covered: (1) unsized logos; (2) responsive image delivery; (3) font payload/discovery; (4) stylesheet blocking; (5) long-lived hashed asset caching; (6) React/unused JS; (7) tracker long task and browser WebSocket errors; (8) back/forward cache; (9) background animation paint; (10) polling/layout reads/duplicated navigation DOM; (11) valid LLM reference links. External CDN setup remains blocked as below. Remaining 2.7s total main-thread work and dynamic demo DOM are recorded as residual costs, not falsely claimed eliminated.

Regular full Chrome restored the updated page from back/forward cache against local nginx. The default headless-shell test produced delegate-related exclusions, so it is not used as evidence of page failure. HTML remains revalidated; APIs are not made publicly cacheable.

CDN configuration is an external blocker: CapRover management listing returns 403 in this session. Public DNS resolves directly to 188.40.69.154 and sampled responses identify nginx, without an identifiable edge-cache header. This is not proof of the complete topology. Origin cache rules are prepared for an edge layer, but no external CDN is claimed configured.

Font reproduction: run scripts/subset-delivery-fonts.py with FontTools 4.68.0 and Brotli installed, then npm run prepare:delivery. Original fonts/licences and source images remain. Generated public/media names are SHA-256-content-addressed; unreferenced outputs in that generated directory are removed on regeneration. Build uses committed outputs and does not download fonts or invoke Python.

Targeted non-composited-animation audit returned no flagged elements in the captured initial viewport; this is not a claim about every later demo state. Local nginx confirmed AVIF MIME, one-year immutable media caching, HTML revalidation, real 404s and no-store on invalid subscription responses.
