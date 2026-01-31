'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  decimals?: number
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container || hasAnimated.current) return

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        hasAnimated.current = true

        const counter = { value: 0 }
        gsap.to(counter, {
          value,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            setDisplayValue(counter.value)
          },
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [value, duration])

  const formattedValue = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.round(displayValue).toLocaleString()

  return (
    <span ref={containerRef} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  )
}
