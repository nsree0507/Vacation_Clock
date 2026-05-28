import { Link } from 'react-router-dom';
import Header from '@/components/tourism/Header';
import Footer from '@/components/tourism/Footer';
import { bannerImages, stateHeroImages } from '@/src/assets/images';
import {
  Award,
  Users,
  MapPin,
  Calendar,
  Heart,
  Shield,
  ArrowRight,
  Star,
  CheckCircle,
} from 'lucide-react';

const stats = [
  { value: '10+', label: 'Years Experience', icon: Calendar },
  { value: '50K+', label: 'Happy Travelers', icon: Users },
  { value: '28', label: 'States Covered', icon: MapPin },
  { value: '4.9', label: 'Customer Rating', icon: Star },
];

const values = [
  {
    icon: Heart,
    title: 'Passion for Travel',
    description:
      'We live and breathe travel. Our team consists of passionate explorers who have personally visited every destination we recommend.',
  },
  {
    icon: Shield,
    title: 'Trust & Safety',
    description:
      'Your safety is our priority. We partner only with verified hotels, transport providers, and guides who meet our strict quality standards.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description:
      'We strive for excellence in everything we do, from crafting perfect itineraries to providing round-the-clock customer support.',
  },
];

const team = [
  {
    name: 'Rajesh Kumar',
    role: 'Founder & CEO',
    bio: '15 years in tourism, visited all 28 states of India',
    image: stateHeroImages[19] || bannerImages.home[0],
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Operations',
    bio: 'Expert in luxury travel and customer experience',
    image: stateHeroImages[20] || bannerImages.home[1],
  },
  {
    name: 'Amit Patel',
    role: 'Lead Travel Curator',
    bio: 'Specializes in adventure and cultural tours',
    image: stateHeroImages[25] || bannerImages.home[2],
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 bg-gradient-to-b from-[#141414] to-[#0A0A0A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A96E] rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A96E]/10 rounded-full text-[#C9A96E] text-sm mb-6">
                <Award className="w-4 h-4" /> Award Winning Agency
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                About <span className="text-[#C9A96E]">Vacation Clock</span>
              </h1>
              <p className="text-lg text-[#888] mb-8 leading-relaxed">
                Founded in 2014, Vacation Clock has been transforming travel dreams into reality for over a decade. We believe that every journey should be extraordinary, every destination should tell a story, and every traveler should feel at home.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A96E] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E8D5B5] transition-colors">
                  Get in Touch <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/destinations" className="inline-flex items-center gap-2 px-6 py-3 border border-[#C9A96E]/30 text-[#C9A96E] font-medium rounded-lg hover:bg-[#C9A96E]/10 transition-colors">
                  Explore Destinations
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border border-[#C9A96E]/20">
                <img src={stateHeroImages[4] || bannerImages.home[0]} alt="Taj Mahal at sunset" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#141414] rounded-xl p-4 border border-[#C9A96E]/20 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#C9A96E] flex items-center justify-center">
                    <Award className="w-6 h-6 text-[#0A0A0A]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Best Travel Agency</p>
                    <p className="text-sm text-[#888]">India Tourism Awards 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#141414] border-y border-[#C9A96E]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#C9A96E]/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-[#C9A96E]" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-[#888]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <img src={stateHeroImages[2] || bannerImages.north[0]} alt="Mountain landscape" className="rounded-xl w-full h-48 object-cover border border-[#C9A96E]/10" />
                <img src={stateHeroImages[9] || bannerImages.south[0]} alt="Kerala backwaters" className="rounded-xl w-full h-48 object-cover border border-[#C9A96E]/10 mt-8" />
                <img src={stateHeroImages[1] || bannerImages.north[1]} alt="Delhi architecture" className="rounded-xl w-full h-48 object-cover border border-[#C9A96E]/10 -mt-8" />
                <img src={stateHeroImages[13] || bannerImages.south[1]} alt="Goa beach" className="rounded-xl w-full h-48 object-cover border border-[#C9A96E]/10" />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-[#888]">
                <p>
                  Vacation Clock began with a simple idea: travel should be personal, memorable, and hassle-free. Our founder, Rajesh Kumar, after spending years exploring every corner of India, realized that most travelers miss the true essence of destinations.
                </p>
                <p>
                  What started as a small travel consultancy in Delhi has grown into one of India's most trusted travel agencies, serving over 50,000 happy travelers and counting.
                </p>
                <p>
                  Today, we specialize in crafting personalized journeys across all 28 states of India, from the snow-capped Himalayas to the serene backwaters of Kerala, ensuring every trip is as unique as the traveler undertaking it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-[#888] max-w-2xl mx-auto">
              These principles guide everything we do, from planning your perfect itinerary to ensuring you return home with memories that last a lifetime.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-[#1F1F1F] rounded-xl p-6 border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-[#C9A96E]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-3">{value.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-[#888] max-w-2xl mx-auto">Passionate travel experts dedicated to making your journey unforgettable</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-2 border-[#C9A96E]/20 group-hover:border-[#C9A96E]/50 transition-colors">
                  <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-serif font-bold text-white mb-1">{member.name}</h3>
                <p className="text-[#C9A96E] text-sm mb-2">{member.role}</p>
                <p className="text-sm text-[#888]">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Why Choose Vacation Clock?</h2>
              <div className="space-y-4">
                {[
                  'Personalized itineraries tailored to your preferences',
                  '24/7 on-trip support and assistance',
                  'Best price guarantee with no hidden costs',
                  'Handpicked accommodations and experiences',
                  'Expert local guides in every destination',
                  'Special care for elderly and family travelers',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#C9A96E] flex-shrink-0" />
                    <span className="text-white">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/booking" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A96E] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E8D5B5] transition-colors mt-8">
                Start Planning <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <img src={bannerImages.home[0]} alt="Happy travelers" className="rounded-xl w-full border border-[#C9A96E]/10" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
