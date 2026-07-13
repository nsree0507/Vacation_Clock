import { Download, ArrowRight } from 'lucide-react'

export function BookingSidebarCard({ state, perPersonCost, totalCost, onBookNow, onDownload }) {
  return (
    <div className="rounded-3xl bg-teal text-white p-6 shadow-lg overflow-hidden relative">
      <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide mb-4">
        Ready to Travel
      </span>

      <h3 className="text-2xl font-serif mb-2">Book This Itinerary</h3>
      <p className="text-sm text-white/80 leading-relaxed mb-6">
        Secure your spot on this unforgettable {state.name} journey. Flexible payment options
        available.
      </p>

      <div className="flex items-center justify-between border-t border-white/15 pt-4 mb-6">
        <div>
          <p className="text-xs text-white/70 uppercase tracking-wide mb-1">Total Price</p>
          <p className="text-xl font-bold">₹{totalCost.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/70 uppercase tracking-wide mb-1">Per Person</p>
          <p className="text-sm font-semibold text-white/90">₹{perPersonCost.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onBookNow}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white text-teal font-semibold rounded-full hover:bg-white/90 transition-colors"
        >
          Book Now
          <ArrowRight size={16} />
        </button>
        <button
          onClick={onDownload}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 border border-white/25 text-white font-semibold rounded-full hover:bg-white/20 transition-colors"
        >
          <Download size={16} />
          Download Itinerary
        </button>
      </div>
    </div>
  )
}
