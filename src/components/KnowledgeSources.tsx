import { FileText, ChevronRight, BookOpen } from 'lucide-react';

const sources = [
  {
    name: 'Refund Policy',
    description: 'Defines when customers are eligible for full or partial refunds, including timeframes and conditions.',
    articles: 4,
    updated: 'Sep 20, 2026',
  },
  {
    name: 'Damaged Product Policy',
    description: 'Outlines the process for handling reports of damaged goods, including evidence requirements.',
    articles: 3,
    updated: 'Sep 18, 2026',
  },
  {
    name: 'Exchange Policy',
    description: 'Covers eligibility and process for exchanging items, including size and color swaps.',
    articles: 5,
    updated: 'Sep 22, 2026',
  },
  {
    name: 'Shipping Policy',
    description: 'Details delivery timeframes, tracking procedures, and delay escalation protocols.',
    articles: 6,
    updated: 'Sep 25, 2026',
  },
];

export default function KnowledgeSources() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Knowledge Sources</h1>
        <p className="text-gray-500 mt-1">Policy documents the AI uses to ground its recommendations.</p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
        <BookOpen className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-gray-600">
          The AI copilot references these knowledge sources to provide explainable, policy-grounded recommendations.
          All suggestions are traceable to the source documents below.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {sources.map((src) => (
          <div key={src.name} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">{src.name}</h3>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>
                <p className="text-sm text-gray-500 mt-1">{src.description}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs text-gray-400">{src.articles} articles</span>
                  <span className="text-xs text-gray-400">Updated {src.updated}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
