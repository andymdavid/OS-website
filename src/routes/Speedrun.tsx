import { SEO } from "@/components/SEO";
import { SpeedrunSiteShell } from "@/speedrun/components/site-shell";
import { NavigationDraft } from "@/components/NavigationDraft";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { getServiceSchema } from "@/lib/structured-data";
import "@/levelup/levelup.fonts.css";
import "@/levelup/levelup.generated.css";
import "@/speedrun/speedrun.css";

export default function Speedrun() {
  return (
    <div className="os-theme levelup-theme levelup-theme-vars min-h-screen speedrun-page" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SEO
        title="AI Training Workshop for Business Teams | Perth"
        description="A private hands-on AI training workshop for Perth businesses, teams, and SME operators. Build practical tools and workflows with AI agents in a 3-hour session."
        path="/speedrun"
        ogImage="/og-speedrun.png"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "Do we need a technical background to take part?", "acceptedAnswer": { "@type": "Answer", "text": "No. Speedrun is designed for founders, operators, and team leads without a technical background. You'll work with AI coding agents in a guided environment, focusing on understanding how the tools behave rather than writing code yourself." }},
              { "@type": "Question", "name": "What exactly do we build during the session?", "acceptedAnswer": { "@type": "Answer", "text": "In Speedrun, participants build a working Kanban-style task application using AI coding agents. In Speedrun Applied, that same tool is extended into a simple operational workflow where an AI agent begins carrying out tasks such as summaries, planning, and coordination." }},
              { "@type": "Question", "name": "Is this just another AI presentation or demo?", "acceptedAnswer": { "@type": "Answer", "text": "No. There are no slide-heavy sessions or abstract case studies. The workshop is structured around building and modifying a real tool, so understanding comes from direct interaction rather than observation." }},
              { "@type": "Question", "name": "How many people should attend?", "acceptedAnswer": { "@type": "Answer", "text": "Speedrun is designed as a small-group working session. The value comes from having cross-functional perspectives in the room and beginning to build shared internal capability, rather than training a single individual." }},
              { "@type": "Question", "name": "Will this replace the need for consultants or developers?", "acceptedAnswer": { "@type": "Answer", "text": "No. Speedrun is not about replacing expertise. It is about helping your team build enough lived experience with AI to make informed decisions about when external support is needed and when it isn't." }},
              { "@type": "Question", "name": "What happens after Speedrun?", "acceptedAnswer": { "@type": "Answer", "text": "Teams can extend the work through Speedrun Applied, where AI agents begin operating across workflows. For organisations wanting to deepen internal capability over time, Marginal Gains provides ongoing support and structured experimentation." }},
              { "@type": "Question", "name": "How is this different from a standard AI workshop or training session?", "acceptedAnswer": { "@type": "Answer", "text": "Speedrun is not a presentation or generic AI training course. It is a private hands-on workshop for business teams, where participants build and run structured systems with AI agents so understanding comes from direct use rather than passive instruction." }}
            ]
          },
          {
            ...getServiceSchema({
              path: "/speedrun",
              name: "Speedrun",
              description: "A private hands-on AI workshop for Perth business teams and small businesses. Participants build practical tools and workflows using AI agents.",
              serviceType: "Private AI workshop for business teams",
              audience: {
                "@type": "BusinessAudience",
                audienceType: "Teams, founders, operators, and small businesses",
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Perth",
                },
                {
                  "@type": "State",
                  name: "Western Australia",
                },
              ],
            }),
            category: [
              "AI workshop for businesses",
              "AI workshop for teams",
              "AI training for businesses",
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Speedrun workshop formats",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Speedrun",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Speedrun Applied",
                  },
                },
              ],
            },
          },
        ]}
      />
      <NavigationDraft
        titleSwapOnScroll={{
          before: "OTHER STUFF",
          after: "SPEEDRUN",
          targetId: "hero",
        }}
      />
      <SpeedrunSiteShell />
      <CTASection />
      <Footer />
    </div>
  );
}
