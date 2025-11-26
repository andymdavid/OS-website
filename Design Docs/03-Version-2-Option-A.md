# Version 2 - Option A (Compressed Flow)

Optimized page specification prioritizing SME owner attention spans.

---

## Page Structure Overview

```
01. NAVIGATION (Fixed Header)
02. HERO (ATF - Above The Fold)
03. THE NEW OPERATING SYSTEM (Combined with Price of Intelligence)
04. HOW WE CAN HELP (Funnel Section - MOVED UP)
05. WHY IT WORKS (Combined "Take Advantage" concepts)
    [CHATBOT TRIGGERS AFTER THIS SECTION]
06. TESTIMONIALS
07. THE GOOD STUFF (Unified: Newsletter + Articles + Podcasts + Highlights)
08. FOOTER
```

**Key Changes from Version 1:**
- Compressed philosophy sections (2→1)
- Moved funnel section earlier (position 4 vs position 6)
- Combined "Take Advantage" into supporting evidence section
- Gets to "what we do" 40% faster

---

## Section 01: Navigation

```
IDENTICAL TO VERSION 1
(See Version 1 specification)
```

---

## Section 02: Hero (ATF)

```
IDENTICAL TO VERSION 1
(See Version 1 specification)
```

---

## Section 03: The New Operating System (COMBINED)

### Layout

```
Background: #000000
Padding: 160px vertical (desktop)
Max-width: 1200px centered
```

### Structure

```html
<section class="section-operating-system-combined">
  <div class="section-container">
    <h3 class="section-eyebrow">THE NEW OPERATING SYSTEM</h3>
    
    <h2>Intelligence is now abundant — and the cost is collapsing.</h2>
    
    <p>
      Historically, intelligence was scarce. The only way to access more 
      intelligence — the capacity to sense, decide, and act — was to hire more 
      people. Every marginal unit came packaged inside a full-time salary, 
      benefits, and management overhead.
    </p>
    
    <p>
      Now intelligence is abundant. Analysis, language, and code are instantly 
      available. The price of cognition — the cost of a decision or a line of 
      code — is plummeting. Intelligence itself is becoming modular, fluid, 
      and ambient.
    </p>
    
    <p>
      The companies that thrive will be those who learn to orchestrate this new 
      energy — assembling human and artificial intelligence in new configurations 
      at near-zero marginal cost. Where intelligence flows where it's needed most, 
      and smaller teams achieve what once took entire enterprises.
    </p>
    
    <div class="section-cta">
      <button class="btn-secondary">Explore Workshops</button>
      <a href="#" class="link-arrow">Read - Abundant Intelligence →</a>
    </div>
  </div>
</section>
```

### Styling

```css
/* Uses same styling as Version 1 philosophy sections */
.section-operating-system-combined {
  background: #000000;
  padding: clamp(64px, 10vw, 160px) 0;
}

/* All other styles match Version 1 Section 03 */
```

### Animation

```
Same scroll-triggered animations as Version 1
```

### Content Notes

```
This section COMBINES:
- "The New Operating System" core message
- "The Price of Intelligence" economic framing
- Result: Single, punchy section establishing the landscape
- Philosophy depth lives in linked articles
```

---

## Section 04: How We Can Help (MOVED UP)

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
    
    <h2>Your path from education to implementation</h2>
    
    <p>
      We build with Knowledge Graphs, Language Models, and AI Agents — 
      technologies that reshape how intelligence moves through a business. 
      Through a series of workshops, we help SME businesses leverage AI to 
      augment and enhance the skills of your people.
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

```
IDENTICAL TO VERSION 1 FUNNEL SECTION
(See Version 1, Section 06 for complete CSS)
```

### Strategic Notes

```
POSITIONING CHANGE:
- Version 1: Section 6 (after 4 philosophy sections)
- Version 2: Section 4 (after 1 philosophy section)

WHY THIS WORKS:
- SME owners see "what we do" while interest is high
- Philosophy becomes supporting evidence, not barrier to entry
- Reduces scroll depth to primary value proposition by 40%
- Maintains thought leadership without exhausting attention
```

---

## Section 05: Why It Works

### Layout

```
Background: #000000
Padding: 160px vertical
Max-width: 1200px centered
```

### Structure

```html
<section class="section-why-it-works">
  <div class="section-container">
    <h3 class="section-eyebrow">WHY IT WORKS</h3>
    
    <h2>Design for flow — where intelligence moves freely to create leverage.</h2>
    
    <p>
      Your advantage comes from how quickly you can turn insight into action, 
      automate the repeatable, and scale what makes you unique. The result is 
      leverage: faster innovation, lower operating costs, and a business that 
      grows smarter every time it moves.
    </p>
    
    <p>
      As intelligence flows freely across teams, the gap between signal and 
      response closes. Leaders get more visibility, faster feedback, and 
      higher-fidelity information. Human attention gets reallocated to what 
      can't be automated — creativity, judgement, relationships, and taste.
    </p>
    
    <div class="section-cta">
      <a href="#" class="link-arrow">Read - Designing for Flow →</a>
    </div>
  </div>
</section>
```

### Styling

```css
/* Same styling pattern as other philosophy sections */
.section-why-it-works {
  background: #000000;
  padding: clamp(64px, 10vw, 160px) 0;
}

/* Slightly less padding than earlier sections */
/* This is supporting evidence, not primary message */
```

### Strategic Notes

```
POSITIONING:
- Appears AFTER funnel
- Acts as validation/proof rather than barrier

CONTENT:
- Shortened from "How to Take Advantage" section
- More direct, action-oriented language
- Links to deep dive for interested readers

PURPOSE:
- Reinforces "why now" without repeating philosophy
- Keeps momentum toward conversion actions
```

---

## Section 06: Testimonials

```
IDENTICAL TO VERSION 1
(See Version 1, Section 07 for complete specification)
```

---

## Section 07: The Good Stuff

```
IDENTICAL TO VERSION 1
(See Version 1, Section 08 for complete specification)
```

---

## Section 08: Footer

```
IDENTICAL TO VERSION 1
(See Version 1, Section 09 for complete specification)
```

---

## Version 2 Summary

### Structure Comparison

| Version 1 (Current) | Version 2 (Option A) |
|---------------------|----------------------|
| 1. Hero | 1. Hero |
| 2. Price of Intelligence | 2. New OS (Combined) |
| 3. New Operating System | 3. How We Can Help ⬆️ |
| 4. Take Advantage | 4. Why It Works ⬇️ |
| 5. How We Can Help | 5. Testimonials |
| 6. Testimonials | 6. The Good Stuff |
| 7. The Good Stuff | 7. Footer |
| 8. Footer | |

### Key Metrics

```
Scroll depth to funnel:
- Version 1: ~400vh (4 full viewports)
- Version 2: ~250vh (2.5 full viewports)
- Improvement: 37.5% reduction

Philosophy word count:
- Version 1: ~600 words before funnel
- Version 2: ~300 words before funnel
- Improvement: 50% reduction in pre-funnel reading

Time to value:
- Version 1: 90-120 seconds of reading
- Version 2: 45-60 seconds of reading
- Improvement: 50% faster to "what we do"
```

### Design Principle

```
"Show them the path while interest is high. 
Let deep philosophy live where it belongs: 
in the content they subscribe to."
```

### Testing Recommendation

```
Deploy both versions and measure:
1. Scroll depth to funnel section
2. Newsletter signup conversion rate
3. Time on page
4. Bounce rate at each section
5. Heatmap click patterns

Run for 2-4 weeks with 50/50 traffic split
```

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-18  
**Status:** Ready for Development
