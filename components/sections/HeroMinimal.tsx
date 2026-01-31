'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function HeroMinimal() {
  const containerRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const floatingRef = useRef<HTMLDivElement>(null)
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    // Headline animation - character by character feel
    if (headlineRef.current) {
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
    }

    // Subheadline
    tl.fromTo(
      subheadRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    )

    // CTA buttons
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      )
    }

    // Stats
    if (statsRef.current) {
      tl.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        '-=0.3'
      )
    }

    // Floating elements
    if (floatingRef.current) {
      tl.fromTo(
        floatingRef.current.children,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.5'
      )
    }

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50/30"
    >
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Gradient orbs */}
      <div 
        className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(94, 234, 212, 0.4) 0%, transparent 70%)',
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      <div 
        className="absolute bottom-20 left-[5%] w-[400px] h-[400px] rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(30, 58, 95, 0.3) 0%, transparent 70%)',
          transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* Floating decorative elements */}
      <div ref={floatingRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating cards/shapes */}
        <div 
          className="absolute top-[15%] right-[8%] w-20 h-20 bg-white rounded-2xl shadow-xl shadow-navy-900/10 flex items-center justify-center"
          style={{
            transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px) rotate(12deg)`,
            transition: 'transform 0.4s ease-out',
          }}
        >
          <svg className="w-10 h-10 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>

        <div 
          className="absolute top-[25%] right-[25%] w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl shadow-lg shadow-teal-500/30 flex items-center justify-center"
          style={{
            transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px) rotate(-8deg)`,
            transition: 'transform 0.5s ease-out',
          }}
        >
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>

        <div 
          className="absolute bottom-[30%] right-[15%] w-14 h-14 bg-white rounded-full shadow-xl shadow-navy-900/10 flex items-center justify-center"
          style={{
            transform: `translate(${mousePosition.x * -0.6}px, ${mousePosition.y * -0.6}px)`,
            transition: 'transform 0.45s ease-out',
          }}
        >
          <svg className="w-7 h-7 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <div 
          className="absolute top-[45%] right-[5%] w-12 h-12 bg-navy-900 rounded-lg shadow-lg flex items-center justify-center"
          style={{
            transform: `translate(${mousePosition.x * 1.2}px, ${mousePosition.y * 1.2}px) rotate(15deg)`,
            transition: 'transform 0.35s ease-out',
          }}
        >
          <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        {/* Small floating dots */}
        <div 
          className="absolute top-[20%] left-[60%] w-3 h-3 bg-teal-400 rounded-full"
          style={{
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        />
        <div 
          className="absolute top-[60%] right-[30%] w-2 h-2 bg-navy-300 rounded-full"
          style={{
            transform: `translate(${mousePosition.x * -1.5}px, ${mousePosition.y * -1.5}px)`,
            transition: 'transform 0.25s ease-out',
          }}
        />
        <div 
          className="absolute bottom-[25%] right-[40%] w-4 h-4 bg-teal-200 rounded-full"
          style={{
            transform: `translate(${mousePosition.x * 1}px, ${mousePosition.y * 1}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 section-container">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-full mb-8">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-teal-700">Trusted by 50+ enterprises worldwide</span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-navy-900 mb-8 leading-[1.05] tracking-tight"
          >
            Data solutions
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-400 to-cyan-400">
              that just work
            </span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadRef}
            className="text-xl md:text-2xl text-navy-600 max-w-2xl mb-12 leading-relaxed"
          >
            From architecture to analytics — we handle the complexity so you can focus on what matters most.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-16">
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-navy-900 text-white font-medium rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-navy-900/20 hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-navy-800 to-navy-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            <a
              href="#capabilities"
              className="group inline-flex items-center justify-center px-8 py-4 font-medium text-navy-700 border-2 border-navy-200 rounded-xl transition-all duration-300 hover:border-navy-300 hover:bg-navy-50"
            >
              <svg className="w-5 h-5 mr-2 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Watch Demo
            </a>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="flex flex-wrap gap-8 md:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-navy-900">50+</div>
                <div className="text-sm text-navy-500">Enterprise clients</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-navy-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-navy-900">12</div>
                <div className="text-sm text-navy-500">Countries served</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-navy-900">99.9%</div>
                <div className="text-sm text-navy-500">Uptime SLA</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-6 h-10 border-2 border-navy-300 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-navy-400 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
