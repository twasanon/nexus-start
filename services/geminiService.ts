import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Note: In a real production deployment for a public app, 
// you wouldn't expose the key directly. 
// However, for a personal start page, expecting process.env.API_KEY is standard.

export const quickAskGemini = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    return "API Key missing. Please configure process.env.API_KEY.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 150, // Keep it brief for a start page widget
        systemInstruction: "You are a concise, helpful dashboard assistant. Give short, direct answers suitable for a quick look widget.",
      }
    });
    
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to Gemini.";
  }
};
