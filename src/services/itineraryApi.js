import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vacation-clock-6oij.onrender.com'

const getAuthToken = () => localStorage.getItem('adminToken')

export const itineraryApi = {
  getAll: () =>
    axios.get(`${API_BASE_URL}/api/itineraries`),

  getById: (id) =>
    axios.get(`${API_BASE_URL}/api/itineraries/${id}`),

  create: (data) =>
    axios.post(`${API_BASE_URL}/api/itineraries`, data, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  update: (id, data) =>
    axios.put(`${API_BASE_URL}/api/itineraries/${id}`, data, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  delete: (id) =>
    axios.delete(`${API_BASE_URL}/api/itineraries/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
}

export default itineraryApi