import { useState, useEffect, useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import AdminNavbar from '../../components/admin/AdminNavbar'
import Sidebar from '../../components/admin/Sidebar'
import adminApi from '../../services/adminApi'
import {
  Trash2,
  Pencil,
  Plus,
  Loader,
  AlertCircle,
  Search,
  XCircle,
  X,
  ShieldCheck,
  Shield,
  KeyRound,
  CheckCircle2,
} from 'lucide-react'

const emptyForm = { name: '', email: '', password: '', role: 'admin' }

const ManageAdmins = () => {
  const currentAdmin = JSON.parse(localStorage.getItem('admin') || '{}')
  const isSuperAdmin = currentAdmin.role === 'superadmin'

  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [resetOnly, setResetOnly] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (isSuperAdmin) fetchAdmins()
  }, [isSuperAdmin])

  useEffect(() => {
    if (!successMessage) return
    const timer = setTimeout(() => setSuccessMessage(''), 4000)
    return () => clearTimeout(timer)
  }, [successMessage])

  // Guard: only super admins may access this page at all, even by direct URL.
  if (!isSuperAdmin) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const fetchAdmins = async () => {
    try {
      setLoading(true)
      const response = await adminApi.getAllAdmins()
      setAdmins(response.data.data)
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch admins')
    } finally {
      setLoading(false)
    }
  }

  const openCreateModal = () => {
    setEditingId(null)
    setResetOnly(false)
    setFormData(emptyForm)
    setFormError('')
    setShowModal(true)
  }

  const openEditModal = (admin) => {
    setEditingId(admin._id)
    setResetOnly(false)
    setFormData({ name: admin.name, email: admin.email, password: '', role: admin.role })
    setFormError('')
    setShowModal(true)
  }

  const openResetPasswordModal = (admin) => {
    setEditingId(admin._id)
    setResetOnly(true)
    setFormData({ ...emptyForm, name: admin.name, email: admin.email, role: admin.role })
    setFormError('')
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingId(null)
    setResetOnly(false)
    setFormData(emptyForm)
    setFormError('')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setSaving(true)

    try {
      if (resetOnly) {
        if (!formData.password) {
          setFormError('Enter a new password')
          setSaving(false)
          return
        }
        await adminApi.updateAdmin(editingId, { password: formData.password })
        closeModal()
        setSuccessMessage('Password reset successfully')
      } else if (editingId) {
        const payload = { name: formData.name, email: formData.email, role: formData.role }
        if (formData.password) payload.password = formData.password
        await adminApi.updateAdmin(editingId, payload)
        closeModal()
        setSuccessMessage('Admin updated successfully')
      } else {
        if (!formData.password) {
          setFormError('Password is required')
          setSaving(false)
          return
        }
        await adminApi.createAdmin(formData)
        closeModal()
        setSuccessMessage('Admin created successfully')
      }
      fetchAdmins()
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save admin')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this admin? This action cannot be undone.')) {
      try {
        await adminApi.deleteAdmin(id)
        fetchAdmins()
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete admin')
      }
    }
  }

  const filteredAdmins = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return admins
    return admins.filter(
      (admin) =>
        (admin.name || '').toLowerCase().includes(q) ||
        (admin.email || '').toLowerCase().includes(q)
    )
  }, [admins, search])

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 ml-8 md:ml-12">
            <h1 className="text-3xl font-bold text-foreground">Manage Admins</h1>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white px-4 py-2 rounded-full transition-colors duration-200"
            >
              <Plus size={18} />
              <span>Add Admin</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-green-700 text-sm">{successMessage}</p>
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
                      Role
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmins.map((admin) => (
                    <tr key={admin._id} className="border-b border-border hover:bg-muted transition">
                      <td className="px-6 py-4 text-foreground font-medium">
                        {admin.name}
                        {admin._id === currentAdmin.id && (
                          <span className="ml-2 text-xs text-muted-foreground">(You)</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{admin.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            admin.role === 'superadmin'
                              ? 'bg-teal/10 text-teal'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {admin.role === 'superadmin' ? (
                            <ShieldCheck size={14} />
                          ) : (
                            <Shield size={14} />
                          )}
                          {admin.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center space-x-2">
                        <button
                          onClick={() => openResetPasswordModal(admin)}
                          className="inline-flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-full transition text-sm"
                        >
                          <KeyRound size={16} />
                          <span>Reset Password</span>
                        </button>
                        <button
                          onClick={() => openEditModal(admin)}
                          className="inline-flex items-center gap-1 bg-teal hover:bg-teal-dark text-white px-3 py-2 rounded-full transition text-sm"
                        >
                          <Pencil size={16} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(admin._id)}
                          disabled={admin._id === currentAdmin.id}
                          className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-3 py-2 rounded-full transition-colors duration-200 text-sm"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredAdmins.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  {search ? 'No admins match your search.' : 'No admins found'}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-card rounded-2xl shadow-lg w-full max-w-md border border-border">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">
                {resetOnly ? `Reset Password` : editingId ? 'Edit Admin' : 'Add Admin'}
              </h2>
              <button
                onClick={closeModal}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{formError}</p>
                </div>
              )}

              {resetOnly && (
                <p className="text-sm text-muted-foreground -mt-1">
                  Setting a new password for <span className="font-semibold text-foreground">{formData.name}</span> ({formData.email})
                </p>
              )}

              {!resetOnly && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal transition"
                  />
                </div>
              )}

              {!resetOnly && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal transition"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {resetOnly ? 'New Password' : 'Password'}{' '}
                  {editingId && !resetOnly && (
                    <span className="text-xs text-muted-foreground">(leave blank to keep unchanged)</span>
                  )}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={editingId && !resetOnly ? '••••••••' : ''}
                  required={!editingId || resetOnly}
                  autoFocus={resetOnly}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal transition"
                />
              </div>

              {!resetOnly && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal transition"
                  >
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 border border-border rounded-full text-foreground hover:bg-muted transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 bg-teal hover:bg-teal-dark disabled:opacity-70 text-white font-semibold rounded-full transition"
                >
                  {saving
                    ? 'Saving...'
                    : resetOnly
                    ? 'Reset Password'
                    : editingId
                    ? 'Save Changes'
                    : 'Create Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageAdmins