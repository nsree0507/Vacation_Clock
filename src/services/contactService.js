import api from './api'

export function sendContactForm(data) {
  return api.post('/contact', data)
}
