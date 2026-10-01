import { useState } from 'react';
import {
  ArrowLeft, Package, DollarSign, Calendar, Truck, Sparkles, CheckCircle2,
  AlertTriangle, FileText, BookOpen, Info, Pencil, RefreshCw, Send,
  ShieldAlert, ThumbsUp,
} from 'lucide-react';
import type { Conversation } from '@/types';

interface WorkspaceProps {
  conversation: Conversation;
  onBack: () => void;
}

export default function ConversationWorkspace({ conversation, onBack }: WorkspaceProps) {
  const [responseIndex, setResponseIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedResponse, setEditedResponse] = useState(conversation.suggestedResponses[0]);
  const [sent, setSent] = useState(false);
  const [approved, setApproved] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [asked, setAsked] = useState(false);

  const ai = conversation.aiAnalysis;
  const lowConfidence = ai.reviewRequired || ai.confidence < 70;

  const handleRegenerate = () => {
    if (conversation.suggestedResponses.length <= 1) return;
    const next = (responseIndex + 1) % conversation.suggestedResponses.length;
    setResponseIndex(next);
    setEditedResponse(conversation.suggestedResponses[next]);
    setIsEditing(false);
    setSent(false);
  };

  const handleSend = () => {
    setSent(true);
    setEditedResponse(editedResponse);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSent(false);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    setSent(false);
  };

  const confidenceColor = ai.confidence >= 80 ? 'text-emerald-600' : ai.confidence >= 70 ? 'text-amber-600' : 'text-rose-600';
  const confidenceBg = ai.confidence >= 80 ? 'bg-emerald-500' : ai.confidence >= 70 ? 'bg-amber-500' : 'bg-rose-500';

  return (
    <div className="max-w-6xl mx-auto px-8 py-6">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to dashboard
      </button>

      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">{conversation.customer}</h1>
        <p className="text-sm text-gray-500">{conversation.subject}</p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* LEFT COLUMN */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Customer Conversation</h2>

            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 text-xs font-semibold shrink-0">
                {conversation.customer.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 mb-1">{conversation.customer}</p>
                <div className="bg-gray-50 rounded-lg rounded-tl-none px-4 py-3 border border-gray-100">
                  <p className="text-sm text-gray-700">{conversation.customerMessage}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Order Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Package className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-500">Order Number</span>
                <span className="text-sm font-medium text-gray-900 ml-auto">{conversation.orderNumber}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-sm text-gray-500">Order Value</span>
                <span className="text-sm font-medium text-gray-900 ml-auto">${conversation.orderValue}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-sm text-gray-500">Order Date</span>
                <span className="text-sm font-medium text-gray-900 ml-auto">{conversation.orderDate}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="text-sm text-gray-500">Status</span>
                <span className="text-sm font-medium text-gray-900 ml-auto">{conversation.orderStatus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-sm font-semibold text-gray-900">AI Copilot</h2>
            </div>

            {lowConfidence && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 mb-4">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-sm font-medium text-amber-800">Review Required</span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-[11px] text-gray-500 mb-1">Issue</p>
                <p className="text-sm font-medium text-gray-900">{ai.issue}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-[11px] text-gray-500 mb-1">Intent</p>
                <p className="text-sm font-medium text-gray-900">{ai.intent}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-[11px] text-gray-500 mb-1">AI Confidence</p>
                <p className={`text-sm font-bold ${confidenceColor}`}>{ai.confidence}%</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-gray-500">Confidence</span>
                <span className={`text-[11px] font-medium ${confidenceColor}`}>{ai.confidence}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${confidenceBg} rounded-full transition-all`} style={{ width: `${ai.confidence}%` }} />
              </div>
            </div>

            {ai.explanation && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 mb-4">
                <p className="text-sm text-amber-800">{ai.explanation}</p>
              </div>
            )}

            <div className="mb-4">
              <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-2">Recommended Action</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                <p className="text-sm font-medium text-blue-900">{ai.recommendedAction}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-2">Reasoning</p>
              <ul className="space-y-2">
                {ai.reasoning.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2">
              {lowConfidence ? (
                <>
                  <button
                    onClick={() => setAsked(true)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      asked ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {asked ? <><CheckCircle2 className="w-4 h-4" /> Question Sent</> : <><Send className="w-4 h-4" /> Ask Customer</>}
                  </button>
                  <button
                    onClick={() => setEscalated(true)}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                      escalated ? 'bg-rose-50 text-rose-700 border-rose-200' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {escalated ? <><CheckCircle2 className="w-4 h-4" /> Escalated</> : <><AlertTriangle className="w-4 h-4" /> Escalate</>}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setApproved(true)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      approved ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {approved ? <><CheckCircle2 className="w-4 h-4" /> Approved</> : <><ThumbsUp className="w-4 h-4" /> Approve Recommendation</>}
                  </button>
                  <button
                    onClick={() => setEscalated(true)}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                      escalated ? 'bg-rose-50 text-rose-700 border-rose-200' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {escalated ? <><CheckCircle2 className="w-4 h-4" /> Escalated</> : <><AlertTriangle className="w-4 h-4" /> Escalate</>}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SUGGESTED RESPONSE */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mt-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Suggested Response</h2>

        {sent ? (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-sm font-medium text-emerald-800">Response sent successfully.</span>
          </div>
        ) : null}

        {isEditing ? (
          <div className="mb-4">
            <textarea
              value={editedResponse}
              onChange={(e) => setEditedResponse(e.target.value)}
              className="w-full min-h-[120px] rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            />
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg border border-gray-100 px-4 py-3 mb-4">
            <p className="text-sm text-gray-700 leading-relaxed">{editedResponse}</p>
          </div>
        )}

        <div className="flex gap-2">
          {isEditing ? (
            <button
              onClick={handleSaveEdit}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" /> Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
            >
              <Pencil className="w-4 h-4" /> Edit
            </button>
          )}
          {conversation.suggestedResponses.length > 1 && (
            <button
              onClick={handleRegenerate}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Regenerate
            </button>
          )}
          <button
            onClick={handleSend}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
          >
            <Send className="w-4 h-4" /> Send Response
          </button>
        </div>
      </div>

      {/* EXPLAINABILITY */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mt-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-1">Why did AI recommend this?</h2>
        <p className="text-sm text-gray-500 mb-4">AI used these sources to determine its recommendation.</p>

        <div className="space-y-3 mb-4">
          {conversation.sources.map((src, i) => {
            const icons = [FileText, BookOpen, Info];
            const Icon = icons[i % icons.length];
            return (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{src.name}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{src.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-4 py-3 border border-blue-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">AI Confidence</span>
          </div>
          <span className={`text-lg font-bold ${confidenceColor}`}>{ai.confidence}%</span>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden ml-2">
            <div className={`h-full ${confidenceBg} rounded-full`} style={{ width: `${ai.confidence}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
