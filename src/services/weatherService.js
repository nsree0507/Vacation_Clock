/**
 * Weather service.
 *
 * Works with zero configuration by returning curated sample weather.
 * To enable LIVE weather later, add an OpenWeatherMap key to your `.env`:
 *
 *     VITE_WEATHER_API_KEY=your_key_here
 *
 * No other change is required — `getWeather()` automatically switches to the
 * live API when the key is present and silently falls back to sample data if
 * the request fails. The shape returned is always the same `WeatherInfo`.
 */

/**
 * @typedef {Object} WeatherInfo
 * @property {number} tempC      Temperature in °C (rounded).
 * @property {string} condition  Human label, e.g. "Cloudy".
 * @property {string} icon       Emoji icon for quick visual cue.
 * @property {string} city       City the reading is for.
 * @property {boolean} isLive    true if from the live API, false if sample.
 */

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

/** Map an OpenWeather "main" condition to a friendly label + emoji. */
const CONDITION_ICONS = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Drizzle: '🌦️',
  Thunderstorm: '⛈️',
  Snow: '❄️',
  Mist: '🌫️',
  Haze: '🌫️',
  Fog: '🌫️',
  Smoke: '🌫️',
}

const iconFor = (condition) => CONDITION_ICONS[condition] || '🌤️'

/**
 * Curated sample weather, keyed by city. Used when no API key is configured
 * (or the live request fails). Values are realistic seasonal averages so the
 * UI always looks complete during development/demos.
 * @type {Record<string, {tempC: number, condition: string}>}
 */
const SAMPLE_WEATHER = {
  Jaipur: { tempC: 34, condition: 'Sunny' },
  Shimla: { tempC: 18, condition: 'Cloudy' },
  Amritsar: { tempC: 30, condition: 'Clear' },
  Srinagar: { tempC: 16, condition: 'Cloudy' },
  Dehradun: { tempC: 27, condition: 'Pleasant' },
  Lucknow: { tempC: 33, condition: 'Sunny' },
  Chandigarh: { tempC: 31, condition: 'Clear' },
  Visakhapatnam: { tempC: 31, condition: 'Humid' },
  Bengaluru: { tempC: 26, condition: 'Pleasant' },
  Kochi: { tempC: 30, condition: 'Rainy' },
  Chennai: { tempC: 33, condition: 'Humid' },
  Hyderabad: { tempC: 29, condition: 'Clear' },
  Patna: { tempC: 32, condition: 'Sunny' },
  Ranchi: { tempC: 28, condition: 'Cloudy' },
  Bhubaneswar: { tempC: 32, condition: 'Humid' },
  Kolkata: { tempC: 31, condition: 'Cloudy' },
  Panaji: { tempC: 30, condition: 'Sunny' },
  Ahmedabad: { tempC: 35, condition: 'Sunny' },
  Mumbai: { tempC: 31, condition: 'Humid' },
  Raipur: { tempC: 33, condition: 'Sunny' },
  Bhopal: { tempC: 30, condition: 'Pleasant' },
  Itanagar: { tempC: 22, condition: 'Misty' },
  Guwahati: { tempC: 29, condition: 'Cloudy' },
  Imphal: { tempC: 24, condition: 'Pleasant' },
  Shillong: { tempC: 20, condition: 'Misty' },
  Aizawl: { tempC: 21, condition: 'Cloudy' },
  Kohima: { tempC: 19, condition: 'Misty' },
  Gangtok: { tempC: 17, condition: 'Cloudy' },
  Agartala: { tempC: 28, condition: 'Humid' },
}

/** A neutral default used when a city has no specific sample entry. */
const DEFAULT_SAMPLE = { tempC: 28, condition: 'Cloudy' }

/**
 * Build a sample `WeatherInfo` for a city.
 * @param {string} city
 * @returns {WeatherInfo}
 */
function getSampleWeather(city) {
  const sample = SAMPLE_WEATHER[city] || DEFAULT_SAMPLE
  return {
    tempC: sample.tempC,
    condition: sample.condition,
    icon: iconFor(sample.condition),
    city,
    isLive: false,
  }
}

/**
 * Get weather for a city. Returns live data when an API key is configured,
 * otherwise curated sample data. Never throws — always resolves to a usable
 * `WeatherInfo`.
 * @param {string} city
 * @returns {Promise<WeatherInfo>}
 */
export async function getWeather(city) {
  if (!city) return getSampleWeather('')
  if (!API_KEY) return getSampleWeather(city)

  try {
    const url = `${API_URL}?q=${encodeURIComponent(city)},IN&units=metric&appid=${API_KEY}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Weather API ${res.status}`)

    const data = await res.json()
    const main = data?.weather?.[0]?.main || 'Clouds'
    return {
      tempC: Math.round(data?.main?.temp ?? DEFAULT_SAMPLE.tempC),
      condition: data?.weather?.[0]?.description
        ? capitalize(data.weather[0].description)
        : main,
      icon: iconFor(main),
      city,
      isLive: true,
    }
  } catch {
    // Graceful fallback keeps the UI working even if the network/API fails.
    return getSampleWeather(city)
  }
}

/**
 * Format a `WeatherInfo` for display, e.g. "28°C, Cloudy".
 * @param {WeatherInfo|null|undefined} weather
 * @returns {string}
 */
export function formatWeather(weather) {
  if (!weather) return ''
  return `${weather.tempC}°C, ${weather.condition}`
}

/** @param {string} s */
const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)

export default getWeather
