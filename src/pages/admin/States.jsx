import { useState, useEffect, useRef, useMemo } from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import Sidebar from '../../components/admin/Sidebar'
import stateApi from '../../services/stateApi'
import { CATEGORIES } from '../../data/categories'
import { Plus, Edit2, Trash2, Loader, AlertCircle, Upload, XCircle, MapPin, Clock, Utensils, Search } from 'lucide-react'
 
const REGIONS = ['North India', 'South India', 'East India', 'West India', 'Central India', 'North-East India']
 
// ── Image Upload ──────────────────────────────────────────────────────────────
const ImageUploadField = ({ value, onChange }) => {
  const [preview, setPreview] = useState(value || '')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef(null)
 
  useEffect(() => { setPreview(value || '') }, [value])
 
  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { setUploadError('File too large. Max 5MB.'); return }
    setUploading(true)
    setUploadError('')
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result)
    reader.readAsDataURL(file)
    try {
      const data = new FormData()
      data.append('image', file)
      console.log(import.meta.env.VITE_API_BASE_URL)
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/upload`, {method: 'POST', body: data, })
      if (!res.ok) throw new Error('Upload failed')
      const json = await res.json()
      onChange(json.imageUrl)
    } catch {
      setUploadError('Image upload failed. Please try again.')
      setPreview('')
      onChange('')
    } finally {
      setUploading(false)
    }
  }
 
  const handleClear = () => {
    setPreview(''); onChange(''); setUploadError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }
 
  return (
    <div className="space-y-2">
      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer transition-colors
          ${uploading ? 'opacity-60 cursor-not-allowed border-border' : 'hover:border-teal border-border'}`}
        style={{ minHeight: '100px' }}
      >
        {preview ? (
          <div className="relative w-full">
            <img src={preview} alt="Preview" className="w-full h-36 object-cover rounded-lg" onError={() => setPreview('')} />
            {!uploading && (
              <button type="button" onClick={(e) => { e.stopPropagation(); handleClear() }}
                className="absolute top-1 right-1 bg-white rounded-full shadow text-red-500 hover:text-red-700">
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
            <p className="text-sm font-medium">Click to upload state image</p>
            <p className="text-xs">JPG, PNG, WEBP up to 5MB</p>
          </div>
        )}
      </div>
      <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleFileChange} className="hidden" />
      {uploadError && <p className="text-xs text-red-600 flex items-center gap-1"><AlertCircle size={12} /> {uploadError}</p>}
    </div>
  )
}
 
// ── Main Component ────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  name: '', slug: '', description: '',
  famousPlaces: '', bestTimeToVisit: '',
  foodAndCulture: '', imageUrl: '',
  categories: [], region: '',
}
 
