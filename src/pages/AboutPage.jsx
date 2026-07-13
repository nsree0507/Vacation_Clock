import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { GallerySection } from '@/components/home/gallery-section'
import { Footer } from '@/components/footer'
import {
  Users, Award, Globe, Heart, Star, MapPin, Camera, Shield,
  TrendingUp, Clock, CheckCircle, Briefcase, Plane, Mountain, Phone
} from 'lucide-react'
import images from '@/utils/localImages'
 
const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '5000+', label: 'Happy Travelers' },
  { value: '120+', label: 'Destinations' },
  { value: '4.9★', label: 'Average Rating' },
]
 
const missionPoints = [
  { icon: Globe, title: 'Explore Responsibly', desc: 'Sustainable travel that uplifts local communities and preserves natural heritage.' },
  { icon: Heart, title: 'Crafted with Passion', desc: 'Every itinerary is hand-curated by experts who live and breathe travel.' },
  { icon: Shield, title: 'Safe & Trustworthy', desc: 'Traveler safety and transparent pricing are non-negotiable for us.' },
]
 
const services = [
  { icon: Plane, title: 'Flight Booking', desc: 'Best-price domestic and international flight tickets with flexible change options.' },
  { icon: Briefcase, title: 'Holiday Packages', desc: 'All-inclusive curated packages covering accommodation, meals, and guided tours.' },
  { icon: Camera, title: 'Photography Tours', desc: 'Specialist-led photography expeditions to India\'s most scenic locations.' },
  { icon: Users, title: 'Group Tours', desc: 'Carefully managed group travel with expert guides and seamless logistics.' },
  { icon: Heart, title: 'Honeymoon Trips', desc: 'Romantic escapes tailored for couples with private experiences and luxury stays.' },
  { icon: Mountain, title: 'Adventure Travel', desc: 'Trekking, camping, and adrenaline experiences across India\'s diverse landscapes.' },
  { icon: Phone, title: 'Caretaker Service', desc: '24/7 dedicated travel concierge available throughout your entire journey.' },
  { icon: Clock, title: 'Corporate Travel', desc: 'End-to-end MICE and corporate travel management for teams of all sizes.' },
]
 
const team = [
  {
    name: 'Rajesh Kumar',
    role: 'Founder & CEO',
    bio: '20+ years in Indian tourism. Former head of ITDC North India.',
    image: images.rajasthan,
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Operations',
    bio: 'Logistics expert who has coordinated 3,000+ tours across 14 states.',
    image: images.kerala,
  },
  {
    name: 'Amit Patel',
    role: 'Senior Travel Expert',
    bio: 'Trekking specialist and certified guide for Himalayan expeditions.',
    image: images.goa,
  },
  {
    name: 'Sneha Reddy',
    role: 'Customer Relations',
    bio: 'Ensures every traveler feels heard and supported before, during, and after the trip.',
    image: images.himachal,
  },
]
 
const reviews = [
  {
    name: 'Arjun Mehta',
    location: 'Mumbai',
    rating: 5,
    text: 'Vacation Clock turned our Rajasthan trip into a fairy tale. Every detail was thought through — the heritage hotels, the folk performances, even the sunrise timing at Jaisalmer fort.',
    trip: 'Rajasthan Heritage Tour',
  },
  {
    name: 'Divya Nair',
    location: 'Bangalore',
    rating: 5,
    text: 'I was nervous about solo travel in the Himalayas, but their caretaker service was exceptional. I had a point of contact at every stage and felt completely safe throughout.',
    trip: 'Himachal Solo Trek',
  },
  {
    name: 'Rohan & Meera Joshi',
    location: 'Pune',
    rating: 5,
    text: 'Our honeymoon in Kerala exceeded every expectation. The houseboat experience they arranged was magical — private, well-staffed, and utterly romantic.',
    trip: 'Kerala Honeymoon Package',
  },
  {
    name: 'Kiran Reddy',
    location: 'Hyderabad',
    rating: 5,
    text: 'Booked a group trip to Goa for 18 people. Zero chaos. Everything was coordinated perfectly. Will be booking every company outing through Vacation Clock from now on.',
    trip: 'Goa Group Tour',
  },
]
 
