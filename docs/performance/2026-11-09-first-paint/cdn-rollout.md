# Edge delivery handoff

Status: not configured. The available CapRover management call returns 403; no DNS/CDN management tool is available in this session. CapRover and DNS/CDN access are distinct. Establish the existing DNS provider, zone ownership, proxy topology and an account scoped to otherstuff.ai before applying rules. Do not interpret an origin nginx header or GTmetrix's recogniser as a complete topology inventory.

Use a same-origin edge proxy so asset URLs, worker loading, forms and canonical URLs remain unchanged. Verify the certificate and upstream HTTPS before switching DNS. Keep the origin available as the rollback target.

| Request | Shared edge policy | Browser policy |
| --- | --- | --- |
| GET/HEAD /media/* and /_astro/*, successful responses only | Cache for 1 year; content hashes provide versioning | Preserve origin public/max-age=31536000/immutable |
| GET/HEAD /optimized/* and /fonts/* | Up to 7 days; stable legacy filenames | Preserve 7-day origin policy |
| /api/* and all non-GET/HEAD methods | Bypass cache, including analytics and subscription errors | Preserve no-store |
| Public HTML, redirects, unknown routes | Initially bypass | Preserve HTML no-cache revalidation |
| Errors (4xx/5xx) | Do not cache during rollout | Preserve origin policy |

Keep the full URL/query in the cache key initially. Respect MIME, Content-Encoding and Vary: Accept-Encoding. Keep HTTP/2 (already verified at the public endpoint); test edge Brotli if the provider supports it without dynamic compression at origin.

Verify an asset MISS followed by HIT/Age from both Seattle and Australia. Record connect/TTFB/download timings, not only the CDN detector score. Compare at least three matched cold-browser visits and a warm-browser visit. Test native/React routes, mobile menu, worker publication with a real relay acknowledgement, a mocked subscription, redirects, real 404s and back/forward cache.

A second, separate experiment can cache only public static HTML for 60 seconds at the edge while retaining browser revalidation. Explicitly bypass API/non-GET, cookies or authorisation, redirects and error responses. Purge public HTML on each deployment; confirm changed HTML is served before calling a release complete. Do not enable this stage until edge cache rules and deploy purge access are established.

Rollback: disable the proxy/rules using the preserved original DNS configuration, purge the affected edge entries, and verify origin HTML/assets/API directly and publicly. Do not change the unrelated welcome.otherstuff.ai account service.

Success is lower regional median FCP/LCP/SI without stale HTML, broken forms, cached errors or worker failures. No speedup is promised before measurement. Static-only edge caching will not by itself remove the root HTML's origin TTFB.
