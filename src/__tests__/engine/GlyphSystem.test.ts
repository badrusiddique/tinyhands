import { describe, it, expect, beforeEach } from 'vitest'
import { GlyphSystem } from '@/engine/GlyphSystem'
import { DEFAULT_THEME } from '@/lib/themes'

describe('GlyphSystem', () => {
  let system: GlyphSystem

  beforeEach(() => {
    system = new GlyphSystem({ glyphCap: 40, prefersReducedMotion: false, theme: DEFAULT_THEME })
  })

  it('spawns a glyph with correct structure', () => {
    const g = system.spawn('A', 100, 100)
    expect(g).not.toBeNull()
    expect(g!.char).toBe('A')
    expect(g!.vx).toBeGreaterThanOrEqual(-40)
    expect(g!.vx).toBeLessThanOrEqual(40)
    expect(g!.vy).toBeGreaterThanOrEqual(-120)
    expect(g!.vy).toBeLessThanOrEqual(-60)
    expect(g!.size).toBeGreaterThanOrEqual(180)
    expect(g!.size).toBeLessThanOrEqual(360)
    expect(g!.lifetime).toBe(4.0)
    expect(g!.age).toBe(0)
    expect(g!.opacity).toBe(1)
  })

  it('returns null when at cap', () => {
    for (let i = 0; i < 40; i++) system.spawn('A', 0, 0)
    expect(system.spawn('B', 0, 0)).toBeNull()
  })

  it('uses reduced cap when prefersReducedMotion', () => {
    const reduced = new GlyphSystem({ glyphCap: 18, prefersReducedMotion: true, theme: DEFAULT_THEME })
    for (let i = 0; i < 18; i++) reduced.spawn('A', 0, 0)
    expect(reduced.spawn('B', 0, 0)).toBeNull()
  })

  it('applies gravity in update', () => {
    const g = system.spawn('A', 100, 100)!
    const initialVy = g.vy
    system.update(1) // 1 second
    const glyphs = system.getGlyphs()
    expect(glyphs[0].vy).toBeGreaterThan(initialVy) // gravity adds positive vy
  })

  it('applies drag to vx in update', () => {
    const g = system.spawn('A', 100, 100)!
    g.vx = 10
    system.update(1 / 60)
    const glyphs = system.getGlyphs()
    expect(Math.abs(glyphs[0].vx)).toBeLessThan(10)
  })

  it('removes glyphs past their lifetime', () => {
    system.spawn('A', 100, 100)
    system.update(5) // past lifetime of 4.0s
    expect(system.getGlyphs()).toHaveLength(0)
  })

  it('fades out in final 0.5s of lifetime', () => {
    const g = system.spawn('A', 100, 100)!
    g.age = 3.0 // 1.0s left of 4.0s lifetime - within FADE_DURATION of 1.5s
    system.update(0.001)
    const updated = system.getGlyphs()[0]
    expect(updated.opacity).toBeLessThan(1)
  })
})
