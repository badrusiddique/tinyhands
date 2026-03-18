# TinyHands — Full Project Context

> A fullscreen keyboard smash toy for toddlers, inspired by TinyFingers.net.
> Built for Badru's 2-year-old son Ayaan. Deployed free on Vercel.

---

## 1. Background & Motivation

Badru works from home. His 2-year-old son **Ayaan** constantly mimics him — opens the laptop lid, puts on headphones, pretends to be in a meeting. Instead of letting Ayaan stare at screensavers or accidentally close tabs, Badru is building a safe keyboard smash toy.

**The personal story (Ayaan, headphones, WFH mimic) lives in the About page ONLY.** The smash app itself is generic and kid-friendly — no meeting theme, no WFH references in the UI.

TinyFingers.net was fully reverse-engineered (67KB `app.js` source analyzed). TinyHands replicates the core mechanics with a fresh design, personal brand, and WFH-parent-angle guides.

---

## 2. Tech Stack (all decisions are final)

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 14** (App Router) | SSG for guides, API routes for counter, Vercel-native |
| Language | **TypeScript** (strict) | EM-quality code requirement |
| Styling | **Tailwind CSS** | Utility-first, fast iteration |
| Animation | **Canvas API** | All glyphs, particles, sparkles render on `<canvas>` |
| Counter | **Vercel KV** (Redis) | Single key `visits`, `INCR`/`GET` — NOT Firebase |
| Audio | **Web Audio API** | Different tones for letters vs emojis, sparkle noise |
| Hosting | **Vercel free tier** | `tinyhands.vercel.app` |
| Font | **Nunito** (Google Fonts) | Rounded, kid-friendly |
| Testing | **TDD approach** | Write tests first, then implement |

**NOT using:** Firebase, Netlify, any paid services, any database beyond Vercel KV.

---

## 3. Design Tokens

```
// Colors
landing-bg:     #FFFBF0   // warm cream
canvas-bg:      #0D0D1A   // dark, makes glyphs pop
coral:          #FF6B6B
yellow:         #FFD93D
green:          #6BCB77
blue:           #4D96FF
purple:         #C77DFF

// Typography
font-family:    'Nunito', sans-serif
font-weights:   400 (body), 600 (subheadings), 700 (headings), 800 (hero)

// Spacing & Radius
border-radius:  rounded-2xl (cards), rounded-full (badges/buttons)
```

---

## 4. Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Hero section, feature badges, how-it-works steps, visitor counter (`👁 X visits so far`) |
| `/play` | Smash App | "Click to Start" overlay enters fullscreen on direct user gesture; keyboard/mouse/touch input, themes, parent panel |
| `/about` | About | Ayaan's story (problem → idea → result), privacy badges, FAQ |
| `/guides` | Guides Hub | Grid of 12 guide cards |
| `/guides/[slug]` | Guide Detail | Individual guide page (SSG via `generateStaticParams`) |
| `/api/visitors` | API Route | `GET` returns count, `POST` increments and returns count |

---

### Fullscreen Approach
**"Click to Start" overlay** — on `/play`, a fullscreen overlay is shown before the smash canvas. The user clicks it, which requests fullscreen synchronously within the click handler (a direct user gesture). This replaces any auto-fullscreen-on-mount approach, which browsers silently block because it happens outside a gesture event. ESC exits fullscreen (browser default). If the user dismisses fullscreen, the Parent Panel has a fullscreen toggle to re-enter.

---

## 5. Smash Engine — Detailed Specs

### 5.1 Key Handling
- **Letters (a-z)** → display as uppercase (A-Z)
- **Digits (0-9)** → display as-is
- **Everything else** (symbols, space, enter, arrows, etc.) → random emoji from pool
- **Blocked keys** (preventDefault, NO animation): `Tab`, `Escape`, `F1`–`F10`, `F12`
- **Modifier combos** (Ctrl/Cmd/Alt+key): `preventDefault` to block browser shortcuts, animation still fires
- **Key repeat**: `event.repeat` is NOT checked — holding a key floods the screen (this is intentional, toddlers hold keys)
- **Simultaneous keys**: Each key fires independently, no chord detection
- Every keypress also plays a tone via Web Audio API (different pitch for letters vs emojis)

