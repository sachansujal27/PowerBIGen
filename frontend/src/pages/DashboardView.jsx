import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import KPIBox from "../components/KPIBox";
import DynamicChart from "../components/DynamicChart";

const DashboardView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data =
    location.state?.dashboardData ||
    JSON.parse(localStorage.getItem("dashboardData")) ||
    {};

  console.log("Dashboard Data:", data);

  if (!data || !data.summary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-400 mb-4">
            Dashboard Data Not Found
          </h1>

          <p className="text-slate-400 mb-6">Please upload a dataset first.</p>

          <button
            onClick={() => navigate("/upload")}
            className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700"
          >
            Upload Dataset
          </button>
        </div>
      </div>
    );
  }

  const summary = data.summary || {};
  const charts = data.charts || {};
  const insights = data.insights || [];

  return (
    <div className="min-h-screen bg-[#030712] text-white p-6">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">📊 Generated Dashboard</h1>

        <p className="text-slate-400 mt-2">AI Generated Power BI Dashboard</p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-5 mb-8">
        <KPIBox title="Rows" value={summary.rows || 0} />

        <KPIBox title="Columns" value={summary.columns || 0} />

        <KPIBox
          title="Numeric Fields"
          value={summary.numeric_columns?.length || 0}
        />

        <KPIBox
          title="Categories"
          value={summary.categorical_columns?.length || 0}
        />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {charts.bar_chart && (
          <ChartCard title="Bar Chart">
            <DynamicChart chart={charts.bar_chart} />
          </ChartCard>
        )}

        {charts.line_chart && (
          <ChartCard title="Line Chart">
            <DynamicChart chart={charts.line_chart} />
          </ChartCard>
        )}

        {charts.pie_chart && (
          <ChartCard title="Pie Chart">
            <DynamicChart chart={charts.pie_chart} />
          </ChartCard>
        )}

        {charts.area_chart && (
          <ChartCard title="Area Chart">
            <DynamicChart chart={charts.area_chart} />
          </ChartCard>
        )}
      </div>

      {/* Insights */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-10">
        <h2 className="text-2xl font-bold mb-5">AI Insights</h2>

        {insights.length === 0 ? (
          <p className="text-slate-400">No insights available.</p>
        ) : (
          insights.map((item, index) => (
            <div key={index} className="border-b border-slate-800 py-4">
              <h3 className="text-cyan-400 font-semibold">{item.column}</h3>

              <div className="grid md:grid-cols-4 gap-3 mt-2 text-sm">
                <p>Total: {item.total}</p>
                <p>Average: {item.average}</p>
                <p>Maximum: {item.maximum}</p>
                <p>Minimum: {item.minimum}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Debug Data */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="font-bold mb-4">Raw Dashboard Data</h2>

        <pre className="text-xs overflow-auto text-slate-300">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

const ChartCard = ({ title, children }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>

      {children}
    </div>
  );
};

export default DashboardView;
