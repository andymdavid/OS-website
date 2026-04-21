import React from 'react';
import { CTAHomeDuplicate } from './CTAHomeDuplicate';

interface CTASectionProps {
  pillLabel?: string;
  heading?: string;
  intro?: string;
  buttonLabel?: string;
  className?: string;
}

export function CTASection({
  pillLabel = 'Get Started',
  heading = "Let's talk about what's slowing your business down.",
  intro = "Book a free intro call. We'll look at where time is going and whether a custom AI system makes sense for your business.",
  buttonLabel = 'Book a Free AI Audit',
  className,
}: CTASectionProps) {
  return (
    <CTAHomeDuplicate
      pillLabel={pillLabel}
      heading={heading}
      intro={intro}
      buttonLabel={buttonLabel}
      className={className}
    />
  );
}
