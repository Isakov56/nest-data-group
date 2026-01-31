'use client'

import { ReactNode } from 'react'

interface AnimatedBorderProps {
  children: ReactNode
  className?: string
  borderClassName?: string
  gradientColors?: string[]
  animationDuration?: number
}

export default function AnimatedBorder({
  children,
  className = '',
  borderClassName = '',
  gradientColors = ['#1e3a5f', '#4a9b9b', '#334e68', '#4a9b9b', '#1e3a5f'],
  animationDuration = 3,
}: AnimatedBorderProps) {
  const gradientString = gradientColors.join(', ')

  return (
    <div className={`relative group ${className}`}>
      {/* Animated border gradient */}
      <div
        className={`absolute -inset-[1px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${borderClassName}`}
        style={{
          background: `linear-gradient(90deg, ${gradientString})`,
          backgroundSize: '200% 100%',
          animation: `borderGradient ${animationDuration}s linear infinite`,
        }}
      />

      {/* Glow effect */}
      <div
        className="absolute -inset-[1px] rounded-lg opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, ${gradientString})`,
          backgroundSize: '200% 100%',
          animation: `borderGradient ${animationDuration}s linear infinite`,
        }}
      />

      {/* Content */}
      <div className="relative bg-white rounded-lg">
        {children}
      </div>

      <style jsx>{`
        @keyframes borderGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  )
}
