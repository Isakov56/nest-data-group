import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function AboutPage() {
  const t = useTranslations('pages.about')
  const stats = [
    { value: '15+', label: t('stats.yearsOfExcellence') },
    { value: '200+', label: t('stats.enterpriseClients') },
    { value: '$2B+', label: t('stats.dataProcessedDaily') },
    { value: '99.99%', label: t('stats.systemUptime') },
  ]

  const values = [
    {
      title: t('precision.title'),
      description: t('precision.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: t('securityValue.title'),
      description: t('securityValue.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: t('partnership.title'),
      description: t('partnership.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: t('innovation.title'),
      description: t('innovation.description'),
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
                {t('sectionLabel')}
              </span>
              <h1 className="font-display text-display-lg lg:text-display-xl text-white mb-6">
                {t('title')}
              </h1>
              <p className="font-body text-body-lg text-navy-200 leading-relaxed">
                {t('description')}
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
                  {t('ourStory')}
                </h2>
                <div className="space-y-4 font-body text-body text-navy-600 leading-relaxed">
                  <p>{t('storyParagraph1')}</p>
                  <p>{t('storyParagraph2')}</p>
                  <p>{t('storyParagraph3')}</p>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl relative">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop"
                    alt="Team collaboration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
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
                {t('ourValues')}
              </h2>
              <p className="font-body text-body-lg text-navy-600 max-w-2xl mx-auto">
                {t('valuesSubtitle')}
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
        <section className="py-20 bg-navy-900 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-navy-600/20 rounded-full blur-3xl" />
          </div>

          <div className="section-container relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Meet Our Team Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-teal-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-gradient-to-br from-navy-800 to-navy-850 rounded-2xl p-10 border border-navy-700/50 group-hover:border-teal-500/30 transition-all duration-500">
                  {/* Icon */}
                  <div className="w-14 h-14 mb-6 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all duration-300">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>

                  <h3 className="font-display text-2xl text-white mb-3">
                    {t('meetOurTeam')}
                  </h3>
                  <p className="font-body text-navy-300 mb-8 leading-relaxed">
                    {t('meetOurTeamDesc')}
                  </p>

                  <Link
                    href="/team"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-teal-500 text-navy-950 font-body font-semibold rounded-lg hover:bg-teal-400 transition-all duration-300 group/btn"
                  >
                    {t('viewTeam')}
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Start a Conversation Card */}
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
                    {t('startConversation')}
                  </h3>
                  <p className="font-body text-navy-300 mb-8 leading-relaxed">
                    {t('startConversationDesc')}
                  </p>

                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-3 px-6 py-3 border border-navy-600 text-white font-body font-semibold rounded-lg hover:border-teal-500/50 hover:bg-teal-500/10 transition-all duration-300 group/btn"
                  >
                    {t('contactUs')}
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
