import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import KPIBox from "../components/KPIBox";
import DynamicChart from "../components/DynamicChart";

const GeneratedDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data =
    location.state || JSON.parse(localStorage.getItem("dashboardData")) || {};

  const selectedTemplate =
    data?.selectedTemplate ||
    JSON.parse(localStorage.getItem("selectedTemplate") || "null");

  console.log("Dashboard Data:", data);
  console.log("Location State:", location.state);
  console.log("Selected Template:", selectedTemplate);

  if (!data || !data.summary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-10">
        <div className="text-center">
          <h1 className="text-red-400 text-3xl font-bold mb-4">
            Dashboard Data Not Found
          </h1>

          <p className="text-gray-400 mb-6">Please upload a dataset first.</p>

          <button
            onClick={() => navigate("/builder")}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl"
          >
            Upload Dataset
          </button>

          <pre className="bg-white/10 p-4 rounded-xl text-xs overflow-auto max-w-xl mt-6 text-left">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">📊 AI Generated Dashboard</h1>

        {selectedTemplate && (
          <p className="text-cyan-400 mt-2">
            Template: {selectedTemplate.title || selectedTemplate.name}
          </p>
        )}
      </div>

      {/* KPI SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KPIBox title="Rows" value={data.summary?.rows || 0} />

        <KPIBox title="Columns" value={data.summary?.columns || 0} />

        <KPIBox
          title="Numeric Fields"
          value={data.summary?.numeric_columns?.length || 0}
        />

        <KPIBox
          title="Categories"
          value={data.summary?.categorical_columns?.length || 0}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <ChartCard title="Bar Chart">
          {data?.charts?.bar_chart ? (
            <DynamicChart chart={data.charts.bar_chart} />
          ) : (
            <EmptyChart />
          )}
        </ChartCard>

        <ChartCard title="Pie Chart">
          {data?.charts?.pie_chart ? (
            <DynamicChart chart={data.charts.pie_chart} />
          ) : (
            <EmptyChart />
          )}
        </ChartCard>

        <ChartCard title="Line Chart">
          {data?.charts?.line_chart ? (
            <DynamicChart chart={data.charts.line_chart} />
          ) : (
            <EmptyChart />
          )}
        </ChartCard>

        <ChartCard title="Area Chart">
          {data?.charts?.area_chart ? (
            <DynamicChart chart={data.charts.area_chart} />
          ) : (
            <EmptyChart />
          )}
        </ChartCard>
      </div>

      {/* INSIGHTS */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl mb-10">
        <h2 className="text-2xl font-bold mb-6">📌 AI Insights</h2>

        {!data.insights || data.insights.length === 0 ? (
          <p className="text-gray-300">No insights available.</p>
        ) : (
          data.insights.map((item, index) => (
            <div key={index} className="mb-4 pb-3 border-b border-white/10">
              <h3 className="font-bold text-cyan-400">{item.column}</h3>

              <div className="grid md:grid-cols-4 gap-3 mt-2">
                <p>Total: {item.total}</p>
                <p>Average: {item.average}</p>
                <p>Maximum: {item.maximum}</p>
                <p>Minimum: {item.minimum}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DEBUG DATA */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
        <h2 className="font-bold mb-3">📦 Raw Dashboard Data</h2>

        <pre className="text-xs overflow-auto text-gray-300">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

const ChartCard = ({ title, children }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl">
      <h2 className="font-bold mb-3 text-cyan-400">{title}</h2>
      {children}
    </div>
  );
};

const EmptyChart = () => {
  return (
    <div className="h-64 flex items-center justify-center text-gray-400">
      No Chart Data Available
    </div>
  );
};

export default GeneratedDashboard;
