import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vacation-clock-6oij.onrender.com'

const getAuthToken = () => localStorage.getItem('adminToken')

export const adminApi = {
  login: (email, password) =>
    axios.post(`${API_BASE_URL}/api/admin/login`, { email, password }),

  getDashboard: (token) =>
    axios.get(`${API_BASE_URL}/api/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Manage Admins - Super Admin only
  getAllAdmins: () =>
    axios.get(`${API_BASE_URL}/api/admin/admins`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  createAdmin: (data) =>
    axios.post(`${API_BASE_URL}/api/admin/admins`, data, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  updateAdmin: (id, data) =>
    axios.put(`${API_BASE_URL}/api/admin/admins/${id}`, data, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  deleteAdmin: (id) =>
    axios.delete(`${API_BASE_URL}/api/admin/admins/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
}

export default adminApi