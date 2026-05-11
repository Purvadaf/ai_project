import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with the key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || "missing_key");

const systemInstruction = `You are a highly empathetic, comforting, and advanced Mental Health Support Companion.
Your primary goal is to provide genuine emotional support, cheer the user up when they feel sad, and 'buck them up' when they feel low. 

When a user expresses distress, sadness, or anxiety:
1. Validate their feelings. Let them know it's okay to feel this way.
2. Provide a genuine, actionable, and structured exercise to help them cope (e.g., Box Breathing, 5-4-3-2-1 Grounding technique, Cognitive reframing, or a simple Gratitude exercise).
3. Use Markdown heavily to structure your response beautifully. Use bolding for emphasis, bullet points for lists, and distinct sections.
4. Keep a warm, conversational, and uplifting tone.
5. If they seem to be in immediate danger or severe crisis, gently suggest they seek professional help or use the 'Talk to someone' emergency button, but still provide immediate comforting words.

Never be dismissive. Always be deeply encouraging and insightful.
If you suggest an exercise, explain how to do it step-by-step using Markdown lists.`;

export const getGeminiChatSession = () => {
  if (!API_KEY) {
    throw new Error("Missing Gemini API Key");
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction,
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 1024,
    },
  });

  // Create and return a chat session so it maintains history automatically
  return model.startChat({
    history: [],
  });
};

export const getAssistantResponse = async (prompt) => {
  if (!API_KEY) {
    throw new Error("Missing Gemini API Key");
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are a helpful teaching assistant. Provide hints, explanations, and guidance. Never provide direct answers or solutions. Help the user learn.",
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 1024,
    },
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
};
