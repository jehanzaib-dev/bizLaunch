import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Workspace from "./components/Workspace/Workspace.jsx";
import "./index.css";

export default function App() {
  // Master state storage holding the combined JSON payload from all 3 AI agents
  const [blueprint, setBlueprint] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="appContainer">
      <header className="appHeader">
        <div className="logoGroup">
          <span className="logoIcon">🤖</span>
          <div>
            <h1>BizLaunch AI</h1>
            <p>Automated Local Business Blueprint Engine</p>
          </div>
        </div>
      </header>

      <main className="appContent">
        {/* Step 1 Input Form: Pass loading states and data setter functions */}
        <Dashboard 
          setBlueprint={setBlueprint} 
          isGenerating={isGenerating} 
          setIsGenerating={setIsGenerating} 
        />

        {/* Step 2 Workspace Panel: Only mounts and shows up once data exists */}
        {blueprint && (
          <Workspace blueprint={blueprint} />
        )}
      </main>
    </div>
  );
}