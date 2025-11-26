# Component Library

Reusable UI components with complete specifications.

---

## Buttons

### Primary Button

**Usage:** Main CTAs, newsletter signup, primary actions

```html
<button class="btn-primary">Marginal Gains Club</button>
```

```css
.btn-primary {
  /* Dimensions */
  width: 135px;
  height: 27px;
  min-width: 135px; /* Prevent text truncation */
  
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  
  /* Visual */
  background: #F0F0F0;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  /* Typography */
  font-family: 'Alfabet', sans-serif;
  font-size: 11px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  /* Interaction */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
}

/* Hover State */
.btn-primary:hover {
  background: rgba(240, 240, 240, 0.8);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(240, 240, 240, 0.2);
}

/* Active State */
.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(240, 240, 240, 0.2);
}

/* Focus State (Accessibility) */
.btn-primary:focus-visible {
  outline: 2px solid #F0F0F0;
  outline-offset: 2px;
}

/* Disabled State */
.btn-primary:disabled {
  background: rgba(240, 240, 240, 0.3);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Mobile: Full width option */
@media (max-width: 768px) {
  .btn-primary.btn-mobile-full {
    width: 100%;
    max-width: 300px;
  }
}
```

---

### Secondary Button (Outline)

**Usage:** Secondary CTAs, alternative actions

```html
<button class="btn-secondary">Explore Workshops</button>
```

```css
.btn-secondary {
  /* Dimensions */
  width: 135px;
  height: 27px;
  min-width: 135px;
  
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  
  /* Visual */
  background: transparent;
  color: #F0F0F0;
  border: 1px solid #F0F0F0;
  border-radius: 4px;
  cursor: pointer;
  
  /* Typography */
  font-family: 'Alfabet', sans-serif;
  font-size: 11px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  /* Interaction */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
}

/* Hover State */
.btn-secondary:hover {
  background: rgba(240, 240, 240, 0.1);
  border-color: rgba(240, 240, 240, 0.8);
  transform: translateY(-1px);
}

/* Active State */
.btn-secondary:active {
  transform: translateY(0);
}

/* Focus State */
.btn-secondary:focus-visible {
  outline: 2px solid #F0F0F0;
  outline-offset: 2px;
}

/* Disabled State */
.btn-secondary:disabled {
  border-color: rgba(240, 240, 240, 0.3);
  color: rgba(240, 240, 240, 0.3);
  cursor: not-allowed;
  transform: none;
}
```

---

### Text Link with Arrow

**Usage:** "Read more" links, article navigation

```html
<a href="#" class="link-arrow">Read - Abundant Intelligence →</a>
```

```css
.link-arrow {
  /* Typography */
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #F0F0F0;
  text-decoration: none;
  
  /* Interaction */
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover State */
.link-arrow:hover {
  transform: translateX(4px);
  opacity: 0.8;
}

/* Focus State */
.link-arrow:focus-visible {
  outline: 2px solid #F0F0F0;
  outline-offset: 4px;
  border-radius: 2px;
}
```

---

## Cards

### Content Card (Articles/Podcasts)

**Usage:** Article and podcast listings

```html
<article class="content-card">
  <img src="thumbnail.jpg" alt="Article title">
  <div class="content-card-body">
    <h4>On the Business Model of AI</h4>
    <p class="card-meta">Pete Winn</p>
    <a href="#" class="card-link">Read more →</a>
  </div>
</article>
```

```css
.content-card {
  /* Container */
  background: rgba(240, 240, 240, 0.05);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

/* Hover Effect */
.content-card:hover {
  background: rgba(240, 240, 240, 0.08);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

/* Image */
.content-card img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-card:hover img {
  transform: scale(1.05);
}

/* Body */
.content-card-body {
  padding: 16px;
}

/* Title */
.content-card h4 {
  font-family: 'Figtree', sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 8px;
  color: #F0F0F0;
}

/* Meta */
.card-meta {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(240, 240, 240, 0.6);
  margin-bottom: 12px;
}

/* Link */
.card-link {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #F0F0F0;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.card-link:hover {
  transform: translateX(4px);
}
```

---

### Testimonial Card

**Usage:** Client testimonials and social proof

