import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

// Mock sessionStorage
const mockSessionStorage: Record<string, string> = {}
vi.stubGlobal('sessionStorage', {
  getItem: (key: string) => mockSessionStorage[key] ?? null,
  setItem: (key: string, value: string) => { mockSessionStorage[key] = value },
  removeItem: (key: string) => { delete mockSessionStorage[key] },
})

describe('useVisitorCount', () => {
  beforeEach(() => {
    mockFetch.mockReset()
    Object.keys(mockSessionStorage).forEach(k => delete mockSessionStorage[k])
  })

  it('POSTs on first visit and returns count', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ count: 42 }),
    })
    const { useVisitorCount } = await import('@/hooks/useVisitorCount')
    const { result } = renderHook(() => useVisitorCount())
    await waitFor(() => expect(result.current.count).toBe(42))
    expect(mockFetch).toHaveBeenCalledWith('/api/visitors', expect.objectContaining({ method: 'POST' }))
  })

  it('GETs on repeat visit (sessionStorage set)', async () => {
    mockSessionStorage['tinyhands-counted'] = 'true'
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ count: 99 }),
    })
    const { useVisitorCount } = await import('@/hooks/useVisitorCount')
    const { result } = renderHook(() => useVisitorCount())
    await waitFor(() => expect(result.current.count).toBe(99))
    // On repeat visit, fetch is called with only the URL (no options object with method: POST)
    const calls = mockFetch.mock.calls
    expect(calls.length).toBe(1)
    const [url, options] = calls[0]
    expect(url).toBe('/api/visitors')
    expect(options?.method).not.toBe('POST')
  })

  it('returns 0 on fetch error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))
    const { useVisitorCount } = await import('@/hooks/useVisitorCount')
    const { result } = renderHook(() => useVisitorCount())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.count).toBe(0)
  })
})
