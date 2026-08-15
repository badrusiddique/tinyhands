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
  const hiddenInputRef = useRef<HTMLInputElement>(null)
  const engineRef = useSmashEngine(canvasRef)
  const isDragging = useRef(false)
  const lastPointerPos = useRef({ x: 0, y: 0 })
  const lastParticleTime = useRef(0)
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [currentTheme, setCurrentTheme] = useState<Theme>(DEFAULT_THEME)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showHint, setShowHint] = useState(true)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const panelHook = useParentPanel()

  // Auto-hide the hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000)
    return () => clearTimeout(timer)
  }, [])

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

      // When the hidden input is focused (touch mode), trusted keydown events are
      // also fired alongside the 'input' event. Skip here — handleHiddenInput
      // re-calls this function with a synthetic (non-trusted) event instead.
      if (e.isTrusted && hiddenInputRef.current && document.activeElement === hiddenInputRef.current) {
        if (e.key === 'Escape' && panelHook.isOpen) panelHook.close()
        return
      }

      // Hide hint on first keypress
      setShowHint(false)

      if (panelHook.isOpen) {
        if (e.key === 'Escape') {
          panelHook.close()
        }
        e.preventDefault()
        return
      }

      panelHook.onKey(e.key)

      engine.handleKeyDown(e)
    }

    function handlePointerMove(e: PointerEvent) {
      const engine = engineRef.current
      if (!engine) return

      const now = performance.now()
      const interval = isDragging.current ? 50 : 30
      if (now - lastParticleTime.current < interval) return
      lastParticleTime.current = now

      engine.handlePointerMove(e.clientX, e.clientY, isDragging.current, lastPointerPos.current.x, lastPointerPos.current.y)
      lastPointerPos.current = { x: e.clientX, y: e.clientY }
    }

    function handlePointerDown(e: PointerEvent) {
      isDragging.current = true
      lastPointerPos.current = { x: e.clientX, y: e.clientY }
      setShowHint(false)

      // Bring up virtual keyboard on touch/pen devices
      if (e.pointerType !== 'mouse') {
        hiddenInputRef.current?.focus()
      }

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

    // Handle input from virtual keyboard (Android fires 'input' not 'keydown' reliably)
    function handleHiddenInput(e: Event) {
      const data = (e as InputEvent).data
      if (!data) return
      for (const char of data) {
        // Synthetic events are isTrusted=false, so handleKeyDown won't re-filter them
        handleKeyDown(new KeyboardEvent('keydown', { key: char, bubbles: true }))
      }
    }

    const hiddenInput = hiddenInputRef.current

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerCancel)
    hiddenInput?.addEventListener('input', handleHiddenInput)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerCancel)
      hiddenInput?.removeEventListener('input', handleHiddenInput)
    }
  }, [engineRef, panelHook])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="block"
        style={{ touchAction: 'none', cursor: 'none' }}
      />

      {/* Hidden input to trigger virtual keyboard on touch devices */}
      <input
        ref={hiddenInputRef}
        type="text"
        inputMode="text"
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: 'none',
          fontSize: 16, // prevents iOS zoom on focus
        }}
      />

      {/* First-run hint */}
      {showHint && !panelHook.isOpen && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
        >
          <p
            className="font-nunito font-bold text-3xl sm:text-4xl text-white/50 animate-pulse select-none"
          >
            {isTouchDevice ? 'Tap to type! ⌨️' : 'Press any key! 🎹'}
          </p>
        </div>
      )}

      <ParentPanel
        isOpen={panelHook.isOpen}
        onClose={panelHook.close}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        soundEnabled={soundEnabled}
        onSoundToggle={handleSoundToggle}
      />

      {!panelHook.isOpen && (
        <button
          onClick={panelHook.open}
          className="fixed bottom-5 left-5 z-30 flex items-center gap-2 rounded-full px-3 py-2 transition-all hover:scale-105"
          style={{
            background: 'rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.75)',
            border: '1px solid rgba(255,255,255,0.2)',
            fontSize: '14px',
            fontFamily: 'Nunito, sans-serif',
            backdropFilter: 'blur(4px)',
            cursor: 'pointer',
          }}
          title="Themes & Settings (or type 'ayaan')"
          aria-label="Open parent settings"
        >
          🎨 Themes
        </button>
      )}
    </>
  )
}
