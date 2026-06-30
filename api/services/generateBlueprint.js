import { callAIModels } from "../config/callAIModels.js";

import marketingPrompt from "./prompts/marketingPrompt.js";
import operationsPrompt from "./prompts/operationsPrompt.js";
import financePrompt from "./prompts/financePrompt.js";
import strategyPrompt from "./prompts/strategyPrompt.js";

export const generateBlueprint = async (prompt) => {

  console.log("[Blueprint Service] Launching AI business consultants...");

  // Run all AI consultants simultaneously
  const [
    marketing,
    operations,
    finance,
    strategy
  ] = await Promise.all([

    callAIModels(marketingPrompt, prompt),

    callAIModels(operationsPrompt, prompt),

    callAIModels(financePrompt, prompt),

    callAIModels(strategyPrompt, prompt)

  ]);

  console.log("[Blueprint Service] All consultants completed successfully.");

  // Return one unified business blueprint
  return {
    marketing,
    operations,
    finance,
    strategy,
  };
};