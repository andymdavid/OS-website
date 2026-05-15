import { SEO } from "@/components/SEO";
import { NavigationDraft } from "@/components/NavigationDraft";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import "@/components/IntroSection.css";
import "@/routes/Contact.css";

export default function Contact() {
  return (
    <div className="os-theme os-draft min-h-screen contact-page">
      <SEO
        title="Contact Other Stuff | Start the Conversation"
        description="Get in touch with Other Stuff about a free AI audit, custom AI systems, Speedrun workshops, or practical AI capability building for your team."
        path="/contact"
      />
      <NavigationDraft titleOverride="OTHER STUFF" />
      <main>
        <section className="section contact-main">
          <div className="section-container-wide contact-main-grid">
            <div className="contact-main-copy">
              <h1>Get in touch</h1>
              <p className="contact-main-intro">
                If you&apos;re exploring a free AI audit, custom AI systems, or practical AI capability
                building for your team, this is the best place to start.
              </p>
              <p className="contact-main-intro">
                Tell us a bit about the business, the workflow you think may be worth improving, and
                what prompted the enquiry. We&apos;ll review it and come back to you directly.
              </p>
              <div className="contact-main-points">
                <div className="contact-main-point">
                  <span>01</span>
                  <div>
                    <strong>Free AI Audit + Custom AI Systems</strong>
                    <p>Best for SMEs that want to identify where AI can make the clearest commercial difference.</p>
                  </div>
                </div>
                <div className="contact-main-point">
                  <span>02</span>
                  <div>
                    <strong>Speedrun Workshops</strong>
                    <p>For teams that want practical hands-on exposure to building workflows with AI agents.</p>
                  </div>
                </div>
                <div className="contact-main-point">
                  <span>03</span>
                  <div>
                    <strong>General Enquiries</strong>
                    <p>If you&apos;re not sure where the fit is yet, send the context and we&apos;ll point you in the right direction.</p>
                  </div>
                </div>
              </div>
              <div className="contact-main-actions">
                <Button
                  variant="primary"
                  onClick={() => (window.location.href = "mailto:info@otherstuff.studio")}
                >
                  Email Us Directly
                </Button>
                <a href="mailto:info@otherstuff.studio" className="contact-main-email">
                  info@otherstuff.studio
                </a>
              </div>
            </div>

            <div className="contact-form-shell" aria-label="Contact form embed area">
              <div className="contact-form-shell-header">
                <span>Enquiry Form</span>
              </div>
              <div className="contact-form-shell-body">
                <div className="contact-form-embed-scale">
                  <iframe
                    src="https://census.otherstuff.ai/f/f4630fe7-2ce8-44ed-b972-8c84978ee32a"
                    className="contact-form-embed"
                    title="Other Stuff contact form"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
