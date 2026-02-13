import { useEffect, useMemo, useRef, useState } from "react";
import { Section } from "@/levelup/components/layout/section";
import { Container } from "@/levelup/components/layout/container";
import { Button } from "@/levelup/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

interface FeaturePanelStep {
  label: string;
  body?: string;
  imageSrc: string;
  imageAlt?: string;
}

interface FeaturePanelProps {
  id?: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  steps: FeaturePanelStep[];
}

type PanelTheme = "dark" | "light";

const THEME_TOKENS: Record<PanelTheme, {
  panel: string;
  panelText: string;
  panelMuted: string;
  panelBorder: string;
  railDivider: string;
  stageBorder: string;
  accent: string;
  accentSoft: string;
}> = {
  dark: {
    panel: "#141312",
    panelText: "#f6f2ef",
    panelMuted: "rgba(246, 242, 239, 0.65)",
    panelBorder: "rgba(255, 255, 255, 0.06)",
    railDivider: "rgba(255, 255, 255, 0.08)",
    stageBorder: "rgba(255, 255, 255, 0.08)",
    accent: "#a1ff62",
    accentSoft: "rgba(161, 255, 98, 0.16)",
  },
  light: {
    panel: "#ffffff",
    panelText: "#201d1d",
    panelMuted: "rgba(32, 29, 29, 0.65)",
    panelBorder: "rgba(32, 29, 29, 0.08)",
    railDivider: "rgba(32, 29, 29, 0.1)",
    stageBorder: "rgba(32, 29, 29, 0.08)",
    accent: "#a1ff62",
    accentSoft: "rgba(161, 255, 98, 0.2)",
  },
};

export function FeaturePanel({
  id,
  title,
  body,
  ctaLabel,
  ctaHref,
  steps,
}: FeaturePanelProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [theme, setTheme] = useState<PanelTheme>("dark");
  const [isHovering, setIsHovering] = useState(false);
  const pauseUntilRef = useRef<number>(0);
  const stepsCount = steps.length;

  const activeStep = steps[activeStepIndex] ?? steps[0];
  const tokens = THEME_TOKENS[theme];

  useEffect(() => {
    if (stepsCount <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (isHovering || Date.now() < pauseUntilRef.current) {
        return;
      }

      setActiveStepIndex((prev) => (prev + 1) % stepsCount);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isHovering, stepsCount]);

  const handleStepClick = (index: number) => {
    setActiveStepIndex(index);
    pauseUntilRef.current = Date.now() + 10000;
  };

  const panelShadow = useMemo(
    () => (theme === "dark"
      ? "0 30px 70px rgba(10, 10, 10, 0.45)"
      : "0 22px 60px rgba(20, 20, 20, 0.18)"),
    [theme]
  );

  return (
    <Section id={id} className="min-h-screen flex items-center">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="rounded-3xl"
            style={{
              backgroundColor: tokens.panel,
              color: tokens.panelText,
              border: `1px solid ${tokens.panelBorder}`,
              boxShadow: panelShadow,
              padding: "2.5rem",
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="flex items-center justify-between">
              <div className="font-anton text-xl uppercase">{title}</div>
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-xs uppercase tracking-[0.16em]"
                style={{
                  color: tokens.panelMuted,
                  border: `1px solid ${tokens.panelBorder}`,
                  padding: "0.5rem 0.9rem",
                  borderRadius: "999px",
                }}
              >
                {theme === "dark" ? "Light Panel" : "Dark Panel"}
              </button>
            </div>

            <div
              className="mt-8 grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]"
            >
              <div style={{ width: "320px" }}>
                <p className="text-sm" style={{ color: tokens.panelMuted }}>
                  {body}
                </p>
                <div className="mt-6">
                  <Button size="lg" asChild className="group">
                    <a href={ctaHref} target="_blank" rel="noopener noreferrer">
                      {ctaLabel}
                    </a>
                  </Button>
                </div>

                <div className="mt-10">
                  {steps.map((step, index) => {
                    const isActive = index === activeStepIndex;
                    return (
                      <button
                        key={`${step.label}-${index}`}
                        type="button"
                        onClick={() => handleStepClick(index)}
                        className="w-full text-left"
                        style={{
                          padding: "1rem 0",
                          borderTop: `1px solid ${tokens.railDivider}`,
                          color: isActive ? tokens.panelText : tokens.panelMuted,
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            style={{
                              height: "10px",
                              width: "10px",
                              borderRadius: "999px",
                              marginTop: "0.4rem",
                              backgroundColor: isActive ? tokens.accent : "transparent",
                              border: `1px solid ${isActive ? tokens.accent : tokens.railDivider}`,
                            }}
                          />
                          <div>
                            <div className="text-sm font-semibold">{step.label}</div>
                            {step.body ? (
                              <div className="mt-2 text-sm" style={{ color: tokens.panelMuted }}>
                                {step.body}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="w-full">
                <div
                  className="rounded-3xl overflow-hidden"
                  style={{
                    border: `1px solid ${tokens.stageBorder}`,
                    backgroundColor: tokens.accentSoft,
                    boxShadow: theme === "dark"
                      ? "0 26px 70px rgba(5, 5, 5, 0.55)"
                      : "0 24px 60px rgba(20, 20, 20, 0.2)",
                  }}
                >
                  <div style={{ aspectRatio: "16 / 10" }}>
                    <AnimatePresence mode="wait">
                      {activeStep ? (
                        <motion.img
                          key={activeStep.imageSrc}
                          src={activeStep.imageSrc}
                          alt={activeStep.imageAlt || activeStep.label}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                        />
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
