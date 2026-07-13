import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vacation-clock-6oij.onrender.com'

const getAuthToken = () => localStorage.getItem('adminToken')

export const bookingApi = {
  getAll: (params) =>
    axios.get(`${API_BASE_URL}/api/bookings`, {
      params,
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  getById: (id) =>
    axios.get(`${API_BASE_URL}/api/bookings/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  updateStatus: (id, bookingStatus) =>
    axios.put(
      `${API_BASE_URL}/api/bookings/${id}/status`,
      { bookingStatus },
      {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      }
    ),

  getMyBookings: ({ userId, identifier }) =>
    axios.get(`${API_BASE_URL}/api/bookings/my`, {
      params: { userId, identifier },
    }),

  cancelMyBooking: ({ id, userId, identifier }) =>
    axios.put(
      `${API_BASE_URL}/api/bookings/${id}/cancel`,
      { userId, identifier }
    ),
}

export default bookingApi