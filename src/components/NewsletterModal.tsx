
import React, { useEffect } from 'react';
import { EmailCaptureForm } from './EmailCaptureForm';
import './NewsletterModal.css';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
          <div className="modal-pill">THE GOOD STUFF</div>

          <h2 className="modal-heading">
            The Good Stuff is where we dig into how AI is changing the way we work,
            build businesses, and shape the broader economy.
          </h2>

          <p className="modal-subpara">
            We publish essays, stories, and conversations about the way humans and
            AI work together — and what that means for small businesses. If you
            want to understand how we think, this is the best place to start.
          </p>

          <div className="modal-form">
            <EmailCaptureForm
              variant="standalone"
              placeholder="Enter your email"
              buttonText="Join the Good Stuff"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
