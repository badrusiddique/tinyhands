'use client'

import { useEffect, useRef } from 'react'
import { SmashEngine } from '@/engine/SmashEngine'

export function useSmashEngine(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const engineRef = useRef<SmashEngine | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const engine = new SmashEngine(canvasRef.current)
    engineRef.current = engine
    engine.start()

    return () => {
      engine.stop()
      engineRef.current = null
    }
  }, [canvasRef])

  return engineRef
}
