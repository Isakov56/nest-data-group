'use client'

import dynamic from 'next/dynamic'
import { useHeroVariant } from '../../hooks/useHeroVariant'

// Lazy load hero variants to reduce initial bundle size
const HeroClassic = dynamic(() => import('./HeroClassic'), {
  loading: () => <HeroSkeleton />
})
const HeroMinimal = dynamic(() => import('./HeroMinimal'), {
  loading: () => <HeroSkeleton />
})
const HeroEnterprise = dynamic(() => import('./HeroEnterprise'), {
  loading: () => <HeroSkeleton />
})

// Minimal skeleton while loading hero variant
function HeroSkeleton() {
  return (
    <section className="relative min-h-[600px] bg-navy-950 animate-pulse">
      <div className="section-container pt-28 pb-8">
        <div className="max-w-2xl ml-auto">
          <div className="h-8 w-40 bg-navy-800 rounded mb-10 ml-auto" />
          <div className="h-16 w-full bg-navy-800 rounded mb-4" />
          <div className="h-16 w-3/4 bg-navy-800 rounded mb-8 ml-auto" />
          <div className="h-6 w-full bg-navy-800/50 rounded mb-2" />
          <div className="h-6 w-2/3 bg-navy-800/50 rounded ml-auto" />
        </div>
      </div>
    </section>
  )
}

export default function Hero() {
  const { variant } = useHeroVariant()

  if (variant === 'minimal') {
    return <HeroMinimal />
  }

  if (variant === 'enterprise') {
    return <HeroEnterprise />
  }

  return <HeroClassic />
}
