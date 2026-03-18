import type { Metadata } from 'next'
import Link from 'next/link'
import { guides } from '@/lib/guides'

export const metadata: Metadata = {
  title: 'Guides - LittleHumans',
  description:
    'Guides for WFH parents on baby keyboard toys, toddler screen time, and keeping tiny hands safely occupied.',
}

const ACCENT_COLORS = ['#FF6B6B', '#4D96FF', '#6BCB77', '#C77DFF']

const SLUG_ICONS: Record<string, string> = {
  'baby-keyboard-smash': '⌨️',
  'why-babies-love-keyboards': '🧠',
  'baby-typing-game': '🎮',
  'keyboard-game-for-babies': '🏆',
  'toddler-keyboard-smash': '👶',
  'typing-games-for-toddlers': '🎯',
  'best-toddler-screen-activities': '📺',
  'toddler-screen-activities': '🏠',
  'how-to-let-your-toddler-use-your-computer': '💻',
  'baby-computer-games': '🕹️',
  'computer-games-for-toddlers': '🎲',
  'kids-keyboard-website': '🌐',
}

export default function GuidesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero banner — rainbow brand */}
      <section className="bg-rainbow py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-md mb-4">
            Guides for WFH Parents
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto drop-shadow-sm">
            Everything you need to know about baby keyboards, toddler screen time, and keeping
            tiny hands safely occupied while you work.
          </p>
        </div>
      </section>

      {/* Guide grid */}
      <section className="bg-[#F8F4FF] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, idx) => {
              const accentColor = ACCENT_COLORS[idx % ACCENT_COLORS.length]
              const icon = SLUG_ICONS[guide.slug] ?? '📖'
              return (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="block bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all border-t-4"
                  style={{ borderTopColor: accentColor }}
                >
                  <span className="text-3xl mb-3 block" aria-hidden="true">{icon}</span>
                  <h2 className="font-nunito text-lg font-bold text-gray-900 mb-2">{guide.title}</h2>
                  <p className="font-nunito text-gray-600 text-sm leading-relaxed">{guide.description}</p>
                  <span
                    className="mt-4 inline-block text-sm font-bold"
                    style={{ color: accentColor }}
                  >
                    Read more →
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
