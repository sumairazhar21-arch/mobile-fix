import { Link } from 'react-router-dom'

const steps = [
  {
    title: 'Tell us the problem',
    desc: 'Describe your phone fault, brand, model, and your address.',
  },
  {
    title: 'We confirm & schedule',
    desc: 'Our team reviews your request and confirms a visit time.',
  },
  {
    title: 'Technician at your door',
    desc: 'A certified technician comes to your home and fixes the issue.',
  },
]

const issues = [
  'Cracked screen',
  'Battery draining fast',
  'Won\'t charge',
  'Water damage',
  'Software issues',
  'Speaker / mic problems',
  'Camera not working',
]

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-100">
              Doorstep mobile repair
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Phone broken? We come to you.
            </h1>
            <p className="mt-4 text-lg text-brand-50">
              Report your mobile fault online and our team will visit your doorstep to diagnose
              and repair it — no shop visit needed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50"
              >
                Book a repair
              </Link>
              <Link
                to="/track"
                className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Track my request
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-slate-900">How it works</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-lg font-bold text-brand-700">
                {i + 1}
              </div>
              <h3 className="font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-2xl font-bold text-slate-900">Issues we fix</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {issues.map((issue) => (
              <span
                key={issue}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
              >
                {issue}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Ready to get your phone fixed?</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Fill out a quick form with your issue and address. You&apos;ll get a tracking ID to
          follow your repair status.
        </p>
        <Link
          to="/book"
          className="mt-6 inline-block rounded-xl bg-brand-600 px-8 py-3 font-semibold text-white shadow transition hover:bg-brand-700"
        >
          Report an issue now
        </Link>
      </section>
    </div>
  )
}
