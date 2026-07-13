import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, X, Maximize2 } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import images from '@/utils/localImages'
 
const galleryItems = [
  {
    id: 1,
    title: 'City of Lakes',
    subtitle: 'Udaipur, Rajasthan',
    tag: 'MUST VISIT',
    cta: 'Explore Udaipur',
    image: images.galleryUdaipur,
  },
  {
    id: 2,
    title: 'Mehrangarh Fort',
    subtitle: 'The Blue City, Jodhpur',
    image: images.galleryJodhpur,
  },
  {
    id: 3,
    title: 'Hawa Mahal',
    subtitle: 'Palace of Winds, Jaipur',
    image: images.galleryJaipur,
  },
  {
    id: 4,
    title: 'Bara Imambara',
    subtitle: 'Lucknow, Uttar Pradesh',
    image: images.galleryLucknow,
  },
  {
    id: 5,
    title: 'Dravidian Splendour',
    subtitle: 'Tamil Nadu Temple Gopuram',
    tag: 'HIDDEN GEM',
    image: images.galleryTamilnadu,
  },
  {
    id: 6,
    title: 'Konark Sun Temple',
    subtitle: 'UNESCO World Heritage, Odisha',
    image: images.galleryKonark,
  },
  {
    id: 7,
    title: 'Rath Yatra',
    subtitle: 'Sacred Chariot Festival, Puri',
    tag: 'FESTIVAL',
    cta: 'Explore Puri',
    image: images.galleryPuri,
  },
  {
    id: 8,
    title: 'The Azure Lagoon',
    subtitle: 'Private chartered access to serene coastal hideaways.',
    tag: 'HIDDEN GEM',
    cta: 'Explore Cove',
    image: images.kerala,
  },
  {
    id: 9,
    title: 'Alpine Whispers',
    subtitle: 'Kedarnath, Uttarakhand',
    image: images.himachal,
  },
  {
    id: 10,
    title: 'Desert Solace',
    subtitle: 'Thar Desert, Rajasthan',
    image: images.rajasthan,
  },
  {
    id: 11,
    title: 'Green Canopy',
    subtitle: 'Devprayag, Uttarakhand',
    image: images.uttarakhand,
  },
]
 
function GalleryCard({ item, onClick, imgClass = 'h-48', className = '' }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden cursor-pointer group ${className}`}
      onClick={() => onClick(item)}
    >
      <img
        src={item.image}
        alt={item.title}
        className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${imgClass}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      {item.tag && (
        <span className="absolute top-3 left-3 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
          {item.tag}
        </span>
      )}
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h3 className="font-serif text-base leading-tight">{item.title}</h3>
        {item.subtitle && (
          <p className="text-white/70 text-xs uppercase tracking-widest mt-0.5">{item.subtitle}</p>
        )}
        {item.cta && (
          <button
            className="mt-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs hover:bg-white/30 transition-colors"
            onClick={(e) => { e.stopPropagation(); onClick(item); }}
          >
            {item.cta}
          </button>
        )}
      </div>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
          <Maximize2 size={13} className="text-white" />
        </div>
      </div>
    </div>
  )
}
 
export default function GalleryPage() {
  const navigate = useNavigate()
  const [lightbox, setLightbox] = useState(null)
 
  const openLightbox = (item) => setLightbox(item)
  const closeLightbox = () => setLightbox(null)
 
  return (
    <main className="min-h-screen">
      <Navbar />
 
      <div className="max-w-4xl mx-auto px-4 pt-24 lg:pt-28 pb-16">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
 
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-serif text-teal mb-3">Gallery</h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Handpicked destinations that capture the essence of India's diverse beauty, culture, and heritage.
          </p>
        </motion.div>
 
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-col gap-4"
        >
          {/* Block 1: Azure Lagoon large left + Alpine Whispers top-right + Desert/Green bottom-right */}
          <div className="grid grid-cols-2 gap-4">
            <GalleryCard item={galleryItems[7]} onClick={openLightbox} imgClass="h-[420px]" />
            <div className="flex flex-col gap-4">
              <GalleryCard item={galleryItems[8]} onClick={openLightbox} imgClass="h-57" />
              <div className="grid grid-cols-2 gap-4">
                <GalleryCard item={galleryItems[9]} onClick={openLightbox} imgClass="h-44" />
                <GalleryCard item={galleryItems[10]} onClick={openLightbox} imgClass="h-44" />
              </div>
            </div>
          </div>
 
          {/* Block 2: Udaipur + Jodhpur */}
          <div className="grid grid-cols-2 gap-4">
            <GalleryCard item={galleryItems[0]} onClick={openLightbox} imgClass="h-64" />
            <GalleryCard item={galleryItems[1]} onClick={openLightbox} imgClass="h-64" />
          </div>
 
          {/* Block 3: Hawa Mahal — full width */}
          <GalleryCard item={galleryItems[2]} onClick={openLightbox} imgClass="h-52" />
 
          {/* Block 4: Lucknow | Tamil Nadu | Rath Yatra (tall) + Konark wide */}
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            <GalleryCard item={galleryItems[3]} onClick={openLightbox} imgClass="h-44" />
            <GalleryCard item={galleryItems[4]} onClick={openLightbox} imgClass="h-44" />
            {/* Col 3, row-span-2 — Rath Yatra */}
            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer group row-span-2"
              onClick={() => openLightbox(galleryItems[6])}
            >
              <img
                src={galleryItems[6].image}
                alt={galleryItems[6].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute top-3 left-3 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                {galleryItems[6].tag}
              </span>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif text-base leading-tight">{galleryItems[6].title}</h3>
                <p className="text-white/70 text-xs uppercase tracking-widest mt-0.5">{galleryItems[6].subtitle}</p>
                <button className="mt-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs hover:bg-white/30 transition-colors">
                  {galleryItems[6].cta}
                </button>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                  <Maximize2 size={13} className="text-white" />
                </div>
              </div>
            </div>
            {/* Col 1+2 Row 2 — Konark wide */}
            <div
              className="col-span-2 relative rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(galleryItems[5])}
            >
              <img
                src={galleryItems[5].image}
                alt={galleryItems[5].title}
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif text-base leading-tight">{galleryItems[5].title}</h3>
                <p className="text-white/70 text-xs uppercase tracking-widest mt-0.5">{galleryItems[5].subtitle}</p>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                  <Maximize2 size={13} className="text-white" />
                </div>
              </div>
            </div>
          </div>
 
        </motion.div>
      </div>
 
      <Footer />
 
      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="w-full object-cover max-h-[80vh]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute top-4 right-4">
                <button
                  onClick={closeLightbox}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
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
    </main>
  )
}