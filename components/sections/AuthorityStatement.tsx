'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NoiseTexture from '@/components/ui/NoiseTexture'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const sectors = [
  {
    id: 'defense',
    label: 'Defense',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <polygon points="24,4 44,14 44,34 24,44 4,34 4,14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="24,12 36,18 36,30 24,36 12,30 12,18" fill="currentColor" opacity="0.2" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect x="6" y="12" width="36" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <line x1="6" y1="20" x2="42" y2="20" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12" y="26" width="8" height="8" rx="1" fill="currentColor" opacity="0.3" />
        <rect x="24" y="28" width="12" height="4" rx="1" fill="currentColor" opacity="0.2" />
      </svg>
    ),
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 12 L24 36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M12 24 L36 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'government',
    label: 'Government',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <path d="M8 18 L24 8 L40 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="8" y="18" width="32" height="4" fill="currentColor" opacity="0.2" />
        <line x1="12" y1="22" x2="12" y2="36" stroke="currentColor" strokeWidth="2" />
        <line x1="20" y1="22" x2="20" y2="36" stroke="currentColor" strokeWidth="2" />
        <line x1="28" y1="22" x2="28" y2="36" stroke="currentColor" strokeWidth="2" />
        <line x1="36" y1="22" x2="36" y2="36" stroke="currentColor" strokeWidth="2" />
        <rect x="6" y="36" width="36" height="4" rx="1" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
]

const trustedBy = [
  'Federal Agencies',
  'Fortune 500',
  'Defense Contractors',
  'Healthcare Systems',
]

export default function AuthorityStatement() {
  const sectionRef = useRef<HTMLElement>(null)
  const statementRef = useRef<HTMLHeadingElement>(null)
  const sectorsRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const statement = statementRef.current
    const sectorsContainer = sectorsRef.current
    const badges = badgesRef.current

    if (!section || !statement || !sectorsContainer || !badges) return

    const sectorItems = sectorsContainer.querySelectorAll('.sector-item')
    const badgeItems = badges.querySelectorAll('.badge-item')

    // Statement animation
    ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          statement,
          { opacity: 0, y: 40, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
        )
      },
    })

    // Sector icons animation
    ScrollTrigger.create({
      trigger: sectorsContainer,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          sectorItems,
          { opacity: 0, scale: 0.8, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.4)',
          }
        )
      },
    })

    // Badges animation
    ScrollTrigger.create({
      trigger: badges,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          badgeItems,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
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
      className="relative bg-gradient-to-b from-gray-50 via-navy-50/50 to-white section-padding overflow-hidden"
    >
      <NoiseTexture opacity={0.02} />

      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-navy-200 to-transparent" />

      <div className="section-container relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main statement */}
          <h2
            ref={statementRef}
            className="font-display text-display md:text-display-lg text-navy-900 mb-16 opacity-0"
            style={{ textWrap: 'balance' }}
          >
            Trusted by organizations where{' '}
            <span className="text-teal-500">failure is not an option</span>.
          </h2>

          {/* Sector Icons */}
          <div
            ref={sectorsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16"
          >
            {sectors.map((sector) => (
              <div
                key={sector.id}
                className="sector-item group flex flex-col items-center gap-4 opacity-0"
              >
                <div className="relative p-5 bg-white rounded-2xl shadow-sm border border-navy-100 transition-all duration-500 group-hover:shadow-lg group-hover:border-teal-200 group-hover:-translate-y-1">
                  <div className="w-12 h-12 text-navy-600 group-hover:text-teal-600 transition-colors duration-300">
                    {sector.icon}
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                </div>
                <span className="font-body text-body-sm text-navy-600 font-medium tracking-wide">
                  {sector.label}
                </span>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div
            ref={badgesRef}
            className="flex flex-wrap justify-center gap-3"
          >
            {trustedBy.map((badge, i) => (
              <span
                key={i}
                className="badge-item inline-flex items-center px-4 py-2 bg-navy-900/5 text-navy-600 rounded-full font-body text-body-sm opacity-0"
              >
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy-200 to-transparent" />
    </section>
  )
}
