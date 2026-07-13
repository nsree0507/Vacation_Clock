import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const getAuthToken = () => localStorage.getItem('adminToken')

export const itineraryApi = {
  getAll: () =>
    axios.get(`${API_BASE_URL}/itineraries`),

  getById: (id) =>
    axios.get(`${API_BASE_URL}/itineraries/${id}`),

  create: (data) =>
    axios.post(`${API_BASE_URL}/itineraries`, data, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  update: (id, data) =>
    axios.put(`${API_BASE_URL}/itineraries/${id}`, data, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  delete: (id) =>
    axios.delete(`${API_BASE_URL}/itineraries/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
}

export default itineraryApi
