import { NavigationDraft } from "@/components/NavigationDraft";
import { Button } from "@/components/Button";
import "@/components/Hero.css";

export default function TheGoodStuff() {
  return (
    <div className="os-theme os-draft min-h-screen">
      <NavigationDraft titleOverride="OTHER STUFF" />
      <main>
        <section className="section" style={{ minHeight: "60vh" }}>
          <div className="section-container-wide">
            <div className="hero-title-block" style={{ maxWidth: "720px" }}>
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
        </section>
        <section className="section" style={{ minHeight: "100vh" }}>
          <div className="section-container-wide" />
        </section>
      </main>
    </div>
  );
}
