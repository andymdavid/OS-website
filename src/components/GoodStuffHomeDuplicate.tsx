import React from 'react';
import { EmailCaptureForm } from './EmailCaptureForm';
import './GoodStuff.css';

export function GoodStuffHomeDuplicate() {
  return (
    <section id="media" className="section good-stuff-section">
      <div className="good-stuff-top">
        <div className="good-stuff-pill fade-in">INTELLIGENCE SNACKS</div>
        <h2 className="good-stuff-heading fade-in fade-in-stagger-1">
          Big Ideas Compound.
        </h2>

        <p className="good-stuff-subpara fade-in fade-in-stagger-2">
          For people building and running modern businesses, Intelligence Snacks
          helps you quickly digest the big ideas emerging from the world of AI,
          delivered to your inbox each week.
        </p>

        <div className="good-stuff-cta fade-in fade-in-stagger-3">
          <EmailCaptureForm
            variant="inline"
            placeholder="Enter your email"
            buttonText="Send me snacks"
          />
        </div>
      </div>
    </section>
  );
}
