export const ISSUE_LABELS = {
  screen: 'Screen / Display',
  battery: 'Battery',
  charging: 'Charging Port',
  'water-damage': 'Water Damage',
  software: 'Software / OS',
  speaker: 'Speaker / Mic',
  camera: 'Camera',
  other: 'Other',
}

export const STATUS_LABELS = {
  pending: 'Pending Review',
  confirmed: 'Confirmed',
  'on-the-way': 'Technician On The Way',
  'in-progress': 'Repair In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export const STATUS_COLORS = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-blue-100 text-blue-800',
  'on-the-way': 'bg-indigo-100 text-indigo-800',
  'in-progress': 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
