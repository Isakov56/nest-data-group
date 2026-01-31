'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface LogoProps {
  size?: number
  className?: string
  animated?: boolean
}

export default function Logo({ size = 40, className = '', animated = true }: LogoProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const floatingRef = useRef<(SVGRectElement | null)[]>([])
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!animated || !svgRef.current || hasAnimated) return

    const floatingCubes = floatingRef.current.filter(Boolean)
    if (floatingCubes.length === 0) return

    // Scattered positions - tightly grouped in top-right corner within the circle
    const scatteredOffsets = [
      { x: 5, y: -4, rotation: 15 },     // Top-middle block -> close to right-middle, bit further from big block
      { x: 8, y: -6, rotation: 0 },      // Top-right corner block -> a bit more to the right, no rotation
      { x: 5, y: -2, rotation: -12 },    // Right-middle block -> close to top-middle, bit further from big block
    ]

    // Set initial scattered state (all coming from top-right)
    floatingCubes.forEach((cube, i) => {
      if (!cube) return
      gsap.set(cube, {
        x: scatteredOffsets[i].x,
        y: scatteredOffsets[i].y,
        rotation: scatteredOffsets[i].rotation,
        transformOrigin: 'center center',
        opacity: 0.7,
      })
    })

    // Create timeline for the assembly animation
    const tl = gsap.timeline({
      delay: 0.8,
      onComplete: () => setHasAnimated(true),
    })

    // Step 1: Animate each cube to its grid position (offset = 0)
    floatingCubes.forEach((cube, i) => {
      if (!cube) return
      
      tl.to(
        cube,
        {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.2)',
        },
        i * 0.15 // Stagger the animations
      )
    })

    // Step 2: Pause briefly when assembled
    tl.to({}, { duration: 0.8 })

    // Step 3: Scatter back to top-right corner (within circle) and freeze
    floatingCubes.forEach((cube, i) => {
      if (!cube) return
      
      tl.to(
        cube,
        {
          x: scatteredOffsets[i].x,
          y: scatteredOffsets[i].y,
          rotation: scatteredOffsets[i].rotation,
          opacity: 0.85,
          duration: 0.5,
          ease: 'power2.out',
        },
        `-=${i === 0 ? 0 : 0.35}` // Overlap animations slightly
      )
    })

    return () => {
      tl.kill()
      gsap.killTweensOf(floatingCubes)
    }
  }, [animated, size, hasAnimated])

  const unit = size / 40 // Scale factor
  const cubeSize = 10 * unit
  const gap = 2 * unit
  const totalSize = cubeSize * 3 + gap * 2
  const padding = 25 * unit // More padding around the blocks for the circle
  const circleRadius = (totalSize / 2) + padding

  // Calculate positions for 3x3 grid (offset by padding for circle)
  const getPosition = (row: number, col: number) => ({
    x: padding + col * (cubeSize + gap),
    y: padding + row * (cubeSize + gap),
  })

  // Static cubes (6 cubes - bottom-left and middle forming an L + bottom-right)
  const staticCubes = [
    { row: 0, col: 0, color: '#4a9b9b' },  // Top-left
    { row: 1, col: 0, color: '#4a9b9b' },  // Middle-left
    { row: 1, col: 1, color: '#4a9b9b' },  // Center
    { row: 2, col: 0, color: '#4a9b9b' },  // Bottom-left
    { row: 2, col: 1, color: '#4a9b9b' },  // Bottom-center
    { row: 2, col: 2, color: '#4a9b9b' },  // Bottom-right
  ]

  // Floating cubes (3 cubes - top-right area that animate into place)
  const floatingCubes = [
    { row: 0, col: 1, color: '#4a9b9b' },  // Top-center
    { row: 0, col: 2, color: '#4a9b9b' },  // Top-right
    { row: 1, col: 2, color: '#4a9b9b' },  // Middle-right
  ]

  const svgSize = totalSize + padding * 2
  const extraWidth = animated ? 15 * unit : 0

  return (
    <svg
      ref={svgRef}
      width={svgSize + extraWidth}
      height={svgSize}
      viewBox={`0 0 ${svgSize + extraWidth} ${svgSize}`}
      className={className}
      aria-label="Nest Data Group Logo"
    >
      {/* Circular background with light teal */}
      <circle
        cx={svgSize / 2}
        cy={svgSize / 2}
        r={circleRadius}
        fill="rgba(74, 155, 155, 0.2)"
      />

      {/* Static cubes - always in place */}
      {staticCubes.map((cube, i) => {
        const pos = getPosition(cube.row, cube.col)
        return (
          <rect
            key={`static-${i}`}
            x={pos.x}
            y={pos.y}
            width={cubeSize}
            height={cubeSize}
            rx={1.5 * unit}
            fill={cube.color}
          />
        )
      })}

      {/* Floating cubes - animate into place */}
      {floatingCubes.map((cube, i) => {
        const pos = getPosition(cube.row, cube.col)
        // Scattered offsets for frozen state - same as GSAP animation end state
        const scatteredOffsets = [
          { x: 5, y: -4, rotation: 15 },     // Top-center cube
          { x: 8, y: -6, rotation: 0 },      // Top-right cube  
          { x: 5, y: -2, rotation: -12 },    // Middle-right cube
        ]
        const offset = scatteredOffsets[i]
        
        // For animated: render at grid position, GSAP handles transforms
        // For non-animated: render at scattered position with rotation
        if (animated) {
          return (
            <rect
              key={`floating-${i}`}
              ref={(el) => { floatingRef.current[i] = el }}
              x={pos.x}
              y={pos.y}
              width={cubeSize}
              height={cubeSize}
              rx={1.5 * unit}
              fill={cube.color}
              style={{ 
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
              }}
            />
          )
        } else {
          return (
            <rect
              key={`floating-${i}`}
              x={pos.x + offset.x}
              y={pos.y + offset.y}
              width={cubeSize}
              height={cubeSize}
              rx={1.5 * unit}
              fill={cube.color}
              style={{ 
                transformOrigin: 'center center',
                transformBox: 'fill-box',
                transform: `rotate(${offset.rotation}deg)`,
                opacity: 0.85,
              }}
            />
          )
        }
      })}
    </svg>
  )
}
