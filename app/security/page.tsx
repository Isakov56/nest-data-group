import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Security | Nest Data Group',
  description: 'Security practices at Nest Data Group - Learn about our commitment to protecting your data and maintaining the highest security standards.',
}

export default function Security() {
  const securityFeatures = [
    {
      title: 'SOC 2 Type II Compliant',
      description: 'Our systems and processes are audited annually to ensure compliance with SOC 2 security, availability, and confidentiality principles.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'FedRAMP Ready',
      description: 'Our infrastructure meets FedRAMP requirements, enabling secure cloud services for federal government agencies.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: 'Zero-Trust Architecture',
      description: 'We implement zero-trust security principles, verifying every access request regardless of network location.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: 'End-to-End Encryption',
      description: 'All data in transit and at rest is encrypted using industry-standard AES-256 encryption.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: '24/7 Security Monitoring',
      description: 'Our security operations center provides continuous monitoring and incident response capabilities.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      title: 'Regular Penetration Testing',
      description: 'Independent security assessments and penetration tests are conducted quarterly to identify vulnerabilities.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ]

  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20">
              <span className="inline-flex items-center gap-3 font-body text-body-sm text-teal-600 font-medium tracking-wider uppercase mb-6">
                <span className="w-8 h-px bg-teal-400" />
                Security
                <span className="w-8 h-px bg-teal-400" />
              </span>
              <h1 className="font-display text-display md:text-display-lg text-navy-900 mb-6">
                Enterprise-Grade Security
              </h1>
              <p className="font-body text-body-lg text-navy-500 max-w-3xl mx-auto">
                Security is foundational to everything we do. We maintain the highest standards to protect your data and ensure compliance with government and industry requirements.
              </p>
            </div>

            {/* Security Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {securityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 bg-white rounded-xl border border-gray-100 hover:border-navy-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-3 bg-navy-50 rounded-lg text-navy-600 w-fit mb-6 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-heading text-navy-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="font-body text-body text-navy-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Compliance Section */}
            <div className="bg-navy-950 rounded-2xl p-10 lg:p-16 text-center">
              <h2 className="font-display text-heading-xl text-white mb-6">
                Compliance & Certifications
              </h2>
              <p className="font-body text-body-lg text-navy-300 max-w-2xl mx-auto mb-10">
                We maintain compliance with major security frameworks and regularly undergo independent audits.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {['SOC 2 Type II', 'FedRAMP', 'NIST 800-53', 'ISO 27001', 'HIPAA'].map((cert) => (
                  <span
                    key={cert}
                    className="px-6 py-3 bg-navy-900/50 border border-navy-700 rounded-lg font-body text-body-sm text-navy-200"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-20 text-center">
              <h2 className="font-display text-heading-lg text-navy-900 mb-4">
                Questions About Our Security Practices?
              </h2>
              <p className="font-body text-body-lg text-navy-500 mb-8">
                Our security team is available to discuss our practices and compliance documentation.
              </p>
              <a
                href="mailto:security@nestdatagroup.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-navy-900 text-white font-body font-medium rounded-sm hover:bg-navy-800 transition-colors duration-300"
              >
                Contact Security Team
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
