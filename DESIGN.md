---
name: Certael Public Website
description: A precise public product and documentation system for a server-authoritative security platform.
colors:
  canvas: "oklch(0.13 0.012 285)"
  surface: "oklch(0.17 0.014 285)"
  raised: "oklch(0.205 0.018 285)"
  line: "oklch(0.31 0.018 285)"
  ink: "oklch(0.96 0.008 285)"
  secondary-ink: "oklch(0.79 0.018 285)"
  muted-ink: "oklch(0.66 0.02 285)"
  assurance: "oklch(0.72 0.17 291)"
  link: "oklch(0.79 0.12 228)"
  warning: "oklch(0.79 0.13 78)"
  failure: "oklch(0.72 0.17 24)"
  legacy-ink: "#f3f2ff"
  legacy-assurance: "#8b7cff"
  legacy-link: "#54c8ff"
  legacy-blue: "#697cff"
  legacy-violet-soft: "#b7adff"
  legacy-muted: "#9793a8"
  legacy-violet-pale: "#d6d2ff"
  legacy-danger-muted: "#a8848b"
  legacy-danger-bright: "#ffa0aa"
  assurance-focus: "rgb(139 124 255 / .35)"
  assurance-wash: "rgb(100 82 240 / .12)"
  assurance-faint: "rgb(139 124 255 / .055)"
  warning-faint: "rgb(242 183 99 / .055)"
typography:
  display:
    fontFamily: "Aptos Display, Segoe UI Variable Display, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 560
  body:
    fontFamily: "Aptos, Segoe UI Variable Text, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
  code:
    fontFamily: "Cascadia Code, SFMono-Regular, Consolas, ui-monospace, monospace"
    fontWeight: 400
rounded:
  control: "6px"
  compact: "7px"
  standard: "8px"
  soft: "9px"
  panel: "10px"
  panel-large: "12px"
  frame: "14px"
  feature: "15px"
  section: "16px"
  pill: "999px"
spacing:
  compact: "8px"
  standard: "12px"
  section: "24px"
  frame: "clamp(20px, 4vw, 52px)"
---

# Design System: Certael Public Website

## Direction

The approved direction is a dark technical publication with product confidence, not a simulated terminal or security-operations screen. A single violet assurance color marks verified paths; cyan is reserved for links and cross-references. Large type and ruled composition establish hierarchy without gradient text, decorative grids, glass panels, or fake metrics.

## Documentation composition

- Documentation uses a persistent category rail, a readable article column capped near 72 characters, and an on-page contents rail on wide screens.
- Mobile collapses navigation into semantic disclosure controls while preserving direct links and search.
- Code examples are real, copyable, horizontally scrollable, and labeled by purpose.
- Notes, warnings, and security boundaries use full bordered surfaces plus explicit labels; no colored side stripes.
- Related guides form short editorial link lists rather than repeated card grids.

## Interaction and motion

- Focus rings are always visible and at least two pixels thick.
- Navigation and search have complete hover, focus, active, empty, and no-result states.
- Motion is limited to short color, opacity, and transform transitions using an ease-out curve; reduced-motion users receive immediate state changes.
- Touch targets are at least 44 by 44 CSS pixels.

## Responsive behavior

- Desktop: three-column documentation shell where content permits.
- Tablet: category rail becomes a compact top index; article remains full width.
- Narrow: single column, wrapping breadcrumbs, scrollable code, and no horizontal page overflow.
- Text zoom to 200% preserves reading order and access to navigation and search.
