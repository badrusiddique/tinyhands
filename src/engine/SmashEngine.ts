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

interface AmbientDot {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  phase: number
}

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
  private ambientDots: AmbientDot[] = []

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
    const dt = Math.min((timestamp - this.lastTimestamp) / 1000, 0.1)
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

    // Radial vignette for depth
    if (lpl < 2) {
      const gradient = this.ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7)
      gradient.addColorStop(0, 'rgba(0,0,0,0)')
      gradient.addColorStop(1, 'rgba(0,0,0,0.4)')
      this.ctx.fillStyle = gradient
      this.ctx.fillRect(0, 0, w, h)
    }

    // Ambient dot field (renders after background, before glyphs)
    this.renderAmbientDots(dt, w, h, timestamp)

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
    if (this.prefersReducedMotion) {
      this.ambientDots = []
      return
    }
    const w = window.innerWidth
    const h = window.innerHeight
    const count = Math.min(200, 60 + Math.floor((w * h) / 25000))
    this.ambientDots = []
    for (let i = 0; i < count; i++) {
      this.ambientDots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 2 + Math.random() * 5,
        speed: 8 + Math.random() * 20,
        opacity: 0.2 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      })
    }
  }

  private renderAmbientDots(dt: number, w: number, h: number, timestamp: number): void {
    const ambientColor = this.theme.ambientColor
    const ambientShape = this.theme.ambientShape

    for (const dot of this.ambientDots) {
      dot.y -= dot.speed * dt
      dot.x += Math.sin(dot.y * 0.02) * 0.4

      if (dot.y < -dot.size) {
        dot.y = h + dot.size
        dot.x = Math.random() * w
      }

      // Sine-wave opacity pulse
      const pulsedOpacity = dot.opacity * (0.7 + 0.3 * Math.sin(timestamp * 0.001 + dot.phase))

      this.ctx.save()
      this.ctx.globalAlpha = pulsedOpacity
      this.ctx.fillStyle = ambientColor

      switch (ambientShape) {
        case 'star': {
          this.ctx.translate(dot.x, dot.y)
          const outer = dot.size / 2
          const inner = outer * 0.4
          this.ctx.beginPath()
          for (let i = 0; i < 8; i++) {
            const r = i % 2 === 0 ? outer : inner
            const angle = (i * Math.PI) / 4 - Math.PI / 2
            if (i === 0) this.ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r)
            else this.ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r)
          }
          this.ctx.closePath()
          this.ctx.fill()
          break
        }
        case 'bubble':
          this.ctx.beginPath()
          this.ctx.arc(dot.x, dot.y, dot.size / 2, 0, Math.PI * 2)
          this.ctx.fill()
          // Highlight
          this.ctx.globalAlpha = pulsedOpacity * 0.5
          this.ctx.fillStyle = 'white'
          this.ctx.beginPath()
          this.ctx.arc(dot.x - dot.size * 0.15, dot.y - dot.size * 0.15, dot.size * 0.2, 0, Math.PI * 2)
          this.ctx.fill()
          break
        case 'spark':
          this.ctx.translate(dot.x, dot.y)
          this.ctx.rotate(dot.phase + timestamp * 0.001)
          this.ctx.fillRect(-dot.size * 0.15, -dot.size * 0.6, dot.size * 0.3, dot.size * 1.2)
          break
        default:
          this.ctx.beginPath()
          this.ctx.arc(dot.x, dot.y, dot.size / 2, 0, Math.PI * 2)
          this.ctx.fill()
      }

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
    const margin = window.innerWidth * 0.15
    const x = margin + Math.random() * (window.innerWidth - margin * 2)
    const y = window.innerHeight * 0.3 + Math.random() * window.innerHeight * 0.4
    this.glyphSystem.spawn(char, x, y)
  }

  setTheme(theme: Theme): void {
    this.theme = theme
    this.glyphSystem.setTheme(theme)
    this.particleSystem.setTheme(theme)
    this.initAmbientDots()
  }

  recordInput(): void {
    this.idleDemo.recordInput()
  }

  handlePointerMove(x: number, y: number, isDragging: boolean, lastX: number, lastY: number): void {
    this.idleDemo.recordInput()

    const dx = x - lastX
    const dy = y - lastY
    const dist = Math.sqrt(dx * dx + dy * dy)
    const steps = Math.max(1, Math.floor(dist / 20))

    for (let i = 0; i < steps; i++) {
      const t = i / steps
      const ix = lastX + dx * t
      const iy = lastY + dy * t
      this.particleSystem.spawn(ix, iy, 3)
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
