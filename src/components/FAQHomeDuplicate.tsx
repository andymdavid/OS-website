import React, { useState } from 'react';
import './FAQHomeDuplicate.css';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What kinds of businesses do you work with?',
    answer:
      'We work with SMEs and business teams that have real operational workflows — quoting, onboarding, follow-up, internal coordination, reporting. If your team is spending time on repetitive manual work that follows a pattern, there is usually a system we can build around it.',
  },
  {
    question: 'What does a first engagement look like?',
    answer:
      'It starts with a free AI audit where we look at where your team is losing time and whether a custom AI system makes sense. If there is a fit, we scope a focused build around a specific workflow and deliver a working system — not a strategy deck.',
  },
  {
    question: 'What does an AI audit actually involve?',
    answer:
      'We look at how your team works day to day — where time goes, where handoffs slow things down, and where the same work gets repeated. From there we identify which workflows would benefit most from a custom AI system and what a first build would look like. It\u2019s a practical conversation, not a sales pitch.',
  },
  {
    question: 'Do we need technical expertise on our end?',
    answer:
      'No. We handle the build. Your team needs to understand the workflow and be available to validate that the system fits how you actually work. The systems we deliver are managed through Flight Deck, which is designed for non-technical operators.',
  },
  {
    question: 'How is this different from using ChatGPT or hiring an AI consultant?',
    answer:
      'ChatGPT is a general-purpose tool — you still need someone to figure out how to apply it to your business. Most AI consultants deliver recommendations. We deliver running systems built around your actual workflows, on infrastructure we built and maintain.',
  },
  {
    question: 'What happens after the system is delivered?',
    answer:
      'Your system runs on our open-source infrastructure, so you are not locked in. We offer ongoing support and optimisation, but you can also run and extend the system independently. The goal is to build capability inside your business, not dependency on us.',
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
