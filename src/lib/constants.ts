export const PHYSICS = {
  VX_MIN: -4,
  VX_MAX: 4,
  VY_MIN: -6,
  VY_MAX: -3,
  GRAVITY: 6,
  DRAG: 0.994,
  LIFETIME: 2.5,
  SIZE_MIN: 80,
  SIZE_MAX: 200,
  FADE_DURATION: 0.6,
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
