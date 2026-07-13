import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Medal, Globe, Heart } from "lucide-react";
 
const GlobalReachIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
    <ellipse cx="40" cy="42" rx="26" ry="26" fill="#E8F4F8" />
    <circle cx="40" cy="38" r="20" fill="none" stroke="#4A90D9" strokeWidth="2.5"/>
    <ellipse cx="40" cy="38" rx="8" ry="20" fill="none" stroke="#4A90D9" strokeWidth="2"/>
    <line x1="20" y1="38" x2="60" y2="38" stroke="#4A90D9" strokeWidth="2"/>
    <line x1="22" y1="28" x2="58" y2="28" stroke="#4A90D9" strokeWidth="1.5"/>
    <line x1="22" y1="48" x2="58" y2="48" stroke="#4A90D9" strokeWidth="1.5"/>
    <circle cx="52" cy="24" r="10" fill="#FF5252"/>
    <circle cx="52" cy="24" r="6" fill="white"/>
    <circle cx="52" cy="24" r="3" fill="#FF5252"/>
    <line x1="52" y1="34" x2="52" y2="42" stroke="#FF5252" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
 
const HandshakeIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
    <rect x="8" y="28" width="18" height="28" rx="4" fill="#F5C842" stroke="#E6A800" strokeWidth="1.5"/>
    <rect x="54" y="28" width="18" height="28" rx="4" fill="#F5C842" stroke="#E6A800" strokeWidth="1.5"/>
    <path d="M26 36 L34 30 L46 30 L54 36" stroke="#C8A000" strokeWidth="2" fill="none"/>
    <path d="M26 44 C30 44 32 40 40 40 C48 40 50 44 54 44" stroke="#8B6914" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M28 50 L38 42 L42 44 L52 50" stroke="#8B6914" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M32 54 L40 48 L48 54" stroke="#8B6914" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <rect x="22" y="14" width="14" height="18" rx="3" fill="#8B6FD4" stroke="#6B4FB4" strokeWidth="1.5"/>
    <rect x="25" y="17" width="8" height="2" rx="1" fill="white"/>
    <rect x="25" y="21" width="8" height="2" rx="1" fill="white"/>
    <rect x="25" y="25" width="5" height="2" rx="1" fill="white"/>
  </svg>
)
 
const CustomerFirstIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
    <circle cx="40" cy="28" r="10" fill="#F4A57A" stroke="#E07040" strokeWidth="1.5"/>
    <path d="M18 62 C18 48 28 42 40 42 C52 42 62 48 62 62" fill="#4AABDB" stroke="#2A8BBB" strokeWidth="1.5"/>
    <circle cx="20" cy="30" r="7" fill="#F4A57A" stroke="#E07040" strokeWidth="1.5"/>
    <path d="M6 55 C6 45 12 40 20 40 C24 40 28 42 30 45" fill="#F4A57A" stroke="#E07040" strokeWidth="1.5"/>
    <circle cx="60" cy="30" r="7" fill="#F4A57A" stroke="#E07040" strokeWidth="1.5"/>
    <path d="M74 55 C74 45 68 40 60 40 C56 40 52 42 50 45" fill="#F4A57A" stroke="#E07040" strokeWidth="1.5"/>
  </svg>
)
 
const CompassIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
    <circle cx="40" cy="40" r="26" fill="white" stroke="#2AACDB" strokeWidth="3"/>
    <circle cx="40" cy="40" r="20" fill="none" stroke="#2AACDB" strokeWidth="1.5" strokeDasharray="3 3"/>
    <polygon points="40,18 44,38 40,34 36,38" fill="#FF5252"/>
    <polygon points="40,62 44,42 40,46 36,42" fill="#888"/>
    <circle cx="40" cy="40" r="4" fill="#2AACDB"/>
    <circle cx="40" cy="40" r="2" fill="white"/>
    <text x="40" y="13" textAnchor="middle" fontSize="7" fill="#2AACDB" fontWeight="bold">N</text>
    <text x="40" y="72" textAnchor="middle" fontSize="7" fill="#888">S</text>
    <text x="68" y="43" textAnchor="middle" fontSize="7" fill="#888">E</text>
    <text x="12" y="43" textAnchor="middle" fontSize="7" fill="#888">W</text>
  </svg>
)
 
const missionItems = [
  {
    icon: Users,
    title: "Global Reach",
    description:
      "Connecting travelers to destinations across the globe with local expertise.",
  },
  {
    icon: Medal,
    title: "Trusted Partnerships",
    description:
      "Working with verified hotels, airlines, and local guides for quality service.",
  },
  {
    icon: Globe,
    title: "Customer First",
    description:
      "Your satisfaction is our priority with 24/7 support and flexible bookings.",
  },
  {
    icon: Heart,
    title: "Guided by Passion",
    description:
      "Our team of travel enthusiasts curates experiences that inspire.",
  },
];
 
function MissionCard({ item, index }) {
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
  );
}
 
export function MissionSection() {
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
          <h2 className="text-4xl lg:text-6xl font-serif text-teal mb-4">Our Mission & Vision</h2>
        </motion.div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          {missionItems.map((item, index) => (
            <MissionCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}