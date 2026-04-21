import { SEO } from '../components/SEO';
import { NavigationDraft } from '../components/NavigationDraft';
import { HeroDraft } from '../components/HeroDraft';
import { IntroSectionDraft } from '../components/IntroSectionDraft';
import { FunnelSection } from '../components/FunnelSection';
import { FollowUpSection } from '../components/FollowUpSection';
import { WingmanSection } from '../components/WingmanSection';
import { GoodStuff } from '../components/GoodStuff';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { organizationSchema, websiteSchema } from '../lib/structured-data';

export default function HomeDuplicate() {
  useScrollAnimation();

  return (
    <div className="os-theme os-draft">
      <SEO
        title="AI-First Product Studio — Perth, Australia"
        description="Perth-based AI product studio helping Australian businesses build practical AI capability. Hands-on workshops, ongoing support, and open-source tools."
        path="/home-duplicate"
        noindex
        schema={[
          {
            ...organizationSchema,
            description:
              'AI-first product studio in Perth, Western Australia helping organisations build practical internal AI capability through hands-on workshops and open-source tools.',
          },
          websiteSchema,
        ]}
      />
      <NavigationDraft />
      <main>
        <HeroDraft />
        <IntroSectionDraft />
        <FunnelSection />
        <FollowUpSection />
        <WingmanSection />
        <GoodStuff />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