### 5.2 Glyph Physics
```
position:    random x/y on canvas
velocity:    vx = random ±22,  vy = random −32 to −72 (shoots upward)
gravity:     +8 per second²
drag:        vx *= 0.994 per frame
lifetime:    1.25 seconds
size:        random 60–180px
rotation:    random initial, spins during flight
opacity:     fades out over final 0.3s of lifetime
```

### 5.3 Performance System
```
glyph cap:       40 simultaneous (18 in prefers-reduced-motion)
particle cap:    280 simultaneous (130 in prefers-reduced-motion)
FPS monitor:     below 44fps → increase lowPowerLevel (max 2)
                 above 56fps → decrease lowPowerLevel
lowPowerLevel 1: reduce particle count
lowPowerLevel 2: reduce glyph cap + disable background pulse
```

### 5.4 Mouse/Touch Sparkle
```
hover trail:     fires particle every 34ms
drag trail:      fires particle every 52ms
interpolation:   smooth trail between sample points (not just dots)
```

### 5.5 Background Pulse
```
Subtle breathing effect on canvas background:
brightness = base + Math.sin(timestamp * 0.0004) * amplitude
Disabled at lowPowerLevel >= 2
```

### 5.6 Idle Demo
```
trigger:         3000ms of no keyboard/mouse input
burst interval:  700ms
strength:        0.35 (smaller, slower glyphs than real input)
stops:           immediately on any user input
```

### 5.7 "Made for Ayaan" Tag
```
Subtle text: "made for ayaan 🧡"
Visibility:  only appears during idle demo (fades in after idle starts)
Position:    bottom-center of canvas
Fades out:   immediately when user starts typing
```

---

## 6. Emoji Pool (60 kid-friendly, bag-shuffle — no repeats until exhausted)

```typescript
const EMOJI_POOL = [
  // Nature & Weather
  '🌈','☀️','🌙','☁️','⚡','❄️','🌸','🍀','🍄','🌴','🌊','🫧',
  // Sea Creatures
  '🐳','🐬','🐠','🐙',
  // Land Animals & Bugs
  '🦋','🐞','🐢','🦀','🦄','🐥','🐸','🐰','🐻','🦊','🐼','🦁','🐨','🦕',
  // Music & Fun
  '🎵','🥁','🎹','🎸','🎈','🎉','🧸','🪁','🎨','🧩',
  // Vehicles
  '🚀','✈️','🚁','🚂','🚗','🚲','⛵','🚌','🚜','🚒',
  // Food
  '🍎','🍓','🍉','🍌','🍍','🍪','🍦','🧁','🍕',
  // Wildcard
  '💩'
]
```

**Bag-shuffle algorithm**: Shuffle array, pick sequentially. When exhausted, reshuffle. Prevents seeing same emoji twice in a row.

---

## 7. Themes

| Theme | Canvas BG | Glyph Colors | Particle Style |
|-------|-----------|-------------|----------------|
| **Playroom** (default) | `#1d293a` | Bright primaries | Confetti squares |
| **Space** | `#070d1a` | Neon blues/purples/whites | Star particles |
| **Ocean** | `#0f2f3b` | Aqua/teal/coral | Bubble particles |
| **Jungle** | `#0a1f0a` | Greens/oranges/browns | Leaf particles |

Each theme defines: `canvasBg`, `glyphColors[]`, `particleColors[]`, `particleShape`.

---

## 8. Parent Panel

### Access Methods (either works)
1. **Secret word**: Type `ayaan`, `annu`, or `baba` — 4-second keystroke buffer, case-insensitive
2. **Long press**: Hold top-left corner (64×64px area) for 2000ms

### Panel Contents
- Theme switcher (4 themes as radio buttons or swipeable cards)
- Sound toggle (on/off)
- Fullscreen toggle (re-enters fullscreen if user exited)
- Close button (returns to smash)

