'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface StartButtonProps {
  className?: string
  children?: React.ReactNode
}

export default function StartButton({ className, children }: StartButtonProps) {
  const router = useRouter()

  const handleClick = useCallback(() => {
    // Try fullscreen (fire-and-forget, don't block navigation)
    try {
      const el = document.documentElement as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> }
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {})
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen().catch(() => {})
      }
    } catch {
      // Fullscreen not supported
    }
    // Navigate immediately
    router.push('/play')
  }, [router])

  return (
    <button onClick={handleClick} className={className}>
      {children ?? 'Start Smashing'}
    </button>
  )
}
