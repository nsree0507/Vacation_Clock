import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { bookingApi } from '@/services/bookingApi'
import { formatCurrency } from '@/utils/helpers'
import {
  Calendar,
  MapPin,
  Users,
  Loader,
  Loader2,
  AlertCircle,
  PlaneTakeoff,
  CreditCard,
  Smartphone,
  Landmark,
  Wallet,
  XCircle,
} from 'lucide-react'
 
const STATUS_STYLES = {
  confirmed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
}
 
const PAYMENT_METHODS = {
  card: { label: 'Credit / Debit Card', icon: CreditCard },
  upi: { label: 'UPI', icon: Smartphone },
  netbanking: { label: 'Net Banking', icon: Landmark },
  cod: { label: 'Cash on Arrival / Pay Later', icon: Wallet },
}
 
function formatDate(dateStr) {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}
 
function PaymentMethodRow({ paymentMethod }) {
  const method = PAYMENT_METHODS[paymentMethod]
  const Icon = method?.icon || Wallet
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} className="text-teal" />
      <span>{method?.label || 'Payment method not available'}</span>
    </div>
  )
}
 
function TripCard({ trip, showCancel, onCancel, isCancelling }) {
  const canCancel = showCancel && trip.bookingStatus !== 'cancelled'
 
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-serif font-semibold text-foreground">{trip.destinationName}</h3>
          <p className="text-sm text-muted-foreground">{trip.packageName}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${
            STATUS_STYLES[trip.bookingStatus] || 'bg-gray-100 text-gray-800'
          }`}
        >
          {trip.bookingStatus}
        </span>
      </div>
 
      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-teal" />
          <span>{formatDate(trip.travelDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={16} className="text-teal" />
          <span>
            {trip.travelers} {trip.travelers === 1 ? 'traveler' : 'travelers'}
          </span>
        </div>
        <div className="col-span-2">
          <PaymentMethodRow paymentMethod={trip.paymentMethod} />
        </div>
      </div>
 
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <span className="text-xs text-muted-foreground">Booking ID: {trip.bookingId}</span>
        {trip.totalAmount ? (
          <span className="font-semibold text-foreground">{formatCurrency(trip.totalAmount)}</span>
        ) : null}
      </div>
 
      {canCancel && (
        <div className="mt-4 pt-4 border-t border-border">
          <button
            onClick={() => onCancel(trip)}
            disabled={isCancelling}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isCancelling ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Cancelling...
              </>
            ) : (
              <>
                <XCircle size={16} />
                Cancel Trip
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
 
export default function MyTripsPage() {
  const [tab, setTab] = useState('upcoming')
  const [upcoming, setUpcoming] = useState([])
  const [previous, setPrevious] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const [cancellingId, setCancellingId] = useState(null)
  const [cancelError, setCancelError] = useState('')
 
  useEffect(() => {
    const stored = localStorage.getItem('vacationClockUser')
    const parsedUser = stored ? JSON.parse(stored) : null
    setUser(parsedUser)
 
    if (!parsedUser?.emailOrPhone && !parsedUser?.id) {
      setLoading(false)
      return
    }
 
    bookingApi
      .getMyBookings({ userId: parsedUser.id, identifier: parsedUser.emailOrPhone })
      .then((res) => {
        setUpcoming(res.data.upcoming || [])
        setPrevious(res.data.previous || [])
        setError('')
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Failed to load your trips')
      })
      .finally(() => setLoading(false))
  }, [])
 
  const trips = tab === 'upcoming' ? upcoming : previous
 
  const handleCancel = async (trip) => {
    const confirmed = window.confirm(
      `Cancel your trip to ${trip.destinationName}? This can't be undone.`
    )
    if (!confirmed) return
 
    setCancelError('')
    setCancellingId(trip._id)
 
    try {
      await bookingApi.cancelMyBooking({
        id: trip._id,
        userId: user?.id,
        identifier: user?.emailOrPhone,
      })
 
      // Move it out of "upcoming" and into "previous" as a cancelled trip
      setUpcoming((prev) => prev.filter((t) => t._id !== trip._id))
      setPrevious((prev) => [{ ...trip, bookingStatus: 'cancelled' }, ...prev])
    } catch (err) {
      setCancelError(err.response?.data?.message || 'Failed to cancel this trip. Please try again.')
    } finally {
      setCancellingId(null)
    }
  }
 
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
 
      <section className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-serif text-teal mb-2">My Trips</h1>
            <p className="text-muted-foreground mb-8">
              {user?.name ? `Here's everything you've booked with us, ${user.name}.` : 'Sign in to see your bookings.'}
            </p>
 
            {!user ? (
              <div className="bg-card border border-border rounded-2xl p-10 text-center">
                <PlaneTakeoff className="mx-auto mb-4 text-teal" size={40} />
                <p className="text-foreground font-medium mb-2">You're not signed in</p>
                <p className="text-muted-foreground mb-6">Sign in to view your upcoming and previous trips.</p>
                <Link
                  to="/"
                  className="inline-block px-6 py-3 bg-teal text-white rounded-full font-medium hover:bg-teal-dark transition-colors"
                >
                  Go to Homepage
                </Link>
              </div>
            ) : (
              <>
                {/* Tabs */}
                <div className="inline-flex bg-muted rounded-full p-1 mb-8">
                  {[
                    { key: 'upcoming', label: `Upcoming (${upcoming.length})` },
                    { key: 'previous', label: `Previous (${previous.length})` },
                  ].map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                        tab === t.key ? 'bg-teal text-white' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
 
                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}
 
                {cancelError && (
                  <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{cancelError}</p>
                  </div>
                )}
 
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader className="animate-spin text-teal" size={40} />
                  </div>
                ) : trips.length === 0 ? (
                  <div className="bg-card border border-border rounded-2xl p-10 text-center">
                    <MapPin className="mx-auto mb-4 text-teal" size={36} />
                    <p className="text-foreground font-medium mb-2">
                      {tab === 'upcoming' ? 'No upcoming trips yet' : 'No previous trips yet'}
                    </p>
                    <p className="text-muted-foreground mb-6">
                      {tab === 'upcoming'
                        ? 'Once you book a trip, it will show up here.'
                        : 'Trips you have completed or cancelled will show up here.'}
                    </p>
                    <Link
                      to="/packages"
                      className="inline-block px-6 py-3 bg-teal text-white rounded-full font-medium hover:bg-teal-dark transition-colors"
                    >
                      Explore Packages
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {trips.map((trip) => (
                      <TripCard
                        key={trip._id}
                        trip={trip}
                        showCancel={tab === 'upcoming'}
                        onCancel={handleCancel}
                        isCancelling={cancellingId === trip._id}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </section>
 
      <Footer />
    </main>
  )
}