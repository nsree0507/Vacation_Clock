import User from '../models/User.js'
import Booking from '../models/Booking.js'
 
// Called every time someone signs in through the main-site OTP modal.
// Acts as an upsert: first-time visitors are created, returning visitors
// (matched by email or phone) are recognized and just refreshed.
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, emailOrPhone } = req.body
 
    const identifier = (email || phone || emailOrPhone || '').toString().trim()
 
    if (!name || !name.trim() || !identifier) {
      return res.status(400).json({ message: 'Name and email/phone are required' })
    }
 
    const isEmail = /^\S+@\S+\.\S+$/.test(identifier)
    const query = isEmail ? { email: identifier.toLowerCase() } : { phone: identifier }
 
    let user = await User.findOne(query)
    let isNewUser = false
 
    if (user) {
      // Returning user — keep their record fresh, but don't touch blocked state
      user.name = name.trim()
      user.updatedAt = new Date()
      await user.save()
    } else {
      user = new User({
        name: name.trim(),
        email: isEmail ? identifier.toLowerCase() : undefined,
        phone: isEmail ? undefined : identifier,
        isBlocked: false,
      })
      await user.save()
      isNewUser = true
    }
 
    if (user.isBlocked) {
      return res.status(403).json({ message: 'This account has been blocked by the admin' })
    }
 
    res.status(isNewUser ? 201 : 200).json({
      success: true,
      message: isNewUser ? 'User registered successfully' : 'Signed in successfully',
      data: user,
    })
  } catch (err) {
    // Handle race-condition duplicate key errors gracefully
    if (err.code === 11000) {
      return res.status(409).json({ message: 'An account with this email/phone already exists' })
    }
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
 
export const getAllUsers = async (req, res) => {
  try {
    const { search } = req.query
    let query = {}
 
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ]
    }
 
    const users = await User.find(query).sort({ createdAt: -1 })
 
    // Compute each user's booking count live from the Bookings collection
    // instead of trusting the stored bookingCount field. That counter is
    // only nudged by the booking API (create/cancel), so it goes stale
    // whenever a booking is removed some other way (e.g. deleted directly
    // in the database). Recalculating here keeps the admin panel accurate
    // no matter how bookings were added or removed.
    const bookings = await Booking.find({ bookingStatus: { $ne: 'cancelled' } })
      .select('userId customerEmail customerPhone')
      .lean()
 
    const countByUserId = {}
    const countByEmail = {}
    const countByPhone = {}
 
    bookings.forEach((booking) => {
      if (booking.userId) {
        const key = booking.userId.toString()
        countByUserId[key] = (countByUserId[key] || 0) + 1
      } else {
        // Guest-checkout bookings aren't linked by userId, so fall back to
        // matching on email/phone, same as the booking controller does.
        if (booking.customerEmail) {
          const key = booking.customerEmail.trim().toLowerCase()
          countByEmail[key] = (countByEmail[key] || 0) + 1
        }
        if (booking.customerPhone) {
          const key = booking.customerPhone.trim()
          countByPhone[key] = (countByPhone[key] || 0) + 1
        }
      }
    })
 
    const usersWithLiveCounts = users.map((user) => {
      const idKey = user._id.toString()
      let bookingCount = countByUserId[idKey] || 0
 
      if (!bookingCount) {
        if (user.email && countByEmail[user.email.toLowerCase()]) {
          bookingCount = countByEmail[user.email.toLowerCase()]
        } else if (user.phone && countByPhone[user.phone]) {
          bookingCount = countByPhone[user.phone]
        }
      }
 
      return { ...user.toObject(), bookingCount }
    })
 
    res.json({
      success: true,
      data: usersWithLiveCounts,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
 
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
 
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
 
    res.json({
      success: true,
      data: user,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
 
export const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
 
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
 
    user.isBlocked = !user.isBlocked
    user.updatedAt = new Date()
    await user.save()
 
    res.json({
      success: true,
      message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully`,
      data: user,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
 
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
 
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
 
    res.json({
      success: true,
      message: 'User deleted successfully',
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}