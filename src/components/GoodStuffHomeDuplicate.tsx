import React from 'react';
import { EmailCaptureForm } from './EmailCaptureForm';
import './GoodStuff.css';

export function GoodStuffHomeDuplicate() {
  return (
    <section id="media" className="section good-stuff-section">
      <div className="good-stuff-top">
        <div className="good-stuff-pill fade-in">THE GOOD STUFF</div>
        <h2 className="good-stuff-heading fade-in fade-in-stagger-1">
          Want to understand how we think about AI? Start here.
        </h2>

        <p className="good-stuff-subpara fade-in fade-in-stagger-2">
          The Good Stuff is our podcast where we dig into how AI is actually
          changing the way SMEs work, what&apos;s practical, and
          how we approach the problems we solve.
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
