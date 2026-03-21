import { cultureKnowledge } from "./cultureKnowledge";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

/* ---------- GREETING DETECTION ---------- */
function isGreeting(text) {
  const greetings = ["hi", "hello", "hey", "namaste", "good morning", "good evening"];
  return greetings.some(g => text.includes(g));
}

/* ---------- SMART GREETING ---------- */
function getGreetingResponse() {
  const responses = [
    "Hey! 😊 What would you like to explore today?",
    "Hi there! Curious about Indian culture?",
    "Hello! I can help you discover festivals, art, and traditions.",
    "Namaste 🙏 What cultural topic are you interested in?"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

/* ---------- CASUAL CHAT ---------- */
function isCasual(text) {
  const casual = ["how are you", "what's up", "thanks", "thank you", "ok", "bye"];
  return casual.some(c => text.includes(c));
}

function getCasualResponse(text) {
  if (text.includes("how are you")) return "I'm doing great! 😊 Ready to explore something interesting with you.";
  if (text.includes("thanks") || text.includes("thank you")) return "You're welcome! 🙌 Happy to help.";
  if (text.includes("bye")) return "Bye! 👋 Come back anytime to explore more culture.";
  return "Got it! 👍 Let me know what you'd like to explore.";
}

/* ---------- NON-CULTURAL RESPONSE ---------- */
function getNonCulturalResponse() {
  const responses = [
    "That doesn’t seem related to Indian culture. You can ask about festivals, temples, art, or food 😊",
    "I focus on Indian culture topics. Try asking about traditions, heritage, or cuisine 🙌",
    "Hmm, that’s outside my scope. Want to explore Indian culture instead?"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

/* ---------- CULTURAL QUERY DETECTION ---------- */
function isCulturalQuery(text) {

  const keywords = [
    "culture","tradition","heritage","festival","temple",
    "monument","food","dance","music","art","india",
    "indian","history","ritual","tourist","place","market"
  ];

  const keywordMatch = keywords.some(word => text.includes(word));

  const datasetMatch = cultureKnowledge.some(item =>
    item.keywords.some(k => text.includes(k.toLowerCase()))
  );

  return keywordMatch || datasetMatch;
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

/* ---------- RETRIEVAL ---------- */
function retrieveKnowledge(query) {
  const scored = cultureKnowledge.map(item => {
    const combined = item.keywords.join(" ") + " " + item.content;
    return { ...item, score: getSimilarityScore(query, combined) };
  });

  const best = scored.sort((a, b) => b.score - a.score).slice(0, 3);

  if (best[0].score < 5) return null;

  return best.map(i => i.content).join("\n\n");
}

/* ---------- PROMPT BUILDER ---------- */
function buildPrompt(userMessage, context) {
  const tones = [
    "friendly and conversational",
    "warm and engaging",
    "clear and helpful"
  ];

  const tone = tones[Math.floor(Math.random() * tones.length)];

  return context
    ? `
You are a ${tone} assistant explaining Indian culture.

Use the knowledge below but explain it naturally like a human.

${context}

Rules:
- Do NOT copy text directly
- Speak like a real person
- Keep it engaging and simple
- No robotic tone

User: ${userMessage}
`
    : `
You are a ${tone} assistant.

Answer like a human, not a robot.

Focus only on Indian culture topics.

User: ${userMessage}
`;
}

/* ---------- MAIN FUNCTION ---------- */
export async function generateBotReply(userMessage) {

  const cleanMsg = userMessage.toLowerCase().trim();

  // ✅ Greeting
  if (isGreeting(cleanMsg)) {
    return getGreetingResponse();
  }

  // ✅ Casual chat
  if (isCasual(cleanMsg)) {
    return getCasualResponse(cleanMsg);
  }

  // ❌ Non-cultural filter
  if (!isCulturalQuery(cleanMsg)) {
    return getNonCulturalResponse();
  }

  // ✅ Retrieve knowledge
  const context = retrieveKnowledge(userMessage);

  // ✅ Build prompt
  const finalPrompt = buildPrompt(userMessage, context);

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
        max_tokens: 500,
        temperature: 0.9,
        top_p: 0.9
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return "Hmm something didn’t work. Try again?";
    }

    let reply = data.choices?.[0]?.message?.content || "I couldn’t generate a response.";

    // cleanup
    return reply
      .replace(/\*\*/g, "")
      .replace(/\n{3,}/g, "\n\n");

  } catch (err) {
    console.error(err);
    return "I’m having trouble connecting right now. Try again in a bit.";
  }
}