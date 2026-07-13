import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GallerySection } from '@/components/home/gallery-section'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { sendContactForm } from '@/services/contactService'
 
const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['123 Travel Street', 'Mumbai, Maharashtra 400001', 'India'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+91 98765 43210', '+91 98765 43211', 'Toll Free: 1800 123 4567'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@vacationclock.com', 'support@vacationclock.com', 'bookings@vacationclock.com'],
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Monday - Friday: 9AM - 8PM', 'Saturday: 10AM - 6PM', 'Sunday: Closed'],
  },
]
 
const faqs = [
  {
    question: 'How do I book a package?',
    answer: 'You can book directly through our website by selecting a package and filling out the booking form. Our team will contact you within 24 hours to confirm details.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Cancellations made 30 days before departure receive a full refund. 15-30 days: 50% refund. Less than 15 days: No refund. Travel insurance is recommended.',
  },
  {
    question: 'Do you offer customized packages?',
    answer: 'Yes! We specialize in creating personalized itineraries based on your preferences, budget, and travel dates. Contact us for a custom quote.',
  },
  {
    question: 'Is travel insurance included?',
    answer: 'Basic travel insurance is included in most packages. We also offer comprehensive insurance upgrades for additional coverage.',
  },
]
 
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState(null)
 
  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    try {
      await sendContactForm(formData)
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error) {
      setStatus('error')
    }
  }
 
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-30 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-serif text-teal mb-4">Get in Touch</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions about your next adventure? Our travel experts are here to help you plan the perfect journey.
            </p>
          </motion.div>
 
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-sm">
                <h2 className="text-2xl font-serif text-foreground mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Your Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Subject *</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="booking">Booking Inquiry</option>
                        <option value="custom">Custom Package Request</option>
                        <option value="support">Support</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Your Message *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your travel plans..."
                      rows={5}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-teal text-white font-semibold rounded-full hover:bg-teal-dark transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                  {status === 'success' && (
                    <p className="text-sm text-teal mt-3">Your message has been sent successfully.</p>
                  )}
                  {status === 'error' && (
                    <p className="text-sm text-red-500 mt-3">There was an error sending your message. Please try again.</p>
                  )}
                </form>
              </div>
            </motion.div>
 
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {contactInfo.map((info) => (
                <div key={info.title} className="bg-card rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon size={24} className="text-teal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                      {info.details.map((detail) => (
                        <p key={detail} className="text-sm text-muted-foreground">{detail}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
 
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-serif text-teal mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Quick answers to common questions</p>
          </motion.div>
 
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <GallerySection />
      <Footer />
    </main>
  )
}