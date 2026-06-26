import { useState } from "react";
import { generateBlueprintCall } from "../../apiCalls/apiCalls.js";
import "./Dashboard.css";

export default function Dashboard({ setBlueprint, isGenerating, setIsGenerating }) {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
      setError(null);
      setIsGenerating(true);
      setBlueprint(null);
    if (!prompt.trim()) {
      setError("Please describe your business idea first.");
      return;
    }

    try {
      const data = await generateBlueprintCall(prompt);
      setBlueprint(data);

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        "Unable to connect to the Server. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="dashboardContainer">
      <form onSubmit={handleSubmit} className="promptForm">
        <div className="inputGroup">
          <textarea
            placeholder="Describe your business vision or startup idea..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
            className="promptTextarea"
            rows={3}
          />
        </div>

        <button 
  type="submit" 
  disabled={isGenerating} 
  className={`submitBtn ${isGenerating ? "processing" : ""}`}
>
  {isGenerating ? (
    <div className="loaderWrapper">
      <span className="syncSpinner"></span>
      <span>Generating Business Blueprint...</span>
    </div>
  ) : (
    "Generate Startup Blueprint"
  )}
</button>
      </form>

      {error && (
        <div className="errorNotice">
          <span className="errorIcon">⚠️</span>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}