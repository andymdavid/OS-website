# Report-specific optimisation follow-up

Baseline: f319840 (PR #3). Implementation follows the 9 November PageSpeed mobile/desktop report p7e8o01he2 and the five-page GTmetrix PDF generated around 06:30 UTC.

Implemented so far: explicit client-logo dimensions; responsive content-hashed AVIF/WebP candidates and accurate image metadata; versioned delivery fonts with retained Unicode coverage/declared weight ranges; delayed handwriting font; inline font discovery and smaller stylesheet inlining; native navigation/exit-intent/shader controllers; no polling for title swapping; shader sizing via ResizeObserver and a 24fps cap; composited background pulses; revalidation-based HTML caching and immutable fingerprinted assets; Markdown links in LLM reference files.

Analytics now signs/encrypts in a worker and sends the unchanged CVM record_visit gift-wrap through a restricted same-origin bridge to the configured relay. The bridge validates signatures, destination, timestamps, origin, payload size and concurrency, then waits for relay OK. Relay OK establishes publication acceptance, not collector processing. Ephemeral keys are never persisted. Local tests verify encrypted request compatibility and both positive and negative relay acknowledgements without sending production visits. Third-party tracker execution and direct browser WebSockets are removed. Backend dependencies have their own pinned lockfile.

Build/lint and local bridge tests pass. Homepage FAQ/booking/mocked subscription checks pass. The native navigation test has caught a desktop focus timing issue; release is pending its correction, remaining browser checks, matched performance/visual validation and public deployment verification.

Regular full Chrome restored the updated page from back/forward cache against local nginx. The default headless-shell test produced delegate-related exclusions, so it is not used as evidence of page failure. HTML remains revalidated; APIs are not made publicly cacheable.

CDN configuration is an external blocker: CapRover management listing returns 403 in this session. Public DNS resolves directly to 188.40.69.154 and sampled responses identify nginx, without an identifiable edge-cache header. This is not proof of the complete topology. Origin cache rules are prepared for an edge layer, but no external CDN is claimed configured.

Font reproduction: run scripts/subset-delivery-fonts.py with FontTools 4.68.0 and Brotli installed, then npm run prepare:delivery. Original fonts/licences and source images remain. Generated public/media names are SHA-256-content-addressed; unreferenced outputs in that generated directory are removed on regeneration. Build uses committed outputs and does not download fonts or invoke Python.
