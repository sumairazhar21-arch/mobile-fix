const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const DATA_DIR = path.join(__dirname, 'data')
const DATA_FILE = path.join(DATA_DIR, 'requests.json')

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf8')
  }
}

function readAll() {
  ensureDataFile()
  const raw = fs.readFileSync(DATA_FILE, 'utf8')
  return JSON.parse(raw)
}

function writeAll(requests) {
  ensureDataFile()
  fs.writeFileSync(DATA_FILE, JSON.stringify(requests, null, 2), 'utf8')
}

function generateId() {
  const code = crypto.randomBytes(3).toString('hex').toUpperCase()
  return `MF-${code}`
}

function createRequest(data) {
  const requests = readAll()
  const request = {
    id: generateId(),
    ...data,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  requests.unshift(request)
  writeAll(requests)
  return request
}

function getById(id) {
  return readAll().find((r) => r.id === id.toUpperCase()) || null
}

function getByPhone(phone) {
  const normalized = phone.replace(/\D/g, '')
  return readAll().filter((r) => r.phone.replace(/\D/g, '') === normalized)
}

function getAll() {
  return readAll()
}

function updateRequest(id, updates) {
  const requests = readAll()
  const index = requests.findIndex((r) => r.id === id.toUpperCase())
  if (index === -1) return null

  requests[index] = {
    ...requests[index],
    ...updates,
    id: requests[index].id,
    updatedAt: new Date().toISOString(),
  }
  writeAll(requests)
  return requests[index]
}

module.exports = {
  createRequest,
  getById,
  getByPhone,
  getAll,
  updateRequest,
}
