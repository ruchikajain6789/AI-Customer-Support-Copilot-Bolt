import type { Conversation, PolicyDocument } from './types';

export const policyDocuments: PolicyDocument[] = [
  {
    name: 'Refund Policy',
    keywords: ['refund', 'money back', 'reimburse', 'return', 'cancel', 'credit'],
    content: `REFUND POLICY

1. Full refunds are available within 30 days of delivery for damaged or defective items.
2. Partial refunds apply when items are missing from a delivered order.
3. Refunds are processed to the original payment method within 5-7 business days.
4. Customers must provide the order number and a description of the issue.
5. Items must be returned in their original packaging unless damaged in transit.
6. Digital products are non-refundable once downloaded.`,
  },
  {
    name: 'Damaged Product Policy',
    keywords: ['damaged', 'broken', 'cracked', 'destroyed', 'defective', 'arrived damaged'],
    content: `DAMAGED PRODUCT POLICY

1. Customers receiving damaged products must report within 48 hours of delivery.
2. Photographic evidence is requested but a customer report alone qualifies for review.
3. Damaged items qualify for a full refund or replacement at the customer's choice.
4. No return shipping is required for items damaged in transit.
5. If the order is within the 30-day return window, a full refund is automatically approved.
6. For orders outside the return window, case-by-case review is required.`,
  },
  {
    name: 'Exchange Policy',
    keywords: ['exchange', 'swap', 'replace', 'size', 'wrong size', 'wrong item', 'color'],
    content: `EXCHANGE POLICY

1. Customers may exchange items within 30 days of delivery.
2. Exchanges are allowed for different sizes, colors, or variants of the same product.
3. The requested replacement item must be in stock.
4. A prepaid return label is provided for the original item.
5. If the correct item is out of stock, a full refund is offered as an alternative.
6. Price differences are automatically adjusted — customer pays or is refunded the difference.`,
  },
  {
    name: 'Shipping Policy',
    keywords: ['shipping', 'delivery', 'tracking', 'delay', 'late', 'transit', 'arrive', 'package'],
    content: `SHIPPING POLICY

1. Standard shipping takes 3-5 business days; express shipping takes 1-2 business days.
2. Orders are split into multiple shipments if items ship from different warehouses.
3. If tracking has not updated for 48 hours, the order qualifies for logistics escalation.
4. Delayed orders past the estimated delivery date are flagged for priority handling.
5. Lost packages (no delivery after 10 business days) qualify for a full refund or reshipment.
6. Customers can track orders via the order tracking page using their order number.`,
  },
];

export function findRelevantPolicies(message: string): PolicyDocument[] {
  const lower = message.toLowerCase();
  const scored = policyDocuments.map((doc) => {
    const score = doc.keywords.reduce((acc, kw) => (lower.includes(kw) ? acc + 1 : acc), 0);
    return { doc, score };
  });
  const relevant = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
  if (relevant.length === 0) return policyDocuments;
  return relevant.map((s) => s.doc);
}

