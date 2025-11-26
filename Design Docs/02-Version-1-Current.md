# Version 1 - Current Flow

Complete page specification for the full narrative flow version.

---

## Page Structure Overview

```
01. NAVIGATION (Fixed Header)
02. HERO (ATF - Above The Fold)
03. THE PRICE OF INTELLIGENCE
04. THE NEW OPERATING SYSTEM
05. HOW TO TAKE ADVANTAGE OF THE NEW SYSTEM
06. HOW WE CAN HELP (Funnel Section)
    [CHATBOT TRIGGERS AFTER THIS SECTION]
07. TESTIMONIALS
08. THE GOOD STUFF (Unified: Newsletter + Articles + Podcasts + Highlights)
09. FOOTER
```

---

## Section 01: Navigation

### Layout

```
Fixed header at top of viewport
Background: rgba(0, 0, 0, 0.95) with backdrop blur
Height: 64px
Z-index: 100
```

### Structure

```html
<nav>
  <div class="nav-container">
    <!-- Left: Logo -->
    <div class="nav-logo">OTHER STUFF</div>
    
    <!-- Right: Menu -->
    <div class="nav-menu">
      <a href="#services">Services</a>
      <a href="#products">Products</a>
      <a href="#media">Media</a>
      <a href="#company">Company</a>
      <button class="btn-primary">Contact Us</button>
    </div>
    
    <!-- Mobile: Hamburger -->
    <button class="nav-toggle">☰</button>
  </div>
</nav>
```

### Styling

```css
.nav-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 80px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-family: 'Alfabet';
  font-weight: 900;
  font-size: 14px;
  letter-spacing: 0;
}

.nav-menu {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-menu a {
  font-family: 'Alfabet';
  font-size: 11px;
  text-transform: uppercase;
  text-decoration: none;
  color: #F0F0F0;
  transition: opacity 0.3s ease;
}

.nav-menu a:hover {
  opacity: 0.7;
}
```

### Mobile Behavior

```
@media (max-width: 768px):
  - Hide .nav-menu
  - Show .nav-toggle
  - On click: slide menu from right
```

---

## Section 02: Hero (ATF)

### Layout

```
Full viewport height (100vh)
Background: Linear gradient (purple #5B4A9E → orange #E67E50)
Centered content
```

### Structure

```html
<section class="hero">
  <div class="hero-content">
    <h1>Artificial Intelligence is a new dawn for human flourishing</h1>
    
    <p class="hero-subtitle">
      We identify Optimal Human Placement™ and design systems where humans 
      and AI do their best work—together—so you grow faster, leaner, and smarter.
    </p>
    
    <div class="hero-cta">
      <button class="btn-primary">Marginal Gains Club</button>
      <button class="btn-secondary">Explore Workshops</button>
    </div>
  </div>
  
  <!-- Scroll indicator -->
  <div class="scroll-indicator">
    <span>Scroll to explore</span>
    <svg><!-- Down arrow icon --></svg>
  </div>
</section>
```

### Styling

```css
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #5B4A9E 0%, #E67E50 100%);
  padding: clamp(24px, 5vw, 80px);
  position: relative;
}

.hero-content {
  max-width: 1000px;
  text-align: center;
}

h1 {
  font-size: clamp(28px, 5vw, 50px);
  margin-bottom: 24px;
}

.hero-subtitle {
  font-size: 14px;
  max-width: 700px;
  margin: 0 auto 40px;
  opacity: 0.9;
}

.hero-cta {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.6;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(10px); }
}
```

### Animation

```
On load:
  - h1: fade up, 0.8s delay
  - .hero-subtitle: fade up, 1s delay
  - .hero-cta: fade up, 1.2s delay
  - .scroll-indicator: fade in, 2s delay
```

---

## Section 03: The Price of Intelligence

### Layout

```
Background: #000000
Padding: 160px vertical (desktop)
Max-width: 1200px centered
```

### Structure

```html
<section class="section-price">
  <div class="section-container">
    <h3 class="section-eyebrow">THE PRICE OF INTELLIGENCE</h3>
    
    <h2>The cost of intelligence is collapsing - now we can grow faster than ever.</h2>
    
    <p>
      Historically, the only way for a business to access 'intelligence' - its 
      capacity to sense, decide, and act - was to hire more humans. Every marginal 
      unit of intelligence came packaged inside a full-time salary, benefits, and 
      management overhead. But now the price of cognition - the cost of a decision, 
      analysis, or a line of code - is plummeting. Intelligence itself is becoming 
      modular, fluid, and ambient.
    </p>
    
    <p>
      Businesses that still scale through hiring for headcount will be outpaced by 
      those that scale through orchestration — assembling human and artificial 
      intelligence in new configurations at near-zero marginal cost.
    </p>
    
    <div class="section-cta">
      <button class="btn-secondary">Explore Workshops</button>
      <a href="#" class="link-arrow">Read - The Price of Intelligence →</a>
    </div>
  </div>
</section>
```

