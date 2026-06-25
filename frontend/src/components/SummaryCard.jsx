import React from "react";

const SummaryCards2 = ({ analysis }) => {
  if (!analysis || !analysis.summary) return null;

  const summaryEntries = Object.entries(analysis.summary);

  return (
    <div className="summary2-container">
      {summaryEntries.map(([key, value]) => (
        <div className="summary2-card" key={key}>
          <h3>{key.replaceAll("_", " ").toUpperCase()}</h3>
          <p>Total: {Math.round(value.total)}</p>
          <p>Average: {Math.round(value.average)}</p>
          <p>Max: {value.max}</p>
          <p>Min: {value.min}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards2;
