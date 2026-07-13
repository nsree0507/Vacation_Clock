import { useState, useEffect, useMemo } from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import Sidebar from '../../components/admin/Sidebar'
import itineraryApi from '../../services/itineraryApi'
import destinationApi from '../../services/destinationApi'
import {
  Plus,
  Edit2,
  Trash2,
  Loader,
  AlertCircle,
  X,
  MapPin,
  Sparkles,
  Check,
  XCircle,
  Clock,
  IndianRupee,
  CalendarDays,
  Search,
} from 'lucide-react'
 
const emptyForm = {
  description: '',
  destination: '',
  dayWisePlan: [],
  experienceHighlights: [''],
  whatsIncluded: [''],
  whatsNotIncluded: [''],
}
 
// Reusable "add / remove" list editor used for Experience Highlights,
// What's Included and What's Not Included.
const DynamicListField = ({ label, icon: Icon, items, onChange, placeholder }) => {
  const handleItemChange = (index, value) => {
    const next = [...items]
    next[index] = value
    onChange(next)
  }
 
  const handleAdd = () => {
    onChange([...items, ''])
  }
 
  const handleRemove = (index) => {
    const next = items.filter((_, i) => i !== index)
    onChange(next.length ? next : [''])
  }
 
  const filledCount = items.filter((item) => item.trim() !== '').length
 
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          {Icon && <Icon size={16} className="text-teal" />}
          {label}
          {filledCount > 0 && (
            <span className="text-xs font-normal text-muted-foreground">({filledCount})</span>
          )}
        </label>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 text-teal hover:text-teal-dark text-xs font-medium"
        >
          <Plus size={14} />
          Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-teal outline-none bg-background text-sm"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              disabled={items.length === 1 && !item}
              className="p-2 text-muted-foreground hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label={`Remove ${label} item`}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
 
// A single dropdown of destinations that already exist in Manage
// Destinations (instead of free text), so each package maps to one real
// destination and can't drift out of sync with it.
const DestinationField = ({ value, availableDestinations, loading, onChange }) => (
  <div>
    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
      <MapPin size={16} className="text-teal" />
      Destination
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading}
      required
      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-teal outline-none bg-background text-sm disabled:opacity-60"
    >
      <option value="">{loading ? 'Loading destinations...' : 'Select a destination'}</option>
      {availableDestinations.map((dest) => (
        <option key={dest._id} value={dest.name}>
          {dest.name} {dest.state ? `(${dest.state})` : ''}
        </option>
      ))}
    </select>
 
    {!loading && availableDestinations.length === 0 && (
      <p className="text-xs text-amber-600 mt-2">
        No destinations found. Add some in Manage Destinations first.
      </p>
    )}
  </div>
)
 
