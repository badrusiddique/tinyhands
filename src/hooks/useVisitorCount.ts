'use client'

import { useState, useEffect } from 'react'

export function useVisitorCount() {
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCount() {
      try {
        const alreadyCounted = sessionStorage.getItem('tinyhands-counted')
        let res: Response
        if (alreadyCounted) {
          res = await fetch('/api/visitors')
        } else {
          res = await fetch('/api/visitors', { method: 'POST' })
          sessionStorage.setItem('tinyhands-counted', 'true')
        }
        const data = await res.json()
        setCount(data.count)
      } catch {
        setCount(0)
      } finally {
        setLoading(false)
      }
    }
    fetchCount()
  }, [])

  return { count, loading }
}
