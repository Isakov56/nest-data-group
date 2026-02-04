import type { Metadata } from 'next'
import { Inter, Playfair_Display, Noto_Sans_JP } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import '../globals.css'
import { routing } from '@/i18n/routing'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-playfair',
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-jp',
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Validate that the incoming locale is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable} ${notoSansJP.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-white antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
