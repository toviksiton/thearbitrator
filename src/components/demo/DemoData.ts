import type { DebateResult, AIResolution } from '@/types'

export const DEMO_DISPUTE = {
  id: 'demo-case-2024',
  initiator_title: 'He stole my code and never paid me!!!',
  respondent_title: 'Work was incomplete and unusable',
  neutral_title: 'Freelance Software Project Delivery and Payment Dispute',
  category: 'contract',
  status: 'resolved' as const,
  created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  initiator_description:
    'I spent 6 weeks building a full-stack web application for this client. We had a written agreement for $8,500. I delivered the complete project on time, including a staging server and full documentation. The client deployed my code to production and has been using it for 3 months. Now they refuse to pay the final $5,000 milestone, claiming the work was "incomplete" — despite having used it commercially the entire time.',
  initiator_desired_outcome:
    'Full payment of the outstanding $5,000 as per our signed contract.',
  initiator_compensation: 5000,
  respondent_email: 'client@example.com',
  respondent_title: 'Work was incomplete and unusable',
  respondent_description:
    'The developer delivered a project that was missing 3 features we specifically agreed on: push notifications, CSV export, and a mobile-responsive admin panel. These were listed in our Scope of Work document. We paid $3,500 upfront in good faith. What was delivered barely worked — we had to hire another developer at a cost of $2,200 to fix critical bugs before it was even usable. We should not be expected to pay for unfinished, broken work.',
  respondent_desired_outcome:
    'Refund of $1,500 from the initial payment to cover the cost of bug-fixing the unusable code.',
  respondent_compensation: 1500,
  mediation_response: 'rejected' as const,
  invite_token: null,
  invite_accepted_at: null,
  created_by: 'demo-user',
  updated_at: new Date().toISOString(),
}

