import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TinyHands - Safe Keyboard Smash Toy for Toddlers',
  description: 'A safe fullscreen keyboard smash toy for babies and toddlers. No ads, no accounts, just fun.',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'TinyHands - Keyboard Smash Toy for Toddlers',
    description: 'A safe fullscreen keyboard toy for babies. Hand it over, watch the magic.',
    url: 'https://tinyhands-pi.vercel.app',
    siteName: 'TinyHands',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'TinyHands',
    description: 'Safe keyboard smash toy for toddlers',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="font-nunito antialiased">{children}</body>
    </html>
  )
}
