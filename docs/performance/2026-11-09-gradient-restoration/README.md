# Restore original background appearance and header opacity

The performance pass replaced the WebGL renderer with its plain CSS fallback. That preserved a static background but lost the shader's palette, atmospheric glow and grain. Headless comparisons exercised the old software fallback rather than the hardware shader; they did not establish visual equivalence. This is a correction to that regression.

The original shader from 5cf7191 is retained in scripts/gradient-shader-source.mjs and rendered offline at time 0/motion 0 by scripts/prepare-gradient-background.mjs. The committed responsive WebP stills retain the original shader appearance. Browser pages contain neither its source nor graphics-context setup; they remain static. Mobile is 52,796 bytes and desktop 66,556 bytes. Head preloads select only the matching viewport asset; hero/footer reuse the same URL. Regenerate with Playwright/Chromium and sharp using node scripts/prepare-gradient-background.mjs. Ordinary builds use committed stills and need no browser/GPU.

The header container still had its existing 30%-opaque background. It is now #0d0d0d with no backdrop blur, so scrolling page text cannot bleed through it. Menu placement, dimensions, focus and behaviour are retained.

## Validation

Build/lint, all 37 routes with/without JS, mobile/desktop navigation and keyboard/modal checks, secondary image/video checks (including cold hydration), and extended-character font checks pass. Static-background checks now verify the rendered asset URL, opaque header colour, and zero WebGL attempts at both 390/1440px. Client bundles contain no original background shader source. Screenshots capture restored hero/footer and an opaque header over scrolling content.

Three matched mobile Lighthouse 13.6 runs against pre-fix ffbc4f6 and restored previews, same browser/machine/settings, analytics excluded on both:

| Median | Before | Restored |
| --- | ---: | ---: |
| FCP / Speed Index / LCP | 1,213ms | 1,210ms |
| TBT | 0ms | 0ms |
| Performance | 100 | 100 |
| Transfer | 318,289 bytes | 371,609 bytes |

The still adds roughly 53KB on mobile (67KB desktop); fidelity is restored without claiming zero payload cost. A desktop all-category diagnostic scores 100 in performance/accessibility/best-practices/SEO/agentic browsing: LCP 292ms and TBT 0ms. These are local checks, not a replacement for hosted tests.

## Report comparison

The supplied PageSpeed report ys2mwh28sv reports mobile performance 100 / LCP 1,051ms / TBT 0ms and desktop performance 98 / LCP 281ms / TBT 0ms. The GTmetrix screenshot reports performance 71, structure 97, LCP 1.4s, TBT 453ms and CLS 0.01. Compared with the prior GTmetrix PDF, LCP improved from 1.6s while blocking time increased from 8ms. The screenshot lacks test settings and task attribution. Sign-in status is not established as the cause. The full report URL/trace is needed to identify those tasks and compare location, connection, device and engine before attributing the difference to code or the test service.

[Supplied PageSpeed report](https://pagespeed.web.dev/analysis/https-otherstuff-ai/ys2mwh28sv?form_factor=desktop)
