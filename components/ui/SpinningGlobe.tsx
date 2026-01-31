'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function SpinningGlobe() {
  const globeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!globeRef.current) return

    // Fade in the globe
    gsap.fromTo(
      globeRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.5, delay: 0.3, ease: 'power2.out' }
    )
  }, [])

  return (
    <div
      ref={globeRef}
      className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none
        hidden sm:block
        sm:w-[600px] sm:h-[600px] sm:translate-x-[50%]
        md:w-[700px] md:h-[700px] md:translate-x-[40%]
        lg:w-[800px] lg:h-[800px] lg:translate-x-[35%]"
      style={{ 
        perspective: '1000px',
        filter: 'opacity(0.8)',
      }}
    >
      {/* Globe container with 3D perspective */}
      <div 
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Globe sphere base */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(100, 180, 180, 0.35) 0%, rgba(74, 155, 155, 0.2) 25%, rgba(30, 58, 95, 0.15) 50%, rgba(30, 58, 95, 0.08) 75%, transparent 100%)',
            boxShadow: 'inset -40px -40px 80px rgba(30, 58, 95, 0.25), inset 30px 30px 60px rgba(255, 255, 255, 0.12)',
          }}
        />

        {/* Globe wireframe skeleton with meridians */}
        <div className="absolute inset-[12%] rounded-full pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <radialGradient id="gridFade" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#5dc9c9" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#4a9b9b" stopOpacity="0.2" />
              </radialGradient>
            </defs>
            
            {/* Outer circle - equator */}
            <circle cx="200" cy="200" r="180" fill="none" stroke="#5dc9c9" strokeWidth="1" opacity="0.35" />
            
            {/* Latitude lines (horizontal ellipses) */}
            {[-120, -80, -40, 40, 80, 120].map((offset, idx) => (
              <ellipse
                key={`lat-${idx}`}
                cx="200"
                cy={200 + offset}
                rx={Math.sqrt(180*180 - offset*offset)}
                ry={8}
                fill="none"
                stroke="#5dc9c9"
                strokeWidth="0.8"
                opacity={0.25 - Math.abs(offset) * 0.001}
              />
            ))}
            
            {/* Meridian lines (vertical ellipses) - the skeleton look */}
            {[0, 30, 60, 90, 120, 150].map((angle, idx) => (
              <ellipse
                key={`mer-${idx}`}
                cx="200"
                cy="200"
                rx={180 * Math.cos(angle * Math.PI / 180)}
                ry="180"
                fill="none"
                stroke="#5dc9c9"
                strokeWidth="0.8"
                opacity={angle === 0 || angle === 90 ? 0.35 : 0.2}
                transform={`rotate(0 200 200)`}
              />
            ))}
            
            {/* Central vertical meridian */}
            <line x1="200" y1="20" x2="200" y2="380" stroke="#5dc9c9" strokeWidth="0.8" opacity="0.3" />
            
            {/* Central horizontal line */}
            <line x1="20" y1="200" x2="380" y2="200" stroke="#5dc9c9" strokeWidth="0.8" opacity="0.3" />
            
            {/* Tropic lines */}
            <ellipse cx="200" cy="130" rx="145" ry="8" fill="none" stroke="#5dc9c9" strokeWidth="0.6" opacity="0.22" />
            <ellipse cx="200" cy="270" rx="145" ry="8" fill="none" stroke="#5dc9c9" strokeWidth="0.6" opacity="0.22" />
          </svg>
        </div>

        {/* Data points pulsing on globe */}
        <div className="absolute inset-[10%] rounded-full pointer-events-none overflow-hidden">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {[
              { x: 280, y: 140, size: 4 }, // Europe
              { x: 120, y: 160, size: 5 }, // North America
              { x: 300, y: 240, size: 4 }, // Africa
              { x: 320, y: 160, size: 3 }, // Middle East
              { x: 160, y: 280, size: 4 }, // South America
              { x: 340, y: 200, size: 3 }, // India
            ].map((point, i) => (
              <g key={`data-${i}`}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={point.size}
                  fill="#4a9b9b"
                >
                  <animate
                    attributeName="opacity"
                    values="0.4;0.9;0.4"
                    dur={`${2.5 + i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={point.size * 2}
                  fill="none"
                  stroke="#4a9b9b"
                  strokeWidth="1"
                >
                  <animate
                    attributeName="r"
                    values={`${point.size};${point.size * 4};${point.size}`}
                    dur={`${2.5 + i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.5;0;0.5"
                    dur={`${2.5 + i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ))}
            
            {/* Connection arcs */}
            <path
              d="M120 160 Q200 100 280 140"
              fill="none"
              stroke="#4a9b9b"
              strokeWidth="1"
              opacity="0.3"
              strokeDasharray="4 4"
            >
              <animate attributeName="stroke-dashoffset" values="0;-16" dur="2s" repeatCount="indefinite" />
            </path>
            <path
              d="M280 140 Q310 190 300 240"
              fill="none"
              stroke="#4a9b9b"
              strokeWidth="1"
              opacity="0.25"
              strokeDasharray="4 4"
            >
              <animate attributeName="stroke-dashoffset" values="0;-16" dur="2.5s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>

        {/* Globe edge highlight */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 44%, rgba(74, 155, 155, 0.25) 47%, rgba(74, 155, 155, 0.45) 49%, rgba(74, 155, 155, 0.25) 51%, transparent 54%)',
          }}
        />

        {/* Atmospheric glow */}
        <div 
          className="absolute inset-[-2%] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 43%, rgba(74, 155, 155, 0.12) 48%, rgba(74, 155, 155, 0.06) 53%, transparent 58%)',
          }}
        />

        {/* Shadow on right side */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(30, 58, 95, 0.2) 70%, rgba(30, 58, 95, 0.35) 100%)',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes globeRotate {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  )
}
