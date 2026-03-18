import { describe, it, expect, vi, beforeEach } from 'vitest'
import { InputHandler } from '@/engine/InputHandler'

function makeEvent(key: string, options: Partial<KeyboardEvent> = {}): KeyboardEvent {
  return {
    key,
    ctrlKey: false,
    metaKey: false,
    altKey: false,
    repeat: false,
    preventDefault: vi.fn(),
    ...options,
  } as unknown as KeyboardEvent
}

describe('InputHandler', () => {
  let handler: InputHandler
  const mockEmojiPool = { next: () => '🎉' } as import('@/lib/emojiPool').EmojiPool

  beforeEach(() => {
    handler = new InputHandler(mockEmojiPool)
  })

  it('maps letters to uppercase', () => {
    const result = handler.handle(makeEvent('a'))
    expect(result?.char).toBe('A')
    expect(result?.type).toBe('letter')
  })

  it('maps uppercase letters to uppercase', () => {
    const result = handler.handle(makeEvent('Z'))
    expect(result?.char).toBe('Z')
  })

  it('maps digits through', () => {
    const result = handler.handle(makeEvent('5'))
    expect(result?.char).toBe('5')
    expect(result?.type).toBe('digit')
  })

  it('maps symbols to emoji', () => {
    const result = handler.handle(makeEvent('!'))
    expect(result?.char).toBe('🎉')
    expect(result?.type).toBe('emoji')
  })

  it('maps Space to emoji', () => {
    const result = handler.handle(makeEvent(' '))
    expect(result?.char).toBe('🎉')
    expect(result?.type).toBe('emoji')
  })

  it('maps Enter to emoji', () => {
    const result = handler.handle(makeEvent('Enter'))
    expect(result?.char).toBe('🎉')
    expect(result?.type).toBe('emoji')
  })

  it('maps arrow keys to emoji', () => {
    const result = handler.handle(makeEvent('ArrowUp'))
    expect(result?.char).toBe('🎉')
    expect(result?.type).toBe('emoji')
  })

  it('returns null for Tab (blocked)', () => {
    const event = makeEvent('Tab')
    const result = handler.handle(event)
    expect(result).toBeNull()
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('returns null for Escape (blocked)', () => {
    const event = makeEvent('Escape')
    const result = handler.handle(event)
    expect(result).toBeNull()
  })

  it('returns null for F1-F10 (blocked)', () => {
    for (let i = 1; i <= 10; i++) {
      const result = handler.handle(makeEvent(`F${i}`))
      expect(result).toBeNull()
    }
  })

  it('returns null for F12 (blocked)', () => {
    const result = handler.handle(makeEvent('F12'))
    expect(result).toBeNull()
  })

  it('does NOT block F11', () => {
    const result = handler.handle(makeEvent('F11'))
    expect(result?.char).toBe('🎉') // F11 → emoji (not blocked)
  })

  it('fires animation for modifier combos but calls preventDefault', () => {
    const event = makeEvent('c', { ctrlKey: true })
    const result = handler.handle(event)
    expect(event.preventDefault).toHaveBeenCalled()
    expect(result).not.toBeNull() // animation still fires
  })

  it('fires for repeated keys (event.repeat not checked)', () => {
    const event = makeEvent('a', { repeat: true })
    const result = handler.handle(event)
    expect(result).not.toBeNull()
  })
})
