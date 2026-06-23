require('dotenv').config()
const express = require('express')
const cors = require('cors')
const requestsRouter = require('./routes/requests')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'mobile-fix-api' })
})

app.use('/api/requests', requestsRouter)

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(PORT, () => {
  console.log(`MobileFix API running at http://localhost:${PORT}`)
})
