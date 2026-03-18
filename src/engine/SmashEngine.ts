import { GlyphSystem } from './GlyphSystem'
import { ParticleSystem } from './ParticleSystem'
import { PerformanceMonitor } from './PerformanceMonitor'
import { InputHandler } from './InputHandler'
import { AudioSystem } from './AudioSystem'
import { IdleDemo } from './IdleDemo'
import { EmojiPool } from '@/lib/emojiPool'
import { CAPS } from '@/lib/constants'
import { DEFAULT_THEME } from '@/lib/themes'
import type { Theme } from '@/types/smash'

export class SmashEngine {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private glyphSystem: GlyphSystem
  private particleSystem: ParticleSystem
  private perfMonitor: PerformanceMonitor
  private inputHandler: InputHandler
  private audioSystem: AudioSystem
  private idleDemo: IdleDemo
  private rafId: number | null = null
  private lastTimestamp = 0
  private theme: Theme
  private prefersReducedMotion: boolean
  private ambientDots: Array<{ x: number; y: number; size: number; speed: number; opacity: number }> = []

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
    this.particleSystem = new ParticleSystem({
      particleCap: this.prefersReducedMotion ? CAPS.PARTICLE_REDUCED : CAPS.PARTICLE_DEFAULT,
      prefersReducedMotion: this.prefersReducedMotion,
      theme: this.theme,
    })
    this.perfMonitor = new PerformanceMonitor()
    const emojiPool = new EmojiPool()
    this.inputHandler = new InputHandler(emojiPool)
    this.audioSystem = new AudioSystem()
    this.idleDemo = new IdleDemo((char, strength) => {
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight * 0.7 + window.innerHeight * 0.15
      this.glyphSystem.spawnWithStrength(char, x, y, strength)
    })
    this.resizeCanvas()
    this.initAmbientDots()
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
    this.idleDemo.destroy()
    window.removeEventListener('resize', this.resizeCanvas)
  }

  private loop = (timestamp: number): void => {
    this.perfMonitor.tick(timestamp)
    const dt = Math.min((timestamp - this.lastTimestamp) / 1000, 0.1) // cap at 100ms
    this.lastTimestamp = timestamp

    this.idleDemo.update(dt)
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

    // Reduce particle cap at lowPowerLevel >= 1
    if (lpl >= 1) {
      this.particleSystem.setCap(Math.floor(CAPS.PARTICLE_DEFAULT / 2))
    }

    this.ctx.fillStyle = bgColor
    this.ctx.fillRect(0, 0, w, h)

    // Ambient dot field (renders after background, before glyphs)
    this.renderAmbientDots(dt, w, h)

    this.glyphSystem.update(dt)
    this.glyphSystem.render(this.ctx)

    this.particleSystem.update(dt)
    this.particleSystem.render(this.ctx)

    // Render "made for ayaan" tag during idle demo
    const tagOpacity = this.idleDemo.getAyaanTagOpacity()
    if (tagOpacity > 0) {
      const ctx = this.ctx
      ctx.save()
      ctx.globalAlpha = tagOpacity
      ctx.font = '14px Nunito, sans-serif'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.textAlign = 'right'
      ctx.textBaseline = 'bottom'
      ctx.fillText('Made for AYAAN \uD83E\uDDE1', w - 24, h - 24)
      ctx.restore()
    }
  }

  private initAmbientDots(): void {
    const count = this.prefersReducedMotion ? 0 : 150
    this.ambientDots = []
    for (let i = 0; i < count; i++) {
      this.ambientDots.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 1 + Math.random() * 3,         // 1-4px
        speed: 15 + Math.random() * 25,       // 15-40px/s upward
        opacity: 0.25 + Math.random() * 0.35, // 0.25-0.60 - much more visible
      })
    }
  }

  private renderAmbientDots(dt: number, w: number, h: number): void {
    for (const dot of this.ambientDots) {
      // Drift upward with gentle horizontal sway (snow-like)
      dot.y -= dot.speed * dt
      dot.x += Math.sin(dot.y * 0.02) * 0.4  // gentle sway

      // Wrap around top
      if (dot.y < -dot.size) {
        dot.y = h + dot.size
        dot.x = Math.random() * w
      }

      this.ctx.save()
      this.ctx.globalAlpha = dot.opacity
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'  // white snow
      this.ctx.beginPath()
      this.ctx.arc(dot.x, dot.y, dot.size / 2, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.restore()
    }
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
    this.particleSystem.setTheme(theme)
  }

  recordInput(): void {
    this.idleDemo.recordInput()
  }

  handlePointerMove(x: number, y: number, isDragging: boolean, lastX: number, lastY: number): void {
    this.idleDemo.recordInput()
    // Note: throttling handled in SmashCanvas via timestamp tracking

    // Interpolate between last and current position for smooth trail
    const dx = x - lastX
    const dy = y - lastY
    const dist = Math.sqrt(dx * dx + dy * dy)
    const steps = Math.max(1, Math.floor(dist / 20))

    for (let i = 0; i < steps; i++) {
      const t = i / steps
      const ix = lastX + dx * t
      const iy = lastY + dy * t
      this.particleSystem.spawn(ix, iy, 2)
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    this.idleDemo.recordInput()
    const result = this.inputHandler.handle(event)
    if (!result) return
    this.spawnGlyph(result.char)
    this.audioSystem.playTone(result.type)
  }

  setSoundEnabled(enabled: boolean): void {
    this.audioSystem.setEnabled(enabled)
  }

  getTheme(): Theme {
    return this.theme
  }

  isSoundEnabled(): boolean {
    return this.audioSystem.isEnabled()
  }
}
