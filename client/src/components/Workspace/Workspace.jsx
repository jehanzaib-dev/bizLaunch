import { useState } from "react";
import "./Workspace.css";

export default function Workspace({ blueprint }) {
  // Manage which business consultant's tab view is currently active
  const [activeTab, setActiveTab] = useState("marketing");

  // Destructure our unified payload (mapped seamlessly from the backend)
  const { productManager: marketingData, technicalLead: operationsData, qaEngineer: financeData } = blueprint;

  return (
    <div className="workspaceContainer">
      {/* Tab Navigation Controls */}
      <div className="tabBar">
        <button
          onClick={() => setActiveTab("marketing")}
          className={`tabBtn ${activeTab === "marketing" ? "active" : ""}`}
        >
          📢 Marketing & Branding
        </button>
        <button
          onClick={() => setActiveTab("operations")}
          className={`tabBtn ${activeTab === "operations" ? "active" : ""}`}
        >
          ⚙️ Operations & Logistics
        </button>
        <button
          onClick={() => setActiveTab("finance")}
          className={`tabBtn ${activeTab === "finance" ? "active" : ""}`}
        >
          💰 Financial Strategy
        </button>
      </div>

      {/* Tab Content Display Panels */}
      <div className="tabContent">
        
        {/* VIEW 1: MARKETING & BRANDING */}
        {activeTab === "marketing" && (
          <div className="agentView animateFade">
            <section className="workspaceSection">
              <h4>Market & Brand Strategy</h4>
              <div className="storiesGrid">
                {marketingData?.userStories?.map((item) => (
                  <div key={item.id} className="storyCard">
                    <span className="cardBadge">
                      {item.story.startsWith("Target Audience:") ? "Target Market" : "Brand Identity"}
                    </span>
                    <p>{item.story}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="workspaceSection">
              <h4>Launch Strategy Milestones</h4>
              <ul className="criteriaList">
                {marketingData?.acceptanceCriteria?.map((criterion, idx) => (
                  <li key={idx}>🔹 {criterion}</li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {/* VIEW 2: OPERATIONS & LOGISTICS */}
        {activeTab === "operations" && (
          <div className="agentView animateFade">
            <section className="workspaceSection">
              <h4>Infrastructure & Operational Assets</h4>
              <div className="schemaBox">
                <pre>{operationsData?.databaseSchema}</pre>
              </div>
            </section>

            <section className="workspaceSection">
              <h4>Phased Operational Roadmap</h4>
              <div className="endpointTableWrapper">
                <table className="endpointTable">
                  <thead>
                    <tr>
                      <th>Phase</th>
                      <th>Operational Pillar</th>
                      <th>Execution Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    {operationsData?.apiEndpoints?.map((phase, idx) => (
                      <tr key={idx}>
                        <td>
                          <span className={`methodBadge ${phase.method.replace(/\s+/g, '').toUpperCase()}`}>
                            {phase.method}
                          </span>
                        </td>
                        <td className="codeText">{phase.path}</td>
                        <td>{phase.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 3: FINANCIAL STRATEGY */}
        {activeTab === "finance" && (
          <div className="agentView animateFade">
            <section className="workspaceSection">
              <h4>Financial Feasibility Checklists</h4>
              <ul className="qaList">
                {financeData?.manualTests?.map((checkpoint, idx) => (
                  <li key={idx}>
                    <input type="checkbox" id={`finance-${idx}`} className="qaCheck" />
                    <label htmlFor={`finance-${idx}`}>{checkpoint}</label>
                  </li>
                ))}
              </ul>
            </section>

            <section className="workspaceSection">
              <h4>Risk Mitigation & Blindspots</h4>
              <div className="edgeCaseGrid">
                {financeData?.edgeCases?.map((blindspot, idx) => (
                  <div key={idx} className="edgeCard">
                    <span className="edgeIcon">🔍</span>
                    <p>{blindspot}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

      </div>
    </div>
  );
}