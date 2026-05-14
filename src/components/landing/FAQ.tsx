import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Is the AI resolution legally binding?',
    answer:
      'The AI resolution is advisory by default. However, both parties can agree before the process begins to treat it as binding. We recommend consulting a legal professional for disputes involving significant financial or legal implications.',
  },
  {
    question: 'How does the AI remain neutral?',
    answer:
      'Both parties submit their accounts independently, without seeing each other\'s submission first. The AI processes both perspectives simultaneously and is specifically trained to remove emotional bias, focus on facts, and apply consistent standards.',
  },
  {
    question: 'What types of disputes can be resolved here?',
    answer:
      'The platform handles neighbor disputes, workplace conflicts, consumer issues, financial disagreements, property disputes, contract conflicts, and family matters. It is best suited for civil disputes where both parties are willing to participate.',
  },
  {
    question: 'What happens if the other party refuses to participate?',
    answer:
      'If the invited party does not respond within 14 days, the case is marked as unresponsive. You will receive a partial summary based on your submission alone, and may use it as documentation.',
  },
  {
    question: 'How is my data kept private?',
    answer:
      'Each dispute is isolated with strict access controls. Only verified participants of a specific case can view its contents. We use Supabase\'s Row Level Security (RLS) to enforce this at the database level. We do not share or sell any case data.',
  },
  {
    question: 'Can I upload evidence like photos or documents?',
    answer:
      'Yes. Both parties can upload images, PDFs, screenshots, contracts, receipts, and other supporting documents. All files are stored securely and are only accessible to the AI and the other participant.',
  },
  {
    question: 'What if I disagree with the AI\'s resolution?',
    answer:
      'The AI resolution is a recommendation. You can accept it, use it as a starting point for negotiation, or choose to pursue formal legal action. The platform provides a fair, objective perspective — not an absolute verdict.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-full text-slate-600 text-sm font-medium mb-4">
            Common Questions
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-slate-500">
            Everything you need to know before starting a case.
          </p>
        </div>

        {/* Accordion */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <Accordion type="single" collapsible className="px-2">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-4 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
