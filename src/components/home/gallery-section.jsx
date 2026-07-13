import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Maximize2 } from 'lucide-react'
import images from '@/utils/localImages'
 
const galleryItems = [
  {
    id: 1,
    title: 'The Azure Lagoon',
    subtitle: 'Private chartered access to serene coastal hideaways.',
    tag: 'HIDDEN GEM',
    cta: 'Explore Cove',
    image: images.kerala,
    size: 'large',
  },
  {
    id: 2,
    title: 'Alpine Whispers',
    subtitle: 'SWISS ALPS EXPEDITIONS',
    image: images.himachal,
    size: 'medium',
  },
  {
    id: 3,
    title: 'Desert Solace',
    image: images.rajasthan,
    size: 'small',
  },
  {
    id: 4,
    title: 'Green Canopy',
    image: images.uttarakhand,
    size: 'small',
  },
]
 
// All images shown in the expanded gallery modal (can repeat/extend)
const allGalleryImages = [
  ...galleryItems,
  { id: 5, title: 'Alpine Whispers', subtitle: 'SWISS ALPS EXPEDITIONS', image: images.himachal, size: 'medium' },
  { id: 6, title: 'The Azure Lagoon', subtitle: 'Private chartered access to Palawan\'s most secluded sanctuary.', tag: 'HIDDEN GEM', cta: 'Explore Cove', image: images.kerala, size: 'large' },
  { id: 7, title: 'Desert Solace', image: images.rajasthan, size: 'small' },
  { id: 8, title: 'Green Canopy', image: images.uttarakhand, size: 'small' },
  { id: 9, title: 'Desert Solace', image: images.rajasthan, size: 'small' },
  { id: 10, title: 'Green Canopy', image: images.uttarakhand, size: 'small' },
  { id: 11, title: 'Alpine Whispers', subtitle: 'SWISS ALPS EXPEDITIONS', image: images.himachal, size: 'medium' },
]
 
function GalleryCard({ item, onClick }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      onClick={() => onClick(item)}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      {item.tag && (
        <span className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
          {item.tag}
        </span>
      )}
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h3 className="text-lg font-serif">{item.title}</h3>
        {item.subtitle && <p className="text-white/70 text-xs uppercase tracking-widest mt-0.5">{item.subtitle}</p>}
      </div>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
          <Maximize2 size={14} className="text-white" />
        </div>
      </div>
    </div>
  )
}
 
export function GallerySection() {
  const navigate = useNavigate()
  const [lightbox, setLightbox] = useState(null)
 
  const openLightbox = (item) => setLightbox(item)
  const closeLightbox = () => setLightbox(null)
 
  return (
    <>
      <section className="py-4 lg:py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-6xl font-serif text-teal mb-4">Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We curate travel experiences that reside in the spaces between traditional tourism. Horizon Bound is for the
              modern explorer seeking quiet luxury, tactile adventure, and the soul of the destination.
            </p>
          </motion.div>
 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Large card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden h-[420px] lg:h-[520px] group cursor-pointer"
              onClick={() => openLightbox(galleryItems[0])}
            >
              <img
                src={galleryItems[0].image}
                alt={galleryItems[0].title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-3">
                  {galleryItems[0].tag}
                </span>
                <h3 className="text-3xl font-serif mb-2">{galleryItems[0].title}</h3>
                <p className="text-white/80 text-sm mb-4">{galleryItems[0].subtitle}</p>
                <button
                  className="px-5 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm hover:bg-white/30 transition-colors"
                  onClick={(e) => { e.stopPropagation(); openLightbox(galleryItems[0]); }}
                >
                  {galleryItems[0].cta}
                </button>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <Maximize2 size={16} className="text-white" />
                </div>
              </div>
            </motion.div>
 
            <div className="grid grid-rows-2 gap-6">
              {/* Medium card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative rounded-3xl overflow-hidden h-[240px] lg:h-auto group cursor-pointer"
                onClick={() => openLightbox(galleryItems[1])}
              >
                <img
                  src={galleryItems[1].image}
                  alt={galleryItems[1].title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl lg:text-2xl font-serif italic">{galleryItems[1].title}</h3>
                  <p className="text-white/80 text-xs uppercase tracking-widest">{galleryItems[1].subtitle}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <Maximize2 size={16} className="text-white" />
                  </div>
                </div>
              </motion.div>
 
              {/* Small cards */}
              <div className="grid grid-cols-2 gap-6">
                {galleryItems.slice(2).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="relative rounded-3xl overflow-hidden h-[180px] lg:h-auto group cursor-pointer"
                    onClick={() => openLightbox(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-serif italic">{item.title}</h3>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                        <Maximize2 size={14} className="text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
 
          {/* View Gallery button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center mt-10"
          >
            <button
              onClick={() => navigate('/gallery')}
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-teal text-teal font-medium rounded-sm hover:bg-teal hover:text-white transition-colors"
            >
              View Gallery
            </button>
          </motion.div>
        </div>
      </section>
 
      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.image}
                alt={lightbox.title}
                  className="w-full object-contain sm:object-cover max-h-[80vh]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
 
              {/* Close + expand icons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <Maximize2 size={16} className="text-white" />
                </div>
                <button
                  onClick={closeLightbox}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
                  aria-label="Close"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
 
              {/* Caption */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                {lightbox.tag && (
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-2">
                    {lightbox.tag}
                  </span>
                )}
                <h3 className="text-2xl font-serif mb-1">{lightbox.title}</h3>
                {lightbox.subtitle && <p className="text-white/80 text-sm">{lightbox.subtitle}</p>}
                {lightbox.cta && (
                  <button className="mt-3 px-5 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm hover:bg-white/30 transition-colors">
                    {lightbox.cta}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}