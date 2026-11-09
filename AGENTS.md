# Repository guidelines

This is the Other Stuff marketing website. Production uses Astro static output with selectively hydrated React components and a separate Express subscription API.

## Structure

- `src/pages/` and `src/layouts/`: native Astro routes and document layouts.
- `src/content.config.ts`: writing/newsletter collections, validation and file watching.
- `content/writing/`: editable Markdown with established line-based frontmatter; preserve its publishing format.
- `public/newsletter-issues.json` and `public/podcast-episodes.json`: archive sources; do not introduce generated copies under `src/`.
- `src/components/`: shared React interactions and native templates under `astro/`, plus colocated CSS.
- `server/index.js`: existing CommonJS Express subscription endpoint, proxied by nginx.
- `public/nstack/`: separate static page; preserve its assets and nginx prefix handling.

## Commands and checks

Use Node >=22.23.4. Install with `npm ci --include=dev`. Run `npm run build` and `npm run lint` for code changes. Build validates native HTML output. `npm run check:publishing` verifies content lifecycle and duplicate slugs. With a built preview on port 4567, run `npm run check:browser:astro` and `npm run check:routes`; use `ASTRO_PREVIEW_URL` to select a different preview. Install Playwright browser/runtime dependencies when needed. Do not submit real subscriptions in tests; intercept API requests.

## Implementation

Use native templates for content and layout. Hydrate small interactions rather than a complete page or router. Preserve existing brand typography, mobile layouts, canonical URLs, metadata/schema, archive indexing policies, booking and signup flows. Retain meaningful source images and generate display-sized derivatives. Keep API keys and local env files out of commits. Build and content generation do not authorize a managed-service restart or production deployment.

Hero and footer backgrounds use static stills rendered from the original shader, styled with CSS. Preserve their palette, glow and grain; do not substitute a plain gradient. The offline asset generator may use WebGL, but pages must not create graphics contexts or animate these backgrounds.

## Reviews

Work on a scoped branch. Describe user-visible changes, validation and remaining limitations in the PR. UI changes need browser evidence, including representative mobile/desktop and no-JavaScript content. Publishing changes need create/edit/delete/slug-change checks. A local performance run is lab evidence; report settings and compare matched runs. Never claim deployment from a build, PR or webhook response.
