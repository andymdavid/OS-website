'use client';

import React from 'react';
import { Button } from './Button';
import './CTASection.css';

export function CTASection() {
  return (
    <section className="section cta-section">
      <div className="section-container-wide">
        <div className="cta-pill fade-in">HOW TO GET STARTED</div>

        <h2 className="section-heading fade-in fade-in-stagger-1">
          Here's how we begin
        </h2>

        <p className="cta-intro fade-in fade-in-stagger-2">
          Whether you're looking to clarify your offer, align your messaging, or build systems that scale with intelligence — we meet you where you are and help you move forward with confidence.
        </p>

        <div className="cta-cards">
          <div className="cta-card cta-card-dark fade-in">
            <div className="cta-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Let's talk about what's not working yet</h3>
            <p>When pricing and content finally speak the same language, results follow.</p>
            <Button variant="primary">Book a consultation</Button>
          </div>

          <div className="cta-card cta-card-gradient fade-in fade-in-stagger-1">
            <div className="cta-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Explore how we structure complex services</h3>
            <p>From core offer to brand voice, our frameworks help you align what you do with how it's understood.</p>
            <Button variant="primary">See our services</Button>
          </div>
        </div>

        <div className="cta-disclaimer fade-in fade-in-stagger-2">
          <p>
            This area is intentionally left open for long-form content that carries legal, structural, or operational importance.
            It exists to support the type of information that doesn't always fit into marketing headlines — but is no less essential
            to a fully functional and trustworthy digital presence. Use this space to include service disclaimers, contractual notes,
            policy outlines, or technical documentation that helps clarify how your company operates, what your clients can expect,
            and what rules govern that relationship. This might include terms of service, refund policies, privacy disclaimers,
            copyright statements, platform notices, or operational workflows — anything that would otherwise be lost in footnotes
            or buried in PDFs.
          </p>
        </div>
      </div>
    </section>
  );
}
