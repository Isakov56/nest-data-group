'use client'

import { useRef, useState, ReactNode } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  glareEnabled?: boolean
  maxTilt?: number
  scale?: number
}

export default function TiltCard({
  children,
  className = '',
  glareEnabled = true,
  maxTilt = 10,
  scale = 1.02,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')
  const [glareStyle, setGlareStyle] = useState({})

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
    )

    if (glareEnabled) {
      const glareX = (x / rect.width) * 100
      const glareY = (y / rect.height) * 100

      setGlareStyle({
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
        opacity: 1,
      })
    }
  }

  const handleMouseLeave = () => {
    setTransform('')
    setGlareStyle({ opacity: 0 })
  }

  return (
    <div
      ref={cardRef}
      className={`relative transition-transform duration-300 ease-out ${className}`}
      style={{ transform, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glareEnabled && (
        <div
          className="pointer-events-none absolute inset-0 rounded-inherit transition-opacity duration-300"
          style={{
            ...glareStyle,
            borderRadius: 'inherit',
          }}
        />
      )}
    </div>
  )
}
