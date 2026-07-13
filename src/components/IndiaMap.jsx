import { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getStateHighlight } from "@/data/stateHighlights";
import { useStateWeather } from "@/hooks/useStateWeather";
import { useWindowSize } from "@/hooks/useWindowSize";
import StateInfoCard from "@/components/StateInfoCard";
import stateApi from "@/services/stateApi";
 
const geoUrl =
  "https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson";
 
// GeoJSON alternate/old names → canonical display name for DB name-lookup
const geoNameAliases = {
  "jammu & kashmir": "Jammu & Kashmir",
  "jammu and kashmir": "Jammu & Kashmir",
  "uttaranchal": "Uttarakhand",
  "orissa": "Odisha",
  "chattisgarh": "Chhattisgarh",
  // Union territories — never in DB
  "andaman and nicobar": null,
  "andaman & nicobar": null,
  "dadra and nagar haveli": null,
  "daman and diu": null,
  "lakshadweep": null,
  "pondicherry": null,
  "puducherry": null,
  "chandigarh": null,
};
 
/**
 * Normalize a state name for comparison purposes only (not for display).
 * Treats "&" and "and" as equivalent and ignores case, punctuation, and
 * extra/odd whitespace, so "Jammu & Kashmir", "Jammu and Kashmir", and
 * "jammu  &  kashmir " (stray spaces) all normalize to the same value.
 * This makes name-matching resilient to small admin-panel typos that
 * would otherwise silently break the map (e.g. a state never highlighting).
 */
const normalizeName = (s) => {
  if (!s) return '';
  return s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '');
};
 
// GeoJSON name → the exact slug used in stateHighlights (for hover card lookup)
// Needed because GeoJSON name may differ from both DB slug and stateHighlights key
const geoNameToHighlightSlug = {
  "jammu & kashmir": "jammu-and-kashmir",
  "jammu and kashmir": "jammu-and-kashmir",
  "uttaranchal": "uttarakhand",
  "orissa": "odisha",
  "chattisgarh": "chhattisgarh",
};
 
function placeCardNearCursor(clientX, clientY) {
  const CARD_W = 420;
  const CARD_H = 180;
  const PAD = 16;
  const OFFSET = 20;
 
  let x = clientX + OFFSET;
  let y = clientY + OFFSET;
 
  if (x + CARD_W + PAD > window.innerWidth) x = clientX - CARD_W - OFFSET;
  if (x < PAD) x = PAD;
  if (y + CARD_H + PAD > window.innerHeight) y = window.innerHeight - CARD_H - PAD;
  if (y < PAD) y = PAD;
 
  return { x, y };
}
 
