import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import images from '@/utils/localImages'
 
const stats = [
  { value: '500+', label: 'Destinations' },
  { value: '50K+', label: 'Happy Travelers' },
  { value: '14', label: 'States Covered' },
  { value: '4.9', label: 'Avg Rating', hasStar: true },
]
 
const heroImages = [
  { id: 1,  image: images.rajasthan,       alt: 'Rajasthan' },
  { id: 2,  image: images.kerala,          alt: 'Kerala' },
  { id: 3,  image: images.himachal,        alt: 'Himachal Pradesh' },
  { id: 4,  image: images.goa,             alt: 'Goa' },
  { id: 5,  image: images.tamilNadu,       alt: 'Tamil Nadu' },
  { id: 6,  image: images.jammuAndKashmir, alt: 'Jammu & Kashmir' },
  { id: 7,  image: images.uttarakhand,     alt: 'Uttarakhand' },
  { id: 8,  image: images.meghalaya,       alt: 'Meghalaya' },
  { id: 9,  image: images.sikkim,          alt: 'Sikkim' },
  { id: 10, image: images.andhraPradesh,   alt: 'Andhra Pradesh' },
]
 
const CARD_W = 240        
const CARD_H = 320        
const GAP = 32            // Explicitly sets the identical gap between all images
const SPEED = 0.5         // Pixels per frame to scroll
const marqueeItems = [...heroImages, ...heroImages, ...heroImages, ...heroImages]
 
function ArcGallery() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const cardsRef = useRef([])
  const offsetRef = useRef(0)
  const pausedRef = useRef(false)
  const rafRef = useRef(null)

  // Calculate total width of a single full sequence loop
  const singleLoopWidth = heroImages.length * (CARD_W + GAP)

  useEffect(() => {
    function tick() {
      if (!pausedRef.current) {
        offsetRef.current += SPEED
        // Seamlessly snap back once a full sequence has traveled past
        if (offsetRef.current >= singleLoopWidth) {
          offsetRef.current = 0
        }
      }

      if (trackRef.current) {
        // Move the entire track smoothly to the left
        trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`
      }

      const vw = containerRef.current ? containerRef.current.offsetWidth : window.innerWidth
      const centerX = vw / 2

      marqueeItems.forEach((_, index) => {
        const card = cardsRef.current[index]
        if (!card) return

        // Get the current real-time horizontal bounding position of the card on the screen
        const rect = card.getBoundingClientRect()
        const containerRect = containerRef.current ? containerRef.current.getBoundingClientRect() : { left: 0 }
        
        // Calculate where the card's center point sits relative to the viewport container
        const cardCenterX = rect.left - containerRect.left + CARD_W / 2
        const distanceFromCenter = cardCenterX - centerX
        
        // Curve mapping parameters
        const radius = 650 
        const normalizedDist = distanceFromCenter / radius
        const clampedDist = Math.max(-1, Math.min(1, normalizedDist))

        // --- 3D HORIZON CURVATURE MATHEMATICS ---
        const rotateY = clampedDist * -22 
        const translateZ = (Math.cos(clampedDist * Math.PI / 2) - 1) * 100
        const translateY = Math.abs(clampedDist) * 24

        // Apply visual modifications purely via 3D matrix scaling without overriding layout spacing
        card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) translateZ(${translateZ}px) translateY(${translateY}px)`
        card.style.zIndex = String(Math.round(100 - Math.abs(clampedDist) * 50))
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [singleLoopWidth])

  return (
    <div
      className="relative z-10 w-full"
      // Pushes the track completely down out of your Header/Navbar space safely
      style={{ height: `${CARD_H + 60}px`, marginTop: '110px', marginBottom: '40px' }}
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute inset-0"
        style={{ 
          overflowX: 'hidden', 
          overflowY: 'visible',
          transformStyle: 'preserve-3d',
          perspective: '1400px'
        }}
      >
        <div
          ref={trackRef}
          className="flex flex-row items-center will-change-transform"
          style={{
            gap: `${GAP}px`, // Enforces an unbendable equal gap layout rule in CSS
            transformStyle: 'preserve-3d',
            height: '100%',
            width: 'max-content'
          }}
        >
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              ref={el => cardsRef.current[index] = el}
              className="flex-shrink-0 rounded-none overflow-hidden"
              style={{
                width: `${CARD_W}px`,
                height: `${CARD_H}px`,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover select-none pointer-events-none rounded-none"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
 
export function HeroSection() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    const query = searchQuery.trim()
    if (!query) return
    navigate(`/places?type=search&value=${encodeURIComponent(query)}`)
  }

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">
 
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.3, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-124 left-18 lg:left-30"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-teal/30 rotate-45">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor" />
          </svg>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.3, x: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute top-123 right-14 lg:right-26"
        >
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" className="text-teal/30 -rotate-45">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor" />
          </svg>
        </motion.div>
        <svg className="absolute top-110 left-0 w-full h-40 opacity-20" viewBox="0 0 1200 160">
          <path d="M0,80 Q300,20 600,80 T1200,80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="text-teal" />
        </svg>
      </div>
 
      <ArcGallery />
 
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-6 pb-10 px-4">
 
        <div className="text-center mb-8">
          <button className="inline-flex items-center gap-2 rounded-full border border-[#D1D1D1] bg-[#E1E0E0] px-5 py-2 text-sm font-medium text-[#333333] cursor-default">
            <span className="w-2 h-2 rounded-full bg-[#F3C64F] inline-block" />
            Discover India&apos;s Finest
          </button>
        </div>
 
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-serif mb-6 text-center"
        >
          <span className="text-teal">Your Journey</span>
          <br />
          <span className="text-foreground">Begins </span>
          <span className="text-gold italic">Here</span>
        </motion.h1>
 
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground text-base lg:text-lg max-w-2xl mx-auto mb-8 text-center"
        >
          Explore devotional temples, mountain peaks, golden beaches &amp; heritage palaces — crafted into unforgettable itineraries, just for you.
        </motion.p>
 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-2xl mx-auto mb-10"
        >
          <form
  onSubmit={handleSearch}
  className="flex items-center bg-card rounded-full shadow-lg border border-border overflow-hidden px-2"
>
  <div className="flex items-center justify-center px-3 py-4 text-muted-foreground flex-shrink-0">
    <Search size={20} />
  </div>

  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search destinations, states, packages..."
    className="flex-1 min-w-0 px-2 sm:px-4 py-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm sm:text-base"
  />

  <button
    type="submit"
    className="flex-shrink-0 mr-2 px-4 py-2 sm:px-6 sm:py-3 bg-teal text-white font-medium rounded-full hover:bg-teal-dark transition-colors text-sm whitespace-nowrap"
  >
    Search
  </button>
</form>
        </motion.div>
 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 lg:gap-0"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className={`px-6 lg:px-10 py-2 ${index < stats.length - 1 ? 'lg:border-r lg:border-border' : ''}`}>
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl lg:text-3xl font-serif text-foreground">{stat.value}</span>
                {stat.hasStar && (
                  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )}
              </div>
              <p className="text-xs lg:text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
 
    </section>
  )
}
