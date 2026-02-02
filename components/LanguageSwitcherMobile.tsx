'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { locales, localeFlags, type Locale } from '@/i18n/config'
import { useTransition } from 'react'

interface LanguageSwitcherMobileProps {
  useDarkMode: boolean
  onSelect?: () => void
}

export default function LanguageSwitcherMobile({ useDarkMode, onSelect }: LanguageSwitcherMobileProps) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = (newLocale: Locale) => {
    // Get the path without the current locale prefix
    const segments = pathname.split('/')
    // Remove empty string and locale from segments
    const pathWithoutLocale = segments.slice(2).join('/')

    // Construct new path with new locale
    const newPath = `/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`

    startTransition(() => {
      router.push(newPath)
    })
    onSelect?.()
  }

  return (
    <div className={`pt-4 border-t ${useDarkMode ? 'border-white/10' : 'border-navy-100'}`}>
      <span className={`block text-xs font-medium uppercase tracking-wider mb-3 ${useDarkMode ? 'text-white/50' : 'text-navy-400'}`}>
        Language
      </span>
      <div className="grid grid-cols-3 gap-2">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            disabled={isPending}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-3 rounded-lg transition-colors ${
              locale === loc
                ? 'bg-teal-500 text-white'
                : useDarkMode ? 'bg-white/10 text-white/80' : 'bg-navy-100 text-navy-700'
            } ${isPending ? 'opacity-50' : ''}`}
          >
            <span className="text-lg">{localeFlags[loc]}</span>
            <span className="text-xs">{loc.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
