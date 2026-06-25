import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Users,
  PlusCircle,
  BarChart3,
  ShieldCheck,
  Brain,
} from "lucide-react";

const Choicebusiness = () => {
  const navigate = useNavigate();

  const handleNewUser = () => {
    const company = prompt("Enter New Company Name");

    if (!company) return;

    localStorage.setItem("userMode", "new");
    localStorage.setItem("companyName", company);

    if (!localStorage.getItem(company)) {
      localStorage.setItem(company, JSON.stringify([]));
    }

    navigate("/business-dashboard");
  };

  const handleOldUser = () => {
    const company = prompt("Enter Existing Company Name");

    if (!company) return;

    const companyData = localStorage.getItem(company);

    if (!companyData) {
      alert("Company not found");
      return;
    }

    localStorage.setItem("userMode", "old");
    localStorage.setItem("companyName", company);

    navigate("/business-dashboard");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black mb-6">
            Business Analytics Platform
          </h1>

          <p className="text-slate-400 text-xl max-w-3xl mx-auto">
            Transform your business data into powerful insights with real-time
            analytics, AI-driven recommendations, and professional dashboards.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <BarChart3 size={40} className="text-blue-400 mb-4" />
            <h3 className="text-3xl font-bold">Analytics</h3>
            <p className="text-slate-400 mt-2">
              Real-time business performance tracking
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <Brain size={40} className="text-purple-400 mb-4" />
            <h3 className="text-3xl font-bold">AI Insights</h3>
            <p className="text-slate-400 mt-2">
              Smart suggestions for business growth
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <ShieldCheck size={40} className="text-green-400 mb-4" />
            <h3 className="text-3xl font-bold">Secure</h3>
            <p className="text-slate-400 mt-2">
              Safe storage and company management
            </p>
          </div>
        </div>

        {/* User Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div
            onClick={handleOldUser}
            className="cursor-pointer bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:scale-105 hover:border-blue-500 transition-all duration-300"
          >
            <Users size={60} className="text-blue-400 mb-6" />

            <h2 className="text-3xl font-bold mb-4">Previous User</h2>

            <p className="text-slate-400 text-lg">
              Access existing company dashboards and view historical business
              data.
            </p>
          </div>

          <div
            onClick={handleNewUser}
            className="cursor-pointer bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:scale-105 hover:border-green-500 transition-all duration-300"
          >
            <PlusCircle size={60} className="text-green-400 mb-6" />

            <h2 className="text-3xl font-bold mb-4">New User</h2>

            <p className="text-slate-400 text-lg">
              Create a new company and start building your analytics dashboard.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
          <h2 className="text-4xl font-bold text-center mb-10">
            Platform Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Building2 size={40} className="text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Company Management</h3>
              <p className="text-slate-400">
                Create and manage multiple business profiles.
              </p>
            </div>

            <div>
              <BarChart3 size={40} className="text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Data Visualization</h3>
              <p className="text-slate-400">
                Interactive charts and KPI dashboards.
              </p>
            </div>

            <div>
              <Brain size={40} className="text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">AI Recommendations</h3>
              <p className="text-slate-400">
                Smart business insights and growth planning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choicebusiness;
