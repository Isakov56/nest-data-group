'use client'

import { Link } from '@/i18n/navigation'
import Logo from '@/components/ui/Logo'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { href: '/#capabilities', labelKey: 'capabilities' },
      { href: '/about', labelKey: 'aboutUs' },
      { href: '/team', labelKey: 'ourTeam' },
      { href: '/#contact', labelKey: 'contact' },
    ],
    legal: [
      { href: '/privacy', labelKey: 'privacyPolicy' },
      { href: '/terms', labelKey: 'termsOfService' },
      { href: '/security', labelKey: 'security' },
    ],
  }

  return (
    <footer className="relative bg-navy-950 text-white overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy-700 to-transparent" />

      {/* Main footer content */}
      <div className="section-container py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <Logo size={22} animated={false} />
              <span className="font-display text-lg font-semibold leading-tight">
                nest data group
              </span>
            </div>

            <p className="font-body text-body text-navy-300 max-w-sm mb-8 leading-relaxed">
              {t('tagline')}
            </p>

            {/* Security badges */}
            <div className="flex items-center gap-4 text-navy-500">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-navy-900/50 rounded text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
                <span>{t('soc2Compliant')}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-navy-900/50 rounded text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{t('fedRampReady')}</span>
              </div>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="font-body text-sm font-medium uppercase tracking-wider text-navy-400 mb-5">
              {t('company')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-body-sm text-navy-300 hover:text-white transition-colors duration-300"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-body text-sm font-medium uppercase tracking-wider text-navy-400 mb-5">
              {t('legal')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-body-sm text-navy-300 hover:text-white transition-colors duration-300"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact */}
            <div className="mt-8">
              <h4 className="font-body text-sm font-medium uppercase tracking-wider text-navy-400 mb-3">
                {t('contact')}
              </h4>
              <a
                href="mailto:contact@nestdatagroup.com"
                className="font-body text-body-sm text-navy-300 hover:text-teal-400 transition-colors duration-300"
              >
                contact@nestdatagroup.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-navy-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-body-sm text-navy-500">
            &copy; {currentYear} Nest Data Group. {t('allRightsReserved')}
          </p>

          <div className="flex items-center gap-6">
            {/* Social links placeholder */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy-500 hover:text-white transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
    </footer>
  )
}
