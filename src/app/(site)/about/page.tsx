import type { Metadata } from 'next'
import FAQItem from '@/components/about/FAQItem'

export const metadata: Metadata = {
  title: 'About Little Humans Mash - A Keyboard Toy for Ayaan',
  description: 'The story behind Little Humans Mash - built by a WFH dad for his keyboard-smashing toddler Ayaan.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">

      {/* 1. Hero — rainbow brand */}
      <section className="bg-rainbow py-20 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-md mb-4">Meet Little Humans Mash 👶</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto drop-shadow-sm">
            A safe, fullscreen keyboard smash toy built by a work-from-home dad for his keyboard-obsessed toddler.
          </p>
        </div>
      </section>

      {/* 2. The Story */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-nunito text-3xl font-extrabold text-gray-900 mb-6">The Story</h2>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              Ayaan is two years old and absolutely convinced he runs a company. Every morning,
              he watches his dad open the laptop, put on headphones, and &ldquo;work&rdquo;, so naturally,
              he needs to do the same. The laptop lid goes up. The headphones go on. The tiny
              fingers find the keyboard.
            </p>
            <blockquote className="border-l-4 border-coral pl-4 text-xl font-semibold text-gray-800 italic my-8">
              &ldquo;After the third Ayaan incident in a week, it was time for a solution.&rdquo;
            </blockquote>
            <p>
              The problem? Real keyboards do real things. One accidental key combo closes a
              presentation. Another sends a half-written email.
            </p>
            <p>
              Little Humans Mash was born out of that frustration, and a lot of love. It turns every
              key press into a burst of color, sound, and joy. No tabs to accidentally close.
              No emails to accidentally send. Just a safe canvas for tiny hands to go wild.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Privacy Badges */}
      <section className="bg-[#F8F4FF] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-nunito text-3xl font-extrabold text-center text-gray-900 mb-10">Your Privacy, Respected</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🔐', text: 'No accounts required', color: 'bg-red-50 border-red-200' },
              { icon: '🛡️', text: 'No user IDs or tracking', color: 'bg-blue-50 border-blue-200' },
              { icon: '🔑', text: 'No fingerprinting', color: 'bg-green-50 border-green-200' },
              { icon: '📺', text: 'No ads, ever', color: 'bg-purple-50 border-purple-200' },
              { icon: '🌐', text: 'No external API calls from the app', color: 'bg-yellow-50 border-yellow-200' },
              { icon: '📊', text: 'Analytics: aggregate visit count only', color: 'bg-red-50 border-red-200' },
            ].map(({ icon, text, color }) => (
              <div
                key={text}
                className={`flex items-center gap-3 rounded-2xl p-4 border ${color}`}
              >
                <span className="text-2xl">{icon}</span>
                <span className="font-nunito font-semibold text-gray-800">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQ */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-nunito text-3xl font-extrabold text-center text-gray-900 mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem
              question="Is this safe for my toddler?"
              answer="Yes! Little Humans Mash intercepts all keyboard input. Dangerous shortcuts (Ctrl+W, Alt+F4, etc.) are blocked. Your toddler can't close tabs, send emails, or navigate away. The screen stays on the smash canvas until you close it."
            />
            <FAQItem
              question="What data do you collect?"
              answer="Almost nothing. We keep a single aggregate visitor count, just a number, no personal data, no cookies, no user tracking. We don't even know you exist as an individual. We just know someone visited."
            />
            <FAQItem
              question="Can my toddler break my computer?"
              answer="No more than normal keyboard use. All dangerous key combos are blocked. The app runs entirely in the browser, nothing is written to your disk. The worst that can happen is the tab needs refreshing."
            />
          </div>
        </div>
      </section>

    </div>
  )
}
