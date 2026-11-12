# Writing Markdown Conventions

Add one `.md` file per post in this folder.

Required frontmatter:

```md
---
title: Your post title
slug: your-post-slug
description: Search and sharing description, also used as fallback card copy
intro: Intro paragraph shown under the article title
date: 2026-04-21
readTime: 5 min read
tags: AI, Operations
---
```

Optional frontmatter:

```md
cardSummary: A short, useful preview sentence for article cards
author: Other Stuff
thumbnail: /Hero-Background.webp
ogImage: /og-default.png
```

Use `cardSummary` to give readers a concise reason to open an article (typically 12–20 words). It appears on Writing and Keep reading cards; `description` retains its search and sharing role. Titles and summaries are shown in full. Older articles without a summary fall back to `description`.

Supported markdown in the body:

- `## Heading`
- `### Subheading`
- plain paragraphs
- `- list items`
- `> blockquotes`
- `![Alt text](/image-path.webp)`
- inline links like `[label](/path)`
- bold text using `**bold**`

Then run:

```bash
npm run sync:writing
```

Or just run:

```bash
npm run dev
```

or

```bash
npm run build
```

Both commands regenerate writing data automatically first.
