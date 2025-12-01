import { GoogleGenAI } from "@google/genai";

export const quickAskGemini = async (prompt: string): Promise<string> => {
  // @ts-ignore
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return "API Key missing. Create a .env file with API_KEY=your_key_here to use this feature.";
  }

  try {
    // @ts-ignore
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 150, // Keep it brief for a start page widget
        // When setting maxOutputTokens on Gemini 2.5 models, thinkingBudget must also be set.
        // We set it to 0 to disable thinking for lower latency in this widget context.
        thinkingConfig: { thinkingBudget: 0 },
        systemInstruction: "You are a concise, helpful dashboard assistant. Give short, direct answers suitable for a quick look widget.",
      }
    });
    
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to Gemini.";
  }
};