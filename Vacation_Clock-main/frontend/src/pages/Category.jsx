import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/tourism/Header';
import Footer from '@/components/tourism/Footer';
import statesData from '@/public/data/states.json';
import { bannerImages, categoryImages, fallbackImage, stateHeroImages } from '@/src/assets/images';
import {
  MapPin,
  ArrowRight,
  Star,
  Mountain,
  Waves,
  Building2,
  TreePine,
  Heart,
  Sparkles,
  Users,
} from 'lucide-react';

const categoryInfo = {
  devotional: { title: 'Devotional Journeys', description: 'Sacred temples, spiritual retreats, and pilgrimages across India', icon: Building2, image: categoryImages.devotional },
  adventure: { title: 'Adventure Expeditions', description: 'Thrilling treks, water sports, and adrenaline-pumping experiences', icon: Mountain, image: categoryImages.adventure },
  nature: { title: 'Nature Escapes', description: 'Wildlife sanctuaries, national parks, and eco-tourism destinations', icon: TreePine, image: categoryImages.nature },
  beaches: { title: 'Beach Getaways', description: 'Pristine coastlines, tropical paradises, and coastal retreats', icon: Waves, image: categoryImages.beaches },
  heritage: { title: 'Heritage Tours', description: 'Ancient monuments, historical sites, and cultural landmarks', icon: Building2, image: categoryImages.heritage },
  honeymoon: { title: 'Honeymoon Packages', description: 'Romantic getaways for newlyweds in India\'s most beautiful destinations', icon: Heart, image: categoryImages.honeymoon },
  luxury: { title: 'Luxury Experiences', description: 'Premium stays, exclusive experiences, and five-star service', icon: Sparkles, image: categoryImages.luxury },
  family: { title: 'Family Vacations', description: 'Kid-friendly destinations and activities for the whole family', icon: Users, image: categoryImages.family },
};

export default function CategoryPage() {
  const { category = '' } = useParams();

  const info = categoryInfo[category] || {
    title: category.charAt(0).toUpperCase() + category.slice(1),
    description: 'Explore destinations in this category',
    icon: MapPin,
    image: bannerImages.categories || fallbackImage,
  };

  const allStates = useMemo(() => statesData.regions.flatMap((region) => region.states), []);
  const states = allStates.filter((state) => state.categories?.includes(category));

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative h-[50vh] min-h-[350px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${info.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-12">
          <Link to="/destinations" className="absolute top-28 left-6 text-sm text-white/80 hover:text-[#C9A96E] transition-colors">
            ← Back to Destinations
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-[#C9A96E]/20 flex items-center justify-center">
              <info.icon className="w-7 h-7 text-[#C9A96E]" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">{info.title}</h1>
              <p className="text-lg text-white/80">{info.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#141414] border-y border-[#C9A96E]/10 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#888]">
            Found <span className="text-[#C9A96E] font-semibold">{states.length}</span> destinations for {info.title.toLowerCase()}
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          {states.length === 0 ? (
            <div className="text-center py-20">
              <info.icon className="w-16 h-16 text-[#C9A96E]/30 mx-auto mb-4" />
              <h3 className="text-xl font-serif text-white mb-2">No destinations found</h3>
              <p className="text-[#888] mb-6">We are working on adding more destinations to this category.</p>
              <Link to="/destinations" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A96E] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E8D5B5] transition-colors">
                Explore All Destinations
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {states.map((state) => (
                <Link
                  key={state.id}
                  to={`/state/${state.id}`}
                  className="group bg-[#141414] rounded-xl overflow-hidden border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={stateHeroImages[state.id] || categoryImages.heritage || fallbackImage}
                      alt={state.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="px-2 py-1 bg-[#C9A96E]/20 text-[#C9A96E] text-xs rounded">{state.region} India</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#C9A96E] transition-colors">{state.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-[#888]">
                        <Star className="w-4 h-4 fill-[#C9A96E] text-[#C9A96E]" /> 4.8
                      </div>
                    </div>
                    <p className="text-sm text-[#888] mb-4 line-clamp-2">{state.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {state.highlights?.slice(0, 2).map((highlight) => (
                        <span key={highlight} className="text-xs px-2 py-1 bg-[#1F1F1F] rounded text-[#888]">
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-[#C9A96E]/10">
                      <span className="text-sm text-[#888]">
                        <MapPin className="w-4 h-4 inline mr-1" /> {state.highlights?.length || 0}+ places
                      </span>
                      <span className="text-[#C9A96E] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Explore <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-[#141414]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-12 h-12 text-[#C9A96E] mx-auto mb-4 flex items-center justify-center">
            <MapPin className="w-12 h-12" />
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">Can't find what you're looking for?</h2>
          <p className="text-[#888] mb-6">Our travel experts can create a custom itinerary tailored to your preferences.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A96E] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E8D5B5] transition-colors">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
