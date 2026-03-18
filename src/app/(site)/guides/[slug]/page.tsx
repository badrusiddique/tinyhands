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
    title: `${guide.title} — TinyHands`,
    description: guide.description,
  }
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = guides.find(g => g.slug === params.slug)
  if (!guide) notFound()

  return (
    <div className="bg-[#FFFBF0] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Back link */}
        <Link
          href="/guides"
          className="inline-flex items-center text-sm font-semibold text-[#FF6B6B] mb-8 hover:underline"
        >
          ← Back to Guides
        </Link>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{guide.title}</h1>
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">{guide.description}</p>

        {/* Sections */}
        <div className="space-y-10">
          {guide.sections.map(section => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.heading}</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{section.body}</p>
            </section>
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

        {/* CTA back to guides */}
        <div className="mt-16 text-center">
          <Link
            href="/guides"
            className="inline-flex items-center px-8 py-3 bg-[#FF6B6B] text-white font-bold rounded-full hover:bg-red-500 transition-colors"
          >
            ← Back to All Guides
          </Link>
        </div>
      </div>
    </div>
  )
}
