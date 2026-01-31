'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Insight {
  id: number
  category: string
  title: string
  description: string
  date: string
  readTime: string
  views: string
  icon: string
}

const insights: Insight[] = [
  {
    id: 1,
    category: 'Architecture',
    title: 'Data Architecture',
    description: 'Systems that scale with your mission. We design resilient data foundations that transform complexity into clarity.',
    date: '',
    readTime: '',
    views: '',
    icon: 'database',
  },
  {
    id: 2,
    category: 'Cloud',
    title: 'Cloud Strategy',
    description: 'Infrastructure designed for permanence. Cloud ecosystems with flexibility and reliability your mission demands.',
    date: '',
    readTime: '',
    views: '',
    icon: 'cloud',
  },
  {
    id: 3,
    category: 'Intelligence',
    title: 'Analytics & AI',
    description: 'Intelligence embedded, not bolted on. ML and analytics woven into systems, surfacing insights where they matter.',
    date: '',
    readTime: '',
    views: '',
    icon: 'chart',
  },
  {
    id: 4,
    category: 'Security',
    title: 'Security',
    description: 'Protection at the foundation. Zero-trust architectures and defense-in-depth securing data without compromising velocity.',
    date: '',
    readTime: '',
    views: '',
    icon: 'shield',
  },
]

// Professional SVG icons
const IconComponent = ({ type }: { type: string }) => {
  switch (type) {
    case 'database':
      return (
        <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7c0 1.657-3.582 3-8 3S4 8.657 4 7m16 0c0-1.657-3.582-3-8-3S4 5.343 4 7m16 0v10c0 1.657-3.582 3-8 3s-8-1.343-8-3V7m16 5c0 1.657-3.582 3-8 3s-8-1.343-8-3" />
        </svg>
      )
    case 'chart':
      return (
        <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      )
    case 'cloud':
      return (
        <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        </svg>
      )
    case 'shield':
      return (
        <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      )
    default:
      return (
        <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      )
  }
}

