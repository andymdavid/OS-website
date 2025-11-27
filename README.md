This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Setup

This project requires environment variables for the Beehiiv newsletter integration.

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Add your Beehiiv credentials to `.env.local`:
   - `BEEHIIV_PUBLICATION_ID` - Your publication ID (starts with `pub_`)
   - `BEEHIIV_API_KEY` - Your API key

Get these values from your Beehiiv dashboard: **Settings → Integrations → API V2**

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Site Configuration

### Testimonials Section

The Testimonials section is currently hidden (commented out in `app/page.tsx`) as testimonials are not yet available.

**To enable the Testimonials section when ready:**
1. Open `app/page.tsx`
2. Find the commented section: `{/* <Testimonials /> */}`
3. Uncomment it to: `<Testimonials />`
4. Add your testimonials data in `app/components/Testimonials.tsx`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
