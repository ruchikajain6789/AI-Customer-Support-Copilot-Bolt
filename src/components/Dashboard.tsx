import { useState } from 'react';
import { MessageSquare, Sparkles, Clock, AlertTriangle, ArrowRight, Send, Loader2, type LucideIcon } from 'lucide-react';
import type { Conversation, View } from '@/types';

interface DashboardProps {
  conversations: Conversation[];
  onOpenConversation: (id: string) => void;
  onNavigate: (view: View) => void;
  onSubmitMessage: (message: string) => Promise<void>;
  isAnalyzing: boolean;
}



const statusStyles: Record<string, string> = {
  Open: 'bg-blue-50 text-blue-700 border-blue-200',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Escalated: 'bg-rose-50 text-rose-700 border-rose-200',
};

export default function Dashboard({ conversations, onOpenConversation, onNavigate, onSubmitMessage, isAnalyzing }: DashboardProps) {
  const kpis = [
  {
    label: 'Conversations Today',
  value: conversations.length.toString(),
    icon: MessageSquare,
    accent: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    label: 'AI Assisted',
    value: conversations.filter(c => c.confidence > 0).length.toString(),
    icon: Sparkles,
    accent: 'text-indigo-600',
    bg: 'bg-indigo-50'
  },
  {
    label: 'Awaiting Action',
    value: conversations.filter(c => c.status === 'Pending').length.toString(),
    icon: Clock,
    accent: 'text-amber-600',
    bg: 'bg-amber-50'
  },
  {
    label: 'Escalations',
    value: conversations.filter(c => c.status === 'Escalated').length.toString(),
    icon: AlertTriangle,
    accent: 'text-rose-600',
    bg: 'bg-rose-50'
  },
];
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!message.trim() || isAnalyzing) return;
    await onSubmitMessage(message.trim());
    setMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">AI Customer Support Copilot</h1>
        <p className="text-gray-500 mt-1">Resolve customer issues faster with AI-powered assistance.</p>
        <div className="mt-3 inline-flex items-center rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-xs text-gray-500">
  <span className="font-medium text-gray-700 mr-1">Demo Environment:</span>
  Customer and order data shown here is synthetic and created for demonstration purposes.
</div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${kpi.bg}`}>
                  <Icon className={`w-5 h-5 ${kpi.accent}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
              <p className="text-sm text-gray-500 mt-1">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-sm font-semibold text-gray-900">New Customer Message</h2>
          <span className="text-xs text-gray-400 ml-1">Live AI Analysis</span>
        </div>
        <p className="text-sm text-gray-500 mb-3">Enter a customer's support question to get an AI-powered recommendation.</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !isAnalyzing) handleSubmit(); }}
            placeholder="e.g. My order arrived damaged and I want a refund..."
            disabled={isAnalyzing}
            className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            onClick={handleSubmit}
            disabled={!message.trim() || isAnalyzing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isAnalyzing ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</> : <><Send className="w-4 h-4" /> Analyze</>}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Recent Conversations</h2>
          <button
            onClick={() => onNavigate('conversations')}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => onOpenConversation(c.id)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 text-sm font-semibold">
                  {c.customer.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {c.customer}
                    {c.isLive && <span className="ml-2 text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">LIVE</span>}
                  </p>
                  <p className="text-sm text-gray-500">{c.subject}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusStyles[c.status]}`}>
                {c.status}
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-6">Prototype Metrics — Independent AI Product Management Case Study</p>
    </div>
  );
}
