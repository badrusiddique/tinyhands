'use client'

import { useState, useEffect } from 'react'

const TICK_INTERVAL_MS = 60_000

export function useVisitorCount() {
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch current count immediately
    fetch('/api/visitors')
      .then(res => res.json())
      .then(data => setCount(data.count))
      .catch(() => setCount(0))
      .finally(() => setLoading(false))

    // Increment every 60s the user stays on the site
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/visitors', { method: 'POST' })
        const data = await res.json()
        setCount(data.count)
      } catch {
        // Failed to increment, will retry next tick
      }
    }, TICK_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [])

  return { count, loading }
}
