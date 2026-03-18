import { describe, it, expect, beforeEach } from 'vitest'
import { PerformanceMonitor } from '@/engine/PerformanceMonitor'

describe('PerformanceMonitor', () => {
  let monitor: PerformanceMonitor

  beforeEach(() => {
    monitor = new PerformanceMonitor()
  })

  it('starts at lowPowerLevel 0', () => {
    expect(monitor.getLowPowerLevel()).toBe(0)
  })

  it('increases lowPowerLevel when FPS below 44', () => {
    // Simulate 10 frames at 30 FPS (33ms each)
    let t = 0
    for (let i = 0; i < 10; i++) {
      t += 33
      monitor.tick(t)
    }
    expect(monitor.getLowPowerLevel()).toBeGreaterThan(0)
  })

  it('does not exceed max lowPowerLevel of 2', () => {
    let t = 0
    for (let i = 0; i < 100; i++) {
      t += 100 // very slow FPS
      monitor.tick(t)
    }
    expect(monitor.getLowPowerLevel()).toBeLessThanOrEqual(2)
  })

  it('decreases lowPowerLevel when FPS above 56', () => {
    let t = 0
    // First push it up
    for (let i = 0; i < 20; i++) { t += 33; monitor.tick(t) }
    const highLevel = monitor.getLowPowerLevel()
    // Then run fast
    for (let i = 0; i < 30; i++) { t += 15; monitor.tick(t) } // ~67 FPS
    expect(monitor.getLowPowerLevel()).toBeLessThan(highLevel)
  })
})
