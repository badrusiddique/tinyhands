import { PHYSICS } from '@/lib/constants'
import type { Glyph, Theme } from '@/types/smash'

interface GlyphSystemConfig {
  glyphCap: number
  prefersReducedMotion: boolean
  theme: Theme
}

export class GlyphSystem {
  private glyphs: Glyph[] = []
  private cap: number
  private theme: Theme
  private idCounter = 0

  constructor(config: GlyphSystemConfig) {
    this.cap = config.glyphCap
    this.theme = config.theme
  }

  spawn(char: string, x: number, y: number): Glyph | null {
    if (this.glyphs.length >= this.cap) return null

    const color = this.theme.glyphColors[
      Math.floor(Math.random() * this.theme.glyphColors.length)
    ]

    const glyph: Glyph = {
      id: `g-${this.idCounter++}`,
      char,
      x,
      y,
      vx: PHYSICS.VX_MIN + Math.random() * (PHYSICS.VX_MAX - PHYSICS.VX_MIN),
      vy: PHYSICS.VY_MIN + Math.random() * (PHYSICS.VY_MAX - PHYSICS.VY_MIN),
      size: PHYSICS.SIZE_MIN + Math.random() * (PHYSICS.SIZE_MAX - PHYSICS.SIZE_MIN),
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 4,
      opacity: 1,
      lifetime: PHYSICS.LIFETIME,
      age: 0,
      color,
    }

    this.glyphs.push(glyph)
    return glyph
  }

  update(dt: number): void {
    for (const g of this.glyphs) {
      g.vy += PHYSICS.GRAVITY * dt
      g.vx *= Math.pow(PHYSICS.DRAG, dt * 60)
      g.x += g.vx * dt * 60
      g.y += g.vy * dt * 60
      g.rotation += g.rotationSpeed * dt
      g.age += dt

      // Fade out in final 0.3s
      const timeLeft = g.lifetime - g.age
      if (timeLeft < PHYSICS.FADE_DURATION) {
        g.opacity = Math.max(0, timeLeft / PHYSICS.FADE_DURATION)
      }
    }

    // Remove expired glyphs after updating ages
    this.glyphs = this.glyphs.filter(g => g.age < g.lifetime)
  }

  render(ctx: CanvasRenderingContext2D): void {
    for (const g of this.glyphs) {
      ctx.save()
      ctx.globalAlpha = Math.max(0, g.opacity)
      ctx.translate(g.x, g.y)
      ctx.rotate(g.rotation)
      ctx.font = `${g.size}px 'Nunito', sans-serif`
      ctx.fillStyle = g.color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(g.char, 0, 0)
      ctx.restore()
    }
  }

  getGlyphs(): Glyph[] {
    return this.glyphs
  }

  getCount(): number {
    return this.glyphs.length
  }

  setCap(cap: number): void {
    this.cap = cap
  }

  setTheme(theme: Theme): void {
    this.theme = theme
  }
}
