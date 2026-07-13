import express from 'express'
import * as itineraryController from '../controllers/itineraryController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = express.Router()

router.get('/', itineraryController.getAllItineraries)
router.get('/:id', itineraryController.getItineraryById)
router.post('/', authMiddleware, adminMiddleware, itineraryController.createItinerary)
router.put('/:id', authMiddleware, adminMiddleware, itineraryController.updateItinerary)
router.delete('/:id', authMiddleware, adminMiddleware, itineraryController.deleteItinerary)

export default router
