import mongoose from 'mongoose'
import Booking from '../models/Booking.js'
import User from '../models/User.js'
 
// Generate unique booking ID
function generateBookingId() {
  const year = new Date().getFullYear()
  const randomNum = Math.floor(Math.random() * 99999)
  return `BK-${year}-${randomNum}`
}
 
// Find the User record tied to a booking, by explicit userId if given,
// otherwise by matching email/phone. Used both to stamp bookings with a
// real account link and to keep bookingCount in sync.
async function resolveUser(userId, customerEmail, customerPhone) {
  try {
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      const byId = await User.findById(userId)
      if (byId) return byId
    }
 
    const orConditions = []
    if (customerEmail) orConditions.push({ email: customerEmail.trim().toLowerCase() })
    if (customerPhone) orConditions.push({ phone: customerPhone.trim() })
    if (orConditions.length === 0) return null
 
    return await User.findOne({ $or: orConditions })
  } catch (err) {
    console.error('Error resolving user for booking:', err)
    return null
  }
}
 
async function adjustUserBookingCount(user, delta) {
  if (!user) return
  try {
    user.bookingCount = Math.max(0, (user.bookingCount || 0) + delta)
    user.updatedAt = new Date()
    await user.save()
  } catch (err) {
    console.error('Error syncing user booking count:', err)
  }
}
 
// Escape user input before dropping it into a RegExp
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
 
// Get bookings for the signed-in visitor, split into upcoming and previous
// trips. Public route — no admin auth, since this powers the "My Trips"
// view for regular site users. Matches strictly on the account's userId so
// visitors never see another account's bookings, even if two people
// happened to share a placeholder phone/email in test data.
export async function getMyBookings(req, res) {
  try {
    const { userId, identifier } = req.query
 
    let resolvedUserId = null
 
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      resolvedUserId = userId
    } else if (identifier && identifier.trim()) {
      // Fallback for older sessions that only have an email/phone stored
      // locally (from before accounts were linked by id). Resolve it to a
      // single account, then match strictly on that account's id.
      const trimmed = identifier.trim()
      const safe = escapeRegex(trimmed)
      const user = await User.findOne({
        $or: [{ email: { $regex: new RegExp(`^${safe}$`, 'i') } }, { phone: trimmed }],
      })
      if (user) resolvedUserId = user._id
    }
 
    if (!resolvedUserId) {
      return res.status(400).json({
        error: 'Missing identifier',
        message: 'Please sign in to view your trips',
      })
    }
 
    const bookings = await Booking.find({ userId: resolvedUserId }).sort({ createdAt: -1 })
 
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)
 
    const upcoming = []
    const previous = []
 
    bookings.forEach((booking) => {
      const parsedDate = new Date(booking.travelDate)
      const hasValidDate = !isNaN(parsedDate.getTime())
      const isFutureOrToday = hasValidDate && parsedDate >= startOfToday
 
      const tripData = {
        _id: booking._id,
        bookingId: booking.bookingId,
        destinationName: booking.destinationName,
        packageName: booking.packageName,
        travelDate: booking.travelDate,
        travelers: booking.travelers,
        totalAmount: booking.totalAmount,
        paymentMethod: booking.paymentMethod || null,
        bookingStatus: booking.bookingStatus,
        createdAt: booking.createdAt,
      }
 
      if (booking.bookingStatus !== 'cancelled' && isFutureOrToday) {
        upcoming.push(tripData)
      } else {
        previous.push(tripData)
      }
    })
 
    res.status(200).json({
      success: true,
      upcoming,
      previous,
    })
  } catch (error) {
    console.error('Error fetching customer bookings:', error)
    res.status(500).json({
      error: 'Failed to fetch bookings',
      message: error.message,
    })
  }
}
 
// Create a new booking
export async function createBooking(req, res) {
  try {
    const { userId, customerName, customerEmail, customerPhone, destinationName, packageName, travelDate, travelers, totalAmount, paymentMethod } = req.body
 
    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !destinationName || !packageName || !travelDate || !travelers) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please provide all required booking information',
      })
    }
 
    const validPaymentMethods = ['card', 'upi', 'netbanking', 'cod']
    const safePaymentMethod = validPaymentMethods.includes(paymentMethod) ? paymentMethod : null
 
    // Generate unique booking ID
    const bookingId = generateBookingId()
 
    // Resolve the account this booking belongs to (by explicit userId if the
    // visitor is signed in, otherwise by matching email/phone as a fallback)
    const matchedUser = await resolveUser(userId, customerEmail, customerPhone)
 
    // Create new booking
    const booking = new Booking({
      bookingId,
      userId: matchedUser ? matchedUser._id : null,
      customerName,
      customerEmail,
      customerPhone,
      destinationName,
      packageName,
      travelDate,
      travelers: parseInt(travelers),
      totalAmount: totalAmount ? parseInt(totalAmount) : null,
      paymentMethod: safePaymentMethod,
      bookingStatus: 'confirmed',
    })
 
    // Save to database
    await booking.save()
 
    // Keep the matching user's booking count in sync (Admin > Manage Users)
    await adjustUserBookingCount(matchedUser, 1)
 
    // Return booking confirmation
    res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully',
      booking: {
        bookingId: booking.bookingId,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        customerPhone: booking.customerPhone,
        destinationName: booking.destinationName,
        packageName: booking.packageName,
        travelDate: booking.travelDate,
        travelers: booking.travelers,
        totalAmount: booking.totalAmount,
        paymentMethod: booking.paymentMethod,
        bookingStatus: booking.bookingStatus,
        createdAt: booking.createdAt,
      },
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    res.status(500).json({
      error: 'Failed to create booking',
      message: error.message,
    })
  }
}
 
