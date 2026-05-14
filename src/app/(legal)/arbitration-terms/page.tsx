import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Arbitration Terms' }

export default function ArbitrationTermsPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Arbitration Terms</h1>
      <p className="text-slate-500 text-sm mb-8">
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
        <strong>Important Notice:</strong> These terms govern the dispute resolution process on The Arbitrator platform. By participating in any dispute, you agree to these terms. This is not a substitute for legal representation in formal legal proceedings.
      </div>

      {[
        {
          title: '1. Nature of the Process',
          paragraphs: [
            'The Arbitrator provides an AI-assisted dispute resolution service. The process is designed to be neutral, structured, and fair to all parties.',
            'Unless both parties explicitly agree in writing to treat the AI resolution as binding, all outputs from the Platform are advisory and non-binding in nature.',
            'The Platform does not constitute formal legal arbitration under any jurisdiction\'s arbitration laws unless specifically agreed to in writing by all parties.',
          ],
        },
        {
          title: '2. Good Faith Participation',
          paragraphs: [
            'All participants agree to engage in the process in good faith.',
            'Participants agree to provide truthful, accurate, and complete information.',
            'Participants agree not to submit fabricated evidence, false testimonies, or misleading information.',
            'Violation of good faith requirements may result in account suspension and may be reported to relevant authorities.',
          ],
        },
        {
          title: '3. Confidentiality',
          paragraphs: [
            'All dispute proceedings and communications on the Platform are confidential.',
            'Neither party shall disclose the other party\'s submissions, evidence, or the AI-generated outputs to third parties without consent.',
            'Exception: disclosure may be required by court order, legal obligation, or with the express consent of all parties.',
          ],
        },
        {
          title: '4. AI Neutrality',
          paragraphs: [
            'The AI system is designed to be neutral and objective. It processes information from both parties simultaneously and applies consistent standards.',
            'The AI removes emotional and accusatory language and focuses on factual elements of each submission.',
            'The AI system does not have relationships with any party and cannot be influenced by payments, relationships, or other external factors.',
            'Despite best efforts, AI systems may make errors. Participants acknowledge this limitation.',
          ],
        },
        {
          title: '5. Evidence',
          paragraphs: [
            'Participants may submit evidence including documents, photographs, screenshots, and other relevant materials.',
            'All evidence must be authentic and genuinely related to the dispute.',
            'Submitting fraudulent evidence is a violation of these terms and may have legal consequences.',
            'Evidence is shared with both parties as part of the process.',
          ],
        },
        {
          title: '6. Mediation Stage',
          paragraphs: [
            'Before a final resolution, the AI will propose mediation solutions designed to reach compromise.',
            'Participation in the mediation stage is encouraged but not mandatory.',
            'Rejection of mediation moves the case to the full AI arbitration resolution stage.',
          ],
        },
        {
          title: '7. AI Resolution',
          paragraphs: [
            'The AI resolution is a structured analysis of the dispute based on submitted information.',
            'The resolution includes: case summary, key arguments, responsibility analysis, legal considerations, suggested compensation (if applicable), and final recommendation.',
            'The resolution is advisory unless both parties separately agree in writing to treat it as binding.',
            'Parties are encouraged to consult a licensed attorney before acting on any resolution.',
          ],
        },
        {
          title: '8. Limitation of Platform Liability',
          paragraphs: [
            'The Platform makes no warranties regarding the accuracy, completeness, or fitness for purpose of any AI output.',
            'The Platform is not responsible for any decisions made by participants based on AI outputs.',
            'The Platform is not a party to the underlying dispute and has no financial interest in any outcome.',
          ],
        },
        {
          title: '9. Governing Language',
          paragraphs: [
            'These terms are provided in English. In case of conflict between translated versions, the English version prevails.',
            'The Platform supports Hebrew language. AI outputs may be generated in the language of the submissions.',
          ],
        },
        {
          title: '10. Agreement',
          paragraphs: [
            'By clicking "I Agree" or otherwise participating in a dispute on the Platform, you acknowledge that you have read, understood, and agree to these Arbitration Terms.',
          ],
        },
      ].map(({ title, paragraphs }) => (
        <div key={title} className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">{title}</h2>
          <div className="space-y-3">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-sm text-slate-600 leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      ))}
    </article>
  )
}
