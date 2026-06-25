import React from "react";
import { BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-[#0B1220]/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-11 h-11 rounded-lg bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <BarChart3 className="text-white w-5 h-5" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">Aurex BI</h1>

            <p className="text-xs text-slate-400">
              Business Intelligence Platform
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Live Analytics
          </div>

          <button
            onClick={() => navigate("/ai-visualization")}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition"
          >
            AI Insights
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
