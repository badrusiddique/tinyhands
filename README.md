# TinyHands ⭐

A safe, fullscreen keyboard smash toy for toddlers. No accounts. No ads. Just chaos and color.

**[Live Demo](https://tinyhands.vercel.app)**

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)

---

## What is TinyHands?

TinyHands turns your keyboard into a toddler playground. Every key press explodes into colorful glyphs, emojis, and sparkles on a fullscreen canvas. Built for work-from-home parents whose kids want to "type" on the real laptop.

**Key features:**

- **Fullscreen canvas** - No tabs to accidentally close, no emails to accidentally send
- **4 themes** - Playroom, Space, Ocean, Jungle, each with unique colors and particle effects
- **Keyboard, mouse, and touch** - Every input creates visual magic
- **Sound effects** - Different tones for letters vs emojis (toggleable)
- **Idle demo mode** - Auto-plays after 3 seconds of inactivity
- **Performance adaptive** - FPS monitoring with automatic quality reduction
- **Sparkle trail** - Mouse/touch creates a fast, colorful particle trail
- **Parent panel** - Hidden settings panel (type "ayaan", "annu", or "baba" to open, or long-press top-left corner)
- **Zero tracking** - No accounts, no cookies, no fingerprinting, no ads

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Animation | Canvas API |
| Audio | Web Audio API |
| Counter | Vercel KV (Redis) |
| Hosting | Vercel (free tier) |
| Font | Nunito (Google Fonts) |
| Testing | Vitest (TDD) |

---

## Project Structure

```
tinyhands/
├── public/
│   ├── favicon.svg          # Rainbow star favicon
│   └── logo-icon.svg        # Rainbow star logo
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout, Nunito font, metadata
│   │   ├── play/page.tsx    # Fullscreen smash canvas
│   │   ├── (site)/
│   │   │   ├── page.tsx     # Landing page
│   │   │   ├── about/       # Ayaan's story + privacy
│   │   │   └── guides/      # 12 SSG guide pages
│   │   └── api/visitors/    # GET/POST visitor counter
│   ├── engine/              # Pure TS, no React dependency
│   │   ├── SmashEngine.ts   # Main engine class
│   │   ├── GlyphSystem.ts   # Glyph spawn, physics, lifecycle
│   │   ├── ParticleSystem.ts
│   │   ├── AudioSystem.ts
│   │   ├── IdleDemo.ts
│   │   ├── PerformanceMonitor.ts
│   │   └── InputHandler.ts
│   ├── components/
│   │   ├── home/            # Hero, HowItWorks, FeatureBadges
│   │   ├── play/            # SmashCanvas, ParentPanel
│   │   ├── layout/          # Navbar, Footer
│   │   └── ui/              # Button, Badge, Card
│   ├── hooks/               # useSmashEngine, useParentPanel, etc.
│   ├── lib/                 # themes, emojiPool, guides data, constants
│   ├── types/               # TypeScript interfaces
│   └── __tests__/           # Vitest test suite
```

**Architecture:** The `engine/` directory contains pure TypeScript classes with zero React dependency. This makes them fully testable without DOM mocking. React hooks in `hooks/` are thin wrappers that mount the engine to canvas refs.

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run tests
npm run test

# Build for production
npx next build
```

### Environment Variables

For the visitor counter (optional):

```env
# .env.local - get from Vercel dashboard after connecting KV store
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
```

Without these, the visitor counter returns 0 and POST is a no-op.

---

## Themes

| Theme | Background | Vibe |
|-------|-----------|------|
| Playroom (default) | Dark navy | Neon confetti, bright primaries |
| Space | Deep black | Star particles, cyan/magenta neons |
| Ocean | Dark teal | Bubble particles, aqua/coral |
| Jungle | Forest dark | Leaf particles, lime/orange neons |

Each theme defines: canvas background, glyph colors, particle colors, particle shape, ambient color, and ambient shape.

---

## Smash Engine

The canvas engine runs at 60fps with:

- **Glyph physics** - Letters/emojis float upward with gravity, drag, rotation, and opacity fade
- **Performance monitor** - Tracks FPS, auto-reduces particle count and disables effects when below 44fps
- **Bag-shuffle emoji pool** - 60 kid-friendly emojis, no repeats until pool is exhausted
- **Sparkle trail** - 30ms hover / 50ms drag intervals, 3 particles per step, 8-22px size
- **Ambient background** - Theme-specific floating particles with sine-wave opacity pulsing and radial vignette overlay

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing - rainbow hero, arcade START button, how-it-works, safety badges |
| `/play` | Fullscreen smash canvas with theme switcher |
| `/about` | Ayaan's story, privacy badges, FAQ |
| `/guides` | 12 SSG guide pages for WFH parents |

---

## Testing

```bash
npm run test
```

70 tests covering:
- GlyphSystem (spawn, physics, caps, fade)
- ParticleSystem
- InputHandler (key mapping, blocked keys, modifiers)
- IdleDemo
- PerformanceMonitor
- useParentPanel hook
- useVisitorCount hook
- EmojiPool (bag-shuffle)
- Theme definitions

---

## Deployment

Deployed on Vercel free tier at [tinyhands.vercel.app](https://tinyhands.vercel.app).

Push to `main` triggers automatic deployment.

---

## License

MIT

---

Built with love for Ayaan and every curious toddler.
