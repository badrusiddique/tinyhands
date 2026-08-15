'use client'

import { useState, useEffect } from 'react'

const TICK_INTERVAL_MS = 60_000
const SESSION_KEY = 'th_visited'

export function useVisitorCount() {
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function init() {
      try {
        if (!sessionStorage.getItem(SESSION_KEY)) {
          // First visit this session: increment by 10 and use the returned count
          sessionStorage.setItem(SESSION_KEY, '1')
          const res = await fetch('/api/visitors?by=10', { method: 'POST' })
          const data = await res.json()
          if (mounted) setCount(data.count)
        } else {
          // Returning visitor: just read the current count
          const res = await fetch('/api/visitors')
          const data = await res.json()
          if (mounted) setCount(data.count)
        }
      } catch {
        if (mounted) setCount(0)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    init()

    // Increment every 60s the user stays on the site
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/visitors?by=1', { method: 'POST' })
        const data = await res.json()
        if (mounted) setCount(data.count)
      } catch {
        // Failed to increment, will retry next tick
      }
    }, TICK_INTERVAL_MS)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  return { count, loading }
}
