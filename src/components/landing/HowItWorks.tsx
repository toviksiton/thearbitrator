import { FileText, UserPlus, Scale, CheckCircle } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Submit Your Case',
    description:
      'Describe the dispute in your own words, upload supporting evidence, and state your desired outcome.',
  },
  {
    number: '02',
    icon: UserPlus,
    title: 'Invite the Other Party',
    description:
      'We send a secure invitation. The other party presents their perspective independently.',
  },
  {
    number: '03',
    icon: Scale,
    title: 'AI Mediates',
    description:
      'Our AI neutralizes emotional language, classifies the dispute, and proposes fair compromise solutions.',
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Resolution Delivered',
    description:
      'Receive a structured, objective resolution with reasoning, legal considerations, and a PDF summary.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-full text-slate-600 text-sm font-medium mb-4">
            Simple Process
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            From dispute to resolution
            <br />
            in four steps.
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Our structured process ensures every voice is heard and every
            decision is fair.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-arbitrator-200 to-transparent" />

          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center group">
              {/* Step number */}
              <div className="relative inline-flex mb-6">
                <div className="w-14 h-14 bg-white border-2 border-arbitrator-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:border-arbitrator-300 group-hover:shadow-md transition-all duration-200">
                  <step.icon className="w-6 h-6 text-arbitrator-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-arbitrator-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
