'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollAnimationOptions {
  animation?: 'fade-up' | 'fade' | 'scale' | 'slide-left' | 'slide-right'
  duration?: number
  delay?: number
  start?: string
  end?: string
  scrub?: boolean | number
  once?: boolean
  stagger?: number
  markers?: boolean
}

export default function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const elementRef = useRef<T>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)

  const {
    animation = 'fade-up',
    duration = 0.8,
    delay = 0,
    start = 'top 80%',
    end = 'top 20%',
    scrub = false,
    once = true,
    stagger = 0,
    markers = false,
  } = options

  const getAnimationVars = useCallback(() => {
    const baseFrom: gsap.TweenVars = { opacity: 0 }
    const baseTo: gsap.TweenVars = { opacity: 1 }

    switch (animation) {
      case 'fade-up':
        return {
          from: { ...baseFrom, y: 40 },
          to: { ...baseTo, y: 0 },
        }
      case 'fade':
        return { from: baseFrom, to: baseTo }
      case 'scale':
        return {
          from: { ...baseFrom, scale: 0.9 },
          to: { ...baseTo, scale: 1 },
        }
      case 'slide-left':
        return {
          from: { ...baseFrom, x: 60 },
          to: { ...baseTo, x: 0 },
        }
      case 'slide-right':
        return {
          from: { ...baseFrom, x: -60 },
          to: { ...baseTo, x: 0 },
        }
      default:
        return { from: baseFrom, to: baseTo }
    }
  }, [animation])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const { from, to } = getAnimationVars()

    // Set initial state
    gsap.set(element, from)

    // Create scroll trigger
    triggerRef.current = ScrollTrigger.create({
      trigger: element,
      start,
      end,
      markers,
      once,
      onEnter: () => {
        animationRef.current = gsap.to(element, {
          ...to,
          duration,
          delay,
          ease: 'power2.out',
          stagger,
        })
      },
      ...(scrub && {
        scrub: typeof scrub === 'number' ? scrub : 1,
        onEnter: undefined,
        animation: gsap.fromTo(element, from, {
          ...to,
          duration,
          ease: 'none',
        }),
      }),
    })

    return () => {
      animationRef.current?.kill()
      triggerRef.current?.kill()
    }
  }, [
    animation,
    duration,
    delay,
    start,
    end,
    scrub,
    once,
    stagger,
    markers,
    getAnimationVars,
  ])

  const replay = useCallback(() => {
    const element = elementRef.current
    if (!element) return

    const { from, to } = getAnimationVars()

    gsap.set(element, from)
    animationRef.current = gsap.to(element, {
      ...to,
      duration,
      delay,
      ease: 'power2.out',
    })
  }, [getAnimationVars, duration, delay])

  return { ref: elementRef, replay }
}

// Hook for animating multiple children
export function useScrollStagger<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const containerRef = useRef<T>(null)
  const triggersRef = useRef<ScrollTrigger[]>([])

  const {
    animation = 'fade-up',
    duration = 0.8,
    delay = 0,
    start = 'top 80%',
    stagger = 0.1,
    once = true,
  } = options

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = Array.from(container.children)
    if (children.length === 0) return

    const fromVars: gsap.TweenVars = { opacity: 0 }
    const toVars: gsap.TweenVars = { opacity: 1 }

    if (animation === 'fade-up') {
      fromVars.y = 40
      toVars.y = 0
    }

    // Set initial state
    gsap.set(children, fromVars)

    // Create trigger
    const trigger = ScrollTrigger.create({
      trigger: container,
      start,
      once,
      onEnter: () => {
        gsap.to(children, {
          ...toVars,
          duration,
          delay,
          stagger,
          ease: 'power2.out',
        })
      },
    })

    triggersRef.current.push(trigger)

    return () => {
      triggersRef.current.forEach((t) => t.kill())
      triggersRef.current = []
    }
  }, [animation, duration, delay, start, stagger, once])

  return containerRef
}
