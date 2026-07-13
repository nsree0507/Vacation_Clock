import Itinerary from '../models/Itinerary.js'
 
// Cleans an array field coming from the admin form: keeps it an array,
// trims each entry, and drops empty strings left behind by blank inputs.
const cleanList = (value) => {
  if (!Array.isArray(value)) return []
  return value.map((item) => (typeof item === 'string' ? item.trim() : item)).filter(Boolean)
}
 
export const getAllItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find().sort({ createdAt: -1 })
 
    res.json({
      success: true,
      data: itineraries,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
 
export const getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id)
 
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' })
    }
 
    res.json({
      success: true,
      data: itinerary,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
 
export const createItinerary = async (req, res) => {
  try {
    const {
      packageName,
      description,
      duration,
      price,
      destinations,
      experienceHighlights,
      whatsIncluded,
      whatsNotIncluded,
      dayWisePlan,
    } = req.body
 
    const cleanedDestinations = cleanList(destinations)
 
    if (!packageName || !description || !duration || !price || cleanedDestinations.length === 0) {
      return res.status(400).json({
        message: 'Package name, description, duration, price and at least one destination are required',
      })
    }
 
    const itinerary = new Itinerary({
      packageName,
      description,
      duration,
      price,
      destinations: cleanedDestinations,
      experienceHighlights: cleanList(experienceHighlights),
      whatsIncluded: cleanList(whatsIncluded),
      whatsNotIncluded: cleanList(whatsNotIncluded),
      dayWisePlan: dayWisePlan || [],
    })
 
    await itinerary.save()
 
    res.status(201).json({
      success: true,
      message: 'Itinerary created successfully',
      data: itinerary,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
 
export const updateItinerary = async (req, res) => {
  try {
    const {
      packageName,
      description,
      duration,
      price,
      destinations,
      experienceHighlights,
      whatsIncluded,
      whatsNotIncluded,
      dayWisePlan,
    } = req.body
 
    const cleanedDestinations = cleanList(destinations)
 
    if (destinations !== undefined && cleanedDestinations.length === 0) {
      return res.status(400).json({ message: 'At least one destination is required' })
    }
 
    const update = {
      packageName,
      description,
      duration,
      price,
      updatedAt: new Date(),
    }
 
    if (destinations !== undefined) update.destinations = cleanedDestinations
    if (experienceHighlights !== undefined) update.experienceHighlights = cleanList(experienceHighlights)
    if (whatsIncluded !== undefined) update.whatsIncluded = cleanList(whatsIncluded)
    if (whatsNotIncluded !== undefined) update.whatsNotIncluded = cleanList(whatsNotIncluded)
    if (dayWisePlan !== undefined) update.dayWisePlan = dayWisePlan
 
    const itinerary = await Itinerary.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    })
 
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' })
    }
 
    res.json({
      success: true,
      message: 'Itinerary updated successfully',
      data: itinerary,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
 
export const deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findByIdAndDelete(req.params.id)
 
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' })
    }
 
    res.json({
      success: true,
      message: 'Itinerary deleted successfully',
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}