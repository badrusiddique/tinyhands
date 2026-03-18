# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server at localhost:3000
npm run build        # Production build (next build)
npm run lint         # ESLint
npm run test         # Run all 70 tests once (vitest run)
npm run test:watch   # Watch mode (vitest)
```

Run a single test file:
```bash
npx vitest run src/__tests__/engine/GlyphSystem.test.ts
```

## Architecture

**Engine-first design:** The `src/engine/` directory contains pure TypeScript classes with zero React dependency. They are fully testable without DOM mocking. React hooks in `src/hooks/` are thin wrappers that mount the engine to canvas refs.

```
engine/SmashEngine.ts    ← Orchestrator: RAF loop, coordinates all subsystems
engine/GlyphSystem.ts    ← Glyph spawn, physics (gravity/drag/rotation), lifecycle
engine/ParticleSystem.ts ← Particle effects (confetti/star/bubble/leaf), 280 cap
engine/InputHandler.ts   ← Key → char mapping, blocked keys, modifier handling
engine/AudioSystem.ts    ← Web Audio tones (different pitch for letters vs emojis)
engine/IdleDemo.ts       ← 3s inactivity → auto-play at 35% strength
engine/PerformanceMonitor.ts ← 10-frame FPS average, adjusts lowPowerLevel 0-2
```

**Mounting pattern:** `useSmashEngine(canvasRef)` creates a `SmashEngine` instance, calls `engine.start()` (begins RAF loop), and `engine.stop()` on cleanup. `SmashCanvas.tsx` wires keyboard/pointer/long-press events to engine methods.

**Route structure:** The `(site)` route group wraps marketing pages (landing, about, guides) in a shared Navbar/Footer layout. `/play` sits outside this group and renders only the fullscreen canvas.

```
app/(site)/layout.tsx  ← Navbar + Footer wrapper
app/(site)/page.tsx    ← Landing (Hero → HowItWorks → FeatureBadges)
app/(site)/about/      ← Story + privacy + FAQ
app/(site)/guides/     ← 12 SSG pages via generateStaticParams
app/play/page.tsx      ← Fullscreen canvas, no layout wrapper
app/api/visitors/      ← Vercel KV: GET returns count, POST increments
```

## Key Patterns

**Theme system:** 4 themes defined in `src/lib/themes.ts` as `Theme` objects (canvasBg, glyphColors[], particleColors[], particleShape, ambientColor, ambientShape). Switching themes calls `engine.setTheme()` which propagates to all subsystems.

**Parent panel triggers:** Secret words ("ayaan", "annu", "baba") detected via 4s keystroke buffer in `useParentPanel`, or 2s long-press on top-left 64x64px area.

**Physics units:** Velocity in `constants.ts` is in **pixels per frame at 60fps** (the update formula is `g.y += g.vy * dt * 60`). VY of -5 means 5 pixels/frame = 300px/sec. Gravity adds `GRAVITY * dt` per frame (~0.1/frame at 60fps).

**Emoji pool:** Bag-shuffle algorithm in `src/lib/emojiPool.ts` - shuffles 60 emojis, picks sequentially, reshuffles when exhausted. Prevents consecutive duplicates at boundary.

**Performance adaptation:** FPS < 44 increases `lowPowerLevel` (max 2). Level 1: halves particle cap. Level 2: also disables background pulse and vignette.

## Testing

Vitest with jsdom environment. Path alias `@` → `./src` works in tests. Tests live in `src/__tests__/` mirroring the source structure. Engine classes are tested directly (pure TS, no React mocking needed). Hook tests use `@testing-library/react`.

## Design System

Rainbow gradient (`bg-rainbow` in globals.css) used for hero banners and footer across all pages. Content sections alternate white and lavender (`#F8F4FF`). Cards use `rounded-2xl shadow-lg border-t-4` with cycling accent colors (coral/blue/green/purple). Font: Nunito via `next/font/google` with CSS variable `--font-nunito`.

## Environment

Vercel KV for visitor counter (optional). Without `KV_REST_API_URL` and `KV_REST_API_TOKEN` in `.env.local`, the counter returns 0 and POST is a no-op.
