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
    expect(g!.vx).toBeGreaterThanOrEqual(-4)
    expect(g!.vx).toBeLessThanOrEqual(4)
    expect(g!.vy).toBeGreaterThanOrEqual(-6)
    expect(g!.vy).toBeLessThanOrEqual(-3)
    expect(g!.size).toBeGreaterThanOrEqual(80)
    expect(g!.size).toBeLessThanOrEqual(200)
    expect(g!.lifetime).toBe(2.5)
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
    system.update(1)
    const glyphs = system.getGlyphs()
    expect(glyphs[0].vy).toBeGreaterThan(initialVy)
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
    system.update(5)
    expect(system.getGlyphs()).toHaveLength(0)
  })

  it('fades out in final 0.6s of lifetime', () => {
    const g = system.spawn('A', 100, 100)!
    g.age = 2.0 // 0.5s left of 2.5s lifetime — within FADE_DURATION of 0.6s
    system.update(0.001)
    const updated = system.getGlyphs()[0]
    expect(updated.opacity).toBeLessThan(1)
  })
})
