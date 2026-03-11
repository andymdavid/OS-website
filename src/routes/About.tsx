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
              <h1>We are an AI-first product studio that helps organisations build practical internal AI capability.</h1>
              <p className="hero-bridge">Other Stuff works with businesses to help their teams understand and apply AI, developing practical internal capability over time.</p>
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

        <section className="section about-split">
          <div className="about-split-grid">
            <div className="about-split-left">
              <h2>We believe AI capability inside a business develops through many small improvements that compound over time.</h2>
              <div className="about-split-body">
                <p>
                  The phrase 'marginal gains' was popularised by Sir Dave Brailsford during his time leading British Cycling. His philosophy was simple - if you improve many small things by 1%, the combined effect becomes transformational over time.
                </p>
                <p>
                  We think the same principle applies to AI inside businesses.
                </p>
                <p>
                  Many organisations approach AI as if it requires a large strategy, a major rollout, or a sudden transformation. In reality, most businesses benefit more from small, practical improvements that compound over time.
                </p>
                <p>
                  That might mean automating a repetitive task, introducing an AI assistant into part of a workflow, or building a small internal tool that removes friction from daily work.
                </p>
                <p>
                  Each change on its own may seem modest. But as teams gain experience and confidence using AI, those improvements begin to compound.
                </p>
                <p>
                  Over time, the organisation develops something far more valuable than a single tool - internal capability.
                </p>
              </div>
              <div className="about-split-cta">
                <Button
                  variant="primary"
                  onClick={() => (window.location.href = "mailto:info@otherstuff.studio")}
                >
                  Talk to Us
                </Button>
              </div>
            </div>
            <div className="about-split-right" />
          </div>
        </section>

        <section className="section about-system">
          <div className="about-system-header">
            <h2>We build the tools, then help teams build the capability to use them well.</h2>
            <p>
              Other Stuff is an AI-first product studio. AI is embedded in how we operate, build products, and make decisions ourselves. That practical experience shapes how we work with businesses, starting with the tools and then building the internal capability required to use them confidently.
            </p>
          </div>
          <div className="about-system-grid">
            <div className="about-system-card">
              <span className="about-system-card-number">01</span>
              <h3>AI-first by design</h3>
              <p>
                We use AI across our own operations, product development, and decision-making. It is central to how the business runs, which means our work with others is grounded in lived experience.
              </p>
            </div>
            <div className="about-system-card">
              <span className="about-system-card-number">02</span>
              <h3>Wingman at the centre</h3>
              <p>
                Wingman is our AI agent management system. It gives businesses a practical way to use agents inside real work, and it sits at the centre of the capability we help teams develop.
              </p>
            </div>
            <div className="about-system-card">
              <span className="about-system-card-number">03</span>
              <h3>Capability through building</h3>
              <p>
                Speedrun helps teams learn how to work with AI by building with it directly. It creates the initial hands-on experience that makes tools like Wingman easier to understand, adopt, and apply inside the business. Speedrun Applied extends that capability for existing users who want more support using agents in practice.
              </p>
            </div>
            <div className="about-system-card">
              <span className="about-system-card-number">04</span>
              <h3>Ongoing support and shared learning</h3>
              <p>
                Marginal Gains supports continued capability development through in-person events, guided sessions, and practical support. We also share what we're learning publicly through The Good Stuff, so the work stays connected to what is actually changing.
              </p>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
