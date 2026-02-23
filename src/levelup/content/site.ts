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
      "A React + Vite landing page template with Tailwind CSS, shadcn/ui, and more",
  },
  sections: [
    {
      key: "navbar",
      enabled: true,
      props: {
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
        badge: "🚀 For schools interested in exploring applied AI",
        title: "Where students learn AI by building games",
        subtitle:
          "Level Up is a hands-on workshop where students learn how AI works in practice by building their very own game, gaining a practical understanding of how AI systems behave by actually using them.",
        ctaPrimary: { label: "Get Started", href: "#pricing" },
        socialProof: "Designed by Other Stuff, drawing on real-world AI work with teams in Australia and Silicon Valley",
        socialProofLogo: "/logo-other-stuff.png",
        socialProofLink: { text: "Other Stuff", href: "https://otherstuff.ai" },
      },
    },
    {
      key: "arcCarousel",
      enabled: true,
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
        overlapTop: "-320px",
        overlapBottom: "60px",
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "twoColumn",
      props: {
        title: "What is Level-Up?",
        body:
          "Level Up is a guided, hands-on workshop designed for school students to learn how AI works by actually using it. During the session, students build their own games with AI coding agents, experimenting, iterating, and seeing how instructions turn into behaviour on screen. The workshop is facilitated step by step in a classroom setting, with students working through the process together alongside their teachers and making progress as they go. Level Up is designed to fit naturally into real school environments, focusing on practical experience and understanding of AI, rather than abstract explanation.",
        bodyMobileSplitOn: "The workshop is facilitated",
        blocksVariant: "feature",
        minHeightClass: "min-h-[90vh]",
        blocks: [
          {
            number: "01",
            title: "Who it’s for",
            body: "For high school students. Designed for mixed abilities, no prior coding required.",
            video: "/Wizard.mp4",
          },
          {
            number: "02",
            title: "Session format",
            body: "90-minute, facilitated workshop. Hands-on and guided from start to finish.",
            video: "/girl.mp4",
          },
          {
            number: "03",
            title: "What students build",
            body: "A playable game created using AI. Something they can run, test, and share.",
            video: "/adventurer.mp4",
          },
        ],
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "twoColumn-2",
      props: {
        title: "Games are a powerful way to learn about AI",
        body:
          "Building games provides a familiar environment where students can experiment with AI, test ideas, and see results immediately. This makes learning practical and intuitive, rather than abstract.",
        singleColumn: true,
        blocks: [
          {
            number: "01",
            title: "A low-stakes environment for experimentation",
            body: "Games give students permission to try ideas, break things, and start again without consequence. That matters when learning how to use AI, because understanding comes from exploration rather than getting things right the first time.",
          },
          {
            number: "02",
            title: "Fast feedback makes learning visible",
            body: "When students change a prompt or rule, they immediately see the result take shape on screen. This tight feedback loop helps them quickly build intuition for how AI systems respond and behave.",
          },
          {
            number: "03",
            title: "Iteration mirrors how AI works in practice",
            body: "Learning AI is not about writing perfect instructions. It’s about describing intent, observing outcomes, and refining ideas. Game building makes this process obvious and engaging, rather than abstract and theoretical.",
          },
          {
            number: "04",
            title: "Familiar context, deeper understanding",
            body: "Most students already understand games as systems with rules, logic, and outcomes. Using that familiar context lowers the barrier to learning and helps students focus on how the technology works, not on learning an entirely new domain.",
          },
        ],
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "twoColumn-3",
      props: {
        title: "What happens in a Level Up workshop",
        body: "Each session is designed to get students building quickly, with clear guidance at the start and increasing independence as they go. Students learn by making changes, testing ideas, and seeing the results immediately in the game they're building.",
        singleColumn: true,
        fullHeight: true,
        levelUpCards: [
          {
            id: "1",
            number: "01",
            title: "Setup and Start Building",
            description: "Students are introduced to the tools and the goal for the session. Everyone gets a working game on screen early, so momentum starts fast.",
            primaryTag: "15 mins",
            secondaryTag: "Guided",
            summaryItems: [
              { number: "01", text: "Introduction to the tools" },
              { number: "02", text: "Game scaffold is setup" },
            ],
          },
          {
            id: "2",
            number: "02",
            title: "Shape the Game with AI",
            description: "Students use AI agents to add rules, mechanics, characters, and interactions. Ideas are turned directly into behaviour they can see and test.",
            primaryTag: "30 mins",
            secondaryTag: "Hands-on",
            summaryItems: [
              { number: "01", text: "Add game mechanics" },
              { number: "02", text: "Create interactions" },
            ],
          },
          {
            id: "3",
            number: "03",
            title: "Test, Tweak, and Improve",
            description: "Students play what they've built and adjust what doesn't feel right. This is where the learning lands as students see how instructions translate into outcomes.",
            primaryTag: "30 mins",
            secondaryTag: "Iterate",
            summaryItems: [
              { number: "01", text: "Playtest your game" },
              { number: "02", text: "Refine and improve" },
            ],
          },
          {
            id: "4",
            number: "04",
            title: "End with a Real Game",
            description: "Students end with a playable game they can run and share. The session closes by reflecting on how the system works and what they built.",
            primaryTag: "15 mins",
            secondaryTag: "Reflect",
            summaryItems: [
              { number: "01", text: "Share your creation" },
              { number: "02", text: "Understand how it works" },
            ],
          },
        ],
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "twoColumn-4",
      props: {
        layout: "split",
        title: "What Students Walk Away With",
        body: "By the end of the workshop, students have more than a finished game. They leave with a practical understanding of AI and the confidence that comes from having built something themselves.",
        splitVideo: "/SatsGarden.mp4",
        splitBlocks: [
          {
            title: "A practical understanding of how AI works",
            body: "Students see how instructions, rules, and feedback shape behaviour. They learn through experimentation rather than abstract explanation.",
          },
          {
            title: "Confidence to build and explore",
            body: "Students leave knowing they can shape systems themselves. AI feels usable and approachable, not intimidating.",
          },
          {
            title: "Something real to point to",
            body: "Each student finishes with a playable game they've built. It becomes a reference for future learning and experimentation.",
          },
        ],
      },
    },
    {
      key: "twoColumn",
      enabled: true,
      id: "twoColumn-5",
      props: {
        layout: "split",
        splitReverse: true,
        title: "Support for Teachers and Schools",
        body: "Level Up is designed to fit comfortably into real classroom environments, with facilitation and support built in from the start.",
        splitVideo: "/SkiSats.mp4",
        splitBlocks: [
          {
            title: "Facilitated and supported delivery",
            body: "The session is led step by step by our team. Teachers are supported throughout, not expected to lead.",
          },
          {
            title: "No prior AI expertise required",
            body: "Students and teachers can take part together. No technical background is needed to participate.",
          },
          {
            title: "Designed for real classrooms",
            body: "Works with mixed abilities and existing devices. Structured to be focused, practical, and manageable.",
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
              "Built on React + Vite for fast loading and static-friendly deployment.",
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
              "Absolutely. Built with React, TypeScript, and Tailwind CSS. Includes proper SEO, performance optimizations, and responsive design.",
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
