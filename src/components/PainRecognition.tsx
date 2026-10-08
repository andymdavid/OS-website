import React, { useEffect, useRef } from 'react';
import './PainRecognition.css';

const paragraphs = [
  "Every week, someone in your business pulls together the same information they compiled last week. Quotes that need building from scratch. Invoices that need chasing. Reports that need writing.",
  "It's not complex work. It's just slow, manual, and keeps landing on the people who should be spending their time with clients, delivering value and growing the business.",
  "Each month, we work with your team to find where that work is slowing decisions, draining margin, tying up capital or creating risk, and we automate it one workflow at a time.",
  "Your people get their time back for the work that actually matters. The business stops depending on any single person being available. And because everything runs on infrastructure you own, each month's improvements build on the last.",
  "If that sounds like your business, we'd like to hear about it.",
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
      const textBlocks = container!.querySelectorAll<HTMLElement>('.pain-recognition-text');
      const firstText = textBlocks[0];
      const lastText = textBlocks[textBlocks.length - 1];
      if (!firstText || !lastText) return;

      const firstRect = firstText.getBoundingClientRect();
      const lastRect = lastText.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const contentTop = firstRect.top;
      const contentHeight = lastRect.bottom - firstRect.top;
      const revealStart = windowHeight * 0.72;
      const revealEnd = windowHeight * 0.28;
      const totalRange = revealStart - revealEnd + contentHeight;
      const progress = Math.min(
        Math.max((revealStart - contentTop) / totalRange, 0),
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

        <footer className="pain-recognition-signoff" aria-label="Signed by Pete Winn and Andy David">
          <p className="pain-recognition-signature">Pete &amp; Andy</p>
          <div className="pain-recognition-signoff-meta">
            <div className="pain-recognition-founders" aria-hidden="true">
              <img src="/Pete-letter.png" alt="" />
              <img src="/Andy-letter.png" alt="" />
            </div>
            <div className="pain-recognition-company">
              <img src="/Logo-Main-Icon.webp" alt="" aria-hidden="true" />
              <p className="pain-recognition-role">
                <strong>Co-Founders</strong>
                <span>Other Stuff</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
