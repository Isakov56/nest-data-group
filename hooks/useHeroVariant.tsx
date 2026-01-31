'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type HeroVariant = 'classic' | 'minimal' | 'enterprise'

interface HeroVariantContextType {
  variant: HeroVariant
  setVariant: (variant: HeroVariant) => void
}

const HeroVariantContext = createContext<HeroVariantContextType | undefined>(undefined)

export function HeroVariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<HeroVariant>('classic')

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('heroVariant') as HeroVariant
    if (saved && (saved === 'classic' || saved === 'minimal' || saved === 'enterprise')) {
      setVariant(saved)
    }
  }, [])

  const handleSetVariant = (newVariant: HeroVariant) => {
    setVariant(newVariant)
    localStorage.setItem('heroVariant', newVariant)
  }

  return (
    <HeroVariantContext.Provider value={{ variant, setVariant: handleSetVariant }}>
      {children}
    </HeroVariantContext.Provider>
  )
}

export function useHeroVariant() {
  const context = useContext(HeroVariantContext)
  if (context === undefined) {
    // Return default values if not within provider
    return {
      variant: 'classic' as HeroVariant,
      setVariant: () => {},
    }
  }
  return context
}