### Behavior
- Panel slides in as overlay (semi-transparent backdrop)
- All keyboard input is captured by panel while open (no glyphs spawn)
- Pressing Escape or clicking backdrop closes panel

---

## 9. Visitor Counter

**Vercel KV** — one Redis key called `visits`.

```typescript
// src/app/api/visitors/route.ts
import { kv } from '@vercel/kv'

export async function POST() {
  const count = await kv.incr('visits')
  return Response.json({ count })
}

export async function GET() {
  const count = (await kv.get<number>('visits')) ?? 0
  return Response.json({ count })
}
```

**Frontend**: `POST` on first visit (sessionStorage check to avoid double-counting), then display `👁 {count} visits so far` on landing page.

---

## 10. About Page

### Structure
1. **Hero**: "Meet TinyHands" + tagline
2. **The Story**: Ayaan mimics WFH dad → inspired keyboard toy (3 paragraphs max)
3. **Privacy Badges** (6 items):
   - No accounts required
   - No user IDs or tracking
   - No fingerprinting
   - No ads
   - No external API calls from the app
   - Analytics: aggregate only (Vercel Analytics if added later)
4. **How It Works**: 3 steps — Open → Go fullscreen → Smash safely
5. **FAQ**: 3 questions (safe for toddlers?, data collection?, can toddlers break computer?)

---

## 11. Guides (12 pages, SSG)

All guides have a **WFH-parent angle** (not generic parenting advice). Each guide has: title, body (3-5 sections), FAQ section.

| # | Slug | Title Direction |
|---|------|----------------|
| 1 | `baby-keyboard-smash` | Why babies love smashing keyboards |
| 2 | `why-babies-love-keyboards` | The developmental science behind it |
| 3 | `baby-typing-game` | Safe typing games for babies |
| 4 | `keyboard-game-for-babies` | Best keyboard games ranked |
| 5 | `toddler-keyboard-smash` | Toddler vs baby — different needs |
| 6 | `typing-games-for-toddlers` | Typing games that actually teach |
| 7 | `best-toddler-screen-activities` | Screen time that isn't mindless |
| 8 | `toddler-screen-activities` | Activities for WFH parent breaks |
| 9 | `how-to-let-your-toddler-use-your-computer` | Safe setup guide |
| 10 | `baby-computer-games` | Age-appropriate computer games |
| 11 | `computer-games-for-toddlers` | Games that develop motor skills |
| 12 | `kids-keyboard-website` | Web-based keyboard toys compared |

Guide content should be stored in `src/lib/guides.ts` as an array of objects for SSG.

---

## 12. Project Structure

