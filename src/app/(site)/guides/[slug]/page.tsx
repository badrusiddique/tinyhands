import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { guides } from '@/lib/guides'
import FAQItem from '@/components/about/FAQItem'

export async function generateStaticParams() {
  return guides.map(guide => ({ slug: guide.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const guide = guides.find(g => g.slug === params.slug)
  if (!guide) return {}
  return {
    title: `${guide.title} - TinyHands`,
    description: guide.description,
  }
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = guides.find(g => g.slug === params.slug)
  if (!guide) notFound()

  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <section className="bg-gradient-to-br from-[#1A1035] via-[#2D1B69] to-[#1d293a] py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/guides"
            className="inline-flex items-center text-sm font-semibold text-white/50 hover:text-white/80 mb-6 transition-colors"
          >
            ← Back to Guides
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">{guide.title}</h1>
          <p className="text-lg text-white/60 leading-relaxed">{guide.description}</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-10">
            {guide.sections.map(section => (
              <div key={section.heading}>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.heading}</h2>
                <p className="text-gray-700 leading-relaxed text-lg">{section.body}</p>
              </div>
            ))}
          </div>

          {/* FAQ */}
          {guide.faqs.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {guide.faqs.map(faq => (
                  <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/guides"
              className="inline-flex items-center px-8 py-3 bg-coral text-white font-bold rounded-full hover:bg-[#e55a5a] transition-colors"
            >
              ← Back to All Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
