import { CAL_DISCOVERY_URL } from "@/lib/links";

export const automationFaqs = [
  {
    question: "Who is Automation Partner for?",
    answer: "Australian businesses of around 10 to 200 people where too much work still depends on manual handoffs, spreadsheets and people’s memory. We work most often with professional services, project-based and operations-heavy businesses.",
  },
  {
    question: "What happens in the first month?",
    answer: "We begin with two mornings alongside the people doing the work, identify the pain points and agree what to automate first. We spend the rest of that week building, configuring and testing, with the agreed changes working by Friday. Over the following weeks, we gather feedback and refine them.",
  },
  {
    question: "How do we decide what to automate first?",
    answer: "Together, we look for the work consuming the most time, slowing decisions, draining margin, tying up capital or creating risk. We agree the priority with your team and start where automation can make the clearest commercial difference.",
  },
  {
    question: "How many automations can we work on at once?",
    answer: "You set the pace. You can begin with one automation or run several improvement loops at once. Your team takes on as much change as the business can comfortably handle, and you can increase the pace when you’re ready.",
  },
  {
    question: "Will it work with the tools we already use?",
    answer: "Yes, in most cases. Ambulando connects to the software your team already uses, so automations can work from the same records your people do. If a tool cannot be connected or keeps getting in the way, we can build something that fits better.",
  },
  {
    question: "Do we need technical people?",
    answer: "No. You know the work and we handle the technical setup. We need access to the people closest to each process so they can explain how it works, test what we build and tell us what needs improving.",
  },
  {
    question: "What happens after the first month?",
    answer: "Keep going month to month, add more time to move faster, or stop. Each month builds on what is already working, but there are no long contracts and the minimum commitment is one month.",
  },
  {
    question: "Who owns the automations and our data?",
    answer: "You do. Your automations, your data and the software they run on stay with you whether you keep working with us or not. Everything is built on Ambulando, our open-source agent workspace, so your business is not locked into us or a single AI provider.",
  },
  {
    question: "How much does Automation Partner cost?",
    answer: "Automation Partner costs $5k per improvement loop, per month + GST, with a one-month minimum. One improvement loop is one focused stream of automation work delivered through the monthly cycle. Add another loop for another $5k a month + GST when you want to automate more concurrently. Ambulando is an additional $500 a month + GST at the early-adopter rate. You can cancel anytime.",
  },
];

// Core section keys - must match registry
export type SectionKey =
  | "navbar"
  | "hero"
  | "twoColumn"
  | "featurePanel"
  | "arcCarousel"
  | "logos"
  | "benefits"
  | "howItWorks"
  | "pricing"
  | "testimonials"
  | "faq"
  | "finalCta"
  | "footer"
  | "showcaseCards";

// Section configuration
export interface SectionConfig {
  key: SectionKey;
  enabled: boolean;
  id?: string; // For anchor links
  variant?: string; // e.g. "A" | "B" - specific to each section
  props: Record<string, any>; // Section-specific data
}

// Site metadata
export interface SiteContent {
  site: {
    name: string;
    tagline: string;
  };
  page: {
    title?: string;
    description?: string;
  };
  sections: SectionConfig[];
}

