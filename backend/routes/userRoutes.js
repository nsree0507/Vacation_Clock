import express from 'express'
import * as userController from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = express.Router()

// Public route for user registration
router.post('/register', userController.registerUser)

// Admin-only routes
router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers)
router.get('/:id', authMiddleware, adminMiddleware, userController.getUserById)
router.put('/:id/block', authMiddleware, adminMiddleware, userController.blockUser)
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUser)

export default router
