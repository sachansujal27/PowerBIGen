import { useState } from "react";

import { RefreshCw, Activity, Database, TrendingUp } from "lucide-react";

import FileUpload from "../components/FileUpload";
import ChartOptions from "../components/ChartOptions";
import DataPreview from "../components/DataPreview";
import ChartRenderer from "../components/ChartRenderer";
import Templates from "./Templates";

export default function Dashboard() {
  const [sessionData, setSessionData] = useState(null);
  const [charts, setCharts] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleDataLoaded = (data) => {
    setSessionData(data);
    setCharts([]);
  };

  const handleChartGenerated = (chart) => {
    setCharts((prev) => [chart, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#030712] pt-14 relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-500/10 blur-[140px] rounded-full animate-pulse" />

        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full animate-pulse" />

        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-purple-500/10 blur-[140px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-yellow-500/5 blur-[120px]" />

          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-full mb-4">
                <Activity size={16} className="text-yellow-400" />
                <span className="text-yellow-300 text-sm">
                  AI Powered Analytics
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Power BI Dashboard
              </h1>

              <p className="text-slate-400 mt-3 max-w-xl">
                Upload files, generate interactive charts, build dashboards and
                create professional Power BI reports using AI-powered analytics.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 min-w-[160px] border border-slate-800">
                <Database className="text-cyan-400 mb-2" />

                <p className="text-slate-400 text-sm">Data Sources</p>

                <h3 className="text-white text-2xl font-bold">Unlimited</h3>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 min-w-[160px] border border-slate-800">
                <TrendingUp className="text-green-400 mb-2" />

                <p className="text-slate-400 text-sm">Analytics</p>

                <h3 className="text-white text-2xl font-bold">Real-Time</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        {sessionData && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "File",
                value: sessionData.filename,
              },
              {
                label: "Rows",
                value: sessionData.rows.toLocaleString(),
              },
              {
                label: "Columns",
                value: sessionData.cols,
              },
              {
                label: "Charts",
                value: charts.length,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-5"
              >
                <p className="text-slate-400 text-xs uppercase tracking-wider">
                  {stat.label}
                </p>

                <h3 className="text-white text-xl font-bold truncate mt-2">
                  {stat.value}
                </h3>
              </div>
            ))}
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Total Revenue</p>

            <h3 className="text-green-400 text-3xl font-bold">$124K</h3>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Active Users</p>

            <h3 className="text-cyan-400 text-3xl font-bold">8,241</h3>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Growth Rate</p>

            <h3 className="text-yellow-400 text-3xl font-bold">+32%</h3>
          </div>
        </div>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="lg:col-span-1 space-y-4">
            <FileUpload onDataLoaded={handleDataLoaded} />

            {sessionData && (
              <>
                <ChartOptions
                  sessionData={sessionData}
                  onChartGenerated={handleChartGenerated}
                />

                <button
                  onClick={() => {
                    setSessionData(null);
                    setCharts([]);
                    setSelectedTemplate(null);
                  }}
                  className="
                    w-full
                    py-3
                    rounded-xl
                    border
                    border-slate-700
                    text-slate-300
                    hover:text-white
                    hover:border-slate-500
                    transition
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  <RefreshCw size={16} />
                  Upload New File
                </button>
              </>
            )}
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-2 space-y-4">
            {sessionData && (
              <DataPreview
                preview={sessionData.preview}
                columns={sessionData.columns}
                rows={sessionData.rows}
                cols={sessionData.cols}
              />
            )}

            {sessionData && !selectedTemplate && (
              <Templates
                recommended={sessionData.recommended_template}
                onSelect={setSelectedTemplate}
              />
            )}

            <ChartRenderer charts={charts} onClear={() => setCharts([])} />

            {!sessionData && (
              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  h-72
                  rounded-3xl
                  border-2
                  border-dashed
                  border-slate-700
                  bg-slate-900/40
                  backdrop-blur-xl
                  text-center
                  px-8
                "
              >
                <p className="text-6xl mb-4">📊</p>

                <h3 className="text-white text-xl font-bold">No Data Loaded</h3>

                <p className="text-slate-400 mt-2">
                  Upload CSV, Excel or PDF files to start building Power BI
                  dashboards.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";

// import { RefreshCw } from "lucide-react";
// import FileUpload from "../components/FileUpload";
// import ChartOptions from "../components/ChartOptions";
// import DataPreview from "../components/DataPreview";
// import ChartRenderer from "../components/ChartRenderer";
// import Templates from "./Templates";

// export default function Dashboard() {
//   const [sessionData, setSessionData] = useState(null);
//   const [charts, setCharts] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);

//   const handleDataLoaded = (data) => {
//     setSessionData(data);
//     setCharts([]);
//   };

//   const handleChartGenerated = (chart) => {
//     setCharts((prev) => [chart, ...prev]);
//   };

//   return (
//     <div className="min-h-screen bg-navy-900 pt-14">
//       <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
//         {/* Stats bar */}
//         {sessionData && (
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//             {[
//               { label: "File", value: sessionData.filename, color: "indigo" },
//               {
//                 label: "Rows",
//                 value: sessionData.rows.toLocaleString(),
//                 color: "emerald",
//               },
//               { label: "Columns", value: sessionData.cols, color: "amber" },
//               { label: "Charts", value: charts.length, color: "purple" },
//             ].map((stat) => (
//               <div
//                 key={stat.label}
//                 className="bg-navy-800 border border-navy-700 rounded-xl px-4 py-3"
//               >
//                 <p className="text-xs text-slate-400 uppercase tracking-wider">
//                   {stat.label}
//                 </p>
//                 <p className="text-lg font-bold text-white mt-0.5 truncate">
//                   {stat.value}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left panel */}
//           <div className="lg:col-span-1 space-y-4">
//             <FileUpload onDataLoaded={handleDataLoaded} />
//             {sessionData && (
//               <>
//                 <ChartOptions
//                   sessionData={sessionData}
//                   onChartGenerated={handleChartGenerated}
//                 />
//                 <button
//                   onClick={() => {
//                     setSessionData(null);
//                     setCharts([]);
//                   }}
//                   className="w-full py-2 text-sm text-slate-400 hover:text-white
//                              border border-navy-600 hover:border-navy-500
//                              rounded-xl flex items-center justify-center gap-2
//                              transition-colors"
//                 >
//                   <RefreshCw size={14} /> Upload New File
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Right panel */}
//           <div className="lg:col-span-2 space-y-4">
//             {sessionData && (
//               <DataPreview
//                 preview={sessionData.preview}
//                 columns={sessionData.columns}
//                 rows={sessionData.rows}
//                 cols={sessionData.cols}
//               />
//             )}

//             {/* new */}
//             {sessionData && !selectedTemplate && (
//               <Templates
//                 recommended={sessionData.recommended_template}
//                 onSelect={setSelectedTemplate}
//               />
//             )}

//             <ChartRenderer charts={charts} onClear={() => setCharts([])} />
//             {!sessionData && (
//               <div
//                 className="flex flex-col items-center justify-center
//                               h-64 rounded-2xl border-2 border-dashed
//                               border-navy-700 text-center px-8"
//               >
//                 <p className="text-4xl mb-3">📊</p>
//                 <p className="text-white font-semibold text-lg">
//                   No data loaded yet
//                 </p>
//                 <p className="text-slate-400 text-sm mt-1">
//                   Upload a CSV, Excel, or PDF file to start visualising
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
