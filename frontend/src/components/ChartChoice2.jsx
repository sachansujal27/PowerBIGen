import React from "react";

const ChartChoice2 = ({
  mode,
  setMode,
  chartType,
  setChartType,
  xColumn,
  setXColumn,
  yColumn,
  setYColumn,
  columns,
  numericColumns,
}) => {
  return (
    <div className="w-[88%] mx-auto my-9 p-9 rounded-[28px] bg-white/95 text-gray-900 shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
      <h2 className="text-3xl font-bold text-slate-900 mb-3">
        Chart Generation Mode
      </h2>

      <div className="flex justify-center gap-5 my-6">
        <button
          className={`px-8 py-4 rounded-2xl text-white text-lg font-extrabold transition hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(37,99,235,0.35)] ${
            mode === "automatic"
              ? "bg-linear-to-br from-green-600 to-green-700"
              : "bg-linear-to-br from-blue-600 to-blue-700"
          }`}
          onClick={() => setMode("automatic")}
        >
          Automatic
        </button>

        <button
          className={`px-8 py-4 rounded-2xl text-white text-lg font-extrabold transition hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(37,99,235,0.35)] ${
            mode === "choice"
              ? "bg-linear-to-br from-green-600 to-green-700"
              : "bg-linear-to-br from-blue-600 to-blue-700"
          }`}
          onClick={() => setMode("choice")}
        >
          By Choice
        </button>
      </div>

      {mode === "choice" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <select
            className="p-4 rounded-2xl border-2 border-blue-100 bg-slate-50 text-gray-900 text-base font-bold outline-none focus:border-blue-600 focus:shadow-[0_0_0_5px_rgba(37,99,235,0.15)]"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Circle / Pie Chart</option>
            <option value="area">Area Chart</option>
          </select>

          <select
            className="p-4 rounded-2xl border-2 border-blue-100 bg-slate-50 text-gray-900 text-base font-bold outline-none focus:border-blue-600 focus:shadow-[0_0_0_5px_rgba(37,99,235,0.15)]"
            value={xColumn}
            onChange={(e) => setXColumn(e.target.value)}
          >
            <option value="">Select X Column</option>
            {columns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>

          <select
            className="p-4 rounded-2xl border-2 border-blue-100 bg-slate-50 text-gray-900 text-base font-bold outline-none focus:border-blue-600 focus:shadow-[0_0_0_5px_rgba(37,99,235,0.15)]"
            value={yColumn}
            onChange={(e) => setYColumn(e.target.value)}
          >
            <option value="">Select Y Column</option>
            {numericColumns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>
      )}

      {mode === "automatic" && (
        <p className="w-fit mx-auto mt-5 px-6 py-4 rounded-2xl bg-blue-50 text-blue-800 font-extrabold">
          System will automatically choose chart based on your data columns.
        </p>
      )}
    </div>
  );
};

export default ChartChoice2;
