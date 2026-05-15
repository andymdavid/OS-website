# Writing Markdown Conventions

Add one `.md` file per post in this folder.

Required frontmatter:

```md
---
title: Your post title
slug: your-post-slug
description: One sentence used on the writing index and meta description
intro: Intro paragraph shown under the article title
date: 2026-04-21
readTime: 5 min read
tags: AI, Operations
---
```

Optional frontmatter:

```md
author: Other Stuff
thumbnail: /Hero-Background.webp
ogImage: /og-default.png
```

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
