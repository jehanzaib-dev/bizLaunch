import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Ensure the API key exists before the server starts
if (!process.env.GEMINI_API_KEY) {
  console.error("CRITICAL CONFIG ERROR: GEMINI_API_KEY is missing.");
  process.exit(1);
}

// Create one reusable Gemini client
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Helper function for retry delays
const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const callAIModels = async (systemInstruction, userPrompt) => {
  const modelsToTry = [
    "gemini-3.1-flash-lite",
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash",
  ];

  for (let i = 0; i < modelsToTry.length; i++) {
    const currentModel = modelsToTry[i];

    try {
      console.log(
        `[Swarm Orchestrator] Attempting generation via model: ${currentModel}`
      );

      const response = await ai.models.generateContent({
        model: currentModel,
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      return JSON.parse(response.text);

    } catch (error) {
      console.warn(
        `[Swarm Warning] ${currentModel} failed: ${error.message}`
      );

      const isRateLimitedOrBusy = error.status === 429 || error.status === 503;

      const hasMoreFallbacks = i < modelsToTry.length - 1;

      if (isRateLimitedOrBusy && hasMoreFallbacks) {
        const waitTime = (i + 1) * 2000;

        console.log(
          `[Swarm Delay] Waiting ${waitTime}ms before trying ${
            modelsToTry[i + 1]
          }...`
        );

        await delay(waitTime);
        continue;
      }

      // Any non-recoverable error or the last failed model
      throw error;
    }
  }
};