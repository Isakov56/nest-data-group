'use client'

import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'
import { useTransition } from 'react'

interface LanguageSwitcherProps {
  useDarkMode: boolean
}

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  ja: 'JA',
  ru: 'RU',
}

export default function LanguageSwitcher({ useDarkMode }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return

    // Get the path without the current locale prefix
    const segments = pathname.split('/')
    // Remove empty string and locale from segments
    const pathWithoutLocale = segments.slice(2).join('/')

    // Construct new path with new locale
    const newPath = `/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`

    startTransition(() => {
      router.push(newPath)
    })
  }

  return (
    <div className={`flex items-center gap-1 ${isPending ? 'opacity-50' : ''}`}>
      {locales.map((loc, index) => (
        <span key={loc} className="flex items-center">
          <button
            onClick={() => handleLocaleChange(loc)}
            disabled={isPending}
            className={`px-2 py-1 font-body text-xs font-medium tracking-wide transition-all duration-300 rounded ${
              locale === loc
                ? useDarkMode
                  ? 'text-teal-400'
                  : 'text-teal-600'
                : useDarkMode
                  ? 'text-white/60 hover:text-white'
                  : 'text-navy-400 hover:text-navy-700'
            }`}
          >
            {localeLabels[loc]}
          </button>
          {index < locales.length - 1 && (
            <span className={`text-xs ${useDarkMode ? 'text-white/30' : 'text-navy-300'}`}>/</span>
          )}
        </span>
      ))}
    </div>
  )
}
