'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltCard from '@/components/ui/TiltCard'
import NoiseTexture from '@/components/ui/NoiseTexture'
import { useTranslations } from 'next-intl'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const capabilityData = [
  {
    id: 'data-architecture',
    translationKey: 'dataArchitecture',
    icon: (
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <rect x="8" y="8" width="18" height="18" rx="2" fill="#1e3a5f" />
        <rect x="30" y="8" width="18" height="18" rx="2" fill="#334e68" />
        <rect x="8" y="30" width="18" height="18" rx="2" fill="#334e68" />
        <rect x="30" y="30" width="18" height="18" rx="2" fill="#4a9b9b" />
        <rect x="52" y="20" width="8" height="8" rx="1" fill="#4a9b9b" opacity="0.6" />
        <rect x="52" y="32" width="8" height="8" rx="1" fill="#1e3a5f" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: 'cloud-strategy',
    translationKey: 'cloudStrategy',
    icon: (
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <rect x="12" y="36" width="14" height="14" rx="2" fill="#1e3a5f" />
        <rect x="30" y="36" width="14" height="14" rx="2" fill="#334e68" />
        <rect x="21" y="22" width="14" height="14" rx="2" fill="#4a9b9b" />
        <rect x="39" y="22" width="14" height="14" rx="2" fill="#1e3a5f" opacity="0.7" />
        <rect x="30" y="8" width="14" height="14" rx="2" fill="#334e68" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'analytics-ai',
    translationKey: 'analyticsAI',
    icon: (
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <circle cx="20" cy="32" r="10" fill="#1e3a5f" />
        <circle cx="44" cy="20" r="8" fill="#4a9b9b" />
        <circle cx="44" cy="44" r="8" fill="#334e68" />
        <line x1="28" y1="28" x2="38" y2="22" stroke="#1e3a5f" strokeWidth="2" opacity="0.5" />
        <line x1="28" y1="36" x2="38" y2="42" stroke="#1e3a5f" strokeWidth="2" opacity="0.5" />
        <line x1="44" y1="28" x2="44" y2="36" stroke="#4a9b9b" strokeWidth="2" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'security',
    translationKey: 'security',
    icon: (
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <path d="M32 6 L52 16 L52 32 C52 44 42 54 32 58 C22 54 12 44 12 32 L12 16 Z" fill="#1e3a5f" />
        <rect x="24" y="24" width="16" height="16" rx="2" fill="#4a9b9b" />
        <rect x="28" y="28" width="8" height="8" rx="1" fill="#1e3a5f" />
      </svg>
    ),
  },
]

export default function CoreCapabilities() {
  const t = useTranslations('capabilities')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const cards = cardsRef.current

    if (!header || !cards) return

    const cardItems = cards.querySelectorAll('.capability-card')

    // Header animation
    ScrollTrigger.create({
      trigger: header,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          header.children,
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

    // Cards staggered animation
    ScrollTrigger.create({
      trigger: cards,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          cardItems,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
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
      id="capabilities"
      className="relative bg-white section-padding overflow-hidden"
    >
      <NoiseTexture opacity={0.015} />

      <div className="section-container relative">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-20">
          <span className="inline-flex items-center gap-4 font-body text-body-sm text-teal-600 font-medium tracking-wider uppercase mb-6 opacity-0">
            <span className="w-24 h-[1px] bg-gradient-to-r from-transparent to-teal-500/50" />
            {t('sectionLabel')}
          </span>
          <h2 className="font-display text-display md:text-display-lg text-navy-900 mb-6 opacity-0">
            {t('title')}
          </h2>
          <p className="font-body text-body-lg text-navy-500 opacity-0">
            {t('description')}
          </p>
        </div>

        {/* Capability Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {capabilityData.map((capability, index) => (
            <TiltCard
              key={capability.id}
              className="capability-card opacity-0"
              maxTilt={8}
              scale={1.02}
            >
              <div className="relative h-full p-8 lg:p-10 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 overflow-hidden group">
                {/* Circuit-style network effect */}
                <div className="absolute inset-0 pointer-events-none z-0">
                  {/* Animated circuit lines unique to each card */}
                  {index === 0 && (
                    <>
                      {/* Bottom-left origin - vertical line up */}
                      <div className="absolute bottom-0 left-10 w-[2px] h-0 bg-gradient-to-t from-teal-500/80 to-teal-400/40 transition-all duration-500 ease-out group-hover:h-[50%]" />
                      {/* Horizontal line right */}
                      <div className="absolute bottom-[50%] left-[39px] h-[2px] w-0 bg-gradient-to-r from-teal-500/70 to-teal-400/30 transition-all duration-500 delay-200 ease-out group-hover:w-[40%]" />
                      {/* Second vertical up */}
                      <div className="absolute bottom-[50%] left-[calc(39px+40%)] w-[2px] h-0 bg-gradient-to-t from-teal-400/60 to-transparent transition-all duration-400 delay-400 ease-out group-hover:h-[25%]" />
                      {/* Node at first corner */}
                      <div className="absolute bottom-[calc(50%-6px)] left-[39px] w-3 h-3 -translate-x-[5px] rounded-full bg-teal-500/0 transition-all duration-300 delay-200 group-hover:bg-teal-500 group-hover:shadow-[0_0_12px_4px_rgba(94,201,201,0.6)]" />
                      {/* Node at second corner */}
                      <div className="absolute bottom-[calc(50%-5px)] left-[calc(39px+40%)] w-2.5 h-2.5 -translate-x-[4px] rounded-full bg-teal-400/0 transition-all duration-300 delay-450 group-hover:bg-teal-400 group-hover:shadow-[0_0_10px_3px_rgba(94,201,201,0.5)]" />
                      {/* End node */}
                      <div className="absolute bottom-[calc(75%-4px)] left-[calc(39px+40%)] w-2 h-2 -translate-x-[3px] rounded-full bg-teal-400/0 transition-all duration-300 delay-600 group-hover:bg-teal-400/80 group-hover:shadow-[0_0_8px_2px_rgba(94,201,201,0.4)]" />
                    </>
                  )}
                  
                  {index === 1 && (
                    <>
                      {/* Top-right origin - vertical line down */}
                      <div className="absolute top-0 right-14 w-[2px] h-0 bg-gradient-to-b from-teal-500/80 to-teal-400/40 transition-all duration-500 ease-out group-hover:h-[45%]" />
                      {/* Horizontal line left */}
                      <div className="absolute top-[45%] right-14 h-[2px] w-0 bg-gradient-to-l from-teal-500/70 to-teal-400/30 transition-all duration-500 delay-200 ease-out group-hover:w-[45%]" style={{ transformOrigin: 'right' }} />
                      {/* Second vertical down */}
                      <div className="absolute top-[45%] right-[calc(56px+45%)] w-[2px] h-0 bg-gradient-to-b from-teal-400/60 to-transparent transition-all duration-400 delay-400 ease-out group-hover:h-[30%]" />
                      {/* Node at first corner */}
                      <div className="absolute top-[45%] right-14 w-3 h-3 translate-x-[5px] -translate-y-[5px] rounded-full bg-teal-500/0 transition-all duration-300 delay-200 group-hover:bg-teal-500 group-hover:shadow-[0_0_12px_4px_rgba(94,201,201,0.6)]" />
                      {/* Node at second corner */}
                      <div className="absolute top-[45%] right-[calc(56px+45%)] w-2.5 h-2.5 translate-x-[4px] -translate-y-[4px] rounded-full bg-teal-400/0 transition-all duration-300 delay-450 group-hover:bg-teal-400 group-hover:shadow-[0_0_10px_3px_rgba(94,201,201,0.5)]" />
                      {/* End node */}
                      <div className="absolute top-[75%] right-[calc(56px+45%)] w-2 h-2 translate-x-[3px] -translate-y-[3px] rounded-full bg-teal-400/0 transition-all duration-300 delay-600 group-hover:bg-teal-400/80 group-hover:shadow-[0_0_8px_2px_rgba(94,201,201,0.4)]" />
                    </>
                  )}
                  
                  {index === 2 && (
                    <>
                      {/* Left side origin - horizontal right */}
                      <div className="absolute top-[38%] left-0 h-[2px] w-0 bg-gradient-to-r from-teal-500/80 to-teal-400/40 transition-all duration-500 ease-out group-hover:w-[35%]" />
                      {/* Vertical line down */}
                      <div className="absolute top-[38%] left-[35%] w-[2px] h-0 bg-gradient-to-b from-teal-500/70 to-teal-400/30 transition-all duration-500 delay-200 ease-out group-hover:h-[35%]" />
                      {/* Second horizontal right */}
                      <div className="absolute top-[73%] left-[35%] h-[2px] w-0 bg-gradient-to-r from-teal-400/60 to-transparent transition-all duration-400 delay-400 ease-out group-hover:w-[30%]" />
                      {/* Node at first corner */}
                      <div className="absolute top-[38%] left-[35%] w-3 h-3 -translate-x-[5px] -translate-y-[5px] rounded-full bg-teal-500/0 transition-all duration-300 delay-200 group-hover:bg-teal-500 group-hover:shadow-[0_0_12px_4px_rgba(94,201,201,0.6)]" />
                      {/* Node at second corner */}
                      <div className="absolute top-[73%] left-[35%] w-2.5 h-2.5 -translate-x-[4px] -translate-y-[4px] rounded-full bg-teal-400/0 transition-all duration-300 delay-450 group-hover:bg-teal-400 group-hover:shadow-[0_0_10px_3px_rgba(94,201,201,0.5)]" />
                      {/* End node */}
                      <div className="absolute top-[73%] left-[65%] w-2 h-2 -translate-x-[3px] -translate-y-[3px] rounded-full bg-teal-400/0 transition-all duration-300 delay-600 group-hover:bg-teal-400/80 group-hover:shadow-[0_0_8px_2px_rgba(94,201,201,0.4)]" />
                    </>
                  )}
                  
                  {index === 3 && (
                    <>
                      {/* Bottom center origin - vertical up */}
                      <div className="absolute bottom-0 left-[45%] w-[2px] h-0 bg-gradient-to-t from-teal-500/80 to-teal-400/50 transition-all duration-500 ease-out group-hover:h-[55%]" />
                      {/* Branch left */}
                      <div className="absolute bottom-[55%] left-[17%] h-[2px] w-0 bg-gradient-to-r from-teal-400/30 to-teal-500/70 transition-all duration-400 delay-200 ease-out group-hover:w-[28%]" />
                      {/* Branch right */}
                      <div className="absolute bottom-[55%] left-[calc(45%+1px)] h-[2px] w-0 bg-gradient-to-r from-teal-500/70 to-teal-400/30 transition-all duration-400 delay-250 ease-out group-hover:w-[35%]" />
                      {/* Left vertical up */}
                      <div className="absolute bottom-[55%] left-[17%] w-[2px] h-0 bg-gradient-to-t from-teal-400/60 to-transparent transition-all duration-400 delay-450 ease-out group-hover:h-[22%]" />
                      {/* Right vertical up */}
                      <div className="absolute bottom-[55%] left-[80%] w-[2px] h-0 bg-gradient-to-t from-teal-400/50 to-transparent transition-all duration-400 delay-500 ease-out group-hover:h-[18%]" />
                      {/* Main center node */}
                      <div className="absolute bottom-[55%] left-[45%] w-4 h-4 -translate-x-1/2 translate-y-1/2 rounded-full bg-teal-500/0 transition-all duration-300 delay-200 group-hover:bg-teal-500 group-hover:shadow-[0_0_16px_5px_rgba(94,201,201,0.7)]" />
                      {/* Left branch node */}
                      <div className="absolute bottom-[55%] left-[17%] w-2.5 h-2.5 translate-y-1/2 rounded-full bg-teal-400/0 transition-all duration-300 delay-450 group-hover:bg-teal-400 group-hover:shadow-[0_0_10px_3px_rgba(94,201,201,0.5)]" />
                      {/* Right branch node */}
                      <div className="absolute bottom-[55%] left-[80%] w-2.5 h-2.5 translate-y-1/2 rounded-full bg-teal-400/0 transition-all duration-300 delay-500 group-hover:bg-teal-400 group-hover:shadow-[0_0_10px_3px_rgba(94,201,201,0.5)]" />
                      {/* End nodes */}
                      <div className="absolute bottom-[77%] left-[17%] w-2 h-2 translate-y-1/2 rounded-full bg-teal-400/0 transition-all duration-300 delay-600 group-hover:bg-teal-400/80 group-hover:shadow-[0_0_8px_2px_rgba(94,201,201,0.4)]" />
                      <div className="absolute bottom-[73%] left-[80%] w-2 h-2 translate-y-1/2 rounded-full bg-teal-400/0 transition-all duration-300 delay-650 group-hover:bg-teal-400/70 group-hover:shadow-[0_0_8px_2px_rgba(94,201,201,0.4)]" />
                    </>
                  )}
                  
                  {/* Subtle corner glow on hover */}
                  <div className={`absolute w-40 h-40 rounded-full bg-teal-400/0 blur-3xl transition-all duration-700 group-hover:bg-teal-400/15 ${
                    index === 0 ? 'bottom-0 left-0' : 
                    index === 1 ? 'top-0 right-0' : 
                    index === 2 ? 'top-1/3 left-0 -translate-y-1/2' : 
                    'bottom-0 left-[40%] -translate-x-1/2'
                  }`} />
                </div>

                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03]">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #1e3a5f 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                </div>

                {/* Number indicator */}
                <div className="absolute top-8 right-8 font-display text-7xl font-bold text-navy-100 select-none z-0">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="relative z-10 w-16 h-16 mb-6 transition-transform duration-500 group-hover:scale-110">
                  {capability.icon}
                </div>

                {/* Content */}
                <h3 className="relative z-10 font-display text-heading-lg text-navy-900 mb-2">
                  {t(`${capability.translationKey}.title`)}
                </h3>
                <p className="relative z-10 font-body text-body text-teal-600 font-medium mb-4">
                  {t(`${capability.translationKey}.tagline`)}
                </p>
                <p className="relative z-10 font-body text-body text-navy-500 leading-relaxed">
                  {t(`${capability.translationKey}.detail`)}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
