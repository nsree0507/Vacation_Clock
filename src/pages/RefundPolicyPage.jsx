import { Link } from 'react-router-dom'
import { Navbar } from '../components/navbar'
import { Footer } from '../components/footer'

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <div className="mt-23 py-16 px-4" style={{ backgroundColor: '#0a4a42' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-serif text-white mb-4">Refund Policy</h1>
          <p className="text-lg" style={{ color: '#a8d5cf' }}>
            Last updated: June 24, 2024
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <div className="prose max-w-none" style={{ color: '#2d4a46' }}>

          <p className="text-lg mb-8">
            At <strong>Vacation Clock</strong>, we understand that travel plans can change. Our refund
            policy is designed to be fair and transparent so you always know what to expect when
            cancelling or modifying a booking.
          </p>

          {/* Cancellation Table */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: '#0a4a42' }}>
              1. Standard Cancellation Schedule
            </h2>
            <p className="mb-4">
              The following cancellation schedule applies to most packages unless specific terms are
              stated at the time of booking:
            </p>
            <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #9dbdb9' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: '#0a4a42', color: 'white' }}>
                    <th className="text-left px-4 py-3 font-semibold">Cancellation Notice</th>
                    <th className="text-left px-4 py-3 font-semibold">Refund Amount</th>
                    <th className="text-left px-4 py-3 font-semibold">Processing Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['30+ days before travel', '100% of amount paid', 'None'],
                    ['20–29 days before travel', '75% of amount paid', '5% platform fee'],
                    ['15–19 days before travel', '50% of amount paid', '5% platform fee'],
                    ['7–14 days before travel', '25% of amount paid', '5% platform fee'],
                    ['Less than 7 days', 'No refund', '—'],
                    ['No show / no cancellation', 'No refund', '—'],
                  ].map(([notice, refund, fee], i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f8faf9' : 'white' }}>
                      <td className="px-4 py-3">{notice}</td>
                      <td className="px-4 py-3 font-medium">{refund}</td>
                      <td className="px-4 py-3">{fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm" style={{ color: '#4a6e69' }}>
              * Cancellation date is calculated from the first day of travel, not the booking date.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              2. How to Request a Cancellation or Refund
            </h2>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                Log in to your Vacation Clock account and navigate to <strong>My Bookings</strong>
              </li>
              <li>Select the booking you wish to cancel and click <strong>Request Cancellation</strong></li>
              <li>
                Alternatively, email us at{' '}
                <a href="mailto:support@vacationclock.in" style={{ color: '#0a6b5e' }} className="underline">
                  support@vacationclock.in
                </a>{' '}
                with your booking ID, registered email, and reason for cancellation
              </li>
              <li>Our team will confirm receipt within 24 hours and process the refund as per this policy</li>
            </ol>
            <div className="mt-4 p-4 rounded-lg text-sm" style={{ backgroundColor: '#dce9e7', color: '#0a4a42' }}>
              <strong>Important:</strong> Cancellation requests must be made in writing (email or through the portal).
              Verbal cancellations over phone calls will not be accepted.
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              3. Refund Processing Timeline
            </h2>
            <p className="mb-3">Once a cancellation is confirmed and approved:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Credit/Debit Card payments:</strong> 7–10 business days</li>
              <li><strong>UPI / Net Banking:</strong> 3–5 business days</li>
              <li><strong>Wallet payments:</strong> 1–3 business days</li>
              <li><strong>EMI payments:</strong> Subject to your bank's processing time; EMI charges may not be refunded by the bank</li>
            </ul>
            <p className="mt-3">
              Refunds are credited to the original payment source. We do not issue refunds via bank transfer
              or cheque unless the original payment method is no longer valid.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              4. Non-Refundable Items
            </h2>
            <p className="mb-3">The following are non-refundable under all circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Visa processing fees and government charges</li>
              <li>Travel insurance premiums</li>
              <li>Confirmed air or rail tickets issued through third-party providers</li>
              <li>Bookings marked as "Non-refundable" or "Last-minute deals" at the time of purchase</li>
              <li>Any service already rendered (e.g., first night of a hotel stay already completed)</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              5. Cancellations by Vacation Clock
            </h2>
            <p className="mb-3">
              In rare cases, Vacation Clock may need to cancel a booking due to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Natural disasters, floods, or weather-related travel advisories</li>
              <li>Political unrest, security threats, or government travel bans</li>
              <li>Unavailability of confirmed accommodations or services due to provider failure</li>
            </ul>
            <p className="mt-3">
              In all such cases, you will receive a <strong>full refund</strong> of the amount paid
              within 7 business days, or the option to rebook your trip at no additional charge.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              6. Date Change / Rescheduling Policy
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>One free date change is allowed if requested 21+ days before travel (subject to availability)</li>
              <li>Date changes requested within 7–20 days of travel may incur a rescheduling fee of ₹500–₹2,000 per person</li>
              <li>Date changes requested less than 7 days before travel are treated as cancellations</li>
              <li>Rescheduled dates must be within 6 months of the original travel date</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              7. Partial Cancellations
            </h2>
            <p>
              If your group has multiple travellers and only some wish to cancel, partial cancellations
              are accepted. Refunds will be calculated on a per-person basis based on the above schedule.
              Please note that single-room supplements or minimum group size requirements may affect the
              total cost of the remaining booking.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              8. Disputes and Escalations
            </h2>
            <p className="mb-3">
              If you are dissatisfied with a refund decision, you may escalate your concern:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Email us at <a href="mailto:grievance@vacationclock.in" style={{ color: '#0a6b5e' }} className="underline">grievance@vacationclock.in</a> with full details of your booking and concern</li>
              <li>Our grievance team will review your case within 5 business days</li>
              <li>If unresolved, disputes will be handled as per our <Link to="/terms" style={{ color: '#0a6b5e' }} className="underline">Terms of Service</Link> and applicable Indian consumer protection laws</li>
            </ol>
          </section>

          {/* Section 9 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#0a4a42' }}>
              9. Contact Us
            </h2>
            <p className="mb-3">
              For any refund-related queries, please reach out to our support team:
            </p>
            <div className="p-5 rounded-xl" style={{ backgroundColor: '#dce9e7' }}>
              <p><strong>Vacation Clock Support</strong></p>
              <p>Email: <a href="mailto:support@vacationclock.in" style={{ color: '#0a6b5e' }} className="underline">support@vacationclock.in</a></p>
              <p>Response Time: Within 24 hours (Mon–Sat, 9 AM – 6 PM IST)</p>
              <p className="mt-2">
                Or visit our{' '}
                <Link to="/contact" style={{ color: '#0a6b5e' }} className="underline">Contact Page</Link>
              </p>
            </div>
          </section>
        </div>

        {/* Footer links */}
        <div className="mt-12 pt-8 flex gap-6 flex-wrap text-sm" style={{ borderTop: '1px solid #9dbdb9', color: '#4a6e69' }}>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms" className="hover:underline">Terms of Service</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
