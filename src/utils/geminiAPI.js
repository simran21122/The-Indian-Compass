export const generateGeminiResponse = async (prompt) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        temperature: 0.7,
        candidate_count: 1,
        max_output_tokens: 500,
      }),
    });

    const data = await response.json();
    // Gemini API returns output text in `candidates[0].output` typically
    return data?.candidates?.[0]?.output || "No response from Gemini API";
  } catch (err) {
    console.error("Gemini API error:", err);
    return "Error generating response";
  }
};
