import { useState, useEffect } from "react";
import "./discussion-thread-demo.css";

interface Message {
  id: number;
  author: string;
  initials: string;
  color: string;
  text: string;
  isReply?: boolean;
}

const messages: Message[] = [
  {
    id: 1,
    author: "Sarah",
    initials: "SC",
    color: "#2ea782",
    text: "Just automated our inventory alerts with Wingman - it's live!",
  },
  {
    id: 2,
    author: "Marcus",
    initials: "MW",
    color: "#4a90d9",
    text: "Amazing! How long did it take to set up?",
    isReply: true,
  },
  {
    id: 3,
    author: "Sarah",
    initials: "SC",
    color: "#2ea782",
    text: "About 2 hours. Happy to walk you through it.",
    isReply: true,
  },
  {
    id: 4,
    author: "Priya",
    initials: "PS",
    color: "#d4a574",
    text: "This is exactly what we need. Count me in!",
    isReply: true,
  },
];

export function DiscussionThreadDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const showNext = () => {
      setVisibleCount((prev) => {
        if (prev >= messages.length) {
          timeoutId = setTimeout(() => {
            setVisibleCount(0);
            setCycle((c) => c + 1);
          }, 2500);
          return prev;
        }
        return prev + 1;
      });

      if (visibleCount < messages.length) {
        timeoutId = setTimeout(showNext, 1000);
      }
    };

    timeoutId = setTimeout(showNext, 800);
    return () => clearTimeout(timeoutId);
  }, [cycle, visibleCount]);

  return (
    <div className="discussion-thread-demo" key={cycle}>
      <div className="thread-messages">
        {messages.slice(0, visibleCount).map((msg) => (
          <div
            key={`${msg.id}-${cycle}`}
            className={`thread-message ${msg.isReply ? "reply" : ""}`}
          >
            <div
              className="thread-avatar"
              style={{ background: msg.color }}
            >
              {msg.initials}
            </div>
            <div className="thread-content">
              <span className="thread-author">{msg.author}</span>
              <span className="thread-text">{msg.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
