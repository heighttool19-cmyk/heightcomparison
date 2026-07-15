# Height Comparison Tool — Design System & Style Guide (`DESIGN.md`)

This document outlines the design system, styling structures, color tokens, layout specifications, and animation physics used throughout the **Height Comparison Tool**.

---

## 🎨 1. Design Philosophy

The application follows a premium, tactile, and interactive aesthetic (Dark Mode by default). Key pillars include:
*   **Rich Aesthetics**: Deep, refined dark palettes with bright, high-contrast indicators.
*   **High-Quality Tactility**: Subtle micro-interactions, smooth hover transitions, and instant physical scaling feedback when clicking interactive elements.
*   **Theme Continuity**: Transitions between Light and Dark mode are animated smoothly using CSS transition properties over a `0.5s` cubic-bezier duration.
*   **Export-Proof Render Slices**: Special layouts and layers that hide control buttons automatically during canvas PNG/JPEG generation.

---

## 🅰️ 2. Typography

The design specifies high-quality modern sans-serif and monospaced typography using Google Fonts loaded in `src/app/layout.tsx`:
*   **Primary Sans-Serif Font**: **Plus Jakarta Sans** (fallback: **Inter**, system `sans-serif`)
    *   *Usage*: Headings, cards, form inputs, dashboard labels.
    *   *Weights*: `400` (Regular), `500` (Medium), `600` (Semi-Bold), `700` (Bold), `800` (Extra Bold).
*   **Secondary Monospace Font**: **JetBrains Mono** (fallback: system `monospace`)
    *   *Usage*: Measurements, units (cm/ft/in/lbs), scales, and diagnostic values.

---

## 🎨 3. Color Tokens & Theme Systems

All colors are controlled dynamically via CSS variables declared in `src/app/globals.css` and mapped to Tailwind v4 theme utility classes (`bg-bg`, `text-foreground`, `border-border`, etc.).

### A. Refined Dark Theme (Default)
In Dark Mode, the primary focus color is a vibrant **Emerald Green** (`--accent`), combined with deep carbon surface layers.

```css
:root, [data-theme="dark"] {
  --bg: #101011;                  /* Base viewport background */
  --surface: #121214;             /* Surface cards and panels */
  --canvas: #121214;              /* Visualizer dashboard background */
  --border: #2f2f33ff;            /* Clean borders */
  --accent: #0DBA58;              /* Primary green accent color */
  --accent-secondary: #2563EB;    /* Royal blue highlight helper */
  --accent-alpha: rgba(13, 186, 88, 0.4);
  --foreground: #FAFAFA;          /* Clear white text */
  --muted: #A1A1AA;               /* Secondary text */
  --ruler-text: #52525B;          /* Subtle numbers on height rulers */
  --baseline: #EF4444;            /* Red laser indicator */
  --toolbar-bg: #0DBA58;
  --toolbar-foreground: #09090b;
}
```

### B. Refined Light Theme
In Light Mode, the primary focus shifts to a **Royal Blue** (`--accent`), combined with off-white backgrounds.

```css
[data-theme="light"] {
  --bg: #FAFAFA;                  /* Viewport background */
  --surface: #FFFFFF;             /* Panel backgrounds */
  --canvas: #F4F4F5;              /* Ruler/dashboard background */
  --border: #E4E4E7;              /* Thin borders */
  --accent: #1D4ED8;              /* Primary blue accent */
  --accent-secondary: #1D4ED8;
  --foreground: #09090B;          /* Deep gray text */
  --muted: #52525B;               /* Secondary body text */
  --ruler-text: #A1A1AA;
  --baseline: #EF4444;            /* Red indicator line */
  --toolbar-bg: rgba(255, 255, 255, 0.8);
  --toolbar-foreground: var(--accent);
}
```

---

## 📐 4. Sizing & Layout Scales

### A. Rounded Corners (`Border Radius`)
Consistent rounded borders help establish a friendly, premium feel:
*   `--radius-sm`: `0.5rem` (8px) — Buttons, badges, and small controls.
*   `--radius-md`: `0.75rem` (12px) — Input boxes, toggle bars, and dropdown menus.
*   `--radius-lg`: `1rem` (16px) — Sidebar elements, preview blocks.
*   `--radius-xl`: `1.5rem` (24px) — Custom card items, calibration boxes, modal overlays.
*   `--radius-2xl`: `2rem` (32px) — Outer page blocks.

### B. Responsive Panels
*   **Image to Height Tool**: Sized to a max-width of `55%` on screen sizes $\ge 768\text{px}$ (medium and above) to prevent layout stretching.
*   **Main Dashboard Dashboard Canvas**: Set to `100%` width and exactly `92svh` (short viewport height) for optimal display on mobile screens and desktops.

---

## 🧩 5. Custom Styling Components

### A. Glassmorphism Surface (`.glass-surface`)
Combines alpha color-mixing with a high backdrop filter to create a frosted glass look:
```css
.glass-surface {
  background: color-mix(in srgb, var(--surface) 80%, transparent);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
}
```

### B. Measurement Chart Grid (`.chart-grid`)
Used on the visualization canvas to render mathematical grid lines at `40px` intervals:
```css
.chart-grid {
  background-image: linear-gradient(var(--grid-color) 1px, transparent 1px),
                    linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
  background-size: 40px 40px;
}
```
*   `--grid-color` is set to `rgba(255, 255, 255, 0.03)` (dark mode) and `rgba(0, 0, 0, 0.03)` (light mode) for a clean, non-obtrusive grid layout.

### C. Neon Laser Indicator (`.neon-indicator`)
Renders a glowing horizontal measurement line matching the selected theme's accent color:
```css
.neon-indicator {
  background-color: var(--accent);
  box-shadow: 0 0 2px 0px var(--accent),
              0 0 6px 1px color-mix(in srgb, var(--accent) 40%, transparent);
}
```

### D. Empty Silhouette Door Slot (`.empty-door`)
Renders a dashed reference door:
```css
.empty-door {
  width: clamp(100px, 30vw, 140px);
  height: clamp(160px, 45vw, 220px);
  border: 3px dashed var(--border);
  border-radius: 1.5rem;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.02));
}
```

---

## 🎬 6. Interactive Physics & Motion

### A. Tactile Click Feedback
All interactive elements (buttons, links, active options) compress slightly when clicked, simulating physical depth.
*   **Scale Compression**: Scales down to `96%` (`transform: scale(0.96)`) on click.
*   **Brightness Increase**: Elevates brightness by `10%` on click.
*   **Accent Glow Outline**: Creates a focus ring matching `--accent-alpha`.
*   **Interpolation**: Standard state shifts are eased via:
    `transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)` (creates a bouncy, high-quality spring feel).

### B. Button Glow Pulse (`.btn-glow`)
Triggering calculation outcomes flashes a ring outwards to guide the user's attention:
```css
@keyframes btn-click-pulse {
  0% { box-shadow: 0 0 0 0 var(--accent-alpha); }
  100% { box-shadow: 0 0 0 12px transparent; }
}
```

---

## 💾 7. Export Layer Optimization

To allow users to export clean pictures of their custom height comparison charts without dashboard interface clutter, the tool implements an export-layer state:
*   Classes marked `.hide-on-export` transition opacity and display parameters.
*   When rendering the canvas to a downloadable image, `document.body` is flagged with `.is-capturing`.
*   CSS rule:
    ```css
    body.is-capturing .hide-on-export {
      display: none !important;
    }
    ```
