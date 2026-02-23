import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "./animated-showcase-cards.css";

interface ShowcaseCard {
  id: string;
  title: string;
  label?: string;
  emphasis?: boolean;
  metaTags?: string[];
  description: string;
  cta?: {
    label: string;
    href: string;
  };
  secondaryNote?: string;
}

interface AnimatedShowcaseCardsProps {
  title: string;
  body: string;
  cards: ShowcaseCard[];
  defaultActiveId?: string;
}

export function AnimatedShowcaseCards({
  title,
  body,
  cards,
  defaultActiveId,
}: AnimatedShowcaseCardsProps) {
  // Ensure we always have an active card - default to first card if no defaultActiveId
  const initialActiveId = defaultActiveId || cards[0]?.id || "speedrun";
  const [activeId, setActiveId] = useState<string>(initialActiveId);

  // Update activeId if defaultActiveId changes (e.g., on props update)
  useEffect(() => {
    if (defaultActiveId && activeId !== defaultActiveId) {
      setActiveId(defaultActiveId);
    }
  }, [defaultActiveId]);

  return (
    <section className="showcase-section">
      <div className="showcase-header">
        <h2 className="showcase-title">{title}</h2>
        <p className="showcase-body">{body}</p>
      </div>

      <div className="showcase-cards-container">
        {cards.map((card, index) => {
          const isActive = card.id === activeId;
          const isSpeedrun = index === 0;

          return (
            <motion.article
              key={card.id}
              className={`showcase-card ${isActive ? "active" : "inactive"} ${isSpeedrun ? "speedrun" : "speedrun-applied"}`}
              onClick={() => setActiveId(card.id)}
              layout
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Dot grid overlay */}
              <div className="showcase-card-dots" />

              {/* Card content */}
              <div className="showcase-card-inner">
                {/* Top: Title area */}
                <div className="showcase-card-top">
                  {card.label && (
                    <span className={`showcase-label ${card.emphasis ? "emphasis" : ""}`}>
                      {card.label}
                    </span>
                  )}
                  <h3 className="showcase-card-title">{card.title}</h3>
                </div>

                {/* Middle: Mock UI */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      className="showcase-card-demo"
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      {isSpeedrun ? (
                        <SpeedrunDemo />
                      ) : (
                        <SpeedrunAppliedDemo />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom: Description & CTA */}
                <div className="showcase-card-bottom">
                  {card.metaTags && card.metaTags.length > 0 && (
                    <div className="showcase-meta-tags">
                      {card.metaTags.map((tag, i) => (
                        <span key={i} className="showcase-meta-tag">{tag}</span>
                      ))}
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <p className="showcase-card-description">{card.description}</p>

                        {card.cta && (
                          <a href={card.cta.href} className="showcase-cta">
                            {card.cta.label}
                            <ArrowRight className="showcase-cta-arrow" />
                          </a>
                        )}

                        {card.secondaryNote && (
                          <p className="showcase-secondary-note">{card.secondaryNote}</p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

// Mock UI for Speedrun - Simple task app being built
function SpeedrunDemo() {
  return (
    <div className="demo-window">
      <div className="demo-window-header">
        <div className="demo-window-dots">
          <span /><span /><span />
        </div>
        <span className="demo-window-title">Task Builder</span>
      </div>
      <div className="demo-window-content">
        <div className="demo-task-app">
          <div className="demo-task-header">
            <span className="demo-task-title">My Tasks</span>
            <button className="demo-add-btn">+ Add</button>
          </div>
          <div className="demo-task-list">
            <div className="demo-task-item done">
              <span className="demo-checkbox checked" />
              <span>Set up project</span>
            </div>
            <div className="demo-task-item done">
              <span className="demo-checkbox checked" />
              <span>Add task columns</span>
            </div>
            <div className="demo-task-item">
              <span className="demo-checkbox" />
              <span>Connect AI agent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock UI for Speedrun Applied - Workflow with agents
function SpeedrunAppliedDemo() {
  return (
    <div className="demo-window applied">
      <div className="demo-window-header">
        <div className="demo-window-dots">
          <span /><span /><span />
        </div>
        <span className="demo-window-title">Workflow Runner</span>
      </div>
      <div className="demo-window-content">
        <div className="demo-workflow">
          <div className="demo-workflow-stage">
            <span className="demo-stage-label">Stage 1</span>
            <span className="demo-stage-status complete">Complete</span>
          </div>
          <div className="demo-workflow-connector" />
          <div className="demo-workflow-stage active">
            <span className="demo-stage-label">Stage 2</span>
            <span className="demo-stage-status running">
              <span className="demo-pulse" />
              Agent working
            </span>
          </div>
          <div className="demo-workflow-connector dim" />
          <div className="demo-workflow-stage dim">
            <span className="demo-stage-label">Stage 3</span>
            <span className="demo-stage-status">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
}
