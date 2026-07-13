import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key')
    req.admin = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token', error: err.message })
  }
}

export default authMiddleware
