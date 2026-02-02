import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nest Data Group | Enterprise Data Architecture & IT Solutions',
  description: 'We design the systems that power critical decisions across government, defense, and enterprise. Data architecture, cloud strategy, analytics, and security solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
