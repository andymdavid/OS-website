'use client';

import React, { useState } from 'react';
import './EmailCaptureForm.css';

interface EmailCaptureFormProps {
  variant?: 'inline' | 'standalone';
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export function EmailCaptureForm({
  variant = 'inline',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  className = '',
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset states
    setMessage('');

    // Validate email
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    // Submit to API
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks! Check your inbox to confirm your subscription.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className={`email-capture-form ${variant} ${className}`}>
      <form onSubmit={handleSubmit} className="email-form">
        <div className="email-form-content">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="email-input"
            disabled={status === 'loading' || status === 'success'}
            aria-label="Email address"
          />
          <button
            type="submit"
            className="email-submit-btn"
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : buttonText}
          </button>
        </div>
        {message && (
          <div className={`email-message ${status}`} role="alert">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
