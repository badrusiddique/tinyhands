import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('useParentPanel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts closed', async () => {
    const { useParentPanel } = await import('@/hooks/useParentPanel')
    const { result } = renderHook(() => useParentPanel())
    expect(result.current.isOpen).toBe(false)
  })

  it('opens when typing "ayaan"', async () => {
    const { useParentPanel } = await import('@/hooks/useParentPanel')
    const { result } = renderHook(() => useParentPanel())
    act(() => {
      result.current.onKey('a')
      result.current.onKey('y')
      result.current.onKey('a')
      result.current.onKey('a')
      result.current.onKey('n')
    })
    expect(result.current.isOpen).toBe(true)
  })

  it('opens when typing "annu"', async () => {
    const { useParentPanel } = await import('@/hooks/useParentPanel')
    const { result } = renderHook(() => useParentPanel())
    act(() => {
      result.current.onKey('a')
      result.current.onKey('n')
      result.current.onKey('n')
      result.current.onKey('u')
    })
    expect(result.current.isOpen).toBe(true)
  })

  it('opens when typing "baba"', async () => {
    const { useParentPanel } = await import('@/hooks/useParentPanel')
    const { result } = renderHook(() => useParentPanel())
    act(() => {
      result.current.onKey('b')
      result.current.onKey('a')
      result.current.onKey('b')
      result.current.onKey('a')
    })
    expect(result.current.isOpen).toBe(true)
  })

  it('is case-insensitive', async () => {
    const { useParentPanel } = await import('@/hooks/useParentPanel')
    const { result } = renderHook(() => useParentPanel())
    act(() => {
      result.current.onKey('A')
      result.current.onKey('Y')
      result.current.onKey('A')
      result.current.onKey('A')
      result.current.onKey('N')
    })
    expect(result.current.isOpen).toBe(true)
  })

  it('partial match does not open', async () => {
    const { useParentPanel } = await import('@/hooks/useParentPanel')
    const { result } = renderHook(() => useParentPanel())
    act(() => {
      result.current.onKey('a')
      result.current.onKey('y')
      result.current.onKey('a')
    })
    expect(result.current.isOpen).toBe(false)
  })

  it('buffer clears after 4 seconds', async () => {
    const { useParentPanel } = await import('@/hooks/useParentPanel')
    const { result } = renderHook(() => useParentPanel())
    act(() => {
      result.current.onKey('a')
      result.current.onKey('y')
      result.current.onKey('a')
    })
    act(() => { vi.advanceTimersByTime(4001) })
    act(() => {
      result.current.onKey('a')
      result.current.onKey('n')
    })
    expect(result.current.isOpen).toBe(false)
  })

  it('close() sets isOpen to false', async () => {
    const { useParentPanel } = await import('@/hooks/useParentPanel')
    const { result } = renderHook(() => useParentPanel())
    act(() => {
      result.current.onKey('b')
      result.current.onKey('a')
      result.current.onKey('b')
      result.current.onKey('a')
    })
    expect(result.current.isOpen).toBe(true)
    act(() => result.current.close())
    expect(result.current.isOpen).toBe(false)
  })
})
