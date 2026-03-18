export class AudioSystem {
  private ctx: AudioContext | null = null
  private enabled = true

  private getCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    }
    return this.ctx
  }

  playTone(type: 'letter' | 'digit' | 'emoji'): void {
    if (!this.enabled) return

    try {
      const ctx = this.getCtx()
      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()

      oscillator.connect(gain)
      gain.connect(ctx.destination)

      if (type === 'emoji') {
        oscillator.type = 'triangle'
        oscillator.frequency.value = 300 + Math.random() * 200
      } else {
        oscillator.type = 'sine'
        oscillator.frequency.value = 400 + Math.random() * 200
      }

      const now = ctx.currentTime
      gain.gain.setValueAtTime(0.15, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

      oscillator.start(now)
      oscillator.stop(now + 0.12)
    } catch {
      // Ignore audio errors (e.g., user hasn't interacted yet)
    }
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }

  isEnabled(): boolean {
    return this.enabled
  }
}
