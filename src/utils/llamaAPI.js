// AI Cultural Scanner Integration
// Supports multiple AI API providers

// Base64 image to text conversion for vision models
const convertImageToText = (base64Image) => {
  return `data:image/jpeg;base64,${base64Image}`;
};

// 1. OLLAMA (Local Llama Models)
export const generateOllamaResponse = async ({ prompt, image, model = "llama3.2-vision" }) => {
  try {
    const endpoint = "http://localhost:11434/api/generate";
    
    const body = {
      model: model,
      prompt: prompt,
      stream: false,
      ...(image && { 
        images: [image.split(",")[1]] // Remove data URL prefix
      })
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || "No response from Ollama";
  } catch (error) {
    console.error("Ollama API error:", error);
    return "Ollama service unavailable. Please ensure Ollama is running locally.";
  }
};

// DEMO MODE - AI Indian Culture Scanner with detailed structured responses
const getDemoResponse = (prompt) => {
  const culturalDatabase = {
    "taj mahal": {
      subject: "Cultural Site",
      name: "Taj Mahal",
      description: "A 17th-century white marble mausoleum in Agra, built by Mughal emperor Shah Jahan in memory of his wife Mumtaz Mahal between 1632-1653. Recognized as a UNESCO World Heritage Site and one of the Seven Wonders of the World.",
      culturalContext: "Represents the pinnacle of Mughal architecture, combining Persian, Islamic, and Indian architectural styles. The structure features a central dome, four minarets, intricate inlay work, and beautiful gardens. It's a symbol of eternal love and India's rich architectural heritage.",
      extraInsights: "Takes on different hues throughout the day - pinkish in morning, white during day, and golden under moonlight. Over 20,000 artisans worked on its construction. The main dome is 35 meters high and surrounded by four smaller domes."
    },
    
    "kathak": {
      subject: "Classical Dance Form",
      name: "Kathak Dance",
      description: "A classical Indian dance form originating from Northern India, particularly Uttar Pradesh. The word 'Kathak' derives from 'katha' meaning story, as dancers were originally storytellers who narrated tales through dance.",
      culturalContext: "Characterized by intricate footwork, rapid spins (chakkars), graceful hand movements, and facial expressions. Performed to Hindustani classical music with instruments like tabla, harmonium, and sarangi. Dancers wear ghungroo (ankle bells) and elaborate costumes.",
      extraInsights: "Three main gharanas (schools): Lucknow, Jaipur, and Banaras. During Mughal era, it evolved in royal courts. Famous practitioners include Pandit Birju Maharaj and Shambhu Maharaj."
    },
    
    "diwali": {
      subject: "Festival",
      name: "Diwali (Festival of Lights)",
      description: "A five-day Hindu festival celebrating the victory of light over darkness, good over evil. Observed in autumn, it commemorates Lord Rama's return to Ayodhya after defeating Ravana, and Goddess Lakshmi's blessings for prosperity.",
      culturalContext: "Celebrated by lighting diyas (oil lamps), decorating homes with rangoli, bursting fireworks, exchanging sweets, and offering prayers to Lakshmi and Ganesha. Houses and streets are illuminated with lights and decorations.",
      extraInsights: "Also celebrated by Jains (Mahavira's nirvana), Sikhs (Bandi Chhor Divas), and Buddhists. Different regions have unique traditions - Bengal celebrates Kali Puja, South India honors different deities. Major shopping season in India."
    },
    
    "temple": {
      subject: "Cultural Site",
      name: "Hindu Temple Architecture",
      description: "Sacred structures dedicated to Hindu deities, featuring distinctive architectural elements like shikhara (spire), mandapa (pillared hall), garbhagriha (sanctum), and intricate sculptures depicting gods, goddesses, and mythological scenes.",
      culturalContext: "Different regional styles include Nagara (North Indian), Dravidian (South Indian), and Vesara (Deccan). Built using principles of Vastu Shastra. Centers of community life, learning, and cultural activities.",
      extraInsights: "Famous examples: Khajuraho (UNESCO site), Konark Sun Temple, Brihadeeswarar Temple. Many temples are over 1000 years old, showcasing ancient engineering and artistic mastery."
    },
    
    "holi": {
      subject: "Festival",
      name: "Holi (Festival of Colors)",
      description: "A vibrant spring festival celebrating the victory of good over evil, commemorating the story of Prahlad and Holika. People throw colored powders (gulal) and water at each other in joyous celebration.",
      culturalContext: "Begins with Holika Dahan (bonfire) on the eve, followed by Rangwali Holi where people play with colors. Traditional foods include gujiya, thandai, and dahi bhalla. Celebrated across India with regional variations.",
      extraInsights: "Associated with Krishna's playful nature in Vrindavan and Mathura. Braj region celebrations are world-famous. Also celebrates the love story of Radha and Krishna. Colors originally came from natural sources like turmeric and neem."
    },
    
    "classical music": {
      subject: "Musical Tradition",
      name: "Indian Classical Music",
      description: "Ancient musical tradition with two main systems: Hindustani (North Indian) and Carnatic (South Indian). Based on ragas (melodic frameworks) and talas (rhythmic cycles), emphasizing improvisation and spiritual expression.",
      culturalContext: "Performed with instruments like sitar, tabla, veena, mridangam, and vocals. Guru-shishya parampara (teacher-student tradition) preserves knowledge. Concerts often held in temples, royal courts, and modern concert halls.",
      extraInsights: "Over 400 ragas exist, each associated with specific times, seasons, and emotions. Legends like Tansen in Akbar's court could allegedly light lamps with Raga Deepak. UNESCO recognizes it as Intangible Cultural Heritage."
    },
    
    "bharatanatyam": {
      subject: "Classical Dance Form",
      name: "Bharatanatyam",
      description: "Ancient classical dance form from Tamil Nadu, traditionally performed in Hindu temples. Combines nritta (pure dance), nritya (expressive dance), and natya (drama) to tell stories from Hindu epics and puranas.",
      culturalContext: "Characterized by fixed upper torso, bent legs, intricate hand gestures (mudras), and expressive eye movements. Dancers wear traditional costumes with elaborate jewelry and temple bells. Performed to Carnatic music.",
      extraInsights: "Codified by sage Bharata in Natya Shastra (ancient treatise). Revived in 20th century by pioneers like Rukmini Devi Arundale. Training typically begins in childhood and takes years to master."
    },
    
    "indian food": {
      subject: "Culinary Tradition",
      name: "Indian Cuisine",
      description: "Diverse culinary traditions varying by region, characterized by extensive use of spices, herbs, vegetables, and grains. Each state has distinct flavors - from spicy Rajasthani cuisine to coconut-rich Kerala dishes.",
      culturalContext: "Cooking methods include tandoor (clay oven), dum (slow cooking), and tempering. Meals often served on banana leaves or thali plates. Food is deeply connected to festivals, rituals, and hospitality traditions.",
      extraInsights: "Uses over 50 different spices like turmeric, cardamom, and saffron. Ayurveda influences cooking with emphasis on balancing six tastes. Vegetarianism is widely practiced, leading to creative plant-based dishes."
    }
  };

  // Extract keywords from prompt
  const keywords = prompt.toLowerCase();
  
  // Find best match
  for (const [key, data] of Object.entries(culturalDatabase)) {
    if (keywords.includes(key.replace(" ", "")) || keywords.includes(key)) {
      return formatCulturalResponse(data);
    }
  }
  
  // Check for broader categories
  if (keywords.includes("dance")) {
    return formatCulturalResponse(culturalDatabase["bharatanatyam"]);
  }
  if (keywords.includes("festival")) {
    return formatCulturalResponse(culturalDatabase["diwali"]);
  }
  if (keywords.includes("temple") || keywords.includes("architecture")) {
    return formatCulturalResponse(culturalDatabase["temple"]);
  }
  if (keywords.includes("food") || keywords.includes("cuisine")) {
    return formatCulturalResponse(culturalDatabase["indian food"]);
  }
  if (keywords.includes("music")) {
    return formatCulturalResponse(culturalDatabase["classical music"]);
  }
  
  // Default comprehensive response
  return `**Subject:** Cultural Heritage

**Name:** Indian Cultural Element

**Description:** This appears to be related to India's magnificent cultural heritage. India's civilization spans over 5,000 years, encompassing diverse traditions, languages, arts, and customs that have evolved across different regions and dynasties.

**Cultural Context:** Indian culture is characterized by its unity in diversity, with 28 states each contributing unique elements - from architectural marvels like temples and palaces to performing arts like classical dance and music, vibrant festivals celebrating seasonal cycles, and rich culinary traditions using aromatic spices and regional ingredients.

**Extra Insights:** India is home to 40 UNESCO World Heritage Sites, over 1,600 languages, multiple classical dance forms, and countless festivals. The concept of "Vasudhaiva Kutumbakam" (the world is one family) reflects Indian philosophy of universal brotherhood and cultural exchange.`;
};

const formatCulturalResponse = (data) => {
  return `**Subject:** ${data.subject}

**Name:** ${data.name}

**Description:** ${data.description}

**Cultural Context:** ${data.culturalContext}

**Extra Insights:** ${data.extraInsights}`;
};

// GOOGLE GEMINI API (FREE TIER - RECOMMENDED)
export const generateGeminiResponse = async ({ prompt, image }) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log("Gemini API Key check:", apiKey ? "Found" : "Missing");
    
    if (!apiKey) {
      console.log("🎭 No Gemini API key - using demo mode");
      return getDemoResponse(prompt);
    }

    // Enhanced cultural analysis prompt
    const culturalPrompt = `You are an AI Indian Culture Scanner. Your task is to carefully analyze any image or text provided and give a detailed explanation about it.

When given content, you should:
1. Identify the subject – Detect whether it represents a cultural site, festival, dance form, attire, food, or any other element of Indian heritage.
2. Name it precisely – Provide the exact name (e.g., Taj Mahal, Kathak Dance, Onam Festival, Masala Dosa, Durga Puja, etc.).
3. Describe its background – Explain its history, significance, region of origin, and importance in Indian culture.
4. Expand with context – Mention related cultural details.
5. Provide extra insights – Include interesting facts, myths, festivals associated, or UNESCO heritage status.

Format your response as:
**Subject:** [Category]
**Name:** [Specific Name]
**Description:** [Background and history]
**Cultural Context:** [Related details and significance]
**Extra Insights:** [Interesting facts and additional information]

User query: ${prompt}`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    let requestBody;
    
    if (image) {
      // Handle image + text
      requestBody = {
        contents: [{
          parts: [
            { text: culturalPrompt },
            { 
              inline_data: {
                mime_type: "image/jpeg",
                data: image.split(',')[1] // Remove data:image/jpeg;base64, prefix
              }
            }
          ]
        }]
      };
    } else {
      // Handle text only
      requestBody = {
        contents: [{
          parts: [{ text: culturalPrompt }]
        }]
      };
    }

    console.log("Making Gemini request...");

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("Gemini Response status:", response.status);

    if (!response.ok) {
      console.error("Gemini API Error - falling back to demo mode");
      const errorText = await response.text();
      console.error("Error details:", errorText);
      return `🎭 Demo Mode: ${getDemoResponse(prompt)}`;
    }

    const data = await response.json();
    console.log("Gemini response received");
    
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
      const result = data.candidates[0].content.parts[0].text;
      console.log("Returning Gemini result");
      return result;
    } else {
      console.error("Unexpected Gemini response format");
      return `🎭 Demo Mode: ${getDemoResponse(prompt)}`;
    }
    
  } catch (error) {
    console.error("Gemini API error - using demo mode:", error);
    return `🎭 Demo Mode: ${getDemoResponse(prompt)}`;
  }
};

