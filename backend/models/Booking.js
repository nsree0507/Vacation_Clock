import mongoose from 'mongoose'
 
const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    // Links this booking to the exact signed-in account it belongs to.
    // Null for guest checkouts that don't match any account.
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    destinationName: {
      type: String,
      required: true,
    },
    packageName: {
      type: String,
      required: true,
    },
    travelDate: {
      type: String,
      required: true,
    },
    travelers: {
      type: Number,
      required: true,
      min: 1,
    },
    totalAmount: {
      type: Number,
      required: false,
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'upi', 'netbanking', 'cod', null],
      default: null,
    },
    bookingStatus: {
      type: String,
      enum: ['confirmed', 'pending', 'cancelled'],
      default: 'confirmed',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)
 
export default mongoose.model('Booking', bookingSchema)