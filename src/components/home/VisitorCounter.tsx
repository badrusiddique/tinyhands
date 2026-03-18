'use client'

import { useVisitorCount } from '@/hooks/useVisitorCount'

export default function VisitorCounter() {
  const { count, loading } = useVisitorCount()

  if (loading) return null

  return (
    <p className="text-center text-sm text-gray-500 mt-4">
      👁 {count.toLocaleString()} visits so far
    </p>
  )
}
