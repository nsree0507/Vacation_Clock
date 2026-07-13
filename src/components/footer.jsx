import { Link, useNavigate } from 'react-router-dom'
 
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)
 
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)
 
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
 
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)
 
const socialLinks = [
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: XIcon, href: '#', label: 'X' },
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: YoutubeIcon, href: '#', label: 'YouTube' },
]
 
const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'North India', href: '/packages?region=northindia' },
  { label: 'South India', href: '/packages?region=southindia' },
  { label: 'Packages', href: '/packages' },
  { label: 'Plan Itinerary', href: '/itinerary' },
]
 
const servicesLinks = [
  { label: 'Caretaker Service', href: '/services' },
  { label: 'Photography', href: '/services#photographer' },
  { label: 'Group Tours', href: '/places?type=category&value=Group Tours' },
  { label: 'Honeymoon Trips', href: '/places?type=category&value=Honeymoon' },
  { label: 'Corporate Travel', href: '/places?type=category&value=Corporate' },
]
 
const companyLinks = [
  { label: 'About Us', href: '/about', scrollTop: true },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Refund Policy', href: '/refund' },
]
 
export function Footer() {
  const navigate = useNavigate()
 
  const handleHomeClick = (e) => {
    e.preventDefault()
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
 
  return (
    <footer style={{ backgroundColor: '#dce9e7' }}>
      <div className="max-w-7xl mx-auto px-2 lg:px-2 py-4 lg:py-4">
        <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr_1fr] gap-10 md:gap-8">
 
          {/* Brand column */}
          <div>
            <Link to="/">
              <h2
                className="text-4xl lg:text-5xl font-serif mb-5 leading-tight"
                style={{ color: '#0a4a42' }}
              >
                Vacation Clock
              </h2>
            </Link>
            <p className="text-sm leading-relaxed mb-8" style={{ color: '#3a5a55' }}>
              India's premier travel planning platform —{' '}
              crafting unforgettable journeys across 14 states, 500+ destinations.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:bg-white/60"
                  style={{ borderColor: '#9dbdb9', color: '#3a5a55' }}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
 
          <div className="grid grid-cols-3 gap-10 md:contents">
            {/* Explore */}
            <div>
              <h3 className="text-base font-semibold mb-5" style={{ color: '#0a6b5e' }}>Explore</h3>
              <ul className="space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    {link.label === 'Home' ? (
                      <a
                        href="/"
                        onClick={handleHomeClick}
                        className="text-sm transition-colors hover:underline cursor-pointer"
                        style={{ color: '#2d4a46' }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm transition-colors hover:underline"
                        style={{ color: '#2d4a46' }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-base font-semibold mb-5" style={{ color: '#0a6b5e' }}>Services</h3>
              <ul className="space-y-3">
                {servicesLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm transition-colors hover:underline"
                      style={{ color: '#2d4a46' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-base font-semibold mb-5" style={{ color: '#0a6b5e' }}>Company</h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      onClick={link.scrollTop ? () => window.scrollTo({ top: 0, behavior: 'instant' }) : undefined}
                      className="text-sm transition-colors hover:underline"
                      style={{ color: '#2d4a46' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
      </div>
 
        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs tracking-widest uppercase"
          style={{ borderTop: '1px solid #9dbdb9', color: '#4a6e69' }}
        >
          <p>© 2024 Vacation Clock. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with{' '}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#e74c3c">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {' '}for every Indian traveler
          </p>
        </div>
      </div>
    </footer>
  )
}