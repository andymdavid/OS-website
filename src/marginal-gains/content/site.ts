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
    name: "Landing Template Starter",
    tagline: "Build high-converting landing pages with ease",
  },
  page: {
    title: "Landing Template Starter",
    description:
      "A Next.js landing page template with Tailwind CSS, shadcn/ui, and more",
  },
  sections: [
    {
      key: "navbar",
      enabled: false,
      props: {
        title: "SPEEDRUN",
        links: [
          { label: "What is Level-Up", href: "#twoColumn" },
          { label: "Why Games Work", href: "#twoColumn-2" },
          { label: "Workshop Flow", href: "#twoColumn-3" },
          { label: "Student Outcomes", href: "#twoColumn-4" },
          { label: "Support for Schools", href: "#twoColumn-5" },
          { label: "FAQ", href: "#faq" },
          { label: "Who we are", href: "#twoColumn-7" },
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
        title: "Develop internal AI Champions inside your business.",
        subtitle:
          "Marginal Gains is a community for teams who want to build practical AI capability inside their business. Members work hands-on with agents that support day-to-day work, with structured guidance, shared learning, and ongoing support to help that capability compound over time.",
        subtitleMaxWidth: "72ch",
        centerContent: true,
        ctaPrimary: { label: "Talk to Us", href: "mailto:info@otherstuff.studio" },
      },
    },
    {
      key: "arcCarousel",
      enabled: false,
      props: {
        cards: [
          { id: "1", title: "Bullrun", description: "Dodge the bulls", image: "/bullrun.png", href: "https://bullrun.otherstuff.ai" },
          { id: "2", title: "Cowkey Kong", description: "Keep climbing", image: "/cowkey.png", href: "https://cowkong.otherstuff.ai" },
          { id: "3", title: "Frogger", description: "Avoid the cards", image: "/frogger.png", href: "https://frogger.otherstuff.ai" },
          { id: "4", title: "Lemmings", description: "Classic lemmings", image: "/lemmings.png", href: "https://lemmings.otherstuff.ai" },
          { id: "5", title: "Pong", description: "Classic Pong", image: "/pong.png", href: "https://pong.otherstuff.ai" },
          { id: "6", title: "Satoshi's Garden", description: "Stack sats", image: "/satsgarden.png", href: "https://satsgarden.otherstuff.ai" },
          { id: "7", title: "Chesstr", description: "Play chess", image: "/chesstr.png", href: "https://chesstr.otherstuff.ai" },
          { id: "8", title: "Scramble", description: "Navigate the cave", image: "/scramble.png", href: "https://scramble.otherstuff.ai" },
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
      id: "twoColumn-2",
      props: {
        title: "Internal AI capability doesn’t form in\n a single workshop.",
        body:
          "Marginal Gains takes its name from the approach popularised by Sir Dave Brailsford, who focused on improving many small things by 1% rather than chasing dramatic change all at once.\n\nThe same principle applies to AI capability. Instead of attempting a large rollout on day one, we help you develop your AI champions inside the business who continue building and applying agents to real work over time.\n\nAs that capability strengthens inside your team, decisions about where AI should be used, how and why, are shaped by the people who understand your business intimately, not by third parties working from the outside.\n\nMarginal Gains provides the structure and ongoing guidance required to build that capability deliberately and sustain it over time.",
        layout: "split",
        maxWidth: "wide",
        fullHeight: true,
        textAlign: "left",
        splitRightEmpty: true,
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "twoColumn",
      props: {
        title: "A structured environment for ongoing AI capability development.",
        body:
          "Marginal Gains is a guided, ongoing program designed to support internal AI champions as they build, apply, and refine AI systems inside their business. Each month combines hands-on building, shared problem-solving, and access to practical tools that can be deployed directly into day-to-day work.",
        singleColumn: true,
        maxWidth: "wide",
        blocksVariant: "expandable",
        expandableCardSize: "uniform",
        expandableCardsLayout: "fullBleed",
        expandableCardsMaxWidth: "wide",
        expandableCardClassName: "speedrun-card",
        disableExpandableHover: false,
        expandableCardFlushMedia: true,
        fullHeight: true,
        blocks: [
          {
            number: "01",
            title: "Monthly working sessions",
            body: "Members bring real business problems. Together we design, build, and refine practical agents and workflows.",
            demoKey: "teamRoles",
          },
          {
            number: "02",
            title: "Access to Wingman",
            body: "Members deploy and manage agents using our open-source agent management system, ensuring capability translates into real operational use.",
            demoKey: "timeline",
          },
          {
            number: "03",
            title: "Shared learning",
            body: "Results, failures, and refinements are shared across the group, accelerating understanding and reducing isolated trial and error.",
            demoKey: "kanban",
          },
          {
            number: "04",
            title: "Product Lab access",
            body: "Members gain early access to tools and workflows developed by Other Stuff, shaped by real business needs.",
            demoKey: "outcomes",
          },
        ],
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "mg-blank",
      props: {
        title: "What happens inside the business when\ninternal AI capability compounds.",
        body:
          "When internal AI capability develops inside your business, your team builds firsthand experience applying agents to real work.\n\nYou and your team have tested the tools yourselves and understand how they perform in practice. Decisions about investment, risk, and next steps are shaped by lived experience.\n\nOver time, capability compounds and spreads through the organisation in a deliberate and internally led way.",
        layout: "split",
        maxWidth: "wide",
        fullHeight: true,
        splitModalCta: { label: "Talk to Us", href: "mailto:info@otherstuff.studio" },
        splitRightEmpty: true,
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "twoColumn-5",
      props: {
        title: "Marginal Gains is designed for teams committed to\nbuilding internal AI capability.",
        body:
          "This community is suited to businesses who want to develop internal AI champions rather than outsource capability. It works best when a small, cross-functional group is willing to apply agents to real work each month and gradually strengthen capability from within.",
        singleColumn: true,
        fullHeight: true,
        levelUpCardsLayout: "flat",
        levelUpCardsMaxWidth: "wide",
        levelUpCardsSize: "uniform",
        levelUpCardClassName: "speedrun-levelup-card",
        levelUpCards: [
          {
            id: "p1",
            number: "01",
            title: "An App You've Built",
            description:
              "Participants builds an app and understand how it was created, how it works, and how to adapt that approach to their own tools.",
            primaryTag: "Outcome",
            secondaryTag: "App",
            summaryItems: [],
          },
          {
            id: "p2",
            number: "02",
            title: "Hands-on with AI",
            description:
              "Participants use AI coding agents to build and modify their app, seeing how clear instructions translate into working features.",
            primaryTag: "Outcome",
            secondaryTag: "Agents",
            summaryItems: [],
          },
          {
            id: "p3",
            number: "03",
            title: "Growing Capability",
            description:
              "Team members develop the confidence and judgement to test ideas and extend AI use within the business without defaulting to external providers.",
            primaryTag: "Outcome",
            secondaryTag: "Capability",
            summaryItems: [],
          },
          {
            id: "p4",
            number: "04",
            title: "Clearer Decisions About AI",
            description:
              "Discussions on strategy, governance, and investment are anchored in lived experience rather than theory, assumptions, or vendor claims.",
            primaryTag: "Outcome",
            secondaryTag: "Strategy",
            summaryItems: [],
          },
        ],
      },
    },
    {
      key: "showcaseCards",
      enabled: true,
      id: "where-to-start",
      props: {
        title: "Where to start.",
        body: "Speedrun is delivered in two formats. Speedrun gets your team building a working AI-powered task app in three hours. Speedrun Applied extends that same build into a live workflow where agents begin carrying work across stages.",
        defaultActiveId: "speedrun",
        cards: [
          {
            id: "speedrun",
            title: "Speedrun",
            label: "Start here",
            emphasis: true,
            metaTags: ["3 hours", "In-person", "Small groups"],
            description:
              "In this session, you build a simple Kanban-style task app from scratch using AI coding agents. You connect it to an AI agent yourself and see how your instructions become working features in real time.",
            cta: { label: "Talk to Us", href: "mailto:info@otherstuff.studio" },
          },
          {
            id: "speedrun-applied",
            title: "Speedrun Applied",
            label: "Go Deeper",
            metaTags: ["3 Hours", "In-person", "Small groups"],
            description:
              "This session takes the app built in Speedrun and extends it into a simple operational workflow. AI agents begin carrying work forward across defined stages, following rules and triggers you set.",
            cta: { label: "Learn more", href: "mailto:info@otherstuff.studio" },
            secondaryNote: "Available to teams who have completed Speedrun",
          },
        ],
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "twoColumn-8",
      props: {
        title: "Where Speedrun fits inside your organisation.",
        body:
          "Many SMEs have to make decisions about tools, risk, investment, and policy without having worked directly with the technology themselves. Speedrun closes that gap by creating shared, hands-on experience inside the business.\n\nWhen start working practically with AI, capability can begin to grow from within the business rather than being delegated externally.",
        layout: "splitModal",
        textAlign: "left",
        splitModalVideoUrl: "https://www.youtube.com/embed/xVSldYWFxU8?start=3",
        splitModalCta: { label: "Talk to Us", href: "mailto:info@otherstuff.studio" },
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "twoColumn-6",
      props: {
        title: "Frequently asked questions.",
        body: "Here are answers to some of the common practical questions teams ask when considering Speedrun.",
        anchorId: "faq",
        singleColumn: true,
        faqItems: [
          {
            question: "Do we need a technical background to take part?",
            answer:
              "No. Speedrun is designed for founders, operators, and team leads without a technical background. You’ll work with AI coding agents in a guided environment, focusing on understanding how the tools behave rather than writing code yourself.",
          },
          {
            question: "What exactly do we build during the session?",
            answer:
              "In Speedrun, participants build a working Kanban-style task application using AI coding agents. In Speedrun Applied, that same tool is extended into a simple operational workflow where an AI agent begins carrying out tasks such as summaries, planning, and coordination.",
          },
          {
            question: "Is this just another AI presentation or demo?",
            answer:
              "No. There are no slide-heavy sessions or abstract case studies. The workshop is structured around building and modifying a real tool, so understanding comes from direct interaction rather than observation.",
          },
          {
            question: "How many people should attend?",
            answer:
              "Speedrun is designed as a small-group working session. The value comes from having cross-functional perspectives in the room and beginning to build shared internal capability, rather than training a single individual.",
          },
          {
            question: "Will this replace the need for consultants or developers?",
            answer:
              "No. Speedrun is not about replacing expertise. It is about helping your team build enough lived experience with AI to make informed decisions about when external support is needed and when it isn’t.",
          },
          {
            question: "Is the app we build intended to be production software?",
            answer:
              "No. The app is treated as a working artefact — a practical learning vehicle. The purpose is to understand how AI behaves and how systems are structured, not to deploy a finished enterprise system on day one.",
          },
          {
            question: "What happens after Speedrun?",
            answer:
              "Teams can extend the work through Speedrun Applied, where AI agents begin operating across workflows. For organisations wanting to deepen internal capability over time, Marginal Gains provides ongoing support and structured experimentation.",
          },
          {
            question: "How is this different from using tools like ChatGPT?",
            answer:
              "Speedrun goes beyond prompting a chatbot. Participants work with coding and task-based AI agents to build and run structured systems, which creates a deeper understanding of how AI behaves inside operational workflows.",
          },
        ],
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "twoColumn-7",
      props: {
        title: "Who we are.",
        body:
          "Speedrun is delivered by Other Stuff, a Perth-based AI-native product studio that works hands-on with AI systems. We help business leaders understand how AI works by building practical tools with it, not by talking about it in theory.\n\nWe’ve worked with Stakwork, a Silicon Valley company building agent-based systems, and our experience shapes how we approach building internal AI capability for organisations. Understanding comes fastest when teams move from observing AI to working with it directly.\n\nWe operate as an AI-first business ourselves, using these tools across our own operations and building systems like Wingman, our open-source agent management platform.\n\nSpeedrun brings that same build-first approach into your organisation, helping teams develop practical judgement and confidence from direct experience.",
        splitModalCta: { label: "Learn more", href: "https://otherstuff.ai" },
        bodyMobileSplitParas: [
          "We’ve worked with Stakwork",
          "We operate as an AI-first business",
          "Speedrun brings",
        ],
        bodyLinks: [
          {
            text: "Other Stuff",
            href: "https://otherstuff.ai",
            newTab: true,
          },
        ],
        layout: "split",
        textAlign: "left",
        maxWidth: "wide",
        fullHeight: true,
        splitRightBlocks: [
          {
            title: "Pete Winn",
            role: "Co-Founder",
            image: "/Pete.png",
            body: "Pete has a long track record in process redesign, deep tech and large enterprise and programme deployments from Rolls Royce to Rio Tinto.",
          },
          {
            title: "Andy David",
            role: "Co-Founder",
            image: "/Andy.png",
            body: "Andy's background is in venture design, management consulting and technology startups, including process improvement for enterprise and SMEs.",
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
