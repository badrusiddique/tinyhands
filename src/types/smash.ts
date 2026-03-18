export interface Glyph {
  id: string
  char: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rotation: number
  rotationSpeed: number
  opacity: number
  lifetime: number
  age: number
  color: string
}

export interface Particle {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  shape: 'confetti' | 'star' | 'bubble' | 'leaf'
  opacity: number
  lifetime: number
  age: number
  rotation: number
}

export interface Theme {
  name: string
  canvasBg: string
  glyphColors: string[]
  particleColors: string[]
  particleShape: 'confetti' | 'star' | 'bubble' | 'leaf'
  ambientColor: string
  ambientShape: 'dot' | 'star' | 'bubble' | 'spark'
}

export interface EngineState {
  glyphs: Glyph[]
  particles: Particle[]
  idleActive: boolean
  lowPowerLevel: number
  fps: number
}

export interface EngineConfig {
  glyphCap: number
  particleCap: number
  prefersReducedMotion: boolean
  theme: Theme
}
