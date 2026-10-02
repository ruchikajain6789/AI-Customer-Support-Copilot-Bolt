import { useState } from 'react';
import { FileText, ChevronRight, BookOpen, X } from 'lucide-react';

const sources = [
  {
    name: 'Refund Policy',
    description:
      'Defines when customers are eligible for full or partial refunds, including timeframes and conditions.',
    articles: 4,
    updated: 'Sep 20, 2026',
    content: [
      'Customers may request a refund for eligible purchases within 30 days of delivery.',
      'Items must be unused and in their original condition unless the refund request is related to a damaged or defective product.',
      'Full refunds are available when the order is cancelled before shipment or when an eligible product is returned according to policy.',
      'Partial refunds may apply when only part of an order is eligible for a refund.',
      'Refunds are returned to the original payment method after the request has been approved.',
    ],
  },
  {
    name: 'Damaged Product Policy',
    description:
      'Outlines the process for handling reports of damaged goods, including evidence requirements.',
    articles: 3,
    updated: 'Sep 18, 2026',
    content: [
      'Customers should report damaged products as soon as possible after delivery.',
      'Customers may be asked to provide photographs showing the damage and the condition of the packaging.',
      'Support agents should review the evidence before approving a refund or replacement.',
      'If the damage is confirmed, the customer may be eligible for a replacement or refund depending on availability and order conditions.',
      'Suspected repeated or high-value damage claims may require escalation to a support specialist.',
    ],
  },
  {
    name: 'Exchange Policy',
    description:
      'Covers eligibility and process for exchanging items, including size and color swaps.',
    articles: 5,
    updated: 'Sep 22, 2026',
    content: [
      'Customers may request an exchange for eligible products within 30 days of delivery.',
      'Size and color exchanges are allowed when the requested replacement is available.',
      'The returned product should be unused and in its original condition unless the exchange is related to a product defect.',
      'If the replacement item has a different price, the applicable price difference should be calculated before completing the exchange.',
      'If an exchange cannot be fulfilled, the customer may be offered a refund according to the Refund Policy.',
    ],
  },
  {
    name: 'Shipping Policy',
    description:
      'Details delivery timeframes, tracking procedures, and delay escalation protocols.',
    articles: 6,
    updated: 'Sep 25, 2026',
    content: [
      'Standard shipping generally takes 3–5 business days.',
      'Express shipping generally takes 1–2 business days.',
      'Customers can track their order using the order tracking page and their order number.',
      'If tracking information has not changed for 48 hours, the order may require additional investigation.',
      'Orders that pass the estimated delivery date should be reviewed for possible logistics escalation.',
      'Support agents should provide the customer with the latest available tracking information before escalating the case.',
    ],
  },
];

export default function KnowledgeSources() {
  const [selectedSource, setSelectedSource] = useState<typeof sources[0] | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Knowledge Sources
        </h1>

        <p className="text-gray-500 mt-1">
          Policy documents the AI uses to ground its recommendations.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
        <BookOpen className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />

        <p className="text-sm text-gray-600">
          The AI copilot references these knowledge sources to provide
          explainable, policy-grounded recommendations. All suggestions are
          traceable to the source documents below.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {sources.map((src) => (
          <button
            key={src.name}
            onClick={() => setSelectedSource(src)}
            className="text-left bg-white rounded-xl border border-gray-200 p-5
              hover:border-blue-300 hover:shadow-sm transition-all
              cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {src.name}
                  </h3>

                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  {src.description}
                </p>

                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs text-gray-400">
                    {src.articles} articles
                  </span>

                  <span className="text-xs text-gray-400">
                    Updated {src.updated}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedSource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedSource.name}
                  </h2>

                  <p className="text-xs text-gray-500">
                    Updated {selectedSource.updated}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedSource(null)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="px-6 py-6 overflow-y-auto">
              <p className="text-sm text-gray-600 mb-5">
                {selectedSource.description}
              </p>

              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Policy Guidelines
              </h3>

              <div className="space-y-3">
                {selectedSource.content.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
                  >
                    <span className="text-sm font-semibold text-blue-600">
                      {index + 1}.
                    </span>

                    <p className="text-sm text-gray-600">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedSource(null)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}