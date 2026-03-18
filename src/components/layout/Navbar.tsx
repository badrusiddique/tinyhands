'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo-icon.svg"
              alt=""
              width={32}
              height={32}
              className="animate-wiggle"
            />
            <span className="font-nunito font-extrabold text-2xl text-coral tracking-tight">
              TinyHands
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/play" className="font-nunito font-semibold text-gray-700 hover:text-coral transition-colors">Play</Link>
            <Link href="/about" className="font-nunito font-semibold text-gray-700 hover:text-coral transition-colors">About</Link>
            <Link href="/guides" className="font-nunito font-semibold text-gray-700 hover:text-coral transition-colors">Guides</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-700 transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <div className="flex flex-col gap-3 pt-4">
              <Link href="/play" onClick={() => setMobileOpen(false)} className="font-nunito font-semibold text-gray-700 hover:text-coral px-2 py-1">Play</Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="font-nunito font-semibold text-gray-700 hover:text-coral px-2 py-1">About</Link>
              <Link href="/guides" onClick={() => setMobileOpen(false)} className="font-nunito font-semibold text-gray-700 hover:text-coral px-2 py-1">Guides</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
