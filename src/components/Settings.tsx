import { useState } from 'react';
import { Sparkles, Bell, Shield, Sliders } from 'lucide-react';

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-10 h-6 rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-gray-200'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-4' : ''}`} />
    </button>
  );
}

export default function Settings() {
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [autoAnalyze, setAutoAnalyze] = useState(true);
  const [escalationAlerts, setEscalationAlerts] = useState(true);
  const [lowConfidenceGuard, setLowConfidenceGuard] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState(70);

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Configure the AI copilot behavior and agent preferences.</p>
      </div>

      <div className="space-y-5">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-semibold text-gray-900">AI Copilot</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">AI Suggestions</p>
                <p className="text-sm text-gray-500">Show recommended actions and suggested responses.</p>
              </div>
              <Toggle enabled={aiSuggestions} onChange={setAiSuggestions} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Auto-Analyze Conversations</p>
                <p className="text-sm text-gray-500">Automatically classify intent and confidence on new messages.</p>
              </div>
              <Toggle enabled={autoAnalyze} onChange={setAutoAnalyze} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-semibold text-gray-900">Confidence Threshold</h2>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Auto-approve suggestions above this confidence level.</p>
              <span className="text-sm font-bold text-indigo-600">{confidenceThreshold}%</span>
            </div>
            <input
              type="range"
              min={50}
              max={100}
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>50%</span><span>100%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-semibold text-gray-900">Human-in-the-Loop</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Low-Confidence Guard</p>
                <p className="text-sm text-gray-500">Require agent review when AI confidence is below threshold.</p>
              </div>
              <Toggle enabled={lowConfidenceGuard} onChange={setLowConfidenceGuard} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-semibold text-gray-900">Notifications</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Escalation Alerts</p>
              <p className="text-sm text-gray-500">Notify me when a conversation is escalated.</p>
            </div>
            <Toggle enabled={escalationAlerts} onChange={setEscalationAlerts} />
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">About</h3>
        <p className="text-sm text-gray-500">Independent AI Product Management Case Study</p>
        <p className="text-xs text-gray-400 mt-2">
          This is a prototype demonstrating AI-assisted customer support with human-in-the-loop controls,
          explainability, and source grounding. Metrics shown are simulated for demonstration purposes.
        </p>
      </div>
    </div>
  );
}
