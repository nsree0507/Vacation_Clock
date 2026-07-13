import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vacation-clock-6oij.onrender.com'

const getAuthToken = () => localStorage.getItem('adminToken')

export const destinationApi = {
  getAll: (params) =>
    axios.get(`${API_BASE_URL}/api/destinations`, { params }),

  getStatsByState: () =>
    axios.get(`${API_BASE_URL}/api/destinations/stats-by-state`),

  getById: (id) =>
    axios.get(`${API_BASE_URL}/api/destinations/${id}`),

  create: (data) =>
    axios.post(`${API_BASE_URL}/api/destinations`, data, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  update: (id, data) =>
    axios.put(`${API_BASE_URL}/api/destinations/${id}`, data, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  delete: (id) =>
    axios.delete(`${API_BASE_URL}/api/destinations/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
}

export default destinationApi