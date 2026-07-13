import express from 'express'
import {
  adminLogin,
  getDashboard,
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from '../controllers/adminController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware, { superAdminMiddleware } from '../middleware/adminMiddleware.js'

const router = express.Router()

router.post('/login', adminLogin)
router.get('/dashboard', authMiddleware, adminMiddleware, getDashboard)

// Manage Admins routes - Super Admin only
router.get('/admins', authMiddleware, adminMiddleware, superAdminMiddleware, getAllAdmins)
router.post('/admins', authMiddleware, adminMiddleware, superAdminMiddleware, createAdmin)
router.put('/admins/:id', authMiddleware, adminMiddleware, superAdminMiddleware, updateAdmin)
router.delete('/admins/:id', authMiddleware, adminMiddleware, superAdminMiddleware, deleteAdmin)

export default router