import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  MapPin,
  Map,
  Package,
  Calendar,
  Users,
  MessageSquare,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const admin = JSON.parse(localStorage.getItem('admin') || '{}')
  const isSuperAdmin = admin.role === 'superadmin'

  useEffect(() => {
    const updateSidebarState = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    updateSidebarState()
    window.addEventListener('resize', updateSidebarState)
    return () => window.removeEventListener('resize', updateSidebarState)
  }, [])

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/destinations', icon: MapPin, label: 'Manage Destinations' },
    { path: '/admin/states', icon: Map, label: 'State Details' },
    { path: '/admin/itineraries', icon: Package, label: 'Manage Itineraries' },
    { path: '/admin/bookings', icon: Calendar, label: 'View Bookings' },
    { path: '/admin/users', icon: Users, label: 'Manage Users' },
    { path: '/admin/contacts', icon: MessageSquare, label: 'Contact Messages' },
    ...(isSuperAdmin
      ? [{ path: '/admin/manage-admins', icon: ShieldCheck, label: 'Manage Admins' }]
      : []),
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-20 left-4 z-40 bg-teal text-white p-2 rounded-lg hover:bg-teal-dark transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`${
          isOpen ? 'w-64' : 'w-0'
        } bg-card text-foreground transition-all duration-300 fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-border z-40 md:w-64 md:sticky md:top-16 md:self-start`}
      >
        <div className="px-7 py-6 md:px-6">
          <h2 className="text-lg font-semibold mb-8 text-teal">Admin Menu</h2>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-5 py-3 rounded-lg transition ${
                      isActive
                        ? 'bg-teal text-white shadow-md'
                        : 'text-muted-foreground hover:bg-muted'
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>
      </aside>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 top-16 z-30"
        />
      )}
    </>
  )
}

export default Sidebar