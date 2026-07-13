import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LogIn, AlertCircle, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import adminApi from '../../services/adminApi'

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await adminApi.login(formData.email, formData.password)
      const { token, admin } = response.data

      localStorage.setItem('adminToken', token)
      localStorage.setItem('admin', JSON.stringify(admin))

      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-teal rounded-full flex items-center justify-center">
              <MapPin size={18} className="text-white" />
            </div>
            <span className="text-xl font-serif text-teal italic">Vacation Clock</span>
          </Link>
          <span className="text-sm text-muted-foreground">Admin Portal</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
            {/* Card Header Decoration */}
            <div className="h-2 bg-gradient-to-r from-teal to-teal-dark" />

            {/* Card Content */}
            <div className="p-8 sm:p-10">
              {/* Logo Section */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-teal/10 rounded-full mb-4"
                >
                  <MapPin size={32} className="text-teal" />
                </motion.div>
                <h1 className="text-3xl font-serif text-teal italic mb-2">
                  Vacation Clock
                </h1>
                <p className="text-sm font-semibold text-muted-foreground tracking-wide">
                  ADMIN PORTAL
                </p>
                <p className="text-muted-foreground mt-3 text-sm">
                  Sign in to manage your travel experiences
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
                >
                  <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="admin@example.com"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal transition"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal pr-12 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.5 3.5 0 11-4.95 4.95m7.08-7.071A10.004 10.004 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.004 10.004 0 01-9.671 6.968" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-teal hover:bg-teal-dark disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <LogIn size={18} />
                  <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                </button>
              </form>

              {/* Divider */}
              <div className="mt-6 pt-6 border-t border-border" />

              {/* Demo Credentials */}
              <div className="text-center text-sm">
                <p className="text-muted-foreground mb-3 text-xs uppercase tracking-wide">
                  Demo Credentials
                </p>
                <div className="bg-background rounded-lg p-3 border border-border text-xs">
                  <p className="text-foreground font-mono">admin@example.com</p>
                  <p className="text-muted-foreground font-mono">admin123</p>
                </div>
              </div>

              {/* Back to Home */}
              <div className="mt-6 text-center">
                <Link
                  to="/"
                  className="text-sm text-teal hover:text-teal-dark transition-colors"
                >
                  ← Back to Vacation Clock
                </Link>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-xs text-muted-foreground mt-6"
          >
            Secure admin access • Your data is protected
          </motion.p>
        </motion.div>
      </main>
    </div>
  )
}

export default AdminLogin
