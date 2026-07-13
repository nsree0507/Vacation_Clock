import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FileText, Compass, Mountain, Building2, Home, Heart, HeartHandshake, Users } from 'lucide-react'

const interests = [
  { icon: FileText, title: 'Devotional', description: 'Temples, pilgrimage & spiritual journeys', trips: 32 },
  { icon: Compass, title: 'Adventure', description: 'Trekking, rafting, skydiving & camping', trips: 28 },
  { icon: Mountain, title: 'Nature', description: 'Hills, waterfalls, forests & beaches', trips: 45 },
  { icon: Building2, title: 'Heritage', description: 'Monuments, forts, palaces & museums', trips: 36 },
  { icon: Home, title: 'Family', description: 'Resorts, parks & family attractions', trips: 22 },
  { icon: Heart, title: 'Luxury', description: 'Premium resorts, cruises & VIP services', trips: 15 },
  { icon: HeartHandshake, title: 'Honeymoon', description: 'Romantic getaways & couple packages', trips: 18 },
  { icon: Users, title: 'Group Trips', description: 'Join like-minded travelers on adventures', trips: 12 },
]

export function TravelByInterestSection() {
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
          <h2 className="text-4xl lg:text-6xl font-serif text-teal mb-5">Travel by Interest</h2>
          <p className="text-[16px] text-gray-600 leading-7 max-w-2xl mx-auto">
            Whether you seek spiritual peace, adrenaline rushes, or romantic escapes, we have the perfect journey curated for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {interests.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link to={`/categories/${item.title.toLowerCase()}`}>
                <motion.div
                  whileHover={{
                    y: -6,
                    borderColor: '#0f766e',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 18px 40px rgba(0,0,0,0.06)',
                  }}
                  transition={{ duration: 0.2 }}
                  className="group relative bg-[#f5f7f6] border border-gray-200 rounded-[24px] px-6 py-8 text-center min-h-[240px] overflow-hidden"
                >
                  {/* Soft Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-teal/5 to-transparent rounded-[28px]" />

                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      rotate: 2,
                    }}
                    transition={{ duration: 0.18 }}
                    className="relative z-10 w-16 h-16 mx-auto mb-5 rounded-2xl bg-white border border-gray-200 flex items-center justify-center group-hover:border-teal/20"
                  >
                    <item.icon
                      size={24}
                      className="text-gray-800 group-hover:text-teal transition-colors duration-200"
                    />
                  </motion.div>

                  {/* Title */}
                  <h3 className="relative z-10 text-[20px] font-serif text-gray-900 mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="relative z-10 text-[14px] text-gray-600 leading-6 max-w-[240px] mx-auto mb-4">
                    {item.description}
                  </p>

                  {/* Trips */}
                  <motion.p
                    whileHover={{ letterSpacing: '0.5px' }}
                    className="relative z-10 text-teal text-[16px] font-medium"
                  >
                    {item.trips} trips
                  </motion.p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
