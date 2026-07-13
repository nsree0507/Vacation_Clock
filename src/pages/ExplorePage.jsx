import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GallerySection } from '@/components/home/gallery-section'
import { Star, ArrowRight, MapPin, Calendar, Users } from 'lucide-react'
import images from '@/utils/localImages'
 
const featuredExperiences = [
  {
    id: 1,
    title: 'Himalayan Adventure',
    subtitle: '7 Days of Mountain Magic',
    location: 'Himachal Pradesh',
    price: 45999,
    rating: 4.9,
    reviews: 89,
    image: images.himachal,
    tag: 'Trending',
  },
  {
    id: 2,
    title: 'Kerala Bliss',
    subtitle: '5 Days of Backwater Serenity',
    location: 'Kerala',
    price: 35999,
    rating: 4.8,
    reviews: 124,
    image: images.kerala,
    tag: 'Popular',
  },
  {
    id: 3,
    title: 'Royal Rajasthan',
    subtitle: '6 Days of Heritage & Culture',
    location: 'Rajasthan',
    price: 52999,
    rating: 4.9,
    reviews: 156,
    image: images.rajasthan,
    tag: "Editor's Choice",
  },
]
 
const upcomingTrips = [
  {
    id: 1,
    title: 'Goa Beach Festival',
    date: 'Dec 15-20, 2024',
    spots: 12,
    image: images.goa,
  },
  {
    id: 2,
    title: 'Ladakh Road Trip',
    date: 'Jan 5-15, 2025',
    spots: 8,
    image: images.himachal,
  },
  {
    id: 3,
    title: 'Rishikesh Yoga Retreat',
    date: 'Jan 20-25, 2025',
    spots: 20,
    image: images.tamilNadu,
  },
]
 
export default function ExplorePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-6xl font-serif text-foreground mb-4">
              Explore <span className="text-teal italic">Extraordinary</span>
            </h1>
            <h2 className="text-4xl lg:text-6xl font-serif text-gold italic mb-6">Destinations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Discover handcrafted journeys that transform travel into unforgettable memories. Start your adventure today.
            </p>
          </motion.div>
 
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {featuredExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/itinerary/${exp.id}`}>
                  <div className="group relative rounded-2xl overflow-hidden h-[400px]">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-1 mb-2">
                        <Star size={14} className="fill-gold text-gold" />
                        <span className="text-sm">{exp.rating} ({exp.reviews} reviews)</span>
                      </div>
                      <h3 className="text-2xl font-serif mb-1">{exp.title}</h3>
                      <p className="text-white/80 text-sm mb-3">{exp.subtitle}</p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-sm">
                          <MapPin size={14} />
                          {exp.location}
                        </span>
                        <span className="text-xl font-bold">₹{exp.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gold text-white text-xs font-semibold rounded-full">{exp.tag}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl lg:text-3xl font-serif text-teal mb-2">Upcoming Group Trips</h3>
                <p className="text-muted-foreground">Join like-minded travelers on curated adventures</p>
              </div>
              <Link
                to="/packages"
                className="hidden sm:flex items-center gap-2 text-teal font-medium hover:gap-3 transition-all"
              >
                View All <ArrowRight size={18} />
              </Link>
            </div>
 
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {upcomingTrips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/itinerary/${trip.id}`}>
                    <div className="group bg-card rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={trip.image}
                          alt={trip.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h4 className="text-lg font-semibold text-foreground mb-2">{trip.title}</h4>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {trip.date}
                          </span>
                          <span className="flex items-center gap-1 text-teal">
                            <Users size={14} />
                            {trip.spots} spots left
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-teal rounded-3xl p-8 lg:p-12 text-center text-white"
          >
            <h3 className="text-3xl lg:text-4xl font-serif mb-4">Ready to Start Your Journey?</h3>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Let our travel experts craft a personalized itinerary just for you. No matter your budget or preference, we have the perfect adventure waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/packages"
                className="px-8 py-3 bg-white text-teal font-semibold rounded-full hover:bg-white/90 transition-colors"
              >
                Browse Packages
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <GallerySection />
      <Footer />
    </main>
  )
}