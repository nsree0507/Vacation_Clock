import { motion } from 'framer-motion'
import { useState } from 'react'
import { Users, Award, Globe, Heart } from 'lucide-react'

const values = [
  {
    icon: Users,
    title: 'Guided Tours',
    description:
      'Explore beautiful destinations with experienced local guides and curated travel experiences.',
  },
  {
    icon: Award,
    title: 'Best Flights Options',
    description:
      'Get affordable and flexible flight booking options with trusted airline partners worldwide.',
  },
  {
    icon: Globe,
    title: 'Religious Tours',
    description:
      'Experience spiritual journeys and sacred destinations with comfort and personalized planning.',
  },
  {
    icon: Heart,
    title: 'Medical Insurance',
    description:
      'Travel safely with comprehensive medical coverage and emergency assistance services.',
  },
]

function ServiceCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.28, delay: index * 0.08 }}
      whileHover="hover"
      className="relative px-8 py-10 rounded-[32px] text-center overflow-visible cursor-pointer min-h-[410px] flex flex-col items-center justify-start"
    >
      {/* Background Teal Offset Block */}
      <motion.div
        variants={{
          hover: { opacity: 1, scale: 1, x: -14, y: 14 }
        }}
        initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="absolute bottom-0 left-0 w-28 h-28 bg-[#007A78] rounded-[24px] z-0"
      />

      {/* Main Front Card Frame */}
      <motion.div
        variants={{
          hover: { backgroundColor: "#EBF3F5", y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.06)" }
        }}
        initial={{ backgroundColor: "rgba(235, 243, 245, 0)", y: 0, boxShadow: "0 0px 0px rgba(0,0,0,0)" }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="absolute inset-0 z-10 w-full h-full px-8 py-10 rounded-[32px] flex flex-col items-center justify-start"
      >
        {/* Icon */}
        <div className="w-24 h-24 mx-auto mb-6 bg-teal/10 rounded-full flex items-center justify-center">
          <item.icon size={42} className="text-teal" />
        </div>

        <h3 className="text-[28px] font-serif font-semibold text-gray-900 mb-4">
          {item.title}
        </h3>

        <p className="text-[16px] text-gray-600 leading-7 max-w-[220px] mx-auto flex-grow">
          {item.description}
        </p>
      </motion.div>
    </motion.div>
  )
}

export function ServicesSection() {
  return (
    <section id="services" className="py-16 lg:py-10 px-4 bg-secondary/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-5xl font-serif text-teal mb-4">We Offer Best Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover a full suite of travel services designed to make every trip seamless and unforgettable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          {values.map((value, index) => (
            <ServiceCard key={value.title} item={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}