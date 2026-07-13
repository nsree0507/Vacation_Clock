import mongoose from 'mongoose'
 
const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
  state: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.5,
  },
  price: {
    type: Number,
    required: true,
  },
  days: {
    type: Number,
    default: null,
  },
  nights: {
    type: Number,
    default: null,
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
 
const Destination = mongoose.model('Destination', destinationSchema)
export default Destination