export const conversations: Conversation[] = [
  {
    id: '1',
    customer: 'John Smith',
    subject: 'Damaged Product',
    status: 'Open',
    createdAt: new Date().toISOString(),
    issueType: 'Damaged Product',
    intent: 'Refund Request',
    confidence: 92,
    orderNumber: 'ORD-28491',
    orderValue: 200,
    orderDate: 'Sep 27, 2026',
    orderStatus: 'Delivered',
    customerMessage: 'My order #ORD-28491 arrived damaged. I want a refund.',
    aiAnalysis: {
      issue: 'Damaged Product',
      intent: 'Refund Request',
      confidence: 92,
      recommendedAction: 'Full Refund',
      reasoning: [
        'Product reported damaged',
        'Order is within the return period',
        'Customer appears eligible under the refund policy',
      ],
    },
    suggestedResponses: [
      "I'm sorry your order arrived damaged. I've reviewed your order and you appear to be eligible for a full refund. I can help initiate the refund for you.",
      "Thank you for reaching out about your damaged order. I apologize for the inconvenience. Based on our refund policy, I can process a full refund of $200 to your original payment method right away.",
    ],
    sources: [
      { name: 'Refund Policy', description: 'Customers may request a full refund within 30 days of delivery for damaged items.' },
      { name: 'Damaged Product Policy', description: 'Photographic evidence or customer report qualifies the order for refund review.' },
      { name: 'Order Information', description: 'Order #ORD-28491 — Delivered Sep 27, 2026 — Value $200 — Within return window.' },
    ],
  },
  {
    id: '2',
    customer: 'Sarah Jones',
    subject: 'Refund Request',
    status: 'Open',
    createdAt: new Date().toISOString(),
    issueType: 'Refund Request',
    intent: 'Refund Request',
    confidence: 88,
    orderNumber: 'ORD-28492',
    orderValue: 145,
    orderDate: 'Sep 25, 2026',
    orderStatus: 'Delivered',
    customerMessage: 'I never received part of my order and I would like a refund for the missing items.',
    aiAnalysis: {
      issue: 'Missing Items',
      intent: 'Refund Request',
      confidence: 88,
      recommendedAction: 'Partial Refund',
      reasoning: [
        'Customer reports missing items in delivery',
        'Order value supports partial refund scenario',
        'Shipping logs indicate split shipment',
      ],
    },
    suggestedResponses: [
      "I'm sorry to hear part of your order didn't arrive. I've checked your shipment and it looks like your order was split into two deliveries. I can process a refund for the missing items right away.",
      "Thank you for letting us know about the missing items. I apologize for the inconvenience. I can issue a partial refund of $72 for the items that didn't arrive. Would you like me to proceed?",
    ],
    sources: [
      { name: 'Refund Policy', description: 'Partial refunds apply when items are missing from a delivered order.' },
      { name: 'Shipping Policy', description: 'Split shipments may result in staggered delivery of order items.' },
      { name: 'Order Information', description: 'Order #ORD-28492 — Delivered Sep 25, 2026 — Value $145.' },
    ],
  },
  {
    id: '3',
    customer: 'David Lee',
    subject: 'Delivery Issue',
    status: 'Open',
    createdAt: new Date().toISOString(),
    issueType: 'Delivery Issue',
    intent: 'Delivery Inquiry',
    confidence: 81,
    orderNumber: 'ORD-28493',
    orderValue: 89,
    orderDate: 'Sep 28, 2026',
    orderStatus: 'In Transit',
    customerMessage: "My order was supposed to arrive two days ago and the tracking hasn't updated. Can you help?",
    aiAnalysis: {
      issue: 'Delayed Delivery',
      intent: 'Delivery Inquiry',
      confidence: 81,
      recommendedAction: 'Provide Tracking Update',
      reasoning: [
        'Tracking has not updated in 48 hours',
        'Order is past estimated delivery date',
        'Carrier delay likely — escalate to logistics if unresolved',
      ],
    },
    suggestedResponses: [
      "I'm sorry your delivery is delayed. I've checked your tracking and it appears your package is experiencing a carrier delay. I've flagged this with our logistics team and you should see an update within 24 hours.",
      "Thank you for reaching out about your delayed order. I apologize for the wait. Your package is still in transit but the carrier has not scanned it recently. I've submitted an inquiry and will follow up with you shortly.",
    ],
    sources: [
      { name: 'Shipping Policy', description: 'Delays beyond 48 hours with no tracking update qualify for logistics escalation.' },
      { name: 'Order Information', description: 'Order #ORD-28493 — In Transit — Estimated delivery Sep 26, 2026.' },
    ],
  },
  {
    id: '4',
    customer: 'Emma Wilson',
    subject: 'Exchange Request',
    status: 'Open',
    createdAt: new Date().toISOString(),
    issueType: 'Exchange Request',
    intent: 'Product Exchange',
    confidence: 90,
    orderNumber: 'ORD-28494',
    orderValue: 320,
    orderDate: 'Sep 24, 2026',
    orderStatus: 'Delivered',
    customerMessage: 'I ordered a size medium but I need a large. Can I exchange it?',
    aiAnalysis: {
      issue: 'Wrong Size',
      intent: 'Product Exchange',
      confidence: 90,
      recommendedAction: 'Process Exchange',
      reasoning: [
        'Customer requests size exchange, not refund',
        'Item is within exchange window',
        'Requested size appears in stock',
      ],
    },
    suggestedResponses: [
      "I'd be happy to help you exchange your item for a larger size. I've checked our inventory and size large is in stock. I can start the exchange process for you right away — you'll receive a prepaid return label for the medium.",
      "Thank you for reaching out. I can process a size exchange for you. Size large is currently available. I'll send you a return label for the medium and ship the large once we receive it.",
    ],
    sources: [
      { name: 'Exchange Policy', description: 'Customers may exchange items within 30 days of delivery if the new size is in stock.' },
      { name: 'Order Information', description: 'Order #ORD-28494 — Delivered Sep 24, 2026 — Value $320.' },
    ],
  },
  {
    id: '5',
    customer: 'Michael Brown',
    subject: 'Unclear Refund Request',
    status: 'Pending',
    createdAt: new Date().toISOString(),
    issueType: 'Wrong Item',
    intent: 'Unclear Resolution',
    confidence: 58,
    orderNumber: 'ORD-28495',
    orderValue: 175,
    orderDate: 'Sep 26, 2026',
    orderStatus: 'Delivered',
    customerMessage: "I received the wrong item and I'm not sure whether I want a refund or replacement.",
    aiAnalysis: {
      issue: 'Wrong Item',
      intent: 'Unclear Resolution',
      confidence: 58,
      recommendedAction: 'Ask the customer whether they prefer a refund or replacement.',
      reasoning: [
        'Customer received incorrect item',
        'Preferred resolution (refund vs. replacement) is ambiguous',
        'Both options are viable under policy — requires customer input',
      ],
      reviewRequired: true,
      explanation: "The customer's preferred resolution is unclear.",
    },
    suggestedResponses: [
      "I'm sorry you received the wrong item. I'd like to make this right. Would you prefer a full refund or a replacement sent to you right away? Let me know and I'll process it immediately.",
      "Thank you for letting us know about the incorrect item. I apologize for the mix-up. I can either issue a full refund or send a replacement — which would you prefer?",
    ],
    sources: [
      { name: 'Refund Policy', description: 'Customers may request a refund for incorrect items received.' },
      { name: 'Exchange Policy', description: 'Replacement available if the correct item is in stock.' },
      { name: 'Order Information', description: 'Order #ORD-28495 — Delivered Sep 26, 2026 — Value $175.' },
    ],
  },
];
