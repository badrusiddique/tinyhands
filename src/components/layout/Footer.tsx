import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#1A1035] py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Image src="/logo-icon.svg" alt="" width={24} height={24} />
          <span className="font-nunito font-extrabold text-lg text-white/80">TinyHands</span>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-6 mb-6 flex-wrap">
          <Link href="/" className="font-nunito font-semibold text-white/60 hover:text-white transition-colors text-sm">
            Home
          </Link>
          <Link href="/play" className="font-nunito font-semibold text-white/60 hover:text-white transition-colors text-sm">
            Play
          </Link>
          <Link href="/about" className="font-nunito font-semibold text-white/60 hover:text-white transition-colors text-sm">
            About
          </Link>
          <Link href="/guides" className="font-nunito font-semibold text-white/60 hover:text-white transition-colors text-sm">
            Guides
          </Link>
        </div>

        <p className="font-nunito text-white/40 text-sm mb-2">
          Made with ❤️ for Ayaan and every curious toddler
        </p>
        <p className="font-nunito text-white/30 text-xs">
          © 2026 TinyHands
        </p>
      </div>
    </footer>
  )
}
