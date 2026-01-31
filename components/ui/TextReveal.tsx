'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface TextRevealProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  delay?: number
  stagger?: number
  triggerOnScroll?: boolean
  splitBy?: 'chars' | 'words' | 'lines'
  animation?: 'fade-up' | 'fade' | 'blur' | 'slide'
}

export default function TextReveal({
  children,
  as: Component = 'p',
  className = '',
  delay = 0,
  stagger = 0.03,
  triggerOnScroll = true,
  splitBy = 'words',
  animation = 'fade-up',
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container || hasAnimated.current) return

    // Split text
    const text = container.innerText
    container.innerHTML = ''

    let elements: HTMLSpanElement[] = []

    if (splitBy === 'chars') {
      text.split('').forEach((char) => {
        const span = document.createElement('span')
        span.innerText = char === ' ' ? '\u00A0' : char
        span.style.display = 'inline-block'
        container.appendChild(span)
        elements.push(span)
      })
    } else if (splitBy === 'words') {
      text.split(' ').forEach((word, i, arr) => {
        const wrapper = document.createElement('span')
        wrapper.style.display = 'inline-block'
        wrapper.style.overflow = 'hidden'
        wrapper.style.verticalAlign = 'top'

        const inner = document.createElement('span')
        inner.innerText = word
        inner.style.display = 'inline-block'
        wrapper.appendChild(inner)
        container.appendChild(wrapper)
        elements.push(inner)

        if (i < arr.length - 1) {
          container.appendChild(document.createTextNode(' '))
        }
      })
    } else {
      // Lines - treat as single block
      const wrapper = document.createElement('span')
      wrapper.style.display = 'inline-block'
      wrapper.style.overflow = 'hidden'

      const inner = document.createElement('span')
      inner.innerText = text
      inner.style.display = 'inline-block'
      wrapper.appendChild(inner)
      container.appendChild(wrapper)
      elements.push(inner)
    }

    // Set initial state based on animation type
    const fromVars: gsap.TweenVars = { opacity: 0 }
    const toVars: gsap.TweenVars = { opacity: 1, duration: 0.8, ease: 'power3.out' }

    switch (animation) {
      case 'fade-up':
        fromVars.y = '100%'
        toVars.y = '0%'
        break
      case 'blur':
        fromVars.filter = 'blur(10px)'
        toVars.filter = 'blur(0px)'
        break
      case 'slide':
        fromVars.x = '-20px'
        toVars.x = '0px'
        break
    }

    gsap.set(elements, fromVars)

    const runAnimation = () => {
      if (hasAnimated.current) return
      hasAnimated.current = true

      gsap.to(elements, {
        ...toVars,
        delay,
        stagger,
      })
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
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === container)
        .forEach((st) => st.kill())
    }
  }, [animation, delay, splitBy, stagger, triggerOnScroll])

  return (
    <Component
      ref={containerRef as React.RefObject<any>}
      className={className}
    >
      {children}
    </Component>
  )
}
