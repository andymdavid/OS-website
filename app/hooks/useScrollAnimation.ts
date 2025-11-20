'use client';

import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    // Intersection Observer options
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px', // Trigger before element fully in view
      threshold: 0.1,
    };

    // Callback for when elements enter viewport
    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: stop observing after animation
          // fadeInObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with .fade-in class
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach((el) => {
      fadeInObserver.observe(el);
    });

    // Cleanup
    return () => {
      fadeInElements.forEach((el) => {
        fadeInObserver.unobserve(el);
      });
    };
  }, []);
}
