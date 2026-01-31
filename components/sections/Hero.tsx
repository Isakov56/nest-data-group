'use client'

import { useHeroVariant } from '../../hooks/useHeroVariant'
import HeroClassic from './HeroClassic'
import HeroMinimal from './HeroMinimal'
import HeroEnterprise from './HeroEnterprise'

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
