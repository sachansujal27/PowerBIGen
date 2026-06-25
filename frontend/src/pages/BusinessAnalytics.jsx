import React from "react";
import {
  Briefcase,
  TrendingUp,
  DollarSign,
  Users,
  Building2,
  BarChart3,
} from "lucide-react";

import BusinessMain from "./Businessmain";

const BusinessAnalytics = () => {
  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-emerald-500/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-500/10 blur-[180px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <Building2 size={16} className="text-emerald-400" />
                <span className="text-emerald-300 text-sm font-medium">
                  Business Intelligence Platform
                </span>
              </div>

              <h1 className="text-5xl font-bold text-white">
                Business Analytics Studio
              </h1>

              <p className="text-slate-400 text-lg mt-4 max-w-2xl">
                Track revenue, sales, expenses, profitability, customer behavior
                and business KPIs with AI-powered analytics and interactive
                dashboards.
              </p>
            </div>

            {/* Right Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/5">
                <DollarSign size={30} className="text-emerald-400 mb-2" />
                <p className="text-slate-400 text-sm">Revenue Tracking</p>
                <h3 className="text-white text-xl font-bold">Real-Time</h3>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/5">
                <Users size={30} className="text-cyan-400 mb-2" />
                <p className="text-slate-400 text-sm">Customer Insights</p>
                <h3 className="text-white text-xl font-bold">AI Powered</h3>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/5">
                <TrendingUp size={30} className="text-purple-400 mb-2" />
                <p className="text-slate-400 text-sm">Growth Analytics</p>
                <h3 className="text-white text-xl font-bold">Advanced</h3>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/5">
                <BarChart3 size={30} className="text-yellow-400 mb-2" />
                <p className="text-slate-400 text-sm">Business KPIs</p>
                <h3 className="text-white text-xl font-bold">Unlimited</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Features Row */}
        <div className="grid md:grid-cols-4 gap-5 mb-8">
          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-5">
            <h3 className="text-white font-bold mb-1">Sales Analytics</h3>
            <p className="text-slate-400 text-sm">Revenue and sales trends.</p>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-5">
            <h3 className="text-white font-bold mb-1">Customer Insights</h3>
            <p className="text-slate-400 text-sm">
              Understand customer behavior.
            </p>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-5">
            <h3 className="text-white font-bold mb-1">Financial Reports</h3>
            <p className="text-slate-400 text-sm">Profit & expense tracking.</p>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-5">
            <h3 className="text-white font-bold mb-1">KPI Monitoring</h3>
            <p className="text-slate-400 text-sm">
              Track key business metrics.
            </p>
          </div>
        </div>

        {/* Main Business Module */}
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-6">
          <BusinessMain />
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalytics;
