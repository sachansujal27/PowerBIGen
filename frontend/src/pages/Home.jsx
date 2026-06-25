import FileUpload from "../components/FileUpload";

import {
  BarChart3,
  Database,
  Sparkles,
  TrendingUp,
  Upload,
  ShieldCheck,
} from "lucide-react";

function Home({ setTemplates }) {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-10 left-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]" />

        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-5 py-2 rounded-full mb-8">
            <Sparkles size={18} />
            <span>AI Powered Power BI Analytics</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            Transform Data Into
            <span className="text-yellow-400"> Powerful Reports</span>
          </h1>

          <p className="text-slate-400 text-xl max-w-3xl mx-auto mt-8 leading-relaxed">
            Upload Excel, CSV, SQL exports and instantly generate professional
            Power BI dashboards, KPIs, charts and reports with Artificial
            Intelligence.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300">
              Start Generating
            </button>

            <button className="border border-white/20 px-8 py-4 rounded-xl hover:bg-white/5 transition">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-8 mb-24">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-yellow-400/30 transition">
            <h3 className="text-yellow-400 text-4xl font-bold">50K+</h3>
            <p className="text-slate-400 mt-2">Reports Generated</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-cyan-400/30 transition">
            <h3 className="text-cyan-400 text-4xl font-bold">1,200+</h3>
            <p className="text-slate-400 mt-2">Active Organizations</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-green-400/30 transition">
            <h3 className="text-green-400 text-4xl font-bold">99.9%</h3>
            <p className="text-slate-400 mt-2">Uptime</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-purple-400/30 transition">
            <h3 className="text-purple-400 text-4xl font-bold">10M+</h3>
            <p className="text-slate-400 mt-2">Records Processed</p>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="max-w-5xl mx-auto px-8 mb-28">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-10 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-3xl bg-yellow-500/10 flex items-center justify-center">
              <Upload size={40} className="text-yellow-400" />
            </div>
          </div>

          <h2 className="text-4xl font-bold text-center mb-3">
            Upload Your Dataset
          </h2>

          <p className="text-center text-slate-400 mb-10">
            Import Excel, CSV or database exports and let AI create beautiful
            Power BI reports automatically.
          </p>

          {/* Existing Upload Component */}
          <FileUpload setTemplates={setTemplates} />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 pb-28">
        <h2 className="text-5xl font-bold text-center mb-16">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">
            <Database className="text-cyan-400 mb-5" size={44} />

            <h3 className="text-2xl font-bold mb-3">Connect Any Data</h3>

            <p className="text-slate-400">
              Connect Excel, CSV, SQL Server, APIs and enterprise databases
              effortlessly.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">
            <Sparkles className="text-yellow-400 mb-5" size={44} />

            <h3 className="text-2xl font-bold mb-3">AI Report Builder</h3>

            <p className="text-slate-400">
              Generate intelligent visualizations, dashboards and KPIs using AI.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">
            <BarChart3 className="text-green-400 mb-5" size={44} />

            <h3 className="text-2xl font-bold mb-3">Advanced Analytics</h3>

            <p className="text-slate-400">
              Track trends, revenue, growth metrics and performance with
              interactive reports.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="max-w-6xl mx-auto px-8 pb-28">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-10">
          <h2 className="text-4xl font-bold text-center mb-12">
            Dashboard Preview
          </h2>

          {/* KPI Cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            <div className="bg-green-500/10 rounded-2xl p-5">
              <p className="text-slate-400">Revenue</p>
              <h3 className="text-3xl font-bold text-green-400">$124K</h3>
            </div>

            <div className="bg-blue-500/10 rounded-2xl p-5">
              <p className="text-slate-400">Users</p>
              <h3 className="text-3xl font-bold text-blue-400">8,241</h3>
            </div>

            <div className="bg-yellow-500/10 rounded-2xl p-5">
              <p className="text-slate-400">Growth</p>
              <h3 className="text-3xl font-bold text-yellow-400">+32%</h3>
            </div>
          </div>

          {/* Chart Mockup */}
          <div className="flex justify-center items-end gap-5 h-64">
            <div className="w-16 bg-yellow-400 h-24 rounded-t-xl"></div>
            <div className="w-16 bg-cyan-400 h-40 rounded-t-xl"></div>
            <div className="w-16 bg-green-400 h-36 rounded-t-xl"></div>
            <div className="w-16 bg-purple-500 h-52 rounded-t-xl"></div>
            <div className="w-16 bg-pink-500 h-64 rounded-t-xl"></div>
          </div>

          <div className="flex justify-center mt-8">
            <TrendingUp size={48} className="text-green-400" />
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="max-w-6xl mx-auto px-8 pb-28">
        <div className="bg-gradient-to-r from-yellow-500/10 to-cyan-500/10 border border-white/10 rounded-[40px] p-10 text-center">
          <ShieldCheck size={60} className="mx-auto text-green-400 mb-6" />

          <h2 className="text-4xl font-bold">Enterprise Grade Security</h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Your uploaded files and analytics remain secure with encrypted
            storage and enterprise-level protection.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-slate-500">
        © 2026 PowerBI Generator • AI Analytics Platform
      </footer>
    </div>
  );
}

export default Home;

// import FileUpload from "../components/FileUpload";

// function Home({ setTemplates }) {
//   return (
//     <div>
//       <h1>Power BI Generator</h1>

//       <FileUpload setTemplates={setTemplates} />
//     </div>
//   );
// }

// export default Home;
