'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

export default function HeroEnterprise() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)
  const codeContainerRef = useRef<HTMLDivElement>(null)

  // Typing animation state for each card
  const [typedLines1, setTypedLines1] = useState<string[]>([])
  const [currentLineIndex1, setCurrentLineIndex1] = useState(0)
  const [currentCharIndex1, setCurrentCharIndex1] = useState(0)

  const [typedLines2, setTypedLines2] = useState<string[]>([])
  const [currentLineIndex2, setCurrentLineIndex2] = useState(0)
  const [currentCharIndex2, setCurrentCharIndex2] = useState(0)

  const [typedLines3, setTypedLines3] = useState<string[]>([])
  const [currentLineIndex3, setCurrentLineIndex3] = useState(0)
  const [currentCharIndex3, setCurrentCharIndex3] = useState(0)

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false)
  const [videoKey, setVideoKey] = useState(0)

  const codeContainerRef2 = useRef<HTMLDivElement>(null)
  const codeContainerRef3 = useRef<HTMLDivElement>(null)

  // Pre-typed lines (already visible) and lines to type for card 1
  const preTypedLines1 = [
    'import { DataPipeline } from "@core/pipeline";',
    'import { StreamProcessor } from "@core/stream";',
    '',
    'export class AnalyticsEngine {',
    '  private pipeline: DataPipeline;',
    '  private processor: StreamProcessor;',
    '',
  ]

  const liveCodeLines1 = [
    '  constructor(config: EngineConfig) {',
    '    this.pipeline = new DataPipeline(config);',
    '    this.processor = new StreamProcessor();',
    '  }',
    '',
    '  async processRealTime(data: DataStream) {',
    '    const validated = await this.validate(data);',
    '    const transformed = this.transform(validated);',
    '    return this.pipeline.execute(transformed);',
    '  }',
    '',
    '  private validate(data: DataStream) {',
    '    return data.filter(d => d.isValid);',
    '  }',
    '}',
  ]

  // Pre-typed and live lines for card 2
  const preTypedLines2 = [
    'apiVersion: apps/v1',
    'kind: Deployment',
    'metadata:',
    '  name: data-processor',
    '',
  ]

  const liveCodeLines2 = [
    'spec:',
    '  replicas: 12',
    '  selector:',
    '    matchLabels:',
    '      app: processor',
    '  template:',
    '    spec:',
    '      containers:',
    '        - name: main',
    '          image: processor:latest',
    '          resources:',
    '            memory: "8Gi"',
    '            cpu: "4000m"',
  ]

  // Pre-typed and live lines for card 3
  const preTypedLines3 = [
    'WITH active_users AS (',
    '  SELECT user_id, COUNT(*) as actions',
    '  FROM user_events',
    '  WHERE timestamp > NOW() - INTERVAL 30 DAY',
    '',
  ]

  const liveCodeLines3 = [
    '  GROUP BY user_id',
    '  HAVING COUNT(*) > 100',
    ')',
    'SELECT',
    '  u.name,',
    '  u.email,',
    '  a.actions,',
    '  u.created_at',
    'FROM users u',
    'JOIN active_users a ON u.id = a.user_id',
    'ORDER BY a.actions DESC',
    'LIMIT 50;',
  ]

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Typing animation effect for card 1
  useEffect(() => {
    if (currentLineIndex1 >= liveCodeLines1.length) {
      const resetTimer = setTimeout(() => {
        setTypedLines1([])
        setCurrentLineIndex1(0)
        setCurrentCharIndex1(0)
      }, 3000)
      return () => clearTimeout(resetTimer)
    }

    const currentLine = liveCodeLines1[currentLineIndex1]
    if (currentCharIndex1 <= currentLine.length) {
      const typingSpeed = currentLine === '' ? 80 : 25
      const timer = setTimeout(() => {
        setTypedLines1(prev => {
          const newLines = [...prev]
          newLines[currentLineIndex1] = currentLine.slice(0, currentCharIndex1)
          return newLines
        })
        setCurrentCharIndex1(prev => prev + 1)
      }, typingSpeed)
      return () => clearTimeout(timer)
    } else {
      const lineDelay = setTimeout(() => {
        setCurrentLineIndex1(prev => prev + 1)
        setCurrentCharIndex1(0)
      }, 100)
      return () => clearTimeout(lineDelay)
    }
  }, [currentLineIndex1, currentCharIndex1, liveCodeLines1])

  // Typing animation effect for card 2 (delayed start)
  useEffect(() => {
    const startDelay = setTimeout(() => {
      if (currentLineIndex2 >= liveCodeLines2.length) {
        const resetTimer = setTimeout(() => {
          setTypedLines2([])
          setCurrentLineIndex2(0)
          setCurrentCharIndex2(0)
        }, 3000)
        return () => clearTimeout(resetTimer)
      }

      const currentLine = liveCodeLines2[currentLineIndex2]
      if (currentCharIndex2 <= currentLine.length) {
        const typingSpeed = currentLine === '' ? 80 : 30
        const timer = setTimeout(() => {
          setTypedLines2(prev => {
            const newLines = [...prev]
            newLines[currentLineIndex2] = currentLine.slice(0, currentCharIndex2)
            return newLines
          })
          setCurrentCharIndex2(prev => prev + 1)
        }, typingSpeed)
        return () => clearTimeout(timer)
      } else {
        const lineDelay = setTimeout(() => {
          setCurrentLineIndex2(prev => prev + 1)
          setCurrentCharIndex2(0)
        }, 120)
        return () => clearTimeout(lineDelay)
      }
    }, 500)
    return () => clearTimeout(startDelay)
  }, [currentLineIndex2, currentCharIndex2, liveCodeLines2])

  // Typing animation effect for card 3 (more delayed start)
  useEffect(() => {
    const startDelay = setTimeout(() => {
      if (currentLineIndex3 >= liveCodeLines3.length) {
        const resetTimer = setTimeout(() => {
          setTypedLines3([])
          setCurrentLineIndex3(0)
          setCurrentCharIndex3(0)
        }, 3000)
        return () => clearTimeout(resetTimer)
      }

      const currentLine = liveCodeLines3[currentLineIndex3]
      if (currentCharIndex3 <= currentLine.length) {
        const typingSpeed = currentLine === '' ? 80 : 35
        const timer = setTimeout(() => {
          setTypedLines3(prev => {
            const newLines = [...prev]
            newLines[currentLineIndex3] = currentLine.slice(0, currentCharIndex3)
            return newLines
          })
          setCurrentCharIndex3(prev => prev + 1)
        }, typingSpeed)
        return () => clearTimeout(timer)
      } else {
        const lineDelay = setTimeout(() => {
          setCurrentLineIndex3(prev => prev + 1)
          setCurrentCharIndex3(0)
        }, 140)
        return () => clearTimeout(lineDelay)
      }
    }, 1000)
    return () => clearTimeout(startDelay)
  }, [currentLineIndex3, currentCharIndex3, liveCodeLines3])

  // Auto-scroll for all cards
  useEffect(() => {
    if (codeContainerRef.current && currentLineIndex1 > 4) {
      const lineHeight = 28
      codeContainerRef.current.scrollTo({ top: (currentLineIndex1 - 4) * lineHeight, behavior: 'smooth' })
    }
  }, [currentLineIndex1])

  useEffect(() => {
    if (codeContainerRef2.current && currentLineIndex2 > 4) {
      const lineHeight = 28
      codeContainerRef2.current.scrollTo({ top: (currentLineIndex2 - 4) * lineHeight, behavior: 'smooth' })
    }
  }, [currentLineIndex2])

  useEffect(() => {
    if (codeContainerRef3.current && currentLineIndex3 > 4) {
      const lineHeight = 28
      codeContainerRef3.current.scrollTo({ top: (currentLineIndex3 - 4) * lineHeight, behavior: 'smooth' })
    }
  }, [currentLineIndex3])

  const cardCount = 3

  // Carousel slides content
  const carouselSlides = [
    {
      type: 'headline' as const,
      title: ['We Engineer the Data', 'Infrastructure That Powers', 'Tomorrow\u2019s Enterprises'],
      highlight: 'Tomorrow\u2019s',
      quote: '',
      name: '',
      role: '',
      image: '',
      video: '',
    },
    {
      type: 'testimonial' as const,
      title: [] as string[],
      highlight: '',
      quote: 'They transformed our entire data architecture in months, not years. The ROI has been extraordinary.',
      name: 'Sarah Chen',
      role: 'CTO, Fortune 500 Healthcare',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop',
      video: '',
    },
    {
      type: 'ceo' as const,
      title: [] as string[],
      highlight: '',
      quote: 'We don\u2019t just build systems. We build the foundation for your next decade of growth.',
      name: 'Michael Torres',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&auto=format&fit=crop',
      video: '',
    },
    {
      type: 'video' as const,
      title: [] as string[],
      highlight: '',
      quote: '',
      name: '',
      role: '',
      image: '',
      video: 'https://www.youtube.com/embed/VCPGMjCW0is?autoplay=1&mute=1&loop=1&playlist=VCPGMjCW0is&controls=0&showinfo=0&rel=0&modestbranding=1',
    },
  ]

  // Restart video when visiting the video slide
  useEffect(() => {
    if (currentSlide === 3) {
      setVideoKey(prev => prev + 1)
    }
  }, [currentSlide])

  // Auto-rotate carousel - longer duration for video slide
  useEffect(() => {
    if (isHoveringCarousel) return

    // Check if current slide is video type (index 3)
    const isVideoSlide = currentSlide === 3
    const duration = isVideoSlide ? 45000 : 5500 // 45 seconds for video, 5.5s for others

    const timeout = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    }, duration)

    return () => clearTimeout(timeout)
  }, [isHoveringCarousel, carouselSlides.length, currentSlide])

  const getPreTypedLines = (index: number) => {
    if (index === 0) return preTypedLines1
    if (index === 1) return preTypedLines2
    return preTypedLines3
  }

  const getLiveCodeLines = (index: number) => {
    if (index === 0) return liveCodeLines1
    if (index === 1) return liveCodeLines2
    return liveCodeLines3
  }

  const getTypedLines = (index: number) => {
    if (index === 0) return typedLines1
    if (index === 1) return typedLines2
    return typedLines3
  }

  const getCurrentLineIndex = (index: number) => {
    if (index === 0) return currentLineIndex1
    if (index === 1) return currentLineIndex2
    return currentLineIndex3
  }

  const getCodeRef = (index: number) => {
    if (index === 0) return codeContainerRef
    if (index === 1) return codeContainerRef2
    return codeContainerRef3
  }

  const getLineClassName = (line: string) => {
    if (line.includes('import') || line.includes('export') || line.includes('async') || line.includes('return') || line.includes('class') || line.includes('private') || line.includes('constructor') || line.includes('spec') || line.includes('SELECT') || line.includes('FROM') || line.includes('JOIN') || line.includes('WHERE') || line.includes('ORDER') || line.includes('GROUP') || line.includes('apiVersion') || line.includes('kind') || line.includes('WITH')) {
      return 'text-teal-400'
    }
    if (line.includes('from') || line.includes('new') || line.includes('await') || line.includes('replicas') || line.includes('LIMIT') || line.includes('metadata') || line.includes('AS')) {
      return 'text-purple-400'
    }
    if (line.includes(':') && !line.includes('//')) {
      return 'text-navy-200'
    }
    return 'text-navy-300'
  }

  return (
    <section
      ref={heroRef}
      className="relative overflow-x-clip bg-navy-950"
    >
      {/* Background dot pattern like Insights section */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #5dc9c9 1px, transparent 0)`,
              backgroundSize: '48px 48px',
            }}
          />
        </div>
      </div>

      {/* Ambient Gradient - Teal tinted */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.08] blur-[200px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #5dc9c9 0%, transparent 70%)',
          top: '-20%',
          left: '10%',
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
          transition: 'transform 1s ease-out',
        }}
      />

      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[150px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #5dc9c9 0%, transparent 70%)',
          bottom: '-10%',
          right: '0%',
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          transition: 'transform 1s ease-out',
        }}
      />

      {/* Subtle teal glow on right for content */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[150px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #5dc9c9 0%, transparent 60%)',
          top: '30%',
          right: '15%',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        <div className="section-container">
          <div className="flex items-center pt-28 pb-8 relative">

            {/* Stacked Code Editor Cards - LEFT side, fading toward right */}
            <div
              className={`absolute inset-0 hidden lg:block transition-all duration-1000 delay-500 z-0 overflow-visible ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
              <div
                className="absolute left-[20px] top-[20%]"
                style={{
                  perspective: '2000px',
                  perspectiveOrigin: '100% 50%',
                  transformStyle: 'preserve-3d',
                }}
              >
                {Array.from({ length: cardCount }).map((_, index) => {
                  const preTyped = getPreTypedLines(index)
                  const liveCode = getLiveCodeLines(index)
                  const typed = getTypedLines(index)
                  const currentIdx = getCurrentLineIndex(index)
                  const containerRef = getCodeRef(index)
                  const fileName = index === 0 ? 'analytics-engine.ts' : index === 1 ? 'deployment.yaml' : 'analytics.sql'
                  const fileType = index === 0 ? 'TypeScript' : index === 1 ? 'YAML' : 'SQL'

                  // Different shadow intensity for each card - front card has strongest shadow
                  const cardShadow = index === 0
                    ? '40px 60px 120px -10px rgba(0, 0, 0, 0.8), 20px 30px 60px -5px rgba(0, 0, 0, 0.5), 0 0 80px -10px rgba(93, 201, 201, 0.25), inset 0 1px 0 rgba(93, 201, 201, 0.3), inset 1px 0 0 rgba(93, 201, 201, 0.2), inset 0 -1px 0 rgba(93, 201, 201, 0.1)'
                    : index === 1
                      ? '30px 50px 100px -15px rgba(0, 0, 0, 0.7), 15px 25px 50px -5px rgba(0, 0, 0, 0.4), 0 0 60px -10px rgba(93, 201, 201, 0.18), inset 0 1px 0 rgba(93, 201, 201, 0.25), inset 1px 0 0 rgba(93, 201, 201, 0.15)'
                      : '20px 40px 80px -20px rgba(0, 0, 0, 0.6), 0 0 40px -10px rgba(93, 201, 201, 0.12), inset 0 1px 0 rgba(93, 201, 201, 0.2)'

                  return (
                    <div
                      key={index}
                      className="absolute"
                      style={{
                        width: '1100px',
                        left: `${35 + index * -70}px`,
                        top: `${60 + index * -70}px`,
                        transform: `rotateY(35deg) rotateX(6deg) rotateZ(-2deg) translateZ(${-index * 70}px)`,
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'left top',
                        zIndex: 10 - index,
                      }}
                    >
                      <div
                        className="rounded-3xl overflow-hidden"
                        style={{
                          background: index === 0
                            ? 'linear-gradient(145deg, rgba(38, 66, 105, 0.98) 0%, rgba(28, 50, 82, 0.99) 100%)'
                            : index === 1
                              ? 'linear-gradient(145deg, rgba(33, 58, 95, 0.98) 0%, rgba(24, 44, 72, 0.99) 100%)'
                              : 'linear-gradient(145deg, rgba(28, 52, 85, 0.98) 0%, rgba(20, 38, 62, 0.99) 100%)',
                          boxShadow: cardShadow,
                          border: index === 0 ? '1px solid rgba(93, 201, 201, 0.4)' : index === 1 ? '1px solid rgba(93, 201, 201, 0.3)' : '1px solid rgba(93, 201, 201, 0.22)',
                          maskImage: 'linear-gradient(to right, black 0%, black 50%, transparent 85%), linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
                          maskComposite: 'intersect',
                          WebkitMaskImage: 'linear-gradient(to right, black 0%, black 50%, transparent 85%), linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
                          WebkitMaskComposite: 'source-in',
                        }}
                      >
                        <div className="flex items-center justify-between px-10 py-6 border-b border-teal-500/10">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full bg-red-400/60" />
                            <div className="w-4 h-4 rounded-full bg-yellow-400/60" />
                            <div className="w-4 h-4 rounded-full bg-teal-400/60" />
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-white/90 text-lg font-mono">{fileName}</span>
                            <span className="text-teal-400/80 text-sm px-3 py-1.5 rounded bg-navy-800/70 border border-teal-500/20">
                              {fileType}
                            </span>
                            <span className="flex items-center gap-1.5 text-teal-400 text-xs">
                              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                              Live
                            </span>
                          </div>
                          <div className="w-24" />
                        </div>

                        <div
                          ref={containerRef}
                          className="flex font-mono text-lg leading-7 h-[450px] overflow-hidden"
                        >
                          {/* Line numbers column */}
                          <div className="py-8 pl-6 pr-4 select-none">
                            {preTyped.map((_, lineIndex) => (
                              <div key={`pre-num-${lineIndex}`} className={`text-right w-8 ${index === 0 ? 'text-teal-500/40' : 'text-teal-500/30'}`}>
                                {lineIndex + 1}
                              </div>
                            ))}
                            {liveCode.map((_, lineIndex) => {
                              if (lineIndex > currentIdx + 6) return null
                              const isCurrentLine = lineIndex === currentIdx
                              return (
                                <div
                                  key={`live-num-${lineIndex}`}
                                  className={`text-right w-8 ${isCurrentLine ? 'text-teal-400' : (index === 0 ? 'text-teal-500/40' : 'text-teal-500/30')}`}
                                >
                                  {preTyped.length + lineIndex + 1}
                                </div>
                              )
                            })}
                          </div>

                          {/* Code content */}
                          <div className="py-8 px-6 flex-1">
                            <pre className="text-slate-300">
                              <code>
                                {preTyped.map((line, lineIndex) => (
                                  <div key={`pre-${lineIndex}`}>
                                    <span className={getLineClassName(line)}>{line || ' '}</span>
                                  </div>
                                ))}
                                {liveCode.map((line, lineIndex) => {
                                  const typedLine = typed[lineIndex] ?? ''
                                  const isCurrentLine = lineIndex === currentIdx
                                  const isTypedLine = lineIndex < currentIdx

                                  if (lineIndex > currentIdx + 6) return null

                                  return (
                                    <div key={`live-${lineIndex}`}>
                                      <span className={getLineClassName(line)}>
                                        {isTypedLine ? line : typedLine}
                                        {isCurrentLine && (
                                          <span className="inline-block w-2 h-5 bg-teal-400 ml-0.5 animate-pulse" />
                                        )}
                                      </span>
                                    </div>
                                  )
                                })}
                              </code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Content Section - Right aligned */}
            <div className="max-w-2xl relative z-20 ml-auto text-right overflow-visible">
              <div
                className={`flex items-center justify-end gap-4 mb-10 transition-all duration-700 relative z-30 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-navy-700/50 border border-teal-500/30 relative z-30">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-teal-400 text-xs font-medium tracking-wider uppercase">
                    Enterprise Solutions
                  </span>
                </div>
              </div>

              {/* 3D Carousel */}
              <div
                className={`relative h-[280px] overflow-visible transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                onMouseEnter={() => setIsHoveringCarousel(true)}
                onMouseLeave={() => setIsHoveringCarousel(false)}
                style={{ perspective: '800px', perspectiveOrigin: '70% 50%' }}
              >
                {carouselSlides.map((slide, index) => {
                  const isActive = index === currentSlide
                  const isPrev = index === (currentSlide - 1 + carouselSlides.length) % carouselSlides.length
                  const isNext = index === (currentSlide + 1) % carouselSlides.length

                  return (
                    <div
                      key={index}
                      className="absolute inset-0 flex items-center justify-end overflow-visible"
                      style={{
                        transform: isActive
                          ? 'translateZ(0) translateX(0) translateY(0) rotateX(0deg) rotateY(0deg) scale(1)'
                          : isPrev
                            ? 'translateZ(200px) translateX(150px) translateY(100px) rotateX(-12deg) rotateY(35deg) scale(1.08)'
                            : isNext
                              ? 'translateZ(-300px) translateX(-60px) translateY(-40px) rotateX(8deg) rotateY(-25deg) scale(0.85)'
                              : 'translateZ(-500px) translateX(0) translateY(0) rotateX(0deg) rotateY(0deg) scale(0.7)',
                        opacity: isActive ? 1 : 0,
                        pointerEvents: isActive ? 'auto' : 'none',
                        transformStyle: 'preserve-3d',
                        transition: 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {slide.type === 'headline' ? (
                        <h1 className="text-right">
                          {slide.title.map((line, i) => (
                            <span
                              key={i}
                              className="block text-[clamp(1.75rem,4.5vw,3.25rem)] font-display font-semibold leading-[1.12] tracking-[-0.02em] mt-1.5 first:mt-0"
                            >
                              {slide.highlight && line.includes(slide.highlight) ? (
                                <>
                                  <span className="text-slate-500">
                                    {line.split(slide.highlight)[0]}
                                  </span>
                                  <span className="text-white">{slide.highlight}</span>
                                  <span className="text-slate-500">
                                    {line.split(slide.highlight)[1]}
                                  </span>
                                </>
                              ) : (
                                <span className="text-white">{line}</span>
                              )}
                            </span>
                          ))}
                        </h1>
                      ) : slide.type === 'video' ? (
                        <div
                          className="absolute flex items-center justify-center overflow-visible"
                          style={{
                            left: '-80%',
                            right: '-20%',
                            top: '-50%',
                            bottom: '-50%',
                            width: 'auto',
                            height: 'auto',
                          }}
                        >
                          {/* Outer glow/shadow for depth */}
                          <div
                            className="absolute inset-0"
                            style={{
                              background: 'radial-gradient(ellipse 60% 50% at 60% 50%, rgba(93, 201, 201, 0.06) 0%, transparent 70%)',
                              filter: 'blur(60px)',
                            }}
                          />
                          <div
                            className="absolute inset-0 overflow-visible"
                            style={{
                              maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 15%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.7) 45%, black 60%, black 100%), linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 10%, black 25%, black 100%)',
                              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 15%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.7) 45%, black 60%, black 100%), linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 10%, black 25%, black 100%)',
                              maskComposite: 'intersect',
                              WebkitMaskComposite: 'source-in',
                              opacity: 0.75,
                            }}
                          >
                            <iframe
                              key={videoKey}
                              src={slide.video}
                              className="w-full h-full"
                              style={{
                                filter: 'brightness(0.6) contrast(1.1) saturate(0.8)',
                                border: 'none',
                                transform: 'scale(1.2)',
                                pointerEvents: 'none',
                              }}
                              allow="autoplay; encrypted-media"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-6 justify-end">
                          <div className="text-right max-w-lg">
                            <svg
                              className={`w-8 h-8 ml-auto mb-4 ${slide.type === 'ceo' ? 'text-teal-400/60' : 'text-teal-500/40'}`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <p className={`text-[clamp(1.25rem,3vw,1.75rem)] font-display leading-snug mb-6 ${slide.type === 'ceo' ? 'text-white italic' : 'text-white'}`}>
                              {slide.quote}
                            </p>
                            <div className="flex items-center gap-4 justify-end">
                              <div>
                                <div className="text-white font-medium">{slide.name}</div>
                                <div className={`text-sm ${slide.type === 'ceo' ? 'text-teal-400' : 'text-teal-400/80'}`}>{slide.role}</div>
                              </div>
                              <div className={`w-14 h-14 rounded-full overflow-hidden border-2 ${slide.type === 'ceo' ? 'border-teal-400/50' : 'border-teal-500/30'}`}>
                                <img
                                  src={slide.image}
                                  alt={slide.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}

                {/* Carousel indicators with progress */}
                <div className="absolute -bottom-10 right-0 flex items-center gap-3">
                  {carouselSlides.map((slide, index) => {
                    const isActive = index === currentSlide
                    const duration = index === 3 ? 45 : 5.5 // video slide is longer

                    return (
                      <button
                        key={`indicator-${index}-${currentSlide === index ? 'active' : 'inactive'}`}
                        onClick={() => setCurrentSlide(index)}
                        className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 ${
                          isActive ? 'w-14' : 'w-4'
                        }`}
                        style={{
                          backgroundColor: isActive ? 'rgba(30, 41, 59, 0.8)' : 'rgba(148, 163, 184, 0.5)',
                        }}
                      >
                        {isActive && !isHoveringCarousel && (
                          <div
                            key={`progress-${currentSlide}`}
                            className="absolute inset-0 bg-teal-400 rounded-full origin-left"
                            style={{
                              animation: `progressFill ${duration}s linear forwards`,
                            }}
                          />
                        )}
                        {isActive && isHoveringCarousel && (
                          <div className="absolute inset-0 bg-teal-400/60 rounded-full" />
                        )}
                      </button>
                    )
                  })}
                </div>

                <style jsx>{`
                  @keyframes progressFill {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                  }
                `}</style>
              </div>

              <p
                className={`mt-16 text-lg text-slate-300 leading-relaxed max-w-xl ml-auto text-right transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                From real-time analytics to distributed systems architecture,
                we deliver end-to-end IT solutions that transform how
                organizations harness their data at scale.
              </p>

              <div
                className={`mt-10 flex flex-wrap items-center justify-end gap-4 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                <Link
                  href="#contact"
                  className="group relative inline-flex items-center gap-3 px-7 py-3.5 overflow-hidden rounded-lg bg-teal-500 text-navy-950 font-medium text-sm transition-all duration-300 hover:bg-teal-400"
                >
                  <span>Get Started</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                <Link
                  href="#capabilities"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-lg border border-teal-500/30 text-teal-400 hover:text-teal-300 hover:border-teal-500/50 hover:bg-teal-500/5 font-medium text-sm transition-all duration-300"
                >
                  <span>View Solutions</span>
                </Link>
              </div>

              <div
                className={`mt-12 flex items-center justify-end gap-12 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                {[
                  { value: '500+', label: 'Enterprises' },
                  { value: '99.99%', label: 'Uptime' },
                  { value: '50PB+', label: 'Data Processed' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-semibold text-white">{stat.value}</div>
                    <div className="text-teal-500/60 text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section - Trust Badges */}
          <div
            className={`mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="flex items-center gap-6">
              <span className="text-teal-500/60 text-xs uppercase tracking-wider">Compliant</span>
              <div className="flex items-center gap-6">
                {['SOC2 Type II', 'HIPAA', 'GDPR', 'ISO 27001'].map((cert, i) => (
                  <span
                    key={i}
                    className="text-slate-400 text-xs font-medium hover:text-teal-400 transition-colors cursor-default"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Bottom Edge Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="w-px h-12 bg-gradient-to-b from-teal-400/60 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-6 bg-teal-400 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
