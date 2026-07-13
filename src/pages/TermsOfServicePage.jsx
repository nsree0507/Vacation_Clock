import { Link } from 'react-router-dom'
import { Navbar } from '../components/navbar'
import { Footer } from '../components/footer'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <div className="mt-23 py-16 px-4" style={{ backgroundColor: '#0a4a42' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-serif text-white mb-4">Terms of Service</h1>
          <p className="text-lg" style={{ color: '#a8d5cf' }}>
            Last updated: June 24, 2024
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <div className="prose max-w-none" style={{ color: '#2d4a46' }}>

          <p className="text-lg mb-8">
            Welcome to <strong>Vacation Clock</strong>. By accessing or using our website and services,
            you agree to be bound by these Terms of Service. Please read them carefully before making
            any booking or using any feature on our platform.
          </p>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              1. Acceptance of Terms
            </h2>
            <p>
              By creating an account, browsing our platform, or completing a booking, you confirm that
              you are at least 18 years old, have read and understood these Terms, and agree to be bound
              by them. If you are using our services on behalf of an organisation, you represent that
              you have the authority to bind that organisation to these Terms.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              2. Our Services
            </h2>
            <p className="mb-3">Vacation Clock provides:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>A travel planning platform for Indian destinations covering 14+ states and 500+ locations</li>
              <li>Curated itineraries and travel packages across various categories (adventure, honeymoon, corporate, group tours, etc.)</li>
              <li>Caretaker services, photography packages, and guided tours</li>
              <li>Booking facilitation for accommodation, transportation, and activities</li>
            </ul>
            <p className="mt-3">
              We act as a travel facilitator and may coordinate with third-party service providers
              (hotels, transport operators, guides) to fulfil your bookings.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              3. User Accounts
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the confidentiality of your login credentials</li>
              <li>You must notify us immediately of any unauthorised use of your account</li>
              <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
              <li>One person may not maintain more than one active account</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              4. Bookings and Payments
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All bookings are subject to availability and confirmation from our team</li>
              <li>Prices displayed are inclusive of applicable taxes unless stated otherwise</li>
              <li>Full or partial payment may be required at the time of booking, depending on the package</li>
              <li>Payment is processed via secure third-party gateways; we do not store card information</li>
              <li>In case of pricing errors, we will notify you and offer a revised quote or full refund</li>
              <li>We reserve the right to cancel bookings due to unforeseen circumstances (natural disasters, civil unrest, etc.) and will issue full refunds in such cases</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              5. Cancellations and Modifications
            </h2>
            <p className="mb-3">
              Cancellation and modification policies vary by package and service provider. General guidelines:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cancellations made 30+ days before travel: full refund less processing fees</li>
              <li>Cancellations made 15–29 days before travel: 50% refund</li>
              <li>Cancellations made 7–14 days before travel: 25% refund</li>
              <li>Cancellations made less than 7 days before travel: no refund</li>
              <li>Date changes are subject to availability and may incur additional charges</li>
            </ul>
            <p className="mt-3">
              Please refer to our <Link to="/refund" style={{ color: '#0a6b5e' }} className="underline">Refund Policy</Link> for full details.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              6. User Responsibilities
            </h2>
            <p className="mb-3">As a user of Vacation Clock, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate traveller details (names, age, ID information) as required for bookings</li>
              <li>Ensure all travellers hold valid identification documents required for their journey</li>
              <li>Comply with all local laws, customs, and regulations at your destination</li>
              <li>Respect the natural environment, heritage sites, and local communities</li>
              <li>Not use our platform for any unlawful, harmful, or fraudulent activity</li>
              <li>Not reproduce, distribute, or commercially exploit any content from our platform without written consent</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              7. Travel Insurance
            </h2>
            <p>
              We strongly recommend that all travellers purchase comprehensive travel insurance before
              departure. Vacation Clock does not provide travel insurance and is not liable for losses
              arising from trip interruption, medical emergencies, lost baggage, or other unforeseen events.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              8. Limitation of Liability
            </h2>
            <p className="mb-3">
              Vacation Clock acts as a facilitator and is not directly responsible for the actions of
              third-party service providers. To the fullest extent permitted by law, we are not liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal injury, illness, or death arising from travel activities</li>
              <li>Loss or damage to personal property</li>
              <li>Service failures by hotels, transport operators, or other vendors</li>
              <li>Delays, cancellations, or changes caused by weather, strikes, or force majeure events</li>
              <li>Any indirect, incidental, or consequential damages</li>
            </ul>
            <p className="mt-3">
              Our maximum liability in any case shall not exceed the total amount paid for the specific
              booking in question.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              9. Intellectual Property
            </h2>
            <p>
              All content on the Vacation Clock platform — including text, images, logos, destination
              descriptions, and itinerary data — is owned by or licensed to Vacation Clock and is
              protected by copyright. You may not reproduce, modify, or distribute any content without
              prior written permission.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              10. Governing Law
            </h2>
            <p>
              These Terms of Service are governed by the laws of India. Any disputes arising out of
              or in connection with these Terms shall be subject to the exclusive jurisdiction of the
              courts in India. You agree to resolve disputes through good-faith negotiation before
              pursuing legal action.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              11. Changes to Terms
            </h2>
            <p>
              We reserve the right to update these Terms at any time. Changes will be posted on this
              page with a revised effective date. Your continued use of our services after changes are
              posted constitutes your acceptance of the updated Terms. We recommend reviewing these
              Terms periodically.
            </p>
          </section>

          {/* Section 12 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              12. Contact Us
            </h2>
            <p className="mb-3">
              For questions, clarifications, or concerns about these Terms, please contact us:
            </p>
            <div className="p-5 rounded-xl" style={{ backgroundColor: '#dce9e7' }}>
              <p><strong>Vacation Clock</strong></p>
              <p>Email: <a href="mailto:legal@vacationclock.in" style={{ color: '#0a6b5e' }} className="underline">legal@vacationclock.in</a></p>
              <p>
                Or visit our{' '}
                <Link to="/contact" style={{ color: '#0a6b5e' }} className="underline">Contact Page</Link>
              </p>
            </div>
          </section>
        </div>

        {/* Footer links */}
        <div className="mt-12 pt-8 flex gap-6 flex-wrap text-sm" style={{ borderTop: '1px solid #9dbdb9', color: '#4a6e69' }}>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link to="/refund" className="hover:underline">Refund Policy</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
