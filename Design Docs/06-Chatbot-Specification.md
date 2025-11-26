# Chatbot Specification

Complete implementation guide for the narrow strip chatbot interface.

---

## Overview

**Concept:** A pill-shaped chat interface that sits at the bottom-center of the viewport, appearing after users complete the narrative flow sections.

**Visual Reference:** Similar to the macOS-style bottom bar in the uploaded image (pill-shaped, centered, with gap from edge).

---

## Trigger Behavior

### Appearance Logic

```
TRIGGERS AFTER USER SCROLLS PAST:
- Section 01: Hero
- Section 02: The Price of Intelligence (V1) OR New OS (V2)
- Section 03: The New Operating System (V1 only)
- Section 04: How to Take Advantage (V1) OR How We Can Help (V2)
- Section 05: How We Can Help (V1) OR Why It Works (V2)

TRIGGER POINT: After "How We Can Help" section exits viewport
```

### JavaScript Implementation

```javascript
// Chatbot trigger on scroll
const chatbot = document.querySelector('.chatbot');
const triggerSection = document.querySelector('.section-funnel'); // "How We Can Help"

const chatbotObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // When user scrolls PAST the funnel section
    if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
      chatbot.classList.add('visible');
    } else if (entry.isIntersecting) {
      chatbot.classList.remove('visible');
    }
  });
}, {
  root: null,
  threshold: 0,
  rootMargin: '0px'
});

chatbotObserver.observe(triggerSection);
```

---

## Visual Design

### Collapsed State (Default)

```
APPEARANCE:
- Pill-shaped bar
- Centered horizontally at bottom of viewport
- 40px margin from bottom edge
- Width: 280px
- Height: 48px
- Rounded corners: 24px (full pill shape)
- Background: rgba(240, 240, 240, 0.1) with backdrop blur
- Border: 1px solid rgba(240, 240, 240, 0.2)
```

### HTML Structure

```html
<div class="chatbot">
  <!-- Collapsed State -->
  <div class="chatbot-trigger">
    <div class="chatbot-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <!-- Chat bubble icon -->
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"/>
      </svg>
    </div>
    <span class="chatbot-label">Chat with us</span>
    <div class="chatbot-pulse"></div>
  </div>
  
  <!-- Expanded State (Initially hidden) -->
  <div class="chatbot-interface">
    <div class="chatbot-header">
      <div class="chatbot-header-info">
        <h4>Other Stuff</h4>
        <span>Usually replies instantly</span>
      </div>
      <button class="chatbot-close" aria-label="Close chat">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
    
    <div class="chatbot-messages">
      <!-- Initial welcome message -->
      <div class="chatbot-message bot">
        <div class="message-avatar">OS</div>
        <div class="message-bubble">
          <p>Hi! 👋 How can we help you with AI implementation today?</p>
        </div>
      </div>
      
      <!-- Messages append here -->
    </div>
    
    <div class="chatbot-input">
      <input type="text" placeholder="Type your message..." aria-label="Chat message">
      <button class="chatbot-send" aria-label="Send message">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</div>
```

---

## CSS Styling

### Collapsed State

```css
.chatbot {
  /* Position */
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  z-index: 200;
  
  /* Visibility */
  opacity: 0;
  visibility: hidden;
  
  /* Transition */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Visible state (after scroll trigger) */
.chatbot.visible {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

/* Collapsed Trigger */
.chatbot-trigger {
  /* Dimensions */
  width: 280px;
  height: 48px;
  
  /* Layout */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 20px;
  
  /* Visual */
  background: rgba(240, 240, 240, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(240, 240, 240, 0.2);
  border-radius: 24px;
  
  /* Interaction */
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chatbot-trigger:hover {
  background: rgba(240, 240, 240, 0.15);
  border-color: rgba(240, 240, 240, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

/* Icon */
.chatbot-icon {
  width: 20px;
  height: 20px;
  color: #F0F0F0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Label */
.chatbot-label {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #F0F0F0;
}

/* Pulse indicator */
.chatbot-pulse {
  width: 8px;
  height: 8px;
  background: #51CF66;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
  margin-left: auto;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}
```

---

### Expanded State

