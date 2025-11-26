# Animations & Interactions

Complete specification for scroll-triggered animations, transitions, and micro-interactions.

---

## Animation Philosophy

```
PRINCIPLES:
- Subtle over showy
- Performance-first (GPU-accelerated properties)
- Respect reduced-motion preferences
- Enhance, don't distract

APPROVED TECHNIQUES:
✅ Fade-ins (opacity)
✅ Slide-ups (translateY)
✅ Subtle parallax (transform)
✅ Smooth scroll
✅ Hover states

AVOID:
❌ Scroll-jacking
❌ Complex animations
❌ Heavy JavaScript animations
❌ Excessive movement
```

---

## Global Animation Settings

### CSS Variables

```css
:root {
  /* Durations */
  --duration-instant: 0.1s;
  --duration-fast: 0.2s;
  --duration-base: 0.3s;
  --duration-slow: 0.5s;
  --duration-slower: 0.8s;
  
  /* Easing Functions */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-smooth: cubic-bezier(0.45, 0, 0.15, 1);
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Smooth Scrolling

### Implementation

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* Account for fixed nav */
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

### Navigation Link Smooth Scroll

```javascript
// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
```

---

## Scroll-Triggered Fade In

### CSS

```css
/* Initial state (hidden) */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}

/* Visible state */
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered animations */
.fade-in-stagger-1 { transition-delay: 0.1s; }
.fade-in-stagger-2 { transition-delay: 0.2s; }
.fade-in-stagger-3 { transition-delay: 0.3s; }
.fade-in-stagger-4 { transition-delay: 0.4s; }
.fade-in-stagger-5 { transition-delay: 0.5s; }
```

### JavaScript (Intersection Observer)

```javascript
// Fade-in animation on scroll
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -100px 0px', // Trigger before element fully in view
  threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: stop observing after animation
      // fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply to all elements with .fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
  fadeInObserver.observe(el);
});
```

### Usage

```html
<!-- Single element -->
<div class="fade-in">Content</div>

<!-- Staggered elements -->
<div class="fade-in fade-in-stagger-1">First</div>
<div class="fade-in fade-in-stagger-2">Second</div>
<div class="fade-in fade-in-stagger-3">Third</div>
```

---

## Parallax Effect

### Hero Parallax

**Subtle background movement on scroll**

```css
.hero {
  position: relative;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%; /* Extend beyond container */
  background: linear-gradient(180deg, #5B4A9E 0%, #E67E50 100%);
  will-change: transform;
  transition: transform 0.1s ease-out;
}
```

```javascript
// Parallax on scroll
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero-bg');
  
  if (hero && heroBg) {
    const heroHeight = hero.offsetHeight;
    
    // Only apply if hero is in view
    if (scrolled < heroHeight) {
      const parallaxSpeed = 0.5; // Adjust for intensity
      heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
  }
});

// Throttle for performance
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func(...args);
  };
}

const parallaxScroll = throttle(() => {
  // parallax logic here
}, 16); // ~60fps

window.addEventListener('scroll', parallaxScroll);
```

---

## Hero Load Animation

### Sequence

```
1. Page loads → Background gradient fades in (0s)
2. H1 headline slides up + fades in (0.8s delay)
3. Subtitle slides up + fades in (1.0s delay)
4. CTA buttons slide up + fades in (1.2s delay)
5. Scroll indicator fades in (2.0s delay)
```

### CSS

```css
/* Initial states */
.hero-content h1,
.hero-content .hero-subtitle,
.hero-content .hero-cta,
.scroll-indicator {
  opacity: 0;
  transform: translateY(30px);
}

/* Animated states */
.hero-content h1 {
  animation: fadeInUp var(--duration-slower) var(--ease-out) 0.8s forwards;
}

.hero-content .hero-subtitle {
  animation: fadeInUp var(--duration-slower) var(--ease-out) 1.0s forwards;
}

.hero-content .hero-cta {
  animation: fadeInUp var(--duration-slower) var(--ease-out) 1.2s forwards;
}

.scroll-indicator {
  animation: fadeInUp var(--duration-slower) var(--ease-out) 2.0s forwards,
             bounce 2s ease-in-out 2.5s infinite;
}

/* Keyframes */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}
```

---

## Section Animations

### Standard Section Entry

**Applied to each major section**

```css
/* Section header animation */
.section-eyebrow {
  opacity: 0;
  transform: translateX(-20px);
  transition: all var(--duration-slow) var(--ease-out);
}

.section-eyebrow.visible {
  opacity: 0.6; /* Match design opacity */
  transform: translateX(0);
}

/* Section heading animation */
.section h2 {
  opacity: 0;
  transform: translateY(20px);
  transition: all var(--duration-slow) var(--ease-out) 0.2s;
}

.section h2.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Section paragraphs - staggered */
.section p {
  opacity: 0;
  transform: translateY(20px);
  transition: all var(--duration-slow) var(--ease-out);
}

.section p:nth-of-type(1) { transition-delay: 0.3s; }
.section p:nth-of-type(2) { transition-delay: 0.4s; }
.section p:nth-of-type(3) { transition-delay: 0.5s; }

.section p.visible {
  opacity: 1;
  transform: translateY(0);
}

/* CTA animation */
.section-cta {
  opacity: 0;
  transform: translateY(20px);
  transition: all var(--duration-slow) var(--ease-out) 0.6s;
}

.section-cta.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## Card Animations

### Grid Entry Animation

**Cards fade in with stagger effect**

