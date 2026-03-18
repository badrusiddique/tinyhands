'use client'

import { useRef, useEffect } from 'react'
import { useSmashEngine } from '@/hooks/useSmashEngine'

export default function SmashCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useSmashEngine(canvasRef)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const engine = engineRef.current
      if (!engine) return
      engine.handleKeyDown(e)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [engineRef])

  return (
    <canvas
      ref={canvasRef}
      className="block"
      style={{ touchAction: 'none', cursor: 'none' }}
    />
  )
}