```html
<div class="testimonial-card">
  <p class="testimonial-quote">
    "Working with Other Stuff felt less like hiring a consultancy and more 
    like gaining a thought partner."
  </p>
  <div class="testimonial-author">
    <img src="avatar.jpg" alt="Jane Smith">
    <div>
      <div class="author-name">Jane Smith</div>
      <div class="author-title">CEO, TechCorp</div>
    </div>
  </div>
</div>
```

```css
.testimonial-card {
  /* Container */
  background: rgba(240, 240, 240, 0.05);
  border-radius: 12px;
  padding: 32px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 400px;
}

/* Hover Effect */
.testimonial-card:hover {
  background: rgba(240, 240, 240, 0.08);
  transform: translateY(-4px);
}

/* Quote */
.testimonial-quote {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  font-style: italic;
  color: #F0F0F0;
  margin-bottom: 24px;
}

/* Author Container */
.testimonial-author {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Author Image */
.testimonial-author img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(240, 240, 240, 0.1);
}

/* Author Name */
.author-name {
  font-family: 'Figtree', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #F0F0F0;
  margin-bottom: 4px;
}

/* Author Title */
.author-title {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(240, 240, 240, 0.6);
}
```

---

### Funnel Step Card

**Usage:** Customer journey visualization

```html
<div class="funnel-step">
  <div class="step-number">01</div>
  <h4>Step One</h4>
  <p>Placeholder description</p>
</div>
```

```css
.funnel-step {
  /* Container */
  flex: 1;
  min-width: 180px;
  background: rgba(240, 240, 240, 0.05);
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover Effect */
.funnel-step:hover {
  background: rgba(240, 240, 240, 0.08);
  transform: translateY(-4px);
}

/* Number Badge */
.step-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(240, 240, 240, 0.1);
  border: 2px solid rgba(240, 240, 240, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  
  font-family: 'Figtree', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #F0F0F0;
  
  transition: all 0.3s ease;
}

.funnel-step:hover .step-number {
  border-color: rgba(240, 240, 240, 0.6);
  background: rgba(240, 240, 240, 0.15);
}

/* Title */
.funnel-step h4 {
  font-family: 'Figtree', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #F0F0F0;
  margin-bottom: 8px;
}

/* Description */
.funnel-step p {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(240, 240, 240, 0.7);
  line-height: 1.4;
}
```

---

### Funnel Destination (Wingman)

**Usage:** Final step in funnel visualization

```html
<div class="funnel-destination">
  <div class="destination-icon">
    <svg><!-- Wingman logo --></svg>
  </div>
  <h4>Wingman</h4>
  <p>Your AI operating system</p>
</div>
```

```css
.funnel-destination {
  /* Container */
  flex: 1;
  min-width: 200px;
  background: rgba(240, 240, 240, 0.1);
  border: 2px solid rgba(240, 240, 240, 0.3);
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover Effect */
.funnel-destination:hover {
  background: rgba(240, 240, 240, 0.15);
  border-color: rgba(240, 240, 240, 0.5);
  transform: scale(1.02);
}

/* Icon Container */
.destination-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  background: rgba(240, 240, 240, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.funnel-destination:hover .destination-icon {
  background: rgba(240, 240, 240, 0.2);
  transform: scale(1.1);
}

/* Title */
.funnel-destination h4 {
  font-family: 'Figtree', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #F0F0F0;
  margin-bottom: 8px;
}

/* Description */
.funnel-destination p {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: rgba(240, 240, 240, 0.7);
}
```

---

## Form Elements

### Input Field

**Usage:** Email inputs, text fields

```html
<input type="email" class="form-input" placeholder="Enter your email">
```

```css
.form-input {
  /* Dimensions */
  height: 40px;
  min-width: 250px;
  
  /* Layout */
  padding: 0 16px;
  
  /* Visual */
  background: rgba(240, 240, 240, 0.05);
  border: 1px solid rgba(240, 240, 240, 0.15);
  border-radius: 4px;
  color: #F0F0F0;
  
  /* Typography */
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  
  /* Interaction */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Placeholder */
.form-input::placeholder {
  color: rgba(240, 240, 240, 0.4);
}

/* Focus State */
.form-input:focus {
  border-color: #F0F0F0;
  background: rgba(240, 240, 240, 0.08);
  outline: none;
}

/* Error State */
.form-input.error {
  border-color: #FF6B6B;
}

/* Success State */
.form-input.success {
  border-color: #51CF66;
}

/* Disabled State */
.form-input:disabled {
  background: rgba(240, 240, 240, 0.02);
  border-color: rgba(240, 240, 240, 0.1);
  color: rgba(240, 240, 240, 0.3);
  cursor: not-allowed;
}
```