// OPENAI GPT-4 VISION API (Most reliable option)
export const generateOpenAIResponse = async ({ prompt, image }) => {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    console.log("OpenAI API Key check:", apiKey ? "Found" : "Missing");
    
    if (!apiKey) {
      console.log("🎭 No OpenAI API key - using demo mode");
      return getDemoResponse(prompt);
    }

    const endpoint = "https://api.openai.com/v1/chat/completions";
    
    // Enhanced cultural analysis prompt
    const culturalPrompt = `You are an AI Indian Culture Scanner. Your task is to carefully analyze any image or text provided and give a detailed explanation about it.

When given content, you should:
1. Identify the subject – Detect whether it represents a cultural site, festival, dance form, attire, food, or any other element of Indian heritage.
2. Name it precisely – Provide the exact name (e.g., Taj Mahal, Kathak Dance, Onam Festival, Masala Dosa, Durga Puja, etc.).
3. Describe its background – Explain its history, significance, region of origin, and importance in Indian culture.
4. Expand with context – Mention related cultural details.
5. Provide extra insights – Include interesting facts, myths, festivals associated, or UNESCO heritage status.

Format your response as:
**Subject:** [Category]
**Name:** [Specific Name]
**Description:** [Background and history]
**Cultural Context:** [Related details and significance]
**Extra Insights:** [Interesting facts and additional information]

User query: ${prompt}`;

    const messages = [{
      role: "user",
      content: image ? [
        { type: "text", text: culturalPrompt },
        { type: "image_url", image_url: { url: image } }
      ] : culturalPrompt
    }];

    const requestBody = {
      model: "gpt-4o", // GPT-4 with vision
      messages: messages,
      max_tokens: 500,
      temperature: 0.7
    };

    console.log("Making OpenAI request...");

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("OpenAI Response status:", response.status);

    if (!response.ok) {
      console.error("OpenAI API Error - falling back to demo mode");
      const errorText = await response.text();
      console.error("Error details:", errorText);
      return `🎭 Demo Mode: ${getDemoResponse(prompt)}`;
    }

    const data = await response.json();
    console.log("OpenAI response received");
    
    if (data.choices && data.choices.length > 0) {
      const result = data.choices[0].message.content;
      console.log("Returning OpenAI result");
      return result;
    } else {
      console.error("Unexpected OpenAI response format");
      return `🎭 Demo Mode: ${getDemoResponse(prompt)}`;
    }
    
  } catch (error) {
    console.error("OpenAI API error - using demo mode:", error);
    return `🎭 Demo Mode: ${getDemoResponse(prompt)}`;
  }
};

