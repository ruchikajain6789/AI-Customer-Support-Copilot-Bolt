import { Search } from 'lucide-react';
import type { Conversation } from '@/types';

interface ConversationsProps {
  conversations: Conversation[];
  onOpenConversation: (id: string) => void;
}

const statusStyles: Record<string, string> = {
  Open: 'bg-blue-50 text-blue-700 border-blue-200',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Escalated: 'bg-rose-50 text-rose-700 border-rose-200',
};

export default function Conversations({ conversations, onOpenConversation }: ConversationsProps) {
  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Conversations</h1>
        <p className="text-gray-500 mt-1">All customer support conversations.</p>
      </div>

      <div className="relative mb-5">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by customer or subject..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-200 bg-gray-50">
          <span className="col-span-3 text-[11px] font-medium text-gray-500 uppercase tracking-wide">Customer</span>
          <span className="col-span-3 text-[11px] font-medium text-gray-500 uppercase tracking-wide">Subject</span>
          <span className="col-span-2 text-[11px] font-medium text-gray-500 uppercase tracking-wide">Intent</span>
          <span className="col-span-2 text-[11px] font-medium text-gray-500 uppercase tracking-wide">Confidence</span>
          <span className="col-span-2 text-[11px] font-medium text-gray-500 uppercase tracking-wide text-right">Status</span>
        </div>
        <div className="divide-y divide-gray-100">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => onOpenConversation(c.id)}
              className="w-full grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors text-left items-center"
            >
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 text-xs font-semibold">
                  {c.customer.split(' ').map((n) => n[0]).join('')}
                </div>
                <span className="text-sm font-medium text-gray-900">{c.customer}</span>
              </div>
              <span className="col-span-3 text-sm text-gray-600">{c.subject}</span>
              <span className="col-span-2 text-sm text-gray-600">{c.intent}</span>
              <div className="col-span-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-[80px]">
                  <div
                    className={`h-full rounded-full ${c.confidence >= 80 ? 'bg-emerald-500' : c.confidence >= 65 ? 'bg-amber-500' : 'bg-rose-500'}`}
                    style={{ width: `${c.confidence}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{c.confidence}%</span>
              </div>
              <div className="col-span-2 flex justify-end">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusStyles[c.status]}`}>
                  {c.status}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
