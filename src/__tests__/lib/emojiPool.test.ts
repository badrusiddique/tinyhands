import { describe, it, expect } from 'vitest'
import { EmojiPool, EMOJI_POOL } from '@/lib/emojiPool'

describe('EmojiPool', () => {
  it('has 60 emojis', () => {
    expect(EMOJI_POOL).toHaveLength(60)
  })

  it('returns all 60 emojis before repeating any', () => {
    const pool = new EmojiPool()
    const seen = new Set<string>()
    for (let i = 0; i < 60; i++) {
      seen.add(pool.next())
    }
    expect(seen.size).toBe(60)
  })

  it('reshuffles and continues after exhaustion', () => {
    const pool = new EmojiPool()
    // Draw two full bags
    for (let i = 0; i < 120; i++) {
      expect(EMOJI_POOL).toContain(pool.next())
    }
  })

  it('no two consecutive identical emojis', () => {
    const pool = new EmojiPool()
    let prev = pool.next()
    for (let i = 0; i < 200; i++) {
      const curr = pool.next()
      expect(curr).not.toBe(prev)
      prev = curr
    }
  })
})
