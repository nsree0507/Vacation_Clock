import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    // Lets the admin track which messages still need attention.
    status: {
      type: String,
      enum: ['new', 'read', 'responded'],
      default: 'new',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Contact', contactSchema)
