import { FPS_THRESHOLDS } from '@/lib/constants'

export class PerformanceMonitor {
  private lastTimestamp = -1
  private frameTimes: number[] = []
  private lowPowerLevel = 0
  private fps = 60

  tick(timestamp: number): void {
    const dt = this.lastTimestamp < 0 ? timestamp : timestamp - this.lastTimestamp
    this.lastTimestamp = timestamp

    if (dt > 0 && dt < 1000) {
      this.frameTimes.push(dt)
      if (this.frameTimes.length > FPS_THRESHOLDS.SAMPLE_WINDOW) {
        this.frameTimes.shift()
      }
    }

    if (this.frameTimes.length >= FPS_THRESHOLDS.SAMPLE_WINDOW) {
      const avgDt = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length
      this.fps = 1000 / avgDt

      if (this.fps < FPS_THRESHOLDS.LOW && this.lowPowerLevel < FPS_THRESHOLDS.MAX_LOW_POWER_LEVEL) {
        this.lowPowerLevel++
        this.frameTimes = [] // reset after adjustment
      } else if (this.fps > FPS_THRESHOLDS.HIGH && this.lowPowerLevel > 0) {
        this.lowPowerLevel--
        this.frameTimes = []
      }
    }
  }

  getLowPowerLevel(): number {
    return this.lowPowerLevel
  }

  getFps(): number {
    return this.fps
  }
}
