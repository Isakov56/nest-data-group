import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { HeroVariantProvider } from '@/hooks/useHeroVariant'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Nest Data Group | Enterprise Data Architecture & IT Solutions',
  description: 'We design the systems that power critical decisions across government, defense, and enterprise. Data architecture, cloud strategy, analytics, and security solutions.',
  keywords: ['data architecture', 'IT consulting', 'enterprise solutions', 'cloud strategy', 'data analytics', 'government IT', 'defense technology'],
  authors: [{ name: 'Nest Data Group' }],
  openGraph: {
    title: 'Nest Data Group | Enterprise Data Architecture & IT Solutions',
    description: 'We design the systems that power critical decisions across government, defense, and enterprise.',
    url: 'https://nestdatagroup.com',
    siteName: 'Nest Data Group',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nest Data Group | Enterprise Data Architecture & IT Solutions',
    description: 'We design the systems that power critical decisions across government, defense, and enterprise.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-white antialiased">
        <HeroVariantProvider>
          {children}
        </HeroVariantProvider>
      </body>
    </html>
  )
}
