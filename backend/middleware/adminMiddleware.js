const adminMiddleware = (req, res, next) => {
  if (!req.admin) {
    return res.status(401).json({ message: 'Admin access required' })
  }

  if (req.admin.role !== 'superadmin' && req.admin.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin role required' })
  }

  next()
}

export default adminMiddleware

export const superAdminMiddleware = (req, res, next) => {
  if (!req.admin) {
    return res.status(401).json({ message: 'Admin access required' })
  }

  if (req.admin.role !== 'superadmin') {
    return res.status(403).json({ message: 'Forbidden: Super Admin access required' })
  }

  next()
}