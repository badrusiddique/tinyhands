'use client'

import { useEffect } from 'react'
import { THEMES } from '@/lib/themes'
import type { Theme } from '@/types/smash'

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
  // Close on Escape
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
      style={{ background: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-sm mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Parent Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Theme Switcher */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Theme</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(THEMES).map(theme => (
              <button
                key={theme.name}
                onClick={() => onThemeChange(theme)}
                className={`p-3 rounded-xl text-sm font-semibold transition-all ${
                  currentTheme.name === theme.name
                    ? 'ring-2 ring-offset-2 ring-blue-400 scale-105'
                    : 'hover:scale-105'
                }`}
                style={{ background: theme.canvasBg, color: theme.glyphColors[0] }}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sound Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">Sound</span>
          <button
            onClick={onSoundToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              soundEnabled ? 'bg-green-400' : 'bg-gray-300'
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

      </div>
    </div>
  )
}
