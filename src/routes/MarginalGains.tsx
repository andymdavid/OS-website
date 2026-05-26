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
        title="AI Automation & AI Consulting Perth"
        description="Other Stuff helps Perth SMEs identify, design, and deliver AI automation systems that grow margins, free up capital, and reduce operational risk. Practical AI consulting, delivered as working systems."
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
                name: "Do you provide AI automation in Perth?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Other Stuff is based in Perth and works with SMEs and small business teams to build AI automation systems around real operational workflows.",
                },
              },
              {
                "@type": "Question",
                name: "Is this AI consulting or a done-for-you build?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It starts with advisory work through the free AI audit, but the goal is a working AI automation system delivered into the business, not a strategy document.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between an AI agent and an AI automation system?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "An AI agent carries out a defined part of the work. The automation system gives that agent the workflow, records, rules, and handover points it needs to operate reliably. Wingman is the operating environment those agents run inside, connecting the workspace, shared records, business context, and workflow engine behind the system.",
                },
              },
              {
                "@type": "Question",
                name: "What does Wingman do?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Wingman is the operating environment the systems run inside. It holds the shared records agents work from, organises the accumulated knowledge in your business, and connects the workspace and workflow engine behind live automation systems.",
                },
              },
            ],
          },
          {
            ...getServiceSchema({
              path: "/marginal-gains",
              name: "AI Automation and AI Consulting Perth",
              description:
                "AI automation and AI consulting for Perth SMEs, delivered by an AI product studio as working systems around real operational workflows.",
              serviceType: "AI automation and AI consulting for small business teams",
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
              "AI Automation Perth",
              "AI Consulting Perth",
              "AI Workflow Automation",
              "AI Agents for Business",
              "Free AI Audit",
              "AI Product Studio",
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
