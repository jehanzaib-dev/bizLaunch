import { executeModelWithFallback } from "../config/gemini.js";

/**
 * Orchestrates the BizLaunch AI Multi-Agent Blueprint Engine
 * POST /api/agile/generate
 */
export const generateBlueprint = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ 
        message: "Please describe your business vision or startup idea." 
      });
    }

    console.log(`[BizLaunch Swarm] Launching business analysis for: "${prompt}"`);

    // AGENT 1: BRANDING & MARKETING GURU
    const marketingSystemInstruction = `
      You are an expert Startup Branding Consultant and Growth Marketer. Analyze the user's business idea.
      You MUST respond ONLY with a valid JSON object containing exactly this structure:
      {
        "userStories": [
          { "id": 1, "story": "Target Audience: Detailed profile of who the core customer base is and what they care about." },
          { "id": 2, "story": "Brand Identity: 3 unique, catchy business name ideas with brief taglines." }
        ],
        "acceptanceCriteria": [
          "Launch Strategy Step 1: Local awareness strategy...",
          "Launch Strategy Step 2: Digital marketing channel prioritization..."
        ]
      }
      Do not include markdown blocks (like \`\`\`json) or conversational text outside of the raw JSON object.
    `;

    // AGENT 2: CHIEF OPERATIONS OFFICER
    const operationsSystemInstruction = `
      You are a Senior Retail and Business Operations Specialist. Analyze the user's business idea.
      You MUST respond ONLY with a valid JSON object containing exactly this structure:
      {
        "databaseSchema": "Core Equipment & Space Setup: Itemized list of mandatory equipment, software tools, and spatial layout recommendations.",
        "apiEndpoints": [
          { "method": "PHASE 1", "path": "Licensing & Compliance", "description": "Mandatory standard business licenses, health permits, or registrations required to start legally." },
          { "method": "PHASE 2", "path": "Supply Chain & Logistics", "description": "Key inventory requirements and how to source initial suppliers or raw ingredients." }
        ]
      }
      Do not include markdown blocks or conversational text outside of the raw JSON object.
    `;

    // AGENT 3: FINANCIAL WIZARD
    const financeSystemInstruction = `
      You are a Venture Capitalist and Small Business Financial Advisor. Analyze the user's business idea.
      You MUST respond ONLY with a valid JSON object containing exactly this structure:
      {
        "manualTests": [
          "Estimated Startup Capital: Approximate cost range broken down by rent, equipment, and initial cash reserves.",
          "Revenue Streams: 3 distinct ways this business models its monetization or service tiers."
        ],
        "edgeCases": [
          "Financial Blindspot: How to mitigate high seasonal variance or initial low-foot-traffic months.",
          "Pricing Strategy: Suggested markups or optimal pricing tiers compared to general competitors."
        ]
      }
      Do not include markdown blocks or conversational text outside of the raw JSON object.
    `;

    // Fire all three agents in parallel concurrently
    const [marketingOutput, operationsOutput, financeOutput] = await Promise.all([
      executeModelWithFallback(marketingSystemInstruction, prompt),
      executeModelWithFallback(operationsSystemInstruction, prompt),
      executeModelWithFallback(financeSystemInstruction, prompt)
    ]);

    // Construct the final blueprint object
    const businessBlueprint = {
      productManager: marketingOutput,   // Maps to the existing frontend key
      technicalLead: operationsOutput,    // Maps to the existing frontend key
      qaEngineer: financeOutput          // Maps to the existing frontend key
    };

    return res.status(200).json(businessBlueprint);

  } catch (error) {
    console.error(`[BizLaunch Swarm Error] Blueprint assembly failed:`, error);
    return res.status(500).json({
      message: "The business consulting swarm encountered a structural data error.",
      error: error.message
    });
  }
};