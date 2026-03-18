import type { Metadata } from 'next'
import Link from 'next/link'
import { guides } from '@/lib/guides'

export const metadata: Metadata = {
  title: 'Guides — TinyHands',
  description:
    'Guides for WFH parents on baby keyboard toys, toddler screen time, and keeping tiny hands safely occupied.',
}

export default function GuidesPage() {
  return (
    <div className="bg-[#FFFBF0] min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Guides for WFH Parents
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about baby keyboards, toddler screen time, and keeping
            tiny hands safely occupied while you work.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map(guide => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="block bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow hover:-translate-y-1 transform transition-transform"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-2">{guide.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{guide.description}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-[#FF6B6B]">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
