import React, { useEffect } from 'react';
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
  profileImageSrc = '/intelligence-snacks-cassette-clean-v3.png',
  heading = 'Get Intelligence Snacks in your inbox.',
  description = 'For people building and running modern businesses, Intelligence Snacks helps you quickly digest the big ideas emerging from the world of AI, delivered to your inbox each week.',
  buttonText = 'Send me snacks',
}: NewsletterModalProps) {
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
          {profileImageSrc ? (
            <img className="modal-profile-image" src={profileImageSrc} alt="Intelligence Snacks cassette" />
          ) : (
            <div className="modal-pill">{pill}</div>
          )}

          <h2 className="modal-heading">{heading}</h2>

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
