import { SEO } from "@/components/SEO";
import { NavigationDraft } from "@/components/NavigationDraft";
import { PainRecognition } from "@/components/PainRecognition";
import { MGGridSection } from "@/components/MGGridSection";
import { MGHowItWorksSection } from "@/components/MGHowItWorksSection";
import { MGOfferSection } from "@/components/MGOfferSection";
import { MGPricingSection } from "@/components/MGPricingSection";
import { CTAHomeDuplicate } from "@/components/CTAHomeDuplicate";
import { FooterHomeDuplicate } from "@/components/FooterHomeDuplicate";
import { AutomationPartnerHero } from "@/components/AutomationPartnerHero";
import { FAQHomeDuplicate } from "@/components/FAQHomeDuplicate";
import {
  MarginalGainsApproachSection,
  MarginalGainsDuplicateBody,
} from "@/marginal-gains/components/site-shell-duplicate";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { automationFaqs } from "@/marginal-gains/content/site-duplicate";
import { getServiceSchema } from "@/lib/structured-data";
import "@/levelup/levelup.fonts.css";
import "@/levelup/levelup.generated.css";
import "@/marginal-gains/marginal-gains.css";

export default function MarginalGains() {
  useScrollAnimation();

  return (
    <div
      className="os-theme os-draft levelup-theme levelup-theme-vars min-h-screen marginal-gains-page mg-duplicate"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <SEO
        title="AI Automation & AI Consulting Perth"
        description="Other Stuff helps Perth SMEs identify, design, and deliver AI automation systems that grow margins, free up capital, and reduce operational risk. Practical AI consulting, delivered as working systems."
        path="/ai-automation"
        ogImage="/og-marginal-gains.png"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: automationFaqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
          {
            ...getServiceSchema({
              path: "/ai-automation",
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
              "AI Specialists Perth",
              "AI Workflow Automation",
              "AI Agents for Business",
              "AI Product Studio",
            ],
          },
        ]}
      />
      <NavigationDraft
        titleSwapOnScroll={{
          before: "OTHER STUFF",
          after: "AUTOMATION PARTNER",
          targetId: "hero",
        }}
      />
      <AutomationPartnerHero />
      <PainRecognition />
      <MGOfferSection />
      <MGHowItWorksSection />
      <MarginalGainsApproachSection />
      <MGGridSection />
      <MarginalGainsDuplicateBody />
      <MGPricingSection />
      <FAQHomeDuplicate
        id="faq"
        items={automationFaqs}
        heading="Frequently asked questions."
      />
      <CTAHomeDuplicate
        pillLabel="Get started"
        heading="Find out what we’d automate first."
        intro="Book a free 45-minute call with Pete and Andy. We’ll look at how work moves through your business and tell you what we’d automate first and what it would cost."
        className="mg-final-cta"
      />
      <FooterHomeDuplicate />
    </div>
  );
}
