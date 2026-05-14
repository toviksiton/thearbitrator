import {
  Sparkles,
  ShieldCheck,
  FileText,
  Zap,
  Languages,
  Lock,
} from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI Neutralization',
    description:
      'Emotional and accusatory language is automatically removed. The AI presents both sides objectively.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: ShieldCheck,
    title: 'Structured Fairness',
    description:
      'Both parties present independently. No side can influence or see the other\'s submission until the AI processes everything.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Zap,
    title: 'AI Mediation First',
    description:
      'Before a verdict, our AI proposes compromise solutions — partial refunds, shared responsibilities, future agreements.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: FileText,
    title: 'PDF Resolution',
    description:
      'Download a professionally formatted PDF with the full case summary, arguments, and resolution.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Languages,
    title: 'Hebrew & English',
    description:
      'Full RTL support for Hebrew. The platform adapts seamlessly to your preferred language.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Lock,
    title: 'Completely Private',
    description:
      'Every dispute is end-to-end private. Only invited participants can see any case details.',
    color: 'bg-slate-100 text-slate-600',
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full text-slate-600 text-sm font-medium mb-4">
            Built Different
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Everything you need for
            <br />a fair resolution.
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Professional tools usually reserved for expensive arbitration firms —
            now accessible to everyone.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <div
                className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}
              >
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
