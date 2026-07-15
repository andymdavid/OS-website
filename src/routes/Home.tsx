import { SEO } from '../components/SEO';
import { NavigationDraft } from '../components/NavigationDraft';
import { HeroHomeDuplicateExperiment } from '../components/HeroHomeDuplicateExperiment';
import { HomeDuplicateCanvasSection } from '../components/HomeDuplicateCanvasSection';
import { HomeDuplicateGridSection } from '../components/HomeDuplicateGridSection';
import { HomeDuplicateWingmanBenefits } from '../components/HomeDuplicateWingmanBenefits';
import { FunnelHomeDuplicate } from '../components/FunnelHomeDuplicate';
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
        title="Custom AI Systems for SMEs | Perth & Australia"
        description="Other Stuff helps SMEs use AI to improve margin, free up capital, and reduce risk with Wingman, practical agents, and highly personalised AI-native software."
        path="/"
        schema={[
          {
            ...organizationSchema,
            description:
              'AI-first product studio in Perth, Western Australia building custom AI systems for SMEs around real operational workflows.',
          },
          websiteSchema,
        ]}
      />
      <HomeDuplicateGoodStuffStrip />
      <NavigationDraft />
      <main>
        <HeroHomeDuplicateExperiment />
        <HomeDuplicateCanvasSection />
        <FunnelHomeDuplicate />
        <HomeDuplicateWingmanBenefits />
        <HomeDuplicateGridSection />
        <FAQHomeDuplicate />
        <CTAHomeDuplicate
          heading="Let’s find where AI can improve margin, free up capital, and reduce risk."
          intro="Book a free intro call. We’ll look at the work that matters most in your business and find the clearest path to improve it with AI."
        />
      </main>
      <HomeDuplicateExitNewsletter />
      <FooterHomeDuplicate />
    </div>
  );
}
