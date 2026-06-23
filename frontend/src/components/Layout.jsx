import { Link, NavLink, Outlet } from 'react-router-dom'

function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-600 text-white'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white">
            M
          </span>
          <div className="text-left leading-tight">
            <div className="font-bold text-slate-900">MobileFix</div>
            <div className="text-xs text-slate-500">Doorstep repair</div>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/book" className={linkClass}>
            Book Repair
          </NavLink>
          <NavLink to="/track" className={linkClass}>
            Track
          </NavLink>
          <NavLink to="/admin" className={linkClass}>
            Team
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-500">
        <p className="font-medium text-slate-700">MobileFix — We come to you</p>
        <p className="mt-1">Report your phone issue online. Our team visits your doorstep to fix it.</p>
      </div>
    </footer>
  )
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
