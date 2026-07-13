import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GallerySection } from '@/components/home/gallery-section'
import { Clock, Eye, EyeOff, Star, ArrowLeft, Loader, Sun } from 'lucide-react'
import { placesData } from '@/data/placesData'
import { getStateBySlug } from '@/data/statesData'
import destinationApi from '@/services/destinationApi'
import stateApi from '@/services/stateApi'
 
// Fallback images by state slug
import { stateHeroImages } from '@/assets/images/images'
import images from '@/utils/localImages'
 
const stateImageMap = {
  'jammu-kashmir': images.jammuAndKashmir,
  'himachal-pradesh': images.himachal,
  'rajasthan': images.rajasthan,
  'kerala': images.kerala,
  'goa': images.goa,
  'tamil-nadu': images.tamilNadu,
  'uttarakhand': images.uttarakhand,
  'karnataka': images.karnataka,
  'maharashtra': images.maharashtra,
  'telangana': images.maharashtra,
  'andhra-pradesh': images.tamilNadu,
  'madhya-pradesh': images.madhyaPradesh,
  'gujarat': images.gujarat,
  'west-bengal': images.westBengal,
  'odisha': images.odisha,
  'uttar-pradesh': images.rajasthan,
  'assam': images.himachal,
}
const getFallbackImage = (dest) => stateImageMap[dest.state] || stateHeroImages[0]
 
