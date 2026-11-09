# Performance and accessibility follow-up — 9 November 2026

This change reduces initial homepage transfer from 2.09 MB to 0.85 MB (59%) in matched local mobile runs. Three before runs and three after runs all score 100 for performance; this is a byte/LCP/layout-stability improvement, not a claim that an already-rounded score increased. The final all-category local run scores 100 for performance, accessibility, best practices and SEO.

| Measurement | Before (three runs) | After (three runs) |
| --- | --- | --- |
| Initial transfer | 2,087,226–2,087,232 bytes | 851,118 bytes |
| LCP | 1.534–1.539 s | 1.359–1.364 s |
| TBT | 0–1 ms | 0–11 ms |
| CLS | 0.0135 | 0.00038 |
| Performance | 100 / 100 / 100 | 100 / 100 / 100 |

Baseline: main at `d0eee60195beb202e1f6195517e398b3823ec0aa`, built in an isolated detached worktree. Before and after served by Astro preview on localhost ports 4568 and 4567 respectively. Lighthouse 13.6.0, Chromium 158, fresh browser for every run, mobile simulated throttling (150 ms RTT, 1,638.4 Kbps, 4x CPU slowdown). Software WebGL takes the existing CSS fallback in both builds. Analytics is blocked in both measurements; the new loader also excludes preview hosts. Baseline retains Google Fonts; after uses the same families locally. Runs were sequential with other browser checks stopped. Early exploratory runs made during concurrent browser validation were discarded and are not included. Raw gzip JSON and settings are retained here; these are local lab results, not hosted PageSpeed scores.

Reproduce with `node scripts/measure-performance.mjs <preview-url> <label> mobile 3`. Set CHROME_PATH for the local browser and LD_LIBRARY_PATH if needed. The retained all-category Lighthouse run uses the same flags with performance, accessibility, best-practices and SEO enabled.

## Changes

- Generate display-sized WebP logo, product screenshots, client logos and example backgrounds while retaining the source images. Product cards use responsive images; decorative example backgrounds now use native lazy images behind the existing gradient and demos.
- Self-host Latin font subsets with their SIL OFL licences. CSS declares each family separately so only fonts actually used by the page download. Preload core above-fold fonts and reserve the square brand icon's correct aspect ratio. Remove Google Fonts stylesheet requests, including the nested global CSS import.
- Keep small operating-map text readable throughout animations; animate the card backgrounds instead of fading the labels. Correct offer-card and footer heading levels, describe offer links and enlarge footer link targets.
- Reuse local fonts and optimised images for seven days in nginx. They have stable filenames, so do not label them immutable. Existing fingerprinted Astro asset policy is preserved.
- Initialise analytics after load/idle, exclude preview hosts and respect Do Not Track. Configure the existing tracker to use `wss://relay.contextvm.org`: a read-only WebSocket connection succeeded. `wss://cvm.otherstuff.ai` timed out, so it is omitted. The tracker, site ID and collector public key are preserved; errors are not suppressed. Mocked production-origin tests verify configuration and timing without sending visits. A socket connection does not prove collector receipt; real analytics delivery and bot-environment connectivity still need hosted verification.

## Validation and review

- `npm ci --include=dev`: clean install, zero reported vulnerabilities.
- Production build/native HTML checks, lint and whitespace checks pass.
- All 37 routes pass mobile checks with JavaScript enabled and disabled, including missing-resource, runtime-error, canonical, archive noindex and 404 checks.
- Mobile/desktop homepage, article, native FAQ, booking links and mocked subscription checks pass.
- Both workshop enquiry email drafts/modal close and podcast progressive display pass at 390px and 1440px; no submissions sent.
- Analytics mocked post-load configuration, Do Not Track and preview-host exclusion pass (`npm run check:analytics`).
- Local nginx 1.26.3 syntax and HTTP checks pass with temporary listener/root/temp-path adaptations: fonts and images return 200 with correct MIME types and seven-day cache headers; HTML remains no-store. The temporary process was stopped.
- Before/after screenshots and geometry captured at 390px and 1440px. Measured main headings, use-case copy, FAQ and CTA dimensions stay within 2px; footer touch targets intentionally grow. Representative screenshots are linked below.

[Before mobile hero](baseline-hero-390.png) · [After mobile hero](optimised-hero-390.png) · [Before desktop use cases](baseline-grid-1440.png) · [After desktop use cases](optimised-grid-1440.png)

The originating Flight Deck task read/comment APIs reject access from this recovered notification session. This repository note and the PR retain progress and evidence. The newly attached GTmetrix PDF remains unavailable through the session's attachment tools; this pass addresses the recoverable PageSpeed diagnostics. No production deployment or managed-service restart is performed by this change. Hosted retesting remains a release check.

## Branch housekeeping

Verified migration PR #1 and component-cleanup PR #2 merged into main, then removed their remote and local feature branches. Enabled GitHub's delete-branch-on-merge setting for future PRs. Retained main, deployed, the unrelated operator-validation worktree and the active performance branch. No unrelated working-copy edits were changed.
