import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vacation-clock-6oij.onrender.com'

const getAuthToken = () => localStorage.getItem('adminToken')

export const contactApi = {
  getAll: () =>
    axios.get(`${API_BASE_URL}/api/contact`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  updateStatus: (id, status) =>
    axios.put(
      `${API_BASE_URL}/api/contact/${id}/status`,
      { status },
      {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      }
    ),

  delete: (id) =>
    axios.delete(`${API_BASE_URL}/api/contact/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
}

export default contactApi