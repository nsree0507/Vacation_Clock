import { useState, useEffect, useMemo } from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import Sidebar from '../../components/admin/Sidebar'
import bookingApi from '../../services/bookingApi'
import { Loader, AlertCircle, Edit3, Search, XCircle } from 'lucide-react'

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingStatus, setEditingStatus] = useState('')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await bookingApi.getAll()
      setBookings(response.data.data || response.data.bookings || [])
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await bookingApi.updateStatus(id, newStatus)
      fetchBookings()
      setEditingId(null)
      setEditingStatus('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update booking status')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredBookings = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return bookings
    return bookings.filter((booking) => (
      (booking.bookingId || '').toLowerCase().includes(q) ||
      (booking.customerName || '').toLowerCase().includes(q) ||
      (booking.customerEmail || '').toLowerCase().includes(q) ||
      (booking.destinationName || '').toLowerCase().includes(q)
    ))
  }, [bookings, search])

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-6 md:p-8 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8 ml-8 md:ml-12">View Bookings</h1>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="bg-card rounded-2xl shadow-md mb-6 p-4 border border-border">
            <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
              <Search size={20} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by booking ID, name, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none flex-1 min-w-0 text-foreground"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <XCircle size={18} />
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-96">
              <Loader className="animate-spin text-teal" size={48} />
            </div>
          ) : (
            <div className="bg-card rounded-2xl shadow-md overflow-x-auto border border-border">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Customer Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Destination
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Travel Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="border-b border-border hover:bg-muted transition">
                      <td className="px-6 py-4 text-foreground font-medium font-mono text-sm">
                        {booking.bookingId}
                      </td>
                      <td className="px-6 py-4 text-foreground">{booking.customerName}</td>
                      <td className="px-6 py-4 text-muted-foreground">{booking.destinationName}</td>
                      <td className="px-6 py-4 text-muted-foreground">{booking.travelDate}</td>
                      <td className="px-6 py-4 text-muted-foreground">₹{booking.totalAmount || 'N/A'}</td>
                      <td className="px-6 py-4">
                        {editingId === booking._id ? (
                          <div className="flex gap-2 items-center">
                            <select
                              value={editingStatus}
                              onChange={(e) => setEditingStatus(e.target.value)}
                              className="px-3 py-1 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal bg-background text-foreground"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <button
                              onClick={() => handleStatusUpdate(booking._id, editingStatus)}
                              className="bg-teal hover:bg-teal-dark text-white px-3 py-1 rounded-full text-sm transition-colors duration-200"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="bg-muted hover:bg-muted/80 text-foreground px-3 py-1 rounded-full text-sm transition-colors duration-200"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.bookingStatus)}`}>
                              {booking.bookingStatus}
                            </span>
                            <button
                              onClick={() => {
                                setEditingId(booking._id)
                                setEditingStatus(booking.bookingStatus)
                              }}
                              className="bg-teal hover:bg-teal-dark text-white p-1 rounded-full transition-colors duration-200"
                            >
                              <Edit3 size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredBookings.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  {search ? 'No bookings match your search.' : 'No bookings found'}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Bookings