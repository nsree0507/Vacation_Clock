import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const getAuthToken = () => localStorage.getItem('adminToken')

export const adminApi = {
  login: (email, password) =>
    axios.post(`${API_BASE_URL}/admin/login`, { email, password }),

  getDashboard: (token) =>
    axios.get(`${API_BASE_URL}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Manage Admins - Super Admin only
  getAllAdmins: () =>
    axios.get(`${API_BASE_URL}/admin/admins`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  createAdmin: (data) =>
    axios.post(`${API_BASE_URL}/admin/admins`, data, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  updateAdmin: (id, data) =>
    axios.put(`${API_BASE_URL}/admin/admins/${id}`, data, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),

  deleteAdmin: (id) =>
    axios.delete(`${API_BASE_URL}/admin/admins/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }),
}

export default adminApi