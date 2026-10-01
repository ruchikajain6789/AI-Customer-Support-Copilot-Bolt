import { Sparkles, TrendingUp, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

const metrics = [
  { label: 'AI-Assisted Conversations', value: '30%', icon: Sparkles, color: 'text-blue-600', bg: 'bg-blue-50', bar: '30%' },
  { label: 'Suggested Response Acceptance', value: '78%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', bar: '78%' },
  { label: 'Escalation Rate', value: '6%', icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50', bar: '6%' },
  { label: 'Avg Handling Time Improvement', value: '18%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50', bar: '18%' },
];

const weeklyData = [
  { day: 'Mon', value: 42 },
  { day: 'Tue', value: 55 },
  { day: 'Wed', value: 38 },
  { day: 'Thu', value: 61 },
  { day: 'Fri', value: 48 },
  { day: 'Sat', value: 29 },
  { day: 'Sun', value: 33 },
];

export default function AIInsights() {
  const maxVal = Math.max(...weeklyData.map((d) => d.value));

  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
        <p className="text-gray-500 mt-1">Prototype metrics showing AI copilot performance.</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${m.bg} mb-3`}>
                <Icon className={`w-5 h-5 ${m.color}`} />
              </div>
              <p className="text-3xl font-bold text-gray-900">{m.value}</p>
              <p className="text-sm text-gray-500 mt-1">{m.label}</p>
              <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${m.color.replace('text-', 'bg-')}`} style={{ width: m.bar }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <Clock className="w-4 h-4 text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-900">AI-Assisted Conversations This Week</h2>
        </div>
        <div className="flex items-end justify-between gap-3 h-48">
          {weeklyData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end h-full">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-indigo-500 transition-all hover:from-blue-600 hover:to-indigo-600"
                  style={{ height: `${(d.value / maxVal) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Top Issue Types</h3>
          <div className="space-y-3">
            {[
              { label: 'Refund Request', count: 14, pct: 38 },
              { label: 'Damaged Product', count: 9, pct: 24 },
              { label: 'Delivery Issue', count: 7, pct: 19 },
              { label: 'Exchange Request', count: 4, pct: 11 },
              { label: 'Other', count: 3, pct: 8 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="text-sm font-medium text-gray-900">{item.count}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Resolution Breakdown</h3>
          <div className="space-y-3">
            {[
              { label: 'Resolved by AI Suggestion', pct: 78, color: 'bg-emerald-500' },
              { label: 'Resolved by Agent', pct: 16, color: 'bg-blue-500' },
              { label: 'Escalated', pct: 6, color: 'bg-rose-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="text-sm font-medium text-gray-900">{item.pct}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-6">Prototype Metrics — Independent AI Product Management Case Study</p>
    </div>
  );
}
