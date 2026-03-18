import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { IdleDemo } from '@/engine/IdleDemo'

describe('IdleDemo', () => {
  let idle: IdleDemo
  let onSpawn: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.useFakeTimers()
    onSpawn = vi.fn()
    idle = new IdleDemo(onSpawn)
  })

  afterEach(() => {
    vi.useRealTimers()
    idle.destroy()
  })

  it('does not spawn before 3000ms even after interaction', () => {
    idle.recordInput() // simulate first interaction
    vi.advanceTimersByTime(2999)
    idle.update(2.999)
    expect(onSpawn).not.toHaveBeenCalled()
  })

  it('does not activate without any user interaction', () => {
    // No recordInput() called - hasInteracted remains false
    vi.advanceTimersByTime(5000)
    idle.update(5)
    vi.advanceTimersByTime(700)
    idle.update(5.7)
    expect(onSpawn).not.toHaveBeenCalled()
    expect(idle.isActive()).toBe(false)
  })

  it('activates after 3000ms of no input following first interaction', () => {
    idle.recordInput() // simulate first interaction
    vi.advanceTimersByTime(3000)
    idle.update(3)
    // First burst at 700ms interval - need to also advance past burst interval
    vi.advanceTimersByTime(700)
    idle.update(3.7)
    expect(onSpawn).toHaveBeenCalled()
  })

  it('stops immediately on recordInput()', () => {
    idle.recordInput() // simulate first interaction
    vi.advanceTimersByTime(3000)
    idle.update(3)
    vi.advanceTimersByTime(700)
    idle.update(3.7)
    const callCount = onSpawn.mock.calls.length
    idle.recordInput()
    vi.advanceTimersByTime(1400) // two more burst intervals
    idle.update(5.1)
    // Should not have spawned more after recordInput
    expect(onSpawn.mock.calls.length).toBe(callCount)
  })

  it('isActive() returns true only when idle demo running', () => {
    expect(idle.isActive()).toBe(false)
    idle.recordInput() // simulate first interaction
    vi.advanceTimersByTime(3000)
    idle.update(3)
    // After trigger threshold, need to be past it
    expect(idle.isActive()).toBe(true)
  })

  it('isActive() returns false after recordInput()', () => {
    idle.recordInput() // simulate first interaction
    vi.advanceTimersByTime(3000)
    idle.update(3)
    expect(idle.isActive()).toBe(true)
    idle.recordInput()
    expect(idle.isActive()).toBe(false)
  })

  it('getAyaanTagOpacity() is 0 when not idle', () => {
    expect(idle.getAyaanTagOpacity()).toBe(0)
  })

  it('getAyaanTagOpacity() increases when idle is active', () => {
    idle.recordInput() // simulate first interaction
    vi.advanceTimersByTime(3000)
    idle.update(3)
    vi.advanceTimersByTime(300) // half of fade-in
    idle.update(3.3)
    expect(idle.getAyaanTagOpacity()).toBeGreaterThan(0)
  })
})
