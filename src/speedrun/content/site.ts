// Core section keys - must match registry
export type SectionKey =
  | "navbar"
  | "hero"
  | "twoColumn"
  | "arcCarousel"
  | "logos"
  | "benefits"
  | "howItWorks"
  | "pricing"
  | "testimonials"
  | "faq"
  | "finalCta"
  | "footer";

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
      enabled: true,
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
      variant: "default",
      props: {
        badge: "For business leaders who need firsthand experience with AI",
        title: "LEARN HOW TO WORK WITH AI\nBY BUILDING SOMETHING WITH IT",
        subtitle:
          "Speedrun is a hands-on workshop where business leaders learn what AI is and how it works by building practical tools with AI agents. No coding experience required.",
        subtitleMaxWidth: "45.36rem",
        centerContent: true,
        ctaPrimary: { label: "Book a Call", href: "#pricing" },
        socialProof: "Built by Other Stuff, drawing on work with teams across Australia and Silicon Valley",
        socialProofLogo: "/logo-other-stuff.png",
        socialProofLink: { text: "Other Stuff", href: "https://otherstuff.ai" },
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
        title: "Speedrun at a glance",
        body:
          "Every Speedrun session follows the same hands-on format. You'll work directly with AI agents to build practical tools from the beginning, and by the end you'll have firsthand experience with what AI can actually do.",
        singleColumn: true,
        maxWidth: "wide",
        blocksVariant: "expandable",
        expandableCardSize: "uniform",
        expandableCardsLayout: "fullBleed",
        expandableCardsMaxWidth: "wide",
        minHeightClass: "min-h-[90vh]",
        blocks: [
          {
            number: "01",
            title: "Who Should Attend",
            body: "Speedrun is for SME operators and team leads who need to understand what AI can do for their business - no technical background required.",
            image: "/Card01.png",
          },
          {
            number: "02",
            title: "Session Structure",
            body: "Speedrun is a 3-hour, guided, hands-on workshop, delivered in small groups with facilitation and support throughout.",
            image: "/Card02.png",
          },
          {
            number: "03",
            title: "What You'll Build",
            body: "Participants build a working Kanban-style task tool and connect an AI agent that tracks and summarises work as it changes.",
            image: "/Card03.png",
          },
          {
            number: "04",
            title: "What You Leave With",
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
        title: "Why Speedrun Exists",
        body:
          "Most businesses know they should be doing more with AI and automation, but they don’t know where to start, what to connect, or how to turn ideas into something real. Progress often remains stuck at research, demos, or random experiments.\n\nSpeedrun exists to help people move from wanting to use AI in their business to actually building with it and compresses that gap into short, focused workshops.\n\nIn a few hours, participants work hands-on with AI agents to build practical tools and workflows that reflect how their business operates.",
        singleColumn: true,
        fullHeight: true,
        bodyMaxWidth: "50.4rem",
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "twoColumn-3",
      props: {
        title: "How Speedrun Works",
        body: "You begin with a blank project and leave with your own working app. During the session you use AI coding agents to build a simple Kanban-style to-do tool from scratch, change it, and watch it evolve on screen as you work.",
        singleColumn: true,
        fullHeight: true,
        levelUpCardsLayout: "flat",
        levelUpCardsMaxWidth: "wide",
        levelUpCardsSize: "uniform",
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
      key: "twoColumn",
      enabled: true,
      id: "twoColumn-4",
      props: {
        layout: "dualFocus",
        title: "Where to start",
        body: "Speedrun Lite is where everyone starts. In 3 hours, you build a working tool with AI agents and understand what's possible. Teams that want to go deeper can extend that same build into a complete operational workflow with Speedrun Applied.",
        dualColumns: [
          {
            title: "Speedrun Lite",
            label: "Start here",
            emphasis: true,
            meta: "Duration: 3 hours | In-person or online | Small groups (max 8)",
            buildBody:
              "By the end of the session, you have built a working Kanban-style task app and connected it to an AI agent yourself.",
            gainItems: [
              {
                title: "Understand how AI works",
                body: "Learn how your instructions become working features and how small changes affect the outcome, without needing to be technical.",
              },
              {
                title: "Confidence to build and adapt",
                body: "You leave knowing you can create tools yourself. AI becomes something you can direct and improve, not something you need explained to you.",
              },
              {
                title: "Your own app with an AI agent",
                body: "You leave with a usable Kanban-style app connected to an agent that can summarise tasks, plan work, and generate updates.",
              },
            ],
            bestFor:
              "Teams who need firsthand AI experience before making bigger decisions about implementation or strategy.",
          },
          {
            title: "Speedrun Applied",
            label: "Go Deeper",
            meta: "Duration: Full day (6-7 hours) | In-person or online | Small groups (max 8)",
            buildBody:
              "Your original task app evolves into a simple operational workflow where AI agents begin carrying work forward across stages.",
            gainItems: [
              {
                title: "Extend the app into a live workflow",
                body: "You take the Kanban app built in Speedrun Lite and connect it to defined stages of work, introducing clear triggers and hand-offs between tasks.",
              },
              {
                title: "Let agents act across stages of work",
                body: "Instead of responding to single prompts, agents summarise progress, generate updates, and move tasks forward based on rules you define.",
              },
              {
                title: "See how AI operates over time",
                body: "You observe how agents behave when they are part of ongoing work, learning where to trust them, where to intervene, and how to stay in control.",
              },
            ],
            bestFor:
              "Teams who've completed Speedrun Lite and are ready to see how AI agents can operate autonomously within real business workflows.",
          },
        ],
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "twoColumn-6",
      props: {
        title: "Frequently Asked Questions",
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
        title: "Who we are",
        body:
          "Level Up is delivered by Other Stuff, a Perth-based team that works hands-on with AI systems in the real-world. Our work focuses on helping people understand how AI actually behaves by building and running things that are practical, not by talking about them in theory. We’ve also worked with Stakwork, a Silicon Valley AI company on agent-based systems, and that lived experience shapes how we teach, advise, and support others - always grounded in what works in practice, not just in theory. We’ve seen that confidence and understanding come fastest when people are able to build something themselves and observe how it works in practice. Level Up is an extension of that approach, adapted for schools. It brings the same build-first, practical way of learning AI into the classroom, designed to be accessible, supportive, and grounded in real experience.",
        bodyMobileSplitParas: [
          "We’ve also worked with Stakwork",
          "We’ve seen that confidence",
          "Level Up is an extension",
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
        title: "Trusted by teams at leading companies",
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
        title: "Everything you need to succeed",
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
        title: "Get started in minutes",
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
        title: "Simple, transparent pricing",
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
        title: "Loved by builders everywhere",
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
        title: "Frequently asked questions",
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
      enabled: true,
      id: "finalCta",
      props: {
        title: "Let’s talk about bringing Level-Up to your school",
        ctaPrimary: "Get Started",
        ctaSecondary: "Mail ons direct",
      },
    },
    {
      key: "footer",
      enabled: true,
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
