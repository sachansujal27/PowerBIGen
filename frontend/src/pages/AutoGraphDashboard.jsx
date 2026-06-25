import React, { useState } from "react";

import UploadFile2 from "../components/UploadFile2";

import ChartChoice2 from "../components/ChartChoice2";
import ChartGenerator2 from "../components/ChartGenerator2";
import InsightSuggestion2 from "../components/InsightSuggestion2";
import DataPreview2 from "../components/DataPreview2";
import SummaryCards2 from "../components/SummaryCard";

const AutoGraphDashboard = () => {
  const [fileResult, setFileResult] = useState(null);
  const [mode, setMode] = useState("automatic");
  const [chartType, setChartType] = useState("bar");
  const [xColumn, setXColumn] = useState("");
  const [yColumn, setYColumn] = useState("");

  const data = fileResult?.data || [];
  const analysis = fileResult?.analysis || null;

  const handleFileAnalyzed = (result) => {
    setFileResult(result);

    const textCol =
      result.analysis.textColumns?.[0] || result.analysis.columns?.[0] || "";

    const numCol = result.analysis.numericColumns?.[0] || "";

    setXColumn(textCol);
    setYColumn(numCol);
    setMode("automatic");
    setChartType("bar");
  };

  return (
    <div
      className="min-h-screen bg-[#0B1220] text-white"
      style={{
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-8 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div>
              <span className="px-3 py-1 text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md">
                AI ANALYTICS PLATFORM
              </span>

              <h1 className="text-5xl font-bold mt-4">AutoGraph AI</h1>

              <p className="text-slate-400 mt-3 text-lg">
                Upload datasets and automatically generate charts, dashboards
                and insights.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0F172A] border border-[#1F2937] rounded-lg p-4 min-w-[150px]">
                <p className="text-slate-400 text-sm">AI Engine</p>

                <h3 className="text-blue-400 text-xl font-bold mt-2">Active</h3>
              </div>

              <div className="bg-[#0F172A] border border-[#1F2937] rounded-lg p-4 min-w-[150px]">
                <p className="text-slate-400 text-sm">Dashboards</p>

                <h3 className="text-green-400 text-xl font-bold mt-2">
                  Unlimited
                </h3>
              </div>

              <div className="bg-[#0F172A] border border-[#1F2937] rounded-lg p-4 min-w-[150px]">
                <p className="text-slate-400 text-sm">Charts</p>

                <h3 className="text-cyan-400 text-xl font-bold mt-2">25+</h3>
              </div>

              <div className="bg-[#0F172A] border border-[#1F2937] rounded-lg p-4 min-w-[150px]">
                <p className="text-slate-400 text-sm">Insights</p>

                <h3 className="text-yellow-400 text-xl font-bold mt-2">
                  AI Powered
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 mb-6">
          <UploadFile2 onFileAnalyzed={handleFileAnalyzed} />
        </div>

        {!analysis && (
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-20 text-center">
            <div className="w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📊</span>
            </div>

            <h2 className="text-3xl font-bold">Upload Your Dataset</h2>

            <p className="text-slate-400 mt-4 max-w-xl mx-auto">
              Upload CSV, Excel, JSON or PDF files and let AutoGraph AI
              automatically generate visualizations and business insights.
            </p>
          </div>
        )}

        {analysis && (
          <div className="space-y-5">
            {/* Summary */}
            <div>
              <SummaryCards2 analysis={analysis} />
            </div>

            {/* Insights */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 bg-blue-500 rounded-full" />

                <h2 className="text-xl font-semibold">AI Insights</h2>
              </div>

              <InsightSuggestion2 analysis={analysis} data={data} />
            </div>

            {/* Chart Settings */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 bg-green-500 rounded-full" />

                <h2 className="text-xl font-semibold">Chart Configuration</h2>
              </div>

              <ChartChoice2
                mode={mode}
                setMode={setMode}
                chartType={chartType}
                setChartType={setChartType}
                xColumn={xColumn}
                setXColumn={setXColumn}
                yColumn={yColumn}
                setYColumn={setYColumn}
                columns={analysis.columns}
                numericColumns={analysis.numericColumns}
                textColumns={analysis.textColumns}
              />
            </div>

            {/* Charts */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 bg-cyan-500 rounded-full" />

                <h2 className="text-xl font-semibold">Generated Charts</h2>
              </div>

              <ChartGenerator2
                data={data}
                analysis={analysis}
                mode={mode}
                chartType={chartType}
                xColumn={xColumn}
                yColumn={yColumn}
              />
            </div>

            {/* Data Preview */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 bg-yellow-500 rounded-full" />

                <h2 className="text-xl font-semibold">Data Preview</h2>
              </div>

              <DataPreview2 data={data} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoGraphDashboard;
