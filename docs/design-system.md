# DualClaude Design System
**Version:** 1.0
**Owner:** Z (Phone Claude)
**Last Updated:** 2026-01-17

---

## Philosophy

The DualClaude visual identity embodies **dual perspective collaboration**. Every design choice reinforces the concept of two autonomous agents working in harmony.

### Core Principles
1. **Dualism**: Cyan (T) vs Orange (Z) - distinct but complementary
2. **Synchronization**: Visual rhythm suggesting real-time communication
3. **Clarity**: Information architecture optimized for developer audience
4. **Performance**: Mobile-first, respect bandwidth, instant perceived load
5. **Personality**: Playful but professional - we're showing off, but with substance

---

## Color System

### Primary Colors
```css
/* T (Windows Claude) - Cyan/Blue spectrum */
--t-primary: #00D9FF;      /* High-energy cyan - primary actions, headings */
--t-secondary: #0099CC;    /* Muted cyan - backgrounds, borders */
--t-accent: #66E5FF;       /* Light cyan - hover states, highlights */

/* Z (Phone Claude) - Orange/Warm spectrum */
--z-primary: #FF8C42;      /* Warm orange - primary actions, headings */
--z-secondary: #FF6B1A;    /* Deep orange - backgrounds, borders */
--z-accent: #FFAD7A;       /* Light orange - hover states, highlights */

/* Shared/Gradient */
--sync-gradient: linear-gradient(90deg, #00D9FF 0%, #FF8C42 100%);
```

### Neutrals
```css
--gray-50: #FAFAFA;        /* Lightest background */
--gray-100: #F4F4F5;       /* Card backgrounds */
--gray-200: #E4E4E7;       /* Borders */
--gray-300: #D4D4D8;       /* Disabled text */
--gray-400: #A1A1AA;       /* Muted text */
--gray-500: #71717A;       /* Secondary text */
--gray-600: #52525B;       /* Body text */
--gray-700: #3F3F46;       /* Dark card backgrounds */
--gray-800: #27272A;       /* Section backgrounds */
--gray-900: #18181B;       /* Page background */
--gray-950: #09090B;       /* Darkest background */
```

### Semantic Colors
```css
--success: #10B981;        /* Green - success states */
--warning: #F59E0B;        /* Amber - warnings */
--error: #EF4444;          /* Red - errors */
--info: #3B82F6;           /* Blue - informational */
```

### Usage Guidelines
- **T-colored elements**: Represent Windows Claude actions, code blocks, T's message bubbles
- **Z-colored elements**: Represent Phone Claude actions, responses, Z's message bubbles
- **Gradients**: Used for syncing states, connection indicators, shared elements
- **Neutrals**: Dark mode by default (gray-900 background), use gray-50-300 sparingly for contrast
- **Never use both T and Z colors on the same interactive element** (except gradients)

---

## Typography

### Font Families
```css
--font-sans: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

### Type Scale
```css
/* Display (large hero text) */
--text-7xl: 4.5rem;   /* 72px - Hero headlines */
--text-6xl: 3.75rem;  /* 60px - Page titles */
--text-5xl: 3rem;     /* 48px - Section headers */

/* Headings */
--text-4xl: 2.25rem;  /* 36px - h1 */
--text-3xl: 1.875rem; /* 30px - h2 */
--text-2xl: 1.5rem;   /* 24px - h3 */
--text-xl: 1.25rem;   /* 20px - h4 */

/* Body */
--text-lg: 1.125rem;  /* 18px - Large body, intro paragraphs */
--text-base: 1rem;    /* 16px - Default body */
--text-sm: 0.875rem;  /* 14px - Secondary text, captions */
--text-xs: 0.75rem;   /* 12px - Tiny labels, metadata */
```

### Font Weights
```css
--font-light: 300;     /* Rare use - decorative */
--font-normal: 400;    /* Body text */
--font-medium: 500;    /* Subheadings, emphasis */
--font-semibold: 600;  /* Buttons, strong headings */
--font-bold: 700;      /* Hero text, calls-to-action */
```

### Line Heights
```css
--leading-tight: 1.25;   /* Headings */
--leading-snug: 1.375;   /* Subheadings */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.625; /* Long-form content */
--leading-loose: 2;      /* Sparse text blocks */
```

### Usage Patterns
```jsx
/* Hero Headline */
<h1 className="text-6xl font-bold leading-tight">
  <span className="text-t-primary">Dual</span>
  <span className="text-z-primary">Claude</span>
</h1>

/* Section Heading */
<h2 className="text-3xl font-semibold text-gray-100 mb-4">
  How It Works
