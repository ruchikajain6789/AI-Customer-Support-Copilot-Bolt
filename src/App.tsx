import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import ConversationWorkspace from '@/components/ConversationWorkspace';
import Conversations from '@/components/Conversations';
import AIInsights from '@/components/AIInsights';
import KnowledgeSources from '@/components/KnowledgeSources';
import Settings from '@/components/Settings';
import { conversations as seedConversations, findRelevantPolicies } from '@/data';
import type { Conversation, View, AIAnalysisResult } from '@/types';

function App() {
  const [view, setView] = useState<View>('dashboard');
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [allConversations, setAllConversations] = useState<Conversation[]>(seedConversations);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);

  const openConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const backToDashboard = () => {
    setActiveConversationId(null);
    setView('dashboard');
  };

  const handleSubmitMessage = async (message: string) => {
    setIsAnalyzing(true);
    setAnalyzeError(null);
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-message`;
      const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      const result: AIAnalysisResult = await response.json();

      if (!result.intent || !result.recommendedAction) {
        throw new Error('Invalid AI response');
      }
      const orderMatch = message.match(/\bORD-\d+\b/i);
const demoOrder = orderMatch
  ? seedConversations.find(
      (conversation) =>
        conversation.orderNumber.toLowerCase() === orderMatch[0].toLowerCase()
    )
  : undefined;
      const relevantPolicies = findRelevantPolicies(message);
      const sources = (result.sources && result.sources.length > 0
        ? result.sources
        : relevantPolicies.map((p) => p.name)
      ).map((name) => {
        const doc = relevantPolicies.find((p) => p.name === name);
        return doc
          ? { name, description: doc.content.split('\n').slice(0, 2).join(' ').trim() }
          : { name, description: '' };
      });

      const newConvo: Conversation = {
        id: `live-${Date.now()}`,
        customer: 'Live Customer',
        subject: result.intent,
        status: result.requiresHumanReview ? 'Pending' : 'Open',
        issueType: result.intent,
        intent: result.intent,
        confidence: result.confidence,
       orderNumber: demoOrder?.orderNumber || result.orderNumber || '—',
orderValue: demoOrder?.orderValue || 0,
orderDate: demoOrder?.orderDate || '—',
orderStatus: demoOrder?.orderStatus || '—',
        customerMessage: message,
        aiAnalysis: {
          issue: result.issue,
          intent: result.intent,
          confidence: result.confidence,
          recommendedAction: result.recommendedAction,
          reasoning: result.reasoning,
          reviewRequired: result.requiresHumanReview,
          explanation: result.requiresHumanReview
            ? 'AI confidence is below 70%. Human review is required before taking action.'
            : undefined,
        },
        suggestedResponses: [result.suggestedResponse],
        sources,
        isLive: true,
      };

      setAllConversations((prev) => [newConvo, ...prev]);
      setActiveConversationId(newConvo.id);
    } catch (err) {
      setAnalyzeError(err instanceof Error ? err.message : 'Failed to analyze message');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderView = () => {
    if (activeConversationId) {
      const convo = allConversations.find((c) => c.id === activeConversationId);
      if (convo) return <ConversationWorkspace conversation={convo} onBack={backToDashboard} />;
    }

    switch (view) {
      case 'dashboard':
        return (
          <Dashboard
            conversations={allConversations}
            onOpenConversation={openConversation}
            onNavigate={setView}
            onSubmitMessage={handleSubmitMessage}
            isAnalyzing={isAnalyzing}
          />
        );
      case 'conversations':
        return <Conversations conversations={allConversations} onOpenConversation={openConversation} />;
      case 'insights':
        return <AIInsights />;
      case 'knowledge':
        return <KnowledgeSources />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        current={activeConversationId ? 'conversations' : view}
        onNavigate={(v) => {
          setActiveConversationId(null);
          setView(v);
        }}
      />
      <main className="flex-1 min-w-0">
        {analyzeError && (
          <div className="mx-8 mt-4 bg-rose-50 border border-rose-200 rounded-lg px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-rose-700">{analyzeError}</span>
            <button onClick={() => setAnalyzeError(null)} className="text-sm text-rose-600 hover:text-rose-800">Dismiss</button>
          </div>
        )}
        {renderView()}
      </main>
    </div>
  );
}

export default App;
