'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b-[3px] border-b-coral">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo-icon.svg"
              alt=""
              width={28}
              height={28}
              className="animate-wiggle"
            />
            <span className="font-nunito font-extrabold text-xl text-coral tracking-tight">
              TinyHands
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/play" className="font-nunito font-bold text-sm text-gray-600 hover:text-white hover:bg-coral rounded-full px-4 py-1.5 transition-all">Play</Link>
            <Link href="/about" className="font-nunito font-bold text-sm text-gray-600 hover:text-white hover:bg-coral rounded-full px-4 py-1.5 transition-all">About</Link>
            <Link href="/guides" className="font-nunito font-bold text-sm text-gray-600 hover:text-white hover:bg-coral rounded-full px-4 py-1.5 transition-all">Guides</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-coral transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-coral transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-coral transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-1 pt-2">
              <Link href="/play" onClick={() => setMobileOpen(false)} className="font-nunito font-bold text-gray-600 hover:text-white hover:bg-coral rounded-xl px-4 py-2 transition-all">Play</Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="font-nunito font-bold text-gray-600 hover:text-white hover:bg-coral rounded-xl px-4 py-2 transition-all">About</Link>
              <Link href="/guides" onClick={() => setMobileOpen(false)} className="font-nunito font-bold text-gray-600 hover:text-white hover:bg-coral rounded-xl px-4 py-2 transition-all">Guides</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
