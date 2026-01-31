import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function AboutPage() {
  const stats = [
    { value: '15+', label: 'Years of Excellence' },
    { value: '200+', label: 'Enterprise Clients' },
    { value: '$2B+', label: 'Data Processed Daily' },
    { value: '99.99%', label: 'System Uptime' },
  ]

  const values = [
    {
      title: 'Precision',
      description: 'We believe in doing things right the first time. Every system we build is engineered for accuracy and reliability.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Security',
      description: 'Data protection isn\'t an afterthought—it\'s foundational. We build security into every layer of our solutions.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Partnership',
      description: 'We\'re not vendors—we\'re partners. Your success is our success, and we\'re committed for the long term.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Innovation',
      description: 'We stay ahead of the curve, continuously evolving our practices to leverage the latest in data technology.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ]

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
                About Us
              </span>
              <h1 className="font-display text-display-lg lg:text-display-xl text-white mb-6">
                Architecture for the Data That Matters
              </h1>
              <p className="font-body text-body-lg text-navy-200 leading-relaxed">
                Nest Data Group designs and builds enterprise data systems for organizations
                where precision isn&apos;t optional. We partner with government agencies, defense
                contractors, and Fortune 500 companies to create data architectures that
                power critical decisions.
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

        {/* Story section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display text-display text-navy-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 font-body text-body text-navy-600 leading-relaxed">
                  <p>
                    Founded in 2010, Nest Data Group emerged from a simple observation: 
                    enterprises were drowning in data but starving for insight. Legacy 
                    systems couldn&apos;t keep pace with the volume, velocity, and variety 
                    of modern data.
                  </p>
                  <p>
                    Our founders—veterans of Deloitte, AWS, and Goldman Sachs—came 
                    together with a shared vision: build data systems that are as 
                    reliable as the decisions they power.
                  </p>
                  <p>
                    Today, we serve over 200 enterprise clients across government, 
                    defense, financial services, and healthcare. Our systems process 
                    over $2 billion in transactions daily, with 99.99% uptime.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-500/10 rounded-xl -z-10" />
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-navy-900/10 rounded-xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Values section */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="section-container">
            <div className="text-center mb-16">
              <h2 className="font-display text-display text-navy-900 mb-4">
                Our Values
              </h2>
              <p className="font-body text-body-lg text-navy-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="font-body text-body text-navy-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20 bg-navy-900">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-navy-800 rounded-xl p-8 text-center">
                <h3 className="font-display text-xl text-white mb-3">
                  Meet Our Team
                </h3>
                <p className="font-body text-navy-300 mb-6">
                  Learn about the experts behind our platform
                </p>
                <Link
                  href="/team"
                  className="inline-flex items-center justify-center px-6 py-3 bg-teal-500 text-white font-body font-medium rounded-sm hover:bg-teal-400 transition-colors"
                >
                  View Team
                </Link>
              </div>
              
              <div className="bg-navy-800 rounded-xl p-8 text-center">
                <h3 className="font-display text-xl text-white mb-3">
                  Start a Conversation
                </h3>
                <p className="font-body text-navy-300 mb-6">
                  Let&apos;s discuss how we can help your organization
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white font-body font-medium rounded-sm hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
