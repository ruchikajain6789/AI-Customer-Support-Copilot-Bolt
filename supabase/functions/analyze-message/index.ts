// AI Customer Support Copilot - Edge Function v2
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PolicyDoc {
  name: string;
  keywords: string[];
  content: string;
}

const policyDocuments: PolicyDoc[] = [
  {
    name: "Refund Policy",
    keywords: ["refund", "money back", "reimburse", "return", "cancel", "credit"],
    content: `REFUND POLICY

1. Full refunds are available within 30 days of delivery for damaged or defective items.
2. Partial refunds apply when items are missing from a delivered order.
3. Refunds are processed to the original payment method within 5-7 business days.
4. Customers must provide the order number and a description of the issue.
5. Items must be returned in their original packaging unless damaged in transit.
6. Digital products are non-refundable once downloaded.`,
  },
  {
    name: "Damaged Product Policy",
    keywords: ["damaged", "broken", "cracked", "destroyed", "defective", "arrived damaged"],
    content: `DAMAGED PRODUCT POLICY

1. Customers receiving damaged products must report within 48 hours of delivery.
2. Photographic evidence is requested but a customer report alone qualifies for review.
3. Damaged items qualify for a full refund or replacement at the customer's choice.
4. No return shipping is required for items damaged in transit.
5. If the order is within the 30-day return window, a full refund is automatically approved.
6. For orders outside the return window, case-by-case review is required.`,
  },
  {
    name: "Exchange Policy",
    keywords: ["exchange", "swap", "replace", "size", "wrong size", "wrong item", "color"],
    content: `EXCHANGE POLICY

1. Customers may exchange items within 30 days of delivery.
2. Exchanges are allowed for different sizes, colors, or variants of the same product.
3. The requested replacement item must be in stock.
4. A prepaid return label is provided for the original item.
5. If the correct item is out of stock, a full refund is offered as an alternative.
6. Price differences are automatically adjusted — customer pays or is refunded the difference.`,
  },
  {
    name: "Shipping Policy",
    keywords: ["shipping", "delivery", "tracking", "delay", "late", "transit", "arrive", "package"],
    content: `SHIPPING POLICY

1. Standard shipping takes 3-5 business days; express shipping takes 1-2 business days.
2. Orders are split into multiple shipments if items ship from different warehouses.
3. If tracking has not updated for 48 hours, the order qualifies for logistics escalation.
4. Delayed orders past the estimated delivery date are flagged for priority handling.
5. Lost packages (no delivery after 10 business days) qualify for a full refund or reshipment.
6. Customers can track orders via the order tracking page using their order number.`,
  },
];

function findRelevantPolicies(message: string): PolicyDoc[] {
  const lower = message.toLowerCase();
  const scored = policyDocuments.map((doc) => {
    const score = doc.keywords.reduce((acc, kw) => (lower.includes(kw) ? acc + 1 : acc), 0);
    return { doc, score };
  });
  const relevant = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
  if (relevant.length === 0) return policyDocuments;
  return relevant.map((s) => s.doc);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const relevantPolicies = findRelevantPolicies(message);
    const policyContext = relevantPolicies
      .map((p) => `=== ${p.name} ===\n${p.content}`)
      .join("\n\n");

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Gemini API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const prompt = `You are an AI customer support copilot for an e-commerce company. Analyze the customer's message and provide a recommendation based on the policy documents below.

CUSTOMER MESSAGE:
"${message}"

RELEVANT POLICY DOCUMENTS:
${policyContext}

Analyze the customer's issue and respond with ONLY a valid JSON object (no markdown, no code fences) with this exact structure:
{
  "intent": "Brief classification of what the customer wants",
  "orderNumber": "The order number mentioned by the customer, or null if none was provided",
  "recommendedAction": "Specific action the support agent should take",
  "confidence": "Number from 0-100 representing your confidence",
  "reasoning": ["Array of strings explaining why this action is recommended"],
  "suggestedResponse": "A professional response the agent can send to the customer",
  "sources": ["Names of the policy documents used"],
  "requiresHumanReview": true if confidence is below 70 or the request is ambiguous, false otherwise
}

Rules:
- Base your analysis strictly on the provided policy documents.
- Extract the order number from the customer message if one is explicitly provided.
- If no order number is provided, return null for orderNumber.
- Do not invent or guess an order number.
- If the customer's intent is unclear or multiple resolutions are possible, set confidence below 70 and requiresHumanReview to true.
- The suggestedResponse should be empathetic, professional, and reference the relevant policy.
- Return ONLY the JSON object, no other text.`;

    const models = ["gemini-3.8-flash", "gemini-3.5-flash-lite"];
    let geminiResponse: Response | null = null;
    let lastError = "";

    for (const model of models) {
      for (let attempt = 0; attempt < 2; attempt++) {
        geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
  responseMimeType: "application/json",
},
            }),
          }
        );
        if (geminiResponse.ok) break;
        lastError = await geminiResponse.text();
        if (geminiResponse.status !== 503) { geminiResponse = null; break; }
        geminiResponse = null;
        if (attempt === 0) await new Promise((r) => setTimeout(r, 2000));
      }
      if (geminiResponse && geminiResponse.ok) break;
    }

    if (!geminiResponse || !geminiResponse.ok) {
      return new Response(
        JSON.stringify({ error: "Gemini API error", detail: lastError }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const geminiData = await geminiResponse.json();
    const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return new Response(
        JSON.stringify({ error: "No response from Gemini" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let cleaned = text.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }

    const parsed = JSON.parse(cleaned);

    const result = {
  intent: String(parsed.intent || "Unknown"),
  orderNumber: parsed.orderNumber ? String(parsed.orderNumber) : null,
  recommendedAction: String(parsed.recommendedAction || "Review required"),
      confidence: Math.min(100, Math.max(0, Number(parsed.confidence) || 0)),
      reasoning: Array.isArray(parsed.reasoning) ? parsed.reasoning.map(String) : [],
      suggestedResponse: String(parsed.suggestedResponse || ""),
      sources: Array.isArray(parsed.sources) ? parsed.sources.map(String) : relevantPolicies.map((p) => p.name),
      requiresHumanReview: Boolean(parsed.requiresHumanReview ?? (Number(parsed.confidence) || 0) < 70),
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
