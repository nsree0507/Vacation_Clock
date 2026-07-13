import { useState, useEffect, useRef, useMemo } from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import Sidebar from '../../components/admin/Sidebar'
import destinationApi from '../../services/destinationApi'
import stateApi from '../../services/stateApi'
import { CATEGORIES } from '../../data/categories'
import { Plus, Edit2, Trash2, Search, Loader, AlertCircle, Check, X, Image as ImageIcon, Upload, XCircle, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'
 
const ImageUploadField = ({ value, onChange }) => {
  const [preview, setPreview] = useState(value || '')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef(null)
 
  useEffect(() => {
    setPreview(value || '')
  }, [value])
 
  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const MAX_MB = 5
    if (file.size > MAX_MB * 1024 * 1024) {
      setUploadError(`File too large. Max ${MAX_MB}MB allowed.`)
      return
    }

    setUploading(true)
    setUploadError('')

    // Show local preview immediately
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result)
    reader.readAsDataURL(file)

    try {
      const data = new FormData()
      data.append('image', file)
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/upload`,{method: 'POST',body: data,})
      if (!res.ok) throw new Error('Upload failed')
      const json = await res.json()
      onChange(json.imageUrl)
    } catch (err) {
      setUploadError('Image upload failed. Please try again.')
      setPreview('')
      onChange('')
    } finally {
      setUploading(false)
    }
  }
 
  const handleClear = () => {
    setPreview('')
    onChange('')
    setUploadError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }
 
  return (
    <div className="space-y-2">
      {/* Drop zone / upload button */}
      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer transition-colors
          ${uploading ? 'opacity-60 cursor-not-allowed border-border' : 'hover:border-teal border-border'}`}
        style={{ minHeight: '100px' }}
      >
        {preview ? (
          <div className="relative w-full">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-32 object-contain rounded-lg bg-muted/40 p-2"
              onError={() => setPreview('')}
            />
            {!uploading && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleClear() }}
                className="absolute top-1 right-1 bg-white rounded-full shadow text-red-500 hover:text-red-700"
              >
                <XCircle size={20} />
              </button>
            )}
            <p className="text-xs text-center text-muted-foreground mt-2">Click to replace image</p>
          </div>
        ) : uploading ? (
          <div className="flex flex-col items-center gap-2 text-teal">
            <Loader size={28} className="animate-spin" />
            <p className="text-sm">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Upload size={28} />
            <p className="text-sm font-medium">Click to upload image</p>
            <p className="text-xs">JPG, PNG, WEBP up to 5MB</p>
          </div>
        )}
      </div>
 
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />
 
      {uploadError && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle size={12} /> {uploadError}
        </p>
      )}
    </div>
  )
}
 
