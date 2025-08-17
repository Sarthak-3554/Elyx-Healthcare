import React, { useState } from "react";
import "./App.css";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function App() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  const fetchBlockData = (episode, blockId) => {
    const dummy = {
      episode,
      blockId,
      conversations: 12,
      avgResponse: "2 hours",
      sicknessDays: 3,
      avgRecovery: "5 days",
    };
    setAnalysisData(dummy);
  };

  return (
    <div className="app">
      <div className="month-grid">
        {months.map((month, idx) => (
          <div
            key={idx}
            className={`month-card ${selectedMonth === month ? "active" : ""}`}
            onClick={() => {
              setSelectedMonth(month);
              setAnalysisData(null);
            }}
          >
            {month}
          </div>
        ))}
      </div>

      <div className="user-analytics">
        <div className="user-data">User Data (placeholder)</div>
        <div className="analytics">
          <h4>Some Analytics:</h4>
          <ul>
            <li>Total conversations</li>
            <li>Average response time from Elyx team</li>
            <li>Total sickness days</li>
            <li>Average recovery time</li>
          </ul>
        </div>
      </div>

      {selectedMonth && (
        <div className="heatmaps">
          {["Episode 1", "Episode 2"].map((episode, eIdx) => (
            <div className="episode" key={eIdx}>
              <h3>{episode}</h3>
              <div className="heatmap-grid">
                {[...Array(15)].map((_, bIdx) => (
                  <div
                    key={bIdx}
                    className={`heatmap-block ${analysisData?.episode === episode && analysisData?.blockId === bIdx + 1 ? 'clicked' : ''}`}
                    onClick={() => fetchBlockData(episode, bIdx + 1)}
                  >
                    {bIdx + 1}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {analysisData && (
        <div className="details">
          <h4>Block Details</h4>
          <ul>
            <li>Episode: {analysisData.episode}</li>
            <li>Block: {analysisData.blockId}</li>
            <li>Total Conversations: {analysisData.conversations}</li>
            <li>Avg Response Time: {analysisData.avgResponse}</li>
            <li>Sickness Days: {analysisData.sicknessDays}</li>
            <li>Avg Recovery: {analysisData.avgRecovery}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;