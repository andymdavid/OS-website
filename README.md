# OS Website (Vite + React)

## Environment setup

Newsletter signup uses Beehiiv credentials in the backend handler. The frontend still posts to `/api/subscribe`, which you will need to host separately.

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Add your Beehiiv credentials to `.env.local`:
- `BEEHIIV_PUBLICATION_ID` - Your publication ID (starts with `pub_`)
- `BEEHIIV_API_KEY` - Your API key

Get these values from your Beehiiv dashboard: Settings → Integrations → API V2

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173 to view the site.

## Project structure

- `src/routes/Home.tsx` - Home page
- `src/routes/Company.tsx` - Company page
- `src/components/*` - UI sections
- `src/hooks/*` - Hooks
- `src/globals.css` - Global styles and design tokens

## Testimonials section

The Testimonials section is currently hidden (commented out in `src/routes/Home.tsx`).

To enable:
1. Open `src/routes/Home.tsx`
2. Find the commented section: `{/* <Testimonials /> */}`
3. Uncomment it: `<Testimonials />`
4. Add your testimonials data in `src/components/Testimonials.tsx`

## Backend note

The old Next.js API route has been moved to `server/subscribe.ts` as a placeholder. You will need to host an equivalent endpoint for `/api/subscribe` when deploying.
