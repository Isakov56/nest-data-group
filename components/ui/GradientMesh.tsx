'use client'

interface GradientMeshProps {
  className?: string
  variant?: 'hero' | 'section' | 'dark'
}

// Lightweight CSS-only gradient mesh - no canvas animation for better performance
export default function GradientMesh({ className = '', variant = 'hero' }: GradientMeshProps) {
  const getGradientClasses = () => {
    switch (variant) {
      case 'dark':
        return (
          <>
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-navy-800/60 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-teal-600/20 rounded-full blur-3xl animate-float-medium" />
            <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-navy-700/40 rounded-full blur-3xl animate-float-fast" />
          </>
        )
      case 'section':
        return (
          <>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-navy-100/80 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-100/60 rounded-full blur-3xl animate-float-medium" />
            <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gray-100/50 rounded-full blur-3xl animate-float-fast" />
          </>
        )
      default: // hero
        return (
          <>
            <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-navy-100/50 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-3xl animate-float-medium" />
            <div className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] bg-gray-200/30 rounded-full blur-3xl animate-float-fast" />
          </>
        )
    }
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {getGradientClasses()}
    </div>
  )
}
