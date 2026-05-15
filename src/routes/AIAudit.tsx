import { useState, type CSSProperties } from "react";
import { SEO } from "@/components/SEO";
import { NavigationDraft } from "@/components/NavigationDraft";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { AIAuditFitDemo } from "@/components/AIAuditFitDemo";
import { AIAuditQuestionnaireDemo } from "@/components/AIAuditQuestionnaireDemo";
import { RelatedNewsletterLinks } from "@/components/RelatedNewsletterLinks";
import "@/components/Hero.css";
import "@/components/IntroSection.css";
import "@/components/FunnelSection.css";
import "@/components/HomeDuplicateGridSection.css";
import "@/routes/AIAudit.css";

const faqItems = [
  {
    question: "What happens after I book the audit?",
    answer:
      "We send through the questionnaire and use your responses to understand how the business runs, where time is being lost, and which workflows are most likely to justify automation. From there we analyse the strongest opportunities and bring the findings back to you in a discovery session.",
  },
  {
    question: "How long does the AI Audit take?",
    answer:
      "The questionnaire takes around 20 minutes to complete. After that we review your submission and schedule a follow-up session to walk through where the best opportunities sit and what acting on them would involve.",
  },
  {
    question: "Is this a generic AI strategy session?",
    answer:
      "No. The purpose of the audit is to identify a specific workflow in your business worth turning into a system first. It is designed to produce a practical starting point, not a broad ideas list.",
  },
  {
    question: "What kinds of businesses is it best suited to?",
    answer:
      "It is best suited to SME businesses with repeated workflows, meaningful team time tied up in manual work, and a clear commercial reason to improve how a process runs. The strongest fit is where the right system would improve margin, release capacity, or reduce operational risk.",
  },
  {
    question: "What happens if there is a strong opportunity?",
    answer:
      "If the fit is clear, the next step is to scope the first system around that workflow in detail. That means defining what the build would do, what it would cost, and how it would integrate into the way your team already works.",
  },
];

