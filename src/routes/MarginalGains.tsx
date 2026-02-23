import { MarginalGainsSiteShell } from "@/marginal-gains/components/site-shell";
import { NavigationDraft } from "@/components/NavigationDraft";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import "@/levelup/levelup.fonts.css";
import "@/levelup/levelup.generated.css";
import "@/marginal-gains/marginal-gains.css";

export default function MarginalGains() {
  return (
    <div
      className="os-theme levelup-theme levelup-theme-vars min-h-screen marginal-gains-page"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <NavigationDraft
        titleSwapOnScroll={{
          before: "OTHER STUFF",
          after: "MARGINAL GAINS",
          targetId: "hero",
        }}
      />
      <MarginalGainsSiteShell />
      <CTASection />
      <Footer />
    </div>
  );
}
