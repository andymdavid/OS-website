import React, { useState } from 'react';
import './FAQHomeDuplicate.css';

export interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Who is this for?',
    answer:
      "Australian businesses of around 10 to 200 people where too much work still runs on manual handoffs, spreadsheets and people's memory. We work most with professional services, project-based and operations-heavy businesses.",
  },
  {
    question: 'What happens on the first call?',
    answer:
      "It's 45 minutes. We ask how work moves through your business and where your team's time goes. If there's a clear place to start, we'll tell you what we'd automate first and what it would cost. If there isn't, we'll say so.",
  },
  {
    question: 'What do you actually do?',
    answer:
      "Mostly, we set up AI agents and automate work inside your business. If you'd rather run it yourself, we set up Ambulando and hand it over. If a job needs its own software, we build that too.",
  },
  {
    question: 'How is this different from ChatGPT?',
    answer:
      "ChatGPT is good at answering questions. It doesn't know your clients, your pricing, or who needs to approve what. Ambulando gives agents that context, connects them to your tools, and keeps people involved when work needs review.",
  },
  {
    question: 'Will it work with the tools we already use?',
    answer:
      "Yes, in most cases. Ambulando connects to the software your team already uses, so agents work from the same records your people do. If a tool can't be connected or keeps getting in the way, we can build something that fits better.",
  },
  {
    question: 'Do we need technical people?',
    answer:
      "No. You know the work and we handle the setup. We'll need someone who can explain how things should run and check what the agents produce.",
  },
  {
    question: 'What happens after the first month?',
    answer:
      'Keep going month to month, add more time to move faster, or stop. There are no long contracts.',
  },
  {
    question: 'Why is Ambulando open source?',
    answer:
      "Because your business shouldn't depend on ours. Your data stays yours, and everything we set up runs on open source software. If you stop working with us, or we're not around one day, you still have everything you need to keep going.",
  },
  {
    question: 'How much does it cost?',
    answer:
      'Ambulando on its own is $500 a month. Automation Partner starts at $5k a month with a one-month minimum. Want things done faster? Add more time in $5k blocks. Custom software is quoted per project once we understand the job.',
  },
];

interface FAQHomeDuplicateProps {
  items?: FAQItem[];
  eyebrow?: string;
  heading?: string;
  id?: string;
}

export function FAQHomeDuplicate({
  items = faqs,
  eyebrow = 'FAQ',
  heading = 'Common questions.',
  id,
}: FAQHomeDuplicateProps = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id={id} className="section faq-section-home">
      <div className="faq-home-container">
        <div className="intro-pill fade-in">{eyebrow}</div>

        <h2 className="faq-home-heading fade-in fade-in-stagger-1">
          {heading}
        </h2>

        <div className="faq-home-list fade-in fade-in-stagger-2">
          {items.map((item, index) => {
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
