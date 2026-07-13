import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
 
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}
// User Pages
import HomePage from './pages/HomePage'
import GalleryPage from './pages/GalleryPage'
import AboutPage from './pages/AboutPage'
import CategoriesPage from './pages/CategoriesPage'
import PackagesPage from './pages/PackagesPage'
import PlacesPage from './pages/PlacesPage'
import ServicesPage from './pages/ServicesPage'
import ExplorePage from './pages/ExplorePage'
import ContactPage from './pages/ContactPage'
import DynamicItineraryPage from './pages/DynamicItineraryPage'
import PlanItineraryPage from './pages/PlanItineraryPage'
import PackageDetailsPage from './pages/PackageDetailsPage'
import BookingPage from './pages/BookingPage'
import MyTripsPage from './pages/MyTripsPage'
import BookingConfirmationPage from './pages/BookingConfirmationPage'
import CheckoutPage from './pages/CheckoutPage'
import NotFoundPage from './pages/NotFoundPage'
import SignInPage from './pages/SignInPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import RefundPolicyPage from './pages/RefundPolicyPage'
// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import Destinations from './pages/admin/Destinations'
import States from './pages/admin/States'
import Itineraries from './pages/admin/Itineraries'
import Bookings from './pages/admin/Bookings'
import Users from './pages/admin/Users'
import Contacts from './pages/admin/Contacts'
import ManageAdmins from './pages/admin/ManageAdmins'
// Admin Components
import ProtectedRoute from './components/admin/ProtectedRoute'
export default function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
 
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    setIsAdminAuthenticated(!!token)
 
    // Listen for storage changes (e.g., logout from another tab)
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('adminToken')
      setIsAdminAuthenticated(!!newToken)
    }
 
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:category" element={<CategoriesPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/packages/details/:id" element={<PackageDetailsPage />} />
        <Route path="/packages/:state" element={<DynamicItineraryPage />} />
        <Route path="/places" element={<PlacesPage />} />
        <Route path="/booking/:state" element={<BookingPage />} />
        <Route path="/my-trips" element={<MyTripsPage />} />
        <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
        <Route path="/checkout/:slug" element={<CheckoutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/refund" element={<RefundPolicyPage />} />
        <Route path="/itinerary" element={<PlanItineraryPage />} />
        <Route path="/itinerary/:id" element={<DynamicItineraryPage />} />
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/admin/destinations"
          element={<ProtectedRoute element={<Destinations />} />}
        />
        <Route
          path="/admin/states"
          element={<ProtectedRoute element={<States />} />}
        />
        <Route
          path="/admin/itineraries"
          element={<ProtectedRoute element={<Itineraries />} />}
        />
        <Route
          path="/admin/bookings"
          element={<ProtectedRoute element={<Bookings />} />}
        />
        <Route
          path="/admin/users"
          element={<ProtectedRoute element={<Users />} />}
        />
        <Route
          path="/admin/contacts"
          element={<ProtectedRoute element={<Contacts />} />}
        />
        <Route
          path="/admin/manage-admins"
          element={<ProtectedRoute element={<ManageAdmins />} />}
        />
        {/* 404 Route */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  )
}