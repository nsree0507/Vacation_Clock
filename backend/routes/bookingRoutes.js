import express from 'express'
import { createBooking, getBookingById, getAllBookings, updateBookingStatus, getMyBookings, cancelMyBooking } from '../controllers/bookingController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'
 
const router = express.Router()
 
// POST /api/bookings - Create a new booking
router.post('/', createBooking)
 
// GET /api/bookings/my - Get the signed-in visitor's own bookings (must come before /:bookingId)
router.get('/my', getMyBookings)
 
// PUT /api/bookings/:id/cancel - Signed-in visitor cancels their own booking
// (must come before /:bookingId so "cancel" isn't treated as a bookingId)
router.put('/:id/cancel', cancelMyBooking)
 
// GET /api/bookings/:bookingId - Get booking by ID
router.get('/:bookingId', getBookingById)
 
// Admin routes - Get all bookings (admin only)
router.get('/', authMiddleware, adminMiddleware, getAllBookings)
 
// Admin route - Update booking status
router.put('/:id/status', authMiddleware, adminMiddleware, updateBookingStatus)
 
export default router