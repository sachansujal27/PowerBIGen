import React from "react";
import Chart from "react-apexcharts";

const DynamicChart = ({ chartData }) => {
  if (!chartData) {
    return <div>No Chart Data</div>;
  }

  const options = {
    chart: {
      toolbar: {
        show: true,
      },
    },

    xaxis: {
      categories: chartData.categories || [],
    },

    labels: chartData.labels || [],

    title: {
      text: chartData.title || "",
    },
  };

  return (
    <Chart
      options={options}
      series={chartData.series || []}
      type={chartData.chartType}
      height={350}
    />
  );
};

export default DynamicChart;
// import React from "react";
// import Plot from "react-plotly.js";

// const DynamicChart = ({ chartData }) => {
//   console.log("Plot Component:", Plot);
//   console.log("Chart Data:", chartData);

//   if (!chartData) {
//     return <div>No chart data</div>;
//   }

//   try {
//     const parsed =
//       typeof chartData === "string" ? JSON.parse(chartData) : chartData;

//     return (
//       <Plot
//         data={parsed.data || []}
//         layout={parsed.layout || {}}
//         style={{
//           width: "100%",
//           height: "400px",
//         }}
//       />
//     );
//   } catch (error) {
//     console.error("Chart Error:", error);

//     return <div className="text-red-500">Chart Error: {error.message}</div>;
//   }
// };

// export default DynamicChart;
