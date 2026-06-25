import React from "react";
import {
  Shield,
  Zap,
  BarChart3,
  Brain,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Homes = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden relative">
      <Header />
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="text-cyan-400" size={42} />

              <h2 className="text-2xl font-bold text-cyan-400">Aurex BI</h2>
            </div>

            <h1 className="text-6xl font-black leading-tight mb-8">
              Transform Data Into
              <span className="block text-cyan-400">Actionable Insights</span>
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl">
              Upload datasets or enter business data to generate Power BI
              dashboards, KPI reports, AI insights and interactive
              visualizations instantly.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              <FeatureCard
                icon={<Shield className="text-green-400" size={28} />}
                title="Secure Analytics"
                desc="Enterprise-grade protection"
              />

              <FeatureCard
                icon={<Zap className="text-cyan-400" size={28} />}
                title="Real-Time Engine"
                desc="Instant data processing"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/Choice-business")}
                className="px-7 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 font-bold shadow-xl transition hover:scale-105"
              >
                Open Dashboard
              </button>

              <button
                onClick={() => navigate("/templates")}
                className="px-7 py-4 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 font-bold transition"
              >
                Templates
              </button>

              <button
                onClick={() => navigate("/ai-visualization")}
                className="px-7 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 font-bold flex items-center gap-2 transition hover:scale-105"
              >
                <Brain size={20} />
                AI Dashboard
              </button>
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
              {/* KPI Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Mini
                  title="Revenue"
                  value="₹2.4L"
                  icon={<DollarSign size={18} />}
                />

                <Mini title="Users" value="12K" icon={<Users size={18} />} />

                <Mini
                  title="Growth"
                  value="+32%"
                  icon={<TrendingUp size={18} />}
                />
              </div>

              {/* Dashboard Preview */}
              <div className="rounded-2xl bg-[#111827] p-5 border border-white/10">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="h-20 rounded-xl bg-cyan-500/20"></div>
                  <div className="h-20 rounded-xl bg-purple-500/20"></div>
                  <div className="h-20 rounded-xl bg-green-500/20"></div>
                </div>

                <div className="h-48 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                  <h3 className="text-xl font-semibold">
                    Power BI Dashboard Preview
                  </h3>
                </div>

                <div className="grid grid-cols-4 gap-2 mt-4">
                  <div className="h-12 rounded-lg bg-cyan-500/20"></div>
                  <div className="h-12 rounded-lg bg-purple-500/20"></div>
                  <div className="h-12 rounded-lg bg-green-500/20"></div>
                  <div className="h-12 rounded-lg bg-yellow-500/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-20">
          <StatCard value="100+" label="Dashboard Templates" />
          <StatCard value="AI" label="Insight Engine" />
          <StatCard value="50+" label="Chart Types" />
          <StatCard value="24/7" label="Analytics Access" />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:bg-white/10 transition">
    <div className="mb-3">{icon}</div>

    <h3 className="font-bold text-lg text-white">{title}</h3>

    <p className="text-slate-400 text-sm mt-1">{desc}</p>
  </div>
);

const Mini = ({ title, value, icon }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
    <div className="flex justify-center mb-2 text-cyan-400">{icon}</div>

    <p className="text-slate-400 text-sm">{title}</p>

    <h3 className="text-xl font-bold text-white mt-1">{value}</h3>
  </div>
);

const StatCard = ({ value, label }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-md">
    <h3 className="text-3xl font-bold text-cyan-400">{value}</h3>

    <p className="text-slate-400 mt-2">{label}</p>
  </div>
);

export default Homes;