// One input row per day, sized automatically to the selected destination's
// duration - e.g. a 3-day destination shows Day 1 / Day 2 / Day 3 fields for
// the admin to note where to visit that day.
const DayWisePlanField = ({ days, onChange }) => {
  const handleTitleChange = (index, value) => {
    const next = [...days]
    next[index] = { ...next[index], title: value }
    onChange(next)
  }
 
  if (days.length === 0) return null
 
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
        <CalendarDays size={16} className="text-teal" />
        Day-wise Plan
        <span className="text-xs font-normal text-muted-foreground">({days.length} days)</span>
      </label>
      <div className="space-y-2">
        {days.map((dayPlan, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="shrink-0 text-xs font-semibold text-teal bg-teal/10 px-3 py-2.5 rounded-lg w-16 text-center">
              Day {index + 1}
            </span>
            <input
              type="text"
              value={dayPlan.title}
              onChange={(e) => handleTitleChange(index, e.target.value)}
              placeholder="Where to visit"
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-teal outline-none bg-background text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
 
const Itineraries = () => {
  const [itineraries, setItineraries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
 
  const [availableDestinations, setAvailableDestinations] = useState([])
  const [destinationsLoading, setDestinationsLoading] = useState(true)
  const [scrollToId, setScrollToId] = useState(null)
  const [search, setSearch] = useState('')
 
  useEffect(() => {
    fetchItineraries()
    fetchAvailableDestinations()
  }, [])
 
  // After a create/update finishes and the grid re-renders with fresh data,
  // scroll to the card for whichever itinerary was just saved so the admin
  // doesn't lose their place in a long list.
  useEffect(() => {
    if (!scrollToId) return
    const card = document.getElementById(`itinerary-card-${scrollToId}`)
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' })
      card.classList.add('ring-2', 'ring-teal')
      const timeout = setTimeout(() => card.classList.remove('ring-2', 'ring-teal'), 2000)
      setScrollToId(null)
      return () => clearTimeout(timeout)
    }
  }, [itineraries, scrollToId])
 
  const fetchItineraries = async () => {
    try {
      setLoading(true)
      const response = await itineraryApi.getAll()
      setItineraries(response.data.data)
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch itineraries')
    } finally {
      setLoading(false)
    }
  }
 
  const fetchAvailableDestinations = async () => {
    try {
      setDestinationsLoading(true)
      const response = await destinationApi.getAll()
      setAvailableDestinations(response.data.data || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch destinations')
    } finally {
      setDestinationsLoading(false)
    }
  }
 
  const resetForm = () => {
    setFormData(emptyForm)
    setEditingId(null)
  }
 
  // Duration and price are pulled straight from the selected destination in
  // Manage Destinations rather than typed manually here, so they always
  // match what's defined there.
  const selectedDestination = useMemo(
    () =>
      availableDestinations.find(
        (d) => d.name.toLowerCase() === formData.destination.toLowerCase()
      ),
    [formData.destination, availableDestinations]
  )
 
  const computedDuration = selectedDestination
    ? selectedDestination.days ?? (selectedDestination.nights != null ? selectedDestination.nights + 1 : 0)
    : 0
  const computedPrice = selectedDestination ? selectedDestination.price || 0 : 0
 
  const filteredItineraries = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return itineraries
    return itineraries.filter((itinerary) => {
      const destinations = Array.isArray(itinerary.destinations) ? itinerary.destinations : []
      return (
        (itinerary.packageName || '').toLowerCase().includes(q) ||
        (itinerary.description || '').toLowerCase().includes(q) ||
        destinations.some((d) => d.toLowerCase().includes(q))
      )
    })
  }, [itineraries, search])
 
  // Keep the day-wise plan rows in sync with the destination's duration:
  // grow/shrink the list to match computedDuration, without losing anything
  // already typed for the days that still exist.
  useEffect(() => {
    setFormData((prev) => {
      if (prev.dayWisePlan.length === computedDuration) return prev
      const next = Array.from({ length: computedDuration }, (_, i) => prev.dayWisePlan[i] || { day: i + 1, title: '' })
      return { ...prev, dayWisePlan: next }
    })
  }, [computedDuration])
 
  const buildPayload = () => ({
    ...formData,
    packageName: formData.destination.trim(),
    duration: computedDuration,
    price: computedPrice,
    destinations: formData.destination ? [formData.destination.trim()] : [],
    dayWisePlan: formData.dayWisePlan.map((d, i) => ({ day: i + 1, title: d.title.trim() })),
    experienceHighlights: formData.experienceHighlights.map((d) => d.trim()).filter(Boolean),
    whatsIncluded: formData.whatsIncluded.map((d) => d.trim()).filter(Boolean),
    whatsNotIncluded: formData.whatsNotIncluded.map((d) => d.trim()).filter(Boolean),
  })
 
  const handleSubmit = async (e) => {
    e.preventDefault()
 
    if (!formData.destination) {
      setError('Please select a destination')
      return
    }
 
    const payload = buildPayload()
 
    try {
      setSaving(true)
      if (editingId) {
        await itineraryApi.update(editingId, payload)
        setScrollToId(editingId)
      } else {
        const res = await itineraryApi.create(payload)
        const newId = res.data?.data?._id
        if (newId) setScrollToId(newId)
      }
 
      resetForm()
      setShowForm(false)
      setError('')
      fetchItineraries()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save itinerary')
    } finally {
      setSaving(false)
    }
  }
 
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this itinerary?')) {
      try {
        await itineraryApi.delete(id)
        fetchItineraries()
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete itinerary')
      }
    }
  }
 
  const handleEdit = (itinerary) => {
    setFormData({
      description: itinerary.description || '',
      destination: itinerary.destinations?.[0] || '',
      dayWisePlan: itinerary.dayWisePlan?.length
        ? itinerary.dayWisePlan.map((d, i) => ({ day: i + 1, title: d.title || '' }))
        : [],
      experienceHighlights: itinerary.experienceHighlights?.length ? itinerary.experienceHighlights : [''],
      whatsIncluded: itinerary.whatsIncluded?.length ? itinerary.whatsIncluded : [''],
      whatsNotIncluded: itinerary.whatsNotIncluded?.length ? itinerary.whatsNotIncluded : [''],
    })
    setEditingId(itinerary._id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setShowForm(true)
  }
 
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
 
  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">Manage Itineraries</h1>
            <button
              onClick={() => {
                const next = !showForm
                setShowForm(next)
                resetForm()
              }}
              className="flex items-center gap-2 bg-teal hover:bg-teal-dark text-white px-4 py-2 rounded-full transition-colors duration-200"
            >
              <Plus size={20} />
              <span>Add Itinerary</span>
            </button>
          </div>
 
          {/* Search */}
          <div className="bg-card rounded-2xl shadow-md mb-6 p-4 border border-border">
            <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
              <Search size={20} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search itineraries by package name, destination, or description..."
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
 
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
 
          {showForm && (
            <div className="bg-card rounded-2xl shadow-md p-6 mb-8 border border-border">
              <h2 className="text-lg font-bold text-foreground mb-4">
                {editingId ? 'Edit Itinerary' : 'Add New Itinerary'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    required
                    placeholder="A short, appealing summary of this package"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-teal outline-none bg-background"
                  />
                </div>
 
                <div className="border-t border-border pt-4">
                  <DestinationField
                    value={formData.destination}
                    availableDestinations={availableDestinations}
                    loading={destinationsLoading}
                    onChange={(destination) => setFormData((prev) => ({ ...prev, destination }))}
                  />
 
                  {formData.destination && (
                    <>
                      <div className="mt-3 grid grid-cols-2 gap-6 bg-teal/5 border border-teal/20 rounded-lg px-5 py-4">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                            <Clock size={14} className="text-teal" />
                            Duration (auto)
                          </div>
                          <p className="text-lg font-bold text-foreground">
                            {computedDuration} day{computedDuration === 1 ? '' : 's'}
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                            <IndianRupee size={14} className="text-teal" />
                            Price per person (auto)
                          </div>
                          <p className="text-lg font-bold text-foreground">₹{computedPrice}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Duration and price are calculated automatically from the selected destination's data in
                        Manage Destinations.
                      </p>
                    </>
                  )}
                </div>
 
                {formData.dayWisePlan.length > 0 && (
                  <div className="border-t border-border pt-4">
                    <DayWisePlanField
                      days={formData.dayWisePlan}
                      onChange={(dayWisePlan) => setFormData((prev) => ({ ...prev, dayWisePlan }))}
                    />
                  </div>
                )}
 
                <div className="border-t border-border pt-4">
                  <DynamicListField
                    label="Experience Highlights"
                    icon={Sparkles}
                    items={formData.experienceHighlights}
                    onChange={(experienceHighlights) =>
                      setFormData((prev) => ({ ...prev, experienceHighlights }))
                    }
                    placeholder="e.g. Sunset houseboat cruise"
                  />
                </div>
 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border pt-4">
                  <DynamicListField
                    label="What's Included"
                    icon={Check}
                    items={formData.whatsIncluded}
                    onChange={(whatsIncluded) => setFormData((prev) => ({ ...prev, whatsIncluded }))}
                    placeholder="e.g. Daily breakfast"
                  />
                  <DynamicListField
                    label="What's Not Included"
                    icon={XCircle}
                    items={formData.whatsNotIncluded}
                    onChange={(whatsNotIncluded) =>
                      setFormData((prev) => ({ ...prev, whatsNotIncluded }))
                    }
                    placeholder="e.g. Airfare"
                  />
                </div>
 
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-teal hover:bg-teal-dark text-white px-6 py-2 rounded-full transition-colors duration-200 disabled:opacity-60"
                  >
                    {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      resetForm()
                    }}
                    className="w-full sm:w-auto bg-muted hover:bg-muted/80 text-foreground px-6 py-2 rounded-full transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
 
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <Loader className="animate-spin text-teal" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItineraries.map((itinerary) => (
                <div
                  key={itinerary._id}
                  id={`itinerary-card-${itinerary._id}`}
                  className="bg-card rounded-2xl shadow-md p-6 hover:shadow-lg transition border border-border flex flex-col"
                >
                  <h3 className="text-lg font-bold text-foreground mb-2">{itinerary.packageName}</h3>
 
                  {itinerary.description && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {itinerary.description}
                    </p>
                  )}
 
                  <div className="space-y-2 text-sm mb-4">
                    <p>
                      <span className="font-semibold text-foreground">Duration:</span>{' '}
                      <span className="text-muted-foreground">{itinerary.duration} days</span>
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">Price:</span>{' '}
                      <span className="text-muted-foreground">₹{itinerary.price}</span>
                    </p>
                  </div>
 
                  {itinerary.destinations?.[0] && (
                    <p className="flex items-center gap-1 text-sm font-semibold text-foreground mb-4">
                      <MapPin size={14} className="text-teal" />
                      <span className="text-muted-foreground font-normal">{itinerary.destinations[0]}</span>
                    </p>
                  )}
 
                  {itinerary.dayWisePlan?.some((d) => d.title) && (
                    <div className="mb-4">
                      <p className="flex items-center gap-1 text-sm font-semibold text-foreground mb-1.5">
                        <CalendarDays size={14} className="text-teal" />
                        Day-wise Plan
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {itinerary.dayWisePlan.slice(0, 3).map((d, i) => (
                          <li key={d.day ?? i}>
                            <span className="font-medium text-foreground">Day {d.day ?? i + 1}:</span>{' '}
                            {d.title || '—'}
                          </li>
                        ))}
                        {itinerary.dayWisePlan.length > 3 && (
                          <li>+{itinerary.dayWisePlan.length - 3} more days</li>
                        )}
                      </ul>
                    </div>
                  )}
 
                  {itinerary.experienceHighlights?.length > 0 && (
                    <div className="mb-4">
                      <p className="flex items-center gap-1 text-sm font-semibold text-foreground mb-1.5">
                        <Sparkles size={14} className="text-teal" />
                        Highlights
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                        {itinerary.experienceHighlights.slice(0, 3).map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                        {itinerary.experienceHighlights.length > 3 && (
                          <li>+{itinerary.experienceHighlights.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  )}
 
                  {(itinerary.whatsIncluded?.length > 0 || itinerary.whatsNotIncluded?.length > 0) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
                      <div>
                        <p className="flex items-center gap-1 font-semibold text-foreground mb-1">
                          <Check size={12} className="text-teal" /> Included
                        </p>
                        <p className="text-muted-foreground">
                          {itinerary.whatsIncluded?.length || 0} item
                          {itinerary.whatsIncluded?.length === 1 ? '' : 's'}
                        </p>
                      </div>
                      <div>
                        <p className="flex items-center gap-1 font-semibold text-foreground mb-1">
                          <XCircle size={12} className="text-red-500" /> Not Included
                        </p>
                        <p className="text-muted-foreground">
                          {itinerary.whatsNotIncluded?.length || 0} item
                          {itinerary.whatsNotIncluded?.length === 1 ? '' : 's'}
                        </p>
                      </div>
                    </div>
                  )}
 
                  <div className="flex gap-2 pt-4 border-t border-border mt-auto">
                    <button
                      onClick={() => handleEdit(itinerary)}
                      className="flex-1 flex items-center justify-center gap-1 bg-teal hover:bg-teal-dark text-white px-3 py-2 rounded-full transition-colors duration-200 text-sm"
                    >
                      <Edit2 size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(itinerary._id)}
                      className="flex-1 flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-full transition-colors duration-200 text-sm"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
 
          {!loading && filteredItineraries.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>
                {search
                  ? 'No itineraries match your search.'
                  : 'No itineraries found. Start by adding a new itinerary.'}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
 
export default Itineraries