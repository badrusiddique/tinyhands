import { describe, it, expect, beforeEach } from 'vitest'
import { ParticleSystem } from '@/engine/ParticleSystem'
import { DEFAULT_THEME } from '@/lib/themes'

describe('ParticleSystem', () => {
  let system: ParticleSystem

  beforeEach(() => {
    system = new ParticleSystem({ particleCap: 280, prefersReducedMotion: false, theme: DEFAULT_THEME })
  })

  it('spawns particles with correct properties', () => {
    system.spawn(100, 100, 5)
    const particles = system.getParticles()
    expect(particles).toHaveLength(5)
    const p = particles[0]
    expect(p.x).toBe(100)
    expect(p.y).toBe(100)
    expect(p.opacity).toBe(1)
    expect(p.age).toBe(0)
    expect(p.lifetime).toBeGreaterThan(0)
    expect(p.size).toBeGreaterThan(0)
  })

  it('enforces particle cap', () => {
    system.spawn(0, 0, 280)
    expect(system.getParticles()).toHaveLength(280)
    system.spawn(0, 0, 10)
    // Cap enforced - oldest particles culled, total stays at or below cap
    expect(system.getParticles().length).toBeLessThanOrEqual(280)
  })

  it('removes particles past their lifetime', () => {
    system.spawn(0, 0, 3)
    system.update(10) // well past any particle lifetime
    expect(system.getParticles()).toHaveLength(0)
  })

  it('moves particles during update', () => {
    system.spawn(100, 100, 1)
    const before = { ...system.getParticles()[0] }
    system.update(0.1)
    const after = system.getParticles()[0]
    expect(after.x).not.toBe(before.x)
    expect(after.y).not.toBe(before.y)
  })

  it('fades out particles as they age', () => {
    system.spawn(0, 0, 1)
    const p = system.getParticles()[0]
    p.age = p.lifetime * 0.8
    system.update(0.001)
    expect(system.getParticles()[0].opacity).toBeLessThan(1)
  })

  it('accepts custom shape from theme', () => {
    system.spawn(0, 0, 3)
    const shapes = system.getParticles().map(p => p.shape)
    shapes.forEach(s => expect(['confetti', 'star', 'bubble', 'leaf']).toContain(s))
  })
})
