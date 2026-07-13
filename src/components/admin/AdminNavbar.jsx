import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, LogOut, MapPin } from 'lucide-react'

const AdminNavbar = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const admin = JSON.parse(localStorage.getItem('admin') || '{}')

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    navigate('/admin/login')
  }

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
        <Link to="/admin/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-teal rounded-full flex items-center justify-center">
            <MapPin size={18} className="text-white" />
          </div>
          <span className="text-lg font-serif text-teal italic">Vacation Clock</span>
          <span className="text-xs font-semibold text-muted-foreground ml-2">ADMIN</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <div className="text-sm text-right">
            <p className="font-semibold text-foreground">{admin.name || 'Admin'}</p>
            <p className="text-muted-foreground text-xs">{admin.role || 'Administrator'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-teal hover:bg-teal-dark text-white px-4 py-2 rounded-full transition-colors duration-200"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition text-foreground"
        >
          <Menu size={24} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-2 pt-4 px-4 border-t border-border space-y-3">
          <div className="text-sm pb-3 border-b border-border">
            <p className="font-semibold text-foreground">{admin.name || 'Admin'}</p>
            <p className="text-muted-foreground text-xs">{admin.role || 'Administrator'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 bg-teal hover:bg-teal-dark text-white px-4 py-2 rounded-full transition-colors duration-200"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  )
}

export default AdminNavbar
