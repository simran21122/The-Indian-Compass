import { cultureKnowledge } from "./cultureKnowledge";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

/* ---------- GREETING CHECK ---------- */

function isGreeting(text){

const greetings = [
"hi",
"hello",
"hey",
"good morning",
"good evening",
"good afternoon",
"namaste"
];

const q = text.toLowerCase().trim();

return greetings.some(g => q.includes(g));

}

/* ---------- CULTURAL INTENT ---------- */

function isCulturalQuery(text){

const cultureKeywords = [
"culture",
"tradition",
"heritage",
"art",
"craft",
"dance",
"music",
"song",
"monument",
"festival",
"temple",
"tourist",
"place",
"painting",
"tribal",
"architecture"
];

const q = text.toLowerCase();

return cultureKeywords.some(word => q.includes(word));

}

/* ---------- RAG RETRIEVAL ---------- */

function retrieveKnowledge(query){

const q = query.toLowerCase();

const matches = cultureKnowledge.filter(item =>
item.keywords.some(keyword => q.includes(keyword))
);

if(matches.length === 0) return null;

return matches.map(m => m.content).join("\n\n");

}

/* ---------- MAIN RESPONSE ---------- */

export async function generateOpenRouterResponse({ prompt, image }){

/* greeting response */

if(!image && isGreeting(prompt)){
return "Hello! 😊 I'm your cultural assistant. You can ask me about Indian art, crafts, heritage places, traditional dances, monuments, and cultural festivals.";
}

/* non cultural question */

if(!image && !isCulturalQuery(prompt)){
return "I'm mainly here to talk about culture, heritage, art, monuments, festivals, and traditional places. Try asking something related to Indian culture.";
}

/* RAG context */

const context = retrieveKnowledge(prompt);

/* structured prompt */

const finalPrompt = `

You are an expert in Indian culture and heritage.

Use the knowledge below if relevant.

Knowledge:
${context || "General Indian culture knowledge"}

Analyze the query or image and respond in this format:

**Subject:** [Category]

**Name:** [Exact name]

**Description:** [History and background]

**Cultural Context:** [Cultural significance]

**Extra Insights:** [Interesting facts]

User query:
${prompt}

`;

/* message structure */

let messageContent;

if(image){

messageContent = [
{
type:"text",
text:finalPrompt
},
{
type:"image_url",
image_url:{
url:image
}
}
];

}else{

messageContent = finalPrompt;

}

try{

const response = await fetch("https://openrouter.ai/api/v1/chat/completions",{

method:"POST",

headers:{
"Authorization":`Bearer ${API_KEY}`,
"Content-Type":"application/json",
"HTTP-Referer":"http://localhost:5173",
"X-Title":"Indian Culture Assistant"
},

body:JSON.stringify({

model:"meta-llama/llama-3.2-11b-vision-instruct",

messages:[
{
role:"user",
content:messageContent
}
],

max_tokens:500,
temperature:0.7

})

});

const data = await response.json();

if(!response.ok){
console.error(data);
return "Sorry, I couldn't analyze the cultural content right now.";
}

return data.choices?.[0]?.message?.content || "No response generated.";

}catch(error){

console.error(error);

return "AI service is currently unavailable.";

}

}