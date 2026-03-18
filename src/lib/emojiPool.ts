export const EMOJI_POOL = [
  // Nature & Weather
  '🌈','☀️','🌙','☁️','⚡','❄️','🌸','🍀','🍄','🌴','🌊','🫧',
  // Sea Creatures
  '🐳','🐬','🐠','🐙',
  // Land Animals & Bugs
  '🦋','🐞','🐢','🦀','🦄','🐥','🐸','🐰','🐻','🦊','🐼','🦁','🐨','🦕',
  // Music & Fun
  '🎵','🥁','🎹','🎸','🎈','🎉','🧸','🪁','🎨','🧩',
  // Vehicles
  '🚀','✈️','🚁','🚂','🚗','🚲','⛵','🚌','🚜','🚒',
  // Food
  '🍎','🍓','🍉','🍌','🍍','🍪','🍦','🧁','🍕',
  // Wildcard
  '💩',
] as const

export type Emoji = typeof EMOJI_POOL[number]

export class EmojiPool {
  private bag: string[] = []
  private index = 0
  private lastEmoji = ''

  constructor() {
    this.refill()
  }

  private refill(): void {
    this.bag = [...EMOJI_POOL].sort(() => Math.random() - 0.5)
    // Prevent consecutive duplicate at bag boundary
    if (this.bag[0] === this.lastEmoji) {
      const swapIdx = Math.floor(Math.random() * (this.bag.length - 1)) + 1
      ;[this.bag[0], this.bag[swapIdx]] = [this.bag[swapIdx], this.bag[0]]
    }
    this.index = 0
  }

  next(): string {
    if (this.index >= this.bag.length) this.refill()
    const emoji = this.bag[this.index++]
    this.lastEmoji = emoji
    return emoji
  }

  reset(): void {
    this.bag = []
    this.index = 0
    this.lastEmoji = ''
    this.refill()
  }
}
