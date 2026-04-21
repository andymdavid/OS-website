import { SEO } from "@/components/SEO";
import { NavigationDraft } from "@/components/NavigationDraft";
import { PainRecognition } from "@/components/PainRecognition";
import { MGGridSection } from "@/components/MGGridSection";
import { MGHowItWorksSection } from "@/components/MGHowItWorksSection";
import { CTAHomeDuplicate } from "@/components/CTAHomeDuplicate";
import { FooterHomeDuplicate } from "@/components/FooterHomeDuplicate";
import {
  MarginalGainsDuplicateBody,
  MarginalGainsDuplicateHero,
} from "@/marginal-gains/components/site-shell-duplicate";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getServiceSchema } from "@/lib/structured-data";
import "@/levelup/levelup.fonts.css";
import "@/levelup/levelup.generated.css";
import "@/marginal-gains/marginal-gains.css";

export default function MarginalGains() {
  useScrollAnimation();

  return (
    <div
      className="os-theme levelup-theme levelup-theme-vars min-h-screen marginal-gains-page mg-duplicate"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <SEO
        title="Custom AI Systems"
        description="Custom AI systems for SMEs — scoped to your workflows, delivered as working systems, built on infrastructure you own."
        path="/marginal-gains"
        ogImage="/og-marginal-gains.png"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What does the free AI audit involve?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It starts with a short questionnaire for your team, followed by a working call to review the findings, test where the opportunity is clearest, and identify what is most worth building first.",
                },
              },
              {
                "@type": "Question",
                name: "What do we walk away with from the audit?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A clearer view of where time and money are being lost, a prioritised workflow to focus on, and a practical recommendation on what building the first system would involve.",
                },
              },
              {
                "@type": "Question",
                name: "What happens after the audit?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "If there is a clear fit, we scope and build one focused AI system around that workflow. The engagement has a defined start, a defined end, and a working system delivered into your business.",
                },
              },
              {
                "@type": "Question",
                name: "Do we need to be technical?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. These systems are built around operational workflows in your business, not around your team's ability to code. What matters most is that the people closest to the work can help define how the system should behave.",
                },
              },
              {
                "@type": "Question",
                name: "What is Marginal Gains?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For teams that want to keep going after the first system is live, Marginal Gains is the ongoing relationship. We keep improving the systems already running in your business, support them as your operations evolve, and build the next high-value workflows over time.",
                },
              },
              {
                "@type": "Question",
                name: "What does Wingmen Suite do?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Wingmen Suite is the operating environment the systems run inside. It gives your team visibility, holds the shared records agents work from, and organises the accumulated knowledge in your business.",
                },
              },
            ],
          },
          {
            ...getServiceSchema({
              path: "/marginal-gains",
              name: "Custom AI Systems",
              description:
                "Custom AI systems for SMEs — scoped to operational workflows, delivered as working systems, and built on infrastructure you own.",
              serviceType: "Custom AI systems for small business teams",
              audience: {
                "@type": "BusinessAudience",
                audienceType: "Small businesses and SMEs",
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Perth",
                },
                {
                  "@type": "Country",
                  name: "Australia",
                },
              ],
            }),
            category: [
              "Custom AI systems",
              "AI workflow automation",
              "AI systems for SMEs",
            ],
          },
        ]}
      />
      <NavigationDraft
        titleSwapOnScroll={{
          before: "OTHER STUFF",
          after: "MARGINAL GAINS",
          targetId: "hero",
        }}
      />
      <MarginalGainsDuplicateHero />
      <PainRecognition />
      <MGGridSection />
      <MGHowItWorksSection />
      <MarginalGainsDuplicateBody />
      <CTAHomeDuplicate />
      <FooterHomeDuplicate />
    </div>
  );
}
