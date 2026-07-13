/**
 * Seeds the "destinations" and "itineraries" MongoDB collections from the
 * old hardcoded package data that used to live only in the frontend
 * (src/data/placesData.js). Safe to re-run: it upserts by name, so it will
 * never create duplicates.
 *
 * Usage (from the backend/ folder):
 *   node scripts/seedFromLegacyData.js
 */
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import Destination from '../models/Destination.js'
import Itinerary from '../models/Itinerary.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vacation-bookings'

const DEFAULT_INCLUDED = [
  'Accommodation in star hotels',
  'Daily breakfast and dinner',
  'All sightseeing and activities',
  'Professional tour guide',
  'Transportation within the destination',
  'Travel insurance',
]

const DEFAULT_NOT_INCLUDED = [
  'Airfare or train tickets',
  'Personal expenses',
  'Meals not mentioned in itinerary',
  'Activities outside the plan',
  'Tips and gratuities',
]

async function run() {
  const dataPath = path.resolve(__dirname, 'data', 'legacyPlaces.json')
  const places = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

  console.log(`Loaded ${places.length} legacy places from ${dataPath}`)

  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')

  let destinationsCreated = 0
  let destinationsUpdated = 0
  let itinerariesCreated = 0
  let itinerariesSkipped = 0

  for (const place of places) {
    if (!place.name || !place.price) continue

    // 1. Upsert the Destination so it shows up in Manage Destinations and
    //    the Manage Itineraries dropdown can find it by name.
    const destResult = await Destination.findOneAndUpdate(
      { name: { $regex: `^${escapeRegex(place.name)}$`, $options: 'i' } },
      {
        $setOnInsert: {
          name: place.name,
          slug: place.slug,
        },
        $set: {
          state: place.state || 'India',
          category: place.category || 'General',
          description: place.description || `Explore ${place.name}`,
          rating: place.rating || 4.5,
          price: place.price,
          days: place.days,
          nights: place.nights,
          updatedAt: new Date(),
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true, rawResult: true }
    )

    if (destResult.lastErrorObject?.updatedExisting) {
      destinationsUpdated += 1
    } else {
      destinationsCreated += 1
    }

    const destination = destResult.value

    // 2. Create the matching Itinerary, skipping if one already exists for
    //    this destination (so re-running the script won't duplicate them).
    const existingItinerary = await Itinerary.findOne({
      destinations: { $regex: `^${escapeRegex(destination.name)}$`, $options: 'i' },
    })

    if (existingItinerary) {
      itinerariesSkipped += 1
      continue
    }

    await Itinerary.create({
      packageName: destination.name,
      description: place.description || `A memorable trip to ${destination.name}`,
      duration: place.days || 1,
      price: place.price,
      destinations: [destination.name],
      experienceHighlights: place.highlights?.length ? place.highlights : [],
      whatsIncluded: DEFAULT_INCLUDED,
      whatsNotIncluded: DEFAULT_NOT_INCLUDED,
      dayWisePlan: place.dayWisePlan?.length
        ? place.dayWisePlan
        : [{ day: 1, title: `Explore ${destination.name}` }],
    })

    itinerariesCreated += 1
  }

  console.log('\nDone.')
  console.log(`Destinations created: ${destinationsCreated}`)
  console.log(`Destinations already existed (updated): ${destinationsUpdated}`)
  console.log(`Itineraries created: ${itinerariesCreated}`)
  console.log(`Itineraries skipped (already existed): ${itinerariesSkipped}`)

  await mongoose.disconnect()
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
