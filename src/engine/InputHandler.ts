import type { EmojiPool } from '@/lib/emojiPool'

const BLOCKED_KEYS = new Set([
  'Tab', 'Escape',
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F12',
])

export interface InputResult {
  char: string
  type: 'letter' | 'digit' | 'emoji'
}

export class InputHandler {
  private emojiPool: EmojiPool

  constructor(emojiPool: EmojiPool) {
    this.emojiPool = emojiPool
  }

  handle(event: KeyboardEvent): InputResult | null {
    // Block dangerous keys
    if (BLOCKED_KEYS.has(event.key)) {
      event.preventDefault()
      return null
    }

    // Block modifier combos for browser (but still animate)
    if (event.ctrlKey || event.metaKey || event.altKey) {
      event.preventDefault()
    }

    // Letter
    if (/^[a-zA-Z]$/.test(event.key)) {
      return { char: event.key.toUpperCase(), type: 'letter' }
    }

    // Digit
    if (/^[0-9]$/.test(event.key)) {
      return { char: event.key, type: 'digit' }
    }

    // Everything else → emoji
    return { char: this.emojiPool.next(), type: 'emoji' }
  }
}
