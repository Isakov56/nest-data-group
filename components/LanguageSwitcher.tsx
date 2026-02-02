'use client'

import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config'
import { useState, useRef, useEffect, useTransition } from 'react'

interface LanguageSwitcherProps {
  useDarkMode: boolean
}

export default function LanguageSwitcher({ useDarkMode }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLocaleChange = (newLocale: Locale) => {
    setIsOpen(false)

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
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`flex items-center gap-2 font-body text-body-sm transition-colors duration-300 ${
          useDarkMode
            ? 'text-white/90 hover:text-white'
            : 'text-navy-600 hover:text-navy-900'
        } ${isPending ? 'opacity-50' : ''}`}
      >
        <span className="text-base">{localeFlags[locale]}</span>
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <svg className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div className={`absolute top-full right-0 mt-2 w-40 rounded-lg shadow-xl overflow-hidden transition-all duration-200 ${
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      } ${useDarkMode ? 'bg-navy-800 border border-navy-700' : 'bg-white border border-gray-200'}`}>
        <div className={`px-3 py-2 text-xs font-medium uppercase tracking-wider ${useDarkMode ? 'text-white/50' : 'text-gray-400'}`}>
          Language
        </div>
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            disabled={isPending}
            className={`w-full flex items-center gap-3 px-3 py-3 text-left transition-colors ${
              locale === loc
                ? useDarkMode ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-50 text-teal-700'
                : useDarkMode ? 'text-white/80 hover:bg-navy-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg">{localeFlags[loc]}</span>
            <span className="font-medium text-sm">{localeNames[loc]}</span>
            {locale === loc && (
              <svg className="w-4 h-4 ml-auto text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
