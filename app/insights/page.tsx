import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

interface Insight {
  id: string
  category: string
  title: string
  description: string
  details: string[]
  icon: JSX.Element
  image: string
  features: string[]
}

const insights: Insight[] = [
  {
    id: 'data-architecture',
    category: 'Architecture',
    title: 'Data Architecture',
    description: 'Systems that scale with your mission. We design resilient data foundations that transform complexity into clarity.',
    details: [
      'Enterprise-grade data modeling and schema design optimized for performance and scalability',
      'Real-time data pipelines processing millions of events per second with sub-millisecond latency',
      'Hybrid cloud architectures that seamlessly bridge on-premises and cloud environments',
      'Data governance frameworks ensuring compliance with GDPR, HIPAA, and federal regulations',
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7c0 1.657-3.582 3-8 3S4 8.657 4 7m16 0c0-1.657-3.582-3-8-3S4 5.343 4 7m16 0v10c0 1.657-3.582 3-8 3s-8-1.343-8-3V7m16 5c0 1.657-3.582 3-8 3s-8-1.343-8-3" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1470&auto=format&fit=crop',
    features: ['Data Modeling', 'ETL Pipelines', 'Data Lakes', 'Data Mesh'],
  },
  {
    id: 'cloud-strategy',
    category: 'Cloud',
    title: 'Cloud Strategy',
    description: 'Infrastructure designed for permanence. Cloud ecosystems with flexibility and reliability your mission demands.',
    details: [
      'Multi-cloud and hybrid cloud strategies tailored to your security and performance requirements',
      'Infrastructure as Code (IaC) enabling reproducible, version-controlled environments',
      'Cost optimization achieving 40-60% reduction in cloud spend without compromising performance',
      'Zero-downtime migration strategies for legacy system modernization',
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1470&auto=format&fit=crop',
    features: ['AWS', 'Azure', 'GCP', 'Kubernetes'],
  },
  {
    id: 'analytics-ai',
    category: 'Intelligence',
    title: 'Analytics & AI',
    description: 'Intelligence embedded, not bolted on. ML and analytics woven into systems, surfacing insights where they matter.',
    details: [
      'Predictive analytics models with 95%+ accuracy for demand forecasting and risk assessment',
      'Natural language processing for automated document analysis and entity extraction',
      'Real-time anomaly detection protecting against fraud and security threats',
      'MLOps infrastructure for continuous model training, deployment, and monitoring',
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
    features: ['Machine Learning', 'Predictive Analytics', 'NLP', 'Computer Vision'],
  },
  {
    id: 'security',
    category: 'Security',
    title: 'Security & Compliance',
    description: 'Protection at the foundation. Zero-trust architectures and defense-in-depth securing data without compromising velocity.',
    details: [
      'Zero-trust security architectures with continuous verification and least-privilege access',
      'End-to-end encryption for data at rest and in transit using AES-256 and TLS 1.3',
      'Compliance automation for FedRAMP, SOC 2, HIPAA, and PCI-DSS requirements',
      'Security operations center (SOC) integration with 24/7 threat monitoring and response',
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
    features: ['Zero Trust', 'Encryption', 'Compliance', 'Threat Detection'],
  },
]

const stats = [
  { value: '99.99%', label: 'System Uptime' },
  { value: '10M+', label: 'Events/Second' },
  { value: '340+', label: 'Systems Integrated' },
  { value: '50ms', label: 'Avg. Latency' },
]

export default function InsightsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
        <section className="relative pt-32 pb-20 bg-navy-900 overflow-visible">
          <div className="absolute inset-0 opacity-[0.25]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #5dc9c9 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* Video Background - Right Side */}
          <div
            className="absolute top-20 right-0 w-[60%] h-[120%] hidden lg:block"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.6) 40%, black 60%), linear-gradient(to bottom, black 0%, black 50%, transparent 85%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.6) 40%, black 60%), linear-gradient(to bottom, black 0%, black 50%, transparent 85%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/VCPGMjCW0is?autoplay=1&mute=1&loop=1&playlist=VCPGMjCW0is&controls=0&showinfo=0&rel=0&modestbranding=1"
              className="w-full h-full"
              style={{
                filter: 'brightness(0.4) contrast(1.1) saturate(0.7)',
                border: 'none',
                transform: 'scale(1.5)',
                pointerEvents: 'none',
              }}
              allow="autoplay; encrypted-media"
            />
          </div>

          <div className="section-container relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-4 font-body text-body-sm text-teal-400 font-medium tracking-wider uppercase mb-4">
                <span className="w-24 h-[1px] bg-gradient-to-r from-transparent to-teal-500/50" />
                Our Capabilities
              </span>
              <h1 className="font-display text-display-lg lg:text-display-xl text-white mb-6">
                Where Failure Is Not an Option
              </h1>
              <p className="font-body text-body-lg text-navy-200 leading-relaxed">
                Trusted by organizations operating in the most demanding environments,
                where data integrity and system reliability are mission-critical. Our
                capabilities span the full spectrum of enterprise data needs.
              </p>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="py-14 bg-navy-900 border-y border-navy-700/50">
          <div className="section-container">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-navy-700/50">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="group px-8 py-4 text-center relative"
                >
                  {/* Subtle bottom indicator */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-teal-500/0 group-hover:bg-teal-500 transition-all duration-300" />

                  <div className="font-display text-4xl md:text-5xl font-semibold text-white mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="font-body text-sm text-navy-400 group-hover:text-teal-400 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="section-container">
            <div className="text-center mb-16">
              <h2 className="font-display text-display text-navy-900 mb-4">
                Core Capabilities
              </h2>
              <p className="font-body text-body-lg text-navy-600 max-w-2xl mx-auto">
                Comprehensive solutions for organizations where every millisecond
                and every byte matters
              </p>
            </div>

            <div className="space-y-16">
              {insights.map((insight, index) => (
                <div
                  key={insight.id}
                  id={insight.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content side */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center">
                        {insight.icon}
                      </div>
                      <span className="px-3 py-1 bg-navy-100 text-navy-600 text-sm font-medium rounded-full">
                        {insight.category}
                      </span>
                    </div>

                    <h3 className="font-display text-heading-lg text-navy-900 mb-4">
                      {insight.title}
                    </h3>

                    <p className="font-body text-body-lg text-navy-600 mb-6 leading-relaxed">
                      {insight.description}
                    </p>

                    <ul className="space-y-3 mb-6">
                      {insight.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="font-body text-body text-navy-600">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-2">
                      {insight.features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-navy-50 text-navy-700 text-sm rounded-md border border-navy-100"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Visual side */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative group">
                      {/* Image */}
                      <img
                        src={insight.image}
                        alt={insight.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Gradient overlay for depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-navy-900/20 to-transparent" />

                      {/* Teal tint overlay */}
                      <div className="absolute inset-0 bg-teal-500/10 mix-blend-overlay" />

                      {/* Glow effect */}
                      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl" />
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-teal-500/10 rounded-xl -z-10" />
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-navy-900/10 rounded-xl -z-10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries section */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="section-container">
            <div className="text-center mb-16">
              <h2 className="font-display text-display text-navy-900 mb-4">
                Industries We Serve
              </h2>
              <p className="font-body text-body-lg text-navy-600 max-w-2xl mx-auto">
                We partner with organizations where the stakes are highest and the margin for error is zero
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: 'Defense',
                  description: 'Mission-critical intelligence systems for national security',
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-8 h-8">
                      <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3" />
                    </svg>
                  ),
                },
                {
                  name: 'Finance',
                  description: 'Regulatory compliance and real-time transaction processing',
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-8 h-8">
                      <rect x="3" y="6" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  ),
                },
                {
                  name: 'Healthcare',
                  description: 'Patient data interoperability and HIPAA compliance',
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-8 h-8">
                      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ),
                },
                {
                  name: 'Government',
                  description: 'FedRAMP-authorized solutions for federal agencies',
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-8 h-8">
                      <path d="M4 9L12 4L20 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="6" y1="11" x2="6" y2="18" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="12" y1="11" x2="12" y2="18" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="18" y1="11" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="3" y="18" width="18" height="2" rx="0.5" fill="currentColor" opacity="0.3" />
                    </svg>
                  ),
                },
              ].map((industry, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
                    {industry.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                    {industry.name}
                  </h3>
                  <p className="font-body text-body-sm text-navy-600">
                    {industry.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20 bg-navy-900 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-navy-600/20 rounded-full blur-3xl" />
          </div>

          <div className="section-container relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Case Studies Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-teal-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-gradient-to-br from-navy-800 to-navy-850 rounded-2xl p-10 border border-navy-700/50 group-hover:border-teal-500/30 transition-all duration-500">
                  {/* Icon */}
                  <div className="w-14 h-14 mb-6 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all duration-300">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                    </svg>
                  </div>

                  <h3 className="font-display text-2xl text-white mb-3">
                    View Case Studies
                  </h3>
                  <p className="font-body text-navy-300 mb-8 leading-relaxed">
                    See how we&apos;ve delivered results for our clients across defense, finance, and healthcare sectors.
                  </p>

                  <Link
                    href="/#sectors"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-teal-500 text-navy-950 font-body font-semibold rounded-lg hover:bg-teal-400 transition-all duration-300 group/btn"
                  >
                    Explore Sectors
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Contact Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-navy-600/20 to-teal-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-gradient-to-br from-navy-800 to-navy-850 rounded-2xl p-10 border border-navy-700/50 group-hover:border-teal-500/30 transition-all duration-500">
                  {/* Icon */}
                  <div className="w-14 h-14 mb-6 rounded-xl bg-navy-700/50 border border-navy-600/50 flex items-center justify-center text-teal-400 group-hover:scale-110 group-hover:bg-teal-500/20 group-hover:border-teal-500/20 transition-all duration-300">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                  </div>

                  <h3 className="font-display text-2xl text-white mb-3">
                    Start a Conversation
                  </h3>
                  <p className="font-body text-navy-300 mb-8 leading-relaxed">
                    Let&apos;s discuss how we can help transform your organization&apos;s data infrastructure.
                  </p>

                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-3 px-6 py-3 border border-navy-600 text-white font-body font-semibold rounded-lg hover:border-teal-500/50 hover:bg-teal-500/10 transition-all duration-300 group/btn"
                  >
                    Contact Us
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
