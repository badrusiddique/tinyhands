'use client'

import { useRef, useEffect } from 'react'
import { useSmashEngine } from '@/hooks/useSmashEngine'

export default function SmashCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useSmashEngine(canvasRef)
  const isDragging = useRef(false)
  const lastPointerPos = useRef({ x: 0, y: 0 })
  const lastParticleTime = useRef(0)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const engine = engineRef.current
      if (!engine) return
      engine.handleKeyDown(e)
    }

    function handlePointerMove(e: PointerEvent) {
      const engine = engineRef.current
      if (!engine) return

      const now = performance.now()
      const interval = isDragging.current ? 52 : 34
      if (now - lastParticleTime.current < interval) return
      lastParticleTime.current = now

      engine.handlePointerMove(e.clientX, e.clientY, isDragging.current, lastPointerPos.current.x, lastPointerPos.current.y)
      lastPointerPos.current = { x: e.clientX, y: e.clientY }
    }

    function handlePointerDown(e: PointerEvent) {
      isDragging.current = true
      lastPointerPos.current = { x: e.clientX, y: e.clientY }
    }

    function handlePointerUp() {
      isDragging.current = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [engineRef])

  return (
    <canvas
      ref={canvasRef}
      className="block"
      style={{ touchAction: 'none', cursor: 'none' }}
    />
  )
}
