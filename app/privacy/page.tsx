import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Nest Data Group',
  description: 'Privacy Policy for Nest Data Group - Learn how we collect, use, and protect your information.',
}

export default function PrivacyPolicy() {
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
                Legal
                <span className="w-8 h-px bg-teal-400" />
              </span>
              <h1 className="font-display text-display md:text-display-lg text-navy-900 mb-6">
                Privacy Policy
              </h1>
              <p className="font-body text-body-lg text-navy-500">
                Last updated: January 28, 2026
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg prose-navy max-w-none">
              <section className="mb-12">
                <h2 className="font-display text-heading-lg text-navy-900 mb-4">
                  Introduction
                </h2>
                <p className="font-body text-body text-navy-600 leading-relaxed mb-4">
                  Nest Data Group (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-heading-lg text-navy-900 mb-4">
                  Information We Collect
                </h2>
                <p className="font-body text-body text-navy-600 leading-relaxed mb-4">
                  We may collect information about you in various ways, including:
                </p>
                <ul className="list-disc list-inside font-body text-body text-navy-600 space-y-2 ml-4">
                  <li><strong>Personal Data:</strong> Name, email address, phone number, and company information you provide when contacting us.</li>
                  <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, pages visited, and time spent on pages.</li>
                  <li><strong>Cookies:</strong> Small data files stored on your device to enhance your browsing experience.</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-heading-lg text-navy-900 mb-4">
                  How We Use Your Information
                </h2>
                <p className="font-body text-body text-navy-600 leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside font-body text-body text-navy-600 space-y-2 ml-4">
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our website and services</li>
                  <li>Send you relevant communications about our services</li>
                  <li>Comply with legal obligations</li>
                  <li>Protect against fraudulent or unauthorized activity</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-heading-lg text-navy-900 mb-4">
                  Data Security
                </h2>
                <p className="font-body text-body text-navy-600 leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Our security practices align with industry standards including SOC 2 compliance.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-heading-lg text-navy-900 mb-4">
                  Your Rights
                </h2>
                <p className="font-body text-body text-navy-600 leading-relaxed mb-4">
                  Depending on your location, you may have rights regarding your personal data, including:
                </p>
                <ul className="list-disc list-inside font-body text-body text-navy-600 space-y-2 ml-4">
                  <li>The right to access your personal data</li>
                  <li>The right to correct inaccurate data</li>
                  <li>The right to request deletion of your data</li>
                  <li>The right to restrict or object to processing</li>
                  <li>The right to data portability</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-heading-lg text-navy-900 mb-4">
                  Contact Us
                </h2>
                <p className="font-body text-body text-navy-600 leading-relaxed">
                  If you have questions about this Privacy Policy or our data practices, please contact us at{' '}
                  <a href="mailto:privacy@nestdatagroup.com" className="text-teal-600 hover:text-teal-700 underline">
                    privacy@nestdatagroup.com
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
