'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface StartButtonProps {
  className?: string
  children?: React.ReactNode
}

export default function StartButton({ className, children }: StartButtonProps) {
  const router = useRouter()

  const handleClick = useCallback(async () => {
    try {
      const el = document.documentElement as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> }
      if (el.requestFullscreen) await el.requestFullscreen()
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen()
    } catch {
      // Fullscreen blocked (e.g., iframe) — continue anyway
    }
    router.push('/play')
  }, [router])

  return (
    <button onClick={handleClick} className={className}>
      {children ?? 'Start Smashing →'}
    </button>
  )
}
