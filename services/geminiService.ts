import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

const getAiClient = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is not defined in the environment.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const initializeChat = (): Chat | null => {
  const ai = getAiClient();
  if (!ai) return null;

  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: "You are Amitosh AI, a sophisticated, witty, and knowledgeable movie and TV show concierge. You love neon aesthetics, cyberpunk themes, and high-quality cinema. You help users decide what to watch based on their mood or preferences. Your tone is cool, slightly futuristic, and helpful. Keep answers concise (under 100 words) but engaging. If asked about recommendations, try to suggest sci-fi, thriller, or visually stunning movies.",
    },
  });
  return chatSession;
};

export const getChatSession = (): Chat | null => {
  if (!chatSession) {
    return initializeChat();
  }
  return chatSession;
};

export const sendMessageStream = async (message: string) => {
  const session = getChatSession();
  if (!session) {
    throw new Error("Chat session could not be initialized. Check API Key.");
  }
  return await session.sendMessageStream({ message });
};