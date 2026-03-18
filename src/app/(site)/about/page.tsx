import type { Metadata } from 'next'
import FAQItem from '@/components/about/FAQItem'

export const metadata: Metadata = {
  title: 'About TinyHands — A Keyboard Toy for Ayaan',
  description: 'The story behind TinyHands — built by a WFH dad for his keyboard-smashing toddler Ayaan.',
}

export default function AboutPage() {
  return (
    <div className="bg-[#FFFBF0] min-h-screen">

      {/* 1. Hero */}
      <section className="py-20 text-center px-4">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Meet TinyHands</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A safe, fullscreen keyboard smash toy — built by a work-from-home dad for his keyboard-obsessed toddler.
        </p>
      </section>

      {/* 2. The Story */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">The Story</h2>
        <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
          <p>
            Ayaan is two years old and absolutely convinced he runs a company. Every morning,
            he watches his dad open the laptop, put on headphones, and &ldquo;work&rdquo; — so naturally,
            he needs to do the same. The laptop lid goes up. The headphones go on. The tiny
            fingers find the keyboard.
          </p>
          <p>
            The problem? Real keyboards do real things. One accidental key combo closes a
            presentation. Another sends a half-written email. After the third &ldquo;Ayaan incident&rdquo;
            in a week, it was time for a solution.
          </p>
          <p>
            TinyHands was born out of that frustration — and a lot of love. It turns every
            key press into a burst of color, sound, and joy. No tabs to accidentally close.
            No emails to accidentally send. Just a safe canvas for tiny hands to go wild.
          </p>
        </div>
      </section>

      {/* 3. Privacy Badges */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Your Privacy, Respected</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🚫', text: 'No accounts required', color: '#FF6B6B' },
              { icon: '👤', text: 'No user IDs or tracking', color: '#4D96FF' },
              { icon: '🔑', text: 'No fingerprinting', color: '#6BCB77' },
              { icon: '📵', text: 'No ads, ever', color: '#C77DFF' },
              { icon: '🌐', text: 'No external API calls from the app', color: '#FFD93D' },
              { icon: '📊', text: 'Analytics: aggregate visit count only', color: '#FF6B6B' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
                <span className="text-2xl">{icon}</span>
                <span className="font-semibold text-gray-700">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: '1', title: 'Open TinyHands', desc: 'Go to tinyhands.vercel.app on any device with a keyboard.', color: '#FF6B6B' },
            { num: '2', title: 'Go fullscreen', desc: 'Press F11 or use the fullscreen button for the full experience.', color: '#4D96FF' },
            { num: '3', title: 'Hand it over', desc: 'Let your toddler smash away. Every key is safe and fun.', color: '#6BCB77' },
          ].map(({ num, title, desc, color }) => (
            <div key={num} className="text-center p-6 bg-white rounded-2xl shadow-md">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4"
                style={{ background: color }}
              >
                {num}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem
              question="Is this safe for my toddler?"
              answer="Yes! TinyHands intercepts all keyboard input. Dangerous shortcuts (Ctrl+W, Alt+F4, etc.) are blocked. Your toddler can't close tabs, send emails, or navigate away. The screen stays on the smash canvas until you close it."
            />
            <FAQItem
              question="What data do you collect?"
              answer="Almost nothing. We keep a single aggregate visitor count — just a number, no personal data, no cookies, no user tracking. We don't even know you exist as an individual. We just know someone visited."
            />
            <FAQItem
              question="Can my toddler break my computer?"
              answer="No more than normal keyboard use. All dangerous key combos are blocked. The app runs entirely in the browser — nothing is written to your disk. The worst that can happen is the tab needs refreshing."
            />
          </div>
        </div>
      </section>

    </div>
  )
}