```css
/* Initial state */
.content-card,
.testimonial-card,
.funnel-step {
  opacity: 0;
  transform: translateY(30px);
  transition: all var(--duration-slow) var(--ease-out);
}

/* Stagger delays */
.content-card:nth-child(1) { transition-delay: 0.1s; }
.content-card:nth-child(2) { transition-delay: 0.2s; }
.content-card:nth-child(3) { transition-delay: 0.3s; }
.content-card:nth-child(4) { transition-delay: 0.4s; }
.content-card:nth-child(5) { transition-delay: 0.5s; }
.content-card:nth-child(6) { transition-delay: 0.6s; }

/* Visible state */
.content-card.visible,
.testimonial-card.visible,
.funnel-step.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Card Hover Animation

```css
.content-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

/* Image zoom on hover */
.content-card img {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-card:hover img {
  transform: scale(1.05);
}
```

---

## Funnel Section Animation

### Sequence

```
1. Funnel step 01: fade up (0.15s)
2. Arrow 01: fade in (0.25s)
3. Funnel step 02: fade up (0.35s)
4. Arrow 02: fade in (0.45s)
5. Funnel step 03: fade up (0.55s)
6. Arrow 03: fade in (0.65s)
7. Funnel step 04: fade up (0.75s)
8. Arrow 04: fade in (0.85s)
9. Wingman destination: fade up + scale (0.95s)
```

### CSS

```css
/* Funnel steps */
.funnel-step {
  opacity: 0;
  transform: translateY(30px);
  transition: all var(--duration-slow) var(--ease-out);
}

.funnel-step:nth-child(1) { transition-delay: 0.15s; }
.funnel-step:nth-child(3) { transition-delay: 0.35s; }
.funnel-step:nth-child(5) { transition-delay: 0.55s; }
.funnel-step:nth-child(7) { transition-delay: 0.75s; }

/* Arrows */
.funnel-arrow {
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out);
}

.funnel-arrow:nth-of-type(2) { transition-delay: 0.25s; }
.funnel-arrow:nth-of-type(4) { transition-delay: 0.45s; }
.funnel-arrow:nth-of-type(6) { transition-delay: 0.65s; }
.funnel-arrow:nth-of-type(8) { transition-delay: 0.85s; }

/* Destination */
.funnel-destination {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: all var(--duration-slow) var(--ease-out) 0.95s;
}

/* Visible states */
.funnel-step.visible,
.funnel-arrow.visible,
.funnel-destination.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.funnel-arrow.visible {
  opacity: 0.4; /* Match design */
}
```

---

## Button Interactions

### Primary Button

```css
.btn-primary {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

/* Hover */
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(240, 240, 240, 0.2);
}

/* Active (click) */
.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(240, 240, 240, 0.2);
}

/* Ripple effect on click (optional) */
.btn-primary::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-primary:active::after {
  width: 200px;
  height: 200px;
}
```

---

## Form Interactions

### Input Focus Animation

```css
.form-input {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.form-input:focus {
  border-color: #F0F0F0;
  background: rgba(240, 240, 240, 0.08);
  transform: scale(1.01);
}

/* Floating label animation (optional enhancement) */
.form-group {
  position: relative;
}

.form-label {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  font-size: 14px;
  color: rgba(240, 240, 240, 0.4);
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-input:focus + .form-label,
.form-input:not(:placeholder-shown) + .form-label {
  top: -8px;
  left: 12px;
  font-size: 11px;
  background: #000000;
  padding: 0 4px;
  color: #F0F0F0;
}
```

---

## Navigation Interactions

### Nav Link Hover

```css
.nav-link {
  position: relative;
  transition: opacity 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: #F0F0F0;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover::after {
  width: 100%;
}
```

### Mobile Menu Animation

```css
.nav-menu {
  transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-menu.active {
  right: 0;
}

/* Menu items fade in */
.nav-menu a {
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-menu.active a:nth-child(1) { transition-delay: 0.1s; opacity: 1; transform: translateX(0); }
.nav-menu.active a:nth-child(2) { transition-delay: 0.15s; opacity: 1; transform: translateX(0); }
.nav-menu.active a:nth-child(3) { transition-delay: 0.2s; opacity: 1; transform: translateX(0); }
.nav-menu.active a:nth-child(4) { transition-delay: 0.25s; opacity: 1; transform: translateX(0); }
```

---

## Loading States

### Page Load

```css
body {
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
```

### Content Loading Skeleton

```css
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(240, 240, 240, 0.05) 25%,
    rgba(240, 240, 240, 0.1) 50%,
    rgba(240, 240, 240, 0.05) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

---

## Performance Optimization

### GPU Acceleration

```css
/* Force GPU acceleration for animated elements */
.fade-in,
.content-card,
.funnel-step,
.btn-primary {
  will-change: transform, opacity;
  transform: translateZ(0); /* Force GPU layer */
  backface-visibility: hidden;
}

/* Remove will-change after animation completes */
.fade-in.visible {
  will-change: auto;
}
```

### Throttle Scroll Events

```javascript
// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Use throttled scroll
const handleScroll = throttle(() => {
  // Scroll logic here
}, 16); // ~60fps

window.addEventListener('scroll', handleScroll);
```

---

## Accessibility

### Focus Indicators

```css
/* Clear focus indicators for keyboard navigation */
*:focus-visible {
  outline: 2px solid #F0F0F0;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Remove default outline */
*:focus {
  outline: none;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-18  
**Status:** Ready for Development
