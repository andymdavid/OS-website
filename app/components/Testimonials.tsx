'use client';

import React from 'react';
import './Testimonials.css';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  image: string;
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote:
        "Working with Other Stuff felt less like hiring a consultancy and more like gaining a thought partner. They helped us redefine our entire service flow.",
      author: 'Jane Smith',
      title: 'CEO, TechCorp',
      image: 'https://placehold.co/96x96/2a2a2a/F0F0F0?text=JS',
    },
    {
      quote:
        "They didn't just clarify our messaging — they clarified our business. Our onboarding, pricing, and content all finally speak the same language.",
      author: 'John Doe',
      title: 'Founder, StartupCo',
      image: 'https://placehold.co/96x96/2a2a2a/F0F0F0?text=JD',
    },
    {
      quote:
        "The frameworks they provided helped us align what we do with how it's understood. Game-changing clarity.",
      author: 'Sarah Johnson',
      title: 'Director, InnovateLabs',
      image: 'https://placehold.co/96x96/2a2a2a/F0F0F0?text=SJ',
    },
  ];

  return (
    <section className="section testimonials-section">
      <div className="section-container-wide">
        <h3 className="section-eyebrow fade-in">TESTIMONIALS</h3>
        <h2 className="section-heading fade-in fade-in-stagger-1">
          What our clients say
        </h2>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card fade-in fade-in-stagger-${index + 2}`}
            >
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-author">
                <img src={testimonial.image} alt={testimonial.author} />
                <div>
                  <div className="author-name">{testimonial.author}</div>
                  <div className="author-title">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
