import { useState, useRef, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GallerySection } from '@/components/home/gallery-section'
import { MapPin, Star, Tag, Check, X, Maximize2, ArrowLeft } from 'lucide-react'
import images from '@/utils/localImages'
import { getPlaceBySlug } from '@/data/placesData'
import { BookingSidebarCard } from '@/components/itinerary/BookingSidebarCard'
import { ExperienceHighlights } from '@/components/itinerary/ExperienceHighlights'
import { JourneyTimeline } from '@/components/itinerary/JourneyTimeline'
import { ExpeditionMap } from '@/components/itinerary/ExpeditionMap'
import itineraryApi from '@/services/itineraryApi'
import destinationApi from '@/services/destinationApi'
import { useResolvedDestination } from '@/hooks/useResolvedDestination'
 
export default function DynamicItineraryPage() {
  const { state: stateSlug, id: placeSlug } = useParams()
  const navigate = useNavigate()
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [activeDay, setActiveDay] = useState(0)
  const [showExpandedMap, setShowExpandedMap] = useState(false)
  const timelineContainerRef = useRef(null)
  const [bookingFormData, setBookingFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelers: '1',
    tripType: 'Standard',
    startDate: '',
    specialRequest: '',
  })
 
  // Get place data first, then fall back to state data
  let dataSource = 'state' // 'state' or 'place'
  const slug = placeSlug || stateSlug
  const { destination: state, loading: routeDestinationLoading } = useResolvedDestination(slug)

  if (slug && state && state.slug) {
    dataSource = getPlaceBySlug(slug) ? 'place' : 'state'
  }

  // Live overrides from the DB (Manage Destinations / Manage Itineraries),
  // so admin edits show up here instead of only ever showing the static
  // sample content baked into src/data. Falls back to the local data for
  // anything the admin hasn't set up yet (gallery, map, etc.).
  const [dbDestination, setDbDestination] = useState(null)
  const [dbItinerary, setDbItinerary] = useState(null)
 
  useEffect(() => {
    if (!state?.name) return
    let isMounted = true
 
    const loadDbOverrides = async () => {
      try {
        const destRes = await destinationApi.getAll({ search: state.name })
        const matchedDestination = (destRes.data?.data || []).find(
          (d) => d.name?.toLowerCase() === state.name.toLowerCase()
        )
        if (isMounted && matchedDestination) setDbDestination(matchedDestination)
 
        const itinerariesRes = await itineraryApi.getAll()
        const allItineraries = itinerariesRes.data?.data || []
        const matchedItinerary = state.__itineraryId
          ? allItineraries.find((it) => it._id === state.__itineraryId)
          : allItineraries.find((it) =>
              it.destinations?.some((d) => d.toLowerCase() === state.name.toLowerCase())
            )
        if (isMounted && matchedItinerary) setDbItinerary(matchedItinerary)
      } catch (err) {
        // Non-critical — the page still works fine with the local sample data.
      }
    }
 
    loadDbOverrides()
    return () => {
      isMounted = false
    }
  }, [state?.name])
 
  // Merge: DB data (if an admin has set it up for this destination) takes
  // priority over the static local data.
  const display = useMemo(() => {
    if (!state) return null
 
    const duration = dbItinerary
      ? `${dbItinerary.duration} Day${dbItinerary.duration === 1 ? '' : 's'}`
      : state.duration
 
    return {
      ...state,
      price: dbItinerary ? String(dbItinerary.price) : state.price,
      duration,
      rating: dbDestination?.rating ?? state.rating,
      description: dbItinerary?.description || state.description,
      highlights: dbItinerary?.experienceHighlights?.length
        ? dbItinerary.experienceHighlights
        : state.highlights,
      region: dbDestination?.state || state.region || state.state,
      category: dbDestination?.category || state.category || state.primaryCategory || 'General',
      included: dbItinerary?.whatsIncluded?.length ? dbItinerary.whatsIncluded : null,
      notIncluded: dbItinerary?.whatsNotIncluded?.length ? dbItinerary.whatsNotIncluded : null,
      itinerary: dbItinerary?.dayWisePlan?.some((d) => d.title)
        ? dbItinerary.dayWisePlan.map((d, i) => ({
            title: d.title || `Day ${i + 1}`,
            description: d.description || '',
            tags: d.activities || [],
          }))
        // `state.itinerary` doesn't exist on plain DB destination records
        // (only on the static sample data), so always fall back to an
        // empty array — leaving it `undefined` crashes ExpeditionMap/
        // JourneyTimeline, which call `.length`/`.map` on this value.
        : state.itinerary || [],
    }
  }, [state, dbDestination, dbItinerary])
 
  // Scroll to top on page load
  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    const t = setTimeout(() => {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }, 0)
    return () => clearTimeout(t)
  }, [])
 
  // Handle ESC key to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowBookingModal(false)
        setShowExpandedMap(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
 
  // Try to get state data from slug or id. While the DB lookup for a
  // non-static (admin-created) destination is still in flight, show a
  // lightweight loading state instead of flashing "Destination Not Found".
  if (!state && routeDestinationLoading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">Loading itinerary…</div>
        </section>
        <Footer />
      </main>
    )
  }

  if (!state) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-serif text-foreground mb-4">Destination Not Found</h1>
            <p className="text-muted-foreground mb-8">Sorry, we couldn't find the destination you're looking for.</p>
            <button
              onClick={() => navigate('/packages')}
              className="px-8 py-3 bg-teal text-white font-semibold rounded-full hover:bg-teal-dark transition-colors"
            >
              Back to Packages
            </button>
          </div>
        </section>
        <GallerySection />
      <Footer />
      </main>
    )
  }
 
  const handleBookingSubmit = (e) => {
    e.preventDefault()
    setShowBookingModal(false)
    navigate(`/checkout/${state.slug}`, {
      state: {
        bookingDetails: {
          ...bookingFormData,
          perPersonCost,
          totalCost,
        },
      },
    })
  }
 
  const handleMapRenderPremium = () => {
    const destinations = display.itinerary.map((day, idx) => ({
      name: day.title,
      day: idx + 1,
      coords: `${30 + idx * 2},${75 - idx * 10}`,
    }))
    return destinations
  }
 
  const handleBookNow = () => {
    setShowBookingModal(true)
  }
 
  const handleDownloadItinerary = () => {
    const lines = [
      `${state.name} Itinerary`,
      `Duration: ${display.duration}`,
      `Price per person: ₹${display.price}`,
      '',
      ...display.itinerary.map((day, idx) => `Day ${idx + 1}: ${day.title}\n${day.description}\n`),
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${state.slug || state.name}-itinerary.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
 
  const defaultIncludedItems = [
    'Accommodation in star hotels',
    'Daily breakfast and dinner',
    'All sightseeing and activities',
    'Professional tour guide',
    'Transportation within the destination',
    'Travel insurance',
  ]
 
  const defaultNotIncludedItems = [
    'Airfare or train tickets',
    'Personal expenses',
    'Meals not mentioned in itinerary',
    'Activities outside the plan',
    'Tips and gratuities',
  ]
 
  // DB destination records store the photo under `imageUrl`, while the
  // static sample data (and itinerary-linked destinations) use `image`.
  const heroImage = state.image || state.imageUrl || images.itinerary
 
  const includedItems = display.included || defaultIncludedItems
  const notIncludedItems = display.notIncluded || defaultNotIncludedItems
 
  // `display.price` can be a plain Number when it falls back to a raw DB
  // destination record (only itineraries store price as a String), so
  // coerce to a string before calling .replace to avoid a crash.
  const perPersonCost = parseInt(String(display?.price ?? '0').replace(/,/g, '') || '0')
  const totalCost = perPersonCost * parseInt(bookingFormData.travelers)
 
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
 
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] mt-20 lg:mt-24 overflow-hidden">
        <img
          src={heroImage}
          alt={state.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
 
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="absolute top-6 left-6 md:top-8 md:left-8 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col justify-end items-start p-6 md:p-12"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/80 mb-2">Best Seller</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
            {state.name}
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">{display.description}</p>
        </motion.div>
      </section>
 
      <section className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.5fr] items-start"
          >
            {/* Booking Sidebar */}
            <aside className="min-w-0 space-y-6 lg:sticky lg:top-24 order-1 lg:order-none">
              <BookingSidebarCard
                state={state}
                perPersonCost={perPersonCost}
                totalCost={totalCost}
                onBookNow={handleBookNow}
                onDownload={handleDownloadItinerary}
              />
 
              {/* Support Card */}
              <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-teal/5 border border-sky-200 p-6 shadow-lg">
                <h3 className="text-lg font-serif text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our travel experts are available to help customize your trip.
                </p>
                <a
                  href="/contact"
                  className="inline-block w-full text-center px-4 py-3 rounded-full bg-teal text-white font-semibold hover:bg-teal-dark transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </aside>
 
            <article className="min-w-0 space-y-8 order-2 lg:order-none">
              {/* Trip Summary Card */}
              <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-semibold">Duration</p>
                  <p className="text-lg font-bold text-gray-900">{display.duration}</p>
                </div>
                <div className="text-center border-l border-r border-gray-200">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-semibold">Rating</p>
                  <div className="flex items-center justify-center gap-1">
                    <Star size={16} className="text-amber-400 fill-amber-400" />
                    <p className="text-lg font-bold text-gray-900">{display.rating}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-semibold">Starting Price</p>
                  <p className="text-lg font-bold text-teal">₹{display.price}</p>
                </div>
              </div>
 
              {/* Key Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin size={18} className="text-teal" />
                    <span className="text-xs uppercase tracking-wide font-semibold text-gray-600">Region</span>
                  </div>
                  <p className="text-gray-700 font-medium">{display.region}</p>
                </div>
                <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Tag size={18} className="text-teal" />
                    <span className="text-xs uppercase tracking-wide font-semibold text-gray-600">Category</span>
                  </div>
                  <p className="text-gray-700 font-medium">{display.category}</p>
                </div>
              </div>
 
              {/* Experience Highlights */}
              <ExperienceHighlights highlights={display.highlights} />
 
              {/* Journey Timeline */}
              <div ref={timelineContainerRef}>
                <JourneyTimeline
                  days={display.itinerary}
                  image={heroImage}
                  activeDay={activeDay}
                  onSelectDay={setActiveDay}
                />
              </div>
 
              {/* Included/Not Included */}
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-lg">
                  <h3 className="text-lg font-serif text-gray-900 mb-6 flex items-center gap-2">
                    <Check size={20} className="text-teal" />
                    What's Included
                  </h3>
                  <ul className="space-y-3">
                    {includedItems.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-gray-700">
                        <span className="text-teal font-bold mt-0.5">✓</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-lg">
                  <h3 className="text-lg font-serif text-gray-900 mb-6 flex items-center gap-2">
                    <X size={20} className="text-red-500" />
                    What's Not Included
                  </h3>
                  <ul className="space-y-3">
                    {notIncludedItems.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-gray-700">
                        <span className="text-red-500 font-bold mt-0.5">✕</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
 
              {/* Premium Interactive Expedition Route */}
              <div className="space-y-4">
                <div className="rounded-2xl bg-white border border-gray-100 shadow-lg p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-2xl font-serif text-gray-900">Expedition Route</h2>
                    <button
                      onClick={() => setShowExpandedMap(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-full hover:bg-teal-dark transition-colors text-sm font-semibold"
                    >
                      <Maximize2 size={16} />
                      Expand Map
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Traversing the heart of {display.region}
                  </p>
 
                  {/* Interactive Map Preview */}
                  <div className="rounded-2xl overflow-hidden border border-gray-100 h-96">
                    <ExpeditionMap state={display} activeDay={activeDay} />
                  </div>
                </div>
              </div>
 
 
              {/* More Places Section */}
              {state.popularDestinations && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-serif text-gray-900">More Places in {state.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {state.popularDestinations.map((place, index) => (
                    <motion.div
                      key={place}
                      whileHover={{ translateY: -6 }}
                      className="rounded-2xl overflow-hidden border border-gray-100 shadow-lg bg-white cursor-pointer"
                    >
                      <div className="aspect-video bg-gradient-to-br from-teal/10 to-teal/5 flex items-center justify-center overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <p className="text-center font-serif text-xl text-gray-900 px-4 relative z-10">{place}</p>
                      </div>
                      <div className="p-4">
                        <p className="text-xs uppercase tracking-widest font-semibold text-gray-500 mb-2">{display.region}</p>
                        <p className="font-semibold text-gray-900">{place}</p>
                      </div>
                    </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </article>
 
          </motion.div>
        </div>
      </section>
 
      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBookingModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
 
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
                {/* Modal Header */}
                <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between flex-shrink-0">
                  <h2 className="text-2xl font-serif text-gray-900">Book Your Trip</h2>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-gray-600" />
                  </button>
                </div>
 
                {/* Modal Content */}
                <div className="p-6 space-y-6 overflow-y-auto overflow-x-hidden">
                  <form onSubmit={handleBookingSubmit} className="space-y-5">
                    {/* Full Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
                        <input
                          type="text"
                          value={bookingFormData.fullName}
                          onChange={(e) => setBookingFormData({ ...bookingFormData, fullName: e.target.value })}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                        <input
                          type="email"
                          value={bookingFormData.email}
                          onChange={(e) => setBookingFormData({ ...bookingFormData, email: e.target.value })}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
 
                    {/* Phone & Travelers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          value={bookingFormData.phone}
                          onChange={(e) => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                          required
                        />
                      </div>
                      <div className="relative z-30">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Number of Travelers *</label>
                        <select
                          value={bookingFormData.travelers}
                          onChange={(e) => setBookingFormData({ ...bookingFormData, travelers: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
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
 
                    {/* Trip Type & Start Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative z-20">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Trip Type *</label>
                        <select
                          value={bookingFormData.tripType}
                          onChange={(e) => setBookingFormData({ ...bookingFormData, tripType: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                          required
                        >
                          <option value="Standard">Standard</option>
                          <option value="Premium">Premium</option>
                          <option value="Luxury">Luxury</option>
                          <option value="Custom">Custom</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Preferred Start Date *</label>
                        <input
                          type="date"
                          value={bookingFormData.startDate}
                          onChange={(e) => setBookingFormData({ ...bookingFormData, startDate: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
 
                    {/* Special Request */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Special Request (max 500 characters)</label>
                      <textarea
                        value={bookingFormData.specialRequest}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, specialRequest: e.target.value.substring(0, 500) })}
                        rows={4}
                        placeholder="Any special requirements or preferences?"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">{bookingFormData.specialRequest.length}/500 characters</p>
                    </div>
 
                    {/* Price Summary */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
                      <h3 className="font-semibold text-gray-900 mb-3">Price Summary</h3>
                      <div className="flex justify-between text-gray-700">
                        <span>Per Person Price</span>
                        <span>₹{perPersonCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Number of Travelers</span>
                        <span>×{bookingFormData.travelers}</span>
                      </div>
                      <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-bold text-lg">
                        <span>Total Estimated Price</span>
                        <span className="text-teal">₹{totalCost.toLocaleString()}</span>
                      </div>
                    </div>
 
                    {/* Action Button */}
                    <button
                      type="submit"
                      className="w-full py-4 bg-teal text-white font-bold text-lg rounded-full hover:bg-teal-dark transition-colors shadow-lg"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
 
      {/* Expanded Fullscreen Map Modal */}
      <AnimatePresence>
        {showExpandedMap && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExpandedMap(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
 
            {/* Fullscreen Map Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex flex-col"
            >
              {/* Header */}
              <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h2 className="text-2xl font-serif text-gray-900">Full Expedition Route</h2>
                <button
                  onClick={() => setShowExpandedMap(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={28} className="text-gray-600" />
                </button>
              </div>
 
              {/* Map Content */}
              <div className="flex-1 overflow-hidden">
                <ExpeditionMap state={display} activeDay={activeDay} expanded />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
 
      <GallerySection />
      <Footer />
    </main>
  )
}