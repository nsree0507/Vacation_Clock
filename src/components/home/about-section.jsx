import { motion } from 'framer-motion'
import images from '@/utils/localImages'
 
export function AboutSection() {
  return (
    <section id="about" className="py-4 lg:py-4 px-4 lg:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-6xl font-serif text-foreground mb-2">About</h2>
            <h2 className="text-4xl lg:text-6xl font-serif italic text-teal mb-8">Vacation Clock</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We are a passionate travel company dedicated to crafting unforgettable journeys. From relaxing getaways to thrilling adventures, we turn your travel dreams into reality with personalised service and expert guidance.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With years of experience and trusted global partnerships, we ensure seamless travel experiences — offering unbeatable deals, comfortable stays, and hassle-free arrangements.
            </p>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-border">
              <img
                src={images.goa}
                alt="Tropical beach view"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
                <p className="text-lg font-semibold text-teal">Your Journey,</p>
                <p className="text-lg font-semibold text-teal">Our Passion</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}