import React, { useEffect, useRef } from 'react';
import './PainRecognition.css';

const paragraphs = [
  "Every week, someone in your business pulls together the same information they compiled last week. Quotes that need to be built from scratch. Invoices that need chasing. Reports that need writing.",
  "It's not complex work. It's just slow, manual, and it keeps landing on the people who should be spending their time with clients, delivering value, and growing the business.",
  "We build AI systems around the workflows in your business where this is happening, purpose-built around how your business actually functions.",
  "Your people get their time back for the work that actually matters. The business stops depending on any single person being available. And every system we deliver runs on infrastructure you own, so the value compounds inside your business over time.",
];

function splitIntoWords(text: string): string[] {
  return text.split(/\s+/);
}

export function PainRecognition() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll<HTMLSpanElement>('.pr-word');
    if (!words.length) return;

    function onScroll() {
      const rect = container!.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const revealStart = windowHeight * 0.65;
      const revealEnd = windowHeight * 0.1;
      const totalRange = revealStart - revealEnd + sectionHeight * 0.5;
      const progress = Math.min(
        Math.max((revealStart - sectionTop) / totalRange, 0),
        1
      );

      const totalWords = words.length;
      words.forEach((word, i) => {
        const wordProgress = i / totalWords;
        if (progress > wordProgress) {
          word.classList.add('revealed');
        } else {
          word.classList.remove('revealed');
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="section pain-recognition-section">
      <div className="pain-recognition-container" ref={containerRef}>
        {paragraphs.map((para, pIndex) => (
          <p key={pIndex} className="pain-recognition-text">
            {splitIntoWords(para).map((word, wIndex) => (
              <span key={`p${pIndex}-${wIndex}`} className="pr-word">
                {word}{' '}
              </span>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}
