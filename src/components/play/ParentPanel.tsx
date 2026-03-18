'use client'

import { useEffect } from 'react'
import { useFullscreen } from '@/hooks/useFullscreen'
import { THEMES } from '@/lib/themes'
import type { Theme } from '@/types/smash'

const THEME_META: Record<string, { emoji: string; ringColor: string }> = {
  Playroom: { emoji: '🎮', ringColor: '#FF6B6B' },
  Space: { emoji: '🚀', ringColor: '#C77DFF' },
  Ocean: { emoji: '🌊', ringColor: '#4D96FF' },
  Jungle: { emoji: '🌿', ringColor: '#6BCB77' },
}

interface ParentPanelProps {
  isOpen: boolean
  onClose: () => void
  currentTheme: Theme
  onThemeChange: (theme: Theme) => void
  soundEnabled: boolean
  onSoundToggle: () => void
}

export default function ParentPanel({
  isOpen,
  onClose,
  currentTheme,
  onThemeChange,
  soundEnabled,
  onSoundToggle,
}: ParentPanelProps) {
  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.8)' }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl p-8 shadow-2xl w-full max-w-sm mx-4 border border-white/10"
        style={{ background: '#1d293a' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Parent Settings</h2>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white text-2xl leading-none transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Theme Switcher */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wide mb-3">Theme</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(THEMES).map(theme => {
              const meta = THEME_META[theme.name] ?? { emoji: '🎨', ringColor: '#FF6B6B' }
              const isActive = currentTheme.name === theme.name
              return (
                <button
                  key={theme.name}
                  onClick={() => onThemeChange(theme)}
                  className={`p-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                    isActive ? 'scale-105' : 'hover:scale-105'
                  }`}
                  style={{
                    background: theme.canvasBg,
                    color: theme.glyphColors[0],
                    boxShadow: isActive ? `0 0 0 2px ${meta.ringColor}, 0 0 12px ${meta.ringColor}44` : 'none',
                  }}
                >
                  <span className="text-lg">{meta.emoji}</span>
                  <span>{theme.name}</span>
                  <span className="ml-auto flex gap-0.5">
                    {theme.glyphColors.slice(0, 3).map((c, i) => (
                      <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                    ))}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Sound Toggle */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-white/70">Sound</span>
          <button
            onClick={onSoundToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              soundEnabled ? 'bg-green-400' : 'bg-white/20'
            }`}
            role="switch"
            aria-checked={soundEnabled}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                soundEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Fullscreen Toggle */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-white/70">Fullscreen</span>
          <button
            onClick={toggleFullscreen}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isFullscreen ? 'bg-blue-400' : 'bg-white/20'
            }`}
            role="switch"
            aria-checked={isFullscreen}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isFullscreen ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <p className="mt-4 text-xs text-center text-white/30">
          Tip: hold top-left corner 2s or type &ldquo;ayaan&rdquo; to open
        </p>
      </div>
    </div>
  )
}
