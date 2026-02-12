
import { Section } from "@/levelup/components/layout/section";
import { Container } from "@/levelup/components/layout/container";
import { Button } from "@/levelup/components/ui/button";
import { Badge } from "@/levelup/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  ctaPrimary:
    | string
    | {
        label: string;
        href: string;
      };
  socialProof?: string;
  socialProofLogo?: string;
  socialProofLink?: {
    text: string;
    href: string;
  };
  onGetStarted?: () => void;
}

export function Hero({
  badge,
  title,
  subtitle,
  ctaPrimary,
  socialProof,
  socialProofLogo,
  socialProofLink,
  onGetStarted,
}: HeroProps) {
  // Normalize CTA props to objects
  const primaryCta =
    typeof ctaPrimary === "string"
      ? { label: ctaPrimary, href: "#pricing" }
      : ctaPrimary;

  return (
    <Section className="!py-0 min-h-screen flex items-center justify-center">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-6 max-w-5xl mx-auto"
          style={{ marginTop: "-22vh" }}
        >
          {/* Optional Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Badge
                variant="secondary"
                className="inline-flex items-center gap-1 px-3 py-1 text-lg font-jersey"
              >
                {badge}
              </Badge>
            </motion.div>
          )}

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-anton text-4xl tracking-tight leading-tight sm:text-5xl md:text-6xl uppercase"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base text-[#201d1d]"
            style={{ maxWidth: "50.4rem" }}
          >
            {subtitle}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {onGetStarted ? (
              <Button
                size="lg"
                className="group hover:bg-[#a1ff62] hover:text-black"
                onClick={onGetStarted}
                type="button"
              >
                {primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <Button size="lg" asChild className="group hover:bg-[#a1ff62] hover:text-black">
                <a href={primaryCta.href} target="_blank" rel="noopener noreferrer">
                  {primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            )}
          </motion.div>

          {/* Social Proof */}
          {socialProof && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-full flex justify-center sm:w-auto sm:justify-start"
            >
              <div className="inline-grid grid-cols-[24px_minmax(0,220px)_24px] items-center gap-2 sm:flex sm:items-center sm:gap-2">
                {socialProofLogo ? (
                  <a
                    href="https://otherstuff.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-6 h-6 sm:w-5 sm:h-5 rounded border-[0.1px] border-neutral-700 bg-neutral-900 overflow-hidden flex items-center justify-center p-[1px]"
                    aria-label="Other Stuff"
                  >
                    <img
                      src={socialProofLogo}
                      alt="Logo"
                      width={20}
                      height={20}
                      className="object-contain rounded-[3px]"
                      loading="lazy"
                    />
                  </a>
                ) : (
                  <span className="w-6 h-6 sm:hidden" aria-hidden="true" />
                )}
                <p className="text-xs text-muted-foreground text-center sm:text-left sm:max-w-none">
                  {socialProofLink && socialProof
                    ? socialProof.split(socialProofLink.text).map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <a
                              href={socialProofLink.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline decoration-neutral-400/50 hover:decoration-neutral-400/70 transition-all"
                            >
                              {socialProofLink.text}
                            </a>
                          )}
                        </span>
                      ))
                    : socialProof}
                </p>
                <span className="w-6 h-6 sm:hidden" aria-hidden="true" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
