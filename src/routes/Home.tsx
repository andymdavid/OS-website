import { SEO } from '../components/SEO';
import { NavigationHomeDuplicate } from '../components/NavigationHomeDuplicate';
import { HeroHomeDuplicate } from '../components/HeroHomeDuplicate';
import { HomeDuplicateGridSection } from '../components/HomeDuplicateGridSection';
import { FunnelHomeDuplicate } from '../components/FunnelHomeDuplicate';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { ExamplesSection } from '../components/ExamplesSection';
import { InfrastructureSection } from '../components/InfrastructureSection';
import { FAQHomeDuplicate } from '../components/FAQHomeDuplicate';
import { GoodStuffHomeDuplicate } from '../components/GoodStuffHomeDuplicate';
import { CTAHomeDuplicate } from '../components/CTAHomeDuplicate';
import { FooterHomeDuplicate } from '../components/FooterHomeDuplicate';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { organizationSchema, websiteSchema } from '../lib/structured-data';

export default function Home() {
  useScrollAnimation();

  return (
    <div className="os-theme os-draft">
      <SEO
        title="Custom AI Systems for SMEs | Perth & Australia"
        description="Custom AI systems for SMEs in Perth and across Australia. Start with a free AI audit, then build working systems around the workflows that improve margins, free up capital, and reduce operational risk."
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
      <NavigationHomeDuplicate />
      <main>
        <HeroHomeDuplicate />
        <HomeDuplicateGridSection />
        <FunnelHomeDuplicate />
        <ProcessTimeline />
        <ExamplesSection />
        <InfrastructureSection />
        <FAQHomeDuplicate />
        <GoodStuffHomeDuplicate />
        <CTAHomeDuplicate />
      </main>
      <FooterHomeDuplicate />
    </div>
  );
}