```css
/* Expanded Interface */
.chatbot-interface {
  /* Dimensions */
  width: 380px;
  height: 520px;
  
  /* Position */
  position: absolute;
  bottom: 60px; /* Above trigger bar */
  left: 50%;
  transform: translateX(-50%) scale(0.9);
  
  /* Visual */
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(240, 240, 240, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  
  /* Layout */
  display: flex;
  flex-direction: column;
  
  /* Initial state: hidden */
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  
  /* Transition */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Active state */
.chatbot.active .chatbot-interface {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
  transform: translateX(-50%) scale(1);
}

/* Hide trigger when expanded */
.chatbot.active .chatbot-trigger {
  opacity: 0;
  pointer-events: none;
}
```

---

### Header

```css
.chatbot-header {
  /* Layout */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  
  /* Visual */
  border-bottom: 1px solid rgba(240, 240, 240, 0.1);
}

.chatbot-header-info h4 {
  font-family: 'Figtree', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #F0F0F0;
  margin-bottom: 2px;
}

.chatbot-header-info span {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(240, 240, 240, 0.6);
}

.chatbot-close {
  /* Dimensions */
  width: 32px;
  height: 32px;
  
  /* Layout */
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Visual */
  background: transparent;
  border: none;
  border-radius: 50%;
  color: #F0F0F0;
  cursor: pointer;
  
  /* Transition */
  transition: background 0.2s ease;
}

.chatbot-close:hover {
  background: rgba(240, 240, 240, 0.1);
}
```

---

### Messages Area

```css
.chatbot-messages {
  /* Layout */
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  
  /* Scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: rgba(240, 240, 240, 0.2) transparent;
}

.chatbot-messages::-webkit-scrollbar {
  width: 6px;
}

.chatbot-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chatbot-messages::-webkit-scrollbar-thumb {
  background: rgba(240, 240, 240, 0.2);
  border-radius: 3px;
}

.chatbot-messages::-webkit-scrollbar-thumb:hover {
  background: rgba(240, 240, 240, 0.3);
}
```

---

### Message Bubbles

```css
/* Message Container */
.chatbot-message {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: flex-start;
}

/* Bot message (left-aligned) */
.chatbot-message.bot {
  flex-direction: row;
}

/* User message (right-aligned) */
.chatbot-message.user {
  flex-direction: row-reverse;
}

/* Avatar */
.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(240, 240, 240, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Alfabet', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #F0F0F0;
  flex-shrink: 0;
}

/* Message Bubble */
.message-bubble {
  /* Layout */
  max-width: 70%;
  padding: 12px 16px;
  
  /* Visual */
  background: rgba(240, 240, 240, 0.08);
  border-radius: 16px;
  
  /* Typography */
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #F0F0F0;
}

/* Bot bubble */
.chatbot-message.bot .message-bubble {
  border-bottom-left-radius: 4px;
}

/* User bubble */
.chatbot-message.user .message-bubble {
  background: rgba(240, 240, 240, 0.15);
  border-bottom-right-radius: 4px;
}

/* Animation: new message slides in */
.message-bubble {
  animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

### Input Area

```css
.chatbot-input {
  /* Layout */
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  
  /* Visual */
  border-top: 1px solid rgba(240, 240, 240, 0.1);
}

.chatbot-input input {
  /* Layout */
  flex: 1;
  height: 40px;
  padding: 0 16px;
  
  /* Visual */
  background: rgba(240, 240, 240, 0.05);
  border: 1px solid rgba(240, 240, 240, 0.1);
  border-radius: 20px;
  color: #F0F0F0;
  
  /* Typography */
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  
  /* Transition */
  transition: all 0.3s ease;
}

.chatbot-input input:focus {
  border-color: rgba(240, 240, 240, 0.3);
  background: rgba(240, 240, 240, 0.08);
  outline: none;
}

.chatbot-input input::placeholder {
  color: rgba(240, 240, 240, 0.4);
}

.chatbot-send {
  /* Dimensions */
  width: 40px;
  height: 40px;
  
  /* Layout */
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Visual */
  background: #F0F0F0;
  border: none;
  border-radius: 50%;
  color: #000000;
  cursor: pointer;
  
  /* Transition */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chatbot-send:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(240, 240, 240, 0.3);
}

.chatbot-send:active {
  transform: scale(0.95);
}

