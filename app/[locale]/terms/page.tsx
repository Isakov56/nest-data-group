import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useTranslations } from 'next-intl'

export const metadata: Metadata = {
  title: 'Terms of Service | Nest Data Group',
  description: 'Terms of Service for Nest Data Group - Read our terms and conditions for using our services.',
}

export default function TermsOfService() {
  const t = useTranslations('pages.terms')
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-16">
              <span className="inline-flex items-center gap-3 font-body text-body-sm text-teal-600 font-medium tracking-wider uppercase mb-6">
                <span className="w-8 h-px bg-teal-400" />
                {t('sectionLabel')}
                <span className="w-8 h-px bg-teal-400" />
              </span>
              <h1 className="font-display text-display md:text-display-lg text-navy-900 mb-6">
                {t('title')}
              </h1>
              <p className="font-body text-body-lg text-navy-500">
                {t('lastUpdated')}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg prose-navy max-w-none">
              <section className="mb-12">
                <h2 className="font-display text-heading-lg text-navy-900 mb-4">
                  Agreement to Terms
                </h2>
                <p className="font-body text-body text-navy-600 leading-relaxed mb-4">
                  By accessing or using the Nest Data Group website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-heading-lg text-navy-900 mb-4">
                  Services Description
                </h2>
                <p className="font-body text-body text-navy-600 leading-relaxed mb-4">
                  Nest Data Group provides enterprise data architecture, cloud strategy, analytics, and security consulting services. Our services are designed to help organizations design and implement robust data systems for critical operations.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-heading-lg text-navy-900 mb-4">
                  Intellectual Property
                </h2>
                <p className="font-body text-body text-navy-600 leading-relaxed mb-4">
                  The content, features, and functionality of our website are owned by Nest Data Group and are protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-heading-lg text-navy-900 mb-4">
                  User Responsibilities
                </h2>
                <p className="font-body text-body text-navy-600 leading-relaxed mb-4">
                  When using our services, you agree to:
                </p>
                <ul className="list-disc list-inside font-body text-body text-navy-600 space-y-2 ml-4">
                  <li>Provide accurate and complete information when requested</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                  <li>Not interfere with or disrupt our services</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-heading-lg text-navy-900 mb-4">
                  Confidentiality
                </h2>
                <p className="font-body text-body text-navy-600 leading-relaxed mb-4">
                  We understand that our clients share sensitive information with us. We maintain strict confidentiality protocols and will not disclose your confidential information to third parties without your consent, except as required by law.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-heading-lg text-navy-900 mb-4">
                  Limitation of Liability
                </h2>
                <p className="font-body text-body text-navy-600 leading-relaxed mb-4">
                  To the maximum extent permitted by law, Nest Data Group shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability shall not exceed the amount paid by you for the specific services giving rise to the claim.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-heading-lg text-navy-900 mb-4">
                  Governing Law
                </h2>
                <p className="font-body text-body text-navy-600 leading-relaxed mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of the District of Columbia, United States, without regard to its conflict of law provisions.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-heading-lg text-navy-900 mb-4">
                  Changes to Terms
                </h2>
                <p className="font-body text-body text-navy-600 leading-relaxed mb-4">
                  We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the &quot;Last updated&quot; date.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-heading-lg text-navy-900 mb-4">
                  Contact Us
                </h2>
                <p className="font-body text-body text-navy-600 leading-relaxed">
                  For questions about these Terms of Service, please contact us at{' '}
                  <a href="mailto:legal@nestdatagroup.com" className="text-teal-600 hover:text-teal-700 underline">
                    legal@nestdatagroup.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
