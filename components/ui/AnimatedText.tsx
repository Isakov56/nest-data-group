'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedTextProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  animation?: 'fade-up' | 'fade' | 'reveal' | 'words'
  delay?: number
  duration?: number
  triggerOnScroll?: boolean
  stagger?: number
}

export default function AnimatedText({
  children,
  as: Component = 'p',
  className = '',
  animation = 'fade-up',
  delay = 0,
  duration = 0.8,
  triggerOnScroll = true,
  stagger = 0.02,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container || hasAnimated.current) return

    let tween: gsap.core.Tween | gsap.core.Timeline

    const runAnimation = () => {
      if (hasAnimated.current) return
      hasAnimated.current = true

      if (animation === 'words') {
        // Split into words and animate each
        const text = container.innerText
        container.innerHTML = ''

        text.split(' ').forEach((word, i, arr) => {
          const wordSpan = document.createElement('span')
          wordSpan.className = 'inline-block overflow-hidden'

          const innerSpan = document.createElement('span')
          innerSpan.innerText = word
          innerSpan.className = 'inline-block'
          innerSpan.style.transform = 'translateY(100%)'
          innerSpan.style.opacity = '0'

          wordSpan.appendChild(innerSpan)
          container.appendChild(wordSpan)

          if (i < arr.length - 1) {
            container.appendChild(document.createTextNode(' '))
          }
        })

        const innerSpans = container.querySelectorAll('span > span')
        tween = gsap.to(innerSpans, {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
        })
      } else if (animation === 'reveal') {
        // Character by character reveal
        const text = container.innerText
        container.innerHTML = ''

        text.split('').forEach((char) => {
          const span = document.createElement('span')
          span.innerText = char === ' ' ? '\u00A0' : char
          span.style.display = 'inline-block'
          span.style.opacity = '0'
          container.appendChild(span)
        })

        tween = gsap.to(container.children, {
          opacity: 1,
          duration: 0.05,
          delay,
          stagger: stagger / 2,
          ease: 'none',
        })
      } else {
        // Fade or fade-up animation
        const fromVars: gsap.TweenVars = { opacity: 0 }
        const toVars: gsap.TweenVars = { opacity: 1, duration, delay, ease: 'power2.out' }

        if (animation === 'fade-up') {
          fromVars.y = 30
          toVars.y = 0
        }

        tween = gsap.fromTo(container, fromVars, toVars)
      }
    }

    if (triggerOnScroll) {
      ScrollTrigger.create({
        trigger: container,
        start: 'top 85%',
        once: true,
        onEnter: runAnimation,
      })
    } else {
      runAnimation()
    }

    return () => {
      if (tween) tween.kill()
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === container)
        .forEach((st) => st.kill())
    }
  }, [animation, delay, duration, stagger, triggerOnScroll])

  return (
    <Component
      ref={containerRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement>}
      className={className}
      style={{ opacity: triggerOnScroll ? 0 : 1 }}
    >
      {children}
    </Component>
  )
}
