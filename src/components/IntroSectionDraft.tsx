
import React from 'react';
import './IntroSection.css';

export function IntroSectionDraft() {
  return (
    <section className="intro-section intro-section-draft">
      <div className="intro-container intro-two-column">
        <div className="intro-left">
          <div className="intro-pill">BUILDING CAPABILITY</div>

          <h2 className="intro-heading">
            If you haven't worked hands-on with AI tools in your own business, it's difficult to judge where they genuinely add value.
          </h2>

          <p className="intro-text">
            Many businesses are still trying to work out what AI actually means for them. Without hands-on experience using the tools inside your team, it's difficult to judge where it genuinely adds value and where it doesn't.
          </p>

          <p className="intro-text">
            No one understands your business the way you do, which is why internal capability matters. When people start building and experimenting with AI themselves, decisions become clearer.
          </p>
        </div>

        <div className="intro-right">
          {/* Right column - empty for now */}
        </div>
      </div>
    </section>
  );
}
