'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { useHeroVariant } from '@/hooks/useHeroVariant'

interface HeaderProps {
  className?: string
}

export default function Header({ className = '' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkSection, setIsDarkSection] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false)
  const { variant, setVariant } = useHeroVariant()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsThemeDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
    { href: '/#capabilities', label: 'Capabilities' },
    { href: '/insights', label: 'Insights' },
    { href: '/about', label: 'About' },
    { href: '/team', label: 'Team' },
    { href: '/#contact', label: 'Contact' },
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
              nest data group
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
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-teal-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            
            {/* Hero Theme Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                className={`flex items-center gap-2 font-body text-body-sm transition-colors duration-300 ${
                  useDarkMode 
                    ? 'text-white/90 hover:text-white' 
                    : 'text-navy-600 hover:text-navy-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Theme
                <svg className={`w-3 h-3 transition-transform duration-200 ${isThemeDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute top-full right-0 mt-2 w-48 rounded-lg shadow-xl overflow-hidden transition-all duration-200 ${
                isThemeDropdownOpen 
                  ? 'opacity-100 translate-y-0 pointer-events-auto' 
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              } ${useDarkMode ? 'bg-navy-800 border border-navy-700' : 'bg-white border border-gray-200'}`}>
                <div className={`px-3 py-2 text-xs font-medium uppercase tracking-wider ${useDarkMode ? 'text-white/50' : 'text-gray-400'}`}>
                  Hero Style
                </div>
                <button
                  onClick={() => { setVariant('classic'); setIsThemeDropdownOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`w-full flex items-center gap-3 px-3 py-3 text-left transition-colors ${
                    variant === 'classic' 
                      ? useDarkMode ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-50 text-teal-700'
                      : useDarkMode ? 'text-white/80 hover:bg-navy-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                    variant === 'classic' 
                      ? 'bg-teal-500 text-white' 
                      : useDarkMode ? 'bg-navy-600' : 'bg-gray-100'
                  }`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Classic</div>
                    <div className={`text-xs ${useDarkMode ? 'text-white/50' : 'text-gray-400'}`}>Globe & network</div>
                  </div>
                  {variant === 'classic' && (
                    <svg className="w-4 h-4 ml-auto text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => { setVariant('minimal'); setIsThemeDropdownOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`w-full flex items-center gap-3 px-3 py-3 text-left transition-colors ${
                    variant === 'minimal' 
                      ? useDarkMode ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-50 text-teal-700'
                      : useDarkMode ? 'text-white/80 hover:bg-navy-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                    variant === 'minimal' 
                      ? 'bg-teal-500 text-white' 
                      : useDarkMode ? 'bg-navy-600' : 'bg-gray-100'
                  }`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Minimal</div>
                    <div className={`text-xs ${useDarkMode ? 'text-white/50' : 'text-gray-400'}`}>Clean & modern</div>
                  </div>
                  {variant === 'minimal' && (
                    <svg className="w-4 h-4 ml-auto text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => { setVariant('enterprise'); setIsThemeDropdownOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`w-full flex items-center gap-3 px-3 py-3 text-left transition-colors ${
                    variant === 'enterprise' 
                      ? useDarkMode ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-50 text-teal-700'
                      : useDarkMode ? 'text-white/80 hover:bg-navy-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                    variant === 'enterprise' 
                      ? 'bg-teal-500 text-white' 
                      : useDarkMode ? 'bg-navy-600' : 'bg-gray-100'
                  }`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Enterprise</div>
                    <div className={`text-xs ${useDarkMode ? 'text-white/50' : 'text-gray-400'}`}>Four pillars</div>
                  </div>
                  {variant === 'enterprise' && (
                    <svg className="w-4 h-4 ml-auto text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
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
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Theme Selector */}
            <div className={`pt-4 border-t ${useDarkMode ? 'border-white/10' : 'border-navy-100'}`}>
              <span className={`block text-xs font-medium uppercase tracking-wider mb-3 ${useDarkMode ? 'text-white/50' : 'text-navy-400'}`}>
                Hero Style
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => { setVariant('classic'); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`flex flex-col items-center justify-center gap-1 px-3 py-3 rounded-lg transition-colors ${
                    variant === 'classic'
                      ? 'bg-teal-500 text-white'
                      : useDarkMode ? 'bg-white/10 text-white/80' : 'bg-navy-100 text-navy-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span className="text-xs">Classic</span>
                </button>
                <button
                  onClick={() => { setVariant('minimal'); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`flex flex-col items-center justify-center gap-1 px-3 py-3 rounded-lg transition-colors ${
                    variant === 'minimal'
                      ? 'bg-teal-500 text-white'
                      : useDarkMode ? 'bg-white/10 text-white/80' : 'bg-navy-100 text-navy-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                  </svg>
                  <span className="text-xs">Minimal</span>
                </button>
                <button
                  onClick={() => { setVariant('enterprise'); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`flex flex-col items-center justify-center gap-1 px-3 py-3 rounded-lg transition-colors ${
                    variant === 'enterprise'
                      ? 'bg-teal-500 text-white'
                      : useDarkMode ? 'bg-white/10 text-white/80' : 'bg-navy-100 text-navy-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-xs">Enterprise</span>
                </button>
              </div>
            </div>
            
            <Link
              href="#contact"
              className="inline-block mt-4 px-6 py-3 font-body text-body-sm font-medium text-white bg-navy-900 rounded-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Begin a Conversation
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
