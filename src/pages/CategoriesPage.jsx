import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GallerySection } from '@/components/home/gallery-section'
import { Star } from 'lucide-react'
import images from '@/utils/localImages'
import IndiaMap from "../components/IndiaMap";
import stateApi from '@/services/stateApi'
 
const categories = [
  {
    id: 1,
    name: 'Heritage',
    tagline: 'Land of Kings & Forts',
    packages: 24,
    rating: 4.8,
    image: images.rajasthan,
  },
  {
    id: 2,
    name: 'Nature',
    tagline: "God's Own Country",
    packages: 18,
    rating: 4.9,
    image: images.kerala,
  },
  {
    id: 3,
    name: 'Adventure',
    tagline: 'Mountain Escapes',
    packages: 16,
    rating: 4.7,
    image: images.himachal,
  },
  {
    id: 4,
    name: 'Beaches',
    tagline: 'Sun, Sand & Sea',
    packages: 21,
    rating: 4.6,
    image: images.goa,
  },
  {
    id: 5,
    name: 'Religious',
    tagline: 'Temples & Traditions',
    packages: 14,
    rating: 4.7,
    image: images.tamilNadu,
  },
  {
    id: 6,
    name: 'Family Trips',
    tagline: 'Valley of Flowers',
    packages: 12,
    rating: 4.8,
    image: images.uttarakhand,
  },
  {
    id: 7,
    name: 'Luxury Trips',
    tagline: 'Premium Resorts & Comfort',
    packages: 24,
    rating: 4.8,
    image: images.premiumResort,
  },
  {
    id: 8,
    name: 'Honeymoon',
    tagline: 'Romantic Escapes',
    packages: 18,
    rating: 4.9,
    image: images.honeymoon,
  },
  {
    id: 9,
    name: 'Corporate',
    tagline: 'Executive Travel',
    packages: 16,
    rating: 4.7,
    image: images.privateTour,
  },
  {
    id: 10,
    name: 'Group Tours',
    tagline: 'Travel Together, Make Memories',
    packages: 20,
    rating: 4.8,
    image: images.adventure,
  },
]
 
export default function CategoriesPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  // Live "packages" count per category, computed from actual states in the
  // database so the numbers shown here update as admins add/remove states
  // or change a state's categories, instead of staying frozen at the
  // hardcoded fallback values.
  const [categoryCounts, setCategoryCounts] = useState(null)

  useEffect(() => {
    let isMounted = true
    stateApi.getAll()
      .then((res) => {
        if (!isMounted) return
        const states = res.data?.data || []
        const counts = {}
        states.forEach((state) => {
          const cats = Array.isArray(state.categories) && state.categories.length
            ? state.categories
            : (state.category ? [state.category] : [])
          cats.forEach((cat) => {
            const trimmed = cat?.trim()
            if (!trimmed) return
            counts[trimmed] = (counts[trimmed] || 0) + 1
          })
        })
        setCategoryCounts(counts)
      })
      .catch(() => {
        // Non-critical — falls back to the static sample counts below.
      })
    return () => { isMounted = false }
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <IndiaMap />
 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl lg:text-5xl font-serif text-teal mb-4">Categories</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked destinations that capture the essence of India&apos;s diverse beauty, culture, and heritage.
            </p>
          </motion.div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link to={`/places?type=category&value=${category.name}`}>
                  <div className="group bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{category.tagline}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {categoryCounts ? (categoryCounts[category.name] || 0) : category.packages} packages
                        </span>
                        <span className="text-teal font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Explore <Star size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <GallerySection />
      <Footer />
    </main>
  )
}