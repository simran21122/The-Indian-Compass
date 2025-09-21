export const generateGeminiResponse = async ({ prompt, image }) => {
  try {
    // If there’s an image, strip the data URL prefix to get raw base64
    const base64Image = image ? image.split(",")[1] : null;

    // Determine which model and endpoint to use
    const isMultimodal = !!base64Image;
    const model = isMultimodal ? "gemini-2.0-multimodal" : "gemini-2.0-flash";
    const endpoint = isMultimodal
      ? `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
      : import.meta.env.VITE_API_URL;

    // Prepare the request body
    const body = {
      model,
      input: [
        {
          text: prompt,
          ...(base64Image && { image: { imageBytes: base64Image } }),
        },
      ],
      temperature: 0.7,
      candidate_count: 1,
      max_output_tokens: 500,
    };

    const response = await fetch(endpoint + (isMultimodal ? `?key=${import.meta.env.VITE_API_KEY}` : ""), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    // Return the output text from Gemini
    return data?.candidates?.[0]?.output || "No response from Gemini API";
  } catch (err) {
    console.error("Gemini API error:", err);
    return "Error generating response";
  }
};
