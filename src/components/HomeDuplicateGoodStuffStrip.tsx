import { useState } from 'react';
import { NewsletterModal } from './NewsletterModal';
import './HomeDuplicateGoodStuffStrip.css';

export function HomeDuplicateGoodStuffStrip() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="home-duplicate-good-stuff-strip" aria-label="The Good Stuff newsletter">
        <button type="button" onClick={() => setIsOpen(true)}>
          <span>The Good Stuff: practical notes on how AI helps SMEs.</span>
          <strong>Join the newsletter →</strong>
        </button>
      </section>

      <NewsletterModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        pill="THE GOOD STUFF"
        heading="Get our newsletter for businesses exploring how AI can improve margin, free up capital, and reduce risk."
        description="The Good Stuff is our newsletter on how AI is changing the way SMEs work, what’s practical, and how we approach the problems we solve."
        buttonText="Join The Good Stuff"
      />
    </>
  );
}
