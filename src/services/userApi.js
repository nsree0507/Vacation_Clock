import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const getAuthToken = () => localStorage.getItem('adminToken')

export const userApi = {
  getAll: (params) =>
    axios.get(`${API_BASE_URL}/users`, {
      params,
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  getById: (id) =>
    axios.get(`${API_BASE_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  blockUser: (id) =>
    axios.put(
      `${API_BASE_URL}/users/${id}/block`,
      {},
      {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      }
    ),

  deleteUser: (id) =>
    axios.delete(`${API_BASE_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
}

export default userApi
