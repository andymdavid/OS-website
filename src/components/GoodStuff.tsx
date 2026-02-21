
import React from 'react';
import { EmailCaptureForm } from './EmailCaptureForm';
import './GoodStuff.css';

export function GoodStuff() {
  return (
    <section id="media" className="section good-stuff-section">
      <div className="good-stuff-top">
        <div className="good-stuff-pill fade-in">THE GOOD STUFF</div>
        <h2 className="good-stuff-heading fade-in fade-in-stagger-1">
          The Good Stuff is where we dig into how AI is changing the way we work,
          build businesses, and shape the broader economy.
        </h2>

        <p className="good-stuff-subpara fade-in fade-in-stagger-2">
          We publish essays, stories, and conversations about the way humans and
          AI work together — and what that means for small businesses. If you
          want to understand how we think, this is the best place to start.
        </p>

        <div className="good-stuff-cta fade-in fade-in-stagger-3">
          <EmailCaptureForm
            variant="inline"
            placeholder="Enter your email"
            buttonText="Join the Good Stuff"
          />
        </div>
      </div>
    </section>
  );
}
