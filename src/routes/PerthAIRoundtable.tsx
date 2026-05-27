import { SEO } from "@/components/SEO";
import { NavigationDraft } from "@/components/NavigationDraft";
import { Button } from "@/components/Button";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { Footer } from "@/components/Footer";
import { getOrganizationRef } from "@/lib/structured-data";
import "@/components/Hero.css";
import "@/components/IntroSection.css";
import "@/components/CTASection.css";
import "@/routes/PerthAIRoundtable.css";

const MEETUP_URL = "https://www.meetup.com/the-perth-ai-roundtable/";
const TOPICS_URL = "https://socratic.otherstuff.ai/";

export default function PerthAIRoundtable() {
  return (
    <div className="os-theme os-draft min-h-screen roundtable-page">
      <SEO
        title="The Perth AI Roundtable"
        description="A monthly Socratic seminar in Perth for people exploring AI, agents, automation, and the systems changing work and everyday life."
        path="/perth-ai-roundtable"
        ogImage="/perth-ai-roundtable-poster.webp"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://otherstuff.ai/perth-ai-roundtable/#webpage",
            url: "https://otherstuff.ai/perth-ai-roundtable/",
            name: "The Perth AI Roundtable",
            description:
              "A monthly Socratic seminar in Perth for people exploring AI, agents, automation, and the systems changing work and everyday life.",
            about: getOrganizationRef(),
            inLanguage: "en-AU",
            sameAs: MEETUP_URL,
          },
          {
            "@context": "https://schema.org",
            "@type": "EventSeries",
            "@id": "https://otherstuff.ai/perth-ai-roundtable/#event-series",
            name: "The Perth AI Roundtable",
            url: "https://otherstuff.ai/perth-ai-roundtable/",
            description:
              "A monthly Socratic seminar in Perth for open discussion about AI agents, automation, associated systems, and practical AI adoption.",
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: "Rocky Ridge Brewery",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Burswood",
                addressRegion: "WA",
                addressCountry: "AU",
              },
            },
            organizer: getOrganizationRef(),
            performer: getOrganizationRef(),
            sameAs: MEETUP_URL,
          },
        ]}
      />
      <NavigationDraft
        titleSwapOnScroll={{
          before: "OTHER STUFF",
          after: "AI ROUNDTABLE",
          targetId: "roundtable-hero",
        }}
      />
      <main>
        <section id="roundtable-hero" className="section roundtable-hero">
          <div className="section-container-wide roundtable-hero-inner">
            <div className="hero-title-block">
              <span className="roundtable-kicker">Perth, WA</span>
              <h1>The Perth AI Roundtable</h1>
              <p className="hero-bridge">
                A monthly Socratic seminar in Perth for people exploring AI, agents,
                automation, and the systems changing work and everyday life.
              </p>
              <div className="hero-cta roundtable-cta-row">
                <Button
                  variant="primary"
                  onClick={() => {
                    window.location.href = MEETUP_URL;
                  }}
                >
                  Join the Meetup
                </Button>
                <a
                  className="btn-secondary roundtable-secondary-link"
                  href={TOPICS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nominate a Topic
                </a>
              </div>
            </div>
            <figure className="roundtable-hero-poster">
              <img
                src="/perth-ai-roundtable-poster.webp"
                alt="The Perth AI Roundtable event poster showing the third Thursday monthly format"
              />
            </figure>
          </div>
        </section>

        <section className="section roundtable-intro">
          <div className="section-container-wide roundtable-split">
            <div className="roundtable-split-copy">
              <span className="roundtable-label">What it is</span>
              <h2>A structured conversation, not another AI presentation.</h2>
              <div className="roundtable-copy-stack">
                <p>
                  The Roundtable is a facilitated conversation where the room collectively
                  discusses and learns about AI and how to benefit from it.
                </p>
                <p>
                  Each month, the group works through a community-curated list of
                  questions and topics. We pick out the threads worth focusing on, then
                  discuss them openly with the people in the room.
                </p>
                <p>
                  The format is intentionally Socratic. The point is not to sit through
                  a lecture or a sales pitch. The value is in better questions, shared
                  experience, useful disagreement, and people thinking out loud together.
                </p>
                <p>
                  Anyone in Perth trying to make sense of AI is welcome: seasoned AI
                  professionals, business owners, students, builders, operators,
                  consultants, teachers, curious beginners, and everyone in between.
                </p>
              </div>
              <a className="btn-primary roundtable-button-link roundtable-inline-button" href={MEETUP_URL}>
                Join the Meetup
              </a>
            </div>
            <div className="roundtable-panel">
              <div className="roundtable-panel-header">
                <strong>Hosted on the third Thursday of each month.</strong>
              </div>
              <div className="roundtable-timetable">
                <div>
                  <span>6:00 - 6:30</span>
                  <strong>Arrive & connect</strong>
                  <p>Drinks, introductions, and time to meet the room.</p>
                </div>
                <div>
                  <span>6:30 - 7:45</span>
                  <strong>Facilitated Socratic discussion</strong>
                  <p>Open floor, community topics, no wrong answers.</p>
                </div>
                <div>
                  <span>7:45 - 8:00</span>
                  <strong>Nominate next month's questions</strong>
                  <p>Topics are added to the open list and curated for the next session.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section roundtable-proof">
          <div className="section-container-wide roundtable-proof-grid">
            <div className="roundtable-proof-copy">
              <span className="roundtable-label">In the room</span>
              <div className="roundtable-card-bottom">
                <h2>A local Perth conversation with a live agenda.</h2>
                <div className="roundtable-copy-stack">
                  <p>
                    The Roundtable is designed around the people who show up. The screen
                    helps frame the questions, but the useful part is the conversation in
                    the room.
                  </p>
                  <p>
                    We keep the format open enough for beginners and detailed enough for
                    people already building with AI agents, automation, and associated
                    systems.
                  </p>
                </div>
                <a className="btn-primary roundtable-button-link roundtable-inline-button" href={MEETUP_URL}>
                  Join the Meetup
                </a>
              </div>
            </div>
            <div className="roundtable-image-stack">
              <figure className="roundtable-image-panel">
                <img
                  src="/perth-ai-roundtable-hosts.webp"
                  alt="Pete Winn and Andy David hosting The Perth AI Roundtable in Perth"
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="section roundtable-topics">
          <div className="section-container-wide">
            <div className="roundtable-section-header">
              <span className="roundtable-label">What we discuss</span>
              <h2>AI agents, associated systems, and the practical edge of what is changing.</h2>
              <p>
                The topics move with the room, but the focus stays on the ideas, tools,
                risks, and opportunities people are actually trying to understand.
              </p>
            </div>
            <div className="roundtable-topic-grid">
              <article>
                <span>01</span>
                <div className="roundtable-topic-card-bottom">
                  <h3>AI agents</h3>
                  <p>What agents can do now, where they break, and how they might become useful in real work.</p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div className="roundtable-topic-card-bottom">
                  <h3>Everyday use</h3>
                  <p>How AI is changing personal workflows, learning, creativity, research, and day-to-day decisions.</p>
                </div>
              </article>
              <article>
                <span>03</span>
                <div className="roundtable-topic-card-bottom">
                  <h3>Business systems</h3>
                  <p>How automation, workflow design, and internal systems are changing the way organisations operate.</p>
                </div>
              </article>
              <article>
                <span>04</span>
                <div className="roundtable-topic-card-bottom">
                  <h3>Open questions</h3>
                  <p>The tradeoffs, risks, failures, surprises, and second-order effects worth taking seriously.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section roundtable-format">
          <div className="section-container-wide roundtable-format-grid">
            <div className="roundtable-format-copy">
              <span className="roundtable-label">Topics for Discussion</span>
              <div className="roundtable-card-bottom">
                <h2>The agenda is built by the community before the room meets.</h2>
                <div className="roundtable-copy-stack">
                  <p>
                    Topics can be nominated on an open list before each session. The
                    organisers curate that list with help from Wingman, then bring the
                    strongest questions into the room.
                  </p>
                  <p>
                    On the night, we do not try to cover everything. We choose the threads
                    with the most energy, slow them down, and let the group work through
                    them properly.
                  </p>
                </div>
                <a
                  className="btn-primary roundtable-button-link roundtable-inline-button"
                  href={TOPICS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Add a question to the list
                </a>
              </div>
            </div>
            <div className="roundtable-question-stack" aria-label="Example Roundtable topic themes">
              <div className="roundtable-question-card">
                <span>Question</span>
                <p>Where are AI agents genuinely useful today?</p>
              </div>
              <div className="roundtable-question-card">
                <span>Question</span>
                <p>What changes when AI becomes part of day-to-day work?</p>
              </div>
              <div className="roundtable-question-card">
                <span>Question</span>
                <p>Which systems should people trust, own, or avoid?</p>
              </div>
              <div className="roundtable-question-card">
                <span>Question</span>
                <p>How do we use AI well without losing judgement?</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section roundtable-connected">
          <div className="section-container-wide roundtable-connected-grid">
            <div className="roundtable-connected-card">
              <span className="roundtable-label">Between sessions</span>
              <div className="roundtable-card-bottom roundtable-connected-card-bottom">
                <div>
                  <h2>The conversation continues each week via The Good Stuff.</h2>
                  <p>
                    The Roundtable meets monthly, but The Good Stuff keeps the
                    conversation moving each week. It is our newsletter and podcast for
                    people tracking how AI is changing work, business models, tools, and
                    the broader economy.
                  </p>
                </div>
                <EmailCaptureForm
                  variant="inline"
                  placeholder="Email address"
                  buttonText="Join"
                  className="roundtable-newsletter-form"
                />
              </div>
            </div>
            <div className="roundtable-connected-card">
              <span className="roundtable-label">Hosted by Other Stuff</span>
              <div className="roundtable-card-bottom roundtable-connected-card-bottom">
                <div>
                  <h2>A shared learning room for Perth's AI-curious.</h2>
                  <p>
                    Other Stuff hosts the Roundtable as part of our broader work helping
                    people understand AI by working with it directly. It brings together
                    builders, business owners, operators, students, educators, consultants,
                    and curious beginners to learn from the questions in the room.
                  </p>
                </div>
                <a href="/the-good-stuff/" className="btn-primary roundtable-button-link roundtable-inline-button">
                  Explore The Good Stuff
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section cta-section cta-section-home roundtable-final">
          <div className="cta-card roundtable-final-inner">
            <div className="intro-pill">Join the Roundtable</div>
            <h2>Come to the next Perth AI Roundtable.</h2>
            <p>
              We meet on the third Thursday of each month in Burswood. RSVP on Meetup
              and add a topic if there is a question you want the room to explore.
            </p>
            <div className="roundtable-cta-row">
              <a className="btn-primary roundtable-button-link" href={MEETUP_URL}>
                Join the Meetup
              </a>
              <a
                className="btn-secondary roundtable-secondary-link"
                href={TOPICS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Nominate a Topic
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
