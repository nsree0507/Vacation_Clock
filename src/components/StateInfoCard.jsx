import { motion } from 'framer-motion'
import { MapPin, UtensilsCrossed, Sun } from 'lucide-react'
import { formatWeather } from '@/services/weatherService'
 
/**
 * Premium horizontal travel card shown when a state is hovered on the India map.
 * Layout: square photo on the left, then state name, place/food/weather rows,
 * and a duration / transport / family footer strip.
 * Presentational only — positioning + show/hide is handled by the parent.
 *
 * @param {Object} props
 * @param {import('@/data/stateHighlights').StateHighlight & {duration?: string}} props.data
 * @param {import('@/services/weatherService').WeatherInfo|null} [props.weather]
 * @param {boolean} [props.loading]
 */
export default function StateInfoCard({ data, weather, loading = false }) {
  if (!data) return null
 
  const weatherText = formatWeather(weather)
 
  return (
    <motion.div
      // Fade-in + slide-up entrance; smooth exit handled by parent AnimatePresence.
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-[420px] h-[160px] max-w-[92vw] overflow-hidden rounded-3xl bg-white
                 shadow-[0_20px_50px_-12px_rgba(15,118,110,0.45)] ring-1 ring-black/5"
      role="figure"
      aria-label={`${data.stateName} travel highlights`}
    >
      {/* ── Photo ────────────────────────────────────────────────── */}
      <div className="relative w-28 shrink-0 self-stretch sm:w-36">
        {data.imageUrl ? (
          <img
            src={data.imageUrl}
            alt={`${data.famousPlace}, ${data.stateName}`}
            className="h-full w-full object-cover"
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-teal-500 to-cyan-600" />
        )}
        {/* Travel accent strip between photo and content */}
        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-teal-500 via-cyan-400 to-orange-400" />
      </div>
 
      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col p-3">
        {/* Title + weather pill */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-[14px] font-bold leading-tight text-gray-900">
            {data.stateName}
          </h3>
          {weatherText && (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-teal-700">
              <span aria-hidden="true">{weather?.icon}</span>
              {weather?.tempC}°C
            </span>
          )}
        </div>
 
        {/* Place + food + best time */}
        <div className="mt-1.5 space-y-1">
          <Row icon={<MapPin size={13} strokeWidth={2.5} className="text-teal-600" />} value={data.famousPlace} />
          <Row icon={<UtensilsCrossed size={13} strokeWidth={2.5} className="text-orange-500" />} value={data.famousFood} />
          {data.bestTimeToVisit && (
            <Row icon={<Sun size={13} strokeWidth={2.5} className="text-yellow-500" />} value={`Best time: ${data.bestTimeToVisit}`} />
          )}
          <Row
            icon={<span className="text-[11px] leading-none">{weather?.icon || '🌤️'}</span>}
            value={loading && !weather ? 'Checking weather…' : weatherText || '—'}
            muted
          />
        </div>
      </div>
    </motion.div>
  )
}
 
/**
 * A single detail row (icon + value).
 * @param {Object} props
 * @param {React.ReactNode} props.icon
 * @param {string} props.value
 * @param {boolean} [props.muted]
 */
function Row({ icon, value, muted = false }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden="true">
        {icon}
      </span>
      <span className={`truncate text-[13px] ${muted ? 'text-gray-500' : 'font-semibold text-gray-800'}`}>
        {value}
      </span>
    </div>
  )
}