function IndiaMap({ selectedRegion = 'All' }) {
  const [selectedState, setSelectedState] = useState("");
  const [hoveredState, setHoveredState] = useState(null);
  const [hoveredHighlightSlug, setHoveredHighlightSlug] = useState(null); // for stateHighlights lookup
  const [hoveredDbState, setHoveredDbState] = useState(null);             // raw DB state object
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
  const [dbBySlug, setDbBySlug] = useState({});
  const [dbByName, setDbByName] = useState({});
  const [dbByNormalizedName, setDbByNormalizedName] = useState({});
  const [dbSlugSet, setDbSlugSet] = useState(new Set());
  const navigate = useNavigate();
 
  const { width } = useWindowSize();
  const isMobile = width < 640;
  // Keep the SVG's own width/height (and therefore its aspect ratio) constant
  // across breakpoints. The projection's scale/center are tuned for a
  // 700x760 box; shrinking just the height here (as before) squashed the
  // aspect ratio and made the projection crop southern India off the
  // bottom on phones. Responsive sizing is handled entirely by the CSS
  // `width: 100%` below, which scales the whole map down proportionally
  // instead of cropping it.
  const mapHeight = 760;
 
  useEffect(() => {
    stateApi.getAll()
      .then(res => {
        const bySlug = {};
        const byName = {};
        const byNormalizedName = {};
        const slugs = new Set();
        ;(res.data?.data || []).forEach(s => {
          if (s.slug) {
            bySlug[s.slug] = s;
            slugs.add(s.slug);
          }
          if (s.name) {
            byName[s.name.toLowerCase()] = s;
            byNormalizedName[normalizeName(s.name)] = s;
          }
        });
        setDbBySlug(bySlug);
        setDbByName(byName);
        setDbByNormalizedName(byNormalizedName);
        setDbSlugSet(slugs);
      })
      .catch(() => {});
  }, []);
 
  // stateHighlights lookup using the highlight slug (may differ from DB slug)
  const highlight = getStateHighlight(hoveredHighlightSlug);
 
  // Weather city: prefer stateHighlights entry, fall back to DB state capital
  const weatherCity = highlight?.weatherCity || hoveredDbState?.capital || null;
  const { weather, loading: weatherLoading } = useStateWeather(weatherCity);
 
  // Build the card data:
  // Priority: stateHighlights fields > DB fields > nothing
  const cardData = (() => {
    if (!hoveredDbState && !highlight) return null;
 
    const db = hoveredDbState;
    const h = highlight;
 
    return {
      stateName:       db?.name        || h?.stateName      || '',
      famousPlace:     db?.famousPlaces
                         ? db.famousPlaces.split(',').map(s => s.trim()).filter(Boolean).slice(0, 2).join(', ')
                         : (h?.famousPlace || ''),
      famousFood:      db?.foodAndCulture || h?.famousFood   || '',
      bestTimeToVisit: db?.bestTimeToVisit || null,
      imageUrl:        db?.imageUrl     || h?.imageUrl       || '',
      weatherCity,
    };
  })();
 
  /**
   * Find the DB state for a GeoJSON name.
   * Checks alias table → DB by exact name → DB by normalized name (forgiving
   * of "&" vs "and", extra whitespace, punctuation) → DB by auto-slug.
   */
  const findDbState = (geoName) => {
    if (!geoName) return null;
    const lower = geoName.toLowerCase();
 
    if (geoNameAliases.hasOwnProperty(lower)) {
      const canonical = geoNameAliases[lower];
      if (canonical === null) return null;
      const exact = dbByName[canonical.toLowerCase()];
      if (exact) return exact;
      // Exact match failed (e.g. DB name has different punctuation/spelling) —
      // fall back to a normalized comparison before giving up.
      const normalized = dbByNormalizedName[normalizeName(canonical)];
      if (normalized) return normalized;
    }
 
    if (dbByName[lower]) return dbByName[lower];
 
    const normalizedMatch = dbByNormalizedName[normalizeName(geoName)];
    if (normalizedMatch) return normalizedMatch;
 
    const slugified = lower.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return dbBySlug[slugified] || null;
  };
 
  /**
   * Get the stateHighlights key for a GeoJSON name.
   * First tries the explicit alias table, then uses the DB slug.
   */
  const getHighlightSlug = (geoName, dbState) => {
    if (!geoName) return null;
    const lower = geoName.toLowerCase();
    // Explicit override (e.g. GeoJSON "Jammu & Kashmir" → "jammu-and-kashmir")
    if (geoNameToHighlightSlug[lower]) return geoNameToHighlightSlug[lower];
    // Fall back to whatever slug the DB has
    return dbState?.slug || null;
  };
 
  const slugsInRegion = selectedRegion === 'All'
    ? dbSlugSet
    : new Set(
        Object.values(dbBySlug)
          .filter(s => s.region === selectedRegion)
          .map(s => s.slug)
      );
 
  const goToState = (stateName) => {
    const db = findDbState(stateName);
    if (!db) return;
    setSelectedState(stateName);
    navigate(`/places?type=state&value=${db.slug}`);
  };
 
  const handleEnter = (geoName, event) => {
    setHoveredState(geoName);
    const db = findDbState(geoName);
    const hSlug = getHighlightSlug(geoName, db);
 
    setHoveredDbState(db || null);
    // Only show card if we have a DB state (meaning admin added it)
    if (db) {
      setHoveredHighlightSlug(hSlug);
      if (!isMobile && event) {
        setCardPos(placeCardNearCursor(event.clientX, event.clientY));
      }
    } else {
      setHoveredHighlightSlug(null);
    }
  };
 
  const handleLeave = () => {
    setHoveredState(null);
    setHoveredHighlightSlug(null);
    setHoveredDbState(null);
  };
 
  return (
    <section className="bg-[#f3f2ef] sm:-mt-44">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="relative overflow-hidden" onMouseLeave={handleLeave}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 1050, center: [82.8, 24.5] }}
            width={700}
            height={mapHeight}
            style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}
            className="w-full"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const geoName =
                    geo.properties.NAME_1 ||
                    geo.properties.ST_NM ||
                    geo.properties.NAME ||
                    geo.properties.name;
 
                  const db = findDbState(geoName);
                  const slug = db?.slug || null;
 
                  const active = selectedState === geoName;
                  const isInRegion = !!slug && slugsInRegion.has(slug);
                  const isInDb = !!slug;
 
                  const isHovered = hoveredState === geoName;
                  const someoneHovered = hoveredState !== null;
                  const dimmed = someoneHovered && !isHovered;
                  const highlightHovered = isHovered && isInDb;
 
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => isInDb && goToState(geoName)}
                      onMouseEnter={(event) => handleEnter(geoName, event)}
                      style={{
                        default: {
                          fill: highlightHovered
                            ? "#14b8a6"
                            : active
                            ? "#5bb7ad"
                            : isInRegion
                            ? "#d1f0ed"
                            : isInDb
                            ? "#c8e8e4"
                            : "#f0f0f0",
                          stroke: highlightHovered
                            ? "#0f766e"
                            : active
                            ? "#006b64"
                            : isInRegion
                            ? "#65aaa3"
                            : isInDb
                            ? "#8ec8c2"
                            : "#cccccc",
                          strokeWidth: highlightHovered ? 2.5 : active ? 2.5 : 1,
                          outline: "none",
                          cursor: isInDb ? "pointer" : "default",
                          opacity: highlightHovered ? 1 : dimmed ? 0.5 : isInRegion ? 1 : isInDb ? 0.7 : 0.4,
                          transition: "opacity 0.2s ease, fill 0.2s ease, stroke 0.2s ease",
                        },
                        hover: {
                          fill: isInDb ? "#14b8a6" : "#f0f0f0",
                          stroke: isInDb ? "#0f766e" : "#cccccc",
                          strokeWidth: isInDb ? 2.5 : 1,
                          outline: "none",
                          cursor: isInDb ? "pointer" : "default",
                          opacity: 1,
                          transition: "opacity 0.2s ease, fill 0.2s ease, stroke 0.2s ease",
                        },
                        pressed: {
                          fill: "#008080",
                          stroke: "#006b64",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
 
      <div
        className="india-map-popup pointer-events-none"
        style={isMobile ? undefined : { left: cardPos.x, top: cardPos.y }}
      >
        <AnimatePresence>
          {cardData && (
            <StateInfoCard
              key="state-info-card"
              data={cardData}
              weather={weather}
              loading={weatherLoading}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
 
export default IndiaMap;