### Styling

```css
.section-price {
  background: #000000;
  padding: clamp(64px, 10vw, 160px) 0;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 80px);
}

.section-eyebrow {
  font-size: clamp(12px, 1.5vw, 14px);
  margin-bottom: 16px;
  opacity: 0.6;
}

.section-price h2 {
  font-size: clamp(22px, 3.5vw, 35px);
  margin-bottom: 32px;
  max-width: 800px;
}

.section-price p {
  max-width: 800px;
  margin-bottom: 24px;
  line-height: 1.6;
}

.section-cta {
  display: flex;
  gap: 24px;
  align-items: center;
  margin-top: 40px;
  flex-wrap: wrap;
}

.link-arrow {
  font-family: 'Inter';
  font-size: 14px;
  color: #F0F0F0;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.link-arrow:hover {
  transform: translateX(4px);
}
```

### Animation

```
On scroll into view:
  - .section-eyebrow: fade in from left
  - h2: fade up, 0.2s delay
  - p: fade up, stagger 0.1s each
  - .section-cta: fade up, 0.4s delay
```

---

## Section 04: The New Operating System

### Layout

```
Background: #000000
Padding: 160px vertical
Max-width: 1200px centered
```

### Structure

```html
<section class="section-operating-system">
  <div class="section-container">
    <h3 class="section-eyebrow">THE NEW OPERATING SYSTEM</h3>
    
    <h2>The new operating system for business is built on abundant intelligence.</h2>
    
    <p>
      Intelligence used to be scarce. That scarcity shaped how organisations looked. 
      Departments, hierarchies and processes reflected the limitations of human 
      cognition. At its core, a company was a system for distributing human 
      intelligence at scale.
    </p>
    
    <p>
      But now intelligence is abundant. The opportunity is to rethink how work 
      happens when analysis, language, and code are instantly available. In this 
      world, the advantage shifts to those who can shape intelligence — human and 
      artificial — into systems that are adaptive, generative, and responsive.
    </p>
    
    <p>
      The companies that will thrive are the ones that learn to direct this new 
      energy — where intelligence flows where it's needed most, and smaller teams 
      can achieve what once took entire enterprises.
    </p>
    
    <div class="section-cta">
      <button class="btn-secondary">Explore Workshops</button>
      <a href="#" class="link-arrow">Read - Abundant Intelligence →</a>
    </div>
  </div>
</section>
```

### Styling

```
Same as Section 03 (consistent pattern)
```

### Animation

```
Same scroll-triggered animations as Section 03
```

---

## Section 05: How to Take Advantage of the New System

### Layout

```
Background: #000000
Padding: 160px vertical
Max-width: 1200px centered
```

### Structure

```html
<section class="section-take-advantage">
  <div class="section-container">
    <h3 class="section-eyebrow">HOW TO TAKE ADVANTAGE OF THE NEW SYSTEM</h3>
    
    <h2>The organisations that thrive in the age of intelligence will design for flow.</h2>
    
    <p>
      Business is moving into a new mode — one where intelligence flows freely. 
      Your advantage comes from how quickly you can turn insight into action, 
      automate the repeatable, and scale what makes you unique.
    </p>
    
    <p>
      The result is leverage. Faster innovation, lower operating costs, and a 
      business that grows smarter every time it moves — less like a factory, and 
      more like an organism. As intelligence flows freely across teams, the gap 
      between signal and response closes, giving leaders more visibility, faster 
      feedback, and higher-fidelity information.
    </p>
    
    <p>
      Human attention gets reallocated to what can't be automated — creativity, 
      judgement, relationships, and taste. Designing for flow — where intelligence 
      moves freely to create leverage — is what we help businesses do.
    </p>
    
    <div class="section-cta">
      <button class="btn-secondary">Explore Workshops</button>
      <a href="#" class="link-arrow">Read - Designing for Flow →</a>
    </div>
  </div>
</section>
```

### Styling

```
Same as Section 03 & 04
```

---

## Section 06: How We Can Help (Funnel)

### Layout

```
Background: #000000
Padding: 160px vertical
Max-width: 1440px centered
```

