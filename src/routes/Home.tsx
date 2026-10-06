import { SEO } from '../components/SEO';
import { NavigationDraft } from '../components/NavigationDraft';
import { HeroHomeDuplicateExperiment } from '../components/HeroHomeDuplicateExperiment';
import { HomeDuplicateCanvasSection } from '../components/HomeDuplicateCanvasSection';
import { HomeDuplicateGridSection } from '../components/HomeDuplicateGridSection';
import { FunnelHomeDuplicate } from '../components/FunnelHomeDuplicate';
import { HomeDuplicateComparison } from '../components/HomeDuplicateComparison';
import { FAQHomeDuplicate } from '../components/FAQHomeDuplicate';
import { CTAHomeDuplicate } from '../components/CTAHomeDuplicate';
import { HomeDuplicateGoodStuffStrip } from '../components/HomeDuplicateGoodStuffStrip';
import { HomeDuplicateExitNewsletter } from '../components/HomeDuplicateExitNewsletter';
import { FooterHomeDuplicate } from '../components/FooterHomeDuplicate';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { organizationSchema, websiteSchema } from '../lib/structured-data';

export default function Home() {
  useScrollAnimation();

  return (
    <div className="os-theme os-draft os-home-duplicate">
      <SEO
        title="Other Stuff | AI agents and automation for SMEs | Perth & Australia"
        description="We set up AI agents inside your business and automate the repetitive work. From $5k a month, cancel anytime. Perth and across Australia."
        path="/"
        schema={[
          {
            ...organizationSchema,
            description:
              'AI automation partner in Perth, Western Australia setting up agents and automating repetitive work for Australian SMEs.',
          },
          websiteSchema,
        ]}
      />
      <HomeDuplicateGoodStuffStrip />
      <NavigationDraft />
      <main>
        <HeroHomeDuplicateExperiment />
        <FunnelHomeDuplicate />
        <HomeDuplicateGridSection />
        <HomeDuplicateCanvasSection />
        <HomeDuplicateComparison />
        <FAQHomeDuplicate />
        <CTAHomeDuplicate
          heading="What’s eating your team’s week?"
          intro="Book a free 45-minute call. We’ll look at where your team’s time goes and tell you honestly whether AI can help."
        />
      </main>
      <HomeDuplicateExitNewsletter />
      <FooterHomeDuplicate />
    </div>
  );
}
