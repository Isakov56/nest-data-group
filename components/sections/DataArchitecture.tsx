'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const partners = [
  { name: 'UNICEF', tier: 'strategic' },
  { name: 'UNESCO', tier: 'strategic' },
  { name: 'World Bank', tier: 'strategic' },
  { name: 'LUKOIL', tier: 'enterprise' },
  { name: 'Gazprom', tier: 'enterprise' },
  { name: 'Siemens', tier: 'enterprise' },
  { name: 'SAP', tier: 'enterprise' },
  { name: 'Deloitte', tier: 'enterprise' },
  { name: 'McKinsey', tier: 'enterprise' },
  { name: 'EBRD', tier: 'enterprise' },
  { name: 'Accenture', tier: 'enterprise' },
  { name: 'Oracle', tier: 'enterprise' },
]

function PartnerLogo({ name }: { name: string }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div
      className="group relative flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`
          relative h-20 md:h-24 px-8 md:px-12 flex items-center justify-center
          transition-all duration-500 ease-out
          ${isHovered ? 'opacity-100' : 'opacity-50'}
        `}
      >
        {/* Subtle background on hover */}
        <div 
          className={`
            absolute inset-0 rounded-lg transition-all duration-500
            ${isHovered ? 'bg-white/[0.03]' : 'bg-transparent'}
          `}
        />
        
        {/* Partner name as logo placeholder */}
        <span 
          className={`
            font-display text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight
            transition-all duration-500 relative z-10 whitespace-nowrap
            ${isHovered ? 'text-white' : 'text-navy-300'}
          `}
        >
          {name}
        </span>

        {/* Bottom line accent on hover */}
        <div 
          className={`
            absolute bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-teal-500
            transition-all duration-500 ease-out
            ${isHovered ? 'w-12 opacity-100' : 'w-0 opacity-0'}
          `}
        />
      </div>
    </div>
  )
}

// CSS-based infinite scrolling marquee
function MarqueeRow({ partnerNames, direction = 'left', duration = 40 }: { partnerNames: string[]; direction?: 'left' | 'right'; duration?: number }) {
  // Double the items to ensure seamless loop
  const items = [...partnerNames, ...partnerNames]
  
  return (
    <div className="relative overflow-hidden py-4">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none" />
      
      <div 
        className="flex"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
        }}
      >
        {items.map((name, i) => (
          <PartnerLogo key={`${name}-${i}`} name={name} />
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}

export default function Partners() {
  const t = useTranslations('partners')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const strategicPartners = partners.filter(p => p.tier === 'strategic')
  const enterprisePartners = partners.filter(p => p.tier === 'enterprise')
  
  // Split enterprise partners for two rows
  const row1Partners = enterprisePartners.slice(0, 5).map(p => p.name)
  const row2Partners = enterprisePartners.slice(4).map(p => p.name)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    ScrollTrigger.create({
      trigger: header,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        setIsVisible(true)
        gsap.fromTo(
          header.querySelectorAll('.animate-item'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
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
      id="partners"
      className="relative pt-16 md:pt-20 pb-24 md:pb-32 overflow-hidden bg-navy-950"
    >
      {/* Top separator line - horizontal */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-center px-6">
        <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
      </div>

      {/* Very subtle background pattern - matching Insights */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #5dc9c9 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto px-6 mb-10 md:mb-12">
          <h2 className="animate-item font-display text-3xl md:text-4xl lg:text-5xl text-white font-light">
            {t('title')}
          </h2>
        </div>

        {/* Strategic Partners - Featured row */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-6">
            <span className="text-xs text-navy-500 tracking-[0.15em] uppercase">{t('strategicPartners')}</span>
          </div>
          <div className="flex justify-center items-center px-6">
            {strategicPartners.map((partner, i) => (
              <div
                key={partner.name}
                className={`w-40 md:w-52 lg:w-64 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <div className="group relative inline-block">
                  <span className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-white/80 group-hover:text-white transition-colors duration-300">
                    {partner.name}
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-[1px] bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 py-8">
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-navy-700" />
          <div className="w-1.5 h-1.5 rounded-full bg-navy-700" />
          <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-navy-700" />
        </div>

        {/* Enterprise Partners - Marquee rows */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-6">
            <span className="text-xs text-navy-500 tracking-[0.15em] uppercase">{t('enterpriseClients')}</span>
          </div>
          
          {/* First marquee row */}
          <MarqueeRow 
            partnerNames={row1Partners}
            direction="left" 
            duration={35}
          />
          
          {/* Second marquee row - opposite direction */}
          <MarqueeRow 
            partnerNames={row2Partners}
            direction="right" 
            duration={40}
          />
        </div>

        {/* Bottom stats */}
        <div className={`mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-8 border-t border-navy-800/50">
              {[
                { value: '50+', label: t('countriesServed') },
                { value: '$2B+', label: t('dataManaged') },
                { value: '99.9%', label: t('uptimeSLA') },
                { value: '15+', label: t('yearsExperience') },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-2xl md:text-3xl font-light text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-navy-400 tracking-wider uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
