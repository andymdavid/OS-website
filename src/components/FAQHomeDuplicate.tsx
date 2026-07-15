import React, { useState } from 'react';
import './FAQHomeDuplicate.css';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Who is this for?',
    answer:
      'We work with SMEs and business teams where important work still depends on manual handoffs, fragmented information, repeated admin, or people holding too much operational knowledge in their heads.',
  },
  {
    question: 'What happens on the first call?',
    answer:
      'We look at how your business works, where time and margin are being lost, and whether AI can improve margin, free up capital, or reduce risk. If there is a clear fit, we talk through the best next step.',
  },
  {
    question: 'Do you build software, agents, or provide advice?',
    answer:
      'Usually it is a mix. We build Wingman Apps around high-value workflows, use Wingman to run agents, records, approvals, and tools reliably, and run Speedrun workshops when your team needs to build capability alongside the software.',
  },
  {
    question: 'How is this different from ChatGPT or off-the-shelf AI tools?',
    answer:
      'ChatGPT and other AI tools are useful, but they do not know how your business works by default. Wingman gives AI the operating context, records, approvals, and workflow structure it needs to do useful work inside your business.',
  },
  {
    question: 'How does Wingman work with our existing tools?',
    answer:
      'Wingman is designed to work around the tools your team already uses. Sometimes that means connecting to existing systems, and sometimes it means building a Wingman App that replaces a manual or awkward part of the workflow.',
  },
  {
    question: 'Do we need technical expertise on our end?',
    answer:
      'No. We handle the technical build. Your team needs to understand the workflow, make decisions about how the work should run, and validate that what we build fits the way your business actually operates.',
  },
  {
    question: 'What happens after something goes live?',
    answer:
      'We keep improving the workflow with you, support the system in production, and tailor it around your team’s needs as the work evolves. Wingman is open-source infrastructure, so the goal is capability inside your business rather than dependency on us.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'It depends on what we are building. A focused Wingman App, a broader Wingman deployment, and a team workshop are different scopes. The first call helps us understand the business case and give you a realistic view of what it is likely to cost.',
  },
];

export function FAQHomeDuplicate() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section faq-section-home">
      <div className="faq-home-container">
        <div className="intro-pill fade-in">FAQ</div>

        <h2 className="faq-home-heading fade-in fade-in-stagger-1">
          Common questions.
        </h2>

        <div className="faq-home-list fade-in fade-in-stagger-2">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-home-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  className="faq-home-question"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span className="faq-home-toggle">{isOpen ? '\u00d7' : '+'}</span>
                </button>
                <div className={`faq-home-answer ${isOpen ? 'visible' : ''}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
