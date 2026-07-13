import mongoose from 'mongoose'
import Destination from '../models/Destination.js'
import { normalizeStateSlug } from '../utils/slugify.js'
 
export const getAllDestinations = async (req, res) => {
  try {
    const { search, category, state } = req.query
    let query = {}
 
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }
 
    if (category) query.category = category
    if (state) query.state = state
 
    let destinations = await Destination.find(query).sort({ createdAt: -1 })
 
    destinations = destinations.map(dest => {
      const destObj = dest.toObject()
      destObj.state = normalizeStateSlug(destObj.state)
      return destObj
    })
 
    res.json({
      success: true,
      data: destinations,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
 
export const getDestinationById = async (req, res) => {
  try {
    // The route param is often a slug (e.g. "shantiniketan") rather than a
    // Mongo ObjectId — findById() would throw a CastError for those, so
    // short-circuit to a clean 404 and let the frontend fall back to a
    // slug/name search instead of surfacing a 500.
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Destination not found' })
    }
 
    const destination = await Destination.findById(req.params.id)
 
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' })
    }
 
    const destObj = destination.toObject()
    destObj.state = normalizeStateSlug(destObj.state)
 
    res.json({
      success: true,
      data: destObj,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
 
export const createDestination = async (req, res) => {
  try {
    const { name, slug, state, category, description, imageUrl, rating, price, days, nights } = req.body
 
    if (!name || !state || !category || !price) {
      return res.status(400).json({ message: 'All required fields must be provided' })
    }
 
    const normalizedState = normalizeStateSlug(state)
 
    const destination = new Destination({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      state: normalizedState,
      category,
      description,
      imageUrl: imageUrl || '',
      rating,
      price,
      days: days || null,
      nights: nights || null,
    })
 
    await destination.save()
 
    res.status(201).json({
      success: true,
      message: 'Destination created successfully',
      data: destination,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
 
export const updateDestination = async (req, res) => {
  try {
    const { name, slug, state, category, description, imageUrl, rating, price, days, nights } = req.body
 
    const normalizedState = state ? normalizeStateSlug(state) : undefined
 
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug,
        state: normalizedState,
        category,
        description,
        imageUrl,
        rating,
        price,
        days: days !== undefined ? days : null,
        nights: nights !== undefined ? nights : null,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    )
 
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' })
    }
 
    res.json({
      success: true,
      message: 'Destination updated successfully',
      data: destination,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
 
export const getStatsByState = async (req, res) => {
  try {
    const stats = await Destination.aggregate([
      {
        $group: {
          _id: '$state',
          packageCount: { $sum: 1 },
          minPrice: { $min: '$price' },
          avgRating: { $avg: '$rating' },
          // grab the first description for the attraction line
          attractionLine: { $first: '$description' },
        },
      },
      {
        $project: {
          _id: 0,
          state: '$_id',
          packageCount: 1,
          minPrice: 1,
          avgRating: { $round: ['$avgRating', 1] },
          attractionLine: 1,
        },
      },
    ])
 
    res.json({ success: true, data: stats })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
 
export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id)
 
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' })
    }
 
    res.json({
      success: true,
      message: 'Destination deleted successfully',
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}