// 2. HUGGING FACE (Llama via HF Inference API) - WITH DEMO FALLBACK
export const generateHuggingFaceResponse = async ({ prompt, image, model = "meta-llama/Llama-3.2-3B-Instruct" }) => {
  try {
    const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
    console.log("HuggingFace API Key check:", apiKey ? "Found" : "Missing");
    
    if (!apiKey) {
      console.log("🎭 No API key - using demo mode");
      return getDemoResponse(prompt);
    }

    const endpoint = `https://api-inference.huggingface.co/models/${model}`;
    console.log("Making request to:", endpoint);
    
    // Create enhanced prompt for cultural analysis
    const enhancedPrompt = `You are an AI Indian Culture Scanner. Your task is to carefully analyze any image or text provided and give a detailed explanation about it.

When given content, you should:
1. Identify the subject – Detect whether it represents a cultural site, festival, dance form, attire, food, or any other element of Indian heritage.
2. Name it precisely – Provide the exact name (e.g., Taj Mahal, Kathak Dance, Onam Festival, Masala Dosa, Durga Puja, etc.).
3. Describe its background – Explain its history, significance, region of origin, and importance in Indian culture.
4. Expand with context – Mention related cultural details.
5. Provide extra insights – Include interesting facts, myths, festivals associated, or UNESCO heritage status.

Format your response as:
**Subject:** [Category]
**Name:** [Specific Name]
**Description:** [Background and history]
**Cultural Context:** [Related details and significance]
**Extra Insights:** [Interesting facts and additional information]

User query: ${prompt}`;
    
    const requestBody = {
      inputs: enhancedPrompt,
      parameters: {
        max_new_tokens: 200,
        temperature: 0.7,
        do_sample: true,
        return_full_text: false
      }
    };

    console.log("Request body:", requestBody);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      console.error("HuggingFace API Error - falling back to demo mode");
      return `🎭 Demo Mode: ${getDemoResponse(prompt)}`;
    }

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Parse error - using demo mode");
      return `🎭 Demo Mode: ${getDemoResponse(prompt)}`;
    }
    
    // Handle different response formats
    if (Array.isArray(data) && data.length > 0) {
      const result = data[0].generated_text || data[0].text || getDemoResponse(prompt);
      return result;
    } else if (data.generated_text) {
      return data.generated_text;
    } else if (data.text) {
      return data.text;
    } else {
      return `🎭 Demo Mode: ${getDemoResponse(prompt)}`;
    }
    
  } catch (error) {
    console.error("HuggingFace API error - using demo mode:", error);
    return `🎭 Demo Mode: ${getDemoResponse(prompt)}`;
  }
};

