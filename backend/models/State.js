import mongoose from 'mongoose'
 
const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  famousPlaces: {
    type: String,
    default: '',
  },
  bestTimeToVisit: {
    type: String,
  },
  foodAndCulture: {
    type: String,
  },
  region: {
    type: String,
    default: '',
  },
  // Legacy single-category field — kept in sync with categories[0] so any
  // older code that still reads `category` as a string keeps working.
  category: {
    type: String,
    default: '',
  },
  // Full multi-select list of categories for this state.
  categories: {
    type: [String],
    default: [],
  },
  imageUrl: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})
 
const State = mongoose.model('State', stateSchema)
export default State