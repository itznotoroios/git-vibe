# ADR-002: Industrial Brutalist Design System for Profile Cards

## Status
Accepted

## Date
2026-10-04

## Context
We need a design system for git-vibe profile cards that:
- Stands out from generic "AI aesthetic" SaaS cards
- Reflects the tactical/brutalist brand identity
- Works in both light and dark mode
- Is accessible (WCAG 2.1 AA)
- Performs well (CSS-only animations, no JS frameworks)
- Distinguishes from generic developer tools

## Decision
Adopt Industrial Brutalist / Tactical Telemetry design system based on:
- Swiss Industrial Print aesthetic (light mode)
- Tactical Telemetry / CRT Terminal aesthetic (dark mode)
- Anton + JetBrains Mono typography
- Hazard Red (#E61919) as sole accent color
- Visible borders, zero border-radius, rigid grids
- CRT scanline + noise texture overlays

## Alternatives Considered

### Generic SaaS Aesthetic (Purple gradients, rounded cards)
- Pros: Familiar, "safe"
- Cons: AI-generated look, indistinguishable from 1000 other tools
- Rejected: Violates brand differentiation

### Minimalist Clean (Inter, white space, subtle)
- Pros: Clean, readable
- Cons: Boring, no personality, no differentiation
- Rejected: Not distinctive enough for viral sharing

### Glassmorphism/Frosted Glass
- Pros: Trendy, premium feel
- Cons: Performance issues, accessibility problems, overused
- Rejected: Accessibility and performance concerns

## Design Tokens

### Light Mode (Swiss Industrial Print)
- Background: `#F4F4F0` (unbleached paper)
- Ink: `#050505` (carbon)
- Red: `#E61919` (hazard red)
- Border: `#050505`
- Shell: `#E8E8E3`

### Dark Mode (Tactical Telemetry)
- Background: `#0A0A0A` (deactivated CRT)
- Ink: `#EAEAEA` (white phosphor)
- Red: `#FF2A2A` (hazard red)
- Green: `#4AF626` (terminal green)
- Yellow: `#FFD700` (warning)
- Border: `#EAEAEA`
- Card: `#121212`
- Shell: `#1A1A1A`

### Typography
- Display: `Anton`, sans-serif (clamp 48px-96px)
- Body: `JetBrains Mono`, monospace
- UI: `JetBrains Mono`, monospace

### Visual Effects
- CRT scanlines: `repeating-linear-gradient(0deg, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)`
- Noise: SVG fractal noise filter at 3% opacity (light) / 5% (dark)
- Hazard stripe: `repeating-linear-gradient(45deg, red 10px, ink 10px, ink 20px)`

## Consequences
- ✅ Distinctive brand identity
- ✅ High contrast for accessibility
- ✅ CSS-only animations (no JS animation libraries)
- ✅ Works without JS for core content
- ✅ Distinctive from all competitors
- ⚠️ Not for everyone (polarizing aesthetic)
- ⚠️ Requires careful color contrast testing
- ⚠️ Heavy CSS may need purging for production

## Implementation Notes
- Use CSS custom properties for theming
- Scope styles to `.card` container
- Use `@media (prefers-color-scheme: dark)` for auto-detection
- Provide manual toggle with localStorage persistence
- All animations use `transform` and `opacity` only (GPU-safe)