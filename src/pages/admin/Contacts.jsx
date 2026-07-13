import { useState, useEffect, useMemo, Fragment } from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import Sidebar from '../../components/admin/Sidebar'
import contactApi from '../../services/contactApi'
import {
  Loader,
  AlertCircle,
  Search,
  XCircle,
  Trash2,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from 'lucide-react'

const STATUS_STYLES = {
  new: 'bg-amber-100 text-amber-800',
  read: 'bg-blue-100 text-blue-800',
  responded: 'bg-green-100 text-green-800',
}

const formatDate = (value) => {
  if (!value) return '—'
  const date = new Date(value)
  if (isNaN(date.getTime())) return '—'
  return date.toLocaleString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const Contacts = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await contactApi.getAll()
      setContacts(response.data.data || [])
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch messages')
    } finally {
      setLoading(false)
    }
  }

  const filteredContacts = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return contacts
    return contacts.filter((contact) => (
      (contact.name || '').toLowerCase().includes(q) ||
      (contact.email || '').toLowerCase().includes(q) ||
      (contact.phone || '').toLowerCase().includes(q) ||
      (contact.subject || '').toLowerCase().includes(q) ||
      (contact.message || '').toLowerCase().includes(q)
    ))
  }, [contacts, search])

  const newCount = useMemo(
    () => contacts.filter((c) => c.status === 'new').length,
    [contacts]
  )

  const handleToggleExpand = async (contact) => {
    const isOpening = expandedId !== contact._id
    setExpandedId(isOpening ? contact._id : null)

    // Mark as read the moment the admin opens an unread message.
    if (isOpening && contact.status === 'new') {
      try {
        const res = await contactApi.updateStatus(contact._id, 'read')
        setContacts((prev) =>
          prev.map((c) => (c._id === contact._id ? res.data.data : c))
        )
      } catch (err) {
        // Non-critical — the admin can still read the message even if the
        // status update fails.
      }
    }
  }

  const handleStatusChange = async (id, status) => {
    try {
      const res = await contactApi.updateStatus(id, status)
      setContacts((prev) => prev.map((c) => (c._id === id ? res.data.data : c)))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message? This action cannot be undone.')) return
    try {
      await contactApi.delete(id)
      setContacts((prev) => prev.filter((c) => c._id !== id))
      if (expandedId === id) setExpandedId(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete message')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-6 md:p-8">
          <div className="flex flex-col gap-1 mb-8">
            <h1 className="text-3xl font-bold text-foreground">Contact Messages</h1>
            <p className="text-muted-foreground text-sm">
              {contacts.length} message{contacts.length === 1 ? '' : 's'}
              {newCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                  {newCount} new
                </span>
              )}
            </p>
          </div>

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
                placeholder="Search by name, email, phone, subject, or message..."
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
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Contact</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Subject</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Received</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => {
                    const isExpanded = expandedId === contact._id
                    return (
                      <Fragment key={contact._id}>
                        <tr
                          className={`border-b border-border hover:bg-muted transition cursor-pointer ${
                            contact.status === 'new' ? 'bg-teal/5' : ''
                          }`}
                          onClick={() => handleToggleExpand(contact)}
                        >
                          <td className="px-6 py-4 text-foreground font-medium">{contact.name}</td>
                          <td className="px-6 py-4 text-muted-foreground text-sm">
                            <div className="flex items-center gap-1.5">
                              <Mail size={13} className="shrink-0" />
                              <span className="truncate max-w-[180px]">{contact.email}</span>
                            </div>
                            {contact.phone && (
                              <div className="flex items-center gap-1.5 mt-1">
                                <Phone size={13} className="shrink-0" />
                                <span>{contact.phone}</span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-muted-foreground max-w-[220px] truncate">
                            {contact.subject}
                          </td>
                          <td className="px-6 py-4 text-muted-foreground text-sm whitespace-nowrap">
                            {formatDate(contact.createdAt)}
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={contact.status}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                              className={`px-3 py-1 rounded-full text-xs font-semibold border-0 outline-none cursor-pointer ${STATUS_STYLES[contact.status] || 'bg-gray-100 text-gray-800'}`}
                            >
                              <option value="new">New</option>
                              <option value="read">Read</option>
                              <option value="responded">Responded</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleToggleExpand(contact)
                                }}
                                className="inline-flex items-center gap-1 bg-teal hover:bg-teal-dark text-white px-3 py-1.5 rounded-full transition-colors duration-200 text-sm"
                              >
                                <MessageSquare size={14} />
                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDelete(contact._id)
                                }}
                                className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full transition-colors duration-200 text-sm"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="border-b border-border bg-muted/40">
                            <td colSpan={6} className="px-6 py-4">
                              <p className="text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                                Message
                              </p>
                              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                {contact.message}
                              </p>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    )
                  })}
                </tbody>
              </table>
              {filteredContacts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  {search ? 'No messages match your search.' : 'No contact messages yet'}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Contacts
