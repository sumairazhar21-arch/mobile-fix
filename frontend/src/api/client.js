import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

export async function createRequest(data) {
  const { data: result } = await api.post('/requests', data)
  return result
}

export async function trackByPhone(phone) {
  const { data } = await api.get('/requests/track', { params: { phone } })
  return data
}

export async function trackById(id) {
  const { data } = await api.get('/requests/track', { params: { id } })
  return data
}

export async function getAllRequests() {
  const { data } = await api.get('/requests')
  return data
}

export async function updateRequest(id, updates) {
  const { data } = await api.patch(`/requests/${id}`, updates)
  return data
}

export async function checkHealth() {
  const { data } = await api.get('/health')
  return data
}
