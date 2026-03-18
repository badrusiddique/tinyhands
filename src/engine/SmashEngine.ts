import { GlyphSystem } from './GlyphSystem'
import { PerformanceMonitor } from './PerformanceMonitor'
import { CAPS } from '@/lib/constants'
import { DEFAULT_THEME } from '@/lib/themes'
import type { Theme } from '@/types/smash'

export class SmashEngine {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private glyphSystem: GlyphSystem
  private perfMonitor: PerformanceMonitor
  private rafId: number | null = null
  private lastTimestamp = 0
  private theme: Theme
  private soundEnabled = true
  private prefersReducedMotion: boolean

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    this.theme = DEFAULT_THEME
    this.glyphSystem = new GlyphSystem({
      glyphCap: this.prefersReducedMotion ? CAPS.GLYPH_REDUCED : CAPS.GLYPH_DEFAULT,
      prefersReducedMotion: this.prefersReducedMotion,
      theme: this.theme,
    })
    this.perfMonitor = new PerformanceMonitor()
    this.resizeCanvas()
    window.addEventListener('resize', this.resizeCanvas)
  }

  private resizeCanvas = (): void => {
    const dpr = window.devicePixelRatio || 1
    this.canvas.width = window.innerWidth * dpr
    this.canvas.height = window.innerHeight * dpr
    this.canvas.style.width = `${window.innerWidth}px`
    this.canvas.style.height = `${window.innerHeight}px`
    this.ctx.scale(dpr, dpr)
  }

  start(): void {
    if (this.rafId !== null) return
    this.lastTimestamp = performance.now()
    this.rafId = requestAnimationFrame(this.loop)
  }

  stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    window.removeEventListener('resize', this.resizeCanvas)
  }

  private loop = (timestamp: number): void => {
    this.perfMonitor.tick(timestamp)
    const dt = Math.min((timestamp - this.lastTimestamp) / 1000, 0.1) // cap at 100ms
    this.lastTimestamp = timestamp

    this.render(dt, timestamp)
    this.rafId = requestAnimationFrame(this.loop)
  }

  private render(dt: number, timestamp: number): void {
    const w = window.innerWidth
    const h = window.innerHeight

    // Background with subtle pulse (disabled at lowPowerLevel >= 2)
    const lpl = this.perfMonitor.getLowPowerLevel()
    let bgColor = this.theme.canvasBg
    if (lpl < 2) {
      const pulse = Math.sin(timestamp * 0.0004) * 8
      bgColor = this.applyBrightness(this.theme.canvasBg, pulse)
    }

    this.ctx.fillStyle = bgColor
    this.ctx.fillRect(0, 0, w, h)

    this.glyphSystem.update(dt)
    this.glyphSystem.render(this.ctx)
  }

  private applyBrightness(hex: string, delta: number): string {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v + delta)))
    return `rgb(${clamp(r)}, ${clamp(g)}, ${clamp(b)})`
  }

  spawnGlyph(char: string): void {
    const x = Math.random() * window.innerWidth
    const y = Math.random() * window.innerHeight * 0.7 + window.innerHeight * 0.15
    this.glyphSystem.spawn(char, x, y)
  }

  setTheme(theme: Theme): void {
    this.theme = theme
    this.glyphSystem.setTheme(theme)
  }

  setSoundEnabled(enabled: boolean): void {
    this.soundEnabled = enabled
  }

  getTheme(): Theme {
    return this.theme
  }

  isSoundEnabled(): boolean {
    return this.soundEnabled
  }
}