export default function Insights() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation only
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="insights"
      className="relative pt-24 lg:pt-32 pb-12 lg:pb-16 bg-navy-950 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #5dc9c9 1px, transparent 0)`,
              backgroundSize: '48px 48px',
            }}
          />
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Heading - centered */}
        <div ref={headingRef} className="text-center mb-2">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-teal-500/50" />
            <span className="font-body text-body-sm text-teal-400 font-medium tracking-wider uppercase">Trusted Partners</span>
            <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-teal-500/50" />
          </div>
          <h2 className="font-display text-display md:text-display-lg text-white mb-6">
            Where Failure Is Not an Option
          </h2>
          <p className="font-body text-body-lg text-navy-300 max-w-2xl mx-auto leading-relaxed">
            Trusted by organizations operating in the most demanding environments, where data integrity and system reliability are mission-critical.
          </p>
        </div>

        {/* Two column layout - 3D panel on left, cards on right */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left side - 3D holographic data panel */}
          <div className="hidden lg:flex lg:w-1/2 items-start justify-start pl-8 pt-16">
            <div 
              className="relative"
              style={{ 
                perspective: '1200px',
                perspectiveOrigin: '0% 0%',
              }}
            >
              {/* Main 3D panel - flat but with fade on right and bottom */}
              <div 
                className="relative group"
                style={{
                  transform: 'rotateY(0deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Main panel with mask fade on right and bottom */}
                <div 
                  className="relative w-[500px] bg-gradient-to-br from-navy-800/95 to-navy-900/95 backdrop-blur-md rounded-tl-2xl rounded-tr-lg rounded-bl-lg overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]"
                  style={{
                    boxShadow: 'inset 0 1px 0 rgba(93, 201, 201, 0.2), inset 1px 0 0 rgba(93, 201, 201, 0.1)',
                    maskImage: 'linear-gradient(to right, black 60%, transparent 100%), linear-gradient(to bottom, black 70%, transparent 100%)',
                    maskComposite: 'intersect',
                    WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent 100%), linear-gradient(to bottom, black 70%, transparent 100%)',
                    WebkitMaskComposite: 'source-in',
                  }}
                >
                  {/* Panel header */}
                  <div className="px-5 py-4 border-b border-teal-500/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-600/10 flex items-center justify-center border border-teal-500/20">
                        <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Trusted Sectors</div>
                        <div className="text-xs text-navy-400">Mission-critical industries</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                      <span className="text-xs text-teal-400">Verified</span>
                    </div>
                  </div>

                  {/* Panel content - sectors grid */}
                  <div className="p-6 space-y-6">
                    {/* Sector icons grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: 'Defense', icon: (
                          <svg viewBox="0 0 24 24" className="w-6 h-6">
                            <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="12" cy="12" r="2" fill="currentColor" />
                          </svg>
                        )},
                        { name: 'Finance', icon: (
                          <svg viewBox="0 0 24 24" className="w-6 h-6">
                            <rect x="3" y="6" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                        )},
                        { name: 'Healthcare', icon: (
                          <svg viewBox="0 0 24 24" className="w-6 h-6">
                            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        )},
                        { name: 'Government', icon: (
                          <svg viewBox="0 0 24 24" className="w-6 h-6">
                            <path d="M4 9L12 4L20 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="6" y1="11" x2="6" y2="18" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="12" y1="11" x2="12" y2="18" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="18" y1="11" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" />
                            <rect x="3" y="18" width="18" height="2" rx="0.5" fill="currentColor" opacity="0.3" />
                          </svg>
                        )},
                      ].map((sector, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-navy-800/50 rounded-lg border border-navy-700/50 hover:border-teal-500/20 transition-colors">
                          <div className="text-teal-400">{sector.icon}</div>
                          <span className="text-sm text-white font-medium">{sector.name}</span>
                        </div>
                      ))}
                    </div>

                    {/* Trusted by badges */}
                    <div className="space-y-3 pt-2">
                      <div className="text-xs text-navy-300 mb-3">Trusted By</div>
                      <div className="flex flex-wrap gap-2">
                        {['Federal Agencies', 'Fortune 500', 'Defense Contractors', 'Healthcare Systems'].map((badge, i) => (
                          <span key={i} className="px-3 py-1.5 bg-navy-800/70 rounded text-[11px] text-navy-300 border border-navy-700/50">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top-left corner accent border */}
                <div 
                  className="absolute -top-px -left-px w-16 h-16 border-t-2 border-l-2 border-teal-500/30 rounded-tl-2xl pointer-events-none"
                  style={{
                    maskImage: 'linear-gradient(to right, black 60%, transparent 100%), linear-gradient(to bottom, black 70%, transparent 100%)',
                    maskComposite: 'intersect',
                    WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent 100%), linear-gradient(to bottom, black 70%, transparent 100%)',
                    WebkitMaskComposite: 'source-in',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Vertical divider line */}
          <div className="hidden lg:flex items-center justify-center px-4">
            <div className="w-px h-72 bg-gradient-to-b from-transparent via-teal-500/40 to-transparent" />
          </div>
          
          {/* Right side - 3D card stack */}
          <div 
            ref={stackRef}
            className="relative h-[340px] lg:h-[420px] lg:w-1/2 lg:pl-24"
            style={{ 
              perspective: '1200px',
              perspectiveOrigin: '100% 50%',
            }}
          >
            <div 
              className="absolute inset-0 flex items-end justify-end pr-2 lg:pr-4 pb-4"
              style={{
                transformStyle: 'preserve-3d',
                pointerEvents: 'none',
              }}
            >
              {[...insights].reverse().map((insight, index) => {
                // index 0 = front card (closest), index 2 = back card (furthest)
                const isHovered = hoveredIndex === insight.id
                const baseX = index * -85 // Horizontal offset
                const baseY = index * -65 // Vertical offset - spread up (negative = up)
                const baseZ = index * -90 // Depth
                const baseRotateY = 45 // Angle - even more tilt for stronger 3D effect
                
                // Calculate brightness - front card full, back cards dimmed for depth
                // Using brightness instead of opacity so cards stay opaque and cover cards behind
                const cardBrightness = isHovered ? 1 : (index === 0 ? 1 : 0.82 - index * 0.06)
                
                return (
                  <div
                    key={insight.id}
                    className="insight-card absolute origin-right"
                    style={{
                      width: '410px',
                      maxWidth: '85vw',
                      right: '0',
                      bottom: '0',
                      transformStyle: 'preserve-3d',
                      transform: `
                        translateX(${baseX}px)
                        translateY(${baseY + (isHovered ? -35 : 0)}px)
                        translateZ(${baseZ}px)
                        rotateY(${baseRotateY}deg)
                      `,
                      zIndex: index, // Keep natural stacking order
                      transition: 'transform 0.4s ease-out, filter 0.3s ease-out',
                      pointerEvents: 'auto',
                      filter: `brightness(${cardBrightness})`,
                    }}
                    onMouseEnter={() => setHoveredIndex(insight.id)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div 
                      className={`
                        relative overflow-hidden rounded-lg px-5 py-5
                        bg-gradient-to-bl from-navy-800 via-navy-850 to-navy-900
                        transition-all duration-150
                        ${isHovered ? 'shadow-2xl shadow-teal-500/20' : 'shadow-lg'}
                      `}
                      style={{
                        maskImage: 'linear-gradient(to right, black 0%, black 70%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, black 0%, black 70%, transparent 100%)',
                      }}
                  >
                    {/* Single continuous border that fades - using box with inset shadow */}
                    <div 
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      style={{
                        maskImage: 'linear-gradient(to right, black 0%, black 60%, transparent 90%)',
                        WebkitMaskImage: 'linear-gradient(to right, black 0%, black 60%, transparent 90%)',
                        boxShadow: isHovered 
                          ? 'inset 0 0 0 1px rgba(94, 201, 201, 0.4)'
                          : 'inset 0 0 0 1px rgba(94, 201, 201, 0.2)',
                      }}
                    />
                    
                    {/* Main content layout */}
                    <div className="flex items-start gap-4 relative z-10">
                      {/* Icon */}
                      <div className="shrink-0 w-12 h-12 bg-navy-700/50 border border-teal-500/10 rounded-lg flex items-center justify-center">
                        <IconComponent type={insight.icon} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Top row: Category + Date */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 bg-teal-500/15 rounded text-[10px] font-medium text-teal-400 uppercase tracking-wider">
                            {insight.category}
                          </span>
                          <span className="text-[11px] text-navy-400 font-medium">{insight.date}</span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="font-body text-sm font-medium text-white leading-tight mb-1.5 line-clamp-1 tracking-wide">
                          {insight.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-xs text-navy-400 leading-relaxed line-clamp-2 mb-3">
                          {insight.description}
                        </p>
                        
                        {/* Bottom row: Learn more */}
                        <div className="flex items-center text-[10px] text-navy-500 font-medium">
                          <span className={`flex items-center gap-1 transition-colors duration-200 ${isHovered ? 'text-teal-400' : ''}`}>
                            Learn more
                            <svg className={`w-3 h-3 transition-transform duration-200 ${isHovered ? 'translate-x-0.5' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
          </div>
        </div>

        {/* View all link */}
        <div className="text-center mt-32">
          <a
            href="/insights"
            className="inline-flex items-center gap-2 font-body text-body font-medium text-teal-400 hover:text-teal-300 transition-colors group"
          >
            View All Insights
            <svg 
              className="w-4 h-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
