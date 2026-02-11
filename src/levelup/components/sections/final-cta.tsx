import { Section } from "@/levelup/components/layout/section";
import { Container } from "@/levelup/components/layout/container";
import { Button } from "@/levelup/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FinalCtaProps {
  title: string;
  subtitle?: string;
  ctaPrimary: string;
  ctaSecondary: string;
  onGetStarted?: () => void;
}

export function FinalCta({
  title,
  ctaPrimary,
  onGetStarted,
}: FinalCtaProps) {
  const titleParts = title.split(" bringing ");
  const lineOne = titleParts.length > 1 ? `${titleParts[0]} bringing` : title;
  const lineTwo = titleParts.length > 1 ? titleParts.slice(1).join(" bringing ") : "";

  return (
    <Section className="bg-[#2a2a2a] py-20 sm:py-28 md:py-36 relative overflow-hidden">
      <Container>
        <div className="text-center space-y-8">
          <h2 className="max-w-3xl mx-auto font-anton text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase font-bold tracking-tight leading-tight text-white">
            <span className="block">{lineOne}</span>
            {lineTwo ? <span className="block">{lineTwo}</span> : null}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Button
              size="lg"
              className="group bg-[#a1ff62] text-black hover:bg-[#201d1d] hover:text-white"
              onClick={onGetStarted}
              type="button"
            >
              {ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </Container>

      {/* Spinning Badge */}
      <div className="absolute right-4 sm:right-8 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 hidden sm:block">
        <a
          href="https://otherstuff.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          aria-label="Other Stuff"
        >
          <div className="relative w-24 h-24 md:w-32 md:h-32">
          <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
            <defs>
              <path
                id="circlePath"
                d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <circle cx="50" cy="50" r="48" fill="#f5c6e8" />
            <text className="text-[8px] md:text-[9px] font-bold fill-[#201d1d] uppercase tracking-wider">
              <textPath href="#circlePath" startOffset="0%">
                BUILD THINGS • TEST IDEAS • SEE RESULTS •
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/OS-logo-icon-black.png"
              alt="Other Stuff logo"
              width={28}
              height={28}
              className="h-7 w-7 md:h-8 md:w-8"
              loading="lazy"
            />
          </div>
        </div>
        </a>
      </div>
    </Section>
  );
}
