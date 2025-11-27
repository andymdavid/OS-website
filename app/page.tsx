'use client';

import { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { IntroSection } from './components/IntroSection';
import { Section } from './components/Section';
import { FunnelSection } from './components/FunnelSection';
import { FollowUpSection } from './components/FollowUpSection';
import { WingmanSection } from './components/WingmanSection';
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

        {/* Intro Section: The Problem */}
        <IntroSection />

        {/* Funnel Section: How We Can Help */}
        <FunnelSection />

        {/* Follow Up Section (mirrors The Problem) */}
        <FollowUpSection />

        {/* Follow-up Problem Section */}
        <WingmanSection />

        {/* Testimonials Section - Hidden until testimonials are available */}
        {/* Uncomment the line below when you're ready to show testimonials */}
        {/* <Testimonials /> */}

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
