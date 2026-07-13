import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const getAuthToken = () => localStorage.getItem('adminToken')

export const bookingApi = {
  getAll: (params) =>
    axios.get(`${API_BASE_URL}/bookings`, {
      params,
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  getById: (id) =>
    axios.get(`${API_BASE_URL}/bookings/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  updateStatus: (id, bookingStatus) =>
    axios.put(
      `${API_BASE_URL}/bookings/${id}/status`,
      { bookingStatus },
      {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      }
    ),

  // Public — fetches the signed-in visitor's own trips, matched strictly
  // by their account id (falls back to identifier for older sessions)
  getMyBookings: ({ userId, identifier }) =>
    axios.get(`${API_BASE_URL}/bookings/my`, {
      params: { userId, identifier },
    }),

  // Public — lets the signed-in visitor cancel their own upcoming trip.
  // Ownership is verified server-side against userId/identifier.
  cancelMyBooking: ({ id, userId, identifier }) =>
    axios.put(`${API_BASE_URL}/bookings/${id}/cancel`, { userId, identifier }),
}

export default bookingApi