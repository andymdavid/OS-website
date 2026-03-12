import { SiteShell } from '@/levelup/components/sections/site-shell';
import { NavigationDraft } from '@/components/NavigationDraft';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import '@/levelup/levelup.fonts.css';
import '@/levelup/levelup.generated.css';
import '@/levelup/levelup.css';

export default function LevelUp() {
  return (
    <div className="os-theme levelup-theme levelup-theme-vars min-h-screen levelup-page" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <NavigationDraft
        titleSwapOnScroll={{
          before: "OTHER STUFF",
          after: "LEVEL-UP",
          targetId: "hero",
        }}
      />
      <SiteShell />
      <CTASection
        className="levelup-cta-section"
        pillLabel="GET STARTED"
        pillHasDot
        intro="Let's talk about bringing Level-Up to your school."
      />
      <Footer />
    </div>
  );
}
