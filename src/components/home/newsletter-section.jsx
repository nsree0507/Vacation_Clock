import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const stats = [
  { value: '500+', label: 'Happy Travelers' },
  { value: '120+', label: 'Destinations' },
  { value: '48', label: 'Travel Experts' },
  { value: '4.9', label: 'Average Rating' },
]

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = () => {
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <>
      {/* ── Early Bird Summer Special ── */}
      <section className="py-4 lg:py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl lg:text-6xl font-serif text-teal mb-4">
              Early Bird Summer Special
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Book any package before May 31st and get up to 25% off on your entire trip.
              Plus free airport transfers and a complimentary photoshoot session.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <Link
                to="/packages"
                className="px-6 py-3 bg-teal text-white text-sm font-semibold hover:bg-teal-dark transition-colors"
              >
                Explore Packages
              </Link>
              <a
                href="tel:+911234567890"
                className="flex items-center gap-2 px-6 py-3 border border-border text-sm font-semibold text-foreground hover:border-teal hover:text-teal transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.35 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call Us Now
              </a>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 divide-x divide-border border border-border rounded-xl overflow-hidden"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="py-6 px-4 text-center bg-background">
                <p className="text-2xl lg:text-3xl font-serif font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Travel Inspiration in Your Inbox ── */}
      <section id="contact" className="py-4 lg:py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl lg:text-6xl font-serif text-teal mb-4">
              Travel Inspiration in Your Inbox
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Subscribe to our newsletter for exclusive deals, destination guides, and insider tips from
              our travel experts. No spam, just wanderlust.
            </p>

            <div className="mt-10 flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                placeholder="Enter your email address"
                className="flex-1 border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition"
              />
              <button
                type="button"
                onClick={handleSubscribe}
                className="px-5 py-3 bg-teal text-white text-sm font-semibold hover:bg-teal-dark transition-colors whitespace-nowrap"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </div>

            <p className="mt-4 text-xs tracking-widest uppercase text-muted-foreground/70">
              By subscribing, you agree to receive travel updates. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
