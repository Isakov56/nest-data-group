'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GradientMesh from '@/components/ui/GradientMesh'
import NoiseTexture from '@/components/ui/NoiseTexture'
import Logo from '@/components/ui/Logo'
import { useTranslations } from 'next-intl'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Philosophy() {
  const t = useTranslations('philosophy')
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const quote = quoteRef.current

    if (!quote) return

    const words = wordsRef.current.filter(Boolean)

    // Set initial state
    gsap.set(words, {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    })

    // Animation
    ScrollTrigger.create({
      trigger: quote,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.to(words, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out',
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  const quoteText = t('quote')
  const quoteWords = quoteText.split(' ')

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-navy-950" />
      <GradientMesh variant="dark" className="opacity-30" />
      <NoiseTexture opacity={0.04} />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating blocks */}
        <div className="absolute top-20 left-[10%] w-4 h-4 bg-teal-400 rounded-sm opacity-20 animate-pulse" />
        <div className="absolute top-40 right-[15%] w-3 h-3 bg-navy-400 rounded-sm opacity-15" />
        <div className="absolute bottom-32 left-[20%] w-2 h-2 bg-teal-300 rounded-sm opacity-20" />
        <div className="absolute bottom-20 right-[25%] w-5 h-5 bg-navy-600 rounded-sm opacity-10" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Quote mark */}
          <div className="mb-12 opacity-20">
            <svg
              className="w-16 h-16 mx-auto text-teal-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Quote */}
          <blockquote ref={quoteRef} className="mb-12">
            <p className="font-display text-heading-xl md:text-display lg:text-display-lg text-white leading-tight">
              {quoteWords.map((word, i) => (
                <span
                  key={i}
                  ref={(el) => { if (el) wordsRef.current[i] = el }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </span>
              ))}
            </p>
          </blockquote>

          {/* Attribution */}
          <div className="flex items-center justify-center gap-2">
            <Logo size={20} animated={false} />
            <span className="font-body text-body text-navy-300 tracking-wide">
              Nest Data Group
            </span>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
    </section>
  )
}
