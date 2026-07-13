import Admin from '../models/Admin.js'
import jwt from 'jsonwebtoken'
import Destination from '../models/Destination.js'
import State from '../models/State.js'
import Booking from '../models/Booking.js'
import User from '../models/User.js'

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const admin = await Admin.findOne({ email })

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isPasswordValid = await admin.matchPassword(password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '24h' }
    )

    res.json({
      success: true,
      message: 'Admin logged in successfully',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

export const getDashboard = async (req, res) => {
  try {
    const statesCount = await State.countDocuments()
    const destinationsCount = await Destination.countDocuments()
    const bookingsCount = await Booking.countDocuments()
    const usersCount = await User.countDocuments()

    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5)
    const recentDestinations = await Destination.find().sort({ createdAt: -1 }).limit(5)

    res.json({
      success: true,
      data: {
        stats: {
          states: statesCount,
          destinations: destinationsCount,
          bookings: bookingsCount,
          users: usersCount,
        },
        recentBookings,
        recentDestinations,
      },
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// ─── Manage Admins (Super Admin only) ──────────────────────────────────────

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password').sort({ createdAt: -1 })
    res.json({
      success: true,
      data: admins,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' })
    }

    if (role && !['admin', 'superadmin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' })
    }

    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() })
    if (existingAdmin) {
      return res.status(409).json({ message: 'An admin with this email already exists' })
    }

    const admin = new Admin({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: role || 'admin',
    })

    await admin.save()

    const adminData = admin.toObject()
    delete adminData.password

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: adminData,
    })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'An admin with this email already exists' })
    }
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

export const updateAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const admin = await Admin.findById(req.params.id)

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' })
    }

    if (role && !['admin', 'superadmin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' })
    }

    // Prevent a super admin from demoting themselves if they are the only
    // super admin left, so the panel never ends up with zero super admins.
    if (role && role !== 'superadmin' && admin.role === 'superadmin') {
      const superAdminCount = await Admin.countDocuments({ role: 'superadmin' })
      if (superAdminCount <= 1) {
        return res.status(400).json({ message: 'Cannot demote the only remaining Super Admin' })
      }
    }

    if (name) admin.name = name.trim()
    if (email) admin.email = email.toLowerCase().trim()
    if (role) admin.role = role
    if (password) admin.password = password
    admin.updatedAt = new Date()

    await admin.save()

    const adminData = admin.toObject()
    delete adminData.password

    res.json({
      success: true,
      message: 'Admin updated successfully',
      data: adminData,
    })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'An admin with this email already exists' })
    }
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id)

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' })
    }

    if (req.admin.id === admin._id.toString()) {
      return res.status(400).json({ message: 'You cannot delete your own account' })
    }

    if (admin.role === 'superadmin') {
      const superAdminCount = await Admin.countDocuments({ role: 'superadmin' })
      if (superAdminCount <= 1) {
        return res.status(400).json({ message: 'Cannot delete the only remaining Super Admin' })
      }
    }

    await Admin.findByIdAndDelete(req.params.id)

    res.json({
      success: true,
      message: 'Admin deleted successfully',
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}