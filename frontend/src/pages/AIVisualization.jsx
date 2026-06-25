import React from "react";
import {
  Sparkles,
  Brain,
  BarChart3,
  TrendingUp,
  Database,
  Zap,
  Activity,
} from "lucide-react";

import AutoGraphDashboard from "./AutoGraphDashboard";

const AIVisualization = () => {
  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[180px] rounded-full animate-pulse" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[180px] rounded-full animate-pulse" />

        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-blue-500/10 blur-[180px] rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-xl">
            <Sparkles size={16} className="text-cyan-400" />

            <span className="text-cyan-300 text-sm font-medium">
              AI Visualization Studio
            </span>
          </div>

          <h1 className="mt-5 text-5xl md:text-6xl font-bold text-white">
            Auto Graph Generator
          </h1>

          <p className="text-slate-400 text-lg mt-4 max-w-3xl">
            Upload CSV, Excel, JSON or PDF files and let AI automatically
            generate professional charts, reports and business insights.
          </p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 hover:border-cyan-500/30 transition">
            <Brain size={28} className="text-cyan-400 mb-3" />

            <p className="text-slate-400 text-sm">AI Engine</p>

            <h3 className="text-white text-xl font-bold">Active</h3>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 hover:border-purple-500/30 transition">
            <Database size={28} className="text-purple-400 mb-3" />

            <p className="text-slate-400 text-sm">Data Sources</p>

            <h3 className="text-white text-xl font-bold">Unlimited</h3>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 hover:border-green-500/30 transition">
            <BarChart3 size={28} className="text-green-400 mb-3" />

            <p className="text-slate-400 text-sm">Visualizations</p>

            <h3 className="text-white text-xl font-bold">Auto Generated</h3>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 hover:border-yellow-500/30 transition">
            <TrendingUp size={28} className="text-yellow-400 mb-3" />

            <p className="text-slate-400 text-sm">Insights</p>

            <h3 className="text-white text-xl font-bold">AI Powered</h3>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 hover:border-pink-500/30 transition">
            <Zap size={28} className="text-pink-400 mb-3" />

            <p className="text-slate-400 text-sm">Processing</p>

            <h3 className="text-white text-xl font-bold">Realtime</h3>
          </div>
        </div>

        {/* Hero Analytics Banner */}
        <div className="mb-10 rounded-[32px] border border-slate-800 bg-gradient-to-r from-cyan-950/40 via-slate-900/50 to-purple-950/40 backdrop-blur-2xl p-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full mb-4">
                <Activity size={16} className="text-cyan-400" />

                <span className="text-cyan-300 text-sm">
                  Smart Data Analysis
                </span>
              </div>

              <h2 className="text-3xl font-bold text-white">
                AI Powered Analytics Platform
              </h2>

              <p className="text-slate-400 mt-3 max-w-2xl">
                Transform raw datasets into meaningful dashboards with automated
                chart recommendations, KPI analysis, trend detection and
                business intelligence insights.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[140px]">
                <p className="text-slate-400 text-sm">Charts</p>

                <h3 className="text-cyan-400 text-2xl font-bold">25+</h3>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[140px]">
                <p className="text-slate-400 text-sm">Templates</p>

                <h3 className="text-purple-400 text-2xl font-bold">20+</h3>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[140px]">
                <p className="text-slate-400 text-sm">Insights</p>

                <h3 className="text-green-400 text-2xl font-bold">AI</h3>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[140px]">
                <p className="text-slate-400 text-sm">Speed</p>

                <h3 className="text-yellow-400 text-2xl font-bold">Fast</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Container */}
        <div className="rounded-[32px] border border-slate-800 bg-slate-900/50 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,255,255,0.05)] overflow-hidden">
          <AutoGraphDashboard />
        </div>
      </div>
    </div>
  );
};

export default AIVisualization;
