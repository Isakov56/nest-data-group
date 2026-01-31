'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import NoiseTexture from '@/components/ui/NoiseTexture'
import DataFlowBackground from '@/components/ui/DataFlowBackground'
import SpinningGlobe from '@/components/ui/SpinningGlobe'

export default function HeroClassic() {
  const containerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    // Tagline
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )

    // Headline - split by words
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll('.word-wrapper span')
      tl.fromTo(
        words,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.5'
      )
    }

    // Subheadline
    tl.fromTo(
      subheadRef.current,
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' },
      '-=0.6'
    )

    // CTA buttons
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
        '-=0.5'
      )
    }

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.3'
    )

    return () => {
      tl.kill()
    }
  }, [])

  const headline = 'Architecture for the data that matters'
  const headlineWords = headline.split(' ')

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Main Background Image - IT professionals working */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Dark overlay for text readability - even coverage */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'rgba(30,58,95,0.5)',
        }}
      />

      {/* Secondary tech/network overlay - more visible */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
          mixBlendMode: 'screen',
        }}
      />

      {/* IT Solutions Background Pattern - Server/Network */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to right, black 0%, black 60%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to right, black 0%, black 60%, transparent 80%)',
        }}
      >
        <svg 
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMinYMid slice"
        >
          <defs>
            <pattern id="gridPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect width="60" height="60" fill="none" stroke="#5dc9c9" strokeWidth="1" opacity="0.18" />
            </pattern>
          </defs>
          
          {/* Base grid */}
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
          
          {/* Circuit/Network lines - subtle teal */}
          <g stroke="#5dc9c9" strokeWidth="1.5" fill="none" opacity="0.45">
            <path d="M0 200 L400 200 L400 300 L700 300 L700 250 L1000 250" />
            <path d="M1000 250 L1200 250 L1200 350 L1500 350 L1500 280 L1920 280" />
            <path d="M0 500 L300 500 L300 450 L600 450 L600 520 L900 520" />
            <path d="M900 520 L1100 520 L1100 480 L1400 480 L1400 550 L1700 550 L1700 500 L1920 500" />
            <path d="M0 750 L250 750 L250 700 L550 700 L550 780 L850 780" />
            <path d="M850 780 L1050 780 L1050 720 L1350 720 L1350 800 L1600 800 L1600 750 L1920 750" />
            <path d="M400 200 L400 500" />
            <path d="M700 250 L700 450" />
            <path d="M1000 250 L1000 520" />
            {/* Additional diagonal connections for network look */}
            <path d="M200 100 L400 200" />
            <path d="M1400 150 L1200 250" />
            <path d="M100 400 L300 500" />
            <path d="M1700 400 L1500 350" />
            <path d="M300 650 L550 700" />
            <path d="M1800 650 L1600 750" />
          </g>
          
          {/* Connection nodes - subtle glowing dots */}
          <g fill="#5dc9c9" opacity="0.2">
            <circle cx="400" cy="200" r="6">
              <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="700" cy="300" r="5">
              <animate attributeName="r" values="4;7;4" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="1000" cy="250" r="6">
              <animate attributeName="r" values="5;8;5" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="600" cy="450" r="5">
              <animate attributeName="r" values="4;6;4" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="900" cy="520" r="6">
              <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="550" cy="700" r="5">
              <animate attributeName="r" values="4;7;4" dur="2.3s" repeatCount="indefinite" />
            </circle>
            <circle cx="1200" cy="250" r="5">
              <animate attributeName="r" values="4;6;4" dur="1.9s" repeatCount="indefinite" />
            </circle>
            <circle cx="1500" cy="350" r="6">
              <animate attributeName="r" values="5;7;5" dur="2.1s" repeatCount="indefinite" />
            </circle>
            <circle cx="1350" cy="720" r="5">
              <animate attributeName="r" values="4;6;4" dur="2.4s" repeatCount="indefinite" />
            </circle>
          </g>
          
          {/* Outer glow effect for nodes */}
          <g fill="#5dc9c9" opacity="0.06">
            <circle cx="400" cy="200" r="12" />
            <circle cx="700" cy="300" r="10" />
            <circle cx="1000" cy="250" r="12" />
            <circle cx="600" cy="450" r="10" />
            <circle cx="900" cy="520" r="12" />
            <circle cx="550" cy="700" r="10" />
            <circle cx="1200" cy="250" r="10" />
            <circle cx="1500" cy="350" r="12" />
            <circle cx="1350" cy="720" r="10" />
          </g>
        </svg>
      </div>

      {/* Subtle gradient for depth - doesn't wash out network */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-teal-900/10 pointer-events-none" />

      {/* Lightweight animated background */}
      <DataFlowBackground />

      {/* Spinning Globe - positioned on right */}
      <SpinningGlobe />

      {/* Noise texture overlay */}
      <NoiseTexture opacity={0.02} />

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 section-container pt-20 pb-24"
      >
        <div className="max-w-3xl mx-auto text-center">
          {/* Tagline */}
          <span
            ref={taglineRef}
            className="inline-flex items-center gap-2 font-body text-body-sm text-teal-300 font-medium tracking-wider uppercase mb-6"
          >
            <span className="w-8 h-px bg-teal-400" />
            Enterprise Data Architecture
            <span className="w-8 h-px bg-teal-400" />
          </span>

          {/* Headline with word-by-word animation */}
          <h1
            ref={headlineRef}
            className="font-display text-display md:text-display-lg lg:text-display-xl text-white mb-8 leading-[1.1]"
          >
            {headlineWords.map((word, i) => (
              <span
                key={i}
                className="word-wrapper inline-block overflow-hidden mr-[0.25em] last:mr-0"
              >
                <span className="inline-block">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadRef}
            className="font-body text-body-lg md:text-heading text-white max-w-2xl mx-auto mb-12"
            style={{ textWrap: 'balance' }}
          >
            We design the systems that power critical decisions across government,
            defense, and enterprise — where precision isn&apos;t optional.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-sm"
            >
              {/* Animated background */}
              <span className="absolute inset-0 bg-teal-500 transition-transform duration-500 ease-out group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Shimmer effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <span className="relative font-body text-body font-medium text-white">
                Begin a Conversation
              </span>
            </a>

            <a
              href="#capabilities"
              className="group inline-flex items-center justify-center px-8 py-4 font-body text-body font-medium text-white border border-white/30 rounded-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10"
            >
              Explore Capabilities
              <svg
                className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="font-body text-body-sm text-white/60 tracking-wider">
          Scroll to explore
        </span>
        
        {/* Mouse icon - desktop */}
        <div className="hidden sm:flex relative w-6 h-10 rounded-full border-2 border-white/40 justify-center">
          <div className="absolute top-2 w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
        
        {/* Swipe down gesture - mobile */}
        <div className="sm:hidden flex flex-col items-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white/60 animate-bounce">
            <path 
              d="M12 5V19M12 19L5 12M12 19L19 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
    </section>
  )
}
