# Local mobile performance evidence — 9 November 2026

Three final Astro runs after the software-WebGL fallback completed without warnings:

| Run | Performance | LCP | TBT | CLS | Transfer |
| --- | --- | --- | --- | --- | --- |
| 1 | 100 | 1.541 s | 4 ms | 0.0135 | 2,087,077 bytes |
| 2 | 99 | 1.549 s | 1.5 ms | 0 | 2,087,075 bytes |
| 3 | 100 | 1.529 s | 0 ms | 0.0135 | 2,087,071 bytes |

Lighthouse 13.6.0; Headless Chromium 158; mobile simulated throttling (150 ms RTT, 1,638.4 Kbps throughput, 4x CPU slowdown). Built static output served by Astro preview at localhost:4567, without production nginx compression. Each run launches fresh Chrome. Google Fonts remain enabled; the external nanalytics tracker is blocked in every run. Full settings/environment are in `summary.json`; raw Lighthouse JSON is retained as gzip files. Use `gzip -dc <file>.json.gz > /tmp/report.json` to inspect it.

Command: `node scripts/measure-performance.mjs http://127.0.0.1:4567/ astro-software-fallback mobile 3`, with CHROME_PATH pointing to the installed Chromium and LD_LIBRARY_PATH pointing to extracted runtime libraries in this container.

The earlier `astro-mobile-1.json.gz` captures the migrated site before the shader fallback: incomplete-run warning, approximately 168 seconds TBT, with about 177 seconds of main-thread work attributed to HeroShaderBackground. It is diagnostic evidence, not a valid score baseline. This container renders WebGL with SwiftShader, which now receives the existing CSS gradient rather than an animated shader. Hardware-accelerated devices retain the shader and need separate verification. These measurements do not establish hosted PageSpeed scores or prove the cause of Google's earlier incomplete report.

## Other validation

- Production build, generated native HTML checks and lint pass.
- All 37 routes pass mobile JavaScript-enabled and disabled checks, including missing-resource/runtime-error checks, 404 and index policy checks.
- Mobile/desktop FAQ and mocked footer subscription checks pass.
- Both workshop routes pass mocked modal error/retry/success/close checks at 390px and 1440px; podcast Show More passes.
- Writing/newsletter build lifecycle create/edit/slug change/delete and duplicate rejection pass.
- Development writing watcher create/slug change/delete checks pass.
- Local nginx 1.26.3, using repository configuration with only listener/root paths adapted, serves native routes, gzip and no-store HTML, immutable hashed assets, genuine 404s, marketing aliases, canonical-host redirects and the NStack TTF MIME type correctly. This is not a deployed nginx check.
- `npm audit --omit=dev`: zero vulnerabilities.

## Remaining release checks

Full-site visual review and hosted performance verification remain. Crucially, workshop forms already call `/api/contact` in the baseline, but the checked-in Express service only implements `/api/subscribe`; mocked browser checks do not establish real contact delivery. Confirm the actual deployment's contact handler or configure an appropriate delivery backend before release. No live submissions were sent.