### Structure

```html
<section class="section-funnel">
  <div class="section-container">
    <h3 class="section-eyebrow">HOW WE CAN HELP</h3>
    
    <h2>We're a venture studio and systems practice for the age of intelligence.</h2>
    
    <p>
      You know your business better than anyone. You've built the systems, the 
      culture, the instincts that make it work. We're not consultants. We're 
      builders and systems thinkers. Our role isn't to tell you how to run your 
      business — it's to help you apply AI in ways that amplify what you already 
      do best.
    </p>
    
    <!-- FUNNEL VISUALIZATION -->
    <div class="funnel-steps">
      <div class="funnel-step">
        <div class="step-number">01</div>
        <h4>Step One</h4>
        <p>Placeholder description for step one</p>
      </div>
      
      <div class="funnel-arrow">→</div>
      
      <div class="funnel-step">
        <div class="step-number">02</div>
        <h4>Step Two</h4>
        <p>Placeholder description for step two</p>
      </div>
      
      <div class="funnel-arrow">→</div>
      
      <div class="funnel-step">
        <div class="step-number">03</div>
        <h4>Step Three</h4>
        <p>Placeholder description for step three</p>
      </div>
      
      <div class="funnel-arrow">→</div>
      
      <div class="funnel-step">
        <div class="step-number">04</div>
        <h4>Step Four</h4>
        <p>Placeholder description for step four</p>
      </div>
      
      <div class="funnel-arrow">→</div>
      
      <div class="funnel-destination">
        <div class="destination-icon">
          <svg><!-- Wingman logo/icon --></svg>
        </div>
        <h4>Wingman</h4>
        <p>Your AI operating system</p>
      </div>
    </div>
    
    <div class="section-cta">
      <button class="btn-primary">Marginal Gains Club</button>
      <button class="btn-secondary">Explore Workshops</button>
    </div>
  </div>
</section>
```

### Styling

```css
.funnel-steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 64px 0;
  gap: 24px;
  overflow-x: auto;
  padding: 40px 0;
}

.funnel-step {
  flex: 1;
  min-width: 180px;
  background: rgba(240, 240, 240, 0.05);
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.4s ease;
}

.funnel-step:hover {
  background: rgba(240, 240, 240, 0.08);
  transform: translateY(-4px);
}

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
  font-family: 'Figtree';
  font-weight: 700;
  font-size: 18px;
}

.funnel-step h4 {
  font-family: 'Figtree';
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}

.funnel-step p {
  font-size: 12px;
  opacity: 0.7;
}

.funnel-arrow {
  font-size: 24px;
  opacity: 0.4;
  flex-shrink: 0;
}

.funnel-destination {
  flex: 1;
  min-width: 200px;
  background: rgba(240, 240, 240, 0.1);
  border: 2px solid rgba(240, 240, 240, 0.3);
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
}

.destination-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  background: rgba(240, 240, 240, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Mobile: Stack vertically */
@media (max-width: 768px) {
  .funnel-steps {
    flex-direction: column;
  }
  
  .funnel-arrow {
    transform: rotate(90deg);
  }
}
```

### Animation

```
On scroll into view:
  - Each .funnel-step: fade up, stagger 0.15s
  - .funnel-arrow: fade in after previous step
  - .funnel-destination: fade up last, slight scale effect
```

---

## Section 07: Testimonials

### Layout

```
Background: #000000
Padding: 160px vertical
Max-width: 1440px centered
```

### Structure

```html
<section class="section-testimonials">
  <div class="section-container">
    <h3 class="section-eyebrow">TESTIMONIALS</h3>
    <h2>What our clients say</h2>
    
    <div class="testimonials-grid">
      <!-- Testimonial 1 -->
      <div class="testimonial-card">
        <p class="testimonial-quote">
          "Working with Other Stuff felt less like hiring a consultancy and more 
          like gaining a thought partner. They helped us redefine our entire 
          service flow."
        </p>
        <div class="testimonial-author">
          <img src="placeholder-avatar.jpg" alt="Client photo">
          <div>
            <div class="author-name">Jane Smith</div>
            <div class="author-title">CEO, TechCorp</div>
          </div>
        </div>
      </div>
      
      <!-- Testimonial 2 -->
      <div class="testimonial-card">
        <p class="testimonial-quote">
          "They didn't just clarify our messaging — they clarified our business. 
          Our onboarding, pricing, and content all finally speak the same language."
        </p>
        <div class="testimonial-author">
          <img src="placeholder-avatar.jpg" alt="Client photo">
          <div>
            <div class="author-name">John Doe</div>
            <div class="author-title">Founder, StartupCo</div>
          </div>
        </div>
      </div>
      
      <!-- Testimonial 3 -->
      <div class="testimonial-card">
        <p class="testimonial-quote">
          "The frameworks they provided helped us align what we do with how it's 
          understood. Game-changing clarity."
        </p>
        <div class="testimonial-author">
          <img src="placeholder-avatar.jpg" alt="Client photo">
          <div>
            <div class="author-name">Sarah Johnson</div>
            <div class="author-title">Director, InnovateLabs</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Styling

```css
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-top: 64px;
}