// Get booking by ID
export async function getBookingById(req, res) {
  try {
    const { bookingId } = req.params
 
    const booking = await Booking.findOne({ bookingId })
 
    if (!booking) {
      return res.status(404).json({
        error: 'Booking not found',
        message: `Booking with ID ${bookingId} does not exist`,
      })
    }
 
    res.status(200).json({
      success: true,
      booking: {
        _id: booking._id,
        bookingId: booking.bookingId,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        customerPhone: booking.customerPhone,
        destinationName: booking.destinationName,
        packageName: booking.packageName,
        travelDate: booking.travelDate,
        travelers: booking.travelers,
        totalAmount: booking.totalAmount,
        paymentMethod: booking.paymentMethod,
        bookingStatus: booking.bookingStatus,
        createdAt: booking.createdAt,
      },
    })
  } catch (error) {
    console.error('Error fetching booking:', error)
    res.status(500).json({
      error: 'Failed to fetch booking',
      message: error.message,
    })
  }
}
 
// Get all bookings (Admin)
export async function getAllBookings(req, res) {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 }).limit(100)
 
    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings: bookings.map((booking) => ({
        _id: booking._id,
        bookingId: booking.bookingId,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        customerPhone: booking.customerPhone,
        destinationName: booking.destinationName,
        packageName: booking.packageName,
        travelDate: booking.travelDate,
        travelers: booking.travelers,
        totalAmount: booking.totalAmount,
        paymentMethod: booking.paymentMethod,
        bookingStatus: booking.bookingStatus,
        createdAt: booking.createdAt,
      })),
    })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    res.status(500).json({
      error: 'Failed to fetch bookings',
      message: error.message,
    })
  }
}
 
// Update booking status (Admin)
export async function updateBookingStatus(req, res) {
  try {
    const { id } = req.params
    const { bookingStatus } = req.body
    const validStatuses = ['confirmed', 'pending', 'cancelled']
 
    if (!validStatuses.includes(bookingStatus)) {
      return res.status(400).json({ message: 'Invalid booking status' })
    }
 
    const existingBooking = await Booking.findById(id)
    if (!existingBooking) {
      return res.status(404).json({ message: 'Booking not found' })
    }
    const previousStatus = existingBooking.bookingStatus
 
    const booking = await Booking.findByIdAndUpdate(
      id,
      { bookingStatus, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
 
    // If a booking becomes cancelled, remove it from the user's active
    // count; if it's un-cancelled, add it back.
    if (previousStatus !== 'cancelled' && bookingStatus === 'cancelled') {
      const matchedUser = await resolveUser(booking.userId, booking.customerEmail, booking.customerPhone)
      await adjustUserBookingCount(matchedUser, -1)
    } else if (previousStatus === 'cancelled' && bookingStatus !== 'cancelled') {
      const matchedUser = await resolveUser(booking.userId, booking.customerEmail, booking.customerPhone)
      await adjustUserBookingCount(matchedUser, 1)
    }
 
    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Cancel a booking — public route used from the "My Trips" page so a
// signed-in visitor can cancel their own upcoming trip. Ownership is
// verified against the account's userId (or, for older sessions, the
// stored email/phone identifier) so visitors can never cancel someone
// else's booking.
export async function cancelMyBooking(req, res) {
  try {
    const { id } = req.params
    const { userId, identifier } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid booking id' })
    }

    const booking = await Booking.findById(id)
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    // Verify the requester actually owns this booking
    let owns = false
    if (userId && booking.userId && String(booking.userId) === String(userId)) {
      owns = true
    } else if (identifier && identifier.trim()) {
      const trimmed = identifier.trim().toLowerCase()
      if (
        (booking.customerEmail && booking.customerEmail.toLowerCase() === trimmed) ||
        booking.customerPhone === identifier.trim()
      ) {
        owns = true
      }
    }

    if (!owns) {
      return res.status(403).json({ message: 'You are not authorized to cancel this booking' })
    }

    if (booking.bookingStatus === 'cancelled') {
      return res.status(400).json({ message: 'This booking is already cancelled' })
    }

    booking.bookingStatus = 'cancelled'
    booking.updatedAt = new Date()
    await booking.save()

    const matchedUser = await resolveUser(booking.userId, booking.customerEmail, booking.customerPhone)
    await adjustUserBookingCount(matchedUser, -1)

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking: {
        _id: booking._id,
        bookingId: booking.bookingId,
        bookingStatus: booking.bookingStatus,
      },
    })
  } catch (error) {
    console.error('Error cancelling booking:', error)
    res.status(500).json({
      error: 'Failed to cancel booking',
      message: error.message,
    })
  }
}