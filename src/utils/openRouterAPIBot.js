import { cultureKnowledge } from "./cultureKnowledge";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

/* ---------- GREETING ---------- */
function isGreeting(text) {
  const greetings = ["hi", "hello", "hey", "good morning", "good evening", "namaste"];
  const q = text.toLowerCase().trim();
  return greetings.some(g => q.includes(g));
}

/* ---------- CULTURE CHECK ---------- */
function isCulturalQuery(text) {
  const keywords = [
    "culture","tradition","heritage","art","craft","dance","music",
    "song","monument","festival","temple","tourist","place",
    "painting","tribal","architecture"
  ];

  return keywords.some(word => text.toLowerCase().includes(word));
}

/* ---------- SEMANTIC SCORING ---------- */
function getSimilarityScore(query, text) {
  const qWords = query.toLowerCase().split(/\s+/);
  const tWords = text.toLowerCase().split(/\s+/);

  let score = 0;

  qWords.forEach(q => {
    tWords.forEach(t => {
      if (q === t) score += 3;
      else if (q.length > 3 && t.includes(q)) score += 1.5;
      else if (q.length > 4 && t.includes(q.slice(0, 4))) score += 1;
    });
  });

  return score;
}

/* ---------- SEMANTIC RAG RETRIEVAL ---------- */
function retrieveKnowledge(query) {

  const scored = cultureKnowledge.map(item => {
    const combinedText =
      item.keywords.join(" ") + " " + item.content;

    const score = getSimilarityScore(query, combinedText);

    return { ...item, score };
  });

  const bestMatches = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const THRESHOLD = 8; 

  if (bestMatches[0].score < THRESHOLD) return null;

  return bestMatches.map(i => i.content).join("\n\n");
}

/* ---------- MAIN BOT FUNCTION ---------- */
export async function generateBotReply(userMessage) {

  /* greeting */
  if (isGreeting(userMessage)) {
    return "Hello! 😊 Ask me anything about Indian culture, festivals, monuments, or art.";
  }

  const context = retrieveKnowledge(userMessage);

  let finalPrompt = "";

  if (context) {
    // ✅ RAG MODE
    finalPrompt = `
  You are an expert in Indian culture.

  Use ONLY the knowledge provided below.

  Knowledge:
  ${context}

  Instructions:
  - Answer ONLY from the knowledge
  - Do not add outside information
  - Be clear and structured

  User Question:
  ${userMessage}
  `;
  } else {
    // ✅ AI MODE (no RAG)
    finalPrompt = `
  You are an expert in Indian culture.

  Answer the question using your general knowledge.

  Instructions:
  - Be clear and structured
  - Give helpful and accurate info

  User Question:
  ${userMessage}
  `;
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Cultural Chatbot"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.2-11b-vision-instruct",
        messages: [
          { role: "user", content: finalPrompt }
        ],
        max_tokens: 400,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return "Something went wrong. Try again.";
    }

    return data.choices?.[0]?.message?.content || "No response generated.";

  } catch (err) {
    console.error(err);
    return "AI service is unavailable.";
  }
}