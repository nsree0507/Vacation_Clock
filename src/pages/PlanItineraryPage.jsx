import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Search, Clock, Star, Eye, EyeOff, Loader, MapPin, XCircle } from 'lucide-react'
import destinationApi from '@/services/destinationApi'
import { CATEGORIES } from '@/data/categories'
import { withFallback } from '@/assets/images/images/fallback'
import images from '@/utils/localImages'

export default function PlanItineraryPage() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [visiblePrices, setVisiblePrices] = useState({})

  useEffect(() => {
    let isMounted = true

    const fetchDestinations = async () => {
      try {
        setLoading(true)
        const response = await destinationApi.getAll()
        if (isMounted) {
          setDestinations(response.data?.data || [])
          setError('')
        }
      } catch (err) {
        if (isMounted) setError('Unable to load destinations right now. Please try again shortly.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchDestinations()
    return () => {
      isMounted = false
    }
  }, [])

  const filteredDestinations = useMemo(() => {
    const q = search.trim().toLowerCase()
    return destinations.filter((dest) => {
      const matchesSearch =
        !q ||
        (dest.name || '').toLowerCase().includes(q) ||
        (dest.state || '').toLowerCase().includes(q)
      const matchesCategory = activeCategory === 'All' || dest.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [destinations, search, activeCategory])

  const togglePrice = (id) => {
    setVisiblePrices((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl lg:text-5xl font-serif text-teal mb-4">Plan Your Itinerary</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse handpicked destinations, compare day-wise plans, and pick the trip that fits
              your travel style — then book straight from the itinerary page.
            </p>
          </motion.div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center gap-2 bg-card px-4 py-3 rounded-full shadow-sm border border-border">
              <Search size={20} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search by destination or state..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none flex-1 min-w-0 text-foreground"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                >
                  <XCircle size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['All', ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  activeCategory === cat
                    ? 'bg-teal text-white border-teal'
                    : 'bg-card text-foreground border-border hover:border-teal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {error && (
            <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-200 rounded-xl p-4 text-center text-red-700 text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="animate-spin text-teal" size={40} />
            </div>
          ) : filteredDestinations.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <MapPin size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No destinations match your search</p>
              <p className="text-sm">Try a different keyword or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((dest, index) => (
                <motion.div
                  key={dest._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(index, 8) * 0.05 }}
                  whileHover={{ translateY: -6 }}
                >
                  <Link
                    to={`/itinerary/${dest.slug || dest._id}`}
                    className="block group bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={withFallback(dest.imageUrl) || images.itinerary}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = images.itinerary }}
                      />
                      <div className="absolute top-3 right-3 bg-white/95 rounded-lg px-2.5 py-1 flex items-center gap-1 shadow">
                        <Star size={13} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-semibold text-foreground">{dest.rating}</span>
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin size={12} className="text-teal" />
                        <span>{dest.state}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-teal transition-colors">
                        {dest.name}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-teal" />
                          <span>
                            {dest.days
                              ? `${dest.days} Days${dest.nights ? ` / ${dest.nights} Nights` : ''}`
                              : 'Flexible'}
                          </span>
                        </div>
                        <span className="text-xs bg-teal/10 text-teal px-2 py-0.5 rounded-full">
                          {dest.category}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-border flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Starting from</p>
                          {visiblePrices[dest._id] ? (
                            <p className="text-base font-bold text-teal">
                              ₹{Number(dest.price).toLocaleString('en-IN')}
                            </p>
                          ) : (
                            <p className="text-sm font-semibold text-foreground blur-sm select-none">
                              Rs. {dest.price}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            togglePrice(dest._id)
                          }}
                          className="flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-dark transition-colors"
                        >
                          {visiblePrices[dest._id] ? <EyeOff size={15} /> : <Eye size={15} />}
                          {visiblePrices[dest._id] ? 'Hide Price' : 'View Price'}
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
