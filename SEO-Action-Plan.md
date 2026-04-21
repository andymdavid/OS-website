# SEO Action Plan — Other Stuff (otherstuff.ai)

**Date:** 2026-03-26
**Status:** Draft
**Constraint:** Site remains a client-side React SPA (Vite + React Router). No SSR framework migration.

---

## Current State

- **Technical SEO foundation:** Solid — proper meta tags, JSON-LD schemas, OG tags, canonical URLs, prerender script, sitemap
- **Organic visibility:** Zero — not ranking for any commercial keyword in the Perth market
- **Analytics:** None — no GA4, no Search Console, no event tracking
- **Local presence:** No Google Business Profile, no directory listings
- **Blog:** Empty and set to noindex
- **Core problem:** Great positioning, zero discoverability

---

## Part 1: Immediate Actions (This Week)

### 1.1 Set Up Google Search Console

- Verify otherstuff.ai ownership
- Use URL Inspection tool to check what Google actually renders for each page
- Submit sitemap (https://otherstuff.ai/sitemap.xml)
- Monitor Index Coverage report for errors
- This will tell us whether the prerender script is sufficient or if we need to improve it

### 1.2 Set Up Google Analytics 4

- Create GA4 property for otherstuff.ai
- Add gtag.js snippet to index.html (or use GTM container)
- Set up conversion events:
  - Email signup (hero CTA)
  - Contact form submission
  - Outbound clicks to booking/email links
  - Scroll depth on service pages (Speedrun, Level Up, Marginal Gains)
- Set up traffic source tracking to measure SEO progress over time

### 1.3 Create Google Business Profile

- Business name: Other Stuff
- Category: "Business consultant" + "Computer training school" + "Educational institution"
- Address: City Beach, WA 6015
- Services: AI Workshops, AI Training, AI School Incursions, AI Capability Building
- Add photos, business hours, service descriptions
- Link to otherstuff.ai
- Request reviews from past workshop participants

---

## Part 2: Improve Crawlability Without Leaving the SPA (Weeks 1-2)

The site is a client-side SPA. Google can render JavaScript, but it's slower and less reliable than static HTML. The existing `prerender-meta.js` script injects meta tags and noscript fallback content at build time. We need to extend this approach.

### 2.1 Extend the Prerender Script to Generate Full Static HTML

Instead of just injecting meta tags into a single index.html, generate a **separate HTML file for every route** with the full page content baked in. This is static-site generation (SSG) without changing the framework.

**Approach:**
- Use a headless browser (Puppeteer or Playwright) as a post-build step
- After `vite build`, launch headless Chrome against the built dist folder
- Visit each route, wait for React to render, then save the fully-rendered HTML
- Replace the single `dist/index.html` with per-route HTML files
- Nginx already handles SPA fallback, so client-side navigation still works

**Build script addition:**
```
"build": "vite build && node scripts/prerender-routes.js"
```

**Routes to prerender:**
- `/` (homepage)
- `/speedrun`
- `/levelup`
- `/marginal-gains`
- `/about`
- `/the-good-stuff`
- `/games`
- `/terms`
- `/privacy`

**Why this matters:** Google will see fully-rendered HTML on first request. No JavaScript execution required for indexing. This is the single highest-impact SEO improvement we can make while staying on the SPA.

### 2.2 Validate with Search Console

After deploying the prerendered pages:
- Use URL Inspection on each key page
- Confirm Google sees the full rendered content, not a blank `<div id="root"></div>`
- Check for any rendering errors or blocked resources

### 2.3 Add Nginx Headers

```nginx
# Security + SEO headers
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

# Short cache for HTML pages (so updated content gets indexed quickly)
location / {
    try_files $uri $uri/ /index.html;
    add_header Cache-Control "no-cache, must-revalidate";
}
```

---

## Part 3: Keyword Targeting (Weeks 2-4)

### 3.0 Search Volume Context

Exact volumes require Google Keyword Planner (see Section 7), but directional estimates for the Perth/AU market show clear patterns:

| Keyword | Est. Monthly Searches (AU) | Competition | Notes |
|---------|---------------------------|-------------|-------|
| **"AI course Perth"** | 100–300 | Low | Highest volume local term — "course" is the most established search pattern |
| **"AI training Perth"** | 50–200 | Low-Medium | Strong commercial intent, 3-5x more volume than "workshop" |
| **"ChatGPT training Perth"** | 50–150 | Low | Peaked 2023-24, still carries significant volume |
| **"AI consulting Perth"** | 50–150 | Medium | 10+ competitors, but differentiation possible |
| **"AI training Australia"** | 200–500 | Medium | National reach, higher volume |
| **"AI workshop Perth"** | 10–50 | Very Low | Lower volume but zero competition — easy to own |
| **"AI workshop Australia"** | 100–300 | Medium | National, more competitive |
| **"AI for small business"** (AU) | 50–200 | Low | Good for Marginal Gains |
| **"AI workshop for schools"** | 10–50 | Very Low | Niche but high-intent buyers (teachers/coordinators) |
| **"AI incursion Perth"** | 0–10 | None | Schools use this term but volume is tiny — target as secondary |
| **"AI agent workshop"** | 0–10 | None | Too new, but rising fast — get in early |
| **"agentic AI workshop"** | 0–10 | None | Conference-level buzz, not yet searched by buyers |
| **"AI course Perth" cluster total** | **300–600 combined** | | All variations of training/course/workshop + Perth |

**Key insight:** "Course" and "training" have 3-5x more search volume than "workshop" in the Australian market. The Speedrun page title currently uses "workshop" — we need to incorporate "training" and "course" as primary keywords without losing the "workshop" term entirely.

**Strategy:** Target keyword clusters, not individual terms. A well-optimised Speedrun page can rank for "AI training Perth" + "AI course Perth" + "AI workshop Perth" + "ChatGPT training Perth" + dozens of long-tail variations simultaneously. Individual terms are low volume; the cluster is meaningful.

### 3.1 Primary Keywords to Target (Reweighted by Volume)

| Priority | Keyword | Est. Volume | Target Page | Current Status | Action |
|----------|---------|-------------|-------------|----------------|--------|
| 1 | **AI training Perth** | 50–200 | /speedrun | Not targeted at all | Add to title, H1, and body copy — highest-volume local term |
| 2 | **AI course Perth** | 100–300 | /speedrun | Not targeted | Add "course" language in body copy and meta description |
| 3 | **ChatGPT training Perth** | 50–150 | /speedrun | Not targeted | Mention ChatGPT/Claude by name in workshop description |
| 4 | **AI workshop Perth** | 10–50 | /speedrun | In title, not ranking | Keep — low volume but zero competition, easy to own |
| 5 | **AI workshop for schools Perth** | 10–50 | /levelup | Partially in title | Strengthen with body content |
| 6 | **AI incursion Perth** | 0–10 | /levelup | Not targeted at all | Add "incursion" language — schools use this term |
| 7 | **AI for small business Perth** | 50–200 | /marginal-gains | Not specifically targeted | Add SME/small business Perth language |
| 8 | **AI agent workshop** | 0–10 | /speedrun | Not targeted | Add agent-building language — get in early on rising term |

### 3.2 Page-Level Keyword Optimisation

#### /speedrun — Target Cluster: "AI Training Perth"
- **Primary keywords:** AI training Perth, AI course Perth (highest volume)
- **Secondary keywords:** AI workshop Perth, ChatGPT training Perth, hands-on AI training, AI agent workshop, AI workshop for teams, prompt engineering workshop Perth
- **Title tag update:** Consider changing from "Speedrun — Hands-On AI Workshop Perth" to **"Speedrun — Hands-On AI Training & Workshop | Perth"** to capture both "training" and "workshop" searches
- **Meta description update:** Include "AI training", "AI course", and "Perth" — e.g., "A 3-hour hands-on AI training course in Perth. Your team builds a real application using AI agents — no technical background required."
- **Body copy actions:**
  - Add a paragraph early in the page that naturally uses "AI training" — e.g., "Speedrun is a hands-on AI training session where your team builds something real in 3 hours"
  - Mention "AI course" at least once — e.g., "Unlike a traditional AI course, Speedrun is built around doing, not watching"
  - Name-drop tools: "working with tools like ChatGPT, Claude, and AI coding agents" (captures "ChatGPT training Perth" searches)
  - Mention "AI agents" explicitly in the workshop description (participants build with AI agents)
  - Add internal links from blog content (once created)

#### /levelup — Target Cluster: "AI for Schools Perth"
- **Primary keyword:** AI workshop for schools Perth
- **Secondary keywords:** AI incursion Perth, AI education high school, AI course for students, AI workshop students WA, STEM incursion Perth
- **Title tag:** Current "Level Up — AI Workshop for Schools in Perth" is good. Consider adding "AI Incursion" as a subtitle in the meta description.
- **Meta description update:** Include "incursion" — e.g., "A 90-minute AI workshop and school incursion in Perth. Students build their own game using AI — no coding required."
- **Body copy actions:**
  - Add the word "incursion" to the page copy — e.g., "Available as a school incursion across Perth and Western Australia"
  - Add a sentence targeting teachers as the buyer: "Book a 90-minute AI incursion for your school"
  - Mention curriculum alignment if applicable
  - Add "Western Australia" and "WA" as geographic qualifiers (not just "Perth")
  - Reference "STEM" where natural — schools search for "STEM incursion Perth" too

#### /marginal-gains — Target Cluster: "AI for Small Business Perth"
- **Primary keywords:** AI for small business Perth, ongoing AI training Perth
- **Secondary keywords:** AI capability building SME Australia, AI champions program, AI consulting Perth (partial overlap)
- **Title tag update:** Consider "Marginal Gains — Ongoing AI Training for Perth SMEs" to capture "AI training" + "Perth" + "SME" searches
- **Body copy actions:**
  - Add "Perth" and "Australian SMEs" more prominently in body copy
  - Use the phrase "AI champions" — it's a searchable concept you already use internally
  - Add a section or paragraph addressing "why ongoing training beats one-off workshops"
  - Mention "small business" explicitly (not just "SME" — people search "small business" more often)

### 3.3 Complete the Event Schemas

Speedrun and Level Up Event schemas are missing required fields for Google rich results:

```json
{
  "@type": "Event",
  "startDate": "2026-04-15T09:00:00+08:00",
  "endDate": "2026-04-15T12:00:00+08:00",
  "duration": "PT3H",
  "performer": {
    "@type": "Person",
    "name": "Pete Winn"
  },
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "offers": {
    "@type": "Offer",
    "url": "https://otherstuff.ai/speedrun",
    "availability": "https://schema.org/InStock"
  }
}
```

- Update with real dates as workshops are scheduled
- Add `duration`: PT3H for Speedrun, PT90M for Level Up
- Add `performer` (Pete Winn and/or Andy David)
- This enables event rich results in Google Search

---

## Part 4: Content Strategy — Launch the Blog (Weeks 3-8)

The `/writing` section is currently empty and set to `noindex`. This is the biggest missed opportunity. Blog content drives informational search traffic that feeds the commercial funnel.

### 4.1 Remove noindex from /writing

Change `noindex: true` to `noindex: false` in the Writing route SEO component. Add `/writing` to the sitemap if not already there (it is currently included).

### 4.2 Publish Keyword-Targeted Articles

**Priority articles (publish first — target highest-volume keywords):**

| # | Title | Target Keywords | Est. Cluster Volume | Funnel Stage |
|---|-------|----------------|-------------------|--------------|
| 1 | "AI Training in Perth: What Your Team Actually Builds in 3 Hours" | AI training Perth, AI course Perth, ChatGPT training Perth | 200–500 combined | Consideration |
| 2 | "AI for Small Business in Perth: Where to Start (Without Hiring a Developer)" | AI for small business Perth, AI for SME Australia | 50–200 | Awareness |
| 3 | "AI Incursions for Schools: What Students Actually Build in 90 Minutes" | AI incursion Perth, AI workshop schools, STEM incursion | 20–60 | Consideration |
| 4 | "How to Build Internal AI Capability That Compounds Over Time" | AI capability building SME, AI training Australia | 50–200 | Awareness |
| 5 | "Hands-On AI Training vs Presentations: Why Perth Teams Are Choosing to Build" | hands-on AI training, AI workshop Perth | 50–150 | Consideration |

**Secondary articles (months 2-3):**

| # | Title | Target Keywords | Notes |
|---|-------|----------------|-------|
| 6 | "AI for Trades and Construction: Practical Use Cases in Perth" | AI for trades Perth, AI for construction | Niche vertical, zero competition |
| 7 | "What Teachers Need to Know Before Booking an AI Incursion" | AI workshop for teachers WA, AI incursion schools | Uses "incursion" — the term teachers search |
| 8 | "The AI Champions Model: Building Capability That Compounds" | AI champions program | Own this term before competitors adopt it |
| 9 | "ChatGPT, Claude, and AI Agents: A Practical Guide for Perth Businesses" | ChatGPT training Perth, AI agents for business | Captures branded tool searches |
| 10 | "Agentic AI in 2026: What Perth Businesses Should Know" | agentic AI, AI agents | Rising term — get in early |

### 4.3 Article SEO Checklist

For every article published:
- [ ] Unique title tag with primary keyword
- [ ] Meta description (150-160 chars) with keyword and CTA
- [ ] H1 matches or closely mirrors the title tag
- [ ] Primary keyword in first 100 words
- [ ] Internal links to relevant service pages (Speedrun, Level Up, Marginal Gains)
- [ ] At least one internal link from existing pages to the new article
- [ ] Add `BlogPosting` or `Article` JSON-LD schema
- [ ] Add to sitemap
- [ ] OG image (can reuse defaults initially)
- [ ] Remove noindex flag (ensure WritingPost route allows indexing for published posts)

---

## Part 5: Local SEO & Directory Listings (Weeks 2-4)

### 5.1 Directory Submissions (Free)

| Directory | URL | Priority |
|-----------|-----|----------|
| Google Business Profile | business.google.com | Critical |
| Goodfirms | goodfirms.co | High |
| TechBehemoths | techbehemoths.com | Medium |
| Wellfound (AngelList) | wellfound.com | Medium |
| Perth Map | perthmap.com.au | Medium |
| Local Business Guide | localbusinessguide.com.au | Low |

### 5.2 Community & Ecosystem Listings

| Platform | Action | Priority |
|----------|--------|----------|
| **Spacecubed** | Get listed as ecosystem partner, appear in their AI meetup roundups | High |
| **WA AI Hub / Perth AI Innovators** | Participate in meetups, get listed as a workshop provider | High |
| **Eventbrite** | List upcoming Speedrun and Level Up workshops as events | High |
| **Humanitix** | Alternative event listing (used by WA AI Hub) | Medium |
| **StartupNews.com.au** | Pitch a story about Other Stuff | Medium |
| **CCIWA** | Join, list services, participate in events | Medium |

### 5.3 Backlink Opportunities

- **Guest post on SmartCompany.com.au** — they publish AI/SME content regularly
- **Spacecubed blog** — they write "AI meetups in Perth" roundups
- **Perth Now / WAtoday** — local press coverage of AI education in schools (Level Up angle)
- **Education department or school newsletters** — for Level Up
- **Podcast cross-promotion** — appear on other Australian business/tech podcasts, link back

---

## Part 6: Competitive Positioning

### 6.1 Key Competitors to Monitor

| Competitor | What They Do | Where They Compete | Your Differentiator |
|-----------|-------------|-------------------|---------------------|
| AI Explorer Australia | Self-guided AI workshop kits | "hands-on AI workshop" nationally | Facilitator-led, participants build with AI agents |
| Essemy | 2-day AI training, $12,000 | "AI training Perth" | 3 hours, fraction of the cost, build-first approach |
| AI Agency Perth | SME AI implementation + training | "AI training Perth", "AI consulting Perth" | Capability building vs done-for-you |
| Agentrix | AI agent automation (chatbots, voice) | "AI agents Perth" | Open-source tools + training vs agency services |
| AICODE Australia | STEM/robotics school incursions | "AI incursion Perth" | Generative AI creation vs robotics/hardware |
| Neuranext | AI education for schools (robotics/CV) | "AI workshop schools Australia" | Game-building with gen AI vs robotics activities |

### 6.2 Messaging to Reinforce in SEO Copy

- **"Hands-on from the start"** — differentiate from presentation-based workshops
- **"No technical background required"** — lower the barrier vs competitors targeting developers
- **"Build with AI agents"** — own the agentic AI workshop space before others arrive
- **"Perth-based, facilitator-led"** — local trust vs national/online competitors
- **"Capability, not dependency"** — differentiate from AI agencies that build for you

---

## Part 7: Tracking & Measurement

### 7.1 KPIs to Track Monthly

| Metric | Tool | Target (3 months) | Target (6 months) |
|--------|------|-------------------|-------------------|
| Organic sessions | GA4 | Baseline established | 2x baseline |
| Indexed pages | Search Console | All 9+ pages indexed | 15+ (with blog posts) |
| Keywords ranking (positions 1-10) | Search Console | 3-5 keywords | 10-15 keywords |
| Google Business Profile views | GBP Insights | Baseline established | Steady growth |
| Click-through rate (organic) | Search Console | Baseline | Improve titles/descriptions for low-CTR pages |
| Conversions (email signups, contact) | GA4 | Tracking live | Attributing to organic |

### 7.2 Monthly SEO Review Checklist

- [ ] Review Search Console performance report (clicks, impressions, CTR, position)
- [ ] Check Index Coverage for new errors
- [ ] Review top queries driving impressions (are we showing up for target keywords?)
- [ ] Publish at least 2 blog articles
- [ ] Check Google Business Profile for new reviews, questions
- [ ] Update Event schemas with upcoming workshop dates
- [ ] Monitor competitor pages for changes

---

## Part 8: Technical Debt & Quick Wins

### 8.1 Quick Wins (< 1 hour each)

- [ ] Add `theme-color` meta tag to index.html
- [ ] Add `apple-touch-icon` link for iOS
- [ ] Add explicit `width` and `height` attributes to all `<img>` tags (prevents CLS)
- [ ] Add `lang="en-AU"` to the `<html>` tag in index.html
- [ ] Escape HTML entities in prerender-meta.js descriptions (prevent XSS edge cases)
- [ ] Add `Cache-Control: no-cache` header for HTML in nginx.conf
- [ ] Add security headers to nginx.conf (HSTS, X-Frame-Options, X-Content-Type-Options)

### 8.2 Medium Effort

- [ ] Create favicon.ico fallback for older browsers
- [ ] Add larger favicon variants (192x192, 512x512) for PWA/bookmarks
- [ ] Add breadcrumb schema for nested routes (/writing/post-slug)
- [ ] Create a web app manifest (manifest.json) for PWA signals
- [ ] Add `BlogPosting` schema support to the WritingPost component

### 8.3 Ongoing

- [ ] Keep sitemap updated as blog posts are published
- [ ] Update Event schemas with real dates when workshops are scheduled
- [ ] Monitor Core Web Vitals in Search Console and optimise as needed
- [ ] Build internal linking structure as content grows

---

## Summary: Top 10 Actions by Impact

| # | Action | Impact | Effort | Notes |
|---|--------|--------|--------|-------|
| 1 | Set up Google Search Console + verify rendering | Critical | Low | Unblocks everything — tells us what Google actually sees |
| 2 | Set up Google Analytics 4 | Critical | Low | Can't measure progress without data |
| 3 | **Rewrite Speedrun title/meta to target "AI training Perth"** | **High** | **Low** | **"Training" and "course" have 3-5x the volume of "workshop" — this is the single highest-leverage keyword change** |
| 4 | Build full static prerendering (Puppeteer post-build) | High | Medium | Solves the SPA rendering barrier for crawlers |
| 5 | Create Google Business Profile | High | Low | Essential for local pack visibility |
| 6 | Add "AI incursion" language to Level Up page | High | Low | What schools actually search for |
| 7 | Launch the blog — article #1: "AI Training in Perth" | High | Medium | Targets the highest-volume cluster (200-500/mo combined) |
| 8 | Add "ChatGPT" and "Claude" mentions to Speedrun copy | Medium-High | Low | Captures branded tool searches (50-150/mo) |
| 9 | List on Eventbrite, Goodfirms, Spacecubed | Medium-High | Low | Free backlinks + discovery channels |
| 10 | Complete Event schemas with real dates and duration | Medium | Low | Enables event rich results in Google |

### Validate These Estimates

Before implementing keyword changes, spend 15 minutes in **Google Keyword Planner** (free with a Google Ads account) to confirm:
- [ ] "AI course Perth" vs "AI training Perth" vs "AI workshop Perth" — exact volume comparison
- [ ] "ChatGPT training Perth" — still carrying volume or declining?
- [ ] "AI incursion Perth" vs "AI incursion" vs "STEM incursion Perth" — which variant has volume?
- [ ] "AI for small business" — national volume, is it worth a dedicated page?
- [ ] Any keyword opportunities we've missed that Keyword Planner suggests as related terms

This takes 15 minutes and will confirm or adjust the priority order above.
