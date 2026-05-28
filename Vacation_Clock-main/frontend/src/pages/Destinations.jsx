import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/tourism/Header';
import Footer from '@/components/tourism/Footer';
import { MapPin, ArrowRight, Search, Grid, List } from 'lucide-react';
import statesData from '@/public/data/states.json';
import { bannerImages, fallbackImage, stateHeroImages } from '@/src/assets/images';

const regionData = [
  { id: 'north', name: 'North India', image: bannerImages.north[0] || fallbackImage },
  { id: 'south', name: 'South India', image: bannerImages.south[0] || fallbackImage },
  { id: 'east', name: 'East India', image: bannerImages.east[0] || fallbackImage },
  { id: 'west', name: 'West India', image: bannerImages.west[0] || fallbackImage },
  { id: 'central', name: 'Central India', image: bannerImages.central[0] || fallbackImage },
  { id: 'northeast', name: 'Northeast India', image: bannerImages.northeast[0] || fallbackImage },
];

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const regions = useMemo(() => statesData.regions, []);
  const allStates = regions.flatMap((region) => region.states);

  const filteredStates = searchQuery
    ? allStates.filter(
        (state) =>
          state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          state.region.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : allStates;

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 mb-6">
              <MapPin className="w-4 h-4 text-[#C9A96E]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#C9A96E] font-medium">All Destinations</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
              Explore <span className="text-[#C9A96E]">India</span>
            </h1>
            <p className="text-lg text-[#888] max-w-2xl mx-auto">
              Discover 28 unique states across 6 magnificent regions. Each destination offers its own blend of culture, adventure, and unforgettable experiences.
            </p>
          </div>

          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888]" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#1F1F1F] border border-[#C9A96E]/20 rounded-xl text-white placeholder:text-[#666] focus:outline-none focus:border-[#C9A96E] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {regionData.map((region) => (
              <Link key={region.id} to={`/destinations/${region.id}`} className="group relative h-40 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${region.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
                <div className="absolute inset-0 flex items-end p-4">
                  <h3 className="text-white font-semibold text-sm group-hover:text-[#C9A96E] transition-colors">{region.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-white">
              {searchQuery ? `Search Results (${filteredStates.length})` : `All States (${allStates.length})`}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#C9A96E] text-[#0A0A0A]' : 'bg-[#1F1F1F] text-[#888]'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#C9A96E] text-[#0A0A0A]' : 'bg-[#1F1F1F] text-[#888]'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredStates.map((state) => (
                <Link
                  key={state.id}
                  to={`/state/${state.id}`}
                  className="group p-5 bg-[#1F1F1F] rounded-xl border border-[#C9A96E]/10 hover:border-[#C9A96E]/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                    <img
                      src={stateHeroImages[state.id] || fallbackImage}
                      alt={state.name}
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
                  </div>
                  <h3 className="font-semibold text-white mb-1 group-hover:text-[#C9A96E] transition-colors">{state.name}</h3>
                  <p className="text-xs text-[#888] mb-3">{state.region} India</p>
                  <div className="flex flex-wrap gap-1">
                    {state.highlights?.slice(0, 2).map((highlight) => (
                      <span key={highlight} className="text-[10px] px-2 py-0.5 bg-[#C9A96E]/10 text-[#C9A96E] rounded">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredStates.map((state) => (
                <Link
                  key={state.id}
                  to={`/state/${state.id}`}
                  className="group flex items-center gap-4 p-4 bg-[#1F1F1F] rounded-xl border border-[#C9A96E]/10 hover:border-[#C9A96E]/40 transition-all"
                >
                  <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={stateHeroImages[state.id] || fallbackImage} alt={state.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white group-hover:text-[#C9A96E] transition-colors">{state.name}</h3>
                    <p className="text-xs text-[#888]">{state.region} India</p>
                  </div>
                  <div className="hidden md:flex flex-wrap gap-1 max-w-xs">
                    {state.highlights?.slice(0, 3).map((highlight) => (
                      <span key={highlight} className="text-[10px] px-2 py-0.5 bg-[#C9A96E]/10 text-[#C9A96E] rounded">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#888] group-hover:text-[#C9A96E] group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
