import { useState, useEffect } from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import Sidebar from '../../components/admin/Sidebar'
import adminApi from '../../services/adminApi'
import { BarChart3, MapPin, MapPinIcon, Calendar, Users, Loader } from 'lucide-react'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await adminApi.getDashboard(token)
      setDashboardData(response.data.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-6 md:p-8">
          <h1 className="text-3xl font-bold text-foreground mb-8 ml-8 md:ml-12">Dashboard</h1>

          <div className="max-w-6xl mx-auto">
            {loading && (
              <div className="flex justify-center items-center h-96">
                <Loader className="animate-spin text-teal" size={48} />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-6">
                {error}
              </div>
            )}

            {dashboardData && (
              <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-card rounded-2xl shadow-md p-6 hover:shadow-lg transition border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium">Total States</p>
                      <p className="text-3xl font-bold text-teal mt-1">
                        {dashboardData.stats.states}
                      </p>
                    </div>
                    <MapPinIcon size={40} className="text-teal opacity-20" />
                  </div>
                </div>

                <div className="bg-card rounded-2xl shadow-md p-6 hover:shadow-lg transition border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium">Total Destinations</p>
                      <p className="text-3xl font-bold text-teal mt-1">
                        {dashboardData.stats.destinations}
                      </p>
                    </div>
                    <MapPin size={40} className="text-teal opacity-20" />
                  </div>
                </div>

                <div className="bg-card rounded-2xl shadow-md p-6 hover:shadow-lg transition border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium">Total Bookings</p>
                      <p className="text-3xl font-bold text-teal mt-1">
                        {dashboardData.stats.bookings}
                      </p>
                    </div>
                    <Calendar size={40} className="text-teal opacity-20" />
                  </div>
                </div>

                <div className="bg-card rounded-2xl shadow-md p-6 hover:shadow-lg transition border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium">Total Users</p>
                      <p className="text-3xl font-bold text-teal mt-1">
                        {dashboardData.stats.users}
                      </p>
                    </div>
                    <Users size={40} className="text-teal opacity-20" />
                  </div>
                </div>
              </div>

              {/* Recent Data */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Bookings */}
                <div className="bg-card rounded-2xl shadow-md p-6 border border-border">
                  <h2 className="text-lg font-bold text-foreground mb-6">Recent Bookings</h2>
                  <div className="space-y-4">
                    {dashboardData.recentBookings && dashboardData.recentBookings.length > 0 ? (
                      dashboardData.recentBookings.map((booking) => (
                        <div
                          key={booking._id}
                          className="border border-border rounded-lg p-4 hover:bg-muted transition"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold text-foreground">{booking.customerName}</p>
                              <p className="text-sm text-muted-foreground">{booking.destinationName}</p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                booking.bookingStatus === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : booking.bookingStatus === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {booking.bookingStatus}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">₹{booking.totalAmount || 'N/A'}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No bookings yet</p>
                    )}
                  </div>
                </div>

                {/* Recent Destinations */}
                <div className="bg-card rounded-2xl shadow-md p-6 border border-border">
                  <h2 className="text-lg font-bold text-foreground mb-6">Recent Destinations</h2>
                  <div className="space-y-4">
                    {dashboardData.recentDestinations &&
                    dashboardData.recentDestinations.length > 0 ? (
                      dashboardData.recentDestinations.map((dest) => (
                        <div
                          key={dest._id}
                          className="border border-border rounded-lg p-4 hover:bg-muted transition"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold text-foreground">{dest.name}</p>
                              <p className="text-sm text-muted-foreground">{dest.state}</p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal/10 text-teal">
                              {dest.category}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">₹{dest.price}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No destinations yet</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