// ── PackagesPage-style state card ────────────────────────────────────────────
// Used only in Search and Category views (data comes from DB via stateApi)
function StateCard({ state, stateStats = {}, index = 0, visiblePrices, togglePrice }) {
  const stateId = state._id || state.id || state.slug
 
  const getRating = () => {
    const live = stateStats[state.slug]
    return live?.avgRating ?? state.rating ?? '—'
  }
 
  const getPackageCount = () => {
    const live = stateStats[state.slug]
    return live?.packageCount ?? state.places ?? 0
  }
 
  const getStartingPrice = () => {
    const live = stateStats[state.slug]
    if (live?.minPrice) return Number(live.minPrice).toLocaleString('en-IN')
    if (state.price) return state.price
    return '—'
  }
 
  const getAttractionLine = () => {
    const raw = state.description || ''
    return raw.length > 82 ? raw.slice(0, 80) + '…' : raw
  }
 
  const pkgCount = getPackageCount()
  const rating = getRating()
  const startPrice = getStartingPrice()
  const attraction = getAttractionLine()
  const bestTime = state.bestTimeToVisit || null
  const image = state.imageUrl || state.image ||
    `https://placehold.co/600x400/d1f0ed/008080?text=${encodeURIComponent(state.name)}`
 
  return (
    <motion.div
      key={stateId}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      whileHover={{ translateY: -6 }}
      className="h-full"
    >
      <Link
        to={`/places?type=state&value=${state.slug}`}
        className="flex flex-col group bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full"
      >
        {/* Image */}
        <div className="relative h-52 shrink-0 overflow-hidden">
          <img
            src={image}
            alt={state.name}
                      className="w-full h-full object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-white/95 rounded-lg px-2.5 py-1 flex items-center gap-1 shadow">
            <Star size={13} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-semibold text-foreground">{rating}</span>
          </div>
        </div>
 
        {/* Body */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Name + packages badge */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-teal transition-colors leading-tight">
              {state.name}
            </h3>
            <span className="shrink-0 text-[10px] bg-teal/10 text-teal px-2 py-0.5 rounded-full font-medium mt-0.5">
              {pkgCount} {pkgCount === 1 ? 'Package' : 'Packages'}
            </span>
          </div>
 
          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {attraction}
          </p>
 
          {/* Best time */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground min-h-[1.25rem]">
            {bestTime && (
              <>
                <Sun size={14} className="text-teal shrink-0" />
                <span>Best time: {bestTime}</span>
              </>
            )}
          </div>
 
          {/* Price row */}
          <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Starting from</p>
              {visiblePrices[stateId] ? (
                <p className="text-base font-bold text-teal">₹{startPrice}</p>
              ) : (
                <p className="text-sm font-semibold text-foreground blur-sm select-none">
                  Rs. {startPrice}
                </p>
              )}
            </div>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); togglePrice(stateId) }}
              className="flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-dark transition-colors"
            >
              {visiblePrices[stateId] ? <EyeOff size={15} /> : <Eye size={15} />}
              {visiblePrices[stateId] ? 'Hide Price' : 'View Price'}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
 
export default function PlacesPage() {
  const [visiblePrices, setVisiblePrices] = useState({})
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
 
  // DB states — used in search and category views
  const [dbStates, setDbStates] = useState([])
  const [dbStatesLoading, setDbStatesLoading] = useState(true)
 
  // DB stats — used to enrich state cards in search/category views
  const [stateStats, setStateStats] = useState({})
 
  // For DB-fetched city destinations (state view) — unchanged
  const [dbDestinations, setDbDestinations] = useState([])
  const [dbLoading, setDbLoading] = useState(false)
 
  const togglePrice = (id) => {
    setVisiblePrices(prev => ({ ...prev, [id]: !prev[id] }))
  }
 
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [searchParams])
 
  const type = searchParams.get('type')
  const value = searchParams.get('value')
 
  // Fetch DB states + stats once — used in search and category views
  useEffect(() => {
    setDbStatesLoading(true)
    Promise.all([
      stateApi.getAll().catch(() => ({ data: { data: [] } })),
      destinationApi.getStatsByState().catch(() => ({ data: { data: [] } })),
    ]).then(([statesRes, statsRes]) => {
      setDbStates(statesRes.data?.data || [])
      const map = {}
      ;(statsRes.data?.data || []).forEach(item => { map[item.state] = item })
      setStateStats(map)
    }).finally(() => setDbStatesLoading(false))
  }, [])
 
  // Fetch cities from DB when viewing a state — unchanged
  useEffect(() => {
    if (type === 'state' && value) {
      setDbLoading(true)
      destinationApi.getAll({ state: value })
        .then(res => {
          const data = res.data?.data || []
          setDbDestinations(data)
        })
        .catch(() => setDbDestinations([]))
        .finally(() => setDbLoading(false))
    }
  }, [type, value])
 
  // ── SEARCH view ───────────────────────────────────────────────────────────
  if (type === 'search' && value) {
    const query = value.trim().toLowerCase()
 
    const matchedStates = dbStates.filter((s) =>
      s.name?.toLowerCase().includes(query) ||
      s.region?.toLowerCase().includes(query) ||
      s.category?.toLowerCase().includes(query) ||
      s.description?.toLowerCase().includes(query)
    )
 
    const matchedPlaces = placesData.filter((p) =>
      p.name?.toLowerCase().includes(query) ||
      p.state?.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query) ||
      p.categories?.some((c) => c?.toLowerCase().includes(query))
    )
 
    const totalResults = matchedStates.length + matchedPlaces.length
 
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-28 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-foreground hover:text-teal transition-colors">
              <ArrowLeft size={20} />
            </button>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
              <h1 className="text-3xl lg:text-5xl font-serif text-teal mb-4">Results for &ldquo;{value}&rdquo;</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {dbStatesLoading
                  ? 'Searching…'
                  : totalResults > 0
                    ? `Found ${totalResults} ${totalResults === 1 ? 'result' : 'results'} matching your search.`
                    : 'No matches found. Try a different state, city, or destination name.'}
              </p>
            </motion.div>
 
            {dbStatesLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin text-teal" size={40} />
              </div>
            ) : totalResults > 0 ? (
              <div className="space-y-12">
                {matchedStates.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-5">States</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {matchedStates.map((state, index) => (
                        <StateCard
                          key={state.id}
                          state={state}
                          stateStats={stateStats}
                          index={index}
                          visiblePrices={visiblePrices}
                          togglePrice={togglePrice}
                        />
                      ))}
                    </div>
                  </div>
                )}
 
                {matchedPlaces.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-5">Destinations</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {matchedPlaces.map((place, index) => (
                        <motion.div key={place.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }} whileHover={{ translateY: -6 }}>
                          <Link to={`/itinerary/${place.slug}`} className="block group bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full">
                            <div className="relative h-52 overflow-hidden">
                              <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              <div className="absolute top-3 right-3 bg-white/95 rounded-lg px-2.5 py-1 flex items-center gap-1 shadow">
                                <Star size={13} className="text-yellow-400 fill-yellow-400" />
                                <span className="text-xs font-semibold text-foreground">4.8</span>
                              </div>
                            </div>
                            <div className="p-5 space-y-3">
                              <h3 className="text-lg font-semibold text-foreground group-hover:text-teal transition-colors">{place.name}</h3>
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5"><Clock size={14} className="text-teal" /><span>{place.duration}</span></div>
                                {place.categories?.[0] && <span className="text-xs bg-teal/10 text-teal px-2 py-0.5 rounded-full">{place.categories[0]}</span>}
                              </div>
                              <div className="pt-3 border-t border-border flex items-center justify-between">
                                <div>
                                  <p className="text-xs text-muted-foreground">Starting from</p>
                                  {visiblePrices[place.id] ? <p className="text-base font-bold text-teal">₹{place.price}</p> : <p className="text-sm font-semibold text-foreground blur-sm select-none">Rs. {place.price}</p>}
                                </div>
                                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); togglePrice(place.id) }} className="flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-dark transition-colors">
                                  {visiblePrices[place.id] ? <EyeOff size={15} /> : <Eye size={15} />}
                                  {visiblePrices[place.id] ? 'Hide Price' : 'View Price'}
                                </button>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <p className="text-lg text-muted-foreground mb-4">No destinations found for &ldquo;{value}&rdquo;.</p>
                <Link to="/categories" className="inline-flex items-center gap-2 px-6 py-2 bg-teal text-white rounded-full hover:bg-teal/90 transition-colors">Browse Categories</Link>
              </motion.div>
            )}
          </div>
        </section>
        <GallerySection />
        <Footer />
      </main>
    )
  }
 
  // ── CATEGORY view ─────────────────────────────────────────────────────────
  if (type === 'category' && value) {
    const normalizedQuery = value.trim().toLowerCase()
    const filteredStates = dbStates.filter((s) => {
      const categoryCandidates = [
        s.primaryCategory,
        s.category,
        ...(Array.isArray(s.categories) ? s.categories : []),
      ].filter(Boolean)

      return categoryCandidates.some((category) => {
        const normalizedCategory = String(category).trim().toLowerCase()
        return (
          normalizedCategory === normalizedQuery ||
          normalizedCategory.includes(normalizedQuery) ||
          normalizedQuery.includes(normalizedCategory)
        )
      })
    })
 
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-28 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-foreground hover:text-teal transition-colors">
              <ArrowLeft size={20} />
            </button>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
              <h1 className="text-3xl lg:text-5xl font-serif text-teal mb-4">{value}</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">Handpicked destinations that capture the essence of India&apos;s diverse beauty, culture, and heritage.</p>
            </motion.div>
            {dbStatesLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin text-teal" size={40} />
              </div>
            ) : filteredStates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStates.map((state, index) => (
                  <StateCard
                    key={state.id}
                    state={state}
                    stateStats={stateStats}
                    index={index}
                    visiblePrices={visiblePrices}
                    togglePrice={togglePrice}
                  />
                ))}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <p className="text-lg text-muted-foreground mb-4">No destinations found for &ldquo;{value}&rdquo;.</p>
                <Link to="/categories" className="inline-flex items-center gap-2 px-6 py-2 bg-teal text-white rounded-full hover:bg-teal/90 transition-colors">Browse Categories</Link>
              </motion.div>
            )}
          </div>
        </section>
        <GallerySection />
        <Footer />
      </main>
    )
  }
 
  // ── STATE view: cities from DB ────────────────────────────────────────────
  // Unchanged from original
  const state = getStateBySlug(value)
  const pageTitle = state ? state.name : 'Destinations'
  const pageSubtitle = `Explore the best cities and destinations in ${state?.name || ''}`
 
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-foreground hover:text-teal transition-colors">
            <ArrowLeft size={20} />
          </button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <h1 className="text-3xl lg:text-5xl font-serif text-teal mb-4">{pageTitle}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">{pageSubtitle}</p>
          </motion.div>
 
          {dbLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="animate-spin text-teal" size={40} />
            </div>
          ) : dbDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dbDestinations.map((dest, index) => (
                <motion.div
                  key={dest._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ translateY: -6 }}
                >
                  <Link to={`/itinerary/${dest.slug || dest._id}`} className="block group bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full">
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={dest.imageUrl || getFallbackImage(dest)}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = getFallbackImage(dest) }}
                      />
                      <div className="absolute top-3 right-3 bg-white/95 rounded-lg px-2.5 py-1 flex items-center gap-1 shadow">
                        <Star size={13} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-semibold text-foreground">{dest.rating}</span>
                      </div>
 
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-teal transition-colors">{dest.name}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-teal" />
                          <span>{dest.days ? `${dest.days} Days${dest.nights ? ` / ${dest.nights} Nights` : ''}` : dest.category}</span>
                        </div>
                        <span className="text-xs bg-teal/10 text-teal px-2 py-0.5 rounded-full">{dest.category}</span>
                      </div>
                      <div className="pt-3 border-t border-border flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Starting from</p>
                          {visiblePrices[dest._id] ? (
                            <p className="text-base font-bold text-teal">₹{Number(dest.price).toLocaleString('en-IN')}</p>
                          ) : (
                            <p className="text-sm font-semibold text-foreground blur-sm select-none">Rs. {dest.price}</p>
                          )}
                        </div>
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); togglePrice(dest._id) }}
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
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">No destinations found for this state.</p>
              <Link to="/packages" className="inline-flex items-center gap-2 px-6 py-2 bg-teal text-white rounded-full hover:bg-teal/90 transition-colors">
                Explore All Packages
              </Link>
            </motion.div>
          )}
        </div>
      </section>
      <GallerySection />
      <Footer />
    </main>
  )
}