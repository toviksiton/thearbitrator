import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
      <p className="text-slate-500 text-sm mb-8">
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      {[
        {
          title: '1. Information We Collect',
          content: [
            'Account information: name, email address, profile photo',
            'Dispute content: case titles, descriptions, desired outcomes, uploaded evidence',
            'Usage data: pages visited, features used, timestamps',
            'Payment information: processed securely by Stripe — we never store card details',
            'Device and browser information for security and analytics purposes',
          ],
        },
        {
          title: '2. How We Use Your Information',
          content: [
            'To provide and improve the dispute resolution service',
            'To process AI analysis of dispute submissions',
            'To send notifications about your cases',
            'To process payments and manage subscriptions',
            'To prevent fraud and ensure platform security',
            'To comply with legal obligations',
          ],
        },
        {
          title: '3. Data Isolation and Security',
          content: [
            'Each dispute is isolated using Row Level Security (RLS) at the database level',
            'Only verified participants of a dispute can access its contents',
            'AI processing occurs on secure, encrypted infrastructure',
            'Evidence files are stored in access-controlled cloud storage',
            'All data is transmitted over HTTPS/TLS encryption',
            'We do not sell, rent, or share your personal information with third parties for marketing',
          ],
        },
        {
          title: '4. AI Processing',
          content: [
            'Dispute content is processed by OpenAI\'s API to generate AI outputs',
            'By using the Platform, you consent to your dispute content being sent to AI processing services',
            'OpenAI\'s data use policies apply to content processed through their API',
            'We do not use your dispute data to train AI models',
          ],
        },
        {
          title: '5. Third-Party Services',
          content: [
            'Supabase — database and authentication provider',
            'Stripe — payment processing',
            'OpenAI — AI language model provider',
            'Resend — transactional email delivery',
            'PostHog — product analytics (anonymized)',
            'Sentry — error monitoring (anonymized)',
          ],
        },
        {
          title: '6. Data Retention',
          content: [
            'Active account data is retained while your account exists',
            'Deleted accounts: personal data is removed within 30 days',
            'Dispute data may be retained in anonymized form for service improvement',
            'You may request deletion of your data at any time via Settings → Danger Zone',
          ],
        },
        {
          title: '7. Your Rights',
          content: [
            'Access: request a copy of your data via Settings → Export Data',
            'Correction: update your information via Settings → Profile',
            'Deletion: delete your account and all data via Settings → Danger Zone',
            'Portability: export your data in JSON format',
            'Object: opt out of analytics in your browser settings',
          ],
        },
        {
          title: '8. Cookies',
          content: [
            'Session cookies: required for authentication',
            'Analytics cookies: PostHog (can be disabled)',
            'No advertising or tracking cookies are used',
          ],
        },
        {
          title: '9. Children\'s Privacy',
          content: [
            'The Platform is not directed to individuals under 18 years of age',
            'We do not knowingly collect personal information from minors',
          ],
        },
        {
          title: '10. Contact',
          content: [
            'For privacy inquiries: privacy@thearbitrator.app',
            'We respond to privacy requests within 30 days',
          ],
        },
      ].map(({ title, content }) => (
        <div key={title} className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">{title}</h2>
          <ul className="space-y-2">
            {content.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </article>
  )
}
