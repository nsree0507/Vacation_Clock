import { useEffect, useState } from 'react'
import { getStateBySlug } from '@/data/statesData'
import { getPlaceBySlug } from '@/data/placesData'
import destinationApi from '@/services/destinationApi'
import itineraryApi from '@/services/itineraryApi'
import { toSlug } from '@/utils/helpers'
 
export function useResolvedDestination(slug) {
  const staticMatch = slug ? getPlaceBySlug(slug) || getStateBySlug(slug) : null
 
  const [dbDestination, setDbDestination] = useState(null)
  const [dbItinerary, setDbItinerary] = useState(null)
  // Start "loading" whenever there's a slug to resolve — even when a
  // static sample entry exists — so consumers don't render the static
  // (potentially stale/placeholder) fields before the DB lookup has had
  // a chance to return the real data. Previously this stayed `false`
  // until the effect kicked in, which let pages render the static copy
  // first and then visibly swap to the DB copy a moment later.
  const [loading, setLoading] = useState(Boolean(slug))
 
  useEffect(() => {
    if (!slug) return
    let isMounted = true
    setLoading(true)
 
    // Destination names are stored with spaces ("Sela Pass") but the slug
    // in the URL uses hyphens ("sela-pass"); the backend search only
    // regex-matches the raw `name` field, so try both forms.
    const searchTerm = slug.replace(/-/g, ' ')
 
    const run = async () => {
      // Fire every lookup this route could need at once instead of a
      // sequential try → catch → try → catch waterfall. This also lets a
      // static-data match (e.g. a sample state/place) still pick up a live
      // admin-created Destination record for the same slug, so the image
      // and details shown here always match the exact record used to
      // build the card the user clicked from on the itinerary list page.
      const [byIdResult, bySearchResult, itinerariesResult] = await Promise.allSettled([
        destinationApi.getById(slug),
        destinationApi.getAll({ search: searchTerm }),
        itineraryApi.getAll(),
      ])
 
      if (!isMounted) return
 
      const byId = byIdResult.status === 'fulfilled' ? byIdResult.value.data?.data : null
      const bySearchList =
        bySearchResult.status === 'fulfilled' ? bySearchResult.value.data?.data || [] : []
      const bySearch = bySearchList.find(
        (dest) => dest.slug === slug || dest._id === slug || dest.id === slug || toSlug(dest.name) === slug
      )
      const matchedDestination = byId || bySearch || null
      if (matchedDestination) setDbDestination(matchedDestination)
 
      const allItineraries =
        itinerariesResult.status === 'fulfilled' ? itinerariesResult.value.data?.data || [] : []
      const matchName = (matchedDestination?.name || staticMatch?.name || '').toLowerCase()
      const matchedItinerary = allItineraries.find((it) =>
        matchName
          ? it.destinations?.some((d) => d.toLowerCase() === matchName)
          : toSlug(it.packageName) === slug || (it.destinations || []).some((d) => toSlug(d) === slug)
      )
      if (matchedItinerary) setDbItinerary(matchedItinerary)
 
      // No static match and no Destination record exists for this slug
      // (e.g. the admin only created an itinerary via Manage Itineraries,
      // without a matching entry in Manage Destinations). Itineraries are
      // self-contained, so build a destination stand-in directly from the
      // matching itinerary's own data instead of showing "not found".
      if (!staticMatch && !matchedDestination && matchedItinerary) {
        const matchedDestinationName =
          (matchedItinerary.destinations || []).find((d) => toSlug(d) === slug) ||
          matchedItinerary.destinations?.[0] ||
          matchedItinerary.packageName
        setDbDestination({
          _id: matchedItinerary._id,
          name: matchedDestinationName,
          slug,
          category: 'General',
          state: '',
          rating: 4.5,
          imageUrl: '',
          // Lets consumers match this exact itinerary by id, since its
          // `destinations` names may not exactly equal `name`.
          __itineraryId: matchedItinerary._id,
        })
      }
    }
 
    run().finally(() => {
      if (isMounted) setLoading(false)
    })
    return () => {
      isMounted = false
    }
  }, [slug])
 
  return {
    destination: staticMatch || dbDestination,
    // The live Destination record (if one exists) matched to this slug —
    // exposed separately so pages can prefer its fields (like imageUrl)
    // even when a static sample match also exists for the same slug.
    dbDestination,
    dbItinerary,
    // Reflects the real fetch status regardless of whether a static
    // sample match exists, so callers can wait for the DB lookup to
    // settle before rendering anything — that's what stops a stale
    // static field (old description, price, day-plan, etc.) from
    // flashing on screen before the DB value replaces it.
    loading,
    isStatic: Boolean(staticMatch),
  }
}