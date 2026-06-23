import { useEffect, useState } from 'react'
import { getAllRequests, updateRequest } from '../api/client'
import { ISSUE_LABELS, STATUS_LABELS, STATUS_COLORS, formatDate } from '../utils/labels'

const ALL_STATUSES = Object.keys(STATUS_LABELS)

export default function Admin() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [updatingId, setUpdatingId] = useState(null)

  async function loadRequests() {
    setLoading(true)
    setError('')
    try {
      const data = await getAllRequests()
      setRequests(data)
    } catch {
      setError('Could not load requests. Make sure the backend server is running on port 5000.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRequests()
  }, [])

  async function handleStatusChange(id, status) {
    setUpdatingId(id)
    try {
      const updated = await updateRequest(id, { status })
      setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)))
    } catch {
      alert('Failed to update status')
    } finally {
      setUpdatingId(null)
    }
  }

  async function handleNoteSave(id, teamNote) {
    setUpdatingId(id)
    try {
      const updated = await updateRequest(id, { teamNote })
      setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)))
    } catch {
      alert('Failed to save note')
    } finally {
      setUpdatingId(null)
    }
  }

  const filtered =
    filter === 'all' ? requests : requests.filter((r) => r.status === filter)

  const counts = ALL_STATUSES.reduce((acc, s) => {
    acc[s] = requests.filter((r) => r.status === s).length
    return acc
  }, {})

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Team dashboard</h1>
          <p className="mt-1 text-slate-600">
            View incoming repair requests and update their status.
          </p>
        </div>
        <button
          type="button"
          onClick={loadRequests}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            filter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
          }`}
        >
          All ({requests.length})
        </button>
        {ALL_STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              filter === status ? 'bg-slate-900 text-white' : STATUS_COLORS[status]
            }`}
          >
            {STATUS_LABELS[status]} ({counts[status] || 0})
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-slate-500">Loading requests...</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-500">No repair requests yet.</p>
          <p className="mt-1 text-sm text-slate-400">
            Requests submitted from the Book Repair page will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((request) => (
            <RequestRow
              key={request.id}
              request={request}
              updating={updatingId === request.id}
              onStatusChange={handleStatusChange}
              onNoteSave={handleNoteSave}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function RequestRow({ request, updating, onStatusChange, onNoteSave }) {
  const [note, setNote] = useState(request.teamNote || '')
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full flex-wrap items-center justify-between gap-3 p-5 text-left"
      >
        <div>
          <span className="font-mono font-bold text-brand-700">{request.id}</span>
          <span className="mx-2 text-slate-300">·</span>
          <span className="font-medium text-slate-900">{request.name}</span>
          <span className="mx-2 text-slate-300">·</span>
          <span className="text-sm text-slate-500">{request.phone}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[request.status]}`}>
            {STATUS_LABELS[request.status]}
          </span>
          <span className="text-slate-400">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-100 p-5">
          <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-slate-500">Device</p>
              <p className="font-medium">{request.deviceBrand} {request.deviceModel}</p>
            </div>
            <div>
              <p className="text-slate-500">Issue</p>
              <p className="font-medium">{ISSUE_LABELS[request.issueCategory]}</p>
            </div>
            <div>
              <p className="text-slate-500">Submitted</p>
              <p className="font-medium">{formatDate(request.createdAt)}</p>
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <p className="text-slate-500">Description</p>
              <p>{request.issueDescription}</p>
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <p className="text-slate-500">Address</p>
              <p>{request.address}</p>
            </div>
            {(request.preferredDate || request.preferredTime) && (
              <div>
                <p className="text-slate-500">Preferred visit</p>
                <p>
                  {request.preferredDate || 'Any date'}
                  {request.preferredTime ? ` · ${request.preferredTime}` : ''}
                </p>
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-end gap-3">
            <label className="block">
              <span className="text-xs font-semibold text-slate-500">Update status</span>
              <select
                value={request.status}
                disabled={updating}
                onChange={(e) => onStatusChange(request.id, e.target.value)}
                className="mt-1 block rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4">
            <label className="block">
              <span className="text-xs font-semibold text-slate-500">Team note (visible to customer)</span>
              <div className="mt-1 flex gap-2">
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Technician assigned, arriving at 3 PM"
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  disabled={updating}
                  onClick={() => onNoteSave(request.id, note)}
                  className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
                >
                  Save
                </button>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
