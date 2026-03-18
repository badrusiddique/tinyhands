import { describe, it, expect } from 'vitest'
import { THEMES, DEFAULT_THEME } from '@/lib/themes'

describe('themes', () => {
  const themeNames = ['playroom', 'space', 'ocean', 'jungle'] as const

  it('has exactly 4 themes', () => {
    expect(Object.keys(THEMES)).toHaveLength(4)
  })

  it('default theme is Playroom', () => {
    expect(DEFAULT_THEME.name).toBe('Playroom')
    expect(DEFAULT_THEME).toBe(THEMES.playroom)
  })

  themeNames.forEach(name => {
    describe(`theme: ${name}`, () => {
      it('has required properties', () => {
        const theme = THEMES[name]
        expect(theme.name).toBeTruthy()
        expect(theme.canvasBg).toMatch(/^#[0-9a-fA-F]{6}$/)
        expect(theme.glyphColors.length).toBeGreaterThanOrEqual(3)
        expect(theme.particleColors.length).toBeGreaterThanOrEqual(3)
        expect(['confetti', 'star', 'bubble', 'leaf']).toContain(theme.particleShape)
      })

      it('has valid hex colors for glyphs', () => {
        THEMES[name].glyphColors.forEach(color => {
          expect(color).toMatch(/^#[0-9a-fA-F]{3,8}$|^[a-zA-Z]+$/)
        })
      })

      it('has valid hex colors for particles', () => {
        THEMES[name].particleColors.forEach(color => {
          expect(color).toMatch(/^#[0-9a-fA-F]{3,8}$|^[a-zA-Z]+$/)
        })
      })
    })
  })

  it('each theme has a unique canvas background', () => {
    const bgs = themeNames.map(n => THEMES[n].canvasBg)
    const unique = new Set(bgs)
    expect(unique.size).toBe(4)
  })

  it('each theme has a unique particle shape', () => {
    const shapes = themeNames.map(n => THEMES[n].particleShape)
    const unique = new Set(shapes)
    expect(unique.size).toBe(4)
  })
})
