import { SEO } from "@/components/SEO";
import { NavigationDraft } from "@/components/NavigationDraft";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { FormProcessingDemo } from "@/components/FormProcessingDemo";
import { organizationSchema, getOrganizationRef } from "@/lib/structured-data";
import "@/components/Hero.css";
import "@/routes/About.css";

export default function About() {
  return (
    <div className="os-theme os-draft min-h-screen about-page">
      <SEO
        title="About — AI Product Studio in Perth, Western Australia"
        description="Perth-based AI product studio founded by Pete Winn and Andy David. We help Australian organisations build practical AI capability through hands-on experience."
        path="/about"
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": "https://otherstuff.ai/about#webpage",
          "url": "https://otherstuff.ai/about",
          "about": getOrganizationRef(),
          "mainEntity": {
            ...organizationSchema,
            "description": "AI-first product studio in Perth, Western Australia helping organisations build practical internal AI capability.",
          }
        }}
      />
      <NavigationDraft titleOverride="OTHER STUFF" />
      <main>
        <section className="section about-hero">
          <div className="section-container-wide about-hero-inner">
            <div className="hero-title-block">
              <h1>We are an AI-first product studio that builds custom AI systems to improve margins, free up capital, and reduce operational risk.</h1>
              <p className="hero-bridge">We work with SMEs to identify where time, capital, and operational risk are being lost, then build AI systems around those workflows and help teams develop the capability to use them well.</p>
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
              <h2>We believe the strongest AI systems are built around practical improvements that compound over time.</h2>
              <div className="about-split-body">
                <p>
                  The phrase &apos;marginal gains&apos; was popularised by Sir Dave Brailsford during his time leading British Cycling. His philosophy was simple: improve many small things by 1%, and the combined effect becomes transformational over time.
                </p>
                <p>
                  We think the same principle applies to AI inside businesses.
                </p>
                <p>
                  Most businesses don&apos;t need a dramatic AI rollout on day one. They benefit more from focused systems built around the operational work that keeps slowing the business down.
                </p>
                <p>
                  That might mean automating a repetitive process, building a proposal workflow, improving reporting, or giving agents access to the knowledge they need to do reliable work.
                </p>
                <p>
                  Each system on its own can seem contained. But once those systems are running, the effect compounds: margins improve, capital gets freed up, and operational risk starts to come down.
                </p>
                <p>
                  That is the thinking behind our <a href="/marginal-gains">Custom AI Systems work</a>, <a href="/speedrun">Speedrun</a>, and the longer-term support relationships we run with businesses that want to keep building capability over time.
                </p>
              </div>
            </div>
            <div className="about-split-right">
              <FormProcessingDemo />
            </div>
          </div>
        </section>

        <section className="section about-system">
          <div className="about-system-header">
            <h2>Our work is built around a simple commercial framework: up, up, down.</h2>
            <p>
              We build systems around the parts of a business where the impact is clearest: grow margins, free up capital, and reduce risk. Capability-building still matters, but it works best when teams are learning around systems already solving real operational work.
            </p>
          </div>
          <div className="about-system-grid">
            <div className="about-system-card">
              <span className="about-system-card-number">01</span>
              <h3>Grow margins</h3>
              <p>
                We build AI systems around workflows where repetitive manual work is draining time from the people who should be serving clients, delivering work, and moving the business forward.
              </p>
            </div>
            <div className="about-system-card">
              <span className="about-system-card-number">02</span>
              <h3>Free up capital</h3>
              <p>
                Better visibility, faster quoting, tighter inventory management, and cleaner financial workflows all help release capital that would otherwise stay tied up in slow, fragmented operations.
              </p>
            </div>
            <div className="about-system-card">
              <span className="about-system-card-number">03</span>
              <h3>Reduce risk</h3>
              <p>
                Systems become less dependent on one person remembering everything, less vulnerable to missed handoffs, and less exposed to knowledge walking out the door when people leave or roles change.
              </p>
            </div>
            <div className="about-system-card">
              <span className="about-system-card-number">04</span>
              <h3>Build capability</h3>
              <p>
                We run <a href="/speedrun">Speedrun Workshops</a>, support longer-term development through <a href="/marginal-gains">Marginal Gains</a>, and use <a href="/#system">Wingmen</a> as the operating environment. That gives teams a practical way to learn, operate, and keep improving.
              </p>
            </div>
          </div>
        </section>

        <section className="section about-who">
          <div className="about-who-grid">
            <div className="about-who-left">
              <h2>Our work is grounded in lived experience building and operating AI systems.</h2>
              <div className="about-who-body">
                <p>
                  We help business leaders understand what AI can actually do by building real systems with it, not by treating it as a strategy exercise disconnected from operations.
                </p>
                <p>
                  We&apos;ve worked with Stakwork, a Silicon Valley company building agent-based systems, and that experience shapes how we approach operational AI inside organisations. We care about what runs in the business, not just what sounds impressive in a workshop deck.
                </p>
                <p>
                  We operate as an AI-first business ourselves, using these tools across our own operations and building systems like Wingmen, our open-source agent operating environment. We also continue to run workshops and education programs, including <a href="/speedrun">Speedrun</a> for business teams and <a href="/levelup">Level Up</a> for schools, because capability develops fastest when people build with the tools directly.
                </p>
              </div>
            </div>
            <div className="about-who-right">
              <div className="about-bio-cards">
                <div className="about-bio-card">
                  <div className="about-bio-card-header">
                    <div className="about-bio-card-image">
                      <img src="/Pete.webp" alt="Pete Winn" />
                    </div>
                    <div>
                      <h3>Pete Winn</h3>
                      <span className="about-bio-card-role">Co-Founder</span>
                    </div>
                  </div>
                  <p>
                    Pete has a long track record in process redesign, deep tech and large enterprise and programme deployments from Rolls Royce to Rio Tinto.
                  </p>
                  <div className="about-bio-card-social" aria-label="Pete Winn social links">
                    <a href="https://www.linkedin.com/in/pete-winn-otherstuff/" target="_blank" rel="noopener noreferrer" aria-label="Pete Winn LinkedIn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href="https://primal.net/pw" target="_blank" rel="noopener noreferrer" aria-label="Pete Winn Nostr">
                      <img src="/primal-logo-white.svg" alt="" aria-hidden="true" className="about-bio-card-social-primal" />
                    </a>
                  </div>
                </div>
                <div className="about-bio-card">
                  <div className="about-bio-card-header">
                    <div className="about-bio-card-image">
                      <img src="/Andy.webp" alt="Andy David" />
                    </div>
                    <div>
                      <h3>Andy David</h3>
                      <span className="about-bio-card-role">Co-Founder</span>
                    </div>
                  </div>
                  <p>
                    Andy's background is in venture design, management consulting and technology startups, including process improvement for enterprise and SMEs.
                  </p>
                  <div className="about-bio-card-social" aria-label="Andy David social links">
                    <a href="https://www.linkedin.com/in/andymdavid/" target="_blank" rel="noopener noreferrer" aria-label="Andy David LinkedIn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href="https://primal.net/andydavid" target="_blank" rel="noopener noreferrer" aria-label="Andy David Nostr">
                      <img src="/primal-logo-white.svg" alt="" aria-hidden="true" className="about-bio-card-social-primal" />
                    </a>
                  </div>
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
