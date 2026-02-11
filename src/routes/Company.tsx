import { Navigation } from '../components/Navigation';
import { Section } from '../components/Section';
import { Footer } from '../components/Footer';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Company() {
  // Initialize scroll animations
  useScrollAnimation();

  return (
    <>
      <Navigation />
      <main>
        {/* Philosophy Section 1: The Price of Intelligence */}
        <Section
          eyebrow="THE PRICE OF INTELLIGENCE"
          heading="The cost of intelligence is collapsing - now we can grow faster than ever."
          paragraphs={[
            "Historically, the only way for a business to access 'intelligence' - its capacity to sense, decide, and act - was to hire more humans. Every marginal unit of intelligence came packaged inside a full-time salary, benefits, and management overhead. But now the price of cognition - the cost of a decision, analysis, or a line of code - is plummeting. Intelligence itself is becoming modular, fluid, and ambient.",
            "Businesses that still scale through hiring for headcount will be outpaced by those that scale through orchestration — assembling human and artificial intelligence in new configurations at near-zero marginal cost.",
          ]}
          ctaButton={{
            text: 'Explore Workshops',
            variant: 'secondary',
          }}
          ctaLink={{
            text: 'Read - The Price of Intelligence',
            href: '#',
          }}
        />

        {/* Philosophy Section 2: The New Operating System */}
        <Section
          eyebrow="THE NEW OPERATING SYSTEM"
          heading="The new operating system for business is built on abundant intelligence."
          paragraphs={[
            "Intelligence used to be scarce. That scarcity shaped how organisations looked. Departments, hierarchies and processes reflected the limitations of human cognition. At its core, a company was a system for distributing human intelligence at scale.",
            "But now intelligence is abundant. The opportunity is to rethink how work happens when analysis, language, and code are instantly available. In this world, the advantage shifts to those who can shape intelligence — human and artificial — into systems that are adaptive, generative, and responsive.",
            "The companies that will thrive are the ones that learn to direct this new energy — where intelligence flows where it's needed most, and smaller teams can achieve what once took entire enterprises.",
          ]}
          ctaButton={{
            text: 'Explore Workshops',
            variant: 'secondary',
          }}
          ctaLink={{
            text: 'Read - Abundant Intelligence',
            href: '#',
          }}
        />

        {/* Philosophy Section 3: How to Take Advantage */}
        <Section
          eyebrow="HOW TO TAKE ADVANTAGE OF THE NEW SYSTEM"
          heading="The organisations that thrive in the age of intelligence will design for flow."
          paragraphs={[
            "Business is moving into a new mode — one where intelligence flows freely. Your advantage comes from how quickly you can turn insight into action, automate the repeatable, and scale what makes you unique.",
            "The result is leverage. Faster innovation, lower operating costs, and a business that grows smarter every time it moves — less like a factory, and more like an organism. As intelligence flows freely across teams, the gap between signal and response closes, giving leaders more visibility, faster feedback, and higher-fidelity information.",
            "Human attention gets reallocated to what can't be automated — creativity, judgement, relationships, and taste. Designing for flow — where intelligence moves freely to create leverage — is what we help businesses do.",
          ]}
          ctaButton={{
            text: 'Explore Workshops',
            variant: 'secondary',
          }}
          ctaLink={{
            text: 'Read - Designing for Flow',
            href: '#',
          }}
        />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
