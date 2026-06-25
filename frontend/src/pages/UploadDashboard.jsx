import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import {
  Upload,
  Database,
  BarChart3,
  Sparkles,
  FileSpreadsheet,
} from "lucide-react";

const UploadDashboard = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

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

      console.log("API Response:", response.data);

      if (response.data.error) {
        alert(response.data.error);
        return;
      }

      // Save dashboard data
      localStorage.setItem("dashboardData", JSON.stringify(response.data));

      // Go to template page
      navigate("/templates");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Sparkles size={16} />
            <span>AI Dashboard Generator</span>
          </div>

          <h1 className="text-5xl font-bold mt-5">Upload Dataset</h1>

          <p className="text-slate-400 mt-4">
            Upload CSV or Excel file and generate Power BI dashboards.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-5 mb-10">
          <div className="bg-slate-900 rounded-2xl p-5">
            <Database className="text-cyan-400 mb-2" />
            <p className="text-slate-400 text-sm">Data Sources</p>
            <h3 className="font-bold">CSV / XLSX</h3>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5">
            <BarChart3 className="text-green-400 mb-2" />
            <p className="text-slate-400 text-sm">Charts</p>
            <h3 className="font-bold">Auto Generated</h3>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5">
            <Sparkles className="text-purple-400 mb-2" />
            <p className="text-slate-400 text-sm">AI Insights</p>
            <h3 className="font-bold">Real Time</h3>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5">
            <FileSpreadsheet className="text-yellow-400 mb-2" />
            <p className="text-slate-400 text-sm">Dashboards</p>
            <h3 className="font-bold">Unlimited</h3>
          </div>
        </div>

        {/* Upload Card */}
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
          <div className="border-2 border-dashed border-slate-700 rounded-3xl p-12 text-center">
            <input
              type="file"
              id="fileInput"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <label htmlFor="fileInput" className="cursor-pointer block">
              <div className="flex justify-center mb-4">
                <Upload size={50} className="text-cyan-400" />
              </div>

              {file ? (
                <>
                  <h3 className="text-green-400 text-xl font-bold">
                    {file.name}
                  </h3>

                  <p className="text-slate-400 mt-2">
                    File selected successfully
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold">Upload Dataset</h3>

                  <p className="text-slate-400 mt-2">
                    CSV, XLSX, XLS Supported
                  </p>
                </>
              )}
            </label>
          </div>

          {file && (
            <div className="mt-5 p-4 bg-slate-800 rounded-xl">
              <p className="text-slate-400 text-sm">Selected File</p>

              <h3 className="font-bold">{file.name}</h3>

              <p className="text-cyan-400 text-sm">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full mt-6 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 font-bold disabled:opacity-50"
          >
            {loading ? "Generating Dashboard..." : "Generate Dashboard"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDashboard;
