import { Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const location = useLocation()

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('adminToken')
    setIsAuthenticated(!!token)
  }, [location]) // Re-check token when route changes

  // While checking authentication, show nothing (or could show a loader)
  if (isAuthenticated === null) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return element
}

export default ProtectedRoute

