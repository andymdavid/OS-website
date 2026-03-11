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
                We use AI across our own operations, product development, and decision-making. That means our work with businesses is grounded in direct experience using the tools, not abstract advice.
              </p>
            </div>
            <div className="about-system-card">
              <span className="about-system-card-number">02</span>
              <h3>Wingman at the centre</h3>
              <p>
                Wingman is our AI agent management system. It gives businesses a practical way to use agents in real work and sits at the centre of the capability we help teams develop.
              </p>
            </div>
            <div className="about-system-card">
              <span className="about-system-card-number">03</span>
              <h3>Capability through building</h3>
              <p>
                Speedrun helps teams learn how to work with AI by building with it directly. It creates the initial hands-on experience that makes tools like Wingman easier to adopt and use well.
              </p>
            </div>
            <div className="about-system-card">
              <span className="about-system-card-number">04</span>
              <h3>Ongoing support and learning</h3>
              <p>
                Marginal Gains helps teams keep developing capability after the first build. Through events, guided support, and shared learning, internal confidence and practical use continue to strengthen over time.
              </p>
            </div>
          </div>
        </section>

        <section className="section about-who">
          <div className="about-who-grid">
            <div className="about-who-left">
              <h2>Our work is grounded in lived experience with AI systems.</h2>
              <div className="about-who-body">
                <p>
                  We help business leaders understand how AI works by building practical tools with it, not by talking about it in theory.
                </p>
                <p>
                  We've worked with Stakwork, a Silicon Valley company building agent-based systems, and our experience shapes how we approach building internal AI capability for organisations. Understanding comes fastest when teams move from observing AI to working with it directly.
                </p>
                <p>
                  We operate as an AI-first business ourselves, using these tools across our own operations and building systems like Wingman, our open-source agent management platform.
                </p>
              </div>
              <div className="about-who-cta">
                <Button
                  variant="primary"
                  onClick={() => (window.location.href = "https://otherstuff.ai")}
                >
                  Learn more
                </Button>
              </div>
            </div>
            <div className="about-who-right">
              <div className="about-bio-cards">
                <div className="about-bio-card">
                  <div className="about-bio-card-header">
                    <div className="about-bio-card-image">
                      <img src="/Pete.png" alt="Pete Winn" />
                    </div>
                    <div>
                      <h3>Pete Winn</h3>
                      <span className="about-bio-card-role">Co-Founder</span>
                    </div>
                  </div>
                  <p>
                    Pete has a long track record in process redesign, deep tech and large enterprise and programme deployments from Rolls Royce to Rio Tinto.
                  </p>
                </div>
                <div className="about-bio-card">
                  <div className="about-bio-card-header">
                    <div className="about-bio-card-image">
                      <img src="/Andy.png" alt="Andy David" />
                    </div>
                    <div>
                      <h3>Andy David</h3>
                      <span className="about-bio-card-role">Co-Founder</span>
                    </div>
                  </div>
                  <p>
                    Andy's background is in venture design, management consulting and technology startups, including process improvement for enterprise and SMEs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
