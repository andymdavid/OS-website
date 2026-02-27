import { NavigationDraft } from "@/components/NavigationDraft";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import "@/components/Hero.css";
import "@/routes/About.css";

export default function About() {
  return (
    <div className="os-theme os-draft min-h-screen about-page">
      <NavigationDraft titleOverride="OTHER STUFF" />
      <main>
        <section className="section about-hero">
          <div className="section-container-wide about-hero-inner">
            <div className="hero-title-block">
              <h1>About</h1>
              <p className="hero-bridge">Placeholder subpara for the About page.</p>
              <div className="hero-cta">
                <Button
                  variant="primary"
                  onClick={() => (window.location.href = "mailto:info@otherstuff.studio")}
                >
                  Talk to Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section about-blank">
          <div className="section-container-wide" />
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
