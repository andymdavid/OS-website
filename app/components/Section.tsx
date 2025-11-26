'use client';

import React from 'react';
import { Button } from './Button';
import './Section.css';

interface SectionProps {
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  ctaButton?: {
    text: string;
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
  };
  ctaLink?: {
    text: string;
    href: string;
  };
  id?: string;
  className?: string;
}

export function Section({
  eyebrow,
  heading,
  paragraphs,
  ctaButton,
  ctaLink,
  id,
  className = '',
}: SectionProps) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="section-container">
        {eyebrow && (
          <h3 className="section-eyebrow fade-in">{eyebrow}</h3>
        )}

        <h2 className="section-heading fade-in fade-in-stagger-1">{heading}</h2>

        <div className="section-content">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`fade-in fade-in-stagger-${index + 2}`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {(ctaButton || ctaLink) && (
          <div className="section-cta fade-in fade-in-stagger-5">
            {ctaButton && (
              <Button
                variant={ctaButton.variant || 'secondary'}
                onClick={ctaButton.onClick}
              >
                {ctaButton.text}
              </Button>
            )}
            {ctaLink && (
              <a href={ctaLink.href} className="link-arrow">
                {ctaLink.text} →
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
