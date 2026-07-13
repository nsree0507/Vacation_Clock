import State from '../models/State.js'
 
export const getAllStates = async (req, res) => {
  try {
    const states = await State.find().sort({ name: 1 })
    res.json({ success: true, data: states })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
 
export const getStateById = async (req, res) => {
  try {
    const state = await State.findById(req.params.id)
    if (!state) return res.status(404).json({ message: 'State not found' })
    res.json({ success: true, data: state })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
 
export const getStateBySlug = async (req, res) => {
  try {
    const state = await State.findOne({ slug: req.params.slug })
    if (!state) return res.status(404).json({ message: 'State not found' })
    res.json({ success: true, data: state })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
 
export const createState = async (req, res) => {
  try {
    const { name, slug, description, famousPlaces, bestTimeToVisit, foodAndCulture, region, category, categories, imageUrl } = req.body
 
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' })
    }
 
    // Auto-generate slug if not provided
    const finalSlug = slug || name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')   // strip punctuation (e.g. "&") but keep spaces/dashes
      .replace(/\s+/g, '-')            // spaces → dashes
      .replace(/-+/g, '-')             // collapse consecutive dashes (e.g. "jammu--kashmir" → "jammu-kashmir")
      .replace(/^-|-$/g, '')           // trim leading/trailing dashes
 
    // Normalize categories: accept an array from the multi-select form, or
    // fall back to the legacy single `category` string.
    const finalCategories = Array.isArray(categories)
      ? categories.filter(Boolean)
      : (category ? [category] : [])
 
    const state = new State({
      name,
      slug: finalSlug,
      description,
      famousPlaces: famousPlaces || '',
      bestTimeToVisit,
      foodAndCulture,
      region: region || '',
      categories: finalCategories,
      category: finalCategories[0] || '',
      imageUrl: imageUrl || '',
    })
 
    await state.save()
    res.status(201).json({ success: true, message: 'State created successfully', data: state })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'State with this name or slug already exists' })
    }
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
 
export const updateState = async (req, res) => {
  try {
    const { name, slug, description, famousPlaces, bestTimeToVisit, foodAndCulture, region, category, categories, imageUrl } = req.body
 
    const finalCategories = Array.isArray(categories)
      ? categories.filter(Boolean)
      : (category ? [category] : [])
 
    const state = await State.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug,
        description,
        famousPlaces,
        bestTimeToVisit,
        foodAndCulture,
        region,
        categories: finalCategories,
        category: finalCategories[0] || '',
        imageUrl,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    )
 
    if (!state) return res.status(404).json({ message: 'State not found' })
    res.json({ success: true, message: 'State updated successfully', data: state })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
 
export const deleteState = async (req, res) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id)
    if (!state) return res.status(404).json({ message: 'State not found' })
    res.json({ success: true, message: 'State deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}