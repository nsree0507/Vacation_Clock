import { useState, useEffect, useMemo } from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import Sidebar from '../../components/admin/Sidebar'
import userApi from '../../services/userApi'
import { Trash2, Lock, Loader, AlertCircle, Search, XCircle } from 'lucide-react'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await userApi.getAll()
      setUsers(response.data.data)
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const handleBlockUser = async (id, isBlocked) => {
    const action = isBlocked ? 'unblock' : 'block'
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        await userApi.blockUser(id)
        fetchUsers()
      } catch (err) {
        setError(err.response?.data?.message || `Failed to ${action} user`)
      }
    }
  }

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await userApi.deleteUser(id)
        fetchUsers()
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete user')
      }
    }
  }

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return users
    return users.filter((user) => (
      (user.name || '').toLowerCase().includes(q) ||
      (user.email || '').toLowerCase().includes(q) ||
      (user.phone || '').toLowerCase().includes(q)
    ))
  }, [users, search])

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-6 md:p-8">
          <h1 className="text-3xl font-bold text-foreground mb-8 ml-8 md:ml-12">Manage Users</h1>

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
                placeholder="Search by name or email..."
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
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Bookings
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="border-b border-border hover:bg-muted transition">
                      <td className="px-6 py-4 text-foreground font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                      <td className="px-6 py-4 text-muted-foreground">{user.phone || '-'}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal/10 text-teal text-sm font-semibold">
                          {user.bookingCount}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.isBlocked
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {user.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center space-x-2">
                        <button
                          onClick={() => handleBlockUser(user._id, user.isBlocked)}
                          className={`inline-flex items-center gap-1 px-3 py-2 rounded-full transition text-white text-sm ${
                            user.isBlocked
                              ? 'bg-teal hover:bg-teal-dark'
                              : 'bg-orange-600 hover:bg-orange-700'
                          }`}
                        >
                          <Lock size={16} />
                          <span>{user.isBlocked ? 'Unblock' : 'Block'}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-full transition-colors duration-200 text-sm"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  {search ? 'No users match your search.' : 'No users found'}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Users