const Destinations = () => {
  const [destinations, setDestinations] = useState([])
  const [states, setStates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [inlineEditing, setInlineEditing] = useState({})
  const [scrollToId, setScrollToId] = useState(null)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    category: '',
    description: '',
    imageUrl: '',
    rating: 4.5,
    price: '',
    days: '',
    nights: '',
  })

  // After a create/update finishes and the table re-renders with fresh data,
  // scroll to the row for whichever destination was just saved so the admin
  // doesn't lose their place in a long list.
  useEffect(() => {
    if (!scrollToId) return
    const row = document.getElementById(`destination-row-${scrollToId}`)
    if (row) {
      row.scrollIntoView({ behavior: 'smooth', block: 'center' })
      row.classList.add('bg-teal/10')
      const timeout = setTimeout(() => row.classList.remove('bg-teal/10'), 2000)
      setScrollToId(null)
      return () => clearTimeout(timeout)
    }
  }, [destinations, scrollToId])
 
  useEffect(() => {
    fetchDestinations()
    fetchStates()
  }, [])
 
  const fetchStates = async () => {
    try {
      const response = await stateApi.getAll()
      setStates(response.data.data || [])
    } catch (err) {
      // Non-critical — the form still works, just without a live state list.
    }
  }
 
  const fetchDestinations = async () => {
    try {
      setLoading(true)
      const response = await destinationApi.getAll()
      setDestinations(response.data.data)
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch destinations')
    } finally {
      setLoading(false)
    }
  }

  // Toggle sort direction for a column, or switch to a new column ascending.
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
      }
      return { key, direction: 'asc' }
    })
  }

  const filteredDestinations = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return destinations
    return destinations.filter((destination) => (
      (destination.name || '').toLowerCase().includes(q) ||
      (destination.state || '').toLowerCase().includes(q) ||
      (destination.category || '').toLowerCase().includes(q)
    ))
  }, [destinations, search])

  const sortedDestinations = useMemo(() => {
    if (!sortConfig.key) return filteredDestinations
    const sorted = [...filteredDestinations].sort((a, b) => {
      const aVal = (a[sortConfig.key] || '').toString().toLowerCase()
      const bVal = (b[sortConfig.key] || '').toString().toLowerCase()
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
    return sorted
  }, [filteredDestinations, sortConfig])

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown size={14} className="text-muted-foreground/50" />
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp size={14} className="text-teal" />
    ) : (
      <ArrowDown size={14} className="text-teal" />
    )
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await destinationApi.update(editingId, formData)
        setScrollToId(editingId)
        setEditingId(null)
      } else {
        const res = await destinationApi.create(formData)
        const newId = res.data?.data?._id
        if (newId) setScrollToId(newId)
      }
      setFormData({
        name: '',
        state: '',
        category: '',
        description: '',
        imageUrl: '',
        rating: 4.5,
        price: '',
        days: '',
        nights: '',
      })
      setShowForm(false)
      fetchDestinations()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save destination')
    }
  }
 
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      try {
        await destinationApi.delete(id)
        fetchDestinations()
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete destination')
      }
    }
  }
 
  const handleEdit = (destination) => {
    setFormData(destination)
    setEditingId(destination._id)
    setShowForm(true)
    fetchStates()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
 
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
 
  const handleInlineEdit = (destinationId, field, value) => {
    setInlineEditing((prev) => ({
      ...prev,
      [destinationId]: { field, value },
    }))
  }
 
  const handleInlineSave = async (destinationId, field, value) => {
    try {
      if (field === 'price') {
        const priceNum = parseFloat(value)
        if (isNaN(priceNum) || priceNum < 0) {
          setError('Price must be a valid positive number')
          return
        }
      }
 
      const destination = destinations.find((d) => d._id === destinationId)
      if (!destination) return
 
      const updateData = { ...destination, [field]: value }
      await destinationApi.update(destinationId, updateData)
 
      setDestinations((prev) =>
        prev.map((d) => (d._id === destinationId ? { ...d, [field]: value } : d))
      )
      setInlineEditing((prev) => {
        const next = { ...prev }
        delete next[destinationId]
        return next
      })
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || `Failed to update ${field}`)
    }
  }
 
  const handleInlineCancel = (destinationId) => {
    setInlineEditing((prev) => {
      const next = { ...prev }
      delete next[destinationId]
      return next
    })
  }
 
  const emptyForm = {
    name: '',
    state: '',
    category: '',
    description: '',
    imageUrl: '',
    rating: 4.5,
    price: '',
    days: '',
    nights: '',
  }
 
  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">Manage Destinations</h1>
            <button
              onClick={() => {
                setShowForm(!showForm)
                setEditingId(null)
                setFormData(emptyForm)
                fetchStates()
              }}
              className="flex items-center gap-2 bg-teal hover:bg-teal-dark text-white px-4 py-2 rounded-full transition-colors duration-200"
            >
              <Plus size={20} />
              <span>Add Destination</span>
            </button>
          </div>
 
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
 
          {showForm && (
            <div className="bg-card rounded-2xl shadow-md p-6 mb-8 border border-border">
              <h2 className="text-lg font-bold text-foreground mb-4">
                {editingId ? 'Edit Destination' : 'Add New Destination'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Destination Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-teal outline-none bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">State</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-teal outline-none bg-background"
                    >
                      <option value="">Select State</option>
                      {states.map((s) => (
                        <option key={s._id} value={s.name}>{s.name}</option>
                      ))}
                      {/* Keep an already-saved state selectable even if it was removed from Manage States */}
                      {formData.state && !states.some((s) => s.name === formData.state) && (
                        <option value={formData.state}>{formData.state}</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-teal outline-none bg-background"
                    >
                      <option value="">Select Category</option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                      {formData.category && !CATEGORIES.includes(formData.category) && (
                        <option value={formData.category}>{formData.category}</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-teal outline-none bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-teal outline-none bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Destination Image
                    </label>
                    <ImageUploadField
                      value={formData.imageUrl}
                      onChange={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
                    />
                  </div>
                  {/* Days & Nights */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Days</label>
                    <input
                      type="number"
                      name="days"
                      value={formData.days}
                      onChange={handleChange}
                      min="1"
                      placeholder="e.g. 5"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-teal outline-none bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nights</label>
                    <input
                      type="number"
                      name="nights"
                      value={formData.nights}
                      onChange={handleChange}
                      min="1"
                      placeholder="e.g. 4"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-teal outline-none bg-background"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    className="bg-teal hover:bg-teal-dark text-white px-6 py-2 rounded-full transition-colors duration-200"
                  >
                    {editingId ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-muted hover:bg-muted/80 text-foreground px-6 py-2 rounded-full transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
 
          <div className="bg-card rounded-2xl shadow-md mb-6 p-4 border border-border">
            <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
              <Search size={20} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search destinations by name, state, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none flex-1 text-foreground"
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
                    <th
                      onClick={() => handleSort('name')}
                      className="px-6 py-3 text-left text-sm font-semibold text-foreground cursor-pointer select-none hover:bg-muted/80 transition-colors"
                    >
                      <span className="inline-flex items-center gap-1">
                        Destination
                        {renderSortIcon('name')}
                      </span>
                    </th>
                    <th
                      onClick={() => handleSort('state')}
                      className="px-6 py-3 text-left text-sm font-semibold text-foreground cursor-pointer select-none hover:bg-muted/80 transition-colors"
                    >
                      <span className="inline-flex items-center gap-1">
                        State
                        {renderSortIcon('state')}
                      </span>
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Image</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Rating</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Days / Nights</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDestinations.map((destination) => {
                    const editing = inlineEditing[destination._id]
                    return (
                      <tr
                        key={destination._id}
                        id={`destination-row-${destination._id}`}
                        className="border-b border-border hover:bg-muted transition"
                      >
                        <td className="px-6 py-4 text-foreground font-medium">{destination.name}</td>
                        <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{destination.state}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-teal/10 text-teal rounded-full text-sm font-medium whitespace-nowrap">
                            {destination.category}
                          </span>
                        </td>
                        {/* Price Cell - Editable */}
                        <td className="px-6 py-4 text-muted-foreground">
                          {editing?.field === 'price' ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={editing.value}
                                onChange={(e) => handleInlineEdit(destination._id, 'price', e.target.value)}
                                className="w-20 px-2 py-1 border border-border rounded text-sm focus:ring-2 focus:ring-teal outline-none bg-background"
                                min="0"
                              />
                              <button
                                onClick={() => handleInlineSave(destination._id, 'price', editing.value)}
                                className="p-1 text-green-600 hover:bg-green-50 rounded"
                              >
                                <Check size={16} />
                              </button>
                              <button
                                onClick={() => handleInlineCancel(destination._id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 group">
                              <span>₹{destination.price || '0'}</span>
                              <button
                                onClick={() => handleInlineEdit(destination._id, 'price', destination.price || '0')}
                                className="opacity-0 group-hover:opacity-100 p-1 text-teal hover:bg-teal/10 rounded transition-opacity"
                              >
                                <Edit2 size={14} />
                              </button>
                            </div>
                          )}
                        </td>
                        {/* Image Cell - thumbnail */}
                        <td className="px-6 py-4">
                          {destination.imageUrl ? (
                            <img
                              src={destination.imageUrl}
                              alt={destination.name}
                              className="w-14 h-10 object-contain rounded-lg border border-border bg-muted/40 p-0.5"
                              onError={(e) => { e.target.style.display = 'none' }}
                            />
                          ) : (
                            <span className="text-xs text-muted-foreground italic flex items-center gap-1">
                              <ImageIcon size={14} /> No image
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">⭐ {destination.rating}</td>
                        {/* Days / Nights Column */}
                        <td className="px-6 py-4 text-muted-foreground">
                          {destination.days || destination.nights ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-teal/10 text-teal rounded-lg text-sm font-medium whitespace-nowrap">
                              {destination.days ? `${destination.days}D` : '—'}
                              {' / '}
                              {destination.nights ? `${destination.nights}N` : '—'}
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">Not set</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center space-x-2">
                          <button
                            onClick={() => handleEdit(destination)}
                            className="inline-flex items-center gap-1 bg-teal hover:bg-teal-dark text-white px-3 py-1 rounded-full transition-colors duration-200 text-sm"
                          >
                            <Edit2 size={16} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(destination._id)}
                            className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full transition-colors duration-200 text-sm"
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {sortedDestinations.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  {search ? 'No destinations match your search.' : 'No destinations found'}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
 
export default Destinations