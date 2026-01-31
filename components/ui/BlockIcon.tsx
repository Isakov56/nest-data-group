'use client'

import { useMemo } from 'react'

type IconType = 'architecture' | 'cloud' | 'analytics' | 'security' | 'defense' | 'finance' | 'healthcare' | 'government'

interface BlockIconProps {
  type: IconType
  size?: number
  className?: string
  primaryColor?: string
  accentColor?: string
}

// Block patterns for each icon type (3x3 grid, 1 = filled, 0 = empty)
const iconPatterns: Record<IconType, number[][]> = {
  architecture: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  cloud: [
    [0, 1, 1],
    [1, 1, 1],
    [0, 1, 0],
  ],
  analytics: [
    [1, 0, 1],
    [1, 1, 1],
    [0, 1, 0],
  ],
  security: [
    [0, 1, 0],
    [1, 1, 1],
    [1, 1, 1],
  ],
  defense: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  finance: [
    [1, 1, 0],
    [1, 1, 1],
    [0, 1, 1],
  ],
  healthcare: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  government: [
    [1, 1, 1],
    [0, 1, 0],
    [1, 1, 1],
  ],
}

// Which blocks should use accent color (index in flattened array)
const accentBlocks: Record<IconType, number[]> = {
  architecture: [4], // Center block accent
  cloud: [1, 2],
  analytics: [3, 4, 5],
  security: [1],
  defense: [4],
  finance: [4],
  healthcare: [1, 3, 5, 7],
  government: [1],
}

export default function BlockIcon({
  type,
  size = 48,
  className = '',
  primaryColor = '#1e3a5f',
  accentColor = '#4a9b9b',
}: BlockIconProps) {
  const pattern = iconPatterns[type]
  const accents = accentBlocks[type]

  const blocks = useMemo(() => {
    const result: { x: number; y: number; isAccent: boolean }[] = []
    let index = 0

    pattern.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          result.push({
            x,
            y,
            isAccent: accents.includes(index),
          })
        }
        index++
      })
    })

    return result
  }, [pattern, accents])

  const blockSize = size / 4
  const gap = size / 16
  const offset = (size - (3 * blockSize + 2 * gap)) / 2

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
    >
      {blocks.map((block, i) => (
        <rect
          key={i}
          x={offset + block.x * (blockSize + gap)}
          y={offset + block.y * (blockSize + gap)}
          width={blockSize}
          height={blockSize}
          rx={2}
          fill={block.isAccent ? accentColor : primaryColor}
          className="transition-all duration-300"
        />
      ))}
    </svg>
  )
}