const States = () => {
  const [states, setStates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [scrollToId, setScrollToId] = useState(null)
  const [search, setSearch] = useState('')
 
  useEffect(() => { fetchStates() }, [])
 
  // After a create/update finishes and the grid re-renders with fresh data,
  // scroll to the card for whichever state was just saved so the admin
  // doesn't lose their place in a long list.
  useEffect(() => {
    if (!scrollToId) return
    const card = document.getElementById(`state-card-${scrollToId}`)
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' })
      card.classList.add('ring-2', 'ring-teal')
      const timeout = setTimeout(() => card.classList.remove('ring-2', 'ring-teal'), 2000)
      setScrollToId(null)
      return () => clearTimeout(timeout)
    }
  }, [states, scrollToId])
 
  const fetchStates = async () => {
    try {
      setLoading(true)
      const response = await stateApi.getAll()
      setStates(response.data.data || [])
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch states')
    } finally {
      setLoading(false)
    }
  }
 
  const filteredStates = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return states
    return states.filter((state) => {
      const categories = Array.isArray(state.categories) && state.categories.length
        ? state.categories
        : (state.category ? [state.category] : [])
      return (
        (state.name || '').toLowerCase().includes(q) ||
        (state.slug || '').toLowerCase().includes(q) ||
        (state.region || '').toLowerCase().includes(q) ||
        categories.some((c) => c.toLowerCase().includes(q))
      )
    })
  }, [states, search])
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.categories.length === 0) {
      setError('Please select at least one category')
      return
    }
    setSaving(true)
    try {
      if (editingId) {
        await stateApi.update(editingId, formData)
        setScrollToId(editingId)
        setEditingId(null)
      } else {
        const res = await stateApi.create(formData)
        const newId = res.data?.data?._id
        if (newId) setScrollToId(newId)
      }
      setFormData(EMPTY_FORM)
      setShowForm(false)
      fetchStates()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save state')
    } finally {
      setSaving(false)
    }
  }
 
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this state?')) return
    try {
      await stateApi.delete(id)
      fetchStates()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete state')
    }
  }
 
  const handleEdit = (state) => {
    setFormData({
      name: state.name || '',
      slug: state.slug || '',
      description: state.description || '',
      famousPlaces: state.famousPlaces || '',
      bestTimeToVisit: state.bestTimeToVisit || '',
      foodAndCulture: state.foodAndCulture || '',
      imageUrl: state.imageUrl || '',
      categories: (Array.isArray(state.categories) && state.categories.length
        ? state.categories
        : (state.category ? [state.category] : [])
      ).filter((c) => CATEGORIES.includes(c)),
      region: state.region || '',
    })
    setEditingId(state._id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryToggle = (cat) => {
    setFormData(prev => {
      const has = prev.categories.includes(cat)
      return {
        ...prev,
        categories: has
          ? prev.categories.filter(c => c !== cat)
          : [...prev.categories, cat],
      }
    })
  }
 
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
 
  const openAddForm = () => {
    setFormData(EMPTY_FORM)
    setEditingId(null)
    setShowForm(true)
  }
 
  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-6 md:p-8">
 
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Manage States</h1>
              <p className="text-muted-foreground text-sm mt-1">{states.length} states in database</p>
            </div>
            <button onClick={openAddForm}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-teal hover:opacity-90 text-white px-5 py-2.5 rounded-full transition-all duration-200 font-medium">
              <Plus size={18} /> Add State
            </button>
          </div>
 
          {/* Search */}
          <div className="bg-card rounded-2xl shadow-sm mb-6 p-4 border border-border">
            <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
              <Search size={20} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search states by name, slug, region, or category..."
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
 
          {/* Error */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle size={18} className="text-red-600 mt-0.5 shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
 
          {/* Form */}
          {showForm && (
            <div className="bg-card rounded-2xl shadow-md p-6 mb-8 border border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">
                {editingId ? 'Edit State' : 'Add New State'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
 
                {/* Row 1: State Name + Famous Places */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">State Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-teal outline-none bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Famous Places</label>
                    <input
                      type="text"
                      name="famousPlaces"
                      placeholder="e.g. Taj Mahal, Agra Fort, Fatehpur Sikri"
                      value={formData.famousPlaces}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-teal outline-none bg-background"
                    />
                  </div>
                </div>
 
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Description *</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} required rows={3}
                    className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-teal outline-none bg-background resize-none" />
                </div>
 
                {/* Row 2: Best Time to Visit + Food */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Best Time to Visit</label>
                    <input type="text" name="bestTimeToVisit" value={formData.bestTimeToVisit} onChange={handleChange}
                      placeholder="e.g. October to March"
                      className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-teal outline-none bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Food</label>
                    <input type="text" name="foodAndCulture" value={formData.foodAndCulture} onChange={handleChange}
                      placeholder="e.g. Biryani, Hyderabadi cuisine, Irani chai"
                      className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-teal outline-none bg-background" />
                  </div>
                </div>
 
                {/* Row 3: Region + Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Region *</label>
                    <select name="region" value={formData.region} onChange={handleChange} required
                      className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-teal outline-none bg-background">
                      <option value="">Select Region</option>
                      {REGIONS.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Categories * <span className="text-xs font-normal text-muted-foreground">(select one or more)</span>
                    </label>
                    <div className="flex flex-wrap gap-2 px-4 py-2.5 border border-border rounded-xl bg-background">
                      {CATEGORIES.map(c => {
                        const selected = formData.categories.includes(c)
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() => handleCategoryToggle(c)}
                            className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                              selected
                                ? 'bg-teal text-white border-teal'
                                : 'bg-transparent text-foreground border-border hover:border-teal'
                            }`}
                          >
                            {c}
                          </button>
                        )
                      })}
                      {/* Keep an already-saved legacy category selectable even if it's no longer in the master list */}
                    </div>
                  </div>
                </div>
 
                {/* State Image */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">State Image</label>
                  <ImageUploadField
                    value={formData.imageUrl}
                    onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                  />
                </div>
 
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button type="submit" disabled={saving}
                    className="flex items-center gap-2 bg-teal hover:opacity-90 text-white px-6 py-2.5 rounded-full transition-all font-medium disabled:opacity-60">
                    {saving && <Loader size={16} className="animate-spin" />}
                    {editingId ? 'Update State' : 'Create State'}
                  </button>
                  <button type="button" onClick={() => { setShowForm(false); setEditingId(null) }}
                    className="px-6 py-2.5 rounded-full border border-border text-foreground hover:bg-muted transition-all">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
 
          {/* States Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="animate-spin text-teal" size={40} />
            </div>
          ) : filteredStates.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <MapPin size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No states found</p>
              <p className="text-sm">{search ? 'Try a different search term.' : 'Click "Add State" to get started.'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredStates.map((state) => (
                <div
                  key={state._id}
                  id={`state-card-${state._id}`}
                  className="bg-card rounded-2xl shadow-sm hover:shadow-md transition border border-border overflow-hidden"
                >
                  {state.imageUrl ? (
                    <img src={state.imageUrl} alt={state.name} className="w-full h-36 object-cover" onError={e => e.target.style.display='none'} />
                  ) : (
                    <div className="w-full h-36 bg-muted flex items-center justify-center">
                      <MapPin size={32} className="text-muted-foreground opacity-40" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-lg font-bold text-foreground">{state.name}</h3>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full shrink-0 ml-2">{state.slug}</span>
                    </div>
                    {/* Region & Category badges */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {state.region && (
                        <span className="text-xs bg-teal/10 text-teal px-2 py-0.5 rounded-full font-medium">{state.region}</span>
                      )}
                      {(Array.isArray(state.categories) && state.categories.length
                        ? state.categories
                        : (state.category ? [state.category] : [])
                      ).map((c) => (
                        <span key={c} className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">{c}</span>
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{state.description}</p>
                    {state.bestTimeToVisit && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                        <Clock size={12} className="text-teal shrink-0" />
                        <span>{state.bestTimeToVisit}</span>
                      </div>
                    )}
                    {state.foodAndCulture && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                        <Utensils size={12} className="text-teal shrink-0" />
                        <span className="line-clamp-1">{state.foodAndCulture}</span>
                      </div>
                    )}
                    {state.famousPlaces && (() => {
                      const places = state.famousPlaces.split(',').map(s => s.trim()).filter(Boolean)
                      return places.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {places.slice(0, 4).map(place => (
                            <span key={place} className="text-xs bg-teal/10 text-teal px-2 py-0.5 rounded-full">{place}</span>
                          ))}
                          {places.length > 4 && (
                            <span className="text-xs text-muted-foreground px-2 py-0.5">+{places.length - 4} more</span>
                          )}
                        </div>
                      )
                    })()}
                    <div className="flex gap-2 pt-4 border-t border-border">
                      <button onClick={() => handleEdit(state)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-teal hover:opacity-90 text-white px-3 py-2 rounded-full text-sm font-medium transition">
                        <Edit2 size={14} /> Edit
                      </button>
                      <button onClick={() => handleDelete(state._id)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full text-sm font-medium transition">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
 
export default States