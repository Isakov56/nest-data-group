'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NoiseTexture from '@/components/ui/NoiseTexture'
import GradientMesh from '@/components/ui/GradientMesh'
import { useTranslations } from 'next-intl'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Contact() {
  const t = useTranslations('contact')
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const elements = content.querySelectorAll('.animate-item')

    ScrollTrigger.create({
      trigger: content,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
          }
        )
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative section-padding !pb-12 md:!pb-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-navy-50/50" />
      <GradientMesh variant="section" className="opacity-30" />
      <NoiseTexture opacity={0.02} />

      <div className="section-container relative">
        <div
          ref={contentRef}
          className="max-w-4xl mx-auto"
        >
          {/* Main content */}
          <div className="text-center mb-6 md:mb-16">
            <span className="animate-item inline-flex items-center gap-4 font-body text-body-sm text-teal-600 font-medium tracking-wider uppercase mb-6 opacity-0">
              <span className="w-24 h-[1px] bg-gradient-to-r from-transparent to-teal-500/50" />
              {t('sectionLabel')}
              <span className="w-24 h-[1px] bg-gradient-to-l from-transparent to-teal-500/50" />
            </span>

            <h2 className="animate-item font-display text-display md:text-display-lg text-navy-900 mb-6 opacity-0">
              {t('title')}
            </h2>

            <p className="animate-item font-body text-body-lg text-navy-500 max-w-2xl mx-auto mb-6 md:mb-12 opacity-0">
              {t('description')}
            </p>

            {/* CTA Buttons */}
            <div className="animate-item flex flex-col sm:flex-row gap-4 justify-center opacity-0">
              <a
                href="mailto:contact@nestdatagroup.com"
                className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden rounded-sm"
              >
                {/* Animated background */}
                <span className="absolute inset-0 bg-navy-900 transition-transform duration-500 ease-out group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-r from-navy-800 to-navy-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Shimmer effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <span className="relative font-body text-body-lg font-medium text-white">
                  {t('startConversation')}
                </span>
              </a>

              <a
                href="tel:+1-202-555-0100"
                className="group inline-flex items-center justify-center px-10 py-5 font-body text-body-lg font-medium text-navy-700 border border-navy-200 rounded-sm transition-all duration-300 hover:border-navy-400 hover:text-navy-900 hover:bg-navy-50/50"
              >
                <svg
                  className="mr-3 w-5 h-5 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {t('scheduleCall')}
              </a>
            </div>
          </div>

          {/* Contact info - column on mobile, row on desktop */}
          <div className="animate-item flex flex-col md:flex-row justify-center items-start gap-2 md:gap-12 lg:gap-16 pl-5 md:pl-0 opacity-0">
            {/* Email */}
            <a
              href="mailto:contact@nestdatagroup.com"
              className="group flex items-center gap-2 text-navy-600 hover:text-teal-600 transition-colors duration-300"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-body text-xs md:text-sm">contact@nestdatagroup.com</span>
            </a>

            {/* Phones */}
            <div className="flex flex-col gap-0.5 text-navy-600">
              <a href="tel:+998942954070" className="group flex items-center gap-2 hover:text-teal-600 transition-colors duration-300">
                <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-body text-xs md:text-sm">+998 94 295 4070</span>
              </a>
              <a href="tel:+998507440370" className="group flex items-center gap-2 hover:text-teal-600 transition-colors duration-300">
                <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-body text-xs md:text-sm">+998 50 744 0370</span>
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-navy-600">
              <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-body text-xs md:text-sm">{t('washingtonDC')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