/* Disabled when empty */
.chatbot-send:disabled {
  background: rgba(240, 240, 240, 0.3);
  cursor: not-allowed;
  transform: none;
}
```

---

## JavaScript Functionality

### Toggle Expand/Collapse

```javascript
class Chatbot {
  constructor() {
    this.chatbot = document.querySelector('.chatbot');
    this.trigger = document.querySelector('.chatbot-trigger');
    this.closeBtn = document.querySelector('.chatbot-close');
    this.input = document.querySelector('.chatbot-input input');
    this.sendBtn = document.querySelector('.chatbot-send');
    this.messages = document.querySelector('.chatbot-messages');
    
    this.init();
  }
  
  init() {
    // Toggle on trigger click
    this.trigger.addEventListener('click', () => this.open());
    
    // Close button
    this.closeBtn.addEventListener('click', () => this.close());
    
    // Send message
    this.sendBtn.addEventListener('click', () => this.sendMessage());
    
    // Send on Enter key
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
    
    // Enable/disable send button based on input
    this.input.addEventListener('input', (e) => {
      this.sendBtn.disabled = e.target.value.trim() === '';
    });
  }
  
  open() {
    this.chatbot.classList.add('active');
    this.input.focus();
  }
  
  close() {
    this.chatbot.classList.remove('active');
  }
  
  sendMessage() {
    const text = this.input.value.trim();
    if (!text) return;
    
    // Add user message
    this.addMessage(text, 'user');
    
    // Clear input
    this.input.value = '';
    this.sendBtn.disabled = true;
    
    // Simulate bot response (replace with actual chat integration)
    setTimeout(() => {
      this.addMessage('Thanks for your message! A team member will respond shortly.', 'bot');
    }, 1000);
  }
  
  addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${type}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = type === 'bot' ? 'OS' : 'You';
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = `<p>${text}</p>`;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);
    
    this.messages.appendChild(messageDiv);
    
    // Scroll to bottom
    this.messages.scrollTop = this.messages.scrollHeight;
  }
}

// Initialize chatbot
const chatbot = new Chatbot();
```

---

## Mobile Responsiveness

```css
@media (max-width: 768px) {
  /* Collapsed state: full width minus margins */
  .chatbot-trigger {
    width: calc(100% - 48px);
    max-width: 320px;
  }
  
  /* Expanded state: full screen overlay */
  .chatbot-interface {
    width: 100vw;
    height: 100vh;
    bottom: 0;
    left: 0;
    transform: none;
    border-radius: 0;
  }
  
  .chatbot.active .chatbot-interface {
    transform: none;
  }
  
  /* Position chatbot trigger at very bottom on mobile */
  .chatbot {
    bottom: 16px;
  }
}
```

---

## Integration Options

### Option 1: Static Messages (Prototype)

```javascript
// Predefined responses for testing
const responses = {
  'hello': 'Hi! How can we help you today?',
  'workshop': 'Our workshops range from 1-hour sessions to half-day deep dives. Would you like to know more?',
  'pricing': 'We offer several tiers. The Marginal Gains Club starts at $X/month. Would you like specific pricing?',
  'default': 'Thanks for reaching out! A team member will respond shortly.'
};
```

### Option 2: Email Integration

```javascript
// Send message to email
sendMessage() {
  const text = this.input.value.trim();
  if (!text) return;
  
  // Send to backend/email service
  fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: text,
      timestamp: new Date().toISOString()
    })
  });
  
  this.addMessage(text, 'user');
  this.addMessage('Thanks! We\'ll respond to your email shortly.', 'bot');
}
```

### Option 3: Live Chat Service (Intercom, Crisp, etc.)

```javascript
// Replace entire chatbot with embedded service
// e.g., Intercom widget API
window.Intercom('boot', {
  app_id: 'YOUR_APP_ID',
  custom_launcher_selector: '.chatbot-trigger'
});
```

---

## Accessibility

```html
<!-- ARIA labels -->
<div class="chatbot" role="dialog" aria-label="Chat with us">
  <button class="chatbot-trigger" aria-label="Open chat">
    ...
  </button>
  
  <div class="chatbot-messages" 
       role="log" 
       aria-live="polite" 
       aria-atomic="false">
    ...
  </div>
  
  <input type="text" 
         aria-label="Type your message" 
         placeholder="Type your message...">
</div>
```

```css
/* Focus indicators */
.chatbot-trigger:focus-visible,
.chatbot-close:focus-visible,
.chatbot-send:focus-visible {
  outline: 2px solid #F0F0F0;
  outline-offset: 2px;
}
```

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-18  
**Status:** Ready for Development
