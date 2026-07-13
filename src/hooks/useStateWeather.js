import { useEffect, useState } from 'react'
import { getWeather } from '@/services/weatherService'

/**
 * Fetch weather for a city, re-fetching whenever `city` changes.
 * Safe against race conditions / unmounts: only the latest request updates
 * state. Returns sample data instantly when no weather API key is configured.
 *
 * @param {string|null|undefined} city
 * @returns {{ weather: import('@/services/weatherService').WeatherInfo|null, loading: boolean }}
 */
export function useStateWeather(city) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!city) {
      setWeather(null)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)

    getWeather(city).then((result) => {
      if (cancelled) return
      setWeather(result)
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [city])

  return { weather, loading }
}

export default useStateWeather
