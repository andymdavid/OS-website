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

export default function Home() {
  useScrollAnimation();

  return (
    <div className="os-theme os-draft">
      <SEO
        title="Custom AI Systems for SMEs"
        description="Custom AI systems for SMEs — purpose-built around your workflows, delivered as working systems, and built on infrastructure you own."
        path="/"
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
