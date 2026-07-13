import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PlaneTakeoff } from 'lucide-react'
 
export function ProfileDropdown({ isOpen, onClose, user, onLogout }) {
  const modalRef = useRef(null)
 
  useEffect(() => {
    if (!isOpen) return
 
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
 
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])
 
  if (!isOpen || !user) return null
 
  // Build initials from name
  const initials = user.name
    ? user.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'VC'
 
  // Display contact: prefix +91 if it looks like a phone number
  const contact = user.emailOrPhone || ''
  const displayContact = /^\d{10}$/.test(contact.replace(/\s/g, ''))
    ? `+91 ${contact}`
    : contact
 
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-4 pb-4 sm:pt-[95px] sm:pl-[420px] sm:justify-start">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.08)' }}
        onClick={onClose}
      />
 
      {/* Card — same size/shape as LoginDropdown */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-[420px] sm:max-w-[590px] rounded-[32px] bg-[#f8f7f4] shadow-[0_20px_60px_rgba(15,23,42,0.12)] max-h-[calc(100vh-2rem)] overflow-hidden"
      >
        {/* Arrow pointer at top */}
        <div
          className="absolute -top-4 right-20 w-8 h-8 bg-[#f8f7f4] rotate-45"
          style={{ borderRadius: '2px' }}
        />
 
        <div className="px-10 py-10">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 text-2xl leading-none text-slate-400 hover:text-slate-700 transition-colors"
            aria-label="Close profile menu"
          >
            ×
          </button>
 
          {/* Title */}
          <h2
            className="text-[40px] leading-none font-serif text-center mb-4"
            style={{ color: 'var(--teal)' }}
          >
            My Profile
          </h2>
          <p className="text-[16px] text-center text-[#5f6368] mb-10 leading-relaxed">
            You're signed in to Vacation Clock.
          </p>
 
          {/* Avatar + user info */}
          <div className="flex flex-col items-center gap-4 mb-10">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-serif font-semibold text-slate-600"
              style={{ background: '#e8f0ef' }}
            >
              {initials}
            </div>
            <div className="text-center">
              <p className="font-serif text-[22px] font-semibold text-slate-800">{user.name || 'Vacation Clock'}</p>
              <p className="text-[16px] text-[#5f6368] mt-1">{displayContact}</p>
            </div>
          </div>
 
          {/* My Trips link */}
          <Link
            to="/my-trips"
            onClick={onClose}
            className="w-full h-[58px] rounded-full text-[18px] font-medium border-2 flex items-center justify-center gap-2 mb-4 transition-colors hover:bg-[#e8f0ef]"
            style={{ borderColor: 'var(--teal)', color: 'var(--teal)' }}
          >
            <PlaneTakeoff size={20} />
            My Trips
          </Link>
 
          {/* Log Out button */}
          <button
            type="button"
            onClick={() => {
              onLogout()
              onClose()
            }}
            className="w-full h-[58px] rounded-full text-[18px] font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--teal)' }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}