'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useVisitorCount } from '@/hooks/useVisitorCount'

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}k`
  return n.toLocaleString()
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count, loading } = useVisitorCount()

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
              width={40}
              height={40}
              className="animate-wiggle hover:animate-jiggle transition-transform"
            />
            <span className="font-nunito font-extrabold text-xl text-coral tracking-tight">
              Little Humans Mash
            </span>
          </Link>

          {/* Desktop nav + live counter */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/play" className="font-nunito font-bold text-sm text-gray-600 hover:text-white hover:bg-coral hover:-translate-y-0.5 rounded-full px-4 py-1.5 transition-all">Play</Link>
            <Link href="/about" className="font-nunito font-bold text-sm text-gray-600 hover:text-white hover:bg-coral hover:-translate-y-0.5 rounded-full px-4 py-1.5 transition-all">About</Link>
            {/* <Link href="/guides" className="font-nunito font-bold text-sm text-gray-600 hover:text-white hover:bg-coral hover:-translate-y-0.5 rounded-full px-4 py-1.5 transition-all">Guides</Link> */}
            {!loading && count > 0 && (
              <span className="ml-2 inline-flex items-center gap-1.5 bg-coral/10 text-coral font-nunito font-bold text-xs rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
                {formatCount(count)} visits
              </span>
            )}
          </div>

          {/* Mobile: live counter + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            {!loading && count > 0 && (
              <span className="inline-flex items-center gap-1 bg-coral/10 text-coral font-nunito font-bold text-[10px] rounded-full px-2 py-0.5">
                <span className="w-1 h-1 rounded-full bg-coral animate-pulse" />
                {formatCount(count)}
              </span>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-coral transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-coral transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-coral transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-1 pt-2">
              <Link href="/play" onClick={() => setMobileOpen(false)} className="font-nunito font-bold text-gray-600 hover:text-white hover:bg-coral rounded-xl px-4 py-2 transition-all">Play</Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="font-nunito font-bold text-gray-600 hover:text-white hover:bg-coral rounded-xl px-4 py-2 transition-all">About</Link>
              {/* <Link href="/guides" onClick={() => setMobileOpen(false)} className="font-nunito font-bold text-gray-600 hover:text-white hover:bg-coral rounded-xl px-4 py-2 transition-all">Guides</Link> */}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
