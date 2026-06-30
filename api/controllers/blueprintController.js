import { generateBlueprint } from "../services/generateBlueprint.js";

export const BlueprintController = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate user input
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please describe your business vision or startup idea.",
      });
    }

    console.log(`[BizLaunch] Generating blueprint for: "${prompt}"`);

    // Generate complete business blueprint
    const blueprint = await generateBlueprint(prompt);

    return res.status(200).json({
      success: true,
      blueprint,
    });

  } catch (error) {
    console.error("[BizLaunch Error]", error);

    if (error.status === 503) {
      return res.status(503).json({
        success: false,
        message:
          "The AI service is currently experiencing high demand. Please try again in a few moments.",
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message:
          "AI usage limit reached. Please wait a while before generating another blueprint.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Unable to connect to AI models at the moment. Please try again shortly.",
      error: error.message,
    });
  }
};