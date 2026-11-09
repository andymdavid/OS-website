import React, { useEffect, useRef } from 'react';
import { EmailCaptureForm } from './EmailCaptureForm';
import './NewsletterModal.css';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  pill?: string;
  profileImageSrc?: string | null;
  heading?: React.ReactNode;
  description?: string;
  buttonText?: string;
}

export function NewsletterModal({
  isOpen,
  onClose,
  pill = 'INTELLIGENCE SNACKS',
  profileImageSrc = '/optimized/snacks-cassette-640.webp',
  heading = 'Get Intelligence Snacks in your inbox.',
  description = 'For people building and running modern businesses, Intelligence Snacks helps you quickly digest the big ideas emerging from the world of AI, delivered to your inbox each week.',
  buttonText = 'Send me snacks',
}: NewsletterModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Keep keyboard focus inside the open dialog and restore the opener.
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const elements = [...(dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled)') || [])].filter(element => element.getClientRects().length);
        const first = elements[0], last = elements.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="newsletter-dialog-title" className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="modal-body">
          {profileImageSrc ? (
            <img className="modal-profile-image" width="640" height="404" src={profileImageSrc} alt="Intelligence Snacks cassette" />
          ) : (
            <div className="modal-pill">{pill}</div>
          )}

          <h2 id="newsletter-dialog-title" className="modal-heading">{heading}</h2>

          <p className="modal-subpara">{description}</p>

          <div className="modal-form">
            <EmailCaptureForm
              variant="standalone"
              placeholder="Enter your email"
              buttonText={buttonText}
              onSuccess={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
