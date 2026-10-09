import { useEffect, useRef, useState } from 'react';
import { BookCallContent } from './BookCallContent';
import { CAL_DISCOVERY_URL } from '../lib/links';
import './MGPricingSection.css';

const pricingDetails = [
  {
    title: 'What’s included each month',
    body: 'Two mornings with your team to agree what to automate. The automation built, set up and tested in the first week. Ongoing improvements as your team uses it. Agreeing together what to automate next.',
  },
  {
    title: 'What we need from your team',
    body: 'Two mornings with the people who do the work, then their feedback once they’re using it. You don’t need any technical staff.',
  },
  {
    title: 'Automating more at once',
    body: 'Add another improvement loop for $5,000 a month and we run a second focused stream of automation work alongside the first.',
  },
  {
    title: 'If you stop',
    body: 'Your automations, your data and the software they run on stay with you.',
  },
] as const;

export function MGPricingSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const [cycleStarted, setCycleStarted] = useState(false);
  const accordionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const accordion = accordionRef.current;
    if (!accordion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setCycleStarted(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(accordion);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!cycleStarted) return;

    const timer = window.setTimeout(() => {
      setOpenIndex((current) => (current + 1) % pricingDetails.length);
      setCycleKey((current) => current + 1);
    }, 9000);

    return () => window.clearTimeout(timer);
  }, [openIndex, cycleKey, cycleStarted]);

  const selectItem = (index: number) => {
    setOpenIndex(index);
    setCycleKey((current) => current + 1);
    setCycleStarted(true);
  };

  return (
    <section id="pricing" className="section mg-pricing-section">
      <div className="section-container-wide mg-pricing-grid">
        <div className="mg-pricing-left">
          <div className="intro-pill fade-in">PRICING</div>
          <h2 className="section-heading fade-in fade-in-stagger-1">
            A monthly fee, with no lock in contract.
          </h2>
          <p className="mg-pricing-subpara fade-in fade-in-stagger-2">
            You pay one month at a time. The Automation Partner fee covers our time with your team and the automations we build. Ambulando covers the system they run on. One-month minimum, and you can stop whenever you like.
          </p>
          <a
            className="mg-pricing-cta book-call-button fade-in fade-in-stagger-3"
            href={CAL_DISCOVERY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookCallContent />
          </a>

          <div ref={accordionRef} className="mg-pricing-accordion fade-in fade-in-stagger-3">
            {pricingDetails.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div className={`mg-pricing-item ${isOpen ? 'is-open' : ''}`} key={item.title}>
                  {isOpen && cycleStarted ? (
                    <span className="mg-pricing-progress" key={cycleKey} aria-hidden="true" />
                  ) : null}
                  <button
                    className="mg-pricing-question"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`mg-pricing-answer-${index}`}
                    onClick={() => selectItem(index)}
                  >
                    <span>{item.title}</span>
                    <span className="mg-pricing-toggle" aria-hidden="true">
                      {isOpen ? '×' : '+'}
                    </span>
                  </button>
                  <div
                    id={`mg-pricing-answer-${index}`}
                    className="mg-pricing-answer"
                  >
                    <div>
                      <p>{item.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mg-pricing-right fade-in fade-in-stagger-2">
          <article className="mg-pricing-card">
            <div className="mg-pricing-card-intro">
              <span>MONTHLY PRICING</span>
              <p>Everything needed to build, run and improve your automations.</p>
            </div>

            <div className="mg-pricing-plan">
              <div className="mg-pricing-plan-heading">
                <h3>Automation Partner</h3>
                <p><strong>$5,000</strong> per improvement loop,<br />per month + GST</p>
              </div>
              <p>One focused stream of automation work, delivered through the monthly improvement cycle.</p>
            </div>

            <div className="mg-pricing-plan">
              <div className="mg-pricing-plan-heading">
                <h3>Ambulando</h3>
                <p><strong>$500</strong> a month + GST</p>
              </div>
              <p>The system your automations run on, set up with your company’s information and processes.</p>
              <span className="mg-pricing-early-rate">Early-adopter rate for our first 21 clients.</span>
            </div>

            <div className="mg-pricing-total">
              <span>Total to start with one improvement loop</span>
              <p><strong>$5,500</strong> a month + GST</p>
            </div>

            <a
              className="mg-pricing-card-cta book-call-button"
              href={CAL_DISCOVERY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookCallContent />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
