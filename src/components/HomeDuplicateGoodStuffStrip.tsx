import { useState } from 'react';
import { NewsletterModal } from './NewsletterModal';
import './HomeDuplicateGoodStuffStrip.css';

export function HomeDuplicateGoodStuffStrip() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="home-duplicate-good-stuff-strip" aria-label="Intelligence Snacks publication">
        <button type="button" onClick={() => setIsOpen(true)}>
          <img src="/intelligence-snacks-cassette-clean-v3.png" alt="" aria-hidden="true" />
          <span className="home-duplicate-good-stuff-strip-message">
            <span>Big ideas on AI, software and business, delivered weekly.</span>
          </span>
          <strong>Send me snacks →</strong>
        </button>
      </section>

      <NewsletterModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        pill="INTELLIGENCE SNACKS"
        heading="Get Intelligence Snacks in your inbox."
        description="For people building and running modern businesses, Intelligence Snacks helps you quickly digest the big ideas emerging from the world of AI, delivered to your inbox each week."
        buttonText="Send me snacks"
      />
    </>
  );
}
