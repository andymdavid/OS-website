import { NavigationDraft } from "@/components/NavigationDraft";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import "@/components/Hero.css";
import "@/routes/Contact.css";

export default function Contact() {
  return (
    <div className="os-theme os-draft min-h-screen contact-page">
      <NavigationDraft titleOverride="OTHER STUFF" />
      <main>
        <section className="section contact-hero">
          <div className="section-container-wide contact-hero-inner">
            <div className="hero-title-block">
              <h1>Contact</h1>
              <p className="hero-bridge">Placeholder subpara for the Contact page.</p>
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

        <section className="section contact-blank">
          <div className="section-container-wide" />
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
