import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ExperienceHighlights } from '@/components/itinerary/ExperienceHighlights'
import { Clock, IndianRupee, MapPin, Check, X, ArrowLeft, CalendarDays, Loader } from 'lucide-react'
import itineraryApi from '@/services/itineraryApi'
import destinationApi from '@/services/destinationApi'

const placeholderImage = (name) =>
  `https://placehold.co/1200x600/d1f0ed/008080?text=${encodeURIComponent(name || 'Vacation Clock')}`

export default function PackageDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [itinerary, setItinerary] = useState(null)
  const [destinationImage, setDestinationImage] = useState('')
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    const load = async () => {
      try {
        setLoading(true)
        setNotFound(false)
        const res = await itineraryApi.getById(id)
        const data = res.data?.data
        if (!data) {
          setNotFound(true)
          return
        }
        setItinerary(data)

        // Best-effort lookup of the destination's photo for the hero banner.
        const destinationName = data.destinations?.[0]
        if (destinationName) {
          try {
            const destRes = await destinationApi.getAll({ search: destinationName })
            const match = (destRes.data?.data || []).find(
              (d) => d.name?.toLowerCase() === destinationName.toLowerCase()
            )
            if (match?.imageUrl) setDestinationImage(match.imageUrl)
          } catch {
            // Non-critical — the placeholder image will be used instead.
          }
        }
      } catch (err) {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    if (id) load()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-16 flex justify-center">
          <Loader className="animate-spin text-teal" size={40} />
        </div>
        <Footer />
      </main>
    )
  }

  if (notFound || !itinerary) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-serif text-foreground mb-4">Package Not Found</h1>
            <p className="text-muted-foreground mb-8">
              Sorry, we couldn't find the package you're looking for.
            </p>
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

  const destinationName = itinerary.destinations?.[0] || ''
  const heroImage = destinationImage || placeholderImage(destinationName)
  const hasDayPlan = itinerary.dayWisePlan?.some((d) => d.title)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[420px] md:h-[520px] mt-20 lg:mt-24 overflow-hidden">
        <img src={heroImage} alt={itinerary.packageName} className="w-full h-full object-contain sm:object-cover" />
        <div className="absolute inset-0 bg-black/30" />

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
          {destinationName && (
            <p className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-white/80 mb-2">
              <MapPin size={14} />
              {destinationName}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
            {itinerary.packageName}
          </h1>
        </motion.div>
      </section>

      <section className="pt-12 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid gap-10 lg:grid-cols-[1fr_0.7fr] items-start"
          >
            <article className="space-y-8 order-2 lg:order-none">
              {/* Description */}
              {itinerary.description && (
                <p className="text-gray-700 leading-relaxed text-lg">{itinerary.description}</p>
              )}

              {/* Experience Highlights */}
              {itinerary.experienceHighlights?.length > 0 && (
                <ExperienceHighlights highlights={itinerary.experienceHighlights} />
              )}

              {/* Day-wise Plan */}
              {hasDayPlan && (
                <div className="space-y-4">
                  <h2 className="flex items-center gap-2 text-2xl font-serif text-gray-900">
                    <CalendarDays size={22} className="text-teal" />
                    Day-wise Plan
                  </h2>
                  <div className="space-y-3">
                    {itinerary.dayWisePlan.map((d, i) => (
                      <div
                        key={d.day ?? i}
                        className="flex items-start gap-4 rounded-2xl bg-white border border-gray-100 p-4 shadow-sm"
                      >
                        <span className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-teal/10 text-teal font-bold text-sm">
                          Day {d.day ?? i + 1}
                        </span>
                        <p className="text-gray-700 pt-2.5">{d.title || 'Details to be announced'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Included / Not Included */}
              {(itinerary.whatsIncluded?.length > 0 || itinerary.whatsNotIncluded?.length > 0) && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {itinerary.whatsIncluded?.length > 0 && (
                    <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-lg">
                      <h3 className="text-lg font-serif text-gray-900 mb-6 flex items-center gap-2">
                        <Check size={20} className="text-teal" />
                        What's Included
                      </h3>
                      <ul className="space-y-3">
                        {itinerary.whatsIncluded.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-gray-700">
                            <span className="text-teal font-bold mt-0.5">✓</span>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {itinerary.whatsNotIncluded?.length > 0 && (
                    <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-lg">
                      <h3 className="text-lg font-serif text-gray-900 mb-6 flex items-center gap-2">
                        <X size={20} className="text-red-500" />
                        What's Not Included
                      </h3>
                      <ul className="space-y-3">
                        {itinerary.whatsNotIncluded.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-gray-700">
                            <span className="text-red-500 font-bold mt-0.5">✕</span>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-6 sticky top-24 order-1 lg:order-none">
              <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-lg space-y-5">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                    Starting Price
                  </p>
                  <p className="flex items-center text-3xl font-bold text-teal">
                    <IndianRupee size={22} />
                    {Number(itinerary.price || 0).toLocaleString('en-IN')}
                    <span className="text-sm font-normal text-gray-500 ml-1">/ person</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="flex items-center gap-1.5 text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                      <Clock size={13} className="text-teal" />
                      Duration
                    </p>
                    <p className="text-gray-900 font-medium">
                      {itinerary.duration} day{itinerary.duration === 1 ? '' : 's'}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                      <MapPin size={13} className="text-teal" />
                      Destination
                    </p>
                    <p className="text-gray-900 font-medium">{destinationName || '—'}</p>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="block text-center w-full px-4 py-3 rounded-full bg-teal text-white font-semibold hover:bg-teal-dark transition-colors"
                >
                  Enquire Now
                </Link>
              </div>

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
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
