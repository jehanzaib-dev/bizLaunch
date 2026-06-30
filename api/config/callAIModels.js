import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load local environmental configuration settings
dotenv.config();

// Throw a distinct error if the developer forgets to add their API keys
if (!process.env.GEMINI_API_KEY) {
  console.error("CRITICAL CONFIG ERROR: process.env.GEMINI_API_KEY is completely missing.");
  process.exit(1);
}

// 1. Initialize a singular, globally accessible official Google GenAI instance
export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const callAIModels = async (systemInstruction, userPrompt) => {
  // A modern, official SDK-supported array targeting stable generation models
  const modelsToTry = ["gemini-3.1-flash-lite","gemini-2.5-flash-lite", "gemini-2.5-flash"];
  
  let currentError = null;

  for (let i = 0; i < modelsToTry.length; i++) {
    const currentModel = modelsToTry[i];
    try {
      console.log(`[Swarm Orchestrator] Attempting generation via model: ${currentModel}`);

      // Call the official generateContent endpoint via the SDK instance
      const response = await ai.models.generateContent({
        model: currentModel,
        contents: userPrompt,
        config: {
          // Tell the system instructions who it should pretend to be
          systemInstruction: systemInstruction,
          // Force the model to answer ONLY in structured JSON strings
          responseMimeType: "application/json",
          temperature: 0.2, // Kept low to enforce strict technical output reliability
        }
      });

      // Parse the incoming text directly into a plain JavaScript Object
      const parsedData = JSON.parse(response.text);
      return parsedData;

    } catch (error) {
      console.warn(`[Swarm Warning] Generation failed for model ${currentModel}: ${error.message}`);
      currentError = error;

      // If we encounter a rate limit (429) or server issue (503), pause briefly before trying backup models
      if (i < modelsToTry.length - 1) {
        const delayMs = (i + 1) * 1500; 
        console.log(`[Swarm Delay] Backing off for ${delayMs}ms before hitting backup model...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  // If every model in our fallback tier structural array breaks down, fail the request transparently
  throw new Error(`All available swarm models exhausted. Primary failure reason: ${currentError.message}`);
};