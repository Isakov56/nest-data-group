'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function HeroEnterprise() {
  const t = useTranslations('hero')
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
  const elapsedTimeRef = useRef<number>(0)
  const startTimeRef = useRef<number>(Date.now())

  // Touch swipe state for carousel
  const touchStartRef = useRef<number>(0)
  const touchEndRef = useRef<number>(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

    let rafId: number | null = null
    let lastX = 0
    let lastY = 0

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      lastX = (e.clientX - rect.left) / rect.width - 0.5
      lastY = (e.clientY - rect.top) / rect.height - 0.5

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          setMousePosition({ x: lastX, y: lastY })
          rafId = null
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
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
      title: [t('headline')],
      highlight: t('highlightWord'),
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
      quote: t('testimonial1.quote'),
      name: t('testimonial1.name'),
      role: t('testimonial1.role'),
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop',
      video: '',
    },
    {
      type: 'ceo' as const,
      title: [] as string[],
      highlight: '',
      quote: t('testimonial2.quote'),
      name: t('testimonial2.name'),
      role: t('testimonial2.role'),
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

  // Video slide: fixed 16 second timer (no pause/resume)
  useEffect(() => {
    if (currentSlide !== 3) return

    const timeout = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    }, 16000)

    return () => clearTimeout(timeout)
  }, [currentSlide, carouselSlides.length])

  // Other slides: pause/resume behavior
  useEffect(() => {
    if (currentSlide === 3) return // Skip for video slide

    const totalDuration = 5500

    if (isHoveringCarousel) {
      elapsedTimeRef.current = elapsedTimeRef.current + (Date.now() - startTimeRef.current)
      return
    }

    startTimeRef.current = Date.now()
    const remainingTime = Math.max(0, totalDuration - elapsedTimeRef.current)

    const timeout = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    }, remainingTime)

    return () => clearTimeout(timeout)
  }, [isHoveringCarousel, carouselSlides.length, currentSlide])

  // Reset elapsed time when slide changes
  useEffect(() => {
    elapsedTimeRef.current = 0
    startTimeRef.current = Date.now()
  }, [currentSlide])

  // Touch swipe handlers for carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    const swipeThreshold = 50
    const diff = touchStartRef.current - touchEndRef.current

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - go to next slide
        setSwipeDirection('left')
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
      } else {
        // Swiped right - go to previous slide
        setSwipeDirection('right')
        setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
      }
    }
    touchStartRef.current = 0
    touchEndRef.current = 0
  }

  // Reset swipe direction for auto-advance (treat as left swipe)
  useEffect(() => {
    if (!isMobile) {
      setSwipeDirection(null)
    }
  }, [currentSlide, isMobile])

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

  const highlightCode = (line: string) => {
    // Token patterns and their colors
    const patterns: [RegExp, string][] = [
      // Keywords (blue)
      [/\b(import|export|class|const|let|var|function|interface|type|extends|implements)\b/g, 'text-sky-400'],
      // Control flow (pink/magenta)
      [/\b(async|await|return|if|else|for|while|try|catch|throw|new)\b/g, 'text-pink-400'],
      // Access modifiers (purple)
      [/\b(private|public|protected|static)\b/g, 'text-purple-400'],
      // Built-in/this (red)
      [/\b(this|super|true|false|null|undefined)\b/g, 'text-red-400'],
      // Types (green) - capitalized words that look like types
      [/\b([A-Z][a-zA-Z]*(?:Config|Stream|Pipeline|Processor|Engine|Data)?)\b/g, 'text-emerald-400'],
      // Function/method names (yellow) - word followed by (
      [/\b([a-z][a-zA-Z]*)\s*\(/g, 'text-yellow-300'],
      // Strings (orange)
      [/(['"`][^'"`]*['"`])/g, 'text-orange-300'],
      // Numbers (light blue)
      [/\b(\d+)\b/g, 'text-cyan-300'],
      // SQL keywords (cyan)
      [/\b(SELECT|FROM|JOIN|WHERE|ORDER|GROUP|BY|WITH|LIMIT|AS|HAVING|ON|AND|OR|IN|COUNT|DESC|ASC)\b/g, 'text-cyan-400'],
      // YAML keys (orange)
      [/^(\s*)([a-zA-Z_-]+)(:)/gm, 'text-orange-400'],
    ]

    let result = line
    const tokens: { start: number; end: number; color: string }[] = []

    patterns.forEach(([pattern, color]) => {
      let match
      const regex = new RegExp(pattern.source, pattern.flags)
      while ((match = regex.exec(line)) !== null) {
        tokens.push({ start: match.index, end: match.index + match[0].length, color })
      }
    })

    // If no tokens found, return plain text
    if (tokens.length === 0) {
      return <span className="text-slate-300">{line || ' '}</span>
    }

    // Sort by start position and remove overlaps (keep first match)
    tokens.sort((a, b) => a.start - b.start)
    const filtered: typeof tokens = []
    tokens.forEach(t => {
      if (filtered.length === 0 || t.start >= filtered[filtered.length - 1].end) {
        filtered.push(t)
      }
    })

    // Build JSX with colored spans
    const parts: JSX.Element[] = []
    let lastEnd = 0

    filtered.forEach((token, i) => {
      if (token.start > lastEnd) {
        parts.push(<span key={`plain-${i}`} className="text-slate-300">{line.slice(lastEnd, token.start)}</span>)
      }
      parts.push(<span key={`token-${i}`} className={token.color}>{line.slice(token.start, token.end)}</span>)
      lastEnd = token.end
    })

    if (lastEnd < line.length) {
      parts.push(<span key="end" className="text-slate-300">{line.slice(lastEnd)}</span>)
    }

    return <>{parts}</>
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
                            ? 'linear-gradient(145deg, rgba(45, 65, 90, 0.97) 0%, rgba(35, 52, 75, 0.98) 100%)'
                            : index === 1
                              ? 'linear-gradient(145deg, rgba(40, 58, 82, 0.96) 0%, rgba(30, 46, 68, 0.97) 100%)'
                              : 'linear-gradient(145deg, rgba(35, 52, 75, 0.94) 0%, rgba(26, 40, 60, 0.96) 100%)',
                          boxShadow: cardShadow,
                          border: index === 0 ? '1px solid rgba(100, 150, 180, 0.35)' : index === 1 ? '1px solid rgba(100, 150, 180, 0.25)' : '1px solid rgba(100, 150, 180, 0.18)',
                          maskImage: 'linear-gradient(to right, black 0%, black 50%, transparent 85%), linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
                          maskComposite: 'intersect',
                          WebkitMaskImage: 'linear-gradient(to right, black 0%, black 50%, transparent 85%), linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
                          WebkitMaskComposite: 'source-in',
                        }}
                      >
                        <div className="flex items-center justify-between px-10 py-6 border-b border-slate-400/20">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full bg-red-400/70" />
                            <div className="w-4 h-4 rounded-full bg-yellow-400/70" />
                            <div className="w-4 h-4 rounded-full bg-teal-400/70" />
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-slate-200 text-lg font-mono">{fileName}</span>
                            <span className="text-teal-300 text-sm px-3 py-1.5 rounded bg-teal-900/30 border border-teal-500/30">
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
                              <div key={`pre-num-${lineIndex}`} className={`text-right w-8 ${index === 0 ? 'text-slate-400/60' : 'text-slate-400/50'}`}>
                                {lineIndex + 1}
                              </div>
                            ))}
                            {liveCode.map((_, lineIndex) => {
                              if (lineIndex > currentIdx + 6) return null
                              const isCurrentLine = lineIndex === currentIdx
                              return (
                                <div
                                  key={`live-num-${lineIndex}`}
                                  className={`text-right w-8 ${isCurrentLine ? 'text-teal-400' : (index === 0 ? 'text-slate-400/60' : 'text-slate-400/50')}`}
                                >
                                  {preTyped.length + lineIndex + 1}
                                </div>
                              )
                            })}
                          </div>

                          {/* Code content */}
                          <div className="py-8 px-6 flex-1">
                            <pre>
                              <code>
                                {preTyped.map((line, lineIndex) => (
                                  <div key={`pre-${lineIndex}`}>
                                    {highlightCode(line)}
                                  </div>
                                ))}
                                {liveCode.map((line, lineIndex) => {
                                  const typedLine = typed[lineIndex] ?? ''
                                  const isCurrentLine = lineIndex === currentIdx
                                  const isTypedLine = lineIndex < currentIdx

                                  if (lineIndex > currentIdx + 6) return null

                                  return (
                                    <div key={`live-${lineIndex}`}>
                                      {highlightCode(isTypedLine ? line : typedLine)}
                                      {isCurrentLine && (
                                        <span className="inline-block w-2 h-5 bg-teal-400 ml-0.5 animate-pulse" />
                                      )}
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

            {/* Content Section - Right aligned on desktop, centered on mobile */}
            <div className="max-w-2xl relative z-20 lg:ml-auto text-center lg:text-right overflow-visible mx-auto lg:mx-0">
              <div
                className={`flex items-center justify-center lg:justify-end gap-4 mb-10 transition-all duration-700 relative z-30 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-navy-700/50 border border-teal-500/30 relative z-30">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-teal-400 text-xs font-medium tracking-wider uppercase">
                    {t('badge')}
                  </span>
                </div>
              </div>

              {/* 3D Carousel */}
              <div
                ref={carouselRef}
                className={`relative h-[280px] overflow-visible transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                onMouseEnter={() => setIsHoveringCarousel(true)}
                onMouseLeave={() => setIsHoveringCarousel(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ perspective: '800px', perspectiveOrigin: '70% 50%' }}
              >
                {carouselSlides.map((slide, index) => {
                  const isActive = index === currentSlide
                  const isPrev = index === (currentSlide - 1 + carouselSlides.length) % carouselSlides.length
                  const isNext = index === (currentSlide + 1) % carouselSlides.length

                  // 3D transforms - on mobile, swap prev/next positions for natural swipe feel
                  const getTransform = () => {
                    if (isActive) {
                      return 'translateZ(0) translateX(0) translateY(0) rotateX(0deg) rotateY(0deg) scale(1)'
                    }

                    // Position for "prev" slide (front-right, scaled up)
                    const prevTransform = 'translateZ(200px) translateX(150px) translateY(100px) rotateX(-12deg) rotateY(35deg) scale(1.08)'
                    // Position for "next" slide (back-left, scaled down)
                    const nextTransform = 'translateZ(-300px) translateX(-60px) translateY(-40px) rotateX(8deg) rotateY(-25deg) scale(0.85)'
                    const hiddenTransform = 'translateZ(-500px) translateX(0) translateY(0) rotateX(0deg) rotateY(0deg) scale(0.7)'

                    if (isMobile) {
                      // On mobile: swap transforms so swipe left feels like content moves left
                      // isPrev gets the "next" position (back), isNext gets the "prev" position (front)
                      if (isPrev) return nextTransform
                      if (isNext) return prevTransform
                    } else {
                      // Desktop: original behavior
                      if (isPrev) return prevTransform
                      if (isNext) return nextTransform
                    }

                    return hiddenTransform
                  }

                  return (
                    <div
                      key={index}
                      className="absolute inset-0 flex items-center justify-center lg:justify-end overflow-visible"
                      style={{
                        transform: getTransform(),
                        opacity: isActive ? 1 : 0,
                        pointerEvents: isActive ? 'auto' : 'none',
                        transformStyle: 'preserve-3d',
                        transition: 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {slide.type === 'headline' ? (
                        <h1 className="text-center lg:text-right -mt-8 lg:-mt-0">
                          {slide.title.map((line, i) => (
                            <span
                              key={i}
                              className="block text-[clamp(2.25rem,4.5vw,3.25rem)] font-display font-semibold leading-[1.12] tracking-[-0.02em] mt-1.5 first:mt-0"
                            >
                              {slide.highlight && line.includes(slide.highlight) ? (
                                <>
                                  <span className="text-white">
                                    {line.split(slide.highlight)[0]}
                                  </span>
                                  <span className="text-teal-400">{slide.highlight}</span>
                                  <span className="text-white">
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
                          className="absolute flex items-start justify-center overflow-visible"
                          style={{
                            left: isMobile ? '-50%' : '-80%',
                            right: isMobile ? '-50%' : 'calc(-50vw + 50%)',
                            top: isMobile ? '-60%' : '-55%',
                            bottom: isMobile ? '-80%' : '-50%',
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
                              maskImage: isMobile
                                ? 'linear-gradient(to bottom, transparent 0%, black 10%, black 60%, transparent 100%)'
                                : 'linear-gradient(to right, transparent 0%, transparent 3%, rgba(0,0,0,0.02) 10%, rgba(0,0,0,0.06) 18%, rgba(0,0,0,0.12) 26%, rgba(0,0,0,0.22) 34%, rgba(0,0,0,0.38) 42%, rgba(0,0,0,0.58) 50%, rgba(0,0,0,0.78) 58%, black 68%, black 100%), linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 10%, black 25%, black 100%)',
                              WebkitMaskImage: isMobile
                                ? 'linear-gradient(to bottom, transparent 0%, black 10%, black 60%, transparent 100%)'
                                : 'linear-gradient(to right, transparent 0%, transparent 3%, rgba(0,0,0,0.02) 10%, rgba(0,0,0,0.06) 18%, rgba(0,0,0,0.12) 26%, rgba(0,0,0,0.22) 34%, rgba(0,0,0,0.38) 42%, rgba(0,0,0,0.58) 50%, rgba(0,0,0,0.78) 58%, black 68%, black 100%), linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 10%, black 25%, black 100%)',
                              maskComposite: isMobile ? 'unset' : 'intersect',
                              WebkitMaskComposite: isMobile ? 'unset' : 'source-in',
                              opacity: 0.85,
                            }}
                          >
                            <iframe
                              key={videoKey}
                              src={slide.video}
                              className="w-full h-full"
                              style={{
                                filter: 'brightness(0.6) contrast(1.1) saturate(0.8)',
                                border: 'none',
                                transform: isMobile ? 'scale(2.5) translate(-10%, -18%)' : 'scale(1.2)',
                                transformOrigin: 'center top',
                                pointerEvents: 'none',
                              }}
                              allow="autoplay; encrypted-media"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-8 justify-center lg:justify-end -mt-8">
                          <div className="text-center lg:text-right max-w-xl px-4 lg:px-0">
                            <svg
                              className={`w-10 h-10 mx-auto lg:ml-auto lg:mr-0 mb-5 ${slide.type === 'ceo' ? 'text-teal-400/60' : 'text-teal-500/40'}`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <p className={`text-[clamp(1.5rem,3.5vw,2.25rem)] font-display leading-snug mb-8 ${slide.type === 'ceo' ? 'text-white italic' : 'text-white'}`}>
                              {slide.quote}
                            </p>
                            <div className="flex items-center gap-5 justify-center lg:justify-end">
                              <div>
                                <div className="text-white font-semibold text-lg">{slide.name}</div>
                                <div className={`text-base ${slide.type === 'ceo' ? 'text-teal-400' : 'text-teal-400/80'}`}>{slide.role}</div>
                              </div>
                              <div className={`w-16 h-16 rounded-full overflow-hidden border-2 relative ${slide.type === 'ceo' ? 'border-teal-400/50' : 'border-teal-500/30'}`}>
                                <Image
                                  src={slide.image}
                                  alt={slide.name}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}

                {/* Elegant Node Indicators */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 lg:-bottom-12 lg:left-auto lg:right-0 lg:translate-x-0 flex flex-col items-center gap-3 lg:flex-row lg:gap-1">
                  {/* Mobile Swipe Indicator - Animated horizontal line */}
                  <div className="order-2 lg:hidden">
                    <div className="w-10 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-3 h-full bg-teal-400/60 animate-[swipeHint_2s_ease-in-out_infinite]" />
                    </div>
                  </div>

                  {/* Indicators row */}
                  <div className="order-1 flex items-center gap-1 relative">
                  {/* Connecting line behind */}
                  <div
                    className="absolute top-1/2 left-3 right-3 h-[1px] -translate-y-1/2 rounded-full"
                    style={{ background: 'rgba(51, 65, 85, 0.5)' }}
                  />

                  {carouselSlides.map((slide, index) => {
                    const isActive = index === currentSlide
                    const duration = index === 3 ? 16 : 5.5
                    const circumference = 2 * Math.PI * 11

                    return (
                      <button
                        key={`indicator-${index}`}
                        onClick={() => setCurrentSlide(index)}
                        className="relative z-10 flex items-center justify-center cursor-pointer group"
                        style={{
                          width: '28px',
                          height: '28px',
                        }}
                      >
                        {/* Outer ring - progress for active */}
                        <div
                          className="absolute inset-0 rounded-full transition-all duration-500"
                          style={{
                            background: isActive ? 'rgba(71, 85, 105, 0.2)' : 'transparent',
                            transform: isActive ? 'scale(1)' : 'scale(0.6)',
                            opacity: isActive ? 1 : 0,
                          }}
                        />

                        {/* SVG Progress Ring */}
                        {isActive && (
                          <svg
                            className="absolute inset-0 w-full h-full"
                            viewBox="0 0 28 28"
                            style={{ transform: 'rotate(-90deg)' }}
                          >
                            <circle
                              cx="14"
                              cy="14"
                              r="11"
                              fill="none"
                              stroke="rgba(71, 85, 105, 0.4)"
                              strokeWidth="2"
                            />
                            <circle
                              key={`ring-${currentSlide}`}
                              cx="14"
                              cy="14"
                              r="11"
                              fill="none"
                              stroke="rgba(94, 234, 212, 0.7)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeDasharray={circumference}
                              strokeDashoffset={circumference}
                              style={{
                                animation: `ringProgress ${duration}s linear forwards`,
                                animationPlayState: (isHoveringCarousel && index !== 3) ? 'paused' : 'running',
                              }}
                            />
                          </svg>
                        )}

                        {/* Center dot */}
                        <div
                          className="rounded-full transition-all duration-400"
                          style={{
                            width: isActive ? '8px' : '6px',
                            height: isActive ? '8px' : '6px',
                            background: isActive
                              ? 'rgba(94, 234, 212, 0.8)'
                              : 'rgba(100, 116, 139, 0.6)',
                            boxShadow: isActive
                              ? '0 0 8px rgba(94, 234, 212, 0.4)'
                              : 'none',
                          }}
                        />

                        {/* Hover effect for inactive */}
                        {!isActive && (
                          <div
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: 'rgba(71, 85, 105, 0.2)' }}
                          />
                        )}
                      </button>
                    )
                  })}
                  </div>
                </div>

                <style jsx>{`
                  @keyframes progressFill {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                  }
                  @keyframes ringProgress {
                    from { stroke-dashoffset: 69.115; }
                    to { stroke-dashoffset: 0; }
                  }
                  @keyframes swipeHint {
                    0%, 100% { transform: translateX(0); opacity: 0.6; }
                    50% { transform: translateX(32px); opacity: 1; }
                  }
                `}</style>
              </div>

              <p
                className={`mt-14 font-body text-[17px] text-navy-300 leading-relaxed max-w-lg mx-auto lg:ml-auto lg:mr-0 text-center lg:text-right transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                {t('description')}
              </p>

              <div
                className={`mt-8 flex items-center justify-center lg:justify-end gap-3 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                <Link
                  href="#contact"
                  className="group relative inline-flex items-center gap-2 px-5 py-3 md:px-8 md:py-4 overflow-hidden rounded-sm bg-teal-500 text-navy-950 font-body font-semibold text-sm md:text-base transition-all duration-300 hover:bg-teal-400"
                >
                  <span>{t('getStarted')}</span>
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
                  className="group inline-flex items-center gap-2 px-5 py-3 md:px-8 md:py-4 rounded-sm border border-navy-600 text-white hover:text-teal-400 hover:border-teal-500/50 font-body font-medium text-sm md:text-base transition-all duration-300"
                >
                  <span>{t('viewSolutions')}</span>
                </Link>
              </div>

              <div
                className={`mt-10 flex items-center justify-center lg:justify-end divide-x divide-navy-700/50 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                {[
                  { value: '10+', label: t('enterprises') },
                  { value: '99%', label: t('uptime') },
                  { value: '50TB+', label: t('dataProcessed') },
                ].map((stat, i) => (
                  <div key={i} className="group px-4 lg:px-6 first:pl-0 last:pr-0 text-center lg:text-right">
                    <div className="font-display text-2xl font-semibold text-white tracking-tight">{stat.value}</div>
                    <div className="font-body text-sm text-navy-400 group-hover:text-teal-400 transition-colors duration-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section - Trust Badges */}
          <div
            className={`mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="flex items-center gap-3 md:gap-6 flex-wrap justify-start">
              <span className="text-teal-500/60 text-[10px] md:text-xs uppercase tracking-wider">{t('compliant')}</span>
              <div className="flex items-center gap-2 md:gap-4">
                {['SOC2', 'HIPAA', 'GDPR', 'ISO27001'].map((cert, i) => (
                  <span
                    key={i}
                    className="text-slate-400 text-[10px] md:text-xs font-medium hover:text-teal-400 transition-colors cursor-default whitespace-nowrap"
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
