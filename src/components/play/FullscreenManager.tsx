'use client'

import { useEffect, useState } from 'react'
import { useFullscreen } from '@/hooks/useFullscreen'

export default function FullscreenManager() {
  const { isFullscreen, toggle } = useFullscreen()
  const [showTip, setShowTip] = useState(false)
  const [attempted, setAttempted] = useState(false)

  useEffect(() => {
    if (attempted) return
    setAttempted(true)

    // Small delay so the page has painted before requesting fullscreen
    const timer = setTimeout(async () => {
      try {
        await toggle()
      } catch {
        setShowTip(true)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isFullscreen) setShowTip(false)
  }, [isFullscreen])

  if (!showTip) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 text-center py-1.5 text-xs font-semibold"
      style={{ background: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.7)' }}
    >
      Tip: press F11 for fullscreen
    </div>
  )
}
