# Design System

Complete design tokens and specifications for the Other Stuff website.

---

## Typography

### Font Families

```css
/* Primary Fonts */
--font-heading: 'Figtree', sans-serif;
--font-eyebrow: 'Silkscreen', monospace;
--font-body: 'Inter', sans-serif;
--font-ui: 'Alfabet', sans-serif;

/* Font Weights */
--weight-regular: 400;
--weight-bold: 700;
--weight-black: 900;
```

### Type Scale

#### H1 - Main Headlines
```css
font-family: 'Figtree';
font-weight: 700 (Bold);
font-size: 50px; /* Desktop base */
line-height: 0.9;
letter-spacing: -0.05em;
color: #F0F0F0;

/* Responsive Scaling */
@1920px+: 50px
@1440px: 45px
@768px: 35px
@375px: 28px
```

#### H2 - Section Headings
```css
font-family: 'Figtree';
font-weight: 700 (Bold);
font-size: 35px; /* Desktop base */
line-height: 0.9;
letter-spacing: -0.05em;
color: #F0F0F0;

/* Responsive Scaling */
@1920px+: 35px
@1440px: 32px
@768px: 26px
@375px: 22px
```

#### H3 - Eyebrows/Labels
```css
font-family: 'Silkscreen';
font-weight: 400 (Regular);
font-size: 14px; /* Desktop base */
letter-spacing: 0;
text-transform: uppercase;
color: #F0F0F0;

/* Responsive Scaling */
@1920px+: 14px
@1440px: 14px
@768px: 13px
@375px: 12px
```

#### P1 - Body Text
```css
font-family: 'Inter';
font-weight: 400 (Regular);
font-size: 14px; /* All screens */
line-height: 1.3;
letter-spacing: 0;
color: #F0F0F0;

/* Max-width for readability */
max-width: 65ch;
```

#### Menu Items
```css
font-family: 'Alfabet';
font-weight: 400 (Regular);
font-size: 11px;
color: #F0F0F0;
text-transform: uppercase;
```

#### Logo
```css
font-family: 'Alfabet';
font-weight: 900 (Black);
font-size: 14px;
line-height: 1.4;
letter-spacing: 0;
color: #F0F0F0;
```

---

## Color System

### Base Colors

```css
/* Primary */
--color-background: #000000; /* Pure black */
--color-text: #F0F0F0; /* Off-white */

/* Gradient (Hero Section) */
--gradient-hero: linear-gradient(180deg, 
  #5B4A9E 0%,    /* Purple top */
  #E67E50 100%   /* Orange bottom */
);

/* UI States */
--color-hover: rgba(240, 240, 240, 0.8);
--color-disabled: rgba(240, 240, 240, 0.4);
--color-border: rgba(240, 240, 240, 0.15);
```

### Usage Guidelines

- **Background:** Always #000000
- **Text:** Always #F0F0F0 for maximum contrast
- **Gradient:** Only in hero section
- **Borders:** Use sparingly, rgba(240, 240, 240, 0.15) for subtle dividers

---

## Spacing System

### Base Unit: 8px

```css
--space-1: 8px;
--space-2: 16px;
--space-3: 24px;
--space-4: 32px;
--space-5: 40px;
--space-6: 48px;
--space-7: 56px;
--space-8: 64px;
--space-10: 80px;
--space-12: 96px;
--space-16: 128px;
--space-20: 160px;
```

### Section Spacing

```css
/* Vertical spacing between sections */
--section-spacing-desktop: 160px;
--section-spacing-tablet: 96px;
--section-spacing-mobile: 64px;

/* Content padding within sections */
--content-padding-desktop: 80px;
--content-padding-tablet: 48px;
--content-padding-mobile: 24px;
```

---

## Layout Grid

### Container Widths

```css
/* Max content width */
--container-max: 1440px;
--container-content: 1200px;
--container-text: 800px;

/* Side padding */
--container-padding: clamp(24px, 5vw, 80px);
```

### Column Grid

```css
/* 12-column grid for desktop */
--grid-columns: 12;
--grid-gap: 24px;

/* Responsive adjustments */
@1440px+: 12 columns
@1024px: 8 columns
@768px: 4 columns
@375px: 4 columns (tighter gap: 16px)
```

---

