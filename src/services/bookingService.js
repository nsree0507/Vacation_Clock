import api from './api'

function getSignedInUserId() {
  try {
    const stored = localStorage.getItem('vacationClockUser')
    const user = stored ? JSON.parse(stored) : null
    return user?.id || null
  } catch (_) {
    return null
  }
}

export async function submitBooking(data) {
  try {
    const response = await api.post('/bookings', {
      userId: getSignedInUserId(),
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      destinationName: data.package || data.destination,
      packageName: data.packageType || 'Standard Package',
      travelDate: data.startDate,
      travelers: parseInt(data.travelers),
      totalAmount: data.totalAmount || null,
      paymentMethod: data.paymentMethod || null,
    })

    if (response.data && response.data.booking) {
      return {
        bookingId: response.data.booking.bookingId,
        success: true,
        data: response.data.booking,
      }
    }
    return response.data
  } catch (error) {
    console.error("Booking API Error:", error)
    console.error("Status:", error.response?.status)
    console.error("Response:", error.response?.data)

    throw error
  }
}