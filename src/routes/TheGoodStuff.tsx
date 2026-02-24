import { NavigationDraft } from "@/components/NavigationDraft";
import { Button } from "@/components/Button";
import "@/components/Hero.css";
import "@/routes/TheGoodStuff.css";

export default function TheGoodStuff() {
  return (
    <div className="os-theme os-draft min-h-screen the-good-stuff-page">
      <NavigationDraft titleOverride="OTHER STUFF" />
      <main>
        <section className="section good-stuff-hero">
          <div className="section-container-wide good-stuff-hero-inner">
            <div className="hero-title-block">
              <h1>The Good Stuff is a low-fi dialogue with Pete Winn and Andy David.</h1>
              <p className="hero-bridge">
                A podcast exploring how AI is changing the rules of work, business, entrepreneurship, the economy and human potential.
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
        </section>
        <section className="section good-stuff-blank">
          <div className="section-container-wide" />
        </section>
      </main>
    </div>
  );
}
