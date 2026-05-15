# Newsletter SEO Policy

The canonical search target for evergreen newsletter issues should be the on-site URL under `/newsletter/...`.

## Indexing Rules

- Use `noindex: true` in `src/content/newsletter-seo-overrides.json` for event reminders, time-sensitive promotions, launch notices, or issues that should not compete for organic search.
- Keep evergreen essays indexable when they support a clear topic the site wants to own, such as AI systems for SMEs, workflow automation, operating leverage, privacy-first AI, margin, capital efficiency, or business resilience.
- Noindexed issues use `noindex, follow` and are excluded from the sitemap, but can remain linked where they help readers.

## Beehiiv Duplication

Beehiiv should act as the distribution copy. When Beehiiv controls allow it, set Beehiiv issue pages to canonicalize to the matching `https://otherstuff.ai/newsletter/...` URL or keep Beehiiv issue pages out of search.

If Beehiiv cannot canonicalize or noindex individual issues, choose deliberately:

- Index the Other Stuff page for evergreen pieces that deserve search investment.
- Mark the Other Stuff page `noindex: true` for promotional or thin issues where duplicate competition is not worth it.
- Keep manual `seoDescription` and `tags` overrides current so the site version has stronger snippet and entity signals than the imported Beehiiv defaults.
