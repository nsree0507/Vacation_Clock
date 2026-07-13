import Contact from '../models/Contact.js'

// Create a new contact message (public — used by the Contact Us form)
export async function createContact(req, res) {
  try {
    const { name, email, phone, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please provide your name, email, subject, and message',
      })
    }

    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      subject: subject.trim(),
      message: message.trim(),
      status: 'new',
    })

    await contact.save()

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully',
      data: contact,
    })
  } catch (error) {
    console.error('Error creating contact message:', error)
    res.status(500).json({
      error: 'Failed to send message',
      message: error.message,
    })
  }
}

// Get all contact messages (Admin)
export async function getAllContacts(req, res) {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    })
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    res.status(500).json({
      error: 'Failed to fetch messages',
      message: error.message,
    })
  }
}

// Update a contact message's status, e.g. new -> read -> responded (Admin)
export async function updateContactStatus(req, res) {
  try {
    const { id } = req.params
    const { status } = req.body
    const validStatuses = ['new', 'read', 'responded']

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )

    if (!contact) {
      return res.status(404).json({ message: 'Message not found' })
    }

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: contact,
    })
  } catch (error) {
    console.error('Error updating contact status:', error)
    res.status(500).json({
      error: 'Failed to update status',
      message: error.message,
    })
  }
}

// Delete a contact message (Admin)
export async function deleteContact(req, res) {
  try {
    const { id } = req.params
    const contact = await Contact.findByIdAndDelete(id)

    if (!contact) {
      return res.status(404).json({ message: 'Message not found' })
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting contact message:', error)
    res.status(500).json({
      error: 'Failed to delete message',
      message: error.message,
    })
  }
}