export const DEMO_DEBATE: DebateResult = {
  research: {
    key_claims_a: [
      'Signed written contract for $8,500 with milestone structure',
      'Project delivered on schedule with staging server and documentation',
      'Client deployed to production and used commercially for 3 months',
      'Non-payment despite commercial use constitutes unjust enrichment',
    ],
    key_claims_b: [
      'Three features in Scope of Work were not delivered (push notifications, CSV export, mobile admin)',
      '$2,200 spent on third-party bug-fixing before the app was usable',
      'Initial $3,500 paid in good faith',
      'Work product did not meet the agreed contractual specification',
    ],
    verifiable_facts: [
      'A written contract exists — both parties reference it, suggesting it is real',
      'An initial payment of $3,500 was made and acknowledged',
      'The application was deployed to production by the client',
      'A 3-month gap between delivery and dispute filing occurred',
    ],
    contradictions: [
      "Client claims the app was 'unusable' yet deployed it to production — these are mutually inconsistent",
      'No communication of defects was mentioned at delivery time — 3-month silence undermines the rejection',
      'Client seeks $1,500 refund but claims $2,200 in remediation — the numbers are inconsistent with their own loss argument',
    ],
    domain_context:
      'Under standard freelance contract law (and the UN CISG for international contracts), a buyer who accepts and uses goods/services is generally deemed to have accepted them. Partial non-performance requires the non-performing party to itemize and quantify the shortfall. The doctrine of "substantial performance" typically entitles a contractor to payment minus damages for incomplete items, not full non-payment.',
  },
  rounds: [
    {
      round: 1,
      topic: 'Factual Accuracy',
      agent_a_argument:
        'The facts strongly support Party A. A written contract existed, a staging server was delivered, documentation was provided, and — critically — the client deployed the application to production and operated it commercially for three months. These are objective, demonstrable facts. A client cannot simultaneously claim the work was unusable and commercially deploy it. The factual record shows delivery occurred; the dispute is about scope, not delivery.',
      agent_b_argument:
        'Party B\'s factual position is supported by the Scope of Work document listing three specific undelivered features. The $2,200 third-party remediation cost is a documented financial loss. The fact that the app was "deployed" does not mean it met contractual specifications — businesses often launch imperfect products under pressure. The three missing features (push notifications, CSV export, mobile admin) are specific, enumerable, and allegedly documented in writing.',
      winner: 'A',
      judge_reasoning:
        "Party A wins this round. The most damaging factual contradiction belongs to Party B: three months of commercial use is fundamentally incompatible with the claim that the product was 'unusable'. In contract law, use-acceptance is a recognized concept. Party B would have needed to raise defects promptly upon delivery, not after a quarter of commercial operation.",
    },
    {
      round: 2,
      topic: 'Fairness & Equity',
      agent_a_argument:
        'Party A invested six weeks of skilled labor and delivered a working system. The client has received $8,500 worth of value — evidenced by three months of commercial operation — while paying only $3,500. Allowing the client to retain the benefit of the work without paying is fundamentally inequitable. Equity demands that labor is compensated, especially when the work product has been actively exploited.',
      agent_b_argument:
        "Equity also demands that a contractor deliver what was promised. Party B paid $3,500 upfront as a sign of good faith. If three agreed features were missing, Party B is entitled to either their delivery or a price reduction. It is not equitable to pay full price for partial work. Furthermore, Party B had to spend additional money to make the product functional — it would be inequitable to reward a contractor who delivered an incomplete product with full payment.",
      winner: 'A',
      judge_reasoning:
        'Party A wins on equity. The principle of unjust enrichment is decisive here: Party B has commercially exploited a system they received, generating revenue for three months, while withholding payment. A fair resolution acknowledges both the partial non-performance (which reduces payment) and the exploitation of the delivered work (which mandates payment). Complete non-payment is the least equitable outcome for either party.',
    },
    {
      round: 3,
      topic: 'Precedent & Standards',
      agent_a_argument:
        "Under the doctrine of substantial performance — recognized across common law jurisdictions — a contractor who substantially completes a project is entitled to the contract price less damages for the incomplete portion. The incomplete features (push notifications, CSV export, mobile admin) are specific line items that can be individually priced. Standard practice is to pay for what was delivered and negotiate or litigate the delta — not withhold the entire balance.",
      agent_b_argument:
        'Precedent in freelance contract disputes holds that a Scope of Work document is binding. If the SOW listed three features and they were not delivered, the contractor has not fulfilled their contractual obligation. Industry standards for software delivery include acceptance testing — if acceptance was not formally granted, payment can be withheld. The client\'s delay in raising issues may be partly explained by attempting to resolve internally before escalating.',
      winner: 'A',
      judge_reasoning:
        'Party A wins on precedent. The substantial performance doctrine is well-established and squarely applies. Courts and arbitration panels consistently award payment for substantially complete work minus itemized shortfall, rather than permitting complete non-payment. The three-month acceptance-by-use period further strengthens the precedent basis for Party A.',
    },
    {
      round: 4,
      topic: 'Evidence & Proof',
      agent_a_argument:
        "Party A's evidential position is strong: a written contract, a delivered staging server (demonstrable), documentation (tangible), and three months of production use (verifiable via server logs, if needed). The burden of proof for non-payment falls on the party withholding — Party B must prove the shortfall, not Party A. Party B has not provided the Scope of Work document, screenshots of missing features, or independent technical verification of the alleged bugs.",
      agent_b_argument:
        'Party B references a Scope of Work document that lists the missing features specifically. The $2,200 invoice from the remediation developer constitutes documentary evidence of defects. The specificity of the three missing features (push notifications, CSV export, mobile admin) is itself evidence — these are not vague complaints but named, enumerable items. The contractor bears the burden of proving complete delivery.',
      winner: 'B',
      judge_reasoning:
        "Party B wins this round on evidence. Both parties reference written documents (contract, SOW) but neither has submitted them directly. However, Party B's claim is more specific and verifiable: three named features and a $2,200 remediation invoice. The specificity lends credibility. Party A's evidence of delivery (staging server, documentation) does not necessarily prove the SOW features were included. This round is the closest, but specificity favors Party B.",
    },
    {
      round: 5,
      topic: 'Good Faith & Reasonableness',
      agent_a_argument:
        "Party A demonstrated good faith: delivered on time, provided a staging environment, wrote documentation, and waited. Three months of silence from the client before refusing payment is not good faith — it is strategic delay. A client acting in good faith would raise defects immediately, provide written notice of non-conformance, allow the contractor to remedy, and withhold only the proportional amount. Party B's conduct — use without payment, no notice period, seeking a refund rather than remedy — does not represent reasonable commercial behavior.",
      agent_b_argument:
        'Party B paid $3,500 upfront, which demonstrates initial good faith. The three-month period may have been spent attempting internal resolution, testing, or negotiating directly before escalating to arbitration. Seeking $1,500 in refund — less than the remediation cost of $2,200 — shows restraint and reasonableness. Party B is not seeking to recover all costs, only a partial adjustment.',
      winner: 'A',
      judge_reasoning:
        "Party A wins on good faith. The three-month delay in raising defects, combined with commercial use, is inconsistent with good faith rejection. Good faith non-acceptance requires timely notice. The fact that Party B seeks $1,500 while claiming $2,200 in losses is arithmetically inconsistent and undermines their reasonableness argument. Party A's conduct — deliver, document, wait — is the standard of professional good faith.",
    },
  ],
  score_a: 4,
  score_b: 1,
  verdict: 'A_wins',
  verdict_reasoning:
    'Party A won 4 out of 5 debate rounds, meeting the 4/5 threshold for a clear verdict. The decisive factors were the three-month commercial use of the delivered product (negating the "unusable" claim), the substantial performance doctrine, and Party B\'s failure to provide timely notice of defects. While Party B\'s evidence round win validates that some scope items may indeed have been missing, this does not justify full non-payment.',
  resolution_guidance:
    'Party A is entitled to substantial payment. The outstanding $5,000 should be partially awarded, reduced by a reasonable estimate for the three undelivered features. Based on industry rates and the proportional value of push notifications, CSV export, and mobile admin relative to the full project, a deduction of $800–$1,200 is appropriate. Recommended resolution: Party B pays Party A $3,800–$4,200, representing the balance due minus a reasonable non-delivery adjustment. Party B\'s claim for refund is denied given commercial acceptance.',
}

