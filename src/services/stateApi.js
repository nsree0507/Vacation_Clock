import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://vacation-clock-6oij.onrender.com/api'

const getAuthToken = () => localStorage.getItem('adminToken')

export const stateApi = {
  getAll: () =>
    axios.get(`${API_BASE_URL}/states`),

  getById: (id) =>
    axios.get(`${API_BASE_URL}/states/${id}`),

  create: (data) =>
    axios.post(`${API_BASE_URL}/states`, data, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  update: (id, data) =>
    axios.put(`${API_BASE_URL}/states/${id}`, data, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  delete: (id) =>
    axios.delete(`${API_BASE_URL}/states/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
}

export default stateApi
