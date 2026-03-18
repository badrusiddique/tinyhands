'use client'

import { useState, useCallback } from 'react'
import { useFullscreen } from '@/hooks/useFullscreen'

export default function FullscreenManager() {
  const { toggle } = useFullscreen()
  const [started, setStarted] = useState(false)

  const handleStart = useCallback(async () => {
    // Request fullscreen synchronously within the click handler — this is a direct user gesture
    try {
      await toggle()
    } catch {
      // Fullscreen blocked (e.g., iframe) — continue anyway
    }
    setStarted(true)
  }, [toggle])

  if (started) return null

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center"
      style={{ background: 'rgba(13, 13, 26, 0.92)', cursor: 'pointer' }}
      onClick={handleStart}
    >
      <div className="text-center px-6">
        <div className="text-7xl mb-6 select-none">👶⌨️</div>
        <h1
          className="text-white font-extrabold mb-3 select-none"
          style={{ fontSize: '2.5rem', fontFamily: 'Nunito, sans-serif' }}
        >
          Ready to smash?
        </h1>
        <p
          className="mb-8 select-none"
          style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.1rem', fontFamily: 'Nunito, sans-serif' }}
        >
          Click anywhere to go fullscreen and start
        </p>
        <div
          className="inline-block font-bold rounded-full select-none"
          style={{
            background: '#FF6B6B',
            color: 'white',
            padding: '14px 48px',
            fontSize: '1.2rem',
            fontFamily: 'Nunito, sans-serif',
          }}
        >
          Start Smashing &rarr;
        </div>
      </div>
      <p
        className="absolute bottom-6 select-none"
        style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}
      >
        Press ESC to exit fullscreen
      </p>
    </div>
  )
}
