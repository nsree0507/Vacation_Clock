import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vacation-clock-6oij.onrender.com'

const getAuthToken = () => localStorage.getItem('adminToken')

export const userApi = {
  getAll: (params) =>
    axios.get(`${API_BASE_URL}/api/users`, {
      params,
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  getById: (id) =>
    axios.get(`${API_BASE_URL}/api/users/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  blockUser: (id) =>
    axios.put(
      `${API_BASE_URL}/api/users/${id}/block`,
      {},
      {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      }
    ),

  deleteUser: (id) =>
    axios.delete(`${API_BASE_URL}/api/users/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
}

export default userApi