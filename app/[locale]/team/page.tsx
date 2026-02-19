import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
  expertise?: string[]
  objectPosition?: string
}

const leadership: TeamMember[] = [
  {
    name: 'Hojiakbar Isakov',
    role: 'Chief Executive Officer',
    bio: 'Hojiakbar Isakov holds engineering and computer science degrees from an Italian university, where he developed the technical foundations that define his approach to building technology organizations. His career has been shaped by leading large-scale IT initiatives across Italy and Germany, where he built deep business insight through direct engagement with European enterprise clients. As CEO of Nest Data Group, he combines engineering clarity with strong strategic thinking to drive the company\'s global vision, market development, and long-term growth.',
    image: '/team-ceo-hojiakbar.jpg',
    linkedin: '#',
    expertise: ['Global Strategy', 'International Business', 'Corporate Leadership'],
    objectPosition: '50% 40%',
  },
  {
    name: 'Kamronbek Abdumannonov',
    role: 'Chief Technology Officer',
    bio: 'Kamronbek Abdumannonov is the technical authority at Nest Data Group — an engineer of rare depth whose career spans some of the most demanding technology environments in the region. A graduate of the University of Sharjah, he has built and led high-performance engineering teams at Beeline Uzbekistan, EPAM Systems, and Remo, accumulating mastery across distributed systems, cloud-native architecture, and enterprise platform engineering. As CTO, he defines the technology roadmap, enforces engineering best practices, and ensures that every solution Nest Data Group delivers meets the highest standards of reliability and scalability.',
    image: 'https://ui-avatars.com/api/?name=Kamronbek+Abdumannonov&background=1e3a5f&color=4a9b9b&size=400&bold=true',
    linkedin: '#',
    expertise: ['Distributed Systems', 'Cloud Architecture', 'Platform Engineering'],
    objectPosition: '50% 65%',
  },
  {
    name: 'Ilyosbek Sulaymanov',
    role: 'Chief Data Officer',
    bio: 'Ilyosbek Sulaymanov is a recognized authority in big data, data analytics, and data engineering. As Chief Data Officer, he architects the data strategy that underpins Nest Data Group\'s most complex client engagements — designing analytical platforms, building scalable data pipelines, and embedding data-driven decision-making across organizations. He leads the company-wide integration of Machine Learning and Data Science capabilities, ensuring that AI-driven insights are embedded at every layer of the solutions Nest Data Group delivers.',
    image: '/team-cdo-ilyosbek.jpg',
    linkedin: '#',
    expertise: ['Big Data & Analytics', 'Data Engineering', 'Machine Learning Integration'],
    objectPosition: '50% 65%',
  },
]

const seniorTeam: TeamMember[] = [
  {
    name: 'Aziz Abdurakhmonov',
    role: 'Director of Development & Regional Management',
    bio: 'Aziz Abdurakhmonov is a seasoned technology leader with a degree from Riga Technical University and a proven track record in developing complex enterprise IT systems and platforms. He has contributed to large-scale automation and digitalization projects at prominent European companies, driving engineering initiatives from architecture through delivery. At Nest Data Group, he is accountable for technical architecture, quality assurance, and innovation — ensuring every solution is built with precision and engineered to last.',
    image: '/team-director-aziz.jpg',
    linkedin: '#',
    expertise: ['Technical Architecture', 'Enterprise Systems', 'Regional Operations'],
    objectPosition: '50% 10%',
  },
  {
    name: 'Anora',
    role: 'Head of Global Marketing',
    bio: 'A graduate of the Management Development Institute of Singapore (MDIS), Anora brings a global perspective to Nest Data Group\'s marketing and brand strategy. She leads the company\'s international marketing initiatives — from go-to-market strategy and brand positioning to market expansion across new geographies. Her cross-cultural expertise and strategic communication skills have been instrumental in establishing Nest Data Group\'s presence in competitive global markets.',
    image: '/team-marketing-anora.jpg',
    linkedin: '#',
    expertise: ['Global Marketing', 'Brand Strategy', 'Market Development'],
    objectPosition: '50% 45%',
  },
  {
    name: 'Shukrona Kasimova',
    role: 'Chief Financial Officer',
    bio: 'Shukrona Kasimova oversees Nest Data Group\'s financial strategy, planning, and operations. She brings rigorous fiscal governance and a disciplined approach to risk management that ensures the company maintains the financial resilience required to operate at enterprise scale and invest in long-term growth.',
    image: '/team-cfo-shukrona.jpg',
    linkedin: '#',
    expertise: ['Financial Strategy', 'Risk Management', 'Operations'],
    objectPosition: '50% 28%',
  },
]

export default function TeamPage() {
  const t = useTranslations('pages.team')
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
              {[
                { value: '50+', label: t('stats.teamMembers') },
                { value: '150+', label: t('stats.yearsCombinedExperience') },
                { value: '12', label: t('stats.countriesRepresented') },
                { value: '98%', label: t('stats.employeeRetention') },
              ].map((stat, i) => (
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

        {/* Leadership section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="section-container">
            <div className="text-center mb-16">
              <h2 className="font-display text-display text-navy-900 mb-4">
                {t('executiveLeadership')}
              </h2>
              <p className="font-body text-body-lg text-navy-600 max-w-2xl mx-auto">
                {t('executiveSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {leadership.map((member, i) => (
                <div key={i} className="group">
                  {/* Image */}
                  <div className="relative h-80 mb-6 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: member.objectPosition ?? '50% 65%' }}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/20 to-transparent" />

                    {/* LinkedIn */}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-semibold text-navy-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="font-body text-teal-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="font-body text-body text-navy-600 mb-4 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Expertise tags */}
                  {member.expertise && (
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 bg-navy-50 text-navy-600 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Senior Team section */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="section-container">
            <div className="text-center mb-16">
              <h2 className="font-display text-display text-navy-900 mb-4">
                {t('seniorLeadership')}
              </h2>
              <p className="font-body text-body-lg text-navy-600 max-w-2xl mx-auto">
                {t('seniorSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {seniorTeam.map((member, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: member.objectPosition ?? '50% 65%' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-navy-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="font-body text-teal-600 font-medium text-sm mb-3">
                      {member.role}
                    </p>
                    <p className="font-body text-body-sm text-navy-600 mb-4 leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Expertise tags */}
                    {member.expertise && (
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, j) => (
                          <span
                            key={j}
                            className="px-2 py-0.5 bg-navy-50 text-navy-500 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join us CTA */}
        <section className="py-20 bg-navy-900">
          <div className="section-container text-center">
            <h2 className="font-display text-display text-white mb-4">
              {t('joinOurTeam')}
            </h2>
            <p className="font-body text-body-lg text-navy-200 max-w-2xl mx-auto mb-8">
              {t('joinDesc')}
            </p>
            <a
              href="/careers"
              className="inline-flex items-center justify-center px-8 py-4 bg-teal-500 text-white font-body font-medium rounded-sm hover:bg-teal-400 transition-colors"
            >
              {t('viewOpenPositions')}
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
