import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star, MapPin, Eye, EyeOff } from 'lucide-react'
import images from '@/utils/localImages'
import stateApi from '@/services/stateApi'
import destinationApi from '@/services/destinationApi'

// Shown only if there are no states in the database yet, so the homepage
// isn't empty before the admin has added any states/destinations.
const fallbackStates = [
  {
    id: 'fallback-rajasthan',
    name: 'Rajasthan',
    packageCount: 0,
    rating: 4.9,
    price: '24,999',
    image: images.rajasthan,
    link: '/packages',
  },
  {
    id: 'fallback-kerala',
    name: 'Kerala',
    packageCount: 0,
    rating: 4.8,
    price: '24,999',
    image: images.kerala,
    link: '/packages',
  },
  {
    id: 'fallback-himachal',
    name: 'Himachal Pradesh',
    packageCount: 0,
    rating: 4.9,
    price: '24,999',
    image: images.himachal,
    link: '/packages',
  },
  {
    id: 'fallback-goa',
    name: 'Goa',
    packageCount: 0,
    rating: 4.7,
    price: '24,999',
    image: images.goa,
    link: '/packages',
  },
]

const placeholderImage = (name) =>
  `https://placehold.co/600x400/d1f0ed/008080?text=${encodeURIComponent(name || 'Vacation Clock')}`

export function TrendingPackagesSection() {
  const [visibleStateId, setVisibleStateId] = useState(null)
  const [states, setStates] = useState(null) // null = still loading

  useEffect(() => {
    let isMounted = true

    const loadStates = async () => {
      try {
        const [statesRes, statsRes] = await Promise.all([
          stateApi.getAll(),
          destinationApi.getStatsByState().catch(() => ({ data: { data: [] } })),
        ])

        const allStates = statesRes.data?.data || []
        const statsList = statsRes.data?.data || []
        const statsByState = {}
        statsList.forEach((s) => { statsByState[s.state] = s })

        // "Trending" = the states with the most live packages, so this stays
        // in sync with whatever the admin has actually published.
        const ranked = allStates
          .map((state) => {
            const stats = statsByState[state.slug] || {}
            return {
              id: state._id,
              name: state.name,
              slug: state.slug,
              packageCount: stats.packageCount || 0,
              rating: stats.avgRating || state.rating || 4.5,
              price: stats.minPrice ? Number(stats.minPrice).toLocaleString('en-IN') : null,
              image: state.imageUrl || placeholderImage(state.name),
              link: `/places?type=state&value=${state.slug}`,
            }
          })
          .sort((a, b) => b.packageCount - a.packageCount || b.rating - a.rating)
          .slice(0, 4)

        if (isMounted) {
          setStates(ranked.length > 0 ? ranked : fallbackStates)
        }
      } catch (err) {
        if (isMounted) setStates(fallbackStates)
      }
    }

    loadStates()
    return () => {
      isMounted = false
    }
  }, [])

  const toggleVisibility = (event, id) => {
    event.preventDefault()
    event.stopPropagation()
    setVisibleStateId((current) => (current === id ? null : id))
  }

  const displayStates = states || []

  return (
    <section className="py-4 lg:py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-6xl font-serif text-teal mb-4">Trending State Packages</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The most popular states with our travelers right now, based on the packages our
            travel experts have crafted for each destination.
          </p>
        </motion.div>

        {states === null ? (
          <div className="text-center py-12 text-muted-foreground">Loading states…</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayStates.map((state, index) => (
              <motion.div
                key={state.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ translateY: -6 }}
              >
                <Link to={state.link}>
                  <div className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={state.image}
                        alt={state.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = placeholderImage(state.name) }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-teal text-white">
                          Trending
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 bg-white/95 rounded-lg px-2.5 py-1 flex items-center gap-1 shadow">
                        <Star size={13} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-semibold text-foreground">{state.rating}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-serif font-semibold text-foreground">{state.name}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {state.packageCount} {state.packageCount === 1 ? 'Package' : 'Packages'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div
                          className="overflow-hidden"
                          style={{
                            filter: visibleStateId === state.id ? 'blur(0px)' : 'blur(5px)',
                            transition: 'filter 0.3s ease, opacity 0.3s ease',
                            opacity: visibleStateId === state.id ? 1 : 0.6,
                          }}
                        >
                          <p className="text-xs text-muted-foreground">Starting from</p>
                          <p className="text-lg font-semibold text-foreground">
                            {state.price
                              ? visibleStateId === state.id
                                ? `Rs. ${state.price}`
                                : 'Rs. ******'
                              : 'Explore'}
                          </p>
                        </div>
                        {state.price && (
                          <button
                            type="button"
                            onClick={(event) => toggleVisibility(event, state.id)}
                            className="inline-flex items-center gap-1 text-teal font-medium text-sm hover:underline"
                          >
                            {visibleStateId === state.id ? <EyeOff size={14} /> : <Eye size={14} />}
                            {visibleStateId === state.id ? 'Hide Price' : 'View Price'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-teal text-teal font-medium rounded-full hover:bg-teal hover:text-white transition-colors"
          >
            View All Packages
          </Link>
        </motion.div>
      </div>
    </section>
  )
}