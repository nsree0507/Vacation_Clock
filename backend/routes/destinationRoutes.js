import express from 'express'
import * as destinationController from '../controllers/destinationController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = express.Router()

router.get('/', destinationController.getAllDestinations)
router.get('/stats-by-state', destinationController.getStatsByState)
router.get('/:id', destinationController.getDestinationById)
router.post('/', authMiddleware, adminMiddleware, destinationController.createDestination)
router.put('/:id', authMiddleware, adminMiddleware, destinationController.updateDestination)
router.delete('/:id', authMiddleware, adminMiddleware, destinationController.deleteDestination)

export default router