import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { GallerySection } from '@/components/home/gallery-section'
import { Footer } from '@/components/footer'
import {
  HeartHandshake,
  Camera,
  Accessibility,
  Stethoscope,
  PhoneCall,
  UserCheck,
  Plane,
  Users,
  BookImage,
  ShieldPlus,
} from 'lucide-react'
import caretakerImage from '@/assets/images/images/services/caretaker-service.png'
import photographerImage from '@/assets/images/images/services/photographer-service.png'
 
const services = [
  {
    id: 'caretaker',
    icon: HeartHandshake,
    image: caretakerImage,
    title: 'Caretaker Service',
    tagline: 'Compassionate support for every traveler in need',
    description:
      'We believe travel is for everyone. Our special caretaker support ensures that elderly travelers, physically challenged individuals, and those requiring medical assistance can explore India comfortably and confidently — with a dedicated professional by their side at all times.',
    supportedFor: [
      { icon: UserCheck, label: 'Elderly People' },
      { icon: Accessibility, label: 'Physically Challenged Travelers' },
      { icon: Stethoscope, label: 'Medical Assistance During Travel' },
    ],
    features: [
      { icon: UserCheck, label: 'Trained Caretakers', desc: 'Professionally trained in patient care and travel assistance.' },
      { icon: PhoneCall, label: 'Emergency Support', desc: '24/7 emergency helpline and on-ground response.' },
      { icon: Accessibility, label: 'Wheelchair Assistance', desc: 'Seamless wheelchair support at airports, stations & hotels.' },
      { icon: Stethoscope, label: 'Medical Support Contacts', desc: 'Access to verified doctors and hospitals en route.' },
    ],
    gradientFrom: '#f0fdf9',
    gradientTo: '#ecfdf5',
    accent: '#0a6b5e',
  },
  {
    id: 'photographer',
    icon: Camera,
    image: photographerImage,
    title: 'Photographer Service',
    tagline: 'Capture every moment of your journey in stunning detail',
    description:
      'Your travel memories deserve to last forever. Book a professional photographer for your trip and come back with a stunning digital album — from sweeping drone shots to intimate couple portraits and joyful family captures.',
    supportedFor: null,
    features: [
      { icon: Camera, label: 'Personal Photographer', desc: 'A dedicated photographer assigned just for you.' },
      { icon: Plane, label: 'Drone Photography', desc: 'Aerial shots that capture the grandeur of your destination.' },
      { icon: HeartHandshake, label: 'Couple Photography', desc: 'Romantic, cinematic frames for couples and honeymooners.' },
      { icon: Users, label: 'Family Photography', desc: 'Fun, natural family portraits in the most scenic spots.' },
      { icon: BookImage, label: 'Instant Digital Album', desc: 'A polished digital album delivered within 48 hours.' },
    ],
    gradientFrom: '#fffbeb',
    gradientTo: '#fff7ed',
    accent: '#b45309',
  },
]
 
export default function ServicesPage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      // Wait a tick for the page/cards to render before measuring positions
      const timer = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' })
        }
      }, 0)
      return () => clearTimeout(timer)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [hash])

  return (
    <main className="min-h-screen">
      <Navbar />
 
      {/* Hero */}
      <section className="pt-28 pb-12 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl lg:text-5xl font-serif text-teal mb-4">Our Services</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Thoughtfully designed services to make your travel experience safer, more comfortable, and beautifully memorable.
          </p>
        </motion.div>
      </section>
 
      {/* Service Cards */}
      <section className="pb-24 px-4">
        <div className="max-w-5xl mx-auto space-y-16">
          {services.map((service, index) => {
            const imageOnRight = index % 2 === 1
            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-md border border-border scroll-mt-24"
              >
                {/* Image */}
                <div
                  className={`relative min-h-[260px] lg:min-h-[520px] order-1 ${
                    imageOnRight ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(180deg, transparent 60%, ${service.accent}33)` }}
                  />
                </div>

                {/* Content */}
                <div className={`order-2 flex flex-col ${imageOnRight ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Card Header */}
                  <div
                    className="px-8 py-10 flex-1"
                    style={{ background: `linear-gradient(135deg, ${service.gradientFrom}, ${service.gradientTo})` }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: service.accent + '20' }}
                      >
                        <service.icon size={30} style={{ color: service.accent }} />
                      </div>
                      <div>
                        <h2 className="text-2xl lg:text-3xl font-serif font-semibold" style={{ color: service.accent }}>
                          {service.title}
                        </h2>
                        <p className="text-sm text-muted-foreground">{service.tagline}</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Supported For (Caretaker only) */}
                    {service.supportedFor && (
                      <div className="mt-6">
                        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: service.accent }}>
                          Available for
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {service.supportedFor.map((item) => (
                            <div
                              key={item.label}
                              className="flex items-center gap-2 bg-white/70 rounded-full px-4 py-1.5 text-sm font-medium"
                              style={{ color: service.accent }}
                            >
                              <item.icon size={15} />
                              {item.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Features Grid */}
                  <div className="bg-card px-8 py-8">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
                      What's Included
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {service.features.map((feature) => (
                        <div key={feature.label} className="flex items-start gap-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                            style={{ backgroundColor: service.accent + '15' }}
                          >
                            <feature.icon size={16} style={{ color: service.accent }} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{feature.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>
      <GallerySection />
      <Footer />
    </main>
  )
}