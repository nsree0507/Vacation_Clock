import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Landmark,
  Wallet,
  ShieldCheck,
  Lock,
  CheckCircle,
  MapPin,
  Calendar,
  Users,
  Loader2,
  Building2,
  KeyRound,
  Hash,
  User,
  X,
} from 'lucide-react'
import { submitBooking } from '@/services/bookingService'
import { useResolvedDestination } from '@/hooks/useResolvedDestination'
 
const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay & more' },
  { id: 'upi', label: 'UPI', icon: Smartphone, description: 'Pay via Google Pay, PhonePe, Paytm & more' },
  { id: 'netbanking', label: 'Net Banking', icon: Landmark, description: 'All major Indian banks supported' },
  { id: 'cod', label: 'Cash on Arrival / Pay Later', icon: Wallet, description: 'Reserve now, pay when you arrive' },
]
 
const BANKS = [
  { id: 'sbi', name: 'State Bank of India' },
  { id: 'hdfc', name: 'HDFC Bank' },
  { id: 'icici', name: 'ICICI Bank' },
  { id: 'axis', name: 'Axis Bank' },
  { id: 'kotak', name: 'Kotak Mahindra Bank' },
  { id: 'pnb', name: 'Punjab National Bank' },
]
 
export default function CheckoutPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
 
  // Resolve destination the same way DynamicItineraryPage does: static
  // sample data first, then a DB Destination record, then a standalone
  // Itinerary (admin-created without a linked Destination).
  const { destination, loading: destinationLoading } = useResolvedDestination(slug)
 
  // Booking details passed in from the itinerary page's booking modal
  const bookingDetails = location.state?.bookingDetails || null
 
  // step: 1 = review, 2 = payment method, 3 = success
  // netBankingStage: null = not started, 'redirecting' | 'login' | 'otp' | 'authorizing'
  const [step, setStep] = useState(1)
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [upiId, setUpiId] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [netBankingStage, setNetBankingStage] = useState(null)
  const [bankLoginData, setBankLoginData] = useState({ username: '', password: '' })
  const [otp, setOtp] = useState('')
  const [bankError, setBankError] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentResult, setPaymentResult] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
 
  if (!destination && destinationLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-16">
          <div className="max-w-3xl mx-auto px-4 text-center text-muted-foreground">Loading your trip…</div>
        </section>
        <Footer />
      </main>
    )
  }
 
  if (!destination) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-serif text-foreground mb-4">Trip Not Found</h1>
            <p className="text-muted-foreground mb-8">We couldn't find the destination for this checkout.</p>
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
 
  if (!bookingDetails) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-serif text-foreground mb-4">No Booking Details Found</h1>
            <p className="text-muted-foreground mb-8">
              Please start your booking from the trip page so we have your travel details.
            </p>
            <button
              onClick={() => navigate(`/packages/${destination.slug}`)}
              className="px-8 py-3 bg-teal text-white font-semibold rounded-full hover:bg-teal-dark transition-colors"
            >
              Go to {destination.name}
            </button>
          </div>
        </section>
        <Footer />
      </main>
    )
  }
 
  const { fullName, email, phone, travelers, tripType, startDate, specialRequest, perPersonCost, totalCost } =
    bookingDetails
 
  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }
 
  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4)
    if (digits.length <= 2) return digits
    return `${digits.slice(0, 2)}/${digits.slice(2)}`
  }
 
  const isPaymentDetailValid = () => {
    if (selectedMethod === 'card') {
      const digits = cardData.number.replace(/\s/g, '')
      return digits.length === 16 && cardData.name.trim().length > 1 && /^\d{2}\/\d{2}$/.test(cardData.expiry) && cardData.cvv.length === 3
    }
    if (selectedMethod === 'upi') {
      return /^[\w.\-]{2,}@[\w]{2,}$/.test(upiId.trim())
    }
    if (selectedMethod === 'netbanking') {
      return Boolean(selectedBank)
    }
    if (selectedMethod === 'cod') {
      return true
    }
    return false
  }
 
  const handlePay = async () => {
    setErrorMsg(null)
    setIsProcessing(true)
 
    try {
      const bookingResult = await submitBooking({
        name: fullName,
        email,
        phone,
        travelers,
        package: destination.name,
        destination: destination.region || destination.name,
        startDate,
        totalAmount: totalCost,
        paymentMethod: selectedMethod,
      })
 
      // Simulate gateway processing time for card/UPI; COD confirms instantly
      const delay = selectedMethod === 'cod' ? 600 : 1800
      await new Promise((resolve) => setTimeout(resolve, delay))
 
      setPaymentResult({
        bookingId: bookingResult?.bookingId || `BK-${new Date().getFullYear()}-${Math.floor(Math.random() * 99999)}`,
        method: selectedMethod,
        paidAt: new Date(),
        isTemporary: bookingResult?.isTemporary || false,
      })
      setStep(3)
    } catch (err) {
      console.error('Payment error:', err)
      setErrorMsg('Something went wrong while confirming your payment. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }
 
  const bankName = (id) => BANKS.find((b) => b.id === id)?.name || 'your bank'
 
  // Net Banking: "Pay Now" -> redirect screen -> bank login -> OTP -> back to site with confirmation
  const handleNetBankingPayNow = () => {
    setBankError(null)
    setNetBankingStage('redirecting')
    setTimeout(() => setNetBankingStage('login'), 1400)
  }
 
  const handleBankLoginSubmit = (e) => {
    e.preventDefault()
    setBankError(null)
    if (!bankLoginData.username.trim() || !bankLoginData.password.trim()) {
      setBankError('Please enter both your User ID and Password to continue.')
      return
    }
    setNetBankingStage('authorizing')
    setTimeout(() => setNetBankingStage('otp'), 1000)
  }
 
  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setBankError(null)
    if (!/^\d{6}$/.test(otp.trim())) {
      setBankError('Enter the 6-digit OTP sent to your registered mobile number.')
      return
    }
    setNetBankingStage('authorizing')
 
    // Brief authorization delay to mimic the bank confirming the OTP, then
    // redirect back to the merchant site and complete the booking.
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setNetBankingStage(null)
    await handlePay()
  }
 
  const handleCancelBankLogin = () => {
    setNetBankingStage(null)
    setBankLoginData({ username: '', password: '' })
    setOtp('')
    setBankError(null)
  }
 
  const methodLabel = (id) => PAYMENT_METHODS.find((m) => m.id === id)?.label || ''
 
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
 
      <section className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              {step !== 3 && (
                <button
                  onClick={() => (step === 1 ? navigate(-1) : setStep(step - 1))}
                  aria-label="Go back"
                  className="p-2.5 rounded-full hover:bg-card border border-border transition-colors"
                >
                  <ArrowLeft size={20} className="text-foreground" />
                </button>
              )}
              <div>
                <h1 className="text-3xl md:text-4xl font-serif text-foreground">Checkout</h1>
                <p className="text-muted-foreground text-sm mt-1">{destination.name}</p>
              </div>
            </div>
 
            {/* Step indicator */}
            {step !== 3 && (
              <div className="hidden sm:flex items-center gap-2 text-sm font-medium">
                <span className={step === 1 ? 'text-teal' : 'text-muted-foreground'}>1. Review</span>
                <span className="text-muted-foreground">→</span>
                <span className={step === 2 ? 'text-teal' : 'text-muted-foreground'}>2. Payment</span>
              </div>
            )}
          </div>
 
          <AnimatePresence mode="wait">
            {/* STEP 1: Review booking details */}
            {step === 1 && (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="grid gap-6 lg:grid-cols-[1fr_340px]"
              >
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8">
                  <h2 className="text-xl font-serif text-gray-900 mb-6">Trip & Traveler Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Full Name</p>
                      <p className="font-semibold text-gray-900">{fullName}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Email</p>
                      <p className="font-semibold text-gray-900 break-all">{email}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Phone</p>
                      <p className="font-semibold text-gray-900">{phone}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Travelers</p>
                      <p className="font-semibold text-gray-900">{travelers} {parseInt(travelers) === 1 ? 'Traveler' : 'Travelers'}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Trip Type</p>
                      <p className="font-semibold text-gray-900">{tripType}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Start Date</p>
                      <p className="font-semibold text-gray-900">{startDate || 'Not specified'}</p>
                    </div>
                  </div>
                  {specialRequest && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Special Request</p>
                      <p className="text-sm text-gray-700">{specialRequest}</p>
                    </div>
                  )}
                </div>
 
                {/* Price summary sidebar */}
                <div className="rounded-2xl bg-teal text-white p-6 shadow-lg h-fit space-y-4">
                  <h3 className="text-lg font-serif mb-2">Price Summary</h3>
                  <div className="flex justify-between text-white/85 text-sm">
                    <span>Per Person</span>
                    <span>₹{perPersonCost?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/85 text-sm">
                    <span>Travelers</span>
                    <span>×{travelers}</span>
                  </div>
                  <div className="border-t border-white/20 pt-4 flex justify-between items-baseline">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold">₹{totalCost?.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full mt-2 py-3 bg-white text-teal font-semibold rounded-full hover:bg-white/90 transition-colors"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </motion.div>
            )}
 
            {/* STEP 2: Payment method selection */}
            {step === 2 && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="grid gap-6 lg:grid-cols-[1fr_340px]"
              >
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8">
                  <h2 className="text-xl font-serif text-gray-900 mb-2">Choose Payment Method</h2>
                  <p className="text-sm text-gray-500 mb-6">Select how you'd like to pay for this trip.</p>
 
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {PAYMENT_METHODS.map((method) => {
                      const Icon = method.icon
                      const isSelected = selectedMethod === method.id
                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`text-left p-4 rounded-xl border-2 transition-colors flex items-start gap-3 ${
                            isSelected ? 'border-teal bg-teal/5' : 'border-gray-200 hover:border-teal/40'
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg ${isSelected ? 'bg-teal text-white' : 'bg-gray-100 text-gray-600'}`}
                          >
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{method.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{method.description}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
 
                  {/* Method-specific fields */}
                  <AnimatePresence mode="wait">
                    {selectedMethod === 'card' && (
                      <motion.div
                        key="card-fields"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 overflow-hidden"
                      >
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">Card Number</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={cardData.number}
                            onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">Name on Card</label>
                          <input
                            type="text"
                            value={cardData.name}
                            onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                            placeholder="As shown on card"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Expiry</label>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={cardData.expiry}
                              onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                              placeholder="MM/YY"
                              maxLength={5}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">CVV</label>
                            <input
                              type="password"
                              inputMode="numeric"
                              value={cardData.cvv}
                              onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                              placeholder="•••"
                              maxLength={3}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
 
                    {selectedMethod === 'upi' && (
                      <motion.div
                        key="upi-fields"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <label className="block text-sm font-semibold text-gray-900 mb-2">UPI ID</label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@upi"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                        />
                      </motion.div>
                    )}
 
                    {selectedMethod === 'netbanking' && (
                      <motion.div
                        key="netbanking-fields"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Select Bank</label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                        >
                          <option value="">Choose your bank</option>
                          {BANKS.map((bank) => (
                            <option key={bank.id} value={bank.id}>
                              {bank.name}
                            </option>
                          ))}
                        </select>
                      </motion.div>
                    )}
 
                    {selectedMethod === 'cod' && (
                      <motion.div
                        key="cod-fields"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800"
                      >
                        Your spot will be reserved now. Full payment of ₹{totalCost?.toLocaleString()} will be collected on arrival.
                      </motion.div>
                    )}
                  </AnimatePresence>
 
                  {errorMsg && (
                    <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
                      {errorMsg}
                    </div>
                  )}
 
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-6">
                    <Lock size={14} />
                    This is a demo checkout — no real payment is processed.
                  </div>
                </div>
 
                {/* Price summary sidebar */}
                <div className="rounded-2xl bg-teal text-white p-6 shadow-lg h-fit space-y-4 sticky top-24">
                  <h3 className="text-lg font-serif mb-2">Order Summary</h3>
                  <div className="flex justify-between text-white/85 text-sm">
                    <span>{destination.name}</span>
                    <span>{travelers} × ₹{perPersonCost?.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/20 pt-4 flex justify-between items-baseline">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold">₹{totalCost?.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={selectedMethod === 'netbanking' ? handleNetBankingPayNow : handlePay}
                    disabled={!isPaymentDetailValid() || isProcessing}
                    className="w-full mt-2 py-3 bg-white text-teal font-semibold rounded-full hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Processing...
                      </>
                    ) : selectedMethod === 'cod' ? (
                      'Confirm Reservation'
                    ) : selectedMethod === 'netbanking' ? (
                      'Pay Now'
                    ) : (
                      `Pay ₹${totalCost?.toLocaleString()}`
                    )}
                  </button>
                  <div className="flex items-center gap-2 text-xs text-white/70 justify-center">
                    <ShieldCheck size={14} />
                    Secure checkout
                  </div>
                </div>
              </motion.div>
            )}
 
            {/* STEP 3: Success / payment details */}
            {step === 3 && paymentResult && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.5, type: 'spring' }}
                  className="flex justify-center mb-6"
                >
                  <CheckCircle size={72} className="text-teal" strokeWidth={1.5} />
                </motion.div>
 
                <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-3">
                  {selectedMethod === 'cod' ? 'Reservation Confirmed!' : 'Payment Successful!'}
                </h1>
                <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
                  {selectedMethod === 'cod'
                    ? `Your trip to ${destination.name} is reserved. Please keep ₹${totalCost?.toLocaleString()} ready for payment on arrival.`
                    : `Your payment for the trip to ${destination.name} has been received. A confirmation email has been sent to ${email}.`}
                </p>
 
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-10 text-left max-w-xl mx-auto">
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
                    <p className="text-2xl font-bold text-teal font-mono">{paymentResult.bookingId}</p>
                  </div>
 
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                        <MapPin size={16} className="text-teal" /> Destination
                      </p>
                      <p className="font-semibold text-foreground">{destination.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                        <Calendar size={16} className="text-teal" /> Start Date
                      </p>
                      <p className="font-semibold text-foreground">{startDate || 'To be confirmed'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                        <Users size={16} className="text-teal" /> Travelers
                      </p>
                      <p className="font-semibold text-foreground">{travelers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                      <p className="font-semibold text-foreground">
                        {methodLabel(selectedMethod)}
                        {selectedMethod === 'netbanking' && selectedBank && (
                          <span className="block text-sm font-normal text-muted-foreground mt-0.5">
                            via {bankName(selectedBank)}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
 
                  <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {selectedMethod === 'cod' ? 'Amount Due on Arrival' : 'Amount Paid'}
                      </p>
                      <p className="text-xs text-gray-400">
                        {paymentResult.paidAt.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                      </p>
                    </div>
                    <p className="text-3xl font-bold text-teal">₹{totalCost?.toLocaleString()}</p>
                  </div>
                </div>
 
                <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => navigate('/packages')}
                    className="px-8 py-3.5 bg-teal text-white font-semibold rounded-full hover:bg-teal-dark transition-colors"
                  >
                    Continue Exploring Packages
                  </button>
                  <button
                    onClick={() => navigate(`/packages/${destination.slug}`)}
                    className="px-8 py-3.5 bg-white border border-gray-200 text-foreground font-semibold rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Back to {destination.name}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
 
      {/* Simulated Net Banking redirect overlay */}
      <AnimatePresence>
        {netBankingStage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              {/* Redirecting */}
              {netBankingStage === 'redirecting' && (
                <div className="p-10 text-center">
                  <Loader2 size={40} className="text-teal animate-spin mx-auto mb-5" />
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Redirecting to {bankName(selectedBank)}</h2>
                  <p className="text-sm text-gray-500">
                    Please wait while we securely connect you to your bank's net banking portal...
                  </p>
                </div>
              )}
 
              {/* Bank Login */}
              {netBankingStage === 'login' && (
                <div>
                  {/* Bank-style header */}
                  <div className="bg-[#0b3d2e] px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <p className="font-semibold">{bankName(selectedBank)}</p>
                        <p className="text-xs text-white/70">Net Banking Login</p>
                      </div>
                    </div>
                    <button
                      onClick={handleCancelBankLogin}
                      aria-label="Cancel and return to site"
                      className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
 
                  <form onSubmit={handleBankLoginSubmit} className="p-6 space-y-4">
                    <p className="text-xs text-gray-500 -mt-1 mb-2">
                      You are being asked to pay <span className="font-semibold text-gray-700">₹{totalCost?.toLocaleString()}</span> to Vacation Clock.
                    </p>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">User ID</label>
                      <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={bankLoginData.username}
                          onChange={(e) => setBankLoginData({ ...bankLoginData, username: e.target.value })}
                          placeholder="Internet Banking User ID"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                          autoFocus
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                      <div className="relative">
                        <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          value={bankLoginData.password}
                          onChange={(e) => setBankLoginData({ ...bankLoginData, password: e.target.value })}
                          placeholder="Internet Banking Password"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                        />
                      </div>
                    </div>
 
                    {bankError && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
                        {bankError}
                      </div>
                    )}
 
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#0b3d2e] text-white font-semibold rounded-lg hover:bg-[#0b3d2e]/90 transition-colors"
                    >
                      Login &amp; Authorize Payment
                    </button>
                    <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                      This is a simulated bank login for demo purposes only — no real bank, account, or
                      credentials are involved or transmitted.
                    </p>
                  </form>
                </div>
              )}
 
              {/* OTP / Transaction authentication */}
              {netBankingStage === 'otp' && (
                <div>
                  <div className="bg-[#0b3d2e] px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="font-semibold">{bankName(selectedBank)}</p>
                        <p className="text-xs text-white/70">Transaction Authentication</p>
                      </div>
                    </div>
                    <button
                      onClick={handleCancelBankLogin}
                      aria-label="Cancel and return to site"
                      className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
 
                  <form onSubmit={handleOtpSubmit} className="p-6 space-y-4">
                    <p className="text-sm text-gray-600">
                      Enter the One-Time Password (OTP) sent to your registered mobile number to authorize this
                      payment of <span className="font-semibold text-gray-900">₹{totalCost?.toLocaleString()}</span>.
                    </p>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">One-Time Password</label>
                      <div className="relative">
                        <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          inputMode="numeric"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          placeholder="6-digit OTP"
                          maxLength={6}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg tracking-[0.3em] focus:ring-2 focus:ring-teal focus:border-transparent"
                          autoFocus
                        />
                      </div>
                    </div>
 
                    {bankError && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
                        {bankError}
                      </div>
                    )}
 
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#0b3d2e] text-white font-semibold rounded-lg hover:bg-[#0b3d2e]/90 transition-colors"
                    >
                      Confirm Payment
                    </button>
                    <p className="text-[11px] text-gray-400 text-center">
                      Demo only — enter any 6 digits to continue.
                    </p>
                  </form>
                </div>
              )}
 
              {/* Authorizing */}
              {netBankingStage === 'authorizing' && (
                <div className="p-10 text-center">
                  <Loader2 size={40} className="text-teal animate-spin mx-auto mb-5" />
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Authorizing Payment</h2>
                  <p className="text-sm text-gray-500">
                    Confirming your transaction with {bankName(selectedBank)} and redirecting you back to
                    Vacation Clock...
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
 
      <Footer />
    </main>
  )
}