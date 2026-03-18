export const PHYSICS = {
  VX_MIN: -22,
  VX_MAX: 22,
  VY_MIN: -72,
  VY_MAX: -32,
  GRAVITY: 8,
  DRAG: 0.994,
  LIFETIME: 2.0,
  SIZE_MIN: 100,
  SIZE_MAX: 220,
  FADE_DURATION: 0.5,
} as const

export const CAPS = {
  GLYPH_DEFAULT: 40,
  GLYPH_REDUCED: 18,
  PARTICLE_DEFAULT: 280,
  PARTICLE_REDUCED: 130,
} as const

export const FPS_THRESHOLDS = {
  LOW: 44,
  HIGH: 56,
  MAX_LOW_POWER_LEVEL: 2,
  SAMPLE_WINDOW: 10, // frames to average
} as const

export const IDLE = {
  TRIGGER_MS: 3000,
  BURST_INTERVAL_MS: 700,
  STRENGTH: 0.35,
} as const

export const PARENT_PANEL = {
  SECRET_WORDS: ['ayaan', 'annu', 'baba'],
  BUFFER_TIMEOUT_MS: 4000,
  LONG_PRESS_MS: 2000,
  LONG_PRESS_AREA: 64, // px, top-left corner
} as const
