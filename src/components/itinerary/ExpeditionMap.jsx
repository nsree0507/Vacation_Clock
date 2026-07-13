import { useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
 
// Builds a teal numbered pin icon matching the site's accent color
function createPinIcon(number, active) {
  const bg = active ? '#0F766E' : '#ffffff'
  const fg = active ? '#ffffff' : '#0F766E'
  const border = '#0F766E'
 
  const html = `
    <div style="
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: ${bg};
      border: 2px solid ${border};
      box-shadow: 0 4px 10px rgba(15,118,110,0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 13px;
      color: ${fg};
      font-family: inherit;
    ">${number}</div>
  `
 
  return L.divIcon({
    html,
    className: 'expedition-pin',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  })
}
 
// Fallback only: derives a small spread of coordinates around a center
// point, used when a day's real location can't be geocoded (offline,
// rate-limited, or no match found) so the map never breaks or goes empty.
function buildScatterPoints(center, count) {
  const [lat, lng] = center
  const points = []
  for (let i = 0; i < count; i++) {
    const angle = (i / Math.max(count - 1, 1)) * Math.PI * 0.9
    const radius = 0.06 + i * 0.015
    points.push([
      lat + Math.sin(angle) * radius * (i % 2 === 0 ? 1 : -1) * 0.6,
      lng + Math.cos(angle) * radius - radius * 0.4 + i * 0.03,
    ])
  }
  return points
}
 
// --- Real geocoding via OpenStreetMap's Nominatim (same provider as the
// map tiles below), so each day's marker points at its actual place
// instead of a made-up scattered coordinate. ---
//
// A module-level cache + request queue: repeat lookups (revisiting a page,
// multiple ExpeditionMap instances) resolve instantly from cache, and
// fresh lookups are chained one-at-a-time with a short gap to stay well
// within Nominatim's public "no heavy/parallel use" policy. For production
// traffic at scale, proxy this through your own backend with a persistent
// cache instead of calling Nominatim directly from the browser.
const geocodeCache = new Map()
let geocodeQueue = Promise.resolve()
 
function geocodePlace(query) {
  const key = query.trim().toLowerCase()
  if (geocodeCache.has(key)) return geocodeCache.get(key)
 
  const pending = geocodeQueue.then(async () => {
    let point = null
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`
      )
      const data = await res.json()
      if (data?.[0]) point = [parseFloat(data[0].lat), parseFloat(data[0].lon)]
    } catch (err) {
      point = null
    }
    return point
  })
 
  geocodeCache.set(key, pending)
  // Respect Nominatim's ~1 request/second public usage policy before the
  // next queued lookup fires.
  geocodeQueue = pending.then(() => new Promise((resolve) => setTimeout(resolve, 1100)))
 
  return pending
}
 
function FitBounds({ points }) {
  const map = useMap()
  useMemo(() => {
    if (points.length > 1) {
      map.fitBounds(points, { padding: [40, 40] })
    } else if (points.length === 1) {
      map.setView(points[0], 12)
    }
  }, [points, map])
  return null
}
 
export function ExpeditionMap({ state, activeDay, expanded = false }) {
  // `state.itinerary` can briefly be undefined while DB-driven destinations
  // are still resolving (no matching itinerary loaded yet), so always fall
  // back to an empty array instead of crashing the whole page.
  const itineraryDays = state?.itinerary || []
  const fallbackCenter = state?.mapData?.center || [22.97, 78.65]
 
  const [points, setPoints] = useState(() => buildScatterPoints(fallbackCenter, itineraryDays.length))
  const requestIdRef = useRef(0)
  const dayKey = itineraryDays.map((d) => d.title).join('|')
 
  useEffect(() => {
    if (!itineraryDays.length) return
    const thisRequest = ++requestIdRef.current
 
    // Show the best guess immediately (real center, scattered days) while
    // real geocoding runs in the background.
    setPoints(buildScatterPoints(fallbackCenter, itineraryDays.length))
 
    const locationContext = [state?.name, state?.region, 'India'].filter(Boolean).join(', ')
 
    const run = async () => {
      const scatter = buildScatterPoints(fallbackCenter, itineraryDays.length)
      const resolved = await Promise.all(
        itineraryDays.map((day, idx) =>
          geocodePlace(`${day.title}, ${locationContext}`).catch(() => null)
        )
      )
      if (requestIdRef.current !== thisRequest) return // props changed mid-flight
 
      const finalPoints = resolved.map((point, idx) => point || scatter[idx])
      setPoints(finalPoints)
    }
 
    run()
    // Re-run whenever the actual set of day titles or destination context changes.
  }, [dayKey, state?.name, state?.region])
 
  if (!itineraryDays.length) return null
 
  return (
    <MapContainer
      center={points[0] || fallbackCenter}
      zoom={state?.mapData?.zoom || 8}
      scrollWheelZoom={expanded}
      dragging={true}
      className={expanded ? 'w-full h-full' : 'w-full h-full rounded-2xl'}
      style={{ zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
 
      <FitBounds points={points} />
 
      <Polyline
        positions={points}
        pathOptions={{ color: '#0F766E', weight: 3, dashArray: '6, 8', opacity: 0.85 }}
      />
 
      {itineraryDays.map((day, idx) => (
        <Marker key={idx} position={points[idx]} icon={createPinIcon(idx + 1, idx === activeDay)}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold text-gray-900">
                Day {idx + 1}: {day.title}
              </p>
              <p className="text-gray-600 mt-1">{day.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}