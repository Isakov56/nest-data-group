'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltCard from '@/components/ui/TiltCard'
import NoiseTexture from '@/components/ui/NoiseTexture'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const caseStudies = [
  {
    id: 'defense',
    sector: 'Defense',
    title: 'Mission-Critical Intelligence',
    description: 'Real-time data fusion across distributed sensor networks enabling faster, more accurate decision-making in complex operational environments.',
    metrics: [
      { value: '94%', label: 'Faster Processing' },
      { value: '2.3B', label: 'Daily Events' },
    ],
    gradient: 'from-navy-900 via-navy-800 to-navy-700',
    accentColor: '#4a9b9b',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <polygon points="24,4 44,14 44,34 24,44 4,34 4,14" fill="none" stroke="currentColor" strokeWidth="2" />
        <polygon points="24,12 36,18 36,30 24,36 12,30 12,18" fill="currentColor" opacity="0.3" />
        <circle cx="24" cy="24" r="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'finance',
    sector: 'Finance',
    title: 'Regulatory Compliance at Scale',
    description: 'Automated compliance monitoring and reporting infrastructure processing millions of transactions while maintaining audit-ready documentation.',
    metrics: [
      { value: '99.97%', label: 'Accuracy' },
      { value: '85M', label: 'Daily Txns' },
    ],
    gradient: 'from-navy-800 via-navy-700 to-teal-700',
    accentColor: '#7acbcb',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect x="8" y="8" width="32" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="8" y1="18" x2="40" y2="18" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="24" width="8" height="10" rx="1" fill="currentColor" opacity="0.3" />
        <rect x="26" y="28" width="8" height="6" rx="1" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'healthcare',
    sector: 'Healthcare',
    title: 'Patient Data Interoperability',
    description: 'Unified data platform connecting disparate health systems to improve care coordination and enable advanced analytics for population health.',
    metrics: [
      { value: '340+', label: 'Systems Unified' },
      { value: '12M', label: 'Patient Records' },
    ],
    gradient: 'from-teal-600 via-teal-500 to-teal-400',
    accentColor: '#1e3a5f',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <path d="M24 4 L24 44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M4 24 L44 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      </svg>
    ),
  },
]

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const cards = cardsRef.current

    if (!header || !cards) return

    const cardItems = cards.querySelectorAll('.case-card')

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

    // Cards animation
    cardItems.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.15,
              ease: 'power3.out',
            }
          )
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="sectors"
      className="relative bg-white section-padding overflow-hidden"
    >
      <NoiseTexture opacity={0.015} />

      <div className="section-container relative">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-4 font-body text-body-sm text-teal-600 font-medium tracking-wider uppercase mb-6 opacity-0">
            <span className="w-24 h-[1px] bg-gradient-to-r from-transparent to-teal-500/50" />
            Sectors
            <span className="w-24 h-[1px] bg-gradient-to-l from-transparent to-teal-500/50" />
          </span>
          <h2 className="font-display text-display md:text-display-lg text-navy-900 mb-6 opacity-0">
            Proven impact across critical industries
          </h2>
          <p className="font-body text-body-lg text-navy-500 opacity-0">
            We partner with organizations where the stakes are highest and the
            margin for error is zero.
          </p>
        </div>

        {/* Case Study Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {caseStudies.map((study) => (
            <TiltCard
              key={study.id}
              className="case-card opacity-0"
              maxTilt={6}
              scale={1.02}
            >
              <div className="relative h-full rounded-2xl overflow-hidden group">
                {/* Card Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient}`} />

                {/* Pattern overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Content */}
                <div className="relative p-8 lg:p-10 h-full flex flex-col">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 mb-6 text-white/80 transition-transform duration-500 group-hover:scale-110"
                  >
                    {study.icon}
                  </div>

                  {/* Sector badge */}
                  <span
                    className="inline-flex self-start px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase mb-4"
                    style={{
                      backgroundColor: `${study.accentColor}30`,
                      color: 'white',
                    }}
                  >
                    {study.sector}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-heading-lg text-white mb-4">
                    {study.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-body text-white/80 mb-8 flex-grow">
                    {study.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20">
                    {study.metrics.map((metric, i) => (
                      <div key={i}>
                        <div className="font-display text-heading-lg text-white">
                          {metric.value}
                        </div>
                        <div className="font-body text-body-sm text-white/60">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Hover effect - subtle glow */}
                  <div
                    className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-3xl"
                    style={{ backgroundColor: study.accentColor }}
                  />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
