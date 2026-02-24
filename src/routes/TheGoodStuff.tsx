import { NavigationDraft } from "@/components/NavigationDraft";
import { Button } from "@/components/Button";
import "@/components/Hero.css";
import "@/routes/TheGoodStuff.css";

export default function TheGoodStuff() {
  return (
    <div className="os-theme os-draft min-h-screen the-good-stuff-page">
      <NavigationDraft titleOverride="OTHER STUFF" />
      <main>
        <section className="hero-extended good-stuff-hero">
          <div className="hero-sticky good-stuff-hero-sticky">
            <div className="hero-inner">
              <div className="hero-title-block">
                <h1>Placeholder H1</h1>
                <p className="hero-bridge">
                  Placeholder subpara text for The Good Stuff page.
                </p>
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
          </div>
        </section>
        <section className="section good-stuff-blank">
          <div className="section-container-wide" />
        </section>
      </main>
    </div>
  );
}