</h2>

/* Body Text */
<p className="text-base text-gray-400 leading-relaxed">
  Two Claude instances communicate via file synchronization...
</p>

/* Code/Technical Text */
<code className="font-mono text-sm text-t-accent bg-gray-800 px-2 py-1 rounded">
  from-windows.md
</code>
```

---

## Spacing System

### Base Unit: 0.25rem (4px)

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### Component Spacing Patterns
```jsx
/* Card Padding */
className="p-6 sm:p-8 lg:p-10"  /* Responsive padding */

/* Section Margins */
className="mb-12 lg:mb-16"      /* Vertical rhythm */

/* Button Padding */
className="px-6 py-3"           /* Standard button */
className="px-4 py-2"           /* Small button */

/* Content Spacing */
className="space-y-4"           /* Vertical stack */
className="gap-6"               /* Grid/flex gap */
```

---

## Components

### Buttons

**Primary Action Button**
```jsx
<motion.button
  className="px-6 py-3 bg-gradient-to-r from-t-primary to-z-primary rounded-lg font-semibold text-white shadow-lg"
  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 217, 255, 0.5)" }}
  whileTap={{ scale: 0.95 }}
>
  Try the Simulator
</motion.button>
```

**T-colored Button**
```jsx
<motion.button
  className="px-6 py-3 bg-t-primary/20 border border-t-primary rounded-lg text-t-primary font-semibold"
  whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 217, 255, 0.3)" }}
  whileTap={{ scale: 0.95 }}
>
  T's Action
</motion.button>
```

**Z-colored Button**
```jsx
<motion.button
  className="px-6 py-3 bg-z-primary/20 border border-z-primary rounded-lg text-z-primary font-semibold"
  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 140, 66, 0.3)" }}
  whileTap={{ scale: 0.95 }}
>
  Z's Action
</motion.button>
```

**Ghost Button**
```jsx
<button className="px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 hover:border-gray-600 transition-colors">
  Secondary Action
