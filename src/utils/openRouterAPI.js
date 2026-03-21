import { cultureKnowledge } from "./cultureKnowledge";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

/* ---------- GREETING CHECK ---------- */

function isGreeting(text) {
  const greetings = ["hi", "hello", "hey", "good morning", "good evening", "namaste"];
  const q = text.toLowerCase().trim();
  return greetings.some(g => q.includes(g));
}

/* ---------- CULTURAL INTENT ---------- */

function isCulturalQuery(text) {
  const cultureKeywords = [
    "culture","tradition","heritage","art","craft","dance","music",
    "song","monument","festival","temple","tourist","place",
    "painting","tribal","architecture"
  ];

  const q = text.toLowerCase();
  return cultureKeywords.some(word => q.includes(word));
}

/* ---------- SMART RAG RETRIEVAL ---------- */
function retrieveKnowledge(query) {
  const q = query.toLowerCase();

  // Score-based matching instead of simple filter
  const scored = cultureKnowledge.map(item => {
    let score = 0;
    item.keywords.forEach(keyword => {
      if (q.includes(keyword)) score += 2;
      if (q.split(" ").includes(keyword)) score += 1;
    });
    return { ...item, score };
  });

  const bestMatches = scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  if (bestMatches.length === 0) return null;

  return bestMatches.map(m => m.content).join("\n\n");
}

/* ---------- MAIN RESPONSE ---------- */

export async function generateOpenRouterResponse({
  prompt,
  image,
  hasImageContext = false
}) {

  /* greeting */
  if (!image && !hasImageContext && isGreeting(prompt)) {
    return "Hello! 😊 I'm your cultural assistant. Upload or scan something to explore its history and meaning.";
  }

  /* block unrelated only if no context */
  if (!image && !hasImageContext && !isCulturalQuery(prompt)) {
    return "I mainly help with Indian culture, art, monuments, festivals, and traditions. Try asking something related 😊";
  }

  /* RAG context */
  const context = retrieveKnowledge(prompt);

  /* dynamic prompt */

  const finalPrompt = `
You are an expert in Indian culture and heritage.

${hasImageContext ? "The user is asking follow-up questions about a previously scanned cultural image." : ""}

Use the knowledge below if relevant.

Knowledge:
${context || "General Indian culture knowledge"}

Instructions:
- Be clear, natural, and helpful
- Avoid repeating previous answers
- Provide detailed explanations when needed
- Keep answers structured and informative
- If it's first response (image), give structured answer

${image ? `
Format:
**Subject:**  
**Name:**  
**Description:**  
**Cultural Context:**  
**Extra Insights:**  
` : ""}

User query:
${prompt}
`;

  let messageContent;

  if (image) {
    messageContent = [
      { type: "text", text: finalPrompt },
      {
        type: "image_url",
        image_url: { url: image }
      }
    ];
  } else {
    messageContent = finalPrompt;
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Indian Culture Assistant"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.2-11b-vision-instruct",
        messages: [
          {
            role: "user",
            content: messageContent
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return "Something went wrong while analyzing. Try again.";
    }

    return data.choices?.[0]?.message?.content || "No response generated.";

  } catch (error) {
    console.error(error);
    return "AI service is currently unavailable.";
  }
}