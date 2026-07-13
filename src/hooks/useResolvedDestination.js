import { useEffect, useState } from 'react'
import { getStateBySlug } from '@/data/statesData'
import { getPlaceBySlug } from '@/data/placesData'
import destinationApi from '@/services/destinationApi'
import itineraryApi from '@/services/itineraryApi'
import { toSlug } from '@/utils/helpers'

/**
 * Resolves a route slug to a destination, in order:
 *  1. Static sample data (src/data/statesData.js, placesData.js)
 *  2. A DB "Destination" record (Manage Destinations)
 *  3. A standalone DB "Itinerary" (Manage Itineraries) with no linked
 *     Destination record — built into a lightweight stand-in object using
 *     the itinerary's own data.
 *
 * Any page that needs "what destination does this slug point to?" (the
 * itinerary detail page, checkout, booking, etc.) should use this hook
 * instead of only checking static data — otherwise itineraries created
 * without a matching Manage Destinations entry silently 404 on that page.
 */
export function useResolvedDestination(slug) {
  const staticMatch = slug ? getPlaceBySlug(slug) || getStateBySlug(slug) : null

  const [dbDestination, setDbDestination] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!slug || staticMatch) return
    let isMounted = true
    setLoading(true)

    const run = async () => {
      try {
        const response = await destinationApi.getById(slug)
        const destination = response.data?.data
        if (!isMounted) return
        if (destination) {
          setDbDestination(destination)
          return
        }
      } catch (err) {
        // Not a valid Mongo _id — fall through to a slug/name search.
      }

      try {
        // Destination names are stored with spaces ("Sela Pass") but the
        // slug in the URL uses hyphens ("sela-pass"); the backend search
        // only regex-matches the raw `name` field, so try both forms.
        const searchTerm = slug.replace(/-/g, ' ')
        const response = await destinationApi.getAll({ search: searchTerm })
        const destination = (response.data?.data || []).find(
          (dest) => dest.slug === slug || dest._id === slug || dest.id === slug || toSlug(dest.name) === slug
        )
        if (!isMounted) return
        if (destination) {
          setDbDestination(destination)
          return
        }
      } catch (err) {
        // No matching destination — try a standalone itinerary next.
      }

      // No Destination record exists for this slug (e.g. the admin only
      // created an itinerary via Manage Itineraries, without a matching
      // entry in Manage Destinations). Itineraries are self-contained, so
      // build a destination stand-in directly from the matching
      // itinerary's own data instead of showing "not found".
      try {
        const itinerariesRes = await itineraryApi.getAll()
        const itineraries = itinerariesRes.data?.data || []
        const matchedItinerary = itineraries.find(
          (it) => toSlug(it.packageName) === slug || (it.destinations || []).some((d) => toSlug(d) === slug)
        )
        if (isMounted && matchedItinerary) {
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
      } catch (err) {
        // No route destination or itinerary found in DB.
      }
    }

    run().finally(() => {
      if (isMounted) setLoading(false)
    })
    return () => {
      isMounted = false
    }
  }, [slug, staticMatch])

  return {
    destination: staticMatch || dbDestination,
    loading: !staticMatch && loading,
    isStatic: Boolean(staticMatch),
  }
}
