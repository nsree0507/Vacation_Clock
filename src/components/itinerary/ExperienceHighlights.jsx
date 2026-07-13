import { Waves, Mountain, Landmark, UtensilsCrossed, MapPinned, Star } from 'lucide-react'

const ICONS = [Waves, Mountain, Landmark, UtensilsCrossed, MapPinned]

export function ExperienceHighlights({ highlights = [] }) {
  if (!highlights.length) return null

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif text-gray-900">Experience Highlights</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {highlights.map((highlight, index) => {
          const Icon = ICONS[index % ICONS.length] || Star
          return (
            <div
              key={highlight}
              className="group rounded-2xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-teal/30 transition-all duration-300 flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center group-hover:bg-teal group-hover:text-white text-teal transition-colors duration-300">
                <Icon size={20} />
              </div>
              <p className="text-sm font-semibold text-gray-800 leading-snug">{highlight}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
