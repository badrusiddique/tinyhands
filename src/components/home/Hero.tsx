import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="bg-landing-bg py-20 sm:py-28 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Eyebrow tag */}
        <span className="inline-block bg-coral/10 text-coral font-nunito font-semibold text-sm rounded-full px-4 py-1.5 mb-6">
          👶 Made for tiny hands
        </span>

        {/* Headline */}
        <h1 className="font-nunito font-extrabold text-5xl sm:text-6xl lg:text-7xl text-gray-900 leading-tight mb-6">
          Let tiny hands{' '}
          <span className="text-coral">go wild.</span>
        </h1>

        {/* Subtitle */}
        <p className="font-nunito text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          A safe, fullscreen keyboard smash toy for toddlers.{' '}
          <strong className="text-gray-800">No accounts. No ads. Just fun.</strong>
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/play" variant="primary" className="text-xl px-10 py-4 shadow-lg hover:shadow-xl">
            Start Smashing →
          </Button>
          <Button href="/about" variant="secondary">
            Learn more
          </Button>
        </div>

        {/* Visual flourish */}
        <div className="mt-16 flex justify-center gap-4 text-5xl select-none opacity-60" aria-hidden="true">
          <span className="animate-bounce" style={{ animationDelay: '0ms' }}>🐸</span>
          <span className="animate-bounce" style={{ animationDelay: '150ms' }}>🌈</span>
          <span className="animate-bounce" style={{ animationDelay: '300ms' }}>🚀</span>
          <span className="animate-bounce" style={{ animationDelay: '450ms' }}>🦄</span>
          <span className="animate-bounce" style={{ animationDelay: '600ms' }}>🎉</span>
        </div>
      </div>
    </section>
  )
}
