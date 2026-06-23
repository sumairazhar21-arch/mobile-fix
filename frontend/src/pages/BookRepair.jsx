import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createRequest } from '../api/client'
import { ISSUE_LABELS } from '../utils/labels'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  address: '',
  deviceBrand: '',
  deviceModel: '',
  issueCategory: 'screen',
  issueDescription: '',
  preferredDate: '',
  preferredTime: '',
}

export default function BookRepair() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState(null)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErrors([])
    setSuccess(null)

    try {
      const request = await createRequest(form)
      setSuccess(request)
      setForm(initialForm)
    } catch (err) {
      const apiErrors = err.response?.data?.errors
      setErrors(apiErrors || [err.response?.data?.error || 'Something went wrong. Is the server running?'])
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-8">
          <div className="text-4xl">✓</div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Request submitted!</h1>
          <p className="mt-2 text-slate-600">
            Our team will review your issue and contact you shortly.
          </p>
          <p className="mt-6 text-sm text-slate-500">Your tracking ID</p>
          <p className="mt-1 font-mono text-2xl font-bold text-brand-700">{success.id}</p>
          <p className="mt-4 text-sm text-slate-600">
            Save this ID or use your phone number to track status.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/track"
              className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Track request
            </Link>
            <button
              type="button"
              onClick={() => setSuccess(null)}
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Book another
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Book a doorstep repair</h1>
        <p className="mt-2 text-slate-600">
          Tell us about your phone issue and where to visit. All fields marked * are required.
        </p>
      </div>

      {errors.length > 0 && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <ul className="list-inside list-disc space-y-1">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <fieldset className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <legend className="px-2 text-sm font-semibold text-slate-900">Your details</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-slate-700">Full name *</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                placeholder="Rahul Sharma"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Phone *</span>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                placeholder="9876543210"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email (optional)</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                placeholder="you@email.com"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-slate-700">Full address *</span>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                rows={3}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                placeholder="House no, street, area, city, pincode"
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <legend className="px-2 text-sm font-semibold text-slate-900">Device & issue</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Brand *</span>
              <input
                name="deviceBrand"
                value={form.deviceBrand}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                placeholder="Samsung, Apple, Xiaomi..."
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Model *</span>
              <input
                name="deviceModel"
                value={form.deviceModel}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                placeholder="Galaxy S23, iPhone 14..."
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-slate-700">Issue type *</span>
              <select
                name="issueCategory"
                value={form.issueCategory}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              >
                {Object.entries(ISSUE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-slate-700">Describe the problem *</span>
              <textarea
                name="issueDescription"
                value={form.issueDescription}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                placeholder="e.g. Screen cracked after drop, touch not working on left side..."
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <legend className="px-2 text-sm font-semibold text-slate-900">Preferred visit (optional)</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Date</span>
              <input
                name="preferredDate"
                type="date"
                value={form.preferredDate}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Time slot</span>
              <select
                name="preferredTime"
                value={form.preferredTime}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              >
                <option value="">Any time</option>
                <option value="morning">Morning (9 AM – 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM – 4 PM)</option>
                <option value="evening">Evening (4 PM – 8 PM)</option>
              </select>
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-600 py-3.5 font-semibold text-white shadow transition hover:bg-brand-700 disabled:opacity-60"
        >
          {loading ? 'Submitting...' : 'Submit repair request'}
        </button>
      </form>
    </div>
  )
}
