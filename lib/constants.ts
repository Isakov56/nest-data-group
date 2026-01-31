// Design tokens and constants for Nest Data Group

export const colors = {
  navy: {
    DEFAULT: '#1e3a5f',
    50: '#f0f4f8',
    100: '#d9e2ec',
    200: '#bcccdc',
    300: '#9fb3c8',
    400: '#829ab1',
    500: '#627d98',
    600: '#486581',
    700: '#334e68',
    800: '#243b53',
    900: '#1e3a5f',
    950: '#102a43',
  },
  teal: {
    DEFAULT: '#4a9b9b',
    50: '#f0fafa',
    100: '#d0f0f0',
    200: '#a8e0e0',
    300: '#7acbcb',
    400: '#4a9b9b',
    500: '#3d8585',
    600: '#326e6e',
    700: '#285858',
    800: '#1f4545',
    900: '#163333',
  },
} as const

export const heroConfig = {
  blockCount: 18,
  blockSize: { min: 0.3, max: 0.8 },
  colors: ['#1e3a5f', '#243b53', '#334e68', '#4a9b9b'],
  driftSpeed: 0.0005,
  assemblyInterval: 8000,
} as const

export const animationConfig = {
  scrollTrigger: {
    start: 'top 80%',
    end: 'top 20%',
    scrub: false,
    once: true,
  },
  tween: {
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.1,
  },
  heroTween: {
    duration: 1.2,
    ease: 'power3.out',
    stagger: 0.15,
  },
} as const

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const sectorIcons = {
  defense: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  finance: 'M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6',
  healthcare: 'M22 12h-4l-3 9L9 3l-3 9H2',
  government: 'M3 21h18M3 10h18M5 6l7-4 7 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3',
} as const

export const capabilities = [
  {
    id: 'data-architecture',
    title: 'Data Architecture',
    description: 'Systems that scale with your mission',
    icon: 'architecture',
  },
  {
    id: 'cloud-strategy',
    title: 'Cloud Strategy',
    description: 'Infrastructure designed for permanence',
    icon: 'cloud',
  },
  {
    id: 'analytics-ai',
    title: 'Analytics & AI',
    description: 'Intelligence embedded, not bolted on',
    icon: 'analytics',
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Protection at the foundation',
    icon: 'security',
  },
] as const

export const caseStudies = [
  {
    id: 'defense',
    sector: 'Defense',
    title: 'Mission-Critical Intelligence',
    description: 'Real-time data fusion across distributed sensor networks enabling faster, more accurate decision-making in complex operational environments.',
  },
  {
    id: 'finance',
    sector: 'Finance',
    title: 'Regulatory Compliance at Scale',
    description: 'Automated compliance monitoring and reporting infrastructure processing millions of transactions while maintaining audit-ready documentation.',
  },
  {
    id: 'healthcare',
    sector: 'Healthcare',
    title: 'Patient Data Interoperability',
    description: 'Unified data platform connecting disparate health systems to improve care coordination and enable advanced analytics for population health.',
  },
] as const
