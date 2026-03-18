import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-landing-bg border-b border-[#EDE8D8] sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-nunito font-extrabold text-2xl text-coral tracking-tight hover:opacity-80 transition-opacity"
          >
            TinyHands
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-6">
            <Link
              href="/play"
              className="font-nunito font-semibold text-gray-700 hover:text-coral transition-colors"
            >
              Play
            </Link>
            <Link
              href="/about"
              className="font-nunito font-semibold text-gray-700 hover:text-coral transition-colors"
            >
              About
            </Link>
            <Link
              href="/guides"
              className="font-nunito font-semibold text-gray-700 hover:text-coral transition-colors"
            >
              Guides
            </Link>
            <Link
              href="/play"
              className="font-nunito font-bold bg-coral text-white rounded-full px-5 py-2 text-sm hover:bg-[#e55a5a] transition-colors"
            >
              Start Smashing →
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
