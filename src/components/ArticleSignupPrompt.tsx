import {useEffect,useState} from 'react';
import {NewsletterModal} from './NewsletterModal';
const NEWSLETTER_MODAL_STORAGE_KEY='newsletter-post-modal-dismissed-at';
const NEWSLETTER_MODAL_COOLDOWN_MS=7*24*60*60*1000;
export function ArticleSignupPrompt({slug}: {slug: string}){
const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const dismissedAt = Number(window.localStorage.getItem(NEWSLETTER_MODAL_STORAGE_KEY) || "0");
    if (dismissedAt && Date.now() - dismissedAt < NEWSLETTER_MODAL_COOLDOWN_MS) {
      return undefined;
    }

    let hasOpened = false;

    const handleScroll = () => {
      if (hasOpened) {
        return;
      }

      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        return;
      }

      const progress = window.scrollY / scrollableHeight;
      if (progress >= 0.5) {
        hasOpened = true;
        setIsSignupModalOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [slug]);
const closeSignupModal = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        NEWSLETTER_MODAL_STORAGE_KEY,
        String(Date.now()),
      );
    }
    setIsSignupModalOpen(false);
  };
return (<NewsletterModal
        isOpen={isSignupModalOpen}
        onClose={closeSignupModal}
        pill="KEEP READING"
        heading={<>Enjoying the issue?<br />Get the next Intelligence Snacks newsletter in your inbox.</>}
        description="Quickly digest the big ideas emerging from the world of AI, delivered to your inbox each week."
        buttonText="Send me snacks"
      />);
}
