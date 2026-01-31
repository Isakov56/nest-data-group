'use client'

import { useEffect, useRef } from 'react'

interface GridBackgroundProps {
  className?: string
  animated?: boolean
}

export default function GridBackground({
  className = '',
  animated = false
}: GridBackgroundProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!animated || !svgRef.current) return

    const lines = svgRef.current.querySelectorAll('.grid-line')
    let animationFrame: number

    const animate = () => {
      const time = Date.now() * 0.001
      lines.forEach((line, index) => {
        const opacity = 0.03 + Math.sin(time + index * 0.5) * 0.02
        ;(line as SVGLineElement).style.opacity = String(opacity)
      })
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [animated])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <line
              className="grid-line"
              x1="60"
              y1="0"
              x2="60"
              y2="60"
              stroke="#1e3a5f"
              strokeOpacity="0.04"
              strokeWidth="1"
            />
            <line
              className="grid-line"
              x1="0"
              y1="60"
              x2="60"
              y2="60"
              stroke="#1e3a5f"
              strokeOpacity="0.04"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(255,255,255,0.8) 70%)',
        }}
      />
    </div>
  )
}
