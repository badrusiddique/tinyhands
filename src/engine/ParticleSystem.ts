import type { Particle, Theme } from '@/types/smash'

interface ParticleSystemConfig {
  particleCap: number
  prefersReducedMotion: boolean
  theme: Theme
}

export class ParticleSystem {
  private particles: Particle[] = []
  private cap: number
  private theme: Theme
  private idCounter = 0

  constructor(config: ParticleSystemConfig) {
    this.cap = config.particleCap
    this.theme = config.theme
  }

  spawn(x: number, y: number, count: number): void {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 30 + Math.random() * 80

      const particle: Particle = {
        id: `p-${this.idCounter++}`,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 8,
        color: this.theme.particleColors[
          Math.floor(Math.random() * this.theme.particleColors.length)
        ],
        shape: this.theme.particleShape,
        opacity: 1,
        lifetime: 0.5 + Math.random() * 0.5,
        age: 0,
        rotation: Math.random() * Math.PI * 2,
      }

      this.particles.push(particle)
    }

    // Enforce cap by removing oldest particles
    if (this.particles.length > this.cap) {
      this.particles.splice(0, this.particles.length - this.cap)
    }
  }

  update(dt: number): void {
    for (const p of this.particles) {
      p.x += p.vx * dt
      p.y += p.vy * dt
      p.vx *= 0.98
      p.vy *= 0.98
      p.age += dt
      p.rotation += dt * 3

      // Fade based on age ratio
      p.opacity = Math.max(0, 1 - p.age / p.lifetime)
    }

    this.particles = this.particles.filter(p => p.age < p.lifetime)
  }

  render(ctx: CanvasRenderingContext2D): void {
    for (const p of this.particles) {
      ctx.save()
      ctx.globalAlpha = Math.max(0, p.opacity)
      ctx.fillStyle = p.color
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)

      switch (p.shape) {
        case 'confetti':
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
          break
        case 'star':
          this.drawStar(ctx, p.size)
          break
        case 'bubble':
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
          // Highlight
          ctx.globalAlpha = p.opacity * 0.4
          ctx.fillStyle = 'white'
          ctx.beginPath()
          ctx.arc(-p.size * 0.15, -p.size * 0.15, p.size * 0.2, 0, Math.PI * 2)
          ctx.fill()
          break
        case 'leaf':
          ctx.beginPath()
          ctx.ellipse(0, 0, p.size * 0.35, p.size * 0.6, 0, 0, Math.PI * 2)
          ctx.fill()
          break
        default:
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
      }

      ctx.restore()
    }
  }

  private drawStar(ctx: CanvasRenderingContext2D, size: number): void {
    const spikes = 4
    const outer = size / 2
    const inner = outer * 0.4
    ctx.beginPath()
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outer : inner
      const angle = (i * Math.PI) / spikes - Math.PI / 2
      if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r)
      else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r)
    }
    ctx.closePath()
    ctx.fill()
  }

  getParticles(): Particle[] {
    return this.particles
  }

  getCount(): number {
    return this.particles.length
  }

  setCap(cap: number): void {
    this.cap = cap
  }

  setTheme(theme: Theme): void {
    this.theme = theme
  }
}
