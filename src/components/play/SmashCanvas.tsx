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
      // Basic key handling for now — will be replaced in commit 6
      const blocked = ['Tab', 'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F12']
      if (blocked.includes(e.key)) {
        e.preventDefault()
        return
      }
      if (e.ctrlKey || e.metaKey || e.altKey) {
        e.preventDefault()
      }
      const char = /^[a-zA-Z]$/.test(e.key) ? e.key.toUpperCase() : e.key.length === 1 ? e.key : '🎉'
      engine.spawnGlyph(char)
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
