import { GoogleGenAI } from "@google/genai";

const GEMINI_KEY_STORAGE = 'nexus_gemini_api_key';

// Get stored Gemini API key
export const getGeminiApiKey = (): string | null => {
  return localStorage.getItem(GEMINI_KEY_STORAGE);
};

// Save Gemini API key
export const saveGeminiApiKey = (key: string): void => {
  localStorage.setItem(GEMINI_KEY_STORAGE, key);
};

// Remove Gemini API key
export const removeGeminiApiKey = (): void => {
  localStorage.removeItem(GEMINI_KEY_STORAGE);
};

// Check if key exists
export const hasGeminiApiKey = (): boolean => {
  return !!getGeminiApiKey();
};

export const quickAskGemini = async (prompt: string): Promise<string> => {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    return "API_KEY_REQUIRED";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 150,
        thinkingConfig: { thinkingBudget: 0 },
        systemInstruction: "You are a concise, helpful dashboard assistant. Give short, direct answers suitable for a quick look widget.",
      }
    });
    
    return response.text || "No response generated.";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error?.message?.includes('API key')) {
      removeGeminiApiKey();
      return "API_KEY_INVALID";
    }
    return "Error connecting to Gemini.";
  }
};