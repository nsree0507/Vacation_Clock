import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star, Clock, Eye, EyeOff } from 'lucide-react'
import { stateHeroImages } from '@/assets/images/images'
import images from '@/utils/localImages'
import destinationApi from '@/services/destinationApi'
 
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
  'punjab': images.rajasthan,
  'sikkim': images.himachal,
  'meghalaya': images.himachal,
}
 
const getFallbackImage = (dest) => stateImageMap[dest.state] || stateHeroImages[0]
 
export function DestinationsSection() {
  const [destinations, setDestinations] = useState([])
  const [revealedPrices, setRevealedPrices] = useState({})
 
  useEffect(() => {
    destinationApi.getAll({})
      .then(res => {
        const data = res.data?.data || []
        const top6 = [...data].sort((a, b) => b.rating - a.rating).slice(0, 6)
        setDestinations(top6)
      })
      .catch(() => setDestinations([]))
  }, [])
 
  const handleViewPrice = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    setRevealedPrices(prev => ({ ...prev, [id]: !prev[id] }))
  }
 
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
          <h2 className="text-4xl lg:text-6xl font-serif text-teal mb-4">Popular Destinations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handpicked destinations that capture the essence of India&apos;s diverse beauty, culture, and heritage.
          </p>
        </motion.div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => {
            const isRevealed = revealedPrices[dest._id]
            return (
              <motion.div
                key={dest._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/itinerary/${dest.slug || dest._id}`}>
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
 
                    {/* ── Image area ── */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={dest.imageUrl || getFallbackImage(dest)}
                        alt={dest.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = getFallbackImage(dest) }}
                      />
                      {/* Star rating — top right */}
                      <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow">
                        <Star size={13} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-gray-800">{dest.rating}</span>
                      </div>
                    </div>
 
                    {/* ── Card body ── */}
                    <div className="px-4 pt-4 pb-4">
                      {/* Name */}
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal transition-colors mb-3">
                        {dest.name}
                      </h3>
 
                      {/* Duration + Category */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                          <Clock size={14} className="text-teal" />
                          <span>{dest.days} Days / {dest.nights ?? dest.days - 1} Nights</span>
                        </div>
                        {dest.category && (
                          <span className="text-xs border border-teal text-teal rounded-full px-2.5 py-0.5 whitespace-nowrap">
                            {dest.category}
                          </span>
                        )}
                      </div>
 
                      {/* Divider */}
                      <hr className="border-gray-200 mb-3" />
 
                      {/* Price + View Price */}
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Starting from</p>
                          <p
                            className="text-sm font-semibold text-gray-900 transition-all duration-300 select-none"
                            style={!isRevealed ? { filter: 'blur(6px)', userSelect: 'none' } : {}}
                          >
                            ₹{Number(dest.price).toLocaleString('en-IN')}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleViewPrice(e, dest._id)}
                          className="flex items-center gap-1.5 text-teal font-semibold text-sm hover:opacity-80 transition-opacity"
                        >
                          {isRevealed ? <><EyeOff size={15} /> Hide Price</> : <><Eye size={15} /> View Price</>}
                        </button>
                      </div>
                    </div>
 
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
 
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
            View All Destinations
          </Link>
        </motion.div>
      </div>
    </section>
  )
}