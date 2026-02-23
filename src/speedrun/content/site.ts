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
        title: "Learn how to work with AI\nby building with it.",
        subtitle:
          "Speedrun is a hands-on workshop where teams learn how to use AI effectively by building practical tools with AI agents. No coding experience required.",
        subtitleMaxWidth: "65ch",
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
      id: "twoColumn",
      props: {
        title: "Speedrun at a glance.",
        body:
          "Every Speedrun session follows the same hands-on format. You'll work directly with AI agents to build practical tools from the beginning, and by the end you'll have firsthand experience with what AI can actually do.",
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
            title: "Who should attend",
            body: "Speedrun is for SME operators and team leads who need to understand what AI can do for their business - no technical background required.",
            image: "/Card01.png",
          },
          {
            number: "02",
            title: "Session structure",
            body: "Speedrun is a 3-hour, guided, hands-on workshop, delivered in small groups with facilitation and support provided throughout.",
            image: "/Card02.png",
          },
          {
            number: "03",
            title: "What you'll build",
            body: "Participants build a working Kanban-style task tool and connect an AI agent that tracks and summarises work as it changes.",
            image: "/Card03.png",
          },
          {
            number: "04",
            title: "What you leave with",
            body: "You leave with a working tool you've built yourself and clarity about what's possible when you apply AI to your own business context.",
            image: "/Card04.png",
          },
        ],
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "twoColumn-2",
      props: {
        title: "Why Speedrun Exists.",
        body:
          "Most businesses know they should be doing more with AI and automation, but they don’t know where to start, what to connect, or how to turn ideas into something real. Progress often remains stuck at research, demos, or random experiments.\n\nSpeedrun exists to help people move from wanting to use AI in their business to actually building with it and compresses that gap into short, focused workshops. In a few hours, participants work hands-on with AI agents to build practical tools and workflows that reflect how their business operates.",
        layout: "split",
        fullHeight: true,
        textAlign: "left",
        maxWidth: "wide",
        splitRightEmpty: true,
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "twoColumn-3",
      props: {
        title: "How Speedrun Works.",
        body: "You begin with a blank project and leave with your own working app. During the session you use AI coding agents to build a simple Kanban-style to-do tool from scratch, change it, and watch it evolve on screen as you work.",
        singleColumn: true,
        fullHeight: true,
        levelUpCardsLayout: "flat",
        levelUpCardsMaxWidth: "wide",
        levelUpCardsSize: "uniform",
        levelUpCardClassName: "speedrun-levelup-card",
        levelUpCards: [
          {
            id: "1",
            number: "01",
            title: "Intro & Start Building",
            description: "You're introduced to the tools and session goal, then immediately start building. Everyone gets something working in the first 15 minutes.",
            primaryTag: "15 mins",
            secondaryTag: "Guided",
            summaryItems: [],
          },
          {
            id: "2",
            number: "02",
            title: "Shape the App",
            description: "You use AI coding agents to modify your app. Each change is made in plain language and reflected immediately on screen.",
            primaryTag: "90 mins",
            secondaryTag: "Hands-on",
            summaryItems: [],
          },
          {
            id: "3",
            number: "03",
            title: "Add a Working Agent",
            description:
              "You add an agent that reads your tasks, creates plans, and sends summaries. AI moves from building tools to actually doing work.",
            primaryTag: "45 mins",
            secondaryTag: "Iterate",
            summaryItems: [],
          },
          {
            id: "4",
            number: "04",
            title: "Review & Questions",
            description: "You reflect on what you've built and how it works. You'll understand what's possible with AI agents and where this fits in your business.",
            primaryTag: "30 mins",
            secondaryTag: "Reflect",
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
            cta: { label: "Book a Call", href: "mailto:info@otherstuff.studio" },
          },
          {
            id: "speedrun-applied",
            title: "Speedrun Applied",
            label: "Go Deeper",
            metaTags: ["3 Hours", "In-person", "Small groups"],
            description:
              "This session takes the app built in Speedrun and extends it into a simple operational workflow. AI agents begin carrying work forward across defined stages, following rules and triggers you set.",
            secondaryNote: "Available to teams who have completed Speedrun",
          },
        ],
      },
    },
    {
      key: "featurePanel",
      enabled: true,
      id: "featurePanel",
      props: {
        title: "How Speedrun Unfolds.",
        body: "Go from cloning a starter app to customising it, and connecting it to an AI agent that begins doing real tasks on your behalf.",
        ctaLabel: "Book a Call",
        ctaHref: "#",
        steps: [
          {
            label: "Setup the foundation",
            body:
              "We start by cloning a structured open-source repo and get a working starting point immediately. You begin with something real.",
            imageSrc: "/WingmanScreen1.png",
            imageAlt: "Setup the foundation",
          },
          {
            label: "Make small changes",
            body:
              "Change the title. Adjust colours. Modify simple elements. You see instantly how instructions become working features.",
            imageSrc: "/WingmanScreen2.png",
            imageAlt: "Make small changes",
          },
          {
            label: "Build your version",
            body:
              "Extend the app into a Kanban board. Replace Trello. Gamify it. Shape it into the productivity tool you actually want to use.",
            imageSrc: "/WingmanScreen1.png",
            imageAlt: "Build your version",
          },
          {
            label: "Put Wingman to work",
            body:
              "An agent produces daily summaries, plans your workload, and carries tasks forward like a capable assistant.",
            imageSrc: "/WingmanScreen2.png",
            imageAlt: "Put Wingman to work",
          },
        ],
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "twoColumn-5",
      props: {
        title: "What your team leaves with.",
        body:
          "Speedrun is designed to move your team from exposure to action. By the end of the session, you have built a working app and understand enough to continue building with confidence.",
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
      key: "twoColumn",
      enabled: true,
      id: "twoColumn-8",
      props: {
        title: "Where Speedrun fits inside your organisation.",
        body:
          "Speedrun is the starting point for building practical AI capability inside your organisation.\n\nFor most SMEs, the real barrier is not interest in AI, it is uncertainty. Leaders are being asked to make decisions about tools, risk, investment, and policy without having worked directly with the technology themselves. Speedrun closes that gap by creating shared, hands-on experience inside the business.\n\nWhen your team has built with AI in the context of real work, decisions become informed rather than speculative. Strategy discussions are based on what you’ve seen and tested. Risk is easier to judge. Leadership, IT, and operations can evaluate next steps from a common understanding. Capability then grows from within the organisation rather than being delegated externally.\n\nSpeedrun creates the foundation for practical AI adoption inside your organisation, so future investment is deliberate, grounded, and internally owned.",
        layout: "splitModal",
        textAlign: "left",
        splitModalVideoUrl: "https://www.youtube.com/embed/xVSldYWFxU8?start=3",
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "twoColumn-6",
      props: {
        title: "Frequently Asked Questions.",
        body: "Here are answers to some of the common practical questions schools and teachers ask when considering Level Up.",
        anchorId: "faq",
        singleColumn: true,
        faqItems: [
          {
            question: "What age range is Level Up designed for?",
            answer: "Level Up is designed for junior to middle high school students. The workshop supports mixed abilities and does not require any prior coding or technical experience.",
          },
          {
            question: "What do students need to participate?",
            answer: "Students need access to a laptop or desktop computer and an internet connection. The workshop is designed to work with standard school devices and existing classroom setups.",
          },
          {
            question: "How many students can take part in a session?",
            answer: "Level Up works well with typical class sizes. We can adapt facilitation to suit different group sizes and classroom contexts.",
          },
          {
            question: "What role do teachers play during the workshop?",
            answer: "Teachers are welcome to take part alongside students, but are not expected to lead or have prior AI knowledge. The session is facilitated by our team from start to finish.",
          },
          {
            question: "What happens after the workshop?",
            answer: "Students leave with a playable game they've built and a practical understanding of how AI works. The workshop is designed to stand alone, while also giving students a strong foundation for future learning.",
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
          "Speedrun is delivered by Other Stuff, a Perth-based AI-native product studio that works hands-on with AI systems. We help business leaders understand how AI works by building practical tools with it, not by talking about it in theory.\n\nWe’ve worked with Stakwork, a Silicon Valley company building agent-based systems, and our experience shapes how we approach building internal AI capability for organisations. Understanding comes fastest when teams move from observing AI to working with it directly.\n\nWe operate as an AI-first business ourselves, using these tools across our own operations and building systems like Wingman, our open-source agent management platform. Speedrun brings that same build-first approach into your organisation, helping teams develop practical judgement and confidence from direct experience.",
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
        profileLogo: "/logo-other-stuff.png",
        fullHeight: true,
        blocksVariant: "profile",
        blocks: [
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
