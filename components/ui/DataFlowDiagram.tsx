'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function DataFlowDiagram() {
  const svgRef = useRef<SVGSVGElement>(null)
  const particlesRef = useRef<SVGGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const particles = particlesRef.current
    if (!svg || !particles) return

    const paths = svg.querySelectorAll('.flow-path')
    const nodes = svg.querySelectorAll('.flow-node')
    const labels = svg.querySelectorAll('.flow-label')

    // Set initial state for paths
    paths.forEach((path) => {
      const pathElement = path as SVGPathElement
      const length = pathElement.getTotalLength()
      gsap.set(pathElement, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })
    })

    // Set initial state for nodes and labels
    gsap.set(nodes, { scale: 0, transformOrigin: 'center' })
    gsap.set(labels, { opacity: 0 })

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: 'top 70%',
        once: true,
      },
    })

    // Animate paths drawing
    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power2.inOut',
    })

    // Animate nodes appearing
    tl.to(
      nodes,
      {
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      },
      '-=1'
    )

    // Animate labels fading in
    tl.to(
      labels,
      {
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
      },
      '-=0.3'
    )

    // Continuous particle animation along paths using getPointAtLength
    const createParticle = () => {
      if (!particles) return

      const particle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      )
      particle.setAttribute('r', '3')
      particle.setAttribute('fill', '#4a9b9b')
      particle.setAttribute('opacity', '0')
      particles.appendChild(particle)

      // Random path selection
      const pathIndex = Math.floor(Math.random() * paths.length)
      const path = paths[pathIndex] as SVGPathElement
      const length = path.getTotalLength()
      const duration = 2 + Math.random()

      // Animate progress along path
      const progress = { value: 0 }

      gsap.to(particle, { opacity: 0.8, duration: 0.3 })

      gsap.to(progress, {
        value: 1,
        duration,
        ease: 'none',
        onUpdate: () => {
          const point = path.getPointAtLength(progress.value * length)
          particle.setAttribute('cx', String(point.x))
          particle.setAttribute('cy', String(point.y))
        },
        onComplete: () => {
          gsap.to(particle, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => particle.remove(),
          })
        },
      })
    }

    // Start particles after main animation
    let particleInterval: NodeJS.Timeout
    tl.call(() => {
      particleInterval = setInterval(createParticle, 500)
    })

    return () => {
      clearInterval(particleInterval)
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 300"
      className="w-full max-w-4xl mx-auto"
      aria-label="Data flow diagram showing sources, processing, and insights"
    >
      {/* Connection Paths */}
      <g className="flow-paths">
        {/* Source to Processing */}
        <path
          className="flow-path"
          d="M120 80 C200 80, 250 150, 350 150"
          fill="none"
          stroke="#1e3a5f"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
        <path
          className="flow-path"
          d="M120 150 C200 150, 280 150, 350 150"
          fill="none"
          stroke="#1e3a5f"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
        <path
          className="flow-path"
          d="M120 220 C200 220, 250 150, 350 150"
          fill="none"
          stroke="#1e3a5f"
          strokeWidth="2"
          strokeOpacity="0.3"
        />

        {/* Processing to Insights */}
        <path
          className="flow-path"
          d="M450 150 C520 150, 560 80, 680 80"
          fill="none"
          stroke="#1e3a5f"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
        <path
          className="flow-path"
          d="M450 150 C520 150, 580 150, 680 150"
          fill="none"
          stroke="#1e3a5f"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
        <path
          className="flow-path"
          d="M450 150 C520 150, 560 220, 680 220"
          fill="none"
          stroke="#1e3a5f"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
      </g>

      {/* Particles Container */}
      <g ref={particlesRef} className="particles" />

      {/* Source Nodes */}
      <g className="sources">
        <rect
          className="flow-node"
          x="70"
          y="60"
          width="50"
          height="40"
          rx="4"
          fill="#1e3a5f"
        />
        <rect
          className="flow-node"
          x="70"
          y="130"
          width="50"
          height="40"
          rx="4"
          fill="#243b53"
        />
        <rect
          className="flow-node"
          x="70"
          y="200"
          width="50"
          height="40"
          rx="4"
          fill="#334e68"
        />
      </g>

      {/* Processing Node */}
      <g className="processing">
        <rect
          className="flow-node"
          x="350"
          y="115"
          width="100"
          height="70"
          rx="6"
          fill="#1e3a5f"
        />
        <rect
          className="flow-node"
          x="365"
          y="130"
          width="30"
          height="20"
          rx="2"
          fill="#4a9b9b"
        />
        <rect
          className="flow-node"
          x="405"
          y="130"
          width="30"
          height="20"
          rx="2"
          fill="#4a9b9b"
        />
        <rect
          className="flow-node"
          x="365"
          y="155"
          width="70"
          height="20"
          rx="2"
          fill="#4a9b9b"
          opacity="0.6"
        />
      </g>

      {/* Insight Nodes */}
      <g className="insights">
        <circle className="flow-node" cx="705" cy="80" r="25" fill="#4a9b9b" />
        <circle
          className="flow-node"
          cx="705"
          cy="150"
          r="25"
          fill="#4a9b9b"
        />
        <circle
          className="flow-node"
          cx="705"
          cy="220"
          r="25"
          fill="#4a9b9b"
        />
      </g>

      {/* Labels */}
      <text
        className="flow-label font-body"
        x="95"
        y="45"
        textAnchor="middle"
        fill="#627d98"
        fontSize="12"
      >
        Sources
      </text>
      <text
        className="flow-label font-body"
        x="400"
        y="100"
        textAnchor="middle"
        fill="#627d98"
        fontSize="12"
      >
        Processing
      </text>
      <text
        className="flow-label font-body"
        x="705"
        y="265"
        textAnchor="middle"
        fill="#627d98"
        fontSize="12"
      >
        Insights
      </text>
    </svg>
  )
}
