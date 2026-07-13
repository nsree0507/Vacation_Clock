import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CheckCircle, MapPin, Calendar, Users, DollarSign } from 'lucide-react'

export default function BookingConfirmationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const bookingData = location.state?.bookingData || {}

  // Generate a booking ID if not provided
  const bookingId = bookingData.bookingId || `BOOK-${Date.now()}`

  const handleBackToPackages = () => {
    navigate('/packages')
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="py-20 md:py-24">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
              className="flex justify-center mb-6"
            >
              <CheckCircle size={80} className="text-teal" strokeWidth={1.5} />
            </motion.div>

            {/* Main Message */}
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-lg mx-auto">
              Your booking has been successfully confirmed. We have received your reservation details and will send you a confirmation email shortly.
            </p>

            {/* Booking Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white rounded-3xl shadow-lg p-8 md:p-10 mb-10 border border-gray-100"
            >
              {/* Booking ID */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <p className="text-sm text-muted-foreground mb-2">Booking ID</p>
                <p className="text-2xl font-bold text-teal font-mono">{bookingId}</p>
              </div>

              {/* Booking Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Package Name */}
                <div className="text-left">
                  <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-teal" />
                    Package
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {bookingData.packageName || bookingData.package || 'Travel Package'}
                  </p>
                </div>

                {/* Destination */}
                {bookingData.destination && (
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <MapPin size={16} className="text-teal" />
                      Destination
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {bookingData.destination}
                    </p>
                  </div>
                )}

                {/* Travel Date */}
                <div className="text-left">
                  <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <Calendar size={16} className="text-teal" />
                    Travel Date
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {bookingData.startDate || 'To be confirmed'}
                  </p>
                </div>

                {/* Number of Travelers */}
                <div className="text-left">
                  <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <Users size={16} className="text-teal" />
                    Travelers
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {bookingData.travelers || bookingData.numberOfTravelers || '1'} {parseInt(bookingData.travelers || 1) === 1 ? 'Traveler' : 'Travelers'}
                  </p>
                </div>

                {/* Guest Name */}
                {bookingData.name && (
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground mb-2">Guest Name</p>
                    <p className="text-lg font-semibold text-foreground">
                      {bookingData.name}
                    </p>
                  </div>
                )}

                {/* Email */}
                {bookingData.email && (
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground mb-2">Email</p>
                    <p className="text-lg font-semibold text-foreground break-all">
                      {bookingData.email}
                    </p>
                  </div>
                )}
              </div>

              {/* Total Amount */}
              {bookingData.totalAmount && (
                <div className="pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <DollarSign size={16} className="text-teal" />
                      Total Amount
                    </p>
                    <p className="text-3xl font-bold text-teal">
                      ₹{bookingData.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Confirmation Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-teal/10 border border-teal/20 rounded-2xl p-6 mb-10"
            >
              <p className="text-teal font-semibold">
                ✓ A confirmation email has been sent to {bookingData.email || 'your email address'}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="space-y-3"
            >
              <button
                onClick={handleBackToPackages}
                className="w-full md:w-auto px-12 py-4 bg-teal text-white font-semibold rounded-full hover:bg-teal-dark transition-colors duration-300 inline-block"
              >
                Continue Exploring Packages
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
