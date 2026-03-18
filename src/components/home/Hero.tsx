'use client'

import StartButton from '@/components/home/StartButton'
import { useVisitorCount } from '@/hooks/useVisitorCount'

const EMOJI_CAROUSEL = [
  { emoji: '🐸', size: 'text-4xl sm:text-5xl', animation: 'animate-float' },
  { emoji: '🌈', size: 'text-5xl sm:text-6xl', animation: 'animate-float-slow' },
  { emoji: '🚀', size: 'text-6xl sm:text-7xl', animation: 'animate-float-fast' },
  { emoji: '🦄', size: 'text-5xl sm:text-6xl', animation: 'animate-float' },
  { emoji: '🎉', size: 'text-4xl sm:text-5xl', animation: 'animate-float-slow' },
  { emoji: '🐼', size: 'text-5xl sm:text-6xl', animation: 'animate-float-fast' },
  { emoji: '⭐', size: 'text-6xl sm:text-7xl', animation: 'animate-float' },
  { emoji: '🎨', size: 'text-4xl sm:text-5xl', animation: 'animate-float-slow' },
]

export default function Hero() {
  const { count, loading } = useVisitorCount()

  return (
    <section className="bg-gradient-to-br from-[#1A1035] via-[#2D1B69] to-[#1d293a] py-20 sm:py-28 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Animated emoji carousel — varied sizes and speeds */}
        <div className="flex justify-center items-end gap-3 select-none mb-10" aria-hidden="true">
          {EMOJI_CAROUSEL.map((item, i) => (
            <span
              key={item.emoji}
              className={`${item.size} ${item.animation} inline-block`}
              style={{ animationDelay: `${i * 200}ms` }}
            >
              {item.emoji}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1 className="font-nunito font-extrabold text-6xl sm:text-7xl lg:text-8xl text-white leading-tight mb-6">
          Tiny hands.{' '}
          <span className="text-gradient-coral">Big fun.</span>
        </h1>

        {/* Subtitle */}
        <p className="font-nunito text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          A safe fullscreen keyboard toy for toddlers.
          No ads. No accounts. Just chaos and color.
        </p>

        {/* Single CTA */}
        <StartButton className="inline-block font-nunito font-bold text-xl text-white rounded-full px-12 py-5 shadow-lg shadow-coral/30 hover:shadow-xl hover:shadow-coral/40 transition-all animate-pulse-scale bg-coral">
          Start Smashing →
        </StartButton>

        {/* Visitor count */}
        {!loading && count > 0 && (
          <p className="font-nunito text-sm text-white/40 mt-8">
            👁 {count.toLocaleString()} curious parents visited
          </p>
        )}
      </div>
    </section>
  )
}