export default function AIAudit() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="os-theme os-draft min-h-screen ai-audit-page">
      <SEO
        title="Free AI Audit for SMEs | Perth & Australia"
        description="Book a free AI audit with Other Stuff. We look at where time, margin, capital, and operational risk are being lost, then identify the workflow where a custom AI system can have the clearest impact."
        path="/ai-audit"
      />
      <NavigationDraft titleOverride="OTHER STUFF" />
      <main>
        <section className="section ai-audit-hero">
          <div className="section-container-wide ai-audit-hero-inner">
            <div className="hero-title-block ai-audit-hero-copy">
              <h1 className="hero-duplicate-heading ai-audit-hero-title">You know AI should be doing more in your business. The question is where to start.</h1>
              <p className="ai-audit-hero-body">
                Get started with a free AI Audit, a structured assessment that helps us identify the
                workflows in your business most ready for automation
              </p>
              <div className="hero-cta ai-audit-hero-actions">
                <Button
                  variant="primary"
                  className="hero-cta-book"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Book a Free AI Audit
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section ai-audit-opportunity">
          <div className="section-container-wide ai-audit-opportunity-grid">
            <div className="ai-audit-opportunity-copy">
              <div className="intro-pill">Where it starts</div>
              <h2 className="section-heading ai-audit-section-title">
                A clear view of where AI can make the biggest difference in your business.
              </h2>
              <p className="ai-audit-opportunity-body">
                The AI Audit is a two-part process. First, you complete a structured questionnaire that
                maps the key workflows in your business — helping us identify where automating the right
                process could increase your margins, free up capital, and reduce operational risk.
              </p>
              <p className="ai-audit-opportunity-body">
                The questionnaire takes around 20 minutes. We then analyse your responses and come back
                to you with a clear view of where the best opportunities sit and what it would take to
                act on them.
              </p>
              <Button
                variant="primary"
                className="hero-cta-book ai-audit-opportunity-button"
                onClick={() => (window.location.href = "/contact")}
              >
                Book a Free AI Audit
              </Button>
            </div>

            <div
              className="home-duplicate-grid-visual ai-audit-opportunity-visual"
              style={{ "--card-bg": "url('/grid-customer-acquisition.webp')" } as CSSProperties}
            >
              <AIAuditQuestionnaireDemo />
            </div>
          </div>
        </section>

        <section className="section ai-audit-opportunity">
          <div className="section-container-wide ai-audit-opportunity-grid">
            <div
              className="home-duplicate-grid-visual ai-audit-opportunity-visual"
              style={{ "--card-bg": "url('/grid-customer-acquisition.webp')" } as CSSProperties}
            >
              <AIAuditFitDemo />
            </div>

            <div className="ai-audit-opportunity-copy ai-audit-opportunity-copy-shifted">
              <div className="intro-pill">Who is it for</div>
              <h2 className="section-heading ai-audit-section-title">
                The AI Audit is for SME business owners and leaders who are responsible for how the business runs day to day.
              </h2>
              <p className="ai-audit-opportunity-body">
                It&apos;s most useful if you have recurring workflows consuming significant team time, a
                sense that certain processes could run better, and the appetite to act on a specific
                recommendation rather than a general report.
              </p>
              <p className="ai-audit-opportunity-body">
                The businesses that get the most from it are the ones where automating the right
                workflow would directly increase margins, free up capital, or reduce operational risk
                — and where the team&apos;s time is the primary constraint on growth.
              </p>
              <Button
                variant="primary"
                className="hero-cta-book ai-audit-opportunity-button"
                onClick={() => (window.location.href = "/contact")}
              >
                Book a Free AI Audit
              </Button>
            </div>
          </div>
        </section>

        <section className="section ai-audit-process">
          <div className="section-container-wide">
            <div className="ai-audit-section-head">
              <div className="funnel-pill">How It Works</div>
              <h2 className="section-heading ai-audit-section-title">
                A process designed to identify the workflows in your business worth automating.
              </h2>
            </div>
            <div className="ai-audit-process-grid">
              <article className="ai-audit-process-step">
                <div className="ai-audit-process-demo ai-audit-process-demo-questionnaire" aria-hidden="true">
                  <div className="ai-audit-process-demo-header"></div>
                  <div className="ai-audit-process-demo-line ai-audit-process-demo-line-long"></div>
                  <div className="ai-audit-process-demo-option">
                    <span></span>
                    <div></div>
                  </div>
                  <div className="ai-audit-process-demo-option ai-audit-process-demo-option-active">
                    <span></span>
                    <div></div>
                  </div>
                  <div className="ai-audit-process-demo-option">
                    <span></span>
                    <div></div>
                  </div>
                </div>
                <div className="ai-audit-process-copy">
                  <div className="ai-audit-process-tag">STEP ONE</div>
                  <h3>Complete the questionnaire</h3>
                  <p>
                    A structured 20-minute questionnaire that maps the key workflows in your business
                    — where time goes, where things slow down, and where the same work happens
                    repeatedly.
                  </p>
                </div>
              </article>
              <article className="ai-audit-process-step">
                <div className="ai-audit-process-demo ai-audit-process-demo-analysis" aria-hidden="true">
                  <div className="ai-audit-process-scan-row">
                    <label>Margin upside</label>
                    <div className="ai-audit-process-meter"><span className="meter-one"></span></div>
                  </div>
                  <div className="ai-audit-process-scan-row">
                    <label>Capital release</label>
                    <div className="ai-audit-process-meter"><span className="meter-two"></span></div>
                  </div>
                  <div className="ai-audit-process-scan-row">
                    <label>Risk reduction</label>
                    <div className="ai-audit-process-meter"><span className="meter-three"></span></div>
                  </div>
                </div>
                <div className="ai-audit-process-copy">
                  <div className="ai-audit-process-tag">STEP TWO</div>
                  <h3>We analyse your responses</h3>
                  <p>
                    We review every submission, identify the processes most ready for automation, and
                    assess where acting on the right opportunity would increase margins, free up
                    capital, or reduce operational risk.
                  </p>
                </div>
              </article>
              <article className="ai-audit-process-step">
                <div className="ai-audit-process-demo ai-audit-process-demo-review" aria-hidden="true">
                  <div className="ai-audit-process-review-card"></div>
                  <div className="ai-audit-process-review-card ai-audit-process-review-card-active"></div>
                  <div className="ai-audit-process-review-card"></div>
                  <div className="ai-audit-process-review-footer">
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="ai-audit-process-copy">
                  <div className="ai-audit-process-tag">STEP THREE</div>
                  <h3>Review the findings together</h3>
                  <p>
                    We meet to walk through our analysis, pressure-test the strongest candidates, and
                    agree on the most valuable place to start. From there we can scope exactly what
                    building it would involve.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section ai-audit-intro">
          <div className="section-container-wide ai-audit-intro-grid">
            <div className="ai-audit-intro-copy">
              <div className="intro-pill">WHY THIS EXISTS</div>
              <div className="ai-audit-intro-copy-body">
                <h2 className="section-heading ai-audit-section-title">
                  The audit is designed to find where a focused AI system would make a measurable commercial difference.
                </h2>
                <p>
                  We look at how your business operates, where repeated manual work is slowing decisions
                  or draining capacity, and where acting on the right workflow would move the numbers
                  that matter.
                </p>
                <Button
                  variant="primary"
                  className="hero-cta-book ai-audit-intro-button"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Book a Free AI Audit
                </Button>
              </div>
            </div>
            <div className="ai-audit-intro-panel">
              <div className="ai-audit-panel-header">
                <span>Audit Focus</span>
              </div>
              <div className="ai-audit-panel-list">
                <div className="ai-audit-panel-item">
                  <span>01</span>
                  <div>
                    <strong>Margin <em aria-hidden="true">↑</em></strong>
                    <p>Where repeated manual work is consuming resources that should be going to higher value activity.</p>
                  </div>
                </div>
                <div className="ai-audit-panel-item">
                  <span>02</span>
                  <div>
                    <strong>Capital <em aria-hidden="true">↑</em></strong>
                    <p>Where delay, poor visibility, or fragmented processes are slowing cash flow or tying up resources.</p>
                  </div>
                </div>
                <div className="ai-audit-panel-item">
                  <span>03</span>
                  <div>
                    <strong>Risk <em aria-hidden="true">↓</em></strong>
                    <p>Where workflows depend too heavily on one person or one manual step to run reliably.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section ai-audit-outcomes">
          <div className="section-container-wide">
            <div className="ai-audit-section-head">
              <div className="funnel-pill">What You Walk Away With</div>
              <h2 className="section-heading ai-audit-section-title">
                You leave knowing exactly where to start and why it&apos;s worth it.
              </h2>
              <p>
                By the end of the discovery session you&apos;ll have a clear view of where to focus,
                why it makes commercial sense, and what acting on it would involve.
              </p>
            </div>
            <div className="ai-audit-card-grid">
              <article className="ai-audit-card">
                <div className="ai-audit-outcome-demo ai-audit-outcome-demo-priority" aria-hidden="true">
                  <div className="ai-audit-outcome-priority-row is-primary">
                    <span>01</span>
                    <div className="ai-audit-outcome-priority-copy">
                      <strong>Sales follow-up</strong>
                      <small>Score 8.9</small>
                    </div>
                  </div>
                  <div className="ai-audit-outcome-priority-row">
                    <span>02</span>
                    <div className="ai-audit-outcome-priority-copy">
                      <strong>Client reporting</strong>
                      <small>Score 7.1</small>
                    </div>
                  </div>
                  <div className="ai-audit-outcome-priority-row">
                    <span>03</span>
                    <div className="ai-audit-outcome-priority-copy">
                      <strong>Job coordination</strong>
                      <small>Score 6.4</small>
                    </div>
                  </div>
                </div>
                <span className="ai-audit-card-number">01</span>
                <h3>A prioritised workflow</h3>
                <p>
                  Which process in your business is most worth turning into a system first — and why
                  it sits above the others.
                </p>
              </article>
              <article className="ai-audit-card">
                <div className="ai-audit-outcome-demo ai-audit-outcome-demo-case" aria-hidden="true">
                  <div className="ai-audit-outcome-case-row">
                    <label>Margin</label>
                    <span></span>
                    <small>High</small>
                  </div>
                  <div className="ai-audit-outcome-case-row">
                    <label>Capital</label>
                    <span></span>
                    <small>Medium</small>
                  </div>
                  <div className="ai-audit-outcome-case-row">
                    <label>Risk</label>
                    <span></span>
                    <small>High</small>
                  </div>
                  <div className="ai-audit-outcome-case-summary">
                    <span>Commercial rationale</span>
                    <strong>Strong case</strong>
                  </div>
                </div>
                <span className="ai-audit-card-number">02</span>
                <h3>The commercial case</h3>
                <p>
                  Where the upside sits across margin, capital, and operational risk — grounded in
                  how your business actually operates.
                </p>
              </article>
              <article className="ai-audit-card">
                <div className="ai-audit-outcome-demo ai-audit-outcome-demo-path" aria-hidden="true">
                  <div className="ai-audit-outcome-path-row">
                    <label>Workflow</label>
                    <strong>Sales follow-up</strong>
                  </div>
                  <div className="ai-audit-outcome-path-row">
                    <label>System shape</label>
                    <strong>Lead triage + response draft</strong>
                  </div>
                  <div className="ai-audit-outcome-path-row">
                    <label>Implementation</label>
                    <strong>Scoped build ready</strong>
                  </div>
                  <div className="ai-audit-outcome-path-footer">
                    <span>Scope ready</span>
                    <em>•</em>
                    <span>Discovery complete</span>
                  </div>
                </div>
                <span className="ai-audit-card-number">03</span>
                <h3>A clear path forward</h3>
                <p>
                  What building the first system would involve, what it would cost, and what it would change.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section ai-audit-faq">
          <div className="section-container-wide">
            <div className="ai-audit-faq-container">
              <div className="intro-pill">FAQ</div>
              <h2 className="section-heading ai-audit-faq-heading">
                Common questions about the AI Audit.
              </h2>
              <div className="ai-audit-faq-list">
                {faqItems.map((item, index) => {
                  const isOpen = openFaqIndex === index;

                  return (
                    <div
                      key={item.question}
                      className={`ai-audit-faq-item ${isOpen ? "open" : ""}`}
                    >
                      <button
                        type="button"
                        className="ai-audit-faq-question"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      >
                        <span>{item.question}</span>
                        <span className="ai-audit-faq-toggle">{isOpen ? "×" : "+"}</span>
                      </button>
                      <div className={`ai-audit-faq-answer ${isOpen ? "visible" : ""}`}>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <RelatedNewsletterLinks
          slugs={[
            "is-ai-really-saving-you-time",
            "building-rhinos-not-chasing-unicorns",
          ]}
          eyebrow="Field notes"
          heading="Thinking behind the audit"
        />

        <CTASection
          pillLabel="Free AI Audit"
          heading="Start with a practical look at where the biggest AI opportunity sits."
          intro="We&apos;ll look at where the business is losing time, margin, capital, or operational reliability, and whether a focused AI system makes sense as the next step."
          buttonLabel="Book a Free AI Audit"
        />
      </main>
      <Footer />
    </div>
  );
}