// Single source of truth for site content
export const siteContent: SiteContent = {
  site: {
    name: "Marginal Gains",
    tagline: "Custom AI systems for SMEs",
  },
  page: {
    title: "Marginal Gains",
    description:
      "Custom AI systems for SMEs — scoped to your workflows, delivered as working systems, built on infrastructure you own.",
  },
  sections: [
    {
      key: "navbar",
      enabled: false,
      props: {
        title: "MARGINAL GAINS",
        links: [
          { label: "What We Build", href: "#what-we-build" },
          { label: "How It Works", href: "#how-it-works" },
          { label: "Marginal Gains", href: "#twoColumn" },
          { label: "FAQ", href: "#faq" },
        ],
        cta: {
          label: "Login",
          href: "#",
        },
      },
    },
    {
      key: "hero",
      enabled: true,
      id: "hero",
      variant: "homeStyle",
      props: {
        variant: "homeStyle",
        title: "We build AI automation systems that ▲ grow your margins, ▲ free up capital, and ▼ reduce risk.",
        subtitle:
          "For Perth SMEs, we identify repeated manual workflows, then design and deliver AI automation systems around the work that drives margin, capital, and risk.",
        subtitleMaxWidth: "48ch",
        centerContent: true,
        ctaPrimary: { label: "Book a Call", href: "/contact" },
      },
    },
    {
      key: "arcCarousel",
      enabled: false,
      props: {
        cards: [
          { id: "1", title: "Word5", description: "Guess the word", image: "/Card01.webp", href: "/word5" },
        ],
        speed: 50,
        arcDepth: 60,
        overlapTop: "-280px",
        overlapBottom: "60px",
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "twoColumn",
      props: {
        label: "Our Approach",
        title: "Marginal Gains is the idea that many small improvements compound over time.",
        titleMaxWidth: "50rem",
        body:
          "Marginal Gains, made famous by Sir Dave Brailsford from British Cycling, focuses on improving many small things by 1% rather than chasing dramatic change all at once. Instead of treating AI transformation as a one-off rollout, we work with your team over time to make steady 1% improvements across your business.",
        callToAction: {
          label: "Book a Call",
          href: CAL_DISCOVERY_URL,
          bookCall: true,
          newTab: true,
          contentGap: "clamp(56px, 6vw, 76px)",
        },
        singleColumn: true,
        maxWidth: "wide",
        blocksVariant: "expandable",
        expandableCardSize: "uniform",
        expandableCardsLayout: "fullBleed",
        expandableCardsMaxWidth: "wide",
        expandableCardClassName: "speedrun-card mg-philosophy-card",
        disableExpandableHover: true,
        expandableCardFlushMedia: false,
        fullHeight: false,
        sectionMinHeightClass: "min-h-[112vh]",
        sectionContentClassName: "mg-philosophy-section py-6 md:py-10",
        blocksWrapperClassName: "mg-philosophy-blocks",
        blocks: [
          {
            number: "01",
            title: "It fits how your team works.",
            body: "We sit with the people doing the job, see how they actually do it, and build the automation around that. Once it’s live, we keep improving it based on what they tell us.",
            image: "/approach-team-work.webp",
            imageAlt: "A business interface showing people, processes and tools working together",
          },
          {
            number: "02",
            title: "You set the pace.",
            body: "Start with one automation, or run several at once. Your team takes on as much as the business can handle at the time, and you can step it up whenever you’re ready.",
            image: "/approach-set-pace.webp",
            imageAlt: "An improvement plan showing a business building steadily month by month",
          },
          {
            number: "03",
            title: "Each month compounds.",
            body: "Each automation keeps running as the next one is added. After six months, you could have six or more working across your business.",
            image: "/approach-monthly-compounding.webp",
            imageAlt: "Four monthly improvements compounding from July to October 2026",
          },
          {
            number: "04",
            title: "You’re never locked in.",
            body: "Your automations, your data and the software they run on stay with you, whether you keep working with us or not. It’s all built on Ambulando, which is open source.",
            image: "/approach-no-lock-in.webp",
            imageAlt: "Your automations, data and software represented as retained assets",
          },
        ],
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "twoColumn-6",
      props: {
        title: "Frequently asked questions.",
        body: "Here are short answers to the practical questions most teams ask before starting.",
        anchorId: "faq",
        singleColumn: true,
        faqItems: automationFaqs,
      },
    },
    {
      key: "logos",
      enabled: false,
      id: "logos",
      props: {
        title: "Trusted by teams at leading companies.",
        subtitle: "Join thousands of developers building better products",
        logos: [
          { name: "Acme Corp", href: "https://example.com" },
          { name: "TechStart Inc" },
          { name: "BuildFast", href: "https://example.com" },
          { name: "DevTools Co" },
          { name: "CloudScale", href: "https://example.com" },
          { name: "DataFlow" },
        ],
      },
    },
    {
      key: "benefits",
      enabled: false,
      id: "benefits",
      variant: "bento",
      props: {
        title: "Everything you need to succeed.",
        subtitle: "Powerful features designed to help you convert more visitors",
        items: [
          {
            title: "Content-Driven Architecture",
            description:
              "Edit copy and structure without touching code. Perfect for rapid iteration and testing.",
            icon: "FileText",
            highlight: true,
            bullets: [
              "No JSX changes needed",
              "Agent-friendly format",
              "Version controlled content",
            ],
          },
          {
            title: "Responsive Design",
            description:
              "Beautiful on every device with mobile-first approach ensuring great UX everywhere.",
            icon: "Smartphone",
          },
          {
            title: "Type-Safe Development",
            description:
              "Full TypeScript support means fewer bugs, better autocomplete, and improved developer experience.",
            icon: "Shield",
            bullets: ["Compile-time checks", "Better IDE support", "Fewer runtime errors"],
          },
          {
            title: "Performance Optimized",
            description:
              "Built on Next.js 15 with App Router for optimal loading speed and SEO.",
            icon: "Zap",
          },
          {
            title: "Production Ready",
            description:
              "Deploy with confidence using battle-tested components and best practices.",
            icon: "CheckCircle",
            bullets: ["Zero config deployment", "SEO optimized", "Accessibility built-in"],
          },
          {
            title: "Easy to Customize",
            description:
              "Tailwind CSS and shadcn/ui make it simple to match your brand perfectly.",
            icon: "Palette",
          },
        ],
      },
    },
    {
      key: "howItWorks",
      enabled: false,
      id: "howItWorks",
      props: {
        title: "Get started in minutes.",
        subtitle: "Three simple steps to launch your landing page",
        steps: [
          {
            title: "Edit Content",
            description:
              "Update the content file with your copy, structure, and configuration. All changes are version controlled.",
            icon: "FileEdit",
            bullets: [
              "No code changes required",
              "Edit copy and structure",
              "Preview changes instantly",
            ],
          },
          {
            title: "Customize Theme",
            description:
              "Adjust colors, fonts, and spacing to match your brand identity perfectly.",
            icon: "Palette",
            bullets: ["Choose your colors", "Select typography", "Set spacing values"],
          },
          {
            title: "Deploy & Ship",
            description:
              "Push to production with zero configuration. Works with Vercel, Netlify, and any modern host.",
            icon: "Rocket",
            bullets: ["One-click deployment", "Automatic optimization", "Global CDN"],
          },
        ],
        note: "No credit card required. Start building in under 5 minutes.",
      },
    },
    {
      key: "pricing",
      enabled: false,
      id: "pricing",
      props: {
        title: "Simple, transparent pricing.",
        subtitle: "Choose the plan that fits your needs",
        plans: [
          {
            name: "Starter",
            price: "$29",
            period: "/month",
            description: "Perfect for small projects",
            features: [
              "Up to 3 landing pages",
              "Basic analytics",
              "Email support",
              "Standard templates",
            ],
            cta: "Get Started",
            highlighted: false,
          },
          {
            name: "Professional",
            price: "$79",
            period: "/month",
            description: "For growing businesses",
            features: [
              "Unlimited landing pages",
              "Advanced analytics",
              "Priority support",
              "Custom templates",
              "A/B testing",
            ],
            cta: "Start Free Trial",
            highlighted: true,
          },
          {
            name: "Enterprise",
            price: "$199",
            period: "/month",
            description: "For large organizations",
            features: [
              "Everything in Professional",
              "Dedicated account manager",
              "Custom integrations",
              "SLA guarantee",
              "Training & onboarding",
            ],
            cta: "Contact Sales",
            highlighted: false,
          },
        ],
      },
    },
    {
      key: "testimonials",
      enabled: false,
      id: "testimonials",
      props: {
        title: "Loved by builders everywhere.",
        subtitle: "See what our customers have to say",
        testimonials: [
          {
            quote:
              "This template saved us weeks of development time. The content-driven approach is genius.",
            author: "Sarah Johnson",
            role: "CEO, TechStart",
            avatar: "/avatars/sarah.jpg",
          },
          {
            quote:
              "Finally, a landing page system that makes sense. Clean code and great documentation.",
            author: "Michael Chen",
            role: "Developer, BuildFast",
            avatar: "/avatars/michael.jpg",
          },
          {
            quote:
              "We've built 5 landing pages with this template. Each one converts better than the last.",
            author: "Emily Rodriguez",
            role: "Marketing Director, GrowthCo",
            avatar: "/avatars/emily.jpg",
          },
        ],
      },
    },
    {
      key: "faq",
      enabled: false,
      id: "faq",
      props: {
        title: "Frequently asked questions.",
        subtitle: "Everything you need to know",
        faqs: [
          {
            question: "How do I customize the content?",
            answer:
              "Simply edit the content/site.ts file. All copy, structure, and configuration lives there. No need to touch component code.",
          },
          {
            question: "Can I add custom sections?",
            answer:
              "Yes! Create a new section component, add it to the registry, and reference it in your content file. The system is designed for extensibility.",
          },
          {
            question: "Is this production-ready?",
            answer:
              "Absolutely. Built with Next.js, TypeScript, and Tailwind CSS. Includes proper SEO, performance optimizations, and responsive design.",
          },
          {
            question: "What about styling and themes?",
            answer:
              "The template uses Tailwind CSS and shadcn/ui with CSS variables for theming. Easy to customize colors, fonts, and spacing.",
          },
        ],
      },
    },
    {
      key: "finalCta",
      enabled: false,
      id: "finalCta",
      props: {
        title: "Let’s talk about bringing Level-Up to your school.",
        ctaPrimary: "Get Started",
        ctaSecondary: "Mail ons direct",
      },
    },
    {
      key: "footer",
      enabled: false,
      id: "footer",
      props: {
        logo: "Level-Up",
        logoText: "LEVEL-UP",
        links: [],
        social: [
          { platform: "LinkedIn", href: "https://www.linkedin.com/company/otherstuffvs/" },
          { platform: "YouTube", href: "https://www.youtube.com/@OtherStuffAI" },
        ],
        contact: {
          email: "info@otherstuff.studio",
          address: [
            "Other Stuff Pty Ltd",
            "ABN 20 682 110 970",
            "City Beach WA 6015",
          ],
        },
      },
    },
  ],
};
