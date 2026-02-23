import { useState, useEffect, useRef } from "react";
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

              {/* Card content - two column layout when active */}
              <div className={`showcase-card-inner ${isActive ? "two-column" : ""}`}>
                {/* Left column: Text content */}
                <div className="showcase-card-text">
                  <div className="showcase-card-top">
                    {card.label && (
                      <span className={`showcase-label ${card.emphasis ? "emphasis" : ""}`}>
                        {card.label}
                      </span>
                    )}
                    <h3 className="showcase-card-title">{card.title}</h3>
                  </div>

                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        className="showcase-card-bottom"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {card.metaTags && card.metaTags.length > 0 && (
                          <div className="showcase-meta-tags">
                            {card.metaTags.map((tag, i) => (
                              <span key={i} className="showcase-meta-tag">{tag}</span>
                            ))}
                          </div>
                        )}

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

                {/* Right column: Demo animation */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      className="showcase-card-demo"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      {isSpeedrun ? (
                        <KanbanBuilderDemo />
                      ) : (
                        <SpeedrunAppliedDemo />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

// Terminal sequence for Kanban builder
interface TerminalStep {
  type: 'action' | 'status' | 'code';
  content: string;
}

const kanbanTerminalSequence: TerminalStep[] = [
  { type: 'action', content: 'Analysing requirements' },
  { type: 'status', content: 'Kanban board with 3 columns' },
  { type: 'action', content: 'Scaffolding components' },
  { type: 'code', content: 'create_component("KanbanBoard")' },
  { type: 'code', content: 'create_component("Column", ["To Do", "In Progress", "Done"])' },
  { type: 'status', content: 'Components created' },
  { type: 'action', content: 'Adding drag-and-drop' },
  { type: 'code', content: 'import { DragDropContext } from "dnd"' },
  { type: 'status', content: 'Drag handlers configured' },
  { type: 'action', content: 'Setting up state' },
  { type: 'code', content: 'const [tasks, setTasks] = useState([])' },
  { type: 'action', content: 'Generating UI' },
  { type: 'status', content: 'Board ready' },
];

// Sample tasks for the Kanban board
const kanbanTasks = {
  todo: [
    { id: 1, title: 'Design landing page', tag: 'Design' },
    { id: 2, title: 'Write API docs', tag: 'Docs' },
  ],
  inProgress: [
    { id: 3, title: 'Build auth flow', tag: 'Dev' },
  ],
  done: [
    { id: 4, title: 'Set up database', tag: 'Dev' },
    { id: 5, title: 'Create wireframes', tag: 'Design' },
  ],
};

type KanbanPhase =
  | 'waiting'
  | 'typing'
  | 'sending'
  | 'terminal-open'
  | 'terminal-running'
  | 'terminal-close'
  | 'kanban-reveal'
  | 'kanban-build'
  | 'hold'
  | 'fade-out';

// Animated Kanban Builder Demo
function KanbanBuilderDemo() {
  const [phase, setPhase] = useState<KanbanPhase>('waiting');
  const [displayedText, setDisplayedText] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showKanban, setShowKanban] = useState(false);
  const [terminalLines, setTerminalLines] = useState<TerminalStep[]>([]);
  const [currentCodeText, setCurrentCodeText] = useState('');
  const [kanbanBuildStep, setKanbanBuildStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const charIndexRef = useRef(0);
  const stepIndexRef = useRef(0);
  const codeCharIndexRef = useRef(0);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const prompt = "Build me a Kanban board with To Do, In Progress, Done columns";
  const typingSpeed = 35;
  const codeTypingSpeed = 18;

  // Start animation when scrolled into view
  useEffect(() => {
    if (!containerRef.current || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          setShowChat(true);
          setPhase('typing');
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [hasStarted]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [terminalLines, currentCodeText]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'waiting') {
      return;
    }

    if (phase === 'typing') {
      if (charIndexRef.current < prompt.length) {
        timeout = setTimeout(() => {
          setDisplayedText(prompt.slice(0, charIndexRef.current + 1));
          charIndexRef.current += 1;
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('sending'), 600);
      }
    } else if (phase === 'sending') {
      timeout = setTimeout(() => {
        setShowTerminal(true);
        setPhase('terminal-open');
      }, 400);
    } else if (phase === 'terminal-open') {
      timeout = setTimeout(() => setPhase('terminal-running'), 300);
    } else if (phase === 'terminal-running') {
      const currentStep = kanbanTerminalSequence[stepIndexRef.current];

      if (!currentStep) {
        timeout = setTimeout(() => setPhase('terminal-close'), 600);
      } else if (currentStep.type === 'code') {
        if (codeCharIndexRef.current < currentStep.content.length) {
          timeout = setTimeout(() => {
            setCurrentCodeText(currentStep.content.slice(0, codeCharIndexRef.current + 1));
            codeCharIndexRef.current += 1;
          }, codeTypingSpeed);
        } else {
          setTerminalLines(prev => [...prev, currentStep]);
          setCurrentCodeText('');
          codeCharIndexRef.current = 0;
          stepIndexRef.current += 1;
          timeout = setTimeout(() => {}, 120);
        }
      } else {
        setTerminalLines(prev => [...prev, currentStep]);
        stepIndexRef.current += 1;
        timeout = setTimeout(() => {}, currentStep.type === 'action' ? 350 : 200);
      }
    } else if (phase === 'terminal-close') {
      setShowTerminal(false);
      setShowChat(false);
      timeout = setTimeout(() => {
        setShowKanban(true);
        setKanbanBuildStep(1);
        setPhase('kanban-reveal');
      }, 400);
    } else if (phase === 'kanban-reveal') {
      timeout = setTimeout(() => setPhase('kanban-build'), 200);
    } else if (phase === 'kanban-build') {
      const maxSteps = 9; // header + 3 columns + 5 cards
      if (kanbanBuildStep < maxSteps) {
        timeout = setTimeout(() => {
          setKanbanBuildStep(prev => prev + 1);
        }, 180);
      } else {
        timeout = setTimeout(() => setPhase('hold'), 2500);
      }
    } else if (phase === 'hold') {
      timeout = setTimeout(() => setPhase('fade-out'), 2000);
    } else if (phase === 'fade-out') {
      setShowKanban(false);
      timeout = setTimeout(() => {
        // Reset everything
        setShowTerminal(false);
        setShowChat(false);
        setTerminalLines([]);
        setDisplayedText('');
        setCurrentCodeText('');
        setKanbanBuildStep(0);
        charIndexRef.current = 0;
        stepIndexRef.current = 0;
        codeCharIndexRef.current = 0;
        // Restart
        setShowChat(true);
        setPhase('typing');
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [phase, displayedText, terminalLines, currentCodeText, kanbanBuildStep]);

  return (
    <div className="kanban-demo" ref={containerRef}>
      {/* Chat Input */}
      <div className={`kb-chat-container ${showChat ? 'visible' : ''}`}>
        <div className="kb-chat-box">
          <div className="kb-chat-text">
            {displayedText}
            <span className={`kb-cursor ${phase === 'typing' ? 'blinking' : ''}`}>|</span>
          </div>
          <button className={`kb-send-btn ${phase === 'sending' ? 'pressed' : ''}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Terminal Panel */}
      <div className={`kb-terminal ${showTerminal ? 'visible' : ''}`}>
        <div className="kb-terminal-header">
          <span className="kb-terminal-title">Claude</span>
          <span className="kb-terminal-status">
            <span className="kb-status-dot"></span>
            Building
          </span>
        </div>
        <div className="kb-terminal-content" ref={terminalContentRef}>
          {terminalLines.map((line, index) => (
            <div key={index} className={`kb-terminal-line ${line.type}`}>
              {line.type === 'action' && <span className="kb-line-icon">●</span>}
              {line.type === 'status' && <span className="kb-line-icon">→</span>}
              {line.type === 'code' && <span className="kb-line-icon">$</span>}
              <span className={line.type === 'code' ? 'kb-code-text' : ''}>
                {line.content}
              </span>
            </div>
          ))}
          {currentCodeText && (
            <div className="kb-terminal-line code typing">
              <span className="kb-line-icon">$</span>
              <span className="kb-code-text">{currentCodeText}</span>
              <span className="kb-cursor">▋</span>
            </div>
          )}
        </div>
      </div>

      {/* Kanban Board Result */}
      <div className={`kb-board ${showKanban ? 'visible' : ''}`}>
        <div className={`kb-board-header ${kanbanBuildStep >= 1 ? 'visible' : ''}`}>
          <span className="kb-board-title">My Kanban Board</span>
          <span className="kb-board-badge">Live</span>
        </div>
        <div className="kb-columns">
          {/* To Do Column */}
          <div className={`kb-column ${kanbanBuildStep >= 2 ? 'visible' : ''}`}>
            <div className="kb-column-header">
              <span className="kb-column-title">To Do</span>
              <span className="kb-column-count">{kanbanTasks.todo.length}</span>
            </div>
            <div className="kb-column-cards">
              {kanbanTasks.todo.map((task, idx) => (
                <div
                  key={task.id}
                  className={`kb-card ${kanbanBuildStep >= 4 + idx ? 'visible' : ''}`}
                >
                  <span className="kb-card-title">{task.title}</span>
                  <span className="kb-card-tag">{task.tag}</span>
                </div>
              ))}
            </div>
          </div>
          {/* In Progress Column */}
          <div className={`kb-column ${kanbanBuildStep >= 3 ? 'visible' : ''}`}>
            <div className="kb-column-header">
              <span className="kb-column-title">In Progress</span>
              <span className="kb-column-count">{kanbanTasks.inProgress.length}</span>
            </div>
            <div className="kb-column-cards">
              {kanbanTasks.inProgress.map((task, idx) => (
                <div
                  key={task.id}
                  className={`kb-card ${kanbanBuildStep >= 6 + idx ? 'visible' : ''}`}
                >
                  <span className="kb-card-title">{task.title}</span>
                  <span className="kb-card-tag">{task.tag}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Done Column */}
          <div className={`kb-column ${kanbanBuildStep >= 4 ? 'visible' : ''}`}>
            <div className="kb-column-header">
              <span className="kb-column-title">Done</span>
              <span className="kb-column-count">{kanbanTasks.done.length}</span>
            </div>
            <div className="kb-column-cards">
              {kanbanTasks.done.map((task, idx) => (
                <div
                  key={task.id}
                  className={`kb-card ${kanbanBuildStep >= 7 + idx ? 'visible' : ''}`}
                >
                  <span className="kb-card-title">{task.title}</span>
                  <span className="kb-card-tag done">{task.tag}</span>
                </div>
              ))}
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
