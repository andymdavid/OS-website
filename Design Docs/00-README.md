# Other Stuff Website - Design Documentation

## Project Overview

This documentation provides complete specifications for building the Other Stuff website in two versions for comparison:

- **Version 1 (Current):** Full narrative flow with extensive philosophy sections
- **Version 2 (Option A):** Compressed flow optimizing for SME owner attention spans

## Target Audience

**Primary:** SME (Small-Medium Enterprise) owners exploring AI implementation

## Business Model

AI education company with funnel:
1. **The Good Stuff** (Free content - podcasts, articles)
2. **Marginal Gains Club** (Paid tier - community, events, exclusive content)
3. **Workshops** (Paid - 1hr short form, 3-4hr half day)
4. **Wingman** (Product - AI operating system implementation)

## Documentation Structure

| File | Purpose |
|------|---------|
| `01-Design-System.md` | Core design tokens, typography, colors, spacing |
| `02-Version-1-Current.md` | Full specification for current narrative flow |
| `03-Version-2-Option-A.md` | Full specification for compressed flow |
| `04-Component-Library.md` | Reusable components (buttons, cards, forms) |
| `05-Animations-Interactions.md` | Scroll behaviors, transitions, micro-interactions |
| `06-Chatbot-Specification.md` | Detailed chatbot implementation |
| `07-Content-Placeholders.md` | Copy and image specifications |

## Build Priority

1. Build Version 1 first (current flow)
2. Build Version 2 (Option A)
3. Deploy both for visual comparison
4. Client will select winning version based on on-screen assessment

## Key Design Principles

- **Simplicity First:** Minimal, clean aesthetic
- **Generous Whitespace:** Let content breathe
- **Subtle Animations:** Fade-ins, smooth scrolling, gentle parallax
- **Mobile-First:** Responsive across all devices
- **Performance:** Fast load times, optimized assets

## Technical Stack Recommendations

- **Framework:** Plain HTML/CSS/JS or Next.js/React
- **Fonts:** Google Fonts (Figtree, Silkscreen, Inter, Alfabet)
- **Animation:** CSS transitions + Intersection Observer for scroll triggers
- **Chatbot:** Custom implementation with expand/collapse behavior

## Brand Identity

**Positioning:** AI education company helping SME owners navigate abundant intelligence

**Tone:** Thoughtful, philosophical, but practical and action-oriented

**Visual Language:** Dark background (#000000), light text (#F0F0F0), gradient accents (purple → orange)

## Next Steps

1. Review `01-Design-System.md` for core design tokens
2. Choose version to build first (recommend Version 1)
3. Reference `04-Component-Library.md` for reusable patterns
4. Implement sections sequentially from top to bottom
5. Add animations using `05-Animations-Interactions.md` specifications

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-18  
**Status:** Ready for Development
