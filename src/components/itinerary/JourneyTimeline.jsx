import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Sun, Cloud, CloudRain } from 'lucide-react'

const WEATHER_ICONS = [Sun, Cloud, CloudRain]
const WEATHER_TEMPS = ['22°C', '19°C', '24°C', '17°C', '21°C', '25°C']

export function JourneyTimeline({ days = [], image, activeDay, onSelectDay }) {
  const [carPosition, setCarPosition] = useState(0)
  const [dayPositions, setDayPositions] = useState([])
  const timelineRef = useRef(null)
  const dayCirclesRef = useRef([])
  const scrollContainerRef = useRef(null)

  // Capture day circle positions for car alignment
  useEffect(() => {
    if (dayCirclesRef.current.length === days.length && timelineRef.current) {
      const containerTop = timelineRef.current.getBoundingClientRect().top
      const positions = dayCirclesRef.current.map((el) => {
        const elTop = el.getBoundingClientRect().top
        return elTop - containerTop + el.offsetHeight / 2 - 20 // Center of circle minus half car height
      })
      setDayPositions(positions)
    }
  }, [days.length])

  // Scroll-driven car animation
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer || dayPositions.length === 0 || !timelineRef.current) return

    const handleScroll = () => {
      // Calculate scroll progress for this container
      const scrollTop = scrollContainer.scrollTop
      const scrollHeight = scrollContainer.scrollHeight
      const clientHeight = scrollContainer.clientHeight
      const scrollableHeight = scrollHeight - clientHeight

      let scrollProgress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0
      scrollProgress = Math.max(0, Math.min(1, scrollProgress))

      // Map scroll progress to car position using full timeline height
      const maxPosition = timelineRef.current.offsetHeight || dayPositions[dayPositions.length - 1] || 0
      const newPosition = maxPosition * scrollProgress
      setCarPosition(newPosition)
    }

    scrollContainer.addEventListener('scroll', handleScroll)
    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [dayPositions])

  if (!days.length) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-3xl font-serif text-gray-900">Your Journey</h2>

        {/* Day Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {days.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onSelectDay(idx)}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeDay === idx
                  ? 'bg-teal text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Day {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div ref={scrollContainerRef} className="rounded-3xl bg-white border border-gray-100 shadow-sm p-4 sm:p-6 max-h-[640px] overflow-y-auto">
        <div className="grid grid-cols-[48px_1fr] sm:grid-cols-[64px_1fr] gap-4">
          {/* Timeline rail */}
          <div className="relative flex flex-col items-center">
            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-teal mb-4 tracking-wide">
              START
            </span>

            <div ref={timelineRef} className="relative flex-1 flex flex-col items-stretch w-full">
              <div
                className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(to bottom, #0F766E 0px, #0F766E 4px, transparent 4px, transparent 10px)',
                }}
              />

              {/* Animated Car */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
                animate={{
                  top: `${carPosition}px`,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 25,
                  mass: 1,
                }}
                style={{
                  zIndex: 5,
                }}
              >
                {/* Car icon */}
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-lg"
                  style={{ transform: 'scaleY(-1)' }}
                >
                  {/* Car body */}
                  <rect x="10" y="14" width="28" height="18" rx="2.5" fill="#0F766E" />
                  {/* Car top/cabin */}
                  <rect x="14" y="6" width="20" height="10" rx="2" fill="#0F766E" />
                  {/* Windows */}
                  <rect x="15" y="7" width="18" height="8" rx="1" fill="#d1f0ed" opacity="0.7" />
                  {/* Left wheel */}
                  <circle cx="16" cy="32" r="4" fill="#006b64" />
                  {/* Right wheel */}
                  <circle cx="32" cy="32" r="4" fill="#006b64" />
                  {/* Direction arrow - pointing down */}
                  <path d="M24 38 L22 34 L26 34 Z" fill="#008080" />
                  {/* Headlights */}
                  <circle cx="14" cy="14" r="1.5" fill="#ffd700" opacity="0.8" />
                  <circle cx="34" cy="14" r="1.5" fill="#ffd700" opacity="0.8" />
                </svg>
              </motion.div>

              {days.map((_, idx) => (
                <div
                  key={idx}
                  className="relative flex-1 flex items-center justify-center"
                  style={{ minHeight: '170px' }}
                >
                  <motion.button
                    ref={(el) => {
                      if (el) dayCirclesRef.current[idx] = el
                    }}
                    onClick={() => onSelectDay(idx)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                      activeDay === idx
                        ? 'bg-teal text-white shadow-lg ring-4 ring-teal/20'
                        : 'bg-white text-teal border-2 border-teal'
                    }`}
                  >
                    {idx + 1}
                  </motion.button>
                </div>
              ))}
            </div>

            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-teal mt-4 tracking-wide">
              END
            </span>
          </div>

          {/* Activity cards */}
          <div className="flex flex-col gap-6">
            {days.map((day, idx) => {
              const WeatherIcon = WEATHER_ICONS[idx % WEATHER_ICONS.length]
              const temp = WEATHER_TEMPS[idx % WEATHER_TEMPS.length]
              const isActive = activeDay === idx

              return (
                <motion.div
                  key={idx}
                  onClick={() => onSelectDay(idx)}
                  whileHover={{ y: -4 }}
                  className={`flex items-center self-center rounded-2xl bg-white border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive ? 'border-teal ring-2 ring-teal/20' : 'border-gray-100'
                  }`}
                  style={{ minHeight: '170px', width: '100%' }}
                >
                  <div className="w-32 sm:w-44 h-full flex-shrink-0 self-stretch overflow-hidden">
                    <img
                      src={image}
                      alt={day.title}
                      className="w-full h-full object-cover"
                      style={{ minHeight: '170px' }}
                    />
                  </div>

                  <div className="p-4 sm:p-5 flex-1">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-base sm:text-lg font-serif text-gray-900 leading-snug">
                        {day.title}
                      </h3>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-sky-50 border border-sky-200 rounded-full flex-shrink-0">
                        <WeatherIcon size={14} className="text-amber-500" />
                        <span className="text-xs font-semibold text-gray-700">{temp}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {day.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {day.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-teal/10 text-teal text-[11px] font-bold rounded-full border border-teal/20"
                        >
                          {tag.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
