import StartButton from '@/components/home/StartButton'

const EMOJI_CAROUSEL = ['🐸', '🌈', '🚀', '🦄', '🎉', '🐼', '⭐', '🎨']

export default function Hero() {
  return (
    <section className="bg-landing-bg py-20 sm:py-28 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated emoji carousel */}
        <div className="flex justify-center gap-3 text-5xl sm:text-6xl select-none mb-8" aria-hidden="true">
          {EMOJI_CAROUSEL.map((emoji, i) => (
            <span
              key={emoji}
              className="animate-bounce inline-block"
              style={{ animationDelay: `${i * 100}ms`, animationDuration: '1.2s' }}
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1 className="font-nunito font-extrabold text-5xl sm:text-6xl lg:text-7xl text-gray-900 leading-tight mb-4">
          Tiny hands.{' '}
          <span className="text-coral">Big fun.</span>
        </h1>

        {/* Subtitle */}
        <p className="font-nunito text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          A safe fullscreen keyboard smash toy. Hand it to your toddler — they&apos;ll love it.{' '}
          <strong className="text-gray-800">No accounts. No ads.</strong>
        </p>

        {/* Single CTA */}
        <StartButton className="inline-block font-nunito font-bold text-xl text-white rounded-full px-10 py-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-coral">
          Start Smashing →
        </StartButton>
      </div>
    </section>
  )
}
