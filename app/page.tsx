'use client';

import { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { FunnelSection } from './components/FunnelSection';
import { Testimonials } from './components/Testimonials';
import { GoodStuff } from './components/GoodStuff';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { useScrollAnimation } from './hooks/useScrollAnimation';

export default function Home() {
  // Initialize scroll animations
  useScrollAnimation();

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Funnel Section: How We Can Help */}
        <FunnelSection />

        {/* Testimonials Section */}
        <Testimonials />

        {/* The Good Stuff Section */}
        <GoodStuff />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
