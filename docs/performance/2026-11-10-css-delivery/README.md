# Homepage CSS delivery investigation — 10 November 2026

Keep production CSS delivery unchanged. Two native Astro inlining experiments improved simulated first paint in local comparisons, but both increased measured blocking time. Neither establishes a safe overall performance improvement. Header glass, shader stills, typography, and logo animation were not changed.

## Report evidence

[PageSpeed mobile report](https://pagespeed.web.dev/analysis/https-otherstuff-ai/7i4ttj4j4t?form_factor=mobile), fetched 2026-11-10T01:59:09.950Z, Lighthouse 13.6:

- Performance 99; simulated FCP/LCP 1,051 ms, Speed Index 3,409 ms, TBT 0 ms.
- Recorded (not simulated) FCP/LCP 2,092 ms; recorded Speed Index 2,135 ms; last visual change 5,675 ms.
- First populated filmstrip frame at 2,128 ms already contains the heading, copy, CTA and gradient. Later frames show logo movement; that does not prove it caused the simulated Speed Index score.
- Four render-blocking stylesheets, estimated 420 ms saving: shared Footer CSS (~15 KB transferred), FAQ (~4.2 KB), route index (~4.6 KB), WingmanDemo (~2.8 KB).
- Those chunk names are not reliable descriptions of their entire contents: the Footer chunk contains global design and navigation rules; the FAQ chunk contains use-case rules; the index chunk contains operating-map rules, including page-wide overflow constraints. Blindly deferring them could change layout or produce flashes.

## Matched local experiments

Baseline source: main/deployed `a1c16ac170c40922395f115fc61a19a9bfbb116f`. Both builds served by the same local Node static server on separate ports, with gzip for HTML/CSS/JS and identical handling of assets and API failures. Chromium 150 from Playwright 1254, Lighthouse 13.6 default mobile simulated throttling, fresh Chrome process per run. No simultaneous browser test workload. These are local lab comparisons, not Google server reproductions. Local response latency differs substantially from Google's test location.

| Variant/run | FCP/LCP ms | Speed Index ms | TBT ms |
| --- | ---: | ---: | ---: |
| Baseline 1 | 1,210 | 1,210 | 0 |
| Inline all 1 | 1,110 | 1,110 | 116 |
| Baseline 2 | 1,209 | 1,209 | 0 |
| Inline all 2 | 950 | 1,066 | 377 |
| Inline shared 1 | 1,062 | 1,062 | 84 |
| Baseline 3 | 1,208 | 1,208 | 0 |
| Inline shared 2 | 1,070 | 1,071 | 153 |

Inline all used Astro's native `build.inlineStylesheets: 'always'`. Compressed homepage HTML grew from 27,349 to 48,952 bytes, removing four blocking stylesheet requests. Local recorded FCP was slower (266/269 ms versus baseline 202/179 ms), despite faster simulated FCP. Performance scores were 99 and 91 versus baseline 100. This is not a dependable win.

Inline shared retained `inlineStylesheets: 'auto'` and used Vite's supported `assetsInlineLimit` callback to inline CSS containing `.nav-container`, retaining the existing 12,000-byte threshold otherwise. Compressed homepage HTML grew to 41,044 bytes; three of the four blocking CSS chunks remained external. Blocking time was higher in both runs. The limited sample does not prove a universal regression, but does not justify shipping it either.

Both experimental configurations were removed. No runtime source change or production deployment is part of this investigation.

## Next implementation direction

Reduce unnecessary stylesheet contents while retaining cacheable delivery. Start by mapping shared global/navigation CSS and homepage-only rules into explicit ownership; remove page-wide selectors from otherwise secondary section styles before attempting deferral. Check computed styles, no-JavaScript rendering, first-load filmstrips and full-page mobile/desktop screenshots across routes. Any delayed section CSS needs to arrive before it becomes visible, including fast scrolling and deep links. Compare repeated cold and warm navigation runs, TBT and visual progress, rather than accepting the estimated 420 ms as a promised gain.

The approved header and gradients remain fixed design constraints. Do not stop the logo animation solely to influence a lab score without evidence and a separate design decision.

Compressed Lighthouse JSONs preserve the local runs and the supplied PageSpeed mobile result. Astro's supported inlining behaviour is documented at https://docs.astro.build/en/guides/styling/.