---

### Newsletter Form

**Usage:** Email capture for Marginal Gains Club

```html
<form class="newsletter-form">
  <input type="email" class="form-input" placeholder="Enter your email" required>
  <button type="submit" class="btn-primary">Join Marginal Gains Club</button>
</form>
```

```css
.newsletter-form {
  /* Layout */
  display: flex;
  gap: 16px;
  max-width: 500px;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
}

/* Mobile: Stack vertically */
@media (max-width: 768px) {
  .newsletter-form {
    flex-direction: column;
    align-items: stretch;
  }
  
  .newsletter-form .form-input,
  .newsletter-form .btn-primary {
    width: 100%;
  }
}
```

---

## Navigation

### Desktop Navigation

```html
<nav class="nav">
  <div class="nav-container">
    <div class="nav-logo">OTHER STUFF</div>
    
    <div class="nav-menu">
      <a href="#services" class="nav-link">Services</a>
      <a href="#products" class="nav-link">Products</a>
      <a href="#media" class="nav-link">Media</a>
      <a href="#company" class="nav-link">Company</a>
      <button class="btn-primary">Contact Us</button>
    </div>
    
    <button class="nav-toggle" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</nav>
```

```css
.nav {
  /* Position */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  
  /* Visual */
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(240, 240, 240, 0.1);
}

.nav-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 80px);
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-family: 'Alfabet', sans-serif;
  font-weight: 900;
  font-size: 14px;
  letter-spacing: 0;
  color: #F0F0F0;
  cursor: pointer;
}

.nav-menu {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-link {
  font-family: 'Alfabet', sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  text-decoration: none;
  color: #F0F0F0;
  transition: opacity 0.3s ease;
}

.nav-link:hover {
  opacity: 0.7;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.nav-toggle span {
  width: 24px;
  height: 2px;
  background: #F0F0F0;
  transition: all 0.3s ease;
}

/* Mobile Navigation */
@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    top: 64px;
    right: -100%;
    width: 100%;
    max-width: 300px;
    height: calc(100vh - 64px);
    background: rgba(0, 0, 0, 0.98);
    flex-direction: column;
    align-items: stretch;
    padding: 32px;
    gap: 24px;
    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .nav-menu.active {
    right: 0;
  }
  
  .nav-toggle {
    display: flex;
  }
  
  .nav-toggle.active span:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
  }
  
  .nav-toggle.active span:nth-child(2) {
    opacity: 0;
  }
  
  .nav-toggle.active span:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
  }
}
```

---

## Section Layouts

### Standard Section Container

**Usage:** Consistent padding and max-width for all sections

```html
<section class="section">
  <div class="section-container">
    <!-- Section content -->
  </div>
</section>
```

```css
.section {
  background: #000000;
  padding: clamp(64px, 10vw, 160px) 0;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 80px);
}

/* Wide container variant */
.section-container-wide {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 80px);
}
```

---

### Section Header

**Usage:** Eyebrow + Heading pattern

```html
<div class="section-header">
  <h3 class="section-eyebrow">THE NEW OPERATING SYSTEM</h3>
  <h2>Intelligence is now abundant</h2>
</div>
```

```css
.section-header {
  margin-bottom: 48px;
}

.section-eyebrow {
  font-family: 'Silkscreen', monospace;
  font-size: clamp(12px, 1.5vw, 14px);
  text-transform: uppercase;
  color: #F0F0F0;
  opacity: 0.6;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}

.section-header h2 {
  font-size: clamp(22px, 3.5vw, 35px);
  max-width: 800px;
}

/* Centered variant */
.section-header.centered {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.section-header.centered h2 {
  margin-left: auto;
  margin-right: auto;
}
```

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-18  
**Status:** Ready for Development