const achievements = [
  { icon: Award, value: '2023', label: 'Best Travel Agency — India Tourism Awards' },
  { icon: TrendingUp, value: '#1', label: 'Rated Platform for Domestic Travel' },
  { icon: CheckCircle, value: '5000+', label: 'Successful Tour Completions' },
  { icon: Globe, value: '14', label: 'Indian States Covered' },
  { icon: Users, value: '98%', label: 'Customer Satisfaction Rate' },
  { icon: MapPin, value: '120+', label: 'Unique Destination Itineraries' },
]
 
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])
 
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
 
      {/* ── Hero / Company Introduction ─────────────────────────────────── */}
      <section className="pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-sm font-semibold tracking-widest uppercase text-gold mb-3 block">
                Our Story
              </span>
              <h1 className="text-4xl lg:text-6xl font-serif text-foreground mb-2 leading-tight">
                About
              </h1>
              <h2 className="text-4xl lg:text-6xl font-serif text-teal italic mb-6 leading-tight">
                Vacation Clock
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 text-base">
                Founded in 2014, Vacation Clock was born from a simple belief — that India's landscapes, cultures,
                and hidden gems deserve to be experienced by every Indian. What started as a small passion project
                run out of a Delhi apartment has grown into one of the country's most trusted travel companies.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 text-base">
                We don't just plan trips — we craft journeys. Every route, stay, and moment is chosen with intention,
                ensuring that when you travel with us, you return transformed. Across 14 states and 120+ destinations,
                we've helped over 5,000 travelers find their perfect India.
              </p>
 
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-card rounded-xl shadow-sm border border-border/40">
                    <p className="text-2xl font-serif text-teal font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-snug">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
 
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={images.premiumResort}
                  alt="Vacation Clock travel experience"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg inline-block">
                    <p className="text-lg font-serif text-teal">Your Journey,</p>
                    <p className="text-lg font-serif text-gold">Our Passion</p>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-teal text-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-xl">
                <span className="text-2xl font-serif font-bold">10+</span>
                <span className="text-xs text-center leading-tight px-2">Years of Travel</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
 
      {/* ── Mission & Vision ────────────────────────────────────────────── */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="text-sm font-semibold tracking-widest uppercase text-gold mb-3 block">Why We Exist</span>
            <h2 className="text-3xl lg:text-5xl font-serif text-teal mb-4">Mission & Vision</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We exist to make extraordinary travel accessible — not just to those who can afford a travel agent,
              but to every curious soul who wants to explore the length and breadth of India.
            </p>
          </motion.div>
 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch mb-12">
            {/* Mission */}
            <motion.div {...fadeUp(0.1)} className="bg-teal text-white rounded-2xl p-10 flex flex-col">
              <h3 className="text-2xl font-serif mb-4">Our Mission</h3>
              <p className="leading-relaxed opacity-90 flex-1">
                To democratise incredible travel experiences across India by combining local expertise,
                transparent pricing, and genuine care — ensuring every traveler feels supported from the
                first search to the final farewell.
              </p>
            </motion.div>
 
            {/* Vision */}
            <motion.div {...fadeUp(0.2)} className="bg-card border border-border/40 rounded-2xl p-10 flex flex-col">
              <h3 className="text-2xl font-serif text-teal mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed flex-1">
                To become India's most beloved travel companion — the platform that every traveler trusts
                the moment they decide to explore. We envision a world where responsible, joyful travel
                is the norm, not the exception.
              </p>
            </motion.div>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {missionPoints.map((point, i) => (
              <motion.div
                key={point.title}
                {...fadeUp(0.1 * i)}
                className="bg-card rounded-2xl p-6 flex gap-4 items-start border border-border/40 shadow-sm"
              >
                <div className="w-12 h-12 shrink-0 bg-teal/10 rounded-full flex items-center justify-center">
                  <point.icon size={22} className="text-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{point.title}</h4>
                  <p className="text-sm text-muted-foreground">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── Services Offered ────────────────────────────────────────────── */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="text-sm font-semibold tracking-widest uppercase text-gold mb-3 block">What We Do</span>
            <h2 className="text-3xl lg:text-5xl font-serif text-teal mb-4">Services Offered</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From a solo adventure to a 50-person corporate retreat, we have the expertise to make it extraordinary.
            </p>
          </motion.div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                {...fadeUp(0.05 * i)}
                className="group bg-card border border-border/40 rounded-2xl p-6 hover:border-teal/50 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 mb-4 bg-teal/10 group-hover:bg-teal/20 rounded-xl flex items-center justify-center transition-colors">
                  <service.icon size={22} className="text-teal" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── Team ────────────────────────────────────────────────────────── */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="text-sm font-semibold tracking-widest uppercase text-gold mb-3 block">The People</span>
            <h2 className="text-3xl lg:text-5xl font-serif text-teal mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate travel experts who have personally explored the destinations they recommend.
            </p>
          </motion.div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                {...fadeUp(0.1 * i)}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm border border-border/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-teal mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── Customer Reviews ─────────────────────────────────────────────── */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="text-sm font-semibold tracking-widest uppercase text-gold mb-3 block">Real Stories</span>
            <h2 className="text-3xl lg:text-5xl font-serif text-teal mb-4">What Travelers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Over 5,000 journeys. These are just a few of the stories that mean the most to us.
            </p>
          </motion.div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.name}
                {...fadeUp(0.1 * i)}
                className="bg-card border border-border/40 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, si) => (
                    <Star key={si} size={16} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-5 text-sm italic">
                  "{review.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                  </div>
                  <span className="text-xs bg-teal/10 text-teal px-3 py-1 rounded-full">
                    {review.trip}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── Travel Achievements ──────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-teal text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="text-sm font-semibold tracking-widest uppercase text-gold mb-3 block">Milestones</span>
            <h2 className="text-3xl lg:text-5xl font-serif mb-4">Travel Achievements</h2>
            <p className="opacity-80 max-w-2xl mx-auto">
              Numbers that reflect the trust thousands of travelers have placed in us over the past decade.
            </p>
          </motion.div>
 
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {achievements.map((ach, i) => (
              <motion.div
                key={ach.label}
                {...fadeUp(0.08 * i)}
                className="rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                style={{ backgroundColor: '#ffffff' }}
              >
                <div className="w-11 h-11 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(15,118,110,0.1)' }}>
                  <ach.icon size={20} style={{ color: '#0F766E' }} />
                </div>
                <p className="text-2xl font-serif font-bold mb-1" style={{ color: '#0F766E' }}>{ach.value}</p>
                <p className="text-xs leading-snug" style={{ color: 'rgba(15,118,110,0.75)' }}>{ach.label}</p>
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