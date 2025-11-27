'use client';

import React from 'react';
import './Testimonials.css';

type TestimonialKind = 'video' | 'quote';

interface Testimonial {
  type: TestimonialKind;
  name: string;
  title: string;
  company: string;
  quote?: string;
  tag?: string;
  image: string;
  avatar?: string;
}

export function Testimonials() {

  const testimonials: Testimonial[] = [
    {
      type: 'video',
      name: 'Amelia Brynn',
      title: 'Strategy Lead',
      company: 'Forerunner',
      tag: 'Customer Story',
      image: '/Hero-Background.png',
    },
    {
      type: 'quote',
      name: 'Marcus Leigh',
      title: 'Founder',
      company: 'Evermind',
      quote:
        "They didn't just clarify our messaging — they clarified our business. Our onboarding, pricing, and content all finally speak the same language.",
      image: '/Hero-Background.png',
      avatar: 'https://placehold.co/160x160/1e1e1e/f7f7f7?text=ML',
    },
    {
      type: 'quote',
      name: 'Sarah Johnson',
      title: 'Director',
      company: 'InnovateLabs',
      quote:
        'Working with Other Stuff felt less like hiring a consultancy and more like gaining a thought partner. They helped us redefine our entire service flow — and say less while meaning more.',
      image: '/Hero-Background.png',
      avatar: 'https://placehold.co/160x160/111111/f0f0f0?text=SJ',
    },
    {
      type: 'video',
      name: 'Michael Chen',
      title: 'Founder',
      company: 'StartupCo',
      tag: 'In Their Words',
      image: '/Hero-Background.png',
    },
    {
      type: 'quote',
      name: 'Emma Wilson',
      title: 'VP Operations',
      company: 'GrowthHub',
      quote:
        'We learned faster in one week with their team than an entire quarter of internal experimentation. Everything we shipped together made it into production.',
      image: '/Hero-Background.png',
      avatar: 'https://placehold.co/160x160/2b2b2b/ededed?text=EW',
    },
  ];

  const LOOP_COUNT = 4;
  const extendedTestimonials = Array.from({ length: LOOP_COUNT }).flatMap(() => testimonials);

  return (
    <section className="section testimonials-section">
      <div className="section-container-wide">
        <div className="testimonials-pill fade-in">TESTIMONIALS</div>

        <h2 className="section-heading fade-in fade-in-stagger-1">
          Small businesses who learn to build with us end up using AI in
          practical, meaningful ways inside their business.
        </h2>
        <p className="testimonials-intro fade-in fade-in-stagger-2">
          Teams who’ve learned to build with us are already using AI to streamline
          work, improve flow, and create tools they never thought possible.
        </p>

        <div className="testimonials-carousel">
          <div className="testimonials-window">
            <div className="testimonials-track">
              {extendedTestimonials.map((testimonial, idx) => (
                <div
                  key={`${testimonial.name}-${idx}`}
                  className={`testimonial-card testimonial-card-${testimonial.type}`}
                >
                  {testimonial.type === 'video' ? (
                    <div className="testimonial-media-card">
                      <img src={testimonial.image} alt={testimonial.name} />
                      <div className="testimonial-label">
                        {testimonial.tag || 'Customer Story'}
                      </div>
                      <div className="testimonial-media-meta">
                        <div>
                          <div className="testimonial-name">{testimonial.name}</div>
                          <div className="testimonial-title">
                            {testimonial.title} at {testimonial.company}
                          </div>
                        </div>
                        <button className="testimonial-play" aria-label="Play story">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M5 3l14 9-14 9V3z" fill="currentColor" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="testimonial-quote-card">
                      <p className="testimonial-quote">“{testimonial.quote}”</p>
                      <div className="testimonial-author">
                        <div>
                          <div className="testimonial-name">{testimonial.name}</div>
                          <div className="testimonial-title">
                            {testimonial.title} at {testimonial.company}
                          </div>
                        </div>
                        {testimonial.avatar && (
                          <img
                            className="testimonial-avatar"
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
