import mongoose from 'mongoose'
 
const dayPlanSchema = new mongoose.Schema(
  {
    day: Number,
    title: String,
    description: String,
    activities: [String],
  },
  { _id: false }
)
 
const itinerarySchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // List of destination names covered by this package.
  // The "number of destinations" is simply this array's length,
  // so it never gets out of sync with the names entered by the admin.
  destinations: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) => Array.isArray(arr) && arr.length > 0,
      message: 'At least one destination is required',
    },
  },
  experienceHighlights: {
    type: [String],
    default: [],
  },
  whatsIncluded: {
    type: [String],
    default: [],
  },
  whatsNotIncluded: {
    type: [String],
    default: [],
  },
  dayWisePlan: [dayPlanSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})
 
// Virtual so the destination count is always available on the API response
// without having to store (and risk desyncing) a separate counter field.
itinerarySchema.virtual('destinationCount').get(function () {
  return Array.isArray(this.destinations) ? this.destinations.length : 0
})
 
itinerarySchema.set('toJSON', { virtuals: true })
itinerarySchema.set('toObject', { virtuals: true })
 
const Itinerary = mongoose.model('Itinerary', itinerarySchema)
export default Itinerary