.testimonial-card {
  background: rgba(240, 240, 240, 0.05);
  border-radius: 12px;
  padding: 32px;
  transition: all 0.4s ease;
}

.testimonial-card:hover {
  background: rgba(240, 240, 240, 0.08);
  transform: translateY(-4px);
}

.testimonial-quote {
  font-family: 'Inter';
  font-size: 16px;
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 24px;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 16px;
}

.testimonial-author img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-family: 'Figtree';
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
}

.author-title {
  font-family: 'Inter';
  font-size: 12px;
  opacity: 0.6;
}
```

---

## Section 08: The Good Stuff

### Layout

```
Background: #000000
Padding: 160px vertical
Max-width: 1440px centered
This section unifies: Newsletter signup + Featured Articles + Podcasts + Highlights
```

### Structure

```html
<section class="section-good-stuff">
  <div class="section-container">
    <!-- Newsletter Intro -->
    <div class="good-stuff-header">
      <h3 class="section-eyebrow">THE GOOD STUFF</h3>
      <h2>We share our experiences working with AI</h2>
      <p>
        How it's changing the rules of work and business, the economy, 
        entrepreneurship, and human potential.
      </p>
      
      <!-- Newsletter Signup -->
      <div class="newsletter-form">
        <input type="email" placeholder="Enter your email">
        <button class="btn-primary">Join Marginal Gains Club</button>
      </div>
    </div>
    
    <!-- Featured Articles -->
    <div class="content-section">
      <h3 class="content-section-title">Featured Articles</h3>
      
      <div class="articles-grid">
        <!-- Article Card (repeat 6x) -->
        <article class="content-card">
          <img src="placeholder.jpg" alt="Article thumbnail">
          <h4>On the Business Model of AI</h4>
          <p class="card-meta">Pete Winn</p>
          <a href="#" class="card-link">Read more →</a>
        </article>
        
        <!-- More cards... -->
      </div>
    </div>
    
    <!-- Recent Podcasts -->
    <div class="content-section">
      <h3 class="content-section-title">Recent Podcasts</h3>
      
      <div class="podcasts-grid">
        <!-- Podcast Card (repeat 5x) -->
        <article class="content-card">
          <img src="placeholder.jpg" alt="Podcast thumbnail">
          <h4>From Zero to Vibe Coder</h4>
          <p class="card-meta">Pete Winn, Andy David</p>
          <a href="#" class="card-link">Listen now →</a>
        </article>
        
        <!-- More cards... -->
      </div>
    </div>
    
    <!-- Podcast Highlights -->
    <div class="content-section">
      <h3 class="content-section-title">Podcast Highlights</h3>
      
      <div class="highlights-grid">
        <!-- Video Card (repeat 3x) -->
        <article class="video-card">
          <div class="video-embed">
            <!-- Video player placeholder -->
            <div class="video-placeholder">
              <svg><!-- Play icon --></svg>
            </div>
          </div>
          <h4>Managing Multiple AI Agents on a Mac Mini</h4>
          <p class="card-meta">Pete Winn, Andy David</p>
        </article>
        
        <!-- More cards... -->
      </div>
    </div>
  </div>
</section>
```

### Styling

```css
.good-stuff-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 96px;
}

.newsletter-form {
  display: flex;
  gap: 16px;
  max-width: 500px;
  margin: 40px auto 0;
  flex-wrap: wrap;
  justify-content: center;
}

.newsletter-form input {
  flex: 1;
  min-width: 250px;
  height: 40px;
  padding: 0 16px;
  border-radius: 4px;
  background: rgba(240, 240, 240, 0.05);
  border: 1px solid rgba(240, 240, 240, 0.15);
  color: #F0F0F0;
  font-family: 'Inter';
  font-size: 14px;
}

.content-section {
  margin-top: 96px;
}

.content-section-title {
  font-family: 'Figtree';
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 32px;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
}

.podcasts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
}

