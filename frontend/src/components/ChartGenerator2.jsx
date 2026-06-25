import React from "react";
import Chart from "react-apexcharts";

const ChartGenerator2 = ({
  data,
  analysis,
  mode,
  chartType,
  xColumn,
  yColumn,
}) => {
  if (!data || data.length === 0 || !analysis) return null;

  const textColumns = analysis.textColumns || [];
  const numericColumns = analysis.numericColumns || [];

  const autoX = textColumns[0] || analysis.columns[0];
  const autoY = numericColumns[0];

  const finalX = mode === "choice" ? xColumn : autoX;
  const finalY = mode === "choice" ? yColumn : autoY;
  const finalChart = mode === "choice" ? chartType : "bar";

  if (!finalX || !finalY) {
    return (
      <div className="w-[88%] mx-auto my-9 p-9 rounded-[28px] bg-white/95 text-gray-900 shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Chart Preview
        </h2>
        <p>Not enough valid columns to generate chart.</p>
      </div>
    );
  }

  const labels = data.map((row, index) => row[finalX] || `Row ${index + 1}`);
  const values = data.map((row) => Number(row[finalY]) || 0);

  const commonOptions = {
    chart: {
      type: finalChart,
      toolbar: { show: true },
      animations: { enabled: true, speed: 900 },
      background: "transparent",
    },
    theme: { mode: "light" },
    colors: ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"],
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "45%",
        distributed: finalChart === "bar",
      },
    },
    xaxis: {
      categories: labels,
      labels: {
        rotate: -30,
        style: {
          colors: "#334155",
          fontSize: "13px",
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#334155",
          fontSize: "13px",
        },
      },
    },
    title: {
      text: `${finalY.toUpperCase()} by ${finalX.toUpperCase()}`,
      align: "center",
      style: {
        fontSize: "24px",
        fontWeight: 800,
        color: "#111827",
      },
    },
    tooltip: { enabled: true, theme: "dark" },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 4,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
  };

  const series = [
    {
      name: finalY,
      data: values,
    },
  ];

  const pieOptions = {
    labels,
    colors: ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#9333ea"],
    title: {
      text: `${finalY.toUpperCase()} Distribution`,
      align: "center",
      style: {
        fontSize: "24px",
        fontWeight: 800,
      },
    },
    legend: { position: "bottom" },
  };

  return (
    <div className="w-[88%] mx-auto my-9 p-9 rounded-[28px] bg-white/95 text-gray-900 shadow-[0_25px_70px_rgba(0,0,0,0.35)] overflow-hidden">
      <div className="mb-5">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Generated Visualization
        </h2>
        <p className="text-slate-600 text-base font-semibold">
          Showing <b>{finalY}</b> based on <b>{finalX}</b>
        </p>
      </div>

      {finalChart === "pie" ? (
        <Chart options={pieOptions} series={values} type="pie" height={430} />
      ) : (
        <Chart
          options={commonOptions}
          series={series}
          type={finalChart}
          height={430}
        />
      )}
    </div>
  );
};

export default ChartGenerator2;
