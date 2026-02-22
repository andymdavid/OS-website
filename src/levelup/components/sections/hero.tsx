
import { Section } from "@/levelup/components/layout/section";
import { Container } from "@/levelup/components/layout/container";
import { Button } from "@/levelup/components/ui/button";
import { Badge } from "@/levelup/components/ui/badge";
import { Button as OsButton } from "@/components/Button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "@/components/Hero.css";

interface HeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  subtitleMaxWidth?: string;
  centerContent?: boolean;
  variant?: "default" | "homeStyle";
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
  subtitleMaxWidth = "50.4rem",
  centerContent = false,
  variant = "default",
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
          className={`flex flex-col items-center text-center max-w-5xl mx-auto ${
            variant === "homeStyle" ? "speedrun-hero-stack" : "space-y-6"
          }`}
          style={centerContent ? undefined : { marginTop: "-22vh" }}
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
                className="inline-flex items-center gap-1 px-3 py-1 text-lg font-jersey bg-background"
              >
                {badge}
              </Badge>
            </motion.div>
          )}

          {/* Headline */}
          {variant === "homeStyle" ? (
            <div className="hero-title-block speedrun-hero-title-block">
              <h1>
                {title.split("\n").map((line, index) => (
                  <span key={index} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="speedrun-hero-subtitle"
                style={{ maxWidth: subtitleMaxWidth }}
              >
                {subtitle}
              </motion.p>
              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="speedrun-hero-cta"
              >
                {onGetStarted ? (
                  <OsButton
                    variant="primary"
                    onClick={onGetStarted}
                    type="button"
                  >
                    {primaryCta.label}
                  </OsButton>
                ) : (
                  <OsButton
                    variant="primary"
                    onClick={() => {
                      window.location.href = primaryCta.href;
                    }}
                    type="button"
                  >
                    {primaryCta.label}
                  </OsButton>
                )}
              </motion.div>
            </div>
          ) : (
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-anton tracking-tight leading-tight uppercase"
            >
              {title.split("\n").map((line, index) => {
                const isPrimary = index === 0;
                return (
                  <span
                    key={index}
                    className={`block ${
                      isPrimary
                        ? "text-5xl sm:text-6xl md:text-7xl"
                        : "text-4xl sm:text-5xl md:text-6xl"
                    }`}
                  >
                    {line}
                  </span>
                );
              })}
            </motion.h1>
          )}

          {/* Subtitle */}
          {variant !== "homeStyle" && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base text-[#201d1d]"
              style={{ maxWidth: subtitleMaxWidth }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTA */}
          {variant !== "homeStyle" && (
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
          )}

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
