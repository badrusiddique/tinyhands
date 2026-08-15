import { renderHook, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const mockSessionStorage: Record<string, string> = {}
vi.stubGlobal('sessionStorage', {
  getItem: (key: string) => mockSessionStorage[key] ?? null,
  setItem: (key: string, value: string) => { mockSessionStorage[key] = value },
  removeItem: (key: string) => { delete mockSessionStorage[key] },
})

const mockFetch = vi.fn()
global.fetch = mockFetch

describe('useVisitorCount', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    vi.resetModules()
    mockFetch.mockReset()
    // Clear sessionStorage backing object between tests
    Object.keys(mockSessionStorage).forEach(k => delete mockSessionStorage[k])
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('POSTs by=10 on first session visit and shows the returned count', async () => {
    // No SESSION_KEY set → first visit
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ count: 110 }) })

    const { useVisitorCount } = await import('@/hooks/useVisitorCount')
    const { result } = renderHook(() => useVisitorCount())

    await waitFor(() => expect(result.current.count).toBe(110))
    expect(mockFetch).toHaveBeenCalledWith('/api/visitors?by=10', { method: 'POST' })
  })

  it('GETs count on a returning session visit', async () => {
    // Simulate returning visitor
    mockSessionStorage['th_visited'] = '1'
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ count: 41 }) })

    const { useVisitorCount } = await import('@/hooks/useVisitorCount')
    const { result } = renderHook(() => useVisitorCount())

    await waitFor(() => expect(result.current.count).toBe(41))
    expect(mockFetch).toHaveBeenCalledWith('/api/visitors')
  })

  it('POSTs every 60s to increment count', async () => {
    // Simulate returning visitor so the 60s ticks are the only POSTs
    mockSessionStorage['th_visited'] = '1'
    let counter = 10
    mockFetch.mockImplementation(async (_url: string, opts?: RequestInit) => {
      if (opts?.method === 'POST') counter++
      return { ok: true, json: async () => ({ count: counter }) }
    })

    const { useVisitorCount } = await import('@/hooks/useVisitorCount')
    const { result } = renderHook(() => useVisitorCount())

    await waitFor(() => expect(result.current.count).toBe(10))

    // After 60s: 1 increment
    await act(async () => { vi.advanceTimersByTime(60_000) })
    await waitFor(() => expect(result.current.count).toBe(11))

    // After another 60s: 2nd increment
    await act(async () => { vi.advanceTimersByTime(60_000) })
    await waitFor(() => expect(result.current.count).toBe(12))

    const postCalls = mockFetch.mock.calls.filter(
      ([, opts]: [string, RequestInit?]) => opts?.method === 'POST'
    )
    expect(postCalls).toHaveLength(2)
  })

  it('returns 0 on fetch error', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'))

    const { useVisitorCount } = await import('@/hooks/useVisitorCount')
    const { result } = renderHook(() => useVisitorCount())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.count).toBe(0)
  })
})
