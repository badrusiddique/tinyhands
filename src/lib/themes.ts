import type { Theme } from '@/types/smash'

export const THEMES: Record<string, Theme> = {
  playroom: {
    name: 'Playroom',
    canvasBg: '#1d293a',
    glyphColors: ['#FF1493', '#00FFFF', '#FFFF00', '#FF6600', '#39FF14', '#FF00FF', '#FF4500'],
    particleColors: ['#FF1493', '#00FFFF', '#FFFF00', '#FF6600', '#39FF14'],
    particleShape: 'confetti',
    ambientColor: '#FFFF00',
    ambientShape: 'spark',
  },
  space: {
    name: 'Space',
    canvasBg: '#070d1a',
    glyphColors: ['#00FFFF', '#FF00FF', '#FFFFFF', '#7B68EE', '#00BFFF', '#FF69B4', '#C0C0FF'],
    particleColors: ['#FFFFFF', '#00FFFF', '#FF00FF', '#7B68EE'],
    particleShape: 'star',
    ambientColor: '#00FFFF',
    ambientShape: 'star',
  },
  ocean: {
    name: 'Ocean',
    canvasBg: '#0f2f3b',
    glyphColors: ['#00FFFF', '#FF1493', '#00FF7F', '#1E90FF', '#AFEEEE', '#FF69B4', '#40E0D0'],
    particleColors: ['#00FFFF', '#00FF7F', '#AFEEEE', '#1E90FF'],
    particleShape: 'bubble',
    ambientColor: '#00FF7F',
    ambientShape: 'bubble',
  },
  jungle: {
    name: 'Jungle',
    canvasBg: '#0a1f0a',
    glyphColors: ['#39FF14', '#FF6600', '#FFFF00', '#FF1493', '#7CFC00', '#FFA500', '#ADFF2F'],
    particleColors: ['#39FF14', '#ADFF2F', '#7CFC00', '#FF6600'],
    particleShape: 'leaf',
    ambientColor: '#39FF14',
    ambientShape: 'spark',
  },
}

export const DEFAULT_THEME = THEMES.playroom
