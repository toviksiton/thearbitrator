import { Shield, Lock, Scale, Users } from 'lucide-react'

const trustPoints = [
  {
    icon: Scale,
    title: 'Impartial by Design',
    description: 'No human arbitrator can be bribed, biased, or influenced. The AI applies the same standard to every case.',
  },
  {
    icon: Shield,
    title: 'No Court, No Lawyers',
    description: 'Skip the expensive legal process. Get a fair resolution at a fraction of the cost and time.',
  },
  {
    icon: Lock,
    title: 'Your Data Stays Yours',
    description: 'We never share your case details. Strict access controls ensure only you and the other party can see the dispute.',
  },
  {
    icon: Users,
    title: 'Both Sides Heard',
    description: 'Every participant gets a full, uninterrupted opportunity to present their case and evidence.',
  },
]

export function TrustSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-arbitrator-900 to-arbitrator-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-arbitrator-700/30 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-white/80 text-sm font-medium mb-4">
            Our Commitment
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Built on fairness.
            <br />
            Designed for trust.
          </h2>
          <p className="text-lg text-arbitrator-200 max-w-xl mx-auto">
            Every design decision was made to reduce conflict, not amplify it.
          </p>
        </div>

        {/* Trust points */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="flex gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <point.icon className="w-5 h-5 text-arbitrator-300" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{point.title}</h3>
                <p className="text-sm text-arbitrator-200 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-arbitrator-200 mb-6 text-lg">
            Ready to resolve your dispute fairly?
          </p>
          <a
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-arbitrator-800 rounded-xl font-semibold hover:bg-arbitrator-50 transition-colors text-base shadow-lg"
          >
            Start a Case — It&apos;s Free
            <span className="text-arbitrator-400">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
