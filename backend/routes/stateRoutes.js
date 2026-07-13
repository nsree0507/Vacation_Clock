import express from 'express'
import * as stateController from '../controllers/stateController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'
 
const router = express.Router()
 
router.get('/', stateController.getAllStates)
router.get('/slug/:slug', stateController.getStateBySlug)
router.get('/:id', stateController.getStateById)
router.post('/', authMiddleware, adminMiddleware, stateController.createState)
router.put('/:id', authMiddleware, adminMiddleware, stateController.updateState)
router.delete('/:id', authMiddleware, adminMiddleware, stateController.deleteState)
 
export default router