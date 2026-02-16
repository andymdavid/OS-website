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

const THEME_TOKENS: {
  panel: string;
  panelText: string;
  panelMuted: string;
  panelBorder: string;
  railDivider: string;
  stageBorder: string;
  accent: string;
  accentSoft: string;
} = {
  panel: "#141312",
  panelText: "#f6f2ef",
  panelMuted: "rgba(246, 242, 239, 0.65)",
  panelBorder: "rgba(255, 255, 255, 0.06)",
  railDivider: "rgba(255, 255, 255, 0.08)",
  stageBorder: "rgba(255, 255, 255, 0.08)",
  accent: "#a1ff62",
  accentSoft: "rgba(161, 255, 98, 0.16)",
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
  const [progress, setProgress] = useState(0);
  const pauseUntilRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);
  const elapsedRef = useRef<number>(0);
  const [isListHovering, setIsListHovering] = useState(false);
  const stepsCount = steps.length;

  const activeStep = steps[activeStepIndex] ?? steps[0];
  const tokens = THEME_TOKENS;

  useEffect(() => {
    if (stepsCount <= 1) {
      setProgress(0);
      return;
    }

    const duration = 6500;
    if (elapsedRef.current === 0) {
      setProgress(0);
    }
    lastTickRef.current = null;

    const tick = (time: number) => {
      if (lastTickRef.current === null) {
        lastTickRef.current = time;
      }

      if (isListHovering || Date.now() < pauseUntilRef.current) {
        lastTickRef.current = time;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const delta = time - (lastTickRef.current ?? time);
      lastTickRef.current = time;
      elapsedRef.current = Math.min(duration, elapsedRef.current + delta);
      const nextProgress = Math.min(1, elapsedRef.current / duration);
      setProgress(nextProgress);

      if (nextProgress >= 1) {
        elapsedRef.current = 0;
        lastTickRef.current = null;
        setProgress(0);
        setActiveStepIndex((prev) => (prev + 1) % stepsCount);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [activeStepIndex, isListHovering, stepsCount]);

  useEffect(() => {
    if (!isListHovering) {
      return;
    }

    elapsedRef.current = progress * 6500;
    lastTickRef.current = null;
  }, [isListHovering, progress]);

  const handleStepClick = (index: number) => {
    setActiveStepIndex(index);
    pauseUntilRef.current = Date.now() + 10000;
    setProgress(0);
  };

  const panelShadow = useMemo(
    () => "0 30px 70px rgba(10, 10, 10, 0.45)",
    []
  );

  return (
    <Section id={id} className="flex items-end">
      <Container className="max-w-none">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            style={{
              backgroundColor: "#2a2a2a",
              color: tokens.panelText,
              border: `1px solid ${tokens.panelBorder}`,
              boxShadow: panelShadow,
              padding: "1.25rem",
              borderRadius: "1rem",
              height: "calc(100vh - 90px)",
              width: "100%",
            }}
          >
            <div
              className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] items-stretch h-full"
            >
              <div
                style={{ width: "320px", minHeight: 0, paddingTop: "1.5rem" }}
                className="h-full flex flex-col"
              >
                <div>
                  <div style={{ fontFamily: "'Figtree', sans-serif", fontSize: "34px", lineHeight: "1.15" }}>
                    {title}
                  </div>
                  <p className="text-sm mt-4" style={{ color: tokens.panelMuted }}>
                    {body}
                  </p>
                  <div className="mt-6">
                    <Button
                      size="lg"
                      asChild
                      className="group"
                      style={{
                        backgroundColor: "#f9f7f6",
                        color: "#201d1d",
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <a
                        href={ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ backgroundColor: "#f9f7f6", color: "#201d1d" }}
                        onMouseEnter={(event) => {
                          event.currentTarget.style.backgroundColor = "#eee9e6";
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.backgroundColor = "#f9f7f6";
                        }}
                      >
                        {ctaLabel}
                      </a>
                    </Button>
                  </div>
                </div>

                <div
                  className="mt-10"
                  style={{ marginTop: "auto" }}
                  onMouseEnter={() => setIsListHovering(true)}
                  onMouseLeave={() => setIsListHovering(false)}
                >
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
                          color: isActive ? tokens.panelText : tokens.panelMuted,
                        }}
                      >
                        <div className="relative" style={{ paddingTop: "0.85rem" }}>
                          <div
                            aria-hidden="true"
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              height: "1px",
                              backgroundColor: tokens.railDivider,
                            }}
                          />
                          <div
                            aria-hidden="true"
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              height: "1px",
                              width: isActive ? `${Math.round(progress * 100)}%` : "0%",
                              backgroundColor: tokens.panelText,
                              transition: "width 0.4s ease",
                            }}
                          />
                          <div>
                            <div className="text-sm font-semibold">{step.label}</div>
                            {isActive && step.body ? (
                              <div className="mt-2 text-xs" style={{ color: tokens.panelMuted }}>
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

              <div className="w-full h-full flex" style={{ minHeight: 0 }}>
                <div
                  className="overflow-hidden"
                  style={{
                    boxShadow: "0 26px 70px rgba(5, 5, 5, 0.55)",
                    height: "100%",
                    width: "100%",
                    borderRadius: "0.8rem",
                  }}
                >
                  <div style={{ height: "100%" }}>
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
