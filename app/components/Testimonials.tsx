'use client';

import React, { useState } from 'react';
import './Testimonials.css';

interface Testimonial {
  name: string;
  title: string;
  company: string;
  video: string; // Video URL
  image: string; // Fallback image
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials: Testimonial[] = [
    {
      name: 'Amelia Brynn',
      title: 'Strategy Lead',
      company: 'Forerunner',
      video: '/Hero-Background.png', // Placeholder - replace with actual video
      image: 'https://placehold.co/400x600/2a2a2a/F0F0F0?text=AB',
    },
    {
      name: 'John Smith',
      title: 'CEO',
      company: 'TechCorp',
      video: '/Hero-Background.png', // Placeholder - replace with actual video
      image: 'https://placehold.co/400x600/2a2a2a/F0F0F0?text=JS',
    },
    {
      name: 'Sarah Johnson',
      title: 'Director',
      company: 'InnovateLabs',
      video: '/Hero-Background.png', // Placeholder - replace with actual video
      image: 'https://placehold.co/400x600/2a2a2a/F0F0F0?text=SJ',
    },
    {
      name: 'Michael Chen',
      title: 'Founder',
      company: 'StartupCo',
      video: '/Hero-Background.png', // Placeholder - replace with actual video
      image: 'https://placehold.co/400x600/2a2a2a/F0F0F0?text=MC',
    },
    {
      name: 'Emma Wilson',
      title: 'VP Operations',
      company: 'GrowthHub',
      video: '/Hero-Background.png', // Placeholder - replace with actual video
      image: 'https://placehold.co/400x600/2a2a2a/F0F0F0?text=EW',
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play functionality
  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  // Calculate which testimonials to show
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + testimonials.length) % testimonials.length;
      visible.push({ ...testimonials[index], offset: i });
    }
    return visible;
  };

  return (
    <section className="section testimonials-section">
      <div className="section-container-wide">
        <div className="testimonials-pill fade-in">TESTIMONIALS</div>

        <h2 className="section-heading fade-in fade-in-stagger-1">
          We've helped teams rethink their offers, their structure, and their story.
        </h2>

        <div
          className="testimonials-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            className="carousel-nav carousel-nav-prev"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="testimonials-track">
            {getVisibleTestimonials().map((testimonial, idx) => (
              <div
                key={`${testimonial.name}-${idx}`}
                className={`testimonial-card ${
                  testimonial.offset === 0 ? 'active' : ''
                }`}
                style={{
                  transform: `translateX(${testimonial.offset * 320}px)`,
                }}
              >
                <div className="testimonial-video">
                  <img src={testimonial.image} alt={testimonial.name} />
                  {testimonial.offset === 0 && (
                    <div className="testimonial-label">CUSTOMER STORY</div>
                  )}
                </div>
                <div className="testimonial-info">
                  <div className="testimonial-name">{testimonial.name}</div>
                  <div className="testimonial-title">
                    {testimonial.title} at {testimonial.company}
                  </div>
                  {testimonial.offset === 0 && (
                    <button className="testimonial-play">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 3l14 9-14 9V3z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-nav carousel-nav-next"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
