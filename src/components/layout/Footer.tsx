import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-rainbow py-10 relative overflow-hidden">
      {/* Subtle white overlay for readability */}
      <div className="absolute inset-0 bg-white/20" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <Image src="/logo-icon.svg" alt="" width={28} height={28} />
          <span className="font-nunito font-extrabold text-xl text-white drop-shadow-sm">TinyHands</span>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
          <Link href="/" className="font-nunito font-bold text-white/80 hover:text-white transition-colors text-sm bg-white/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
            Home
          </Link>
          <Link href="/play" className="font-nunito font-bold text-white/80 hover:text-white transition-colors text-sm bg-white/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
            Play
          </Link>
          <Link href="/about" className="font-nunito font-bold text-white/80 hover:text-white transition-colors text-sm bg-white/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
            About
          </Link>
          <Link href="/guides" className="font-nunito font-bold text-white/80 hover:text-white transition-colors text-sm bg-white/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
            Guides
          </Link>
        </div>

        <p className="font-nunito text-white/90 text-sm font-semibold drop-shadow-sm mb-1">
          Made with ❤️ for Ayaan and every curious toddler
        </p>
        <p className="font-nunito text-white/60 text-xs">
          © 2026 TinyHands
        </p>
      </div>
    </footer>
  )
}
