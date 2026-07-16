import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, PlaneTakeoff } from 'lucide-react'
import { LoginDropdown } from '@/components/LoginDropdown'
import { ProfileDropdown } from '@/components/ProfileDropdown'
 
const navLinks = [
  { href: '/', label: 'Home', sectionId: null },
  { href: '/#about', label: 'About', sectionId: 'about' },
  { href: '/categories', label: 'Categories', sectionId: null },
  { href: '/packages', label: 'Packages', sectionId: null },
  { href: '/#services', label: 'Services', sectionId: 'services' },
  { href: '/#contact', label: 'Contact', sectionId: 'contact' },
]
 
// Section IDs to observe on the home page (in order)
const HOME_SECTIONS = ['about', 'services', 'contact']
 
// Navbar height in px — keep in sync with h-20 / h-24 classes
const NAVBAR_HEIGHT = 96
 
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [activeSection, setActiveSection] = useState(null) // null = top (Home active)
  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location.pathname
  const observerRef = useRef(null)
 
  // Restore session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vacationClockUser')
      if (stored) setUser(JSON.parse(stored))
    } catch (_) {}
  }, [])
 
  // Stay in sync when sign-in happens from elsewhere (e.g. the itinerary
  // page's Book Now flow), since that mounts its own LoginDropdown
  // instance rather than sharing this one's state.
  useEffect(() => {
    const handleAuthChange = (e) => setUser(e.detail)
    window.addEventListener('vacationClockAuthChange', handleAuthChange)
    return () => window.removeEventListener('vacationClockAuthChange', handleAuthChange)
  }, [])
 
  // Intersection Observer — only runs on home page
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection(null)
      return
    }
 
    // Disconnect previous observer
    if (observerRef.current) observerRef.current.disconnect()
 
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
 
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-80px 0px -40% 0px', // account for fixed navbar height
        threshold: 0,
      }
    )
 
    // Small delay so sections are mounted
    const timer = setTimeout(() => {
      HOME_SECTIONS.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
    }, 100)
 
    observerRef.current = observer
 
    // Reset to Home when scrolled to very top
    const handleScroll = () => {
      if (window.scrollY < 80) setActiveSection(null)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
 
    return () => {
      clearTimeout(timer)
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])
 
  // Smooth scroll to a section with navbar offset
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }
 
  // Handle nav link clicks — sections get offset scroll, pages get normal navigation
  const handleNavClick = (e, link) => {
    // "Home" link: if already on the home page, clicking it won't trigger a
    // React Router navigation (same pathname), so nothing would happen by
    // default — scroll to top manually instead.
    if (link.href === '/' && !link.sectionId) {
      if (pathname === '/') {
        e.preventDefault()
        setIsOpen(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }
 
    if (!link.sectionId) return // let React Router handle normal page links
 
    e.preventDefault()
    setIsOpen(false)
 
    if (pathname === '/') {
      // Already on home page — just scroll
      scrollToSection(link.sectionId)
    } else {
      // Navigate to home first, then scroll after mount
      navigate('/')
      setTimeout(() => scrollToSection(link.sectionId), 300)
    }
  }
 
  const isLinkActive = (href, sectionId) => {
    // On non-home pages: match pathname exactly
    if (pathname !== '/') {
      return pathname === href
    }
    // On home page: use intersection observer result
    if (href === '/') return activeSection === null
    if (sectionId) return activeSection === sectionId
    return false
  }
 
  const handleLoginSuccess = (userData) => setUser(userData)
  const handleLogout = () => {
    localStorage.removeItem('vacationClockUser')
    setUser(null)
  }
 
  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : 'VC'
 
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-3xl lg:text-4xl font-serif text-[#006053]">Vacation Clock</h1>
          </Link>
 
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-base font-medium transition-colors hover:text-teal ${
                  isLinkActive(link.href, link.sectionId)
                    ? 'text-teal border-b-2 border-teal pb-1'
                    : 'text-foreground/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
 
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <button
                type="button"
                onClick={() => setIsProfileOpen((v) => !v)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-slate-600 transition-transform hover:scale-105 focus:outline-none"
                style={{ background: '#e8f0ef' }}
                aria-label="Open profile menu"
              >
                {initials}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsLoginOpen(true)}
                className="text-base font-semibold text-foreground hover:text-teal transition-colors"
              >
                Sign In
              </button>
            )}
            <Link
              to="/packages"
              className="px-6 py-3 bg-teal text-white text-base font-semibold rounded-full hover:bg-teal-dark transition-colors"
            >
              Explore Now
            </Link>
          </div>
 
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
 
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`block py-2 text-base font-medium transition-colors ${
                    isLinkActive(link.href, link.sectionId)
                      ? 'text-teal'
                      : 'text-foreground/80 hover:text-teal'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3 border-t border-border">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 py-2">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-slate-600"
                        style={{ background: '#e8f0ef' }}
                      >
                        {initials}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.emailOrPhone}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => { handleLogout(); setIsOpen(false) }}
                        className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                      >
                        Log Out
                      </button>
                    </div>
                    <Link
                      to="/my-trips"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 py-2 text-base font-medium text-foreground/80 hover:text-teal transition-colors"
                    >
                      <PlaneTakeoff size={18} />
                      My Trips
                    </Link>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => { setIsLoginOpen(true); setIsOpen(false) }}
                    className="w-full text-center py-2.5 text-base font-semibold text-foreground hover:text-teal transition-colors"
                  >
                    Sign In
                  </button>
                )}
                <Link
                  to="/packages"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2.5 bg-teal text-white text-base font-semibold rounded-full hover:bg-teal-dark transition-colors"
                >
                  Explore Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
 
      <LoginDropdown
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
 
      <ProfileDropdown
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
    </header>
  )
}