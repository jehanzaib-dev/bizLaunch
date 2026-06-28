import { useState } from "react";
import "./Workspace.css";

export default function Workspace({ blueprint }) {
  const [activeTab, setActiveTab] = useState("marketing");

  const {
    marketing,
    operations,
    finance,
    strategy,
  } = blueprint;

  return (
    <div className="workspaceContainer">

      {/* =========================
          TAB NAVIGATION
      ========================== */}

      <div className="tabBar">

        <button
          className={`tabBtn ${
            activeTab === "marketing" ? "active" : ""
          }`}
          onClick={() => setActiveTab("marketing")}
        >
          📢 Marketing
        </button>

        <button
          className={`tabBtn ${
            activeTab === "operations" ? "active" : ""
          }`}
          onClick={() => setActiveTab("operations")}
        >
          ⚙️ Operations
        </button>

        <button
          className={`tabBtn ${
            activeTab === "finance" ? "active" : ""
          }`}
          onClick={() => setActiveTab("finance")}
        >
          💰 Finance
        </button>

        <button
          className={`tabBtn ${
            activeTab === "strategy" ? "active" : ""
          }`}
          onClick={() => setActiveTab("strategy")}
        >
          🚀 Strategy
        </button>

      </div>

      <div className="tabContent">

        {/* =====================================================
            MARKETING TAB
        ===================================================== */}

        {activeTab === "marketing" && (

          <div className="agentView animateFade">

            {/* BUSINESS SUMMARY */}

            <section className="workspaceSection">

              <h4>Business Summary</h4>

              <div className="summaryCard">
                <p>{marketing?.businessSummary}</p>
              </div>

            </section>

            {/* TARGET AUDIENCE */}

            <section className="workspaceSection">

              <h4>Target Audience</h4>

              <div className="cardGrid">

                {marketing?.targetAudience?.map((item, index) => (

                  <div
                    key={index}
                    className="infoCard"
                  >
                    <span className="cardNumber">
                      {index + 1}
                    </span>

                    <p>{item}</p>

                  </div>

                ))}

              </div>

            </section>

            {/* BRAND IDEAS */}

            <section className="workspaceSection">

              <h4>Brand Ideas</h4>

              <div className="brandGrid">

                {marketing?.brandIdeas?.map((brand, index) => (

                  <div
                    key={index}
                    className="brandCard"
                  >

                    <h5>{brand.name}</h5>

                    <p>{brand.tagline}</p>

                  </div>

                ))}

              </div>

            </section>

            {/* MARKETING STRATEGY */}

            <section className="workspaceSection">

              <h4>Marketing Strategy</h4>

              <div className="timeline">

                {marketing?.marketingStrategy?.map((step, index) => (

                  <div
                    key={index}
                    className="timelineItem"
                  >

                    <div className="timelineBadge">
                      {index + 1}
                    </div>

                    <div className="timelineContent">
                      {step}
                    </div>

                  </div>

                ))}

              </div>

            </section>

          </div>

        )}

        {/* =====================================================
            OPERATIONS TAB
        ===================================================== */}

        {activeTab === "operations" && (

          <div className="agentView animateFade">

            {/* BUSINESS SETUP */}

            <section className="workspaceSection">

              <h4>Business Setup</h4>

              <div className="cardGrid">

                {operations?.businessSetup?.map((item, index) => (

                  <div
                    key={index}
                    className="infoCard"
                  >

                    <span className="cardNumber">
                      {index + 1}
                    </span>

                    <p>{item}</p>

                  </div>

                ))}

              </div>

            </section>

            {/* REQUIRED RESOURCES */}

            <section className="workspaceSection">

              <h4>Required Resources</h4>

              <div className="cardGrid">

                {operations?.requiredResources?.map((item, index) => (

                  <div
                    key={index}
                    className="infoCard"
                  >

                    <span className="cardNumber">
                      {index + 1}
                    </span>

                    <p>{item}</p>

                  </div>

                ))}

              </div>

            </section>

            {/* LAUNCH CHECKLIST */}

            <section className="workspaceSection">

              <h4>Launch Checklist</h4>

              <div className="checklist">

                {operations?.launchChecklist?.map((step, index) => (

                  <div
                    key={index}
                    className="checkItem"
                  >

                    <div className="checkCircle">
                      ✓
                    </div>

                    <span>{step}</span>

                  </div>

                ))}

              </div>

            </section>

            {/* POSSIBLE CHALLENGES */}

            <section className="workspaceSection">

              <h4>Possible Challenges</h4>

              <div className="warningGrid">

                {operations?.possibleChallenges?.map((challenge, index) => (

                  <div
                    key={index}
                    className="warningCard"
                  >

                    <span>⚠️</span>

                    <p>{challenge}</p>

                  </div>

                ))}

              </div>

            </section>

          </div>

        )}
                {/* =====================================================
            FINANCE TAB
        ===================================================== */}

{activeTab === "finance" && (

<div className="agentView animateFade">

  {/* STARTUP BUDGET */}

  <section className="workspaceSection">

  <h4>Estimated Startup Budget</h4>

  <div className="cardGrid">

    {finance?.startupBudget?.map((item, index) => (

      <div
        key={index}
        className="infoCard"
      >

        <span className="cardNumber">
          💵
        </span>

        <h5>{item.category}</h5>

        <h3>{item.estimatedCost}</h3>

        <p>{item.description}</p>

      </div>

    ))}

  </div>

</section>

  {/* REVENUE STREAMS */}

  <section className="workspaceSection">

    <h4>Revenue Streams</h4>

    <div className="cardGrid">

      {finance?.revenueStreams?.map((item, index) => (

        <div
          key={index}
          className="infoCard"
        >

          <span className="cardNumber">
            💰
          </span>

          <p>{item}</p>

        </div>

      ))}

    </div>

  </section>

  {/* PRICING */}

  <section className="workspaceSection">

    <h4>Pricing Suggestions</h4>

    <div className="timeline">

      {finance?.pricingSuggestions?.map((item, index) => (

        <div
          key={index}
          className="timelineItem"
        >

          <div className="timelineBadge">

            {index + 1}

          </div>

          <div className="timelineContent">

            {item}

          </div>

        </div>

      ))}

    </div>

  </section>

  {/* GROWTH */}

  <section className="workspaceSection">

    <h4>Growth Opportunities</h4>

    <div className="cardGrid">

      {finance?.growthOpportunities?.map((item, index) => (

        <div
          key={index}
          className="infoCard"
        >

          <span className="cardNumber">

            📈

          </span>

          <p>{item}</p>

        </div>

      ))}

    </div>

  </section>

  {/* FINANCIAL TIPS */}

  <section className="workspaceSection">

    <h4>Financial Tips</h4>

    <div className="tipGrid">
    {finance?.financialTips?.map((tip, index) => (

<div
  key={index}
  className="infoCard"
>

  <span className="cardNumber">
    💵
  </span>

  <p>{tip}</p>

</div>

))}
      

    </div>

  </section>

</div>

)}

{/* =====================================================
  STRATEGY TAB
===================================================== */}

{activeTab === "strategy" && (

<div className="agentView animateFade">

  {/* BUSINESS MODEL */}

  <section className="workspaceSection">

    <h4>Business Model</h4>

    <div className="summaryCard">

      <p>{strategy?.businessModel}</p>

    </div>

  </section>

  {/* COMPETITIVE ADVANTAGES */}

  <section className="workspaceSection">

    <h4>Competitive Advantages</h4>

    <div className="cardGrid">

      {strategy?.competitiveAdvantages?.map((item, index) => (

        <div
          key={index}
          className="infoCard"
        >

          <span className="cardNumber">

            ⭐

          </span>

          <p>{item}</p>

        </div>

      ))}

    </div>

  </section>

  {/* RISKS */}

  <section className="workspaceSection">

    <h4>Business Risks</h4>

    <div className="warningGrid">

      {strategy?.risks?.map((risk, index) => (

        <div
          key={index}
          className="warningCard"
        >

          <span>

            🚨

          </span>

          <p>{risk}</p>

        </div>

      ))}

    </div>

  </section>

  {/* NEXT 90 DAYS */}

  <section className="workspaceSection">

    <h4>90-Day Action Plan</h4>

    <div className="timeline">

      {strategy?.next90DaysPlan?.map((step, index) => (

        <div
          key={index}
          className="timelineItem"
        >

          <div className="timelineBadge">

            {index + 1}

          </div>

          <div className="timelineContent">

            {step}

          </div>

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