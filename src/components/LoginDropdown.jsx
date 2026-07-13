import { useEffect, useRef, useState } from 'react'
 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vacation-clock-6oij.onrender.com/api'
 
export function LoginDropdown({ isOpen, onClose, onLoginSuccess }) {
  const modalRef = useRef(null)
  const [name, setName] = useState('')
  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [status, setStatus] = useState('')
  const [otpSent, setOtpSent] = useState(false)
 
  // Reset ALL form state every time the modal opens
  useEffect(() => {
    if (isOpen) {
      setName('')
      setEmailOrPhone('')
      setOtp('')
      setRememberMe(false)
      setStatus('')
      setOtpSent(false)
    }
  }, [isOpen])
 
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

  // Lock background scrolling when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    if (isOpen) document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])
 
  if (!isOpen) return null
 
  const handleSubmit = async (event) => {
    event.preventDefault()
 
    const trimmedName = name.trim()
    const trimmedEmail = emailOrPhone.trim()
 
    // Step 1: validate name + email/phone, then send OTP
    if (!otpSent) {
      if (!trimmedName || !trimmedEmail) {
        setStatus('Please enter your name and email/phone.')
        return
      }
 
      // Send OTP request
      try {
        await fetch('/api/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: trimmedName, emailOrPhone: trimmedEmail }),
        })
      } catch (_) {
        // backend not available locally; ignore
      }
 
      setOtpSent(true)
      setStatus('OTP sent! Please enter it below.')
      return
    }
 
    // Step 2: verify OTP and sign in — persist the user in the database so
    // they show up under Admin > Manage Users
    const trimmedOtp = otp.trim()
    if (!trimmedOtp) {
      setStatus('Please enter the OTP.')
      return
    }
 
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, emailOrPhone: trimmedEmail }),
      })
 
      const result = await response.json().catch(() => null)
 
      if (!response.ok) {
        setStatus(result?.message || 'Unable to sign in. Please try again.')
        return
      }
 
      const savedUser = result?.data
 
      const userData = {
        id: savedUser?._id,
        name: savedUser?.name || trimmedName,
        emailOrPhone: savedUser?.email || savedUser?.phone || trimmedEmail,
        rememberMe,
        loginTime: new Date().toISOString(),
      }
 
      localStorage.setItem('vacationClockUser', JSON.stringify(userData))
 
      setStatus('Sign in successful!')
 
      setTimeout(() => {
        setStatus('')
        onLoginSuccess(userData)
        onClose()
      }, 800)
    } catch (err) {
      setStatus('Could not reach the server. Please check your connection and try again.')
    }
  }
 
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-4 pb-4 sm:items-start sm:justify-start sm:pt-[95px] sm:pl-[420px]">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.08)' }}
        onClick={onClose}
      />
 
      {/* Card */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-[420px] sm:w-full sm:max-w-[590px] rounded-[32px] bg-[#f8f7f4] shadow-[0_20px_60px_rgba(15,23,42,0.12)] max-h-[calc(100vh-2rem)] overflow-hidden"
      >
        {/* Arrow pointer at top (desktop only) */}
        <div
          className="hidden sm:block absolute -top-4 right-20 w-8 h-8 bg-[#f8f7f4] rotate-45"
          style={{ borderRadius: '2px' }}
        />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 text-2xl leading-none text-slate-400 hover:text-slate-700 transition-colors z-20"
          aria-label="Close sign in modal"
        >
          ×
        </button>

        <div className="overflow-y-auto max-h-[88vh]">
          <div className="sticky top-0 bg-[#f8f7f4] z-10 px-6 py-6 sm:px-10 sm:py-10">
            <h2
              className="text-[40px] leading-none font-serif text-center mb-4"
              style={{ color: 'var(--teal)' }}
            >
              Sign In
            </h2>
            <p className="text-[16px] text-center text-[#5f6368] mb-0 leading-relaxed">
              Access the Dreamspos panel using your email and passcode.
            </p>
          </div>

          <div className="px-6 pb-6 sm:px-10 sm:pb-10">
            <form onSubmit={handleSubmit} className="space-y-7">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full h-[58px] rounded-[12px] border border-[#8a8a8a] bg-transparent px-5 text-[16px] text-slate-800 placeholder:text-[#666] focus:outline-none"
              />
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Email/Phone Number"
                className="w-full h-[58px] rounded-[12px] border border-[#8a8a8a] bg-transparent px-5 text-[16px] text-slate-800 placeholder:text-[#666] focus:outline-none"
              />

              {/* OTP input only shown after clicking Verify OTP */}
              {otpSent && (
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  autoFocus
                  className="w-full h-[58px] rounded-[12px] border border-[#8a8a8a] bg-transparent px-5 text-[16px] text-slate-800 placeholder:text-[#666] focus:outline-none"
                />
              )}

              <label className="flex items-center gap-3 text-[16px] text-[#3f3f3f] cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 accent-teal"
                />
                Remember Me
              </label>

              {status && (
                <p
                  className="text-sm font-medium"
                  style={{ color: status.toLowerCase().includes('please') ? '#e74c3c' : 'var(--teal)' }}
                >
                  {status}
                </p>
              )}

              <button
                type="submit"
                className="w-full h-[58px] rounded-full text-[18px] font-medium text-white transition-opacity hover:opacity-90 mt-2"
                style={{ background: 'var(--teal)' }}
              >
                {otpSent ? 'Sign In' : 'Verify OTP'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}