## Buttons

### Primary Button

```css
/* Default State */
width: 135px;
height: 27px;
border-radius: 4px;
background: #F0F0F0;
color: #000000;
font-family: 'Alfabet';
font-size: 11px;
font-weight: 400;
text-transform: uppercase;
border: none;
cursor: pointer;
transition: all 0.3s ease;

/* Hover State */
background: rgba(240, 240, 240, 0.8);
transform: translateY(-1px);
box-shadow: 0 4px 12px rgba(240, 240, 240, 0.2);

/* Active State */
transform: translateY(0);
```

### Secondary Button (Outline)

```css
/* Default State */
width: 135px;
height: 27px;
border-radius: 4px;
background: transparent;
color: #F0F0F0;
border: 1px solid #F0F0F0;
font-family: 'Alfabet';
font-size: 11px;
font-weight: 400;
text-transform: uppercase;
cursor: pointer;
transition: all 0.3s ease;

/* Hover State */
background: rgba(240, 240, 240, 0.1);
border-color: rgba(240, 240, 240, 0.8);
transform: translateY(-1px);

/* Active State */
transform: translateY(0);
```

---

## Cards

### Article/Podcast Card

```css
/* Container */
background: rgba(240, 240, 240, 0.05);
border-radius: 8px;
padding: 24px;
transition: all 0.4s ease;

/* Hover State */
background: rgba(240, 240, 240, 0.08);
transform: translateY(-4px);
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);

/* Image */
aspect-ratio: 16 / 9;
border-radius: 4px;
overflow: hidden;
margin-bottom: 16px;

/* Title */
font-family: 'Figtree';
font-size: 18px;
font-weight: 700;
line-height: 1.3;
margin-bottom: 8px;

/* Meta */
font-family: 'Inter';
font-size: 12px;
color: rgba(240, 240, 240, 0.6);
```

### Testimonial Card

```css
/* Container */
background: rgba(240, 240, 240, 0.05);
border-radius: 12px;
padding: 32px;
max-width: 400px;

/* Quote */
font-family: 'Inter';
font-size: 16px;
line-height: 1.5;
margin-bottom: 24px;
font-style: italic;

/* Author Section */
display: flex;
align-items: center;
gap: 16px;

/* Author Image */
width: 48px;
height: 48px;
border-radius: 50%;
object-fit: cover;

/* Author Name */
font-family: 'Figtree';
font-size: 14px;
font-weight: 700;

/* Author Title */
font-family: 'Inter';
font-size: 12px;
color: rgba(240, 240, 240, 0.6);
```

---

## Forms

### Input Field

```css
/* Default State */
height: 40px;
padding: 0 16px;
border-radius: 4px;
background: rgba(240, 240, 240, 0.05);
border: 1px solid rgba(240, 240, 240, 0.15);
color: #F0F0F0;
font-family: 'Inter';
font-size: 14px;
transition: all 0.3s ease;

/* Focus State */
border-color: #F0F0F0;
background: rgba(240, 240, 240, 0.08);
outline: none;

/* Placeholder */
color: rgba(240, 240, 240, 0.4);
```

---

## Breakpoints

```css
/* Mobile First Approach */
--breakpoint-mobile: 375px;
--breakpoint-tablet: 768px;
--breakpoint-laptop: 1024px;
--breakpoint-desktop: 1440px;
--breakpoint-xl: 1920px;

/* Media Query Usage */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Laptop */ }
@media (min-width: 1440px) { /* Desktop */ }
@media (min-width: 1920px) { /* XL Desktop */ }
```

---

## Z-Index Scale

```css
--z-base: 0;
--z-content: 10;
--z-nav: 100;
--z-chatbot: 200;
--z-modal: 300;
--z-tooltip: 400;
```

---

## Animation Timing

```css
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
```

---

## Accessibility

### Focus Indicators

```css
/* Visible focus ring for keyboard navigation */
*:focus-visible {
  outline: 2px solid #F0F0F0;
  outline-offset: 2px;
}
```

### Minimum Touch Targets

```css
/* All interactive elements minimum 44x44px */
min-height: 44px;
min-width: 44px;
```

### Color Contrast

- Background #000000 and Text #F0F0F0 = **18.8:1 ratio** (AAA compliant)

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-18
