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
  sectionTitle?: string;
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
  sectionTitle,
  body,
  ctaLabel,
  ctaHref,
  steps,
}: FeaturePanelProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const pauseUntilRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const progressRef = useRef<number>(0);
  const pausedAtRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);
  const [isListHovering, setIsListHovering] = useState(false);
  const stepsCount = steps.length;

  const activeStep = steps[activeStepIndex] ?? steps[0];
  const tokens = THEME_TOKENS;

  // Keep ref in sync with state
  useEffect(() => {
    isHoveringRef.current = isListHovering;
  }, [isListHovering]);

  useEffect(() => {
    if (stepsCount <= 1) {
      setProgress(0);
      return;
    }

    const duration = 6500;
    let startTime: number | null = null;
    let initialProgress = progressRef.current;

    const tick = (time: number) => {
      const isPaused = isHoveringRef.current || Date.now() < pauseUntilRef.current;

      // If paused, record where we paused and wait
      if (isPaused) {
        if (pausedAtRef.current === null) {
          pausedAtRef.current = progressRef.current;
        }
        startTime = null;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // If resuming from pause, start from where we left off
      if (pausedAtRef.current !== null) {
        initialProgress = pausedAtRef.current;
        pausedAtRef.current = null;
        startTime = null;
      }

      // Initialize start time
      if (startTime === null) {
        startTime = time;
      }

      const elapsed = time - startTime;
      const nextProgress = Math.min(1, initialProgress + (elapsed / duration));
      progressRef.current = nextProgress;
      setProgress(nextProgress);

      if (nextProgress >= 1) {
        progressRef.current = 0;
        initialProgress = 0;
        startTime = null;
        setProgress(0);
        setActiveStepIndex((prev) => (prev + 1) % stepsCount);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [activeStepIndex, stepsCount]);

  const handleStepClick = (index: number) => {
    setActiveStepIndex(index);
    pauseUntilRef.current = Date.now() + 4000;
    setProgress(0);
    progressRef.current = 0;
    pausedAtRef.current = null;
  };

  const panelShadow = useMemo(
    () => "0 30px 70px rgba(10, 10, 10, 0.45)",
    []
  );

  return (
    <Section id={id}>
      <Container className="!max-w-[1400px] !px-6">
        {/* Section Header (above modal) */}
        {sectionTitle && (
          <div
            style={{
              textAlign: "center",
              maxWidth: "700px",
              margin: "0 auto 48px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "40px",
                lineHeight: "1.1",
                color: "#201d1d",
              }}
            >
              {sectionTitle}
            </h2>
          </div>
        )}
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
              borderRadius: "var(--feature-panel-radius, 1rem)",
              width: "100%",
            }}
          >
            <div
              className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]"
            >
              <div
                style={{ width: "320px", paddingTop: "1.5rem" }}
                className="flex flex-col h-full"
              >
                <div>
                  <p className="text-sm" style={{ color: tokens.panelMuted, lineHeight: "1.6" }}>
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
                          padding: isActive ? "0.75rem 0" : "0.5rem 0",
                          color: isActive ? tokens.panelText : tokens.panelMuted,
                        }}
                      >
                        <div className="relative" style={{ paddingTop: "0.5rem" }}>
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
                              width: isActive ? `${progress * 100}%` : "0%",
                              backgroundColor: tokens.panelText,
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

              <div className="w-full flex">
                <div
                  className="overflow-hidden w-full"
                  style={{
                    boxShadow: "0 26px 70px rgba(5, 5, 5, 0.55)",
                    borderRadius: "0.8rem",
                    aspectRatio: "16 / 10",
                  }}
                >
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
        </motion.div>
      </Container>
    </Section>
  );
}
