import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GallerySection } from '@/components/home/gallery-section'
import { Star, Eye, EyeOff, Sun, ArrowLeft } from 'lucide-react'
import IndiaMap from '@/components/IndiaMap'
import destinationApi from '@/services/destinationApi'
import stateApi from '@/services/stateApi'
 
// All region tabs — always shown
const REGIONS = [
  'All',
  'North India',
  'South India',
  'East India',
  'West India',
  'Central India',
  'North-East India',
]
 
export default function PackagesPage() {
  const [searchParams] = useSearchParams()
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [visiblePrices, setVisiblePrices] = useState({})
  const [stateStats, setStateStats] = useState({})
  const [dbStates, setDbStates] = useState([])
  const [loading, setLoading] = useState(true)
 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [statsRes, statesRes] = await Promise.all([
          destinationApi.getStatsByState().catch(() => ({ data: { data: [] } })),
          stateApi.getAll().catch(() => ({ data: { data: [] } })),
        ])
        const statsMap = {}
        ;(statsRes.data?.data || []).forEach(item => { statsMap[item.state] = item })
        setStateStats(statsMap)
        setDbStates(statesRes.data?.data || [])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
 
  useEffect(() => {
    const regionParam = searchParams.get('region')
    if (regionParam) {
      const normalize = (s) => s.toLowerCase().replace(/[\s-]/g, '')
      const matched = REGIONS.find(r => normalize(r) === normalize(regionParam))
      if (matched) setSelectedRegion(matched)
    } else {
      setSelectedRegion('All')
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [searchParams])
 
  const navigate = useNavigate()

  const togglePrice = (stateId) => {
    setVisiblePrices(prev => ({ ...prev, [stateId]: !prev[stateId] }))
  }
 
  // Filter from DB — states appear here based on the `region` field saved in admin
  const filteredStates = selectedRegion === 'All'
    ? dbStates
    : dbStates.filter(state => state.region === selectedRegion)
 
  const getRating = (state) => {
    const live = stateStats[state.slug]
    return live?.avgRating ?? state.rating ?? '—'
  }
 
  const getPackageCount = (state) => {
    const live = stateStats[state.slug]
    return live?.packageCount ?? 0
  }
 
  const getStartingPrice = (state) => {
    const live = stateStats[state.slug]
    if (live?.minPrice) return Number(live.minPrice).toLocaleString('en-IN')
    if (state.price) return state.price
    return '—'
  }
 
  const getAttractionLine = (state) => {
    const raw = state.description || ''
    return raw.length > 82 ? raw.slice(0, 80) + '…' : raw
  }
 
  const getBestTime = (state) => state.bestTimeToVisit || null
 
  const getImage = (state) =>
    state.imageUrl ||
    `https://placehold.co/600x400/d1f0ed/008080?text=${encodeURIComponent(state.name)}`
 
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
 
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
 
          {/* India Map — receives selectedRegion so it highlights the right states */}
          <div className="mb-6 sm:hidden">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-teal transition-colors"
            >
              <ArrowLeft size={18} />
              Home
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <IndiaMap selectedRegion={selectedRegion} />
          </motion.div>
 
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl lg:text-5xl font-serif text-teal mb-3">Packages</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked destinations that capture the essence of India&apos;s diverse beauty,<br />
              culture, and heritage.
            </p>
          </motion.div>
 
          {/* Region Tab Filters — all tabs always shown */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`pb-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                  selectedRegion === region
                    ? 'text-teal'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {region}
                {selectedRegion === region && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal rounded-full" />
                )}
              </button>
            ))}
          </motion.div>
 
          {/* Cards */}
          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Loading packages…</p>
            </div>
          ) : filteredStates.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredStates.map((state, index) => {
                const rating = getRating(state)
                const pkgCount = getPackageCount(state)
                const startPrice = getStartingPrice(state)
                const attraction = getAttractionLine(state)
                const bestTime = getBestTime(state)
                const image = getImage(state)
                const stateId = state._id || state.slug
 
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
                      <div className="relative h-52 shrink-0 overflow-hidden">
                        <img
                          src={image}
                          alt={state.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-white/95 rounded-lg px-2.5 py-1 flex items-center gap-1 shadow">
                          <Star size={13} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-semibold text-foreground">{rating}</span>
                        </div>
                      </div>
 
                      <div className="flex flex-col flex-1 p-5 gap-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-teal transition-colors leading-tight">
                            {state.name}
                          </h3>
                          <span className="shrink-0 text-[10px] bg-teal/10 text-teal px-2 py-0.5 rounded-full font-medium mt-0.5">
                            {pkgCount} {pkgCount === 1 ? 'Package' : 'Packages'}
                          </span>
                        </div>
 
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 min-h-[2.5rem]">
                          {attraction}
                        </p>
 
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground min-h-[1.25rem]">
                          {bestTime && (
                            <>
                              <Sun size={14} className="text-teal shrink-0" />
                              <span>Best time: {bestTime}</span>
                            </>
                          )}
                        </div>
 
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
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              togglePrice(stateId)
                            }}
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
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-lg text-muted-foreground">
                No packages found for {selectedRegion}. Please try another region.
              </p>
            </motion.div>
          )}
        </div>
      </section>
 
      <GallerySection />
      <Footer />
    </main>
  )
}