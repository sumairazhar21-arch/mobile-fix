const express = require('express')
const store = require('../store')

const router = express.Router()

const ISSUE_CATEGORIES = [
  'screen',
  'battery',
  'charging',
  'water-damage',
  'software',
  'speaker',
  'camera',
  'other',
]

const STATUSES = [
  'pending',
  'confirmed',
  'on-the-way',
  'in-progress',
  'completed',
  'cancelled',
]

function validateCreate(body) {
  const errors = []
  if (!body.name?.trim()) errors.push('Name is required')
  if (!body.phone?.trim()) errors.push('Phone number is required')
  if (!body.address?.trim()) errors.push('Address is required')
  if (!body.deviceBrand?.trim()) errors.push('Device brand is required')
  if (!body.deviceModel?.trim()) errors.push('Device model is required')
  if (!body.issueCategory || !ISSUE_CATEGORIES.includes(body.issueCategory)) {
    errors.push('Valid issue category is required')
  }
  if (!body.issueDescription?.trim()) errors.push('Issue description is required')
  return errors
}

router.get('/categories', (_req, res) => {
  res.json(ISSUE_CATEGORIES)
})

router.get('/statuses', (_req, res) => {
  res.json(STATUSES)
})

router.get('/', (_req, res) => {
  res.json(store.getAll())
})

router.get('/track', (req, res) => {
  const { phone, id } = req.query

  if (id) {
    const request = store.getById(id)
    if (!request) return res.status(404).json({ error: 'Request not found' })
    return res.json([request])
  }

  if (phone) {
    const requests = store.getByPhone(phone)
    if (!requests.length) return res.status(404).json({ error: 'No requests found for this phone number' })
    return res.json(requests)
  }

  res.status(400).json({ error: 'Provide phone or id query parameter' })
})

router.get('/:id', (req, res) => {
  const request = store.getById(req.params.id)
  if (!request) return res.status(404).json({ error: 'Request not found' })
  res.json(request)
})

router.post('/', (req, res) => {
  const errors = validateCreate(req.body)
  if (errors.length) return res.status(400).json({ errors })

  const request = store.createRequest({
    name: req.body.name.trim(),
    phone: req.body.phone.trim(),
    email: req.body.email?.trim() || '',
    address: req.body.address.trim(),
    deviceBrand: req.body.deviceBrand.trim(),
    deviceModel: req.body.deviceModel.trim(),
    issueCategory: req.body.issueCategory,
    issueDescription: req.body.issueDescription.trim(),
    preferredDate: req.body.preferredDate || '',
    preferredTime: req.body.preferredTime || '',
  })

  res.status(201).json(request)
})

router.patch('/:id', (req, res) => {
  const { status, teamNote } = req.body
  const updates = {}

  if (status !== undefined) {
    if (!STATUSES.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }
    updates.status = status
  }

  if (teamNote !== undefined) {
    updates.teamNote = teamNote
  }

  if (!Object.keys(updates).length) {
    return res.status(400).json({ error: 'No valid fields to update' })
  }

  const request = store.updateRequest(req.params.id, updates)
  if (!request) return res.status(404).json({ error: 'Request not found' })
  res.json(request)
})

module.exports = router
