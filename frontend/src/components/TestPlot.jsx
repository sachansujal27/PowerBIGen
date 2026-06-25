import React from "react";
import Plot from "react-plotly.js";

const TestPlot = () => {
  return (
    <Plot
      data={[
        {
          x: ["A", "B", "C"],
          y: [10, 20, 30],
          type: "bar",
        },
      ]}
      layout={{
        title: "Test Chart",
      }}
    />
  );
};

export default TestPlot;
