import type { Theme } from '@/types/smash'

export const THEMES: Record<string, Theme> = {
  playroom: {
    name: 'Playroom',
    canvasBg: '#1d293a',
    glyphColors: ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#C77DFF'],
    particleColors: ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#C77DFF'],
    particleShape: 'confetti',
  },
  space: {
    name: 'Space',
    canvasBg: '#070d1a',
    glyphColors: ['#4D96FF', '#C77DFF', '#FFFFFF', '#88DDFF', '#DD88FF'],
    particleColors: ['#FFFFFF', '#88DDFF', '#DD88FF', '#4D96FF'],
    particleShape: 'star',
  },
  ocean: {
    name: 'Ocean',
    canvasBg: '#0f2f3b',
    glyphColors: ['#00CED1', '#20B2AA', '#FF6B6B', '#48D1CC', '#7FFFD4'],
    particleColors: ['#00CED1', '#48D1CC', '#7FFFD4', '#AFEEEE'],
    particleShape: 'bubble',
  },
  jungle: {
    name: 'Jungle',
    canvasBg: '#0a1f0a',
    glyphColors: ['#6BCB77', '#FF8C00', '#8B4513', '#ADFF2F', '#FFD93D'],
    particleColors: ['#6BCB77', '#ADFF2F', '#228B22', '#8B4513'],
    particleShape: 'leaf',
  },
}

export const DEFAULT_THEME = THEMES.playroom
