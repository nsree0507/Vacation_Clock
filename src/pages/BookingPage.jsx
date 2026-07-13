import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { submitBooking } from '@/services/bookingService'
import { X, ArrowLeft } from 'lucide-react'
import { getStateBySlug } from '@/data/statesData'

export default function BookingPage() {
  const { state: stateSlug } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: '1',
    packageType: 'Adventure',
    startDate: '',
    message: '',
  })
  const [status, setStatus] = useState(null)

  const state = stateSlug ? getStateBySlug(stateSlug) : null

  if (!state) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-serif text-foreground mb-4">Booking Not Found</h1>
            <p className="text-muted-foreground mb-8">The package you're trying to book could not be found.</p>
            <button
              onClick={() => navigate('/packages')}
              className="px-8 py-3 bg-teal text-white font-semibold rounded-full hover:bg-teal-dark transition-colors"
            >
              Back to Packages
            </button>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const bookingResult = await submitBooking({
        ...formData,
        package: state.name,
        destination: state.region,
        totalAmount: totalCost,
      })
      setStatus('success')
      
      // Navigate to confirmation page with booking data
      setTimeout(() => {
        navigate('/booking-confirmation', {
          state: {
            bookingData: {
              bookingId: bookingResult?.bookingId || `BOOK-${Date.now()}`,
              packageName: state.name,
              destination: state.region,
              startDate: formData.startDate,
              travelers: formData.travelers,
              numberOfTravelers: formData.travelers,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              totalAmount: perPersonCost * parseInt(formData.travelers),
            }
          }
        })
      }, 500)
    } catch (error) {
      console.error('Booking error:', error)
      setStatus('error')
    }
  }

  const perPersonCost = parseInt(state.price.replace(/,/g, ''))
  const totalCost = perPersonCost * parseInt(formData.travelers)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header with Back Button */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-serif text-foreground mb-2">Book Your Trip</h1>
                <p className="text-muted-foreground">{state.name}</p>
              </div>
              <button
                onClick={() => navigate(`/packages/${state.slug}`)}
                className="p-3 rounded-full hover:bg-card transition-colors"
              >
                <ArrowLeft size={24} className="text-foreground" />
              </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
              {/* Booking Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone & Travelers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">Number of Travelers *</label>
                      <select
                        value={formData.travelers}
                        onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                        className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal"
                        required
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Traveler' : 'Travelers'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Travel Date & Package Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">Travel Date *</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">Package Type</label>
                      <select
                        value={formData.packageType}
                        onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                        className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal"
                      >
                        <option value="Adventure">Adventure</option>
                        <option value="Relaxation">Relaxation</option>
                        <option value="Romantic">Romantic</option>
                        <option value="Family">Family</option>
                        <option value="Spiritual">Spiritual</option>
                        <option value="Wildlife">Wildlife</option>
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">Special Requests</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      placeholder="Any special requirements, dietary restrictions, or preferences?"
                      className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-teal text-white font-semibold rounded-full hover:bg-teal-dark transition-colors disabled:opacity-50 md:hidden"
                  >
                    {status === 'loading' ? 'Processing...' : 'Confirm Booking'}
                  </button>

                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-teal/10 border border-teal/30"
                    >
                      <p className="text-teal font-medium">✓ Booking request submitted successfully! Redirecting...</p>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-red-50 border border-red-200"
                    >
                      <p className="text-red-600 font-medium">✕ Error submitting booking. Please try again.</p>
                    </motion.div>
                  )}
                </form>
              </div>

              {/* Pricing Sidebar */}
              <div className="sticky top-24 h-fit">
                <div className="rounded-3xl bg-card p-6 shadow-sm space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Pricing Breakdown</h3>
                  </div>

                  {/* Per Person Cost */}
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="text-muted-foreground">Per Person Cost</span>
                    <span className="font-semibold text-foreground">₹{perPersonCost.toLocaleString()}</span>
                  </div>

                  {/* Number of Travelers */}
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="text-muted-foreground">Number of Travelers</span>
                    <span className="font-semibold text-foreground">×{formData.travelers}</span>
                  </div>

                  {/* Total Cost */}
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-foreground font-semibold">Total Cost</span>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-teal">₹{totalCost.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Desktop Submit Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      const form = document.querySelector('form')
                      if (form) form.dispatchEvent(new Event('submit', { bubbles: true }))
                    }}
                    disabled={status === 'loading'}
                    className="hidden md:block w-full py-3 bg-teal text-white font-semibold rounded-full hover:bg-teal-dark transition-colors disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </div>

                {/* Package Info */}
                <div className="rounded-3xl bg-secondary/30 p-6 mt-6">
                  <p className="text-sm text-muted-foreground mb-2">Package</p>
                  <p className="font-semibold text-foreground">{state.name}</p>
                  <p className="text-sm text-muted-foreground mt-3">{state.duration}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
