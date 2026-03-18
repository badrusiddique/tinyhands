import { IDLE } from '@/lib/constants'
import { EmojiPool } from '@/lib/emojiPool'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const AYAAN_TAG_FADE_IN_S = 0.5
const AYAAN_TAG_FADE_OUT_S = 0.2

export class IdleDemo {
  private onSpawn: (char: string, strength: number) => void
  private lastInputTime = 0
  private lastBurstTime = 0
  private active = false
  private hasInteracted = false
  private emojiPool: EmojiPool
  private ayaanTagOpacity = 0
  private ayaanTagFading: 'in' | 'out' | 'none' = 'none'

  constructor(onSpawn: (char: string, strength: number) => void) {
    this.onSpawn = onSpawn
    this.emojiPool = new EmojiPool()
  }

  recordInput(): void {
    this.hasInteracted = true
    this.lastInputTime = performance.now()
    if (this.active) {
      this.active = false
      this.ayaanTagFading = 'out'
    }
  }

  update(dt: number): void {
    // Never trigger until user has interacted at least once
    if (!this.hasInteracted) return

    const now = performance.now()
    const idleMs = now - this.lastInputTime

    if (!this.active && idleMs >= IDLE.TRIGGER_MS) {
      this.active = true
      this.lastBurstTime = now
      this.ayaanTagFading = 'in'
    }

    // Update ayaan tag opacity using dt (seconds)
    if (this.ayaanTagFading === 'in') {
      this.ayaanTagOpacity = Math.min(1, this.ayaanTagOpacity + dt / AYAAN_TAG_FADE_IN_S)
      if (this.ayaanTagOpacity >= 1) this.ayaanTagFading = 'none'
    } else if (this.ayaanTagFading === 'out') {
      this.ayaanTagOpacity = Math.max(0, this.ayaanTagOpacity - dt / AYAAN_TAG_FADE_OUT_S)
      if (this.ayaanTagOpacity <= 0) this.ayaanTagFading = 'none'
    }

    if (!this.active) return

    // Spawn burst every BURST_INTERVAL_MS
    if (now - this.lastBurstTime >= IDLE.BURST_INTERVAL_MS) {
      this.lastBurstTime = now
      const char = Math.random() < 0.5
        ? LETTERS[Math.floor(Math.random() * LETTERS.length)]
        : this.emojiPool.next()
      this.onSpawn(char, IDLE.STRENGTH)
    }
  }

  isActive(): boolean {
    return this.active
  }

  getAyaanTagOpacity(): number {
    return this.ayaanTagOpacity
  }

  destroy(): void {
    this.active = false
  }
}
