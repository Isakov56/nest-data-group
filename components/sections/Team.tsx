'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
}

const leadership: TeamMember[] = [
  {
    name: 'Michael Chen',
    role: 'Chief Executive Officer',
    bio: 'Former Director of Data Strategy at Deloitte. 20+ years architecting enterprise data solutions for Fortune 500 companies and federal agencies.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop',
    linkedin: '#',
  },
  {
    name: 'Sarah Williams',
    role: 'Chief Technology Officer',
    bio: 'Ex-AWS Principal Architect. Led cloud infrastructure for three successful IPOs. PhD in Distributed Systems from MIT.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop',
    linkedin: '#',
  },
  {
    name: 'David Park',
    role: 'Chief Data Officer',
    bio: 'Former Head of Analytics at Goldman Sachs. Pioneered real-time risk modeling systems processing 10M+ transactions daily.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop',
    linkedin: '#',
  },
]

const team: TeamMember[] = [
  {
    name: 'Emily Rodriguez',
    role: 'VP of Engineering',
    bio: 'Scaling distributed systems at hyper-growth companies for 15 years.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop',
  },
  {
    name: 'James Mitchell',
    role: 'Director of Security',
    bio: 'Former NSA cybersecurity specialist. CISSP, CISM certified.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop',
  },
  {
    name: 'Lisa Thompson',
    role: 'Head of Client Success',
    bio: 'Driving enterprise adoption with 98% client retention rate.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=687&auto=format&fit=crop',
  },
  {
    name: 'Robert Kim',
    role: 'Principal Architect',
    bio: 'Designed data platforms for 3 of the top 10 US banks.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=687&auto=format&fit=crop',
  },
]

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const leadershipRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      )

      // Leadership cards stagger
      if (leadershipRef.current) {
        const cards = leadershipRef.current.querySelectorAll('.leadership-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            scrollTrigger: {
              trigger: leadershipRef.current,
              start: 'top 80%',
            },
          }
        )
      }

      // Team cards stagger
      if (teamRef.current) {
        const cards = teamRef.current.querySelectorAll('.team-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: teamRef.current,
              start: 'top 80%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative py-24 lg:py-32 bg-gray-50 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1e3a5f 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="section-container relative z-10">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-2 font-body text-body-sm text-teal-600 font-medium tracking-wider uppercase mb-4">
            <span className="w-8 h-px bg-teal-500" />
            Our Team
            <span className="w-8 h-px bg-teal-500" />
          </span>
          <h2 className="font-display text-display md:text-display-lg text-navy-900 mb-6">
            Leadership & Expertise
          </h2>
          <p className="font-body text-body-lg text-navy-600 max-w-2xl mx-auto">
            Our team combines decades of experience from leading technology companies, 
            government agencies, and financial institutions.
          </p>
        </div>

        {/* Leadership section */}
        <div ref={leadershipRef} className="mb-20">
          <h3 className="font-display text-heading text-navy-800 mb-8 text-center">
            Executive Leadership
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, i) => (
              <div
                key={i}
                className="leadership-card group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                  
                  {/* LinkedIn icon */}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-teal-500 hover:text-white"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="font-display text-xl font-semibold text-navy-900 mb-1">
                    {member.name}
                  </h4>
                  <p className="font-body text-teal-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="font-body text-body-sm text-navy-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Extended team */}
        <div ref={teamRef}>
          <h3 className="font-display text-heading text-navy-800 mb-8 text-center">
            Senior Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="team-card group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="font-display text-lg font-semibold text-navy-900 mb-0.5">
                    {member.name}
                  </h4>
                  <p className="font-body text-sm text-teal-600 font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="font-body text-body-sm text-navy-500 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to full team page */}
        <div className="mt-16 text-center">
          <a
            href="/team"
            className="inline-flex items-center gap-2 font-body text-body font-medium text-teal-600 hover:text-teal-700 transition-colors"
          >
            View Full Team
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
