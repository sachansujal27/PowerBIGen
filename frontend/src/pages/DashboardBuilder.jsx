import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Database,
  BarChart3,
  Sparkles,
  FileSpreadsheet,
} from "lucide-react";

const DashboardBuilder = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await API.post("generate-dashboard/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Dashboard Response:", response.data);

      if (response.data.error) {
        alert(response.data.error);
        return;
      }

      // Save dashboard data
      localStorage.setItem("dashboardData", JSON.stringify(response.data));

      // Move to template selection page
      navigate("/templates");
    } catch (error) {
      console.error("Upload Error:", error);

      alert(error?.response?.data?.error || "Failed to generate dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <Sparkles className="text-cyan-400" size={16} />
            <span className="text-cyan-300 text-sm">
              AI Dashboard Generator
            </span>
          </div>

          <h1 className="text-5xl font-bold text-white">Generate Dashboard</h1>

          <p className="text-slate-400 mt-3 text-lg max-w-2xl">
            Upload your dataset and instantly create Power BI style dashboards,
            KPI cards, charts and business insights.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-5 mb-8">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
            <Database className="text-cyan-400 mb-3" />
            <p className="text-slate-400 text-sm">Data Sources</p>
            <h3 className="text-white text-xl font-bold">CSV / XLSX</h3>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
            <BarChart3 className="text-green-400 mb-3" />
            <p className="text-slate-400 text-sm">Charts</p>
            <h3 className="text-white text-xl font-bold">Auto Generated</h3>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
            <Sparkles className="text-purple-400 mb-3" />
            <p className="text-slate-400 text-sm">AI Insights</p>
            <h3 className="text-white text-xl font-bold">Real Time</h3>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
            <FileSpreadsheet className="text-yellow-400 mb-3" />
            <p className="text-slate-400 text-sm">Dashboards</p>
            <h3 className="text-white text-xl font-bold">Unlimited</h3>
          </div>
        </div>

        {/* Upload Box */}
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div
            className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer
            ${
              dragActive
                ? "border-cyan-400 bg-cyan-500/10 scale-[1.02]"
                : "border-slate-700 hover:border-cyan-500"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);

              if (e.dataTransfer.files.length > 0) {
                setFile(e.dataTransfer.files[0]);
              }
            }}
          >
            <input
              id="fileInput"
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                }
              }}
            />

            <label htmlFor="fileInput" className="cursor-pointer block">
              <div className="flex justify-center mb-5">
                <div className="w-24 h-24 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <Upload size={40} className="text-cyan-400" />
                </div>
              </div>

              {file ? (
                <>
                  <h3 className="text-green-400 text-xl font-semibold">
                    {file.name}
                  </h3>

                  <p className="text-slate-400 mt-2">
                    File selected successfully
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-white text-2xl font-semibold">
                    Upload Dataset
                  </h3>

                  <p className="text-slate-400 mt-3">
                    Drag & Drop CSV or Excel File Here
                  </p>

                  <p className="text-slate-500 text-sm mt-2">
                    Supports CSV, XLSX and XLS
                  </p>
                </>
              )}
            </label>
          </div>

          {/* Preview */}
          {file && (
            <div className="mt-6 bg-slate-800 border border-slate-700 rounded-2xl p-4">
              <p className="text-slate-400 text-sm">Selected File</p>

              <h3 className="text-white font-semibold mt-1">{file.name}</h3>

              <p className="text-cyan-400 text-sm mt-1">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className="
              mt-8
              w-full
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-cyan-600
              to-blue-600
              text-white
              font-bold
              text-lg
              hover:scale-[1.01]
              transition
              disabled:opacity-60
            "
          >
            {loading ? (
              <div className="flex justify-center items-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating Dashboard...
              </div>
            ) : (
              "Generate AI Dashboard"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardBuilder;
