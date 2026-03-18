import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#F5F0E0] border-t border-[#EDE8D8] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-6 mb-4 flex-wrap">
          <Link href="/" className="font-nunito font-semibold text-gray-600 hover:text-coral transition-colors text-sm">
            Home
          </Link>
          <Link href="/play" className="font-nunito font-semibold text-gray-600 hover:text-coral transition-colors text-sm">
            Play
          </Link>
          <Link href="/about" className="font-nunito font-semibold text-gray-600 hover:text-coral transition-colors text-sm">
            About
          </Link>
          <Link href="/guides" className="font-nunito font-semibold text-gray-600 hover:text-coral transition-colors text-sm">
            Guides
          </Link>
        </div>
        <p className="font-nunito text-gray-400 text-sm mb-2">
          Made with ❤️ for Ayaan and every curious toddler
        </p>
        <p className="font-nunito text-gray-500 text-sm">
          © 2024 TinyHands • Made with love for toddlers everywhere
        </p>
      </div>
    </footer>
  )
}
