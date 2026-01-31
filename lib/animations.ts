'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const defaultScrollConfig = {
  start: 'top 80%',
  end: 'top 20%',
  scrub: false,
  once: true,
}

export const defaultTweenConfig = {
  duration: 0.8,
  ease: 'power2.out',
  stagger: 0.1,
}

export const heroTweenConfig = {
  duration: 1.2,
  ease: 'power3.out',
  stagger: 0.15,
}

// Fade in from bottom animation
export const fadeInUp = (
  elements: gsap.TweenTarget,
  options?: gsap.TweenVars
) => {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      ...defaultTweenConfig,
      ...options,
    }
  )
}

// Fade in animation
export const fadeIn = (
  elements: gsap.TweenTarget,
  options?: gsap.TweenVars
) => {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      ...defaultTweenConfig,
      ...options,
    }
  )
}

// Staggered fade in from bottom
export const staggerFadeInUp = (
  elements: gsap.TweenTarget,
  stagger = 0.1,
  options?: gsap.TweenVars
) => {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      ...defaultTweenConfig,
      stagger,
      ...options,
    }
  )
}

// Create scroll-triggered animation
export const createScrollAnimation = (
  trigger: string | Element,
  animation: () => gsap.core.Tween | gsap.core.Timeline,
  scrollOptions?: ScrollTrigger.Vars
) => {
  return ScrollTrigger.create({
    trigger,
    ...defaultScrollConfig,
    ...scrollOptions,
    onEnter: () => animation(),
  })
}

// Line draw animation for SVG paths
export const drawLine = (
  path: SVGPathElement,
  options?: gsap.TweenVars
) => {
  const length = path.getTotalLength()

  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  })

  return gsap.to(path, {
    strokeDashoffset: 0,
    duration: 1.5,
    ease: 'power2.inOut',
    ...options,
  })
}

// Text reveal animation (character by character)
export const revealText = (
  container: HTMLElement,
  options?: gsap.TweenVars
) => {
  const text = container.innerText
  container.innerHTML = ''

  text.split('').forEach((char) => {
    const span = document.createElement('span')
    span.innerText = char === ' ' ? '\u00A0' : char
    span.style.display = 'inline-block'
    span.style.opacity = '0'
    container.appendChild(span)
  })

  return gsap.to(container.children, {
    opacity: 1,
    duration: 0.05,
    stagger: 0.02,
    ease: 'none',
    ...options,
  })
}

// Parallax effect
export const createParallax = (
  element: string | Element,
  speed = 0.5
) => {
  return gsap.to(element, {
    y: () => window.innerHeight * speed * 0.5,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

// Kill all ScrollTriggers (cleanup)
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}

// Refresh ScrollTrigger (call after DOM changes)
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh()
}
