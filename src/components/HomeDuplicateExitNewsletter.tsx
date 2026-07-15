import { useEffect, useRef, useState } from 'react';
import { NewsletterModal } from './NewsletterModal';

const STORAGE_KEY = 'os-home-duplicate-newsletter-exit-dismissed-at';
const COOLDOWN_DAYS = 14;
const ARM_DELAY_MS = 10000;

function isInsideCooldown() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);

    if (!value) {
      return false;
    }

    const dismissedAt = Number(value);

    if (!Number.isFinite(dismissedAt)) {
      return false;
    }

    return Date.now() - dismissedAt < COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return true;
  }
}

function markDismissed() {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // Ignore storage failures; the modal should still be dismissible.
  }
}

export function HomeDuplicateExitNewsletter() {
  const [isOpen, setIsOpen] = useState(false);
  const isArmedRef = useRef(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || isInsideCooldown()) {
      return undefined;
    }

    const armTimer = window.setTimeout(() => {
      isArmedRef.current = true;
    }, ARM_DELAY_MS);

    const handleMouseOut = (event: MouseEvent) => {
      if (
        hasTriggeredRef.current ||
        !isArmedRef.current ||
        event.clientY > 0 ||
        event.relatedTarget
      ) {
        return;
      }

      hasTriggeredRef.current = true;
      markDismissed();
      setIsOpen(true);
    };

    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const handleClose = () => {
    markDismissed();
    setIsOpen(false);
  };

  return (
    <NewsletterModal
      isOpen={isOpen}
      onClose={handleClose}
      pill="THE GOOD STUFF"
      heading="Before you go, get our newsletter for businesses exploring how AI can improve margin, free up capital, and reduce risk."
      description="The Good Stuff is our newsletter on how AI is changing the way SMEs work, what’s practical, and how we approach the problems we solve."
      buttonText="Join The Good Stuff"
    />
  );
}
