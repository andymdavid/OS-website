import { SEO } from "@/components/SEO";
import { NavigationDraft } from "@/components/NavigationDraft";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import "@/components/Hero.css";

export default function NotFound() {
  return (
    <div className="os-theme os-draft min-h-screen">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Head back to the Other Stuff homepage."
        path="/404"
        noindex
      />
      <NavigationDraft titleOverride="OTHER STUFF" />
      <main>
        <section className="section" style={{ paddingTop: "160px", paddingBottom: "120px" }}>
          <div className="section-container-wide">
            <div className="hero-title-block">
              <h1>Page not found</h1>
              <p className="hero-bridge">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <div className="hero-cta">
                <Button
                  variant="primary"
                  onClick={() => (window.location.href = "/")}
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