.content-card {
  background: rgba(240, 240, 240, 0.05);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.4s ease;
}

.content-card:hover {
  background: rgba(240, 240, 240, 0.08);
  transform: translateY(-4px);
}

.content-card img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.content-card h4 {
  font-family: 'Figtree';
  font-size: 18px;
  font-weight: 700;
  padding: 16px 16px 8px;
}

.card-meta {
  font-size: 12px;
  opacity: 0.6;
  padding: 0 16px 16px;
}

.card-link {
  display: inline-block;
  padding: 0 16px 16px;
  font-size: 14px;
  color: #F0F0F0;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.card-link:hover {
  transform: translateX(4px);
}

.video-card {
  background: rgba(240, 240, 240, 0.05);
  border-radius: 8px;
  overflow: hidden;
}

.video-embed {
  aspect-ratio: 16 / 9;
  background: rgba(240, 240, 240, 0.1);
  position: relative;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.video-placeholder svg {
  width: 64px;
  height: 64px;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.video-placeholder:hover svg {
  opacity: 1;
  transform: scale(1.1);
}
```

---

## Section 09: Footer

### Structure

```html
<footer class="footer">
  <div class="footer-container">
    <!-- Top Section -->
    <div class="footer-top">
      <div class="footer-logo">OTHER STUFF</div>
      <div class="footer-tagline">
        Artificial Intelligence is a new dawn for human flourishing
      </div>
    </div>
    
    <!-- Links Grid -->
    <div class="footer-links">
      <div class="footer-column">
        <h4>Services</h4>
        <a href="#">Workshops</a>
        <a href="#">Consulting</a>
        <a href="#">Speaking</a>
      </div>
      
      <div class="footer-column">
        <h4>Products</h4>
        <a href="#">Wingman</a>
        <a href="#">Coming Soon</a>
      </div>
      
      <div class="footer-column">
        <h4>Media</h4>
        <a href="#">Articles</a>
        <a href="#">Podcasts</a>
        <a href="#">Newsletter</a>
      </div>
      
      <div class="footer-column">
        <h4>Company</h4>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Careers</a>
      </div>
    </div>
    
    <!-- Bottom Section -->
    <div class="footer-bottom">
      <div class="footer-legal">
        <p>© 2025 Other Stuff Pty Ltd. All rights reserved.</p>
        <div class="footer-legal-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
      
      <div class="footer-social">
        <a href="#" aria-label="YouTube">YT</a>
        <a href="#" aria-label="LinkedIn">LI</a>
        <a href="#" aria-label="X">X</a>
      </div>
      
      <div class="footer-info">
        <p>Other Stuff Pty Ltd</p>
        <p>ABN 20 682 110 970</p>
        <p>City Beach WA 6015</p>
        <p>info@otherstuff.studio</p>
      </div>
    </div>
  </div>
</footer>
```

### Styling

```css
.footer {
  background: #000000;
  border-top: 1px solid rgba(240, 240, 240, 0.1);
  padding: 80px 0 40px;
}

.footer-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 80px);
}

.footer-top {
  margin-bottom: 64px;
}

.footer-logo {
  font-family: 'Alfabet';
  font-weight: 900;
  font-size: 24px;
  margin-bottom: 16px;
}

.footer-tagline {
  font-size: 14px;
  opacity: 0.6;
  max-width: 600px;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 48px;
  margin-bottom: 64px;
}

.footer-column h4 {
  font-family: 'Figtree';
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 16px;
}

.footer-column a {
  display: block;
  font-size: 12px;
  color: rgba(240, 240, 240, 0.6);
  text-decoration: none;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.footer-column a:hover {
  color: #F0F0F0;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 40px;
  border-top: 1px solid rgba(240, 240, 240, 0.1);
  flex-wrap: wrap;
  gap: 32px;
}

.footer-legal p {
  font-size: 11px;
  opacity: 0.4;
  margin-bottom: 8px;
}

.footer-legal-links {
  display: flex;
  gap: 16px;
}

.footer-legal-links a {
  font-size: 11px;
  color: rgba(240, 240, 240, 0.4);
  text-decoration: none;
}

.footer-social {
  display: flex;
  gap: 16px;
}

.footer-social a {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(240, 240, 240, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: #F0F0F0;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-social a:hover {
  background: rgba(240, 240, 240, 0.1);
  transform: translateY(-2px);
}

.footer-info p {
  font-size: 11px;
  opacity: 0.4;
  margin-bottom: 4px;
}
```

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-18  
**Status:** Ready for Development
