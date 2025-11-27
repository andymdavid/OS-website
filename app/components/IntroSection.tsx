'use client';

import React from 'react';
import './IntroSection.css';

export function IntroSection() {
  return (
    <section className="intro-section">
      <div className="intro-container">
        <div className="intro-pill fade-in">THE PROBLEM</div>

        <h2 className="intro-heading fade-in fade-in-stagger-1">
          There's a lot of confusion around AI. It's hard to know what's real and how it actually fits into your life or business.
        </h2>

        <p className="intro-text fade-in fade-in-stagger-2">
          Many of us still think AI is only for programmers, or just a fancy Google search. We feel like we're not technical enough, or it's too confusing to know where to begin. You're not the only one, most people are trying to make sense of this too.
        </p>

        <p className="intro-text fade-in fade-in-stagger-3">
          We get asked a lot about how to get started with AI and how to make it useful inside small and medium sized businesses. The advice we keep coming back to is simple: just start building.
        </p>

        <p className="intro-text intro-text-emphasis fade-in fade-in-stagger-4">
          That's why we've created a learning journey designed for SME leaders.
        </p>
      </div>
    </section>
  );
}
