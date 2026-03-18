'use client'

import StartButton from '@/components/home/StartButton'

const EMOJIS = [
  { emoji: '🐸', delay: 0, x: '8%', y: '12%', size: 'text-6xl sm:text-7xl' },
  { emoji: '🌈', delay: 200, x: '78%', y: '8%', size: 'text-7xl sm:text-8xl' },
  { emoji: '🚀', delay: 400, x: '15%', y: '65%', size: 'text-5xl sm:text-7xl' },
  { emoji: '🦄', delay: 100, x: '85%', y: '60%', size: 'text-6xl sm:text-8xl' },
  { emoji: '🎉', delay: 300, x: '5%', y: '40%', size: 'text-5xl sm:text-6xl' },
  { emoji: '🐼', delay: 500, x: '90%', y: '35%', size: 'text-5xl sm:text-7xl' },
  { emoji: '⭐', delay: 150, x: '25%', y: '80%', size: 'text-6xl sm:text-7xl' },
  { emoji: '🎨', delay: 350, x: '70%', y: '78%', size: 'text-5xl sm:text-6xl' },
  { emoji: '🦋', delay: 250, x: '50%', y: '5%', size: 'text-5xl sm:text-7xl' },
  { emoji: '🍕', delay: 450, x: '40%', y: '85%', size: 'text-5xl sm:text-6xl' },
]

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-rainbow">
      {/* Scattered floating emojis — filling the background */}
      {EMOJIS.map((item) => (
        <span
          key={item.emoji}
          className={`absolute ${item.size} select-none animate-float opacity-40`}
          style={{
            left: item.x,
            top: item.y,
            animationDelay: `${item.delay}ms`,
            animationDuration: `${2.5 + item.delay / 200}s`,
          }}
          aria-hidden="true"
        >
          {item.emoji}
        </span>
      ))}

      {/* Center content */}
      <div className="relative z-10 text-center px-4">
        {/* Row of big bouncing emojis */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-6 select-none" aria-hidden="true">
          {['🐸', '🌈', '🚀', '🦄', '🎉'].map((e, i) => (
            <span
              key={e}
              className="text-6xl sm:text-7xl lg:text-8xl inline-block animate-bounce-big"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {e}
            </span>
          ))}
        </div>

        {/* Giant arcade START button */}
        <StartButton className="inline-flex items-center justify-center gap-3 font-nunito font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white bg-coral rounded-full px-12 sm:px-16 py-6 sm:py-8 shadow-[0_8px_30px_rgba(255,107,107,0.5)] hover:shadow-[0_12px_40px_rgba(255,107,107,0.7)] animate-jiggle hover:animate-none hover:scale-110 transition-transform border-4 border-white/30 cursor-pointer select-none">
          ▶ START
        </StartButton>

        {/* Tiny parent-friendly text */}
        <p className="font-nunito text-sm text-white/70 mt-8 max-w-xs mx-auto">
          A safe keyboard toy for toddlers, no ads, no accounts
        </p>
      </div>
    </section>
  )
}
