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
        title: "We build AI systems that ▲ grow your margins, ▲ free up capital, and ▼ reduce risk.",
        subtitle:
          "Purpose-built to your unique needs, delivered as a working system, and built on infrastructure you own.",
        subtitleMaxWidth: "48ch",
        centerContent: true,
        ctaPrimary: { label: "Book a Free AI Audit", href: "mailto:info@otherstuff.studio" },
      },
    },
    {
      key: "arcCarousel",
      enabled: false,
      props: {
        cards: [
          { id: "1", title: "Bullrun", description: "Dodge the bulls", image: "/bullrun.webp", href: "https://bullrun.otherstuff.ai" },
          { id: "2", title: "Cowkey Kong", description: "Keep climbing", image: "/cowkey.webp", href: "https://cowkong.otherstuff.ai" },
          { id: "3", title: "Frogger", description: "Avoid the cards", image: "/frogger.webp", href: "https://frogger.otherstuff.ai" },
          { id: "4", title: "Lemmings", description: "Classic lemmings", image: "/lemmings.webp", href: "https://lemmings.otherstuff.ai" },
          { id: "5", title: "Pong", description: "Classic Pong", image: "/pong.webp", href: "https://pong.otherstuff.ai" },
          { id: "6", title: "Satoshi's Garden", description: "Stack sats", image: "/satsgarden.webp", href: "https://satsgarden.otherstuff.ai" },
          { id: "7", title: "Chesstr", description: "Play chess", image: "/chesstr.webp", href: "https://chesstr.otherstuff.ai" },
          { id: "8", title: "Scramble", description: "Navigate the cave", image: "/scramble.webp", href: "https://scramble.otherstuff.ai" },
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
        label: "Marginal Gains",
        title: "Marginal Gains is the idea that many small improvements compound over time.",
        titleMaxWidth: "50rem",
        body:
          "Marginal Gains takes its name from the approach popularised by Sir Dave Brailsford, who focused on improving many small things by 1% rather than chasing dramatic change all at once. Instead of treating AI transformation as a one-off rollout, we work with your team over time to make steady 1% improvements.",
        singleColumn: true,
        maxWidth: "wide",
        blocksVariant: "expandable",
        expandableCardSize: "uniform",
        expandableCardsLayout: "fullBleed",
        expandableCardsMaxWidth: "wide",
        expandableCardClassName: "speedrun-card mg-philosophy-card",
        disableExpandableHover: false,
        expandableCardFlushMedia: false,
        fullHeight: false,
        sectionMinHeightClass: "min-h-[112vh]",
        sectionContentClassName: "mg-philosophy-section py-6 md:py-10",
        blocksWrapperClassName: "mg-philosophy-blocks",
        blocks: [
          {
            number: "01",
            title: "Ongoing development",
            body: "Each month includes dedicated time to improve the systems already running in your business and to build the next workflow that matters.",
            demoKey: "monthlyRhythm",
          },
          {
            number: "02",
            title: "System optimisation",
            body: "Live systems are reviewed and refined as your business grows, so they stay useful, reliable, and aligned with how the work is actually being done.",
            demoKey: "capabilityDepth",
          },
          {
            number: "03",
            title: "Support",
            body: "When something needs attention, you have ongoing access to the team that built the system, so issues get resolved in context rather than handed to a generic support queue.",
            demoKey: "discussionThread",
          },
          {
            number: "04",
            title: "Wingmen Suite",
            body: "This is your operating environment. It gives your team visibility, holds the shared records agents work from, and organises the accumulated knowledge in your business.",
            demoKey: "productGraph",
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
        faqItems: [
          {
            question: "What does the free AI audit involve?",
            answer:
              "It starts with a short questionnaire for your team, followed by a working call to review the findings, test where the opportunity is clearest, and identify what is most worth building first.",
          },
          {
            question: "What do we walk away with from the audit?",
            answer:
              "A clearer view of where time and money are being lost, a prioritised workflow to focus on, and a practical recommendation on what building the first system would involve.",
          },
          {
            question: "What happens after the audit?",
            answer:
              "If there is a clear fit, we scope and build one focused AI system around that workflow. The engagement has a defined start, a defined end, and a working system delivered into your business.",
          },
          {
            question: "Do we need to be technical?",
            answer:
              "No. These systems are built around operational workflows in your business, not around your team's ability to code. What matters most is that the people closest to the work can help define how the system should behave.",
          },
          {
            question: "What is Marginal Gains?",
            answer:
              "For teams that want to keep going after the first system is live, Marginal Gains is the ongoing relationship. We keep improving the systems already running in your business, support them as your operations evolve, and build the next high-value workflows over time.",
          },
          {
            question: "What does Wingmen Suite do?",
            answer:
              "Wingmen Suite is the operating environment the systems run inside. It gives your team visibility, holds the shared records agents work from, and organises the accumulated knowledge in your business.",
          },
        ],
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
