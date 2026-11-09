# Other Stuff website

Astro generates the marketing pages, workshops, writing, newsletter archive and podcast index as static HTML. React 19 enhances individual menus, forms, demos and interactive workshop sections. Content navigation uses ordinary links. The separate Express service continues to serve `/api/subscribe` through the existing nginx proxy.

## Development and validation

Requires Node >=22.23.4.

```sh
npm ci --include=dev
npm run dev
npm run build
npm run lint
npm run preview -- --port 4567
npm run check:browser:astro
npm run check:routes
npm run check:publishing
```

`npm run build` writes ignored `dist/`, including sitemap and LLM reference files, and validates the built homepage and articles. Browser checks use Playwright Chromium and require its browser/runtime dependencies. Set `ASTRO_PREVIEW_URL` when previewing on another address. They block external requests and use reduced motion; they verify local functionality rather than production analytics, external services or visual/performance parity. Subscription checks intercept requests and never submit a real signup.

## Source and publishing

- `src/pages/`: native route templates and collection-backed article routes.
- `src/layouts/SiteLayout.astro`: document, social metadata, fonts and deferred analytics.
- `src/content.config.ts`: validated, watched writing and newsletter collections.
- `content/writing/*.md`: original line-based frontmatter and Markdown conventions; filenames may differ from `slug`. `README.md` is documentation, not an article. Required fields: title, description, intro, date, readTime. Slugs must be unique lowercase words separated by hyphens. The existing Markdown/custom chart renderer is retained.
- `public/newsletter-issues.json`: the single newsletter archive source, refreshed explicitly with `npm run sync:newsletter` using existing Beehiiv environment configuration. Missing credentials preserve the last available archive. Updating content never requires a generated copy under `src/`.
- `public/podcast-episodes.json`: podcast index source, refreshed with `npm run update:podcast`.
- `src/components/astro/`: native hero, CTA, legal and workshop composition.
- `src/components/` and workshop folders: selectively hydrated React components and colocated CSS.
- `public/nstack/`: existing self-contained static NStack page, copied without changing its assets or behaviour.

After adding, editing, deleting or changing an article slug, run `npm run build`. Astro regenerates the index, article routes, related posts, sitemap and LLM references from the same collections. Development watches content additions/edits/deletions. `sync:writing` runs Astro content validation; `sync:seo` is a compatibility alias for a full build.

## Deployment

The existing Dockerfile runs `npm run build` and copies `dist/` to nginx. It retains the Node subscription service and `/api/` proxy. nginx returns a real 404 with the generated 404 page, redirects both `/marginal-gains` forms to `/ai-automation/`, preserves NStack's prefix handling, compresses text and caches hashed `/_astro/` files. Do not infer deployment from a local build or PR. Use the established release process and verify the actual live release separately.
