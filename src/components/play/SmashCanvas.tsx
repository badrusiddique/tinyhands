'use client'

import { useRef, useEffect, useState } from 'react'
import { useSmashEngine } from '@/hooks/useSmashEngine'
import { useParentPanel } from '@/hooks/useParentPanel'
import ParentPanel from '@/components/play/ParentPanel'
import { DEFAULT_THEME } from '@/lib/themes'
import { PARENT_PANEL } from '@/lib/constants'
import type { Theme } from '@/types/smash'

export default function SmashCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useSmashEngine(canvasRef)
  const isDragging = useRef(false)
  const lastPointerPos = useRef({ x: 0, y: 0 })
  const lastParticleTime = useRef(0)
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [currentTheme, setCurrentTheme] = useState<Theme>(DEFAULT_THEME)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const panelHook = useParentPanel()

  function handleThemeChange(theme: Theme) {
    engineRef.current?.setTheme(theme)
    setCurrentTheme(theme)
    panelHook.close()
  }

  function handleSoundToggle() {
    const next = !soundEnabled
    engineRef.current?.setSoundEnabled(next)
    setSoundEnabled(next)
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const engine = engineRef.current
      if (!engine) return

      // If panel is open, only allow Escape through (to close the panel)
      if (panelHook.isOpen) {
        if (e.key === 'Escape') {
          panelHook.close()
        }
        e.preventDefault()
        return
      }

      // Feed key to parent panel secret word detector
      panelHook.onKey(e.key)

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

      // Long press detection for top-left corner
      if (e.clientX <= PARENT_PANEL.LONG_PRESS_AREA && e.clientY <= PARENT_PANEL.LONG_PRESS_AREA) {
        longPressRef.current = setTimeout(() => {
          panelHook.open()
        }, PARENT_PANEL.LONG_PRESS_MS)
      }
    }

    function handlePointerUp() {
      isDragging.current = false
      if (longPressRef.current) {
        clearTimeout(longPressRef.current)
        longPressRef.current = null
      }
    }

    function handlePointerCancel() {
      isDragging.current = false
      if (longPressRef.current) {
        clearTimeout(longPressRef.current)
        longPressRef.current = null
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerCancel)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerCancel)
    }
  }, [engineRef, panelHook])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="block"
        style={{ touchAction: 'none', cursor: 'none' }}
      />
      <ParentPanel
        isOpen={panelHook.isOpen}
        onClose={panelHook.close}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        soundEnabled={soundEnabled}
        onSoundToggle={handleSoundToggle}
      />
    </>
  )
}
