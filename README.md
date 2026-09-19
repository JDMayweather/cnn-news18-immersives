# CNN News18 Immersives Platform

A reusable multi-story immersive publishing platform built with React, Vite, GSAP, and Lenis.

## Architecture Overview

```
src/
├── core/                    # Shared infrastructure (reusable engine)
│   ├── embed/              # Embed loader utilities
│   ├── messaging/          # iframe postMessage communication
│   ├── responsive/         # Viewport, embed mode, reduced motion detection
│   ├── scroll/             # Scroll utilities, intersection observers
│   ├── animation/          # GSAP animation helpers
│   └── performance/        # Lazy loading, font loading, debounce/throttle
├── components/             # Reusable UI components
│   ├── Figure.tsx          # Responsive figure with lazy loading
│   ├── ScrollySection.tsx  # Scroll-triggered section animations
│   ├── ProgressIndicator.tsx # Scroll progress bar
│   ├── DataReveal.tsx      # Scroll-triggered data counters
│   ├── ArticleBody.tsx     # Full article text display
│   └── HeroParticles.tsx   # Three.js particle background
├── router/
│   └── stories.tsx         # Story registry and routing
├── stories/                # Individual immersive stories
│   ├── montreux/           # The Montreux Temptation
│   │   ├── index.tsx       # Story entry point
│   │   ├── theme.ts        # Visual theme (colors, typography, spacing)
│   │   ├── sections/       # Story chapters as components
│   │   └── assets/         # Story-specific data
│   ├── rich-mans-religion/ # Rich Man's Religion: Cricket's Cost
│   │   ├── index.tsx
│   │   ├── theme.ts
│   │   ├── sections/
│   │   └── assets/
│   └── test-story/         # Architecture validation story
├── styles/
│   └── immersive.css       # Global styles (Montreux-specific)
├── App.tsx                 # Main app with routing and story registration
└── main.tsx                # Entry point
```

## Key Features

### 1. Multi-Story Architecture
- Each story lives in `src/stories/{slug}/`
- Stories are completely independent - own theme, components, data
- Shared engine provides routing, embed system, scroll handling, animations
- Zero visual constraints - stories can have completely different designs

### 2. Story Registration
Register stories in `src/App.tsx`:
```tsx
import MyStory, { metadata } from "./stories/my-story";

registerStory("my-story", {
  default: MyStory,
  metadata,
});
```
Story becomes available at `/{slug}`

### 3. Embed System
The embed loader (`public/embed.js`) supports dynamic story loading:
```html
<div class="immersive-embed" data-story="montreux"></div>
<script async src="https://your-domain/embed.js"></script>
```
- Reads `data-story` attribute to determine which story to load
- Handles iframe height synchronization via postMessage
- Supports multiple embeds on same page
- Retries if host framework removes iframe

### 4. Iframe Communication
- Parent/child height sync via `ResizeObserver` + `postMessage`
- Secure origin validation (configurable in `core/messaging/iframe.ts`)
- Works in embed mode (`?embed=true`) and standalone

### 5. Responsive & Accessibility
- `prefers-reduced-motion` support - disables all animations
- Embed mode detection - forces content visible, adjusts layouts
- Mobile-first responsive breakpoints
- Semantic HTML, ARIA labels, keyboard navigation

## Creating a New Story

### 1. Create Story Directory
```bash
mkdir -p src/stories/my-new-story/sections
mkdir -p src/stories/my-new-story/assets
```

### 2. Define Theme (`theme.ts`)
```ts
export const myStoryTheme = {
  colors: {
    background: "#ffffff",
    text: "#1a1a2e",
    accent: "#2563eb",
    // ...
  },
  typography: {
    display: '"Playfair Display", serif',
    body: '"Inter", system-ui, sans-serif',
  },
  spacing: {
    sectionPadding: "8vh 6vw",
    containerMaxWidth: "900px",
  },
};
```

