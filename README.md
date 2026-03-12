# Other Stuff Website

Marketing site for Other Stuff, built with Vite, React 19, TypeScript, and React Router.

## Stack

- Vite for local development and production builds
- React 19 + TypeScript
- React Router for route-level pages
- Framer Motion for animation
- CSS files colocated with components and routes

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

Local dev runs on the Vite default at `http://localhost:5173`.

## Routes

Current primary routes live in [`src/App.tsx`](./src/App.tsx):

- `/` - current home page
- `/about`
- `/speedrun`
- `/marginal-gains`
- `/levelup`
- `/the-good-stuff`
- `/writing`
- `/writing/post`
- `/games`

Archived routes:

- `/archive/home`
- `/archive/company`

## Project Structure

```text
src/
  components/         Shared site components such as nav, footer, CTA, hero sections
  hooks/              Shared React hooks
  levelup/            Theme, content, and section system used by Level Up and reused elsewhere
  speedrun/           Speedrun-specific content, demos, and page styling
  marginal-gains/     Marginal Gains-specific content, demos, and page styling
  routes/             Route entry components and route-scoped CSS
public/               Static assets, images, video, icons
server/               Placeholder backend code and integration notes
```

## Content Model

This repo mixes two page patterns:

1. Route-authored pages

- Pages like [`src/routes/About.tsx`](./src/routes/About.tsx), [`src/routes/Writing.tsx`](./src/routes/Writing.tsx), and [`src/routes/Games.tsx`](./src/routes/Games.tsx) are written directly as route components.

2. Content-driven themed pages

- [`src/levelup/content/site.ts`](./src/levelup/content/site.ts)
- [`src/speedrun/content/site.ts`](./src/speedrun/content/site.ts)
- [`src/marginal-gains/content/site.ts`](./src/marginal-gains/content/site.ts)

These pages are rendered through the shared section system under [`src/levelup/components/sections`](./src/levelup/components/sections), with page-specific theming layered on top through:

- [`src/levelup/levelup.css`](./src/levelup/levelup.css)
- [`src/speedrun/speedrun.css`](./src/speedrun/speedrun.css)
- [`src/marginal-gains/marginal-gains.css`](./src/marginal-gains/marginal-gains.css)

If you are updating page copy, card content, CTA text, founder details, or section ordering on those themed pages, start in the corresponding `content/site.ts` file first.

## Shared Navigation and Footer

Global navigation, footer, and CTA components live in [`src/components`](./src/components).

The shared header dropdown data is currently defined in:

- [`src/components/NavigationDraft.tsx`](./src/components/NavigationDraft.tsx)

The shared footer links and social URLs are currently defined in:

- [`src/components/Footer.tsx`](./src/components/Footer.tsx)

## Assets

Static media is stored in [`public`](./public). This repo includes large video files and background images, and they materially affect repository size and build output size.

If you add or replace assets:

- prefer optimized video/image exports
- keep filenames stable when replacing existing assets
- remember that anything in `public` is copied into the production build

## Newsletter / Beehiiv

Newsletter signup expects Beehiiv credentials via environment variables:

- `BEEHIIV_PUBLICATION_ID`
- `BEEHIIV_API_KEY`

Copy `.env.example` to `.env.local` and add those values if you are wiring up newsletter signup locally.

There is placeholder subscription logic in [`server/subscribe.ts`](./server/subscribe.ts), but this repo is not currently a Next.js app. If `/api/subscribe` is required in production, it needs to be hosted behind an equivalent backend endpoint.

## Build Notes

- `npm run build` outputs the production site to `dist/`
- `dist/` can become large because it includes copied static media from `public/`
- `.git` is also relatively large because of asset history

## Working Conventions

- Keep styles in existing colocated CSS files unless there is a strong reason to centralize them
- For Speedrun, Marginal Gains, and Level Up changes, preserve the shared section renderer unless the page truly needs bespoke route markup
- Run `npm run lint` after UI changes
- For visual changes, verify both desktop and mobile states
