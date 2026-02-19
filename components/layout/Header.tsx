'use client'

import { useEffect, useState } from 'react'
import { Link } from '@/i18n/navigation'
import Logo from '@/components/ui/Logo'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import LanguageSwitcherMobile from '@/components/LanguageSwitcherMobile'
import { useTranslations } from 'next-intl'

interface HeaderProps {
  className?: string
}

export default function Header({ className = '' }: HeaderProps) {
  const t = useTranslations('nav')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkSection, setIsDarkSection] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)

      // Check which section we're in
      const insightsSection = document.getElementById('insights')
      const partnersSection = document.getElementById('partners')
      const philosophySection = document.getElementById('philosophy')

      // Get the sections that have dark backgrounds (navy-950)
      // Note: team (bg-gray-50) and contact (bg-white/gray-50) are light sections
      const darkSections = [insightsSection, partnersSection, philosophySection].filter(Boolean)

      // Get viewport position (header height offset)
      const headerOffset = 80
      const viewportTop = scrollY + headerOffset

      // Check if we're in a dark section
      let inDarkSection = scrollY < 800 // Hero is dark - extended threshold

      for (const section of darkSections) {
        if (section) {
          const rect = section.getBoundingClientRect()
          const sectionTop = scrollY + rect.top
          const sectionBottom = sectionTop + rect.height

          if (viewportTop >= sectionTop && viewportTop < sectionBottom) {
            inDarkSection = true
            break
          }
        }
      }

      setIsDarkSection(inDarkSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Use dark mode styling when in dark sections
  const useDarkMode = isDarkSection

  const navLinks = [
    { href: '/#capabilities', labelKey: 'capabilities' },
    { href: '/insights', labelKey: 'insights' },
    { href: '/about', labelKey: 'about' },
    { href: '/team', labelKey: 'team' },
    { href: '/#contact', labelKey: 'contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        useDarkMode
          ? isScrolled
            ? 'backdrop-blur-xl backdrop-saturate-150'
            : 'backdrop-blur-md backdrop-saturate-125'
          : isScrolled
            ? 'backdrop-blur-xl backdrop-saturate-150 shadow-sm'
            : 'backdrop-blur-md backdrop-saturate-125'
      } ${className}`}
      style={{
        background: useDarkMode
          ? isScrolled
            ? 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.02) 75%, rgba(255,255,255,0.1) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 30%, rgba(255,255,255,0.01) 70%, rgba(255,255,255,0.06) 100%)'
          : isScrolled
            ? 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0.75) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.08) 65%, rgba(255,255,255,0.2) 100%)',
        WebkitBackdropFilter: isScrolled ? 'blur(16px) saturate(1.4)' : 'blur(12px) saturate(1.2)',
      }}
    >
      {/* Stylish gradient border bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          background: useDarkMode
            ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 80%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(20,60,100,0.2) 20%, rgba(20,60,100,0.3) 50%, rgba(20,60,100,0.2) 80%, transparent 100%)',
          opacity: isScrolled ? 1 : 0.6,
        }}
      />
      <div className="section-container">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-0 group"
            aria-label="Nest Data Group - Home"
          >
            <Logo size={24} animated />
            <span className={`font-display text-lg font-semibold leading-tight transition-colors duration-500 ${
              useDarkMode ? 'text-white' : 'text-navy-900'
            }`}>
              Nest Data Group
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-body-sm transition-colors duration-300 relative group ${
                  useDarkMode
                    ? 'text-white/90 hover:text-white'
                    : 'text-navy-600 hover:text-navy-900'
                }`}
              >
                {t(link.labelKey)}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-teal-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* Language Switcher */}
            <LanguageSwitcher useDarkMode={useDarkMode} />
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 -mr-2 transition-colors duration-300 ${
              useDarkMode ? 'text-white' : 'text-navy-700'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-enterprise ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`py-6 space-y-4 border-t ${useDarkMode ? 'border-white/[0.08]' : 'border-navy-100/30'}`}>
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block font-body text-body transition-colors duration-300 ${
                  useDarkMode ? 'text-white/90 hover:text-white' : 'text-navy-700 hover:text-navy-900'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {t(link.labelKey)}
              </Link>
            ))}

            {/* Mobile Language Switcher */}
            <LanguageSwitcherMobile
              useDarkMode={useDarkMode}
              onSelect={() => setIsMobileMenuOpen(false)}
            />

            <Link
              href="#contact"
              className="inline-block mt-4 px-6 py-3 font-body text-body-sm font-medium text-white bg-navy-900 rounded-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('beginConversation')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
