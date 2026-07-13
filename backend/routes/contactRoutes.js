import express from 'express'
import {
  createContact,
  getAllContacts,
  updateContactStatus,
  deleteContact,
} from '../controllers/contactController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = express.Router()

// POST /api/contact - Submit the Contact Us form (public)
router.post('/', createContact)

// GET /api/contact - Get all messages (admin only)
router.get('/', authMiddleware, adminMiddleware, getAllContacts)

// PUT /api/contact/:id/status - Update a message's status (admin only)
router.put('/:id/status', authMiddleware, adminMiddleware, updateContactStatus)

// DELETE /api/contact/:id - Delete a message (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, deleteContact)

export default router