```
tinyhands/
├── CLAUDE.md                          ← this file
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── .env.local                         ← KV_REST_API_URL, KV_REST_API_TOKEN
├── public/
│   └── fonts/                         ← Nunito if self-hosted (or use Google Fonts CDN)
├── src/
│   ├── app/
│   │   ├── layout.tsx                 ← root layout, Nunito font, metadata
│   │   ├── page.tsx                   ← landing page
│   │   ├── play/
│   │   │   └── page.tsx               ← fullscreen smash canvas
│   │   ├── about/
│   │   │   └── page.tsx               ← Ayaan's story
│   │   ├── guides/
│   │   │   ├── page.tsx               ← guide hub grid
│   │   │   └── [slug]/
│   │   │       └── page.tsx           ← individual guide (SSG)
│   │   └── api/
│   │       └── visitors/
│   │           └── route.ts           ← GET/POST counter
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── FeatureBadges.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   └── VisitorCounter.tsx
│   │   ├── play/
│   │   │   ├── SmashCanvas.tsx        ← canvas element + engine mount
│   │   │   └── ParentPanel.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       └── Card.tsx
│   ├── engine/                        ← pure logic, no React (testable)
│   │   ├── SmashEngine.ts             ← main engine class
│   │   ├── GlyphSystem.ts             ← glyph spawn, physics, lifecycle
│   │   ├── ParticleSystem.ts          ← particles, sparkles
│   │   ├── AudioSystem.ts             ← Web Audio tones
│   │   ├── IdleDemo.ts                ← idle detection + auto-play
│   │   ├── PerformanceMonitor.ts      ← FPS tracking, power levels
│   │   └── InputHandler.ts            ← key mapping, blocked keys, modifier handling
│   ├── hooks/
│   │   ├── useSmashEngine.ts          ← mounts engine to canvas ref
│   │   ├── useParentPanel.ts          ← secret word detection + long press
│   │   ├── useVisitorCount.ts         ← fetch + increment counter
│   │   └── useFullscreen.ts           ← fullscreen API wrapper
│   ├── lib/
│   │   ├── themes.ts                  ← theme definitions (colors, particle shapes)
│   │   ├── emojiPool.ts               ← emoji array + bag-shuffle
│   │   ├── guides.ts                  ← guide content data (title, body, FAQ)
│   │   └── constants.ts               ← physics constants, caps, timings
│   ├── types/
│   │   ├── smash.ts                   ← Glyph, Particle, Theme, EngineState types
│   │   └── guide.ts                   ← Guide, FAQ types
│   └── __tests__/                     ← TDD: tests live here
│       ├── engine/
│       │   ├── GlyphSystem.test.ts
│       │   ├── ParticleSystem.test.ts
│       │   ├── InputHandler.test.ts
│       │   ├── IdleDemo.test.ts
│       │   └── PerformanceMonitor.test.ts
│       ├── hooks/
│       │   ├── useParentPanel.test.ts
│       │   └── useVisitorCount.test.ts
│       └── lib/
│           ├── emojiPool.test.ts
│           └── themes.test.ts
```

**Key architecture decision**: The `engine/` directory contains pure TypeScript classes with NO React dependency. This makes them fully testable with Jest/Vitest without needing DOM mocking. React hooks in `hooks/` are thin wrappers that mount the engine to canvas refs.

---

## 13. Commit Strategy (12 small, meaningful commits)

| # | Message | Scope |
|---|---------|-------|
| 1 | `init: scaffold Next.js 14 + TypeScript + Tailwind` | `npx create-next-app`, config files |
| 2 | `feat: add design tokens, Nunito font, global styles` | tailwind config, CSS variables, font |
| 3 | `feat: build landing page — hero, features, how-it-works` | landing components, responsive |
| 4 | `feat: add visitor counter with Vercel KV` | API route, hook, counter component |
| 5 | `feat: build core smash engine — canvas, glyph physics` | engine classes, canvas mount |
| 6 | `feat: add key handler and emoji pool` | InputHandler, emojiPool, bag-shuffle |
| 7 | `feat: add mouse/touch sparkle trail` | ParticleSystem, pointer events |
| 8 | `feat: add 4 themes — Playroom, Space, Ocean, Jungle` | theme definitions, switcher |
| 9 | `feat: add idle demo and "made for ayaan" tag` | IdleDemo class, fade-in text |
| 10 | `feat: add parent panel — triggered by ayaan/annu/baba` | panel UI, secret word detection |
| 11 | `feat: add about page — Ayaan's story + privacy badges` | about page components |
| 12 | `feat: add guides hub and 12 SSG guide pages` | guide data, SSG pages, hub grid |

---

## 14. Development Approach

- **TDD**: Write tests FIRST for engine classes and utility functions, then implement
- **Use context7**: Look up Next.js 14 App Router docs, Tailwind classes, Vercel KV API
- **Use webapp-testing**: After building each page/feature, verify it works in browser
- **Engine-first**: Build the smash engine (commits 5-9) before the static pages (commits 11-12)
- **No over-engineering**: Keep it simple. No state management library. React state + context is enough.

---

## 15. Environment Variables (Vercel KV)

```env
# .env.local (get from Vercel dashboard after connecting KV store)
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
```

For local dev without KV: visitor counter returns `0` and `POST` is a no-op. Add a fallback in the API route.
