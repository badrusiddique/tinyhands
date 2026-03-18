'use client'

import { useState, useRef, useCallback } from 'react'
import { PARENT_PANEL } from '@/lib/constants'

export function useParentPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const bufferRef = useRef<string>('')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onKey = useCallback((key: string) => {
    const lower = key.toLowerCase()

    // Only append single printable characters
    if (lower.length !== 1) return

    bufferRef.current = (bufferRef.current + lower).slice(-5)

    // Clear existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      bufferRef.current = ''
    }, PARENT_PANEL.BUFFER_TIMEOUT_MS)

    // Check for secret words
    for (const word of PARENT_PANEL.SECRET_WORDS) {
      if (bufferRef.current.endsWith(word)) {
        bufferRef.current = ''
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setIsOpen(true)
        return
      }
    }
  }, [])

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return { isOpen, open, close, onKey }
}