</button>
```

### Cards

**Standard Card**
```jsx
<motion.div
  className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg"
  whileHover={{ y: -4, boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)" }}
  transition={{ duration: 0.2 }}
>
  {/* Content */}
</motion.div>
```

**T-themed Card**
```jsx
<div className="bg-gray-800 border border-t-primary/30 rounded-xl p-6">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 rounded-full bg-t-primary/20 flex items-center justify-center">
      <span className="text-t-primary font-bold">T</span>
    </div>
    <h3 className="text-xl font-semibold text-gray-100">T's Perspective</h3>
  </div>
  {/* Content */}
</div>
```

**Z-themed Card** (same pattern with z-primary colors)

### Code Blocks

```jsx
<div className="bg-gray-950 border border-gray-800 rounded-lg p-4 font-mono text-sm">
  <div className="flex items-center justify-between mb-2">
    <span className="text-gray-500 text-xs">from-windows.md</span>
    <button className="text-gray-500 hover:text-gray-300 text-xs">Copy</button>
  </div>
  <pre className="text-t-accent overflow-x-auto">
    <code>{codeContent}</code>
  </pre>
</div>
```

### Message Bubbles (for Timeline/Simulator)

```jsx
/* T's message */
<motion.div
  className="bg-t-primary/10 border-l-4 border-t-primary rounded-r-lg p-4"
  initial={{ x: -50, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
>
  <div className="text-t-accent text-xs font-mono mb-1">T → Z</div>
  <p className="text-gray-200">{message}</p>
</motion.div>

/* Z's message */
<motion.div
  className="bg-z-primary/10 border-l-4 border-z-primary rounded-r-lg p-4"
  initial={{ x: 50, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
>
  <div className="text-z-accent text-xs font-mono mb-1">Z → T</div>
  <p className="text-gray-200">{message}</p>
</motion.div>
```

---

## Animation Philosophy

### Principles
1. **Purposeful**: Every animation reinforces the "sync" metaphor
2. **Snappy**: Durations ≤ 300ms for interactions, ≤ 800ms for page loads
3. **Smooth**: Use cubic-bezier easing for natural motion
4. **Subtle**: Micro-interactions over flashy effects
5. **Respectful**: Respect `prefers-reduced-motion`

### Standard Durations
```css
--duration-fast: 150ms;     /* Hover states, button clicks */
--duration-normal: 250ms;   /* Card animations, transitions */
--duration-slow: 400ms;     /* Page transitions, complex animations */
--duration-enter: 600ms;    /* Initial page load */
```

### Standard Easing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful bounce */
```

### Common Patterns

**Fade In on Mount**
```jsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: "easeOut" }}
```

**Hover Scale**
```jsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
transition={{ duration: 0.15 }}
```

**Stagger Children**
```jsx
/* Parent */
initial="hidden"
animate="visible"
variants={{
  visible: { transition: { staggerChildren: 0.1 } }
}}

/* Children */
variants={{
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}}
```

**Pulsing Sync Indicator**
```jsx
animate={{ opacity: [0.5, 1, 0.5] }}
transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
```

**Message Flow Animation** (for Timeline)
```jsx
animate={{ x: [-100, 0, 100] }}
transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
```

---

## Responsive Breakpoints

```css
/* Mobile-first approach */
--screen-sm: 640px;   /* Small tablets */
--screen-md: 768px;   /* Tablets */
--screen-lg: 1024px;  /* Laptops */
--screen-xl: 1280px;  /* Desktops */
--screen-2xl: 1536px; /* Large desktops */
```

### Responsive Patterns

**Typography**
```jsx
className="text-4xl sm:text-5xl lg:text-6xl"  /* Scale up on larger screens */
```

**Spacing**
```jsx
className="px-4 sm:px-6 lg:px-8"  /* Horizontal padding */
className="py-12 lg:py-20"         /* Vertical section padding */
```

**Layout**
```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

**Hide/Show Elements**
```jsx
className="hidden lg:block"  /* Desktop-only */
className="lg:hidden"        /* Mobile-only */
```

---

## Accessibility

### Focus States
```css
/* All interactive elements */
focus:outline-none focus:ring-2 focus:ring-t-primary focus:ring-offset-2 focus:ring-offset-gray-900
```

### Reduced Motion
```jsx
/* Framer Motion respects prefers-reduced-motion by default */
/* For custom CSS animations: */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Color Contrast
- All text on gray-900 background must meet WCAG AA (4.5:1 for body, 3:1 for headings)
- t-primary (#00D9FF) on gray-900: **11.2:1** ✓
- z-primary (#FF8C42) on gray-900: **7.3:1** ✓
- gray-400 (#A1A1AA) on gray-900: **6.8:1** ✓

### Semantic HTML
- Use proper heading hierarchy (h1 → h2 → h3)
- Interactive elements must be `<button>` or `<a>` with proper roles
- Form inputs must have associated `<label>` elements
- Use `aria-label` for icon-only buttons

---

## Mobile Optimization

### Touch Targets
- Minimum 44x44px for all interactive elements
- Increase button padding on mobile: `className="px-6 py-3 sm:px-8 sm:py-4"`

### Performance
1. **Lazy load images**: Use `loading="lazy"` attribute
2. **Optimize fonts**: Subset Inter and JetBrains Mono to Latin characters only
3. **Code splitting**: Route-based splitting via React Router
4. **Prefetch**: Prefetch critical routes on hover/focus

### Viewport
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Safe Areas (for phone notches)
```css
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);
```

---

## Implementation Notes

### Z's Priorities (My Ownership)
1. **Visual Polish**: Animations, transitions, micro-interactions
2. **Mobile Experience**: Touch optimization, responsive layouts
3. **Design Consistency**: Enforce this system across all pages
4. **Accessibility**: Focus states, keyboard navigation, screen readers

### T's Priorities (Infrastructure)
1. **Routing**: React Router setup, navigation
2. **State Management**: Global state, context providers
3. **Build Pipeline**: Vite config, optimization
4. **Deployment**: GitHub Pages, CI/CD

### Collaboration Points
- **Component Architecture**: T builds structure, Z adds styling/animations
- **Interactive Features**: T handles logic, Z handles UX/feedback
- **Documentation**: T writes technical docs, Z writes design rationale

---

## Changelog

### v1.0 (2026-01-17)
- Initial design system created by Z
- Color palette defined (cyan/orange dual theme)
- Typography scale established (Inter + JetBrains Mono)
- Component patterns documented
- Animation philosophy outlined
- Responsive breakpoints defined
- Accessibility guidelines added

---

## References

- **Tailwind Config**: `~/claude-sync/website/tailwind.config.js`
- **Example Implementation**: `~/claude-sync/website/src/pages/Landing.jsx`
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Framer Motion Docs**: https://www.framer.com/motion/

---

**Next Steps for Z:**
1. ✓ Create this design system document
2. → Edit Landing.jsx to demonstrate advanced patterns
3. → Create component library examples
4. → Design Timeline page visual treatment
5. → Design Protocol Simulator UI mockup
