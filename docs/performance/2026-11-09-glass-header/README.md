# Restore glass header

Restore the original 30% dark tint and 9px backdrop blur after the solid-header change in PR #7. Keep the unprefixed backdrop-filter declaration last: the CSS optimiser otherwise emits only the WebKit-prefixed property and Chromium loses the blur.

Validated build/native HTML, lint, static-background and computed header styles at 390/1440px, navigation/keyboard/mocked signup, and mobile/desktop/no-JavaScript homepage and article checks. Screenshots show the header at the hero and over scrolling content. Static shader stills are unchanged.
