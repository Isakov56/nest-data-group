import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
  expertise?: string[]
}

const leadership: TeamMember[] = [
  {
    name: 'Michael Chen',
    role: 'Chief Executive Officer',
    bio: 'Michael brings over 20 years of experience architecting enterprise data solutions for Fortune 500 companies and federal agencies. As Former Director of Data Strategy at Deloitte, he led digital transformation initiatives that generated over $500M in client value. He holds an MBA from Harvard Business School and a BS in Computer Science from Stanford.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop',
    linkedin: '#',
    expertise: ['Enterprise Strategy', 'Digital Transformation', 'Federal Consulting'],
  },
  {
    name: 'Sarah Williams',
    role: 'Chief Technology Officer',
    bio: 'Sarah is a former AWS Principal Architect who led cloud infrastructure for three successful IPOs. She holds a PhD in Distributed Systems from MIT and has published over 30 papers on scalable data architectures. Her work has been cited in major technology conferences including re:Invent and KubeCon.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop',
    linkedin: '#',
    expertise: ['Cloud Architecture', 'Distributed Systems', 'Platform Engineering'],
  },
  {
    name: 'David Park',
    role: 'Chief Data Officer',
    bio: 'David served as Head of Analytics at Goldman Sachs where he pioneered real-time risk modeling systems processing over 10 million transactions daily. His innovations in data pipeline optimization reduced processing latency by 80% and saved the firm $50M annually.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop',
    linkedin: '#',
    expertise: ['Data Analytics', 'Risk Modeling', 'Financial Systems'],
  },
]

const seniorTeam: TeamMember[] = [
  {
    name: 'Emily Rodriguez',
    role: 'VP of Engineering',
    bio: 'Emily has spent 15 years scaling distributed systems at hyper-growth companies including Stripe and Datadog. She leads our engineering organization of 50+ engineers across platform, infrastructure, and delivery teams.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop',
    linkedin: '#',
    expertise: ['Engineering Leadership', 'Platform Development', 'Team Building'],
  },
  {
    name: 'James Mitchell',
    role: 'Director of Security',
    bio: 'A former NSA cybersecurity specialist with CISSP and CISM certifications, James ensures our solutions meet the highest security standards required by government and enterprise clients.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop',
    linkedin: '#',
    expertise: ['Cybersecurity', 'Compliance', 'Threat Modeling'],
  },
  {
    name: 'Lisa Thompson',
    role: 'Head of Client Success',
    bio: 'Lisa drives enterprise adoption with a remarkable 98% client retention rate. Her background in enterprise software sales at Salesforce and Oracle gives her unique insight into client needs.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=687&auto=format&fit=crop',
    linkedin: '#',
    expertise: ['Client Relations', 'Enterprise Sales', 'Account Management'],
  },
  {
    name: 'Robert Kim',
    role: 'Principal Architect',
    bio: 'Robert has designed data platforms for 3 of the top 10 US banks. His expertise in regulatory compliance and high-availability systems makes him invaluable for our financial services clients.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=687&auto=format&fit=crop',
    linkedin: '#',
    expertise: ['System Architecture', 'Financial Services', 'Regulatory Compliance'],
  },
  {
    name: 'Amanda Foster',
    role: 'Director of Data Science',
    bio: 'Amanda leads our ML and AI initiatives, bringing experience from Google Brain and DeepMind. She specializes in applying machine learning to enterprise data challenges.',
    image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?q=80&w=687&auto=format&fit=crop',
    linkedin: '#',
    expertise: ['Machine Learning', 'AI Strategy', 'Data Science'],
  },
  {
    name: 'Marcus Johnson',
    role: 'Head of DevOps',
    bio: 'Marcus built and scaled infrastructure at Netflix and Uber. He leads our DevOps practice, ensuring reliable deployments and 99.99% uptime for client systems.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop',
    linkedin: '#',
    expertise: ['DevOps', 'Site Reliability', 'Infrastructure'],
  },
]

export default function TeamPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
        <section className="relative pt-32 pb-20 bg-navy-900 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #5dc9c9 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>
          
          <div className="section-container relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 font-body text-body-sm text-teal-400 font-medium tracking-wider uppercase mb-4">
                <span className="w-8 h-px bg-teal-400" />
                Our Team
              </span>
              <h1 className="font-display text-display-lg lg:text-display-xl text-white mb-6">
                The People Behind the Platform
              </h1>
              <p className="font-body text-body-lg text-navy-200 leading-relaxed">
                Our team combines decades of experience from leading technology companies, 
                government agencies, and financial institutions. We&apos;re united by a shared 
                commitment to building data systems that matter.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="section-container">
            <div className="text-center mb-16">
              <h2 className="font-display text-display text-navy-900 mb-4">
                Executive Leadership
              </h2>
              <p className="font-body text-body-lg text-navy-600 max-w-2xl mx-auto">
                Visionary leaders with proven track records in enterprise technology
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {leadership.map((member, i) => (
                <div key={i} className="group">
                  {/* Image */}
                  <div className="relative h-80 mb-6 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
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
                Senior Leadership
              </h2>
              <p className="font-body text-body-lg text-navy-600 max-w-2xl mx-auto">
                Experts driving excellence across every discipline
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
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
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
              Join Our Team
            </h2>
            <p className="font-body text-body-lg text-navy-200 max-w-2xl mx-auto mb-8">
              We&apos;re always looking for exceptional talent to help us build the future of enterprise data.
            </p>
            <a
              href="/careers"
              className="inline-flex items-center justify-center px-8 py-4 bg-teal-500 text-white font-body font-medium rounded-sm hover:bg-teal-400 transition-colors"
            >
              View Open Positions
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
