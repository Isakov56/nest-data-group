import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Insights from '@/components/sections/Insights'
import CoreCapabilities from '@/components/sections/CoreCapabilities'
import Partners from '@/components/sections/DataArchitecture'
import CaseStudies from '@/components/sections/CaseStudies'
import Team from '@/components/sections/Team'
import Philosophy from '@/components/sections/Philosophy'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CoreCapabilities />
        <Insights />
        <Partners />
        <CaseStudies />
        <Team />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
