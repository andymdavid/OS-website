import { SectionKey, SectionConfig } from "@/levelup/content/site";
import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { TwoColumn } from "./two-column";
import { FeaturePanel } from "./feature-panel";
import { ArcCarousel } from "./arc-carousel";
import { Logos } from "./logos";
import { Benefits } from "./benefits";
import { HowItWorks } from "./how-it-works";
import { Pricing } from "./pricing";
import { Testimonials } from "./testimonials";
import { Faq } from "./faq";
import { FinalCta } from "./final-cta";
import { Footer } from "./footer";
import { AnimatedShowcaseCards } from "@/speedrun/components/animated-showcase-cards";

// Map section keys to their components
const sectionComponents: Record<SectionKey, React.ComponentType<any>> = {
  navbar: Navbar,
  hero: Hero,
  twoColumn: TwoColumn,
  featurePanel: FeaturePanel,
  arcCarousel: ArcCarousel,
  logos: Logos,
  benefits: Benefits,
  howItWorks: HowItWorks,
  pricing: Pricing,
  testimonials: Testimonials,
  faq: Faq,
  finalCta: FinalCta,
  footer: Footer,
  showcaseCards: AnimatedShowcaseCards,
};

interface SectionRendererProps {
  sections: SectionConfig[];
  onGetStarted?: () => void;
}

export function SectionRenderer({ sections, onGetStarted }: SectionRendererProps) {
  return (
    <>
      {sections.map((section, index) => {
        // Skip disabled sections
        if (!section.enabled) {
          return null;
        }

        // Get the component for this section key
        const Component = sectionComponents[section.key];

        // Fallback for unknown section keys (dev warning)
        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            return (
              <div
                key={`${section.key}-${index}`}
                className="p-4 border border-red-500 bg-red-50 text-red-900"
              >
                <strong>Unknown section key:</strong> {section.key}
              </div>
            );
          }
          return null;
        }

        // Render the section with its props
        const baseProps = { ...section.props, id: section.id };

        if (section.key === "hero" || section.key === "finalCta") {
          return (
            <Component
              key={`${section.key}-${index}`}
              {...baseProps}
              onGetStarted={onGetStarted}
            />
          );
        }

        return <Component key={`${section.key}-${index}`} {...baseProps} />;
      })}
    </>
  );
}