export const DEMO_RESOLUTION: AIResolution = {
  summary:
    'This dispute concerns non-payment of a $5,000 milestone in a freelance software development contract valued at $8,500. The contractor delivered a working application that was deployed to production by the client for three months. The client alleges three features were missing and seeks to withhold the final payment plus obtain a partial refund.',
  key_arguments: {
    initiator: [
      'Written contract executed for $8,500 with clear milestone structure',
      'Application delivered on time with staging server and documentation',
      'Client commercially deployed and operated the system for 3 months — constituting acceptance',
      'Non-payment after commercial use constitutes unjust enrichment under contract law',
    ],
    respondent: [
      'Three specific features (push notifications, CSV export, mobile admin) were absent from the Scope of Work',
      '$2,200 spent on third-party remediation to make the application functional',
      'Non-conformance with SOW justifies withholding final payment',
      'Initial $3,500 paid demonstrates good faith; seeks only partial refund',
    ],
  },
  responsibility_analysis:
    'Primary responsibility rests with Party B (the client). The three-month commercial deployment constitutes implied acceptance under the substantial performance doctrine. Party B bore a duty to raise defects promptly upon delivery and provide the contractor an opportunity to remedy. The failure to do so — while simultaneously generating commercial value from the system — significantly undermines the non-payment position. Party A (the contractor) bears partial responsibility for the three allegedly missing features, which, if substantiated, represent genuine non-performance.',
  legal_considerations:
    'The substantial performance doctrine applies: a contractor who substantially completes contractual obligations is entitled to the contract price minus damages for incomplete items. Three months of commercial use constitutes implied acceptance. The client\'s remedy is a price reduction for the undelivered items, not withholding the entire balance. The $2,200 remediation claim is noted but does not supersede the contractor\'s right to payment for delivered work.',
  suggested_compensation:
    'Party B shall pay Party A $3,900 within 14 days. This represents the $5,000 outstanding balance reduced by $1,100 — a proportional deduction for the three undelivered features (estimated at 12-13% of total project scope). Party B\'s counterclaim for refund of $1,500 is denied.',
  final_recommendation:
    'The arbitrator finds in favor of Party A (the contractor). Payment of $3,900 is ordered. This accounts for the substantial delivery and commercial use while recognizing legitimate scope gaps. Both parties should consider this matter resolved upon payment. Future engagements between these parties should include formal acceptance testing protocols and written defect notification procedures.',
  confidence_level: 'high',
}
