import { useState } from 'react'
import { trackByPhone, trackById } from '../api/client'
import { ISSUE_LABELS, STATUS_LABELS, STATUS_COLORS, formatDate } from '../utils/labels'

function RequestCard({ request }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-lg font-bold text-brand-700">{request.id}</p>
          <p className="mt-1 text-sm text-slate-500">Submitted {formatDate(request.createdAt)}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[request.status]}`}>
          {STATUS_LABELS[request.status]}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <p className="text-slate-500">Device</p>
          <p className="font-medium text-slate-900">
            {request.deviceBrand} {request.deviceModel}
          </p>
        </div>
        <div>
          <p className="text-slate-500">Issue</p>
          <p className="font-medium text-slate-900">{ISSUE_LABELS[request.issueCategory]}</p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-slate-500">Description</p>
          <p className="text-slate-900">{request.issueDescription}</p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-slate-500">Visit address</p>
          <p className="text-slate-900">{request.address}</p>
        </div>
        {request.teamNote && (
          <div className="sm:col-span-2 rounded-lg bg-brand-50 p-3">
            <p className="text-xs font-semibold uppercase text-brand-700">Team note</p>
            <p className="mt-1 text-sm text-slate-800">{request.teamNote}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function TrackRepair() {
  const [mode, setMode] = useState('phone')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState([])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResults([])

    try {
      const data = mode === 'phone' ? await trackByPhone(query) : await trackById(query)
      setResults(data)
    } catch (err) {
      setError(err.response?.data?.error || 'Could not find your request. Check your details and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Track your repair</h1>
        <p className="mt-2 text-slate-600">
          Enter your phone number or tracking ID to see the status of your request.
        </p>
      </div>

      <div className="mb-6 flex gap-2 rounded-xl bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setMode('phone')}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
            mode === 'phone' ? 'bg-white text-slate-900 shadow' : 'text-slate-600'
          }`}
        >
          By phone
        </button>
        <button
          type="button"
          onClick={() => setMode('id')}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
            mode === 'id' ? 'bg-white text-slate-900 shadow' : 'text-slate-600'
          }`}
        >
          By tracking ID
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
          placeholder={mode === 'phone' ? 'Your phone number' : 'e.g. MF-A1B2C3'}
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {loading ? '...' : 'Track'}
        </button>
      </form>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-8 space-y-4">
          {results.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  )
}