// 3. TOGETHER AI (Llama via Together)
export const generateTogetherResponse = async ({ prompt, image, model = "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo" }) => {
  try {
    const apiKey = import.meta.env.VITE_TOGETHER_API_KEY;
    if (!apiKey) {
      throw new Error("Together AI API key not found");
    }

    const endpoint = "https://api.together.xyz/v1/chat/completions";
    
    // Enhanced cultural analysis prompt
    const culturalPrompt = `You are an AI Indian Culture Scanner. Your task is to carefully analyze any image or text provided and give a detailed explanation about it.

When given content, you should:
1. Identify the subject – Detect whether it represents a cultural site, festival, dance form, attire, food, or any other element of Indian heritage.
2. Name it precisely – Provide the exact name (e.g., Taj Mahal, Kathak Dance, Onam Festival, Masala Dosa, Durga Puja, etc.).
3. Describe its background – Explain its history, significance, region of origin, and importance in Indian culture.
4. Expand with context – Mention related cultural details.
5. Provide extra insights – Include interesting facts, myths, festivals associated, or UNESCO heritage status.

Format your response as:
**Subject:** [Category]
**Name:** [Specific Name]
**Description:** [Background and history]
**Cultural Context:** [Related details and significance]
**Extra Insights:** [Interesting facts and additional information]

User query: ${prompt}`;
    
    const messages = [{
      role: "user",
      content: image ? [
        { type: "text", text: culturalPrompt },
        { type: "image_url", image_url: { url: image } }
      ] : culturalPrompt
    }];

    const body = {
      model: model,
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
      stream: false
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Together AI error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "No response from Together AI";
  } catch (error) {
    console.error("Together AI error:", error);
    return "Together AI unavailable. Please check your API key.";
  }
};

// 4. REPLICATE (Llama via Replicate)
export const generateReplicateResponse = async ({ prompt, image, model = "meta/llama-2-70b-chat" }) => {
  try {
    const apiKey = import.meta.env.VITE_REPLICATE_API_TOKEN;
    if (!apiKey) {
      throw new Error("Replicate API token not found");
    }

    const endpoint = "https://api.replicate.com/v1/predictions";
    
    const body = {
      version: "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
      input: {
        prompt: prompt,
        max_new_tokens: 500,
        temperature: 0.7,
        ...(image && { image: image })
      }
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Replicate API error: ${response.status}`);
    }

    const prediction = await response.json();
    
    // Poll for completion
    let result = prediction;
    while (result.status === "starting" || result.status === "processing") {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: { "Authorization": `Token ${apiKey}` }
      });
      result = await pollResponse.json();
    }

    return result.output?.join("") || "No response from Replicate";
  } catch (error) {
    console.error("Replicate API error:", error);
    return "Replicate API unavailable. Please check your API token.";
  }
};

// 5. UNIFIED AI RESPONSE (Tries multiple providers)
export const generateLlamaResponse = async ({ prompt, image, preferredProvider = "gemini" }) => {
  // Enhanced prompt for cultural analysis
  const culturalPrompt = `As an expert in Indian culture and heritage, analyze this ${image ? "image" : "query"} and provide detailed information about:

1. Cultural significance and historical context
2. Regional origin and traditional importance  
3. Artistic or architectural details
4. Historical period and cultural practices
5. Related festivals, rituals, or traditions

Query/Description: ${prompt}

Please provide a comprehensive but concise analysis in 3-4 paragraphs.`;

  const providers = {
    gemini: generateGeminiResponse,
    openai: generateOpenAIResponse,
    ollama: generateOllamaResponse,
    huggingface: generateHuggingFaceResponse,
    together: generateTogetherResponse,
    replicate: generateReplicateResponse
  };

  // Try preferred provider first
  if (providers[preferredProvider]) {
    try {
      const result = await providers[preferredProvider]({ 
        prompt: culturalPrompt, 
        image,
        model: getModelForProvider(preferredProvider, !!image)
      });
      
      if (!result.includes("unavailable") && !result.includes("error")) {
        return result;
      }
    } catch (error) {
      console.warn(`${preferredProvider} failed, trying fallback providers:`, error);
    }
  }

  // Try fallback providers
  const fallbackOrder = ["gemini", "openai", "together", "huggingface", "ollama", "replicate"];
  for (const provider of fallbackOrder) {
    if (provider === preferredProvider) continue;
    
    try {
      const result = await providers[provider]({ 
        prompt: culturalPrompt, 
        image,
        model: getModelForProvider(provider, !!image)
      });
      
      if (!result.includes("unavailable") && !result.includes("error")) {
        return `${result}\n\n*Powered by ${provider.toUpperCase()} + Llama*`;
      }
    } catch (error) {
      console.warn(`${provider} also failed:`, error);
    }
  }

  return "All Llama providers are currently unavailable. Please try again later or check your API configurations.";
};

// Helper function to get appropriate model for each provider
const getModelForProvider = (provider, hasImage) => {
  const models = {
    ollama: hasImage ? "llama3.2-vision:11b" : "llama3.2:8b",
    huggingface: "meta-llama/Llama-3.2-3B-Instruct", // Using text model for better compatibility
    together: hasImage ? "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo" : "meta-llama/Llama-3.2-8B-Instruct-Turbo",
    replicate: "meta/llama-2-70b-chat"
  };
  
  return models[provider];
};

// Provider availability checker
export const checkLlamaProviders = async () => {
  console.log("=== Checking AI Providers ===");
  
  // Check environment variables
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const hfKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  const togetherKey = import.meta.env.VITE_TOGETHER_API_KEY;
  const replicateKey = import.meta.env.VITE_REPLICATE_API_TOKEN;
  
  console.log("Environment variables:");
  console.log("- VITE_GEMINI_API_KEY:", geminiKey ? "✅ Present" : "❌ Missing");
  console.log("- VITE_OPENAI_API_KEY:", openaiKey ? "✅ Present" : "❌ Missing");
  console.log("- VITE_HUGGINGFACE_API_KEY:", hfKey ? "✅ Present" : "❌ Missing");
  console.log("- VITE_TOGETHER_API_KEY:", togetherKey ? "✅ Present" : "❌ Missing");
  console.log("- VITE_REPLICATE_API_TOKEN:", replicateKey ? "✅ Present" : "❌ Missing");
  
  const status = {
    gemini: false,
    openai: false,
    ollama: false,
    huggingface: false,
    together: false,
    replicate: false
  };

  // Always enable Gemini (best free option, with demo fallback)
  status.gemini = true;
  if (geminiKey) {
    console.log("✅ Gemini: Available (FREE API key found) - RECOMMENDED");
  } else {
    console.log("✅ Gemini: Available (Demo mode) - Get free API key!");
  }

  // Always enable OpenAI (most reliable, with demo fallback)
  status.openai = true;
  if (openaiKey) {
    console.log("✅ OpenAI: Available (API key found) - PAID");
  } else {
    console.log("✅ OpenAI: Available (Demo mode) - Requires payment");
  }

  // Always enable HuggingFace (we have demo mode as fallback)
  status.huggingface = true;
  if (hfKey) {
    console.log("✅ HuggingFace: Available (API key found)");
  } else {
    console.log("✅ HuggingFace: Available (Demo mode)");
  }

  // Enable other providers if they have API keys
  if (togetherKey) {
    status.together = true;
    console.log("✅ Together AI: Available (API key found)");
  } else {
    console.log("❌ Together AI: No API key");
  }

  if (replicateKey) {
    status.replicate = true;
    console.log("✅ Replicate: Available (API key found)");
  } else {
    console.log("❌ Replicate: No API key");
  }

  // Check Ollama availability
  try {
    const response = await fetch("http://localhost:11434/api/tags", { 
      method: "GET",
      signal: AbortSignal.timeout(2000) // 2 second timeout
    });
    status.ollama = response.ok;
    console.log(response.ok ? "✅ Ollama: Available (local)" : "❌ Ollama: Not running");
  } catch {
    status.ollama = false;
    console.log("❌ Ollama: Not available (install or start Ollama)");
  }

  const availableCount = Object.values(status).filter(Boolean).length;
  console.log(`\n📊 Summary: ${availableCount} providers available`);
  console.log("Provider status:", status);
  
  return status;
};

export default generateLlamaResponse;