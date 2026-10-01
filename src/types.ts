export type View = 'dashboard' | 'conversations' | 'insights' | 'knowledge' | 'settings';

export type ConversationStatus = 'Open' | 'Pending' | 'Resolved' | 'Escalated';

export interface PolicyDocument {
  name: string;
  keywords: string[];
  content: string;
}

export interface AIAnalysisResult {
  intent: string;
  orderNumber: string | null;
  recommendedAction: string;
  confidence: number;
  reasoning: string[];
  suggestedResponse: string;
  sources: string[];
  requiresHumanReview: boolean;
}

export interface Conversation {
  id: string;
  customer: string;
  subject: string;
  status: ConversationStatus;
  issueType: string;
  intent: string;
  confidence: number;
  orderNumber: string;
  orderValue: number;
  orderDate: string;
  orderStatus: string;
  customerMessage: string;
  aiAnalysis: {
    issue: string;
    intent: string;
    confidence: number;
    recommendedAction: string;
    reasoning: string[];
    reviewRequired?: boolean;
    explanation?: string;
  };
  suggestedResponses: string[];
  sources: { name: string; description: string }[];
  isLive?: boolean;
}
