import { Link } from 'react-router-dom'
import { Navbar } from '../components/navbar'
import { Footer } from '../components/footer'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <div className="mt-23 py-16 px-4" style={{ backgroundColor: '#0a4a42' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-serif text-white mb-4">Privacy Policy</h1>
          <p className="text-lg" style={{ color: '#a8d5cf' }}>
            Last updated: June 24, 2024
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <div className="prose max-w-none" style={{ color: '#2d4a46' }}>

          <p className="text-lg mb-8">
            At <strong>Vacation Clock</strong>, we are committed to protecting your personal information
            and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website or use our travel planning services.
          </p>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              1. Information We Collect
            </h2>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#0a6b5e' }}>Personal Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Full name, email address, and phone number (when registering or booking)</li>
              <li>Billing and payment details (processed securely via third-party payment gateways)</li>
              <li>Travel preferences, destination interests, and itinerary choices</li>
              <li>Messages sent through our contact forms or customer support</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#0a6b5e' }}>Information Collected Automatically</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address and device/browser information</li>
              <li>Pages visited, time spent on the site, and navigation patterns</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Referral source and search terms used to find our platform</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              2. How We Use Your Information
            </h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process bookings, payments, and itinerary confirmations</li>
              <li>Personalise your travel recommendations and destination suggestions</li>
              <li>Communicate updates, confirmations, and promotional offers (with your consent)</li>
              <li>Improve our platform, features, and customer experience</li>
              <li>Comply with legal obligations and resolve disputes</li>
              <li>Prevent fraudulent activity and ensure platform security</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              3. Sharing Your Information
            </h2>
            <p className="mb-3">We do not sell your personal data. We may share it with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Providers:</strong> Hotels, transport operators, and activity partners who fulfil your bookings</li>
              <li><strong>Payment Processors:</strong> Secure third-party gateways to handle transactions</li>
              <li><strong>Analytics Tools:</strong> Aggregated, anonymised data to understand user behaviour</li>
              <li><strong>Legal Authorities:</strong> When required by law, court order, or government regulation</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              4. Cookies
            </h2>
            <p className="mb-3">
              We use cookies to enhance your browsing experience and remember your preferences.
              Types of cookies we use:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the website to function (e.g., session management)</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site</li>
              <li><strong>Marketing Cookies:</strong> Used to show relevant travel offers and promotions</li>
            </ul>
            <p className="mt-3">
              You can manage cookie preferences through your browser settings. Disabling certain cookies
              may affect site functionality.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              5. Data Security
            </h2>
            <p>
              We implement industry-standard security measures including SSL encryption, secure servers,
              and access controls to protect your data. However, no method of internet transmission is
              100% secure. We encourage you to use a strong, unique password and notify us immediately
              of any suspected unauthorised access to your account.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              6. Your Rights
            </h2>
            <p className="mb-3">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, update, or delete your personal data</li>
              <li>Withdraw consent for marketing communications at any time</li>
              <li>Request a copy of the data we hold about you</li>
              <li>Lodge a complaint with your local data protection authority</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:privacy@vacationclock.in" style={{ color: '#0a6b5e' }} className="underline">
                privacy@vacationclock.in
              </a>.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              7. Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party sites (e.g., partner hotels, travel blogs).
              We are not responsible for the privacy practices of these external sites and recommend
              reviewing their privacy policies independently.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              8. Children's Privacy
            </h2>
            <p>
              Our services are not directed to children under the age of 13. We do not knowingly
              collect personal data from minors. If you believe we have inadvertently collected such
              data, please contact us and we will delete it promptly.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this
              page with an updated date. We encourage you to review this policy periodically. Continued
              use of our services after changes are posted constitutes your acceptance of the updated policy.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              10. Contact Us
            </h2>
            <p className="mb-3">
              If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us:
            </p>
            <div className="p-5 rounded-xl" style={{ backgroundColor: '#dce9e7' }}>
              <p><strong>Vacation Clock</strong></p>
              <p>Email: <a href="mailto:privacy@vacationclock.in" style={{ color: '#0a6b5e' }} className="underline">privacy@vacationclock.in</a></p>
              <p>
                Or visit our{' '}
                <Link to="/contact" style={{ color: '#0a6b5e' }} className="underline">Contact Page</Link>
              </p>
            </div>
          </section>
        </div>

        {/* Footer links */}
        <div className="mt-12 pt-8 flex gap-6 flex-wrap text-sm" style={{ borderTop: '1px solid #9dbdb9', color: '#4a6e69' }}>
          <Link to="/terms" className="hover:underline">Terms of Service</Link>
          <Link to="/refund" className="hover:underline">Refund Policy</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