### 3. Build Sections
Create components in `sections/` - each chapter/section as a React component:
- Use theme values for consistency
- Leverage core utilities: `prefersReducedMotion()`, `isEmbedMode()`, GSAP helpers
- Handle embed mode: `if (embed) return` early for scroll-triggered animations

### 4. Create Entry Point (`index.tsx`)
```tsx
import Section1 from "./sections/Section1";
import Section2 from "./sections/Section2";
// ...
import ProgressIndicator from "@/components/ProgressIndicator";
import { sendResizeMessage } from "@/core/messaging/iframe";
import { isEmbedMode } from "@/core/responsive/viewport";

export const metadata = {
  slug: "my-new-story",
  title: "My Story Title",
  description: "Story description for SEO/social",
  author: "Author Name",
  publishedAt: "2026-01-15",
  tags: ["tag1", "tag2"],
};

function useEmbedResize() { /* ... */ }

export default function MyStory() {
  useEmbedResize();
  return (
    <main className="immersive">
      <ProgressIndicator />
      <Section1 />
      <Section2 />
      {/* ... */}
      <footer>...</footer>
    </main>
  );
}
```

### 5. Register in App.tsx
```tsx
import MyStory, { metadata } from "./stories/my-new-story";

registerStory("my-new-story", {
  default: MyStory,
  metadata,
});
```

### 6. Add Assets
Place story-specific images/data in `assets/` and import with `@/stories/my-new-story/assets/...`

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Vercel (Recommended)
- `vercel.json` handles SPA routing with rewrites
- CSP headers for iframe embedding configured
- Automatic HTTPS, CDN, preview deployments

### Custom Domain
Update `DEFAULT_HOST` in `public/embed.js` or set `data-host` on embed containers.

## Story-Specific Notes

### Montreux (`/montreux`)
- Original immersive, dark theme, orange/blue accents
- Complex GSAP animations, Lenis smooth scroll
- Hero with dynamic title fitting, parallax
- WarTimeline with interactive map (HormuzMap)
- Comparison cards, quotes, figures

### Rich Man's Religion (`/rich-mans-religion`)
- Light theme, serif display type (Playfair Display)
- Editorial layout with cards, charts, quotes
- Cost breakdown with animated counters
- Coach cards with hover effects
- Bat price chart with animated bars
- Exclusion stats with animated SVG circles
- Sport cost comparison bars
- Talent factor cards
- Optimist/reality cards
- Side-by-side comparison panels

## Core Utilities Reference

### Viewport (`core/responsive/viewport.ts`)
```ts
isEmbedMode()           // true if ?embed=true
prefersReducedMotion()  // true if user prefers reduced motion
```

### Messaging (`core/messaging/iframe.ts`)
```ts
sendResizeMessage(height)           // Send height to parent
onResizeMessage(handler, origins?)  // Listen for height updates
isAllowedOrigin(origin)             // Validate message origin
```

### Animation (`core/animation/gsap.ts`)
```ts
createScrollReveal(targets, options)    // Scroll-triggered reveal
createStaggerReveal(container, selector) // Stagger children
createParallax(element, options)        // Parallax effect
createResizeObserver(element, callback) // ResizeObserver wrapper
```

### Scroll (`core/scroll/utils.ts`)
```ts
getScrollProgress()                    // 0-1 scroll progress
observeSectionVisibility(selector, cb) // Section intersection observer
observeElementVisibility(el, cb)       // Element intersection observer
```

### Performance (`core/performance/lazy.ts`)
```ts
createIntersectionObserver(elements, cb) // Lazy load images/content
preloadFont(fontFamily, weight)          // Preload web fonts
debounce(fn, delay)                      // Debounce function
throttle(fn, limit)                      // Throttle function
```

## Browser Support
- Modern browsers (ES2020+)
- Requires `ResizeObserver`, `IntersectionObserver`, `matchMedia`
- Polyfills included via Vite for older browsers if needed

## License
Proprietary - CNN News18