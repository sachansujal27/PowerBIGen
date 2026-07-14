import { useState } from "react";
import FileUploads from "../components/FileUploads";
import ReportPreview from "../components/ReportPreview";

const API_URL = "http://127.0.0.1:8000/api/report/upload/";

export default function ReportGenerator() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  // Select File
  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setReport(null);
    setError("");
  };

  // Generate Report
  const handleGenerateReport = async () => {
    if (!file) {
      setError("Please upload a file first.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const text = await response.text();

      console.log("Backend Response:", text);

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(text);
      }

      if (!response.ok) {
        throw new Error(
          data.message || data.detail || "Failed to generate report.",
        );
      }

      console.log("Generated Report:", data);

      // Save the complete response from backend
      setReport(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6 pb-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold text-white">
          AI Business Report Generator
        </h1>

        <FileUploads file={file} onFileSelect={handleFileSelect} />

        {error && (
          <div className="mt-6 rounded-xl border border-red-700 bg-red-900/20 p-4 text-red-300">
            {error}
          </div>
        )}

        {file && (
          <button
            onClick={handleGenerateReport}
            disabled={loading}
            className="mt-6 rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Generating Report..." : "Generate Business Report"}
          </button>
        )}

        {loading && (
          <div className="mt-6 text-blue-300">
            Analyzing file and preparing business report...
          </div>
        )}

        {report && (
          <div className="mt-10">
            <ReportPreview report={report} />
          </div>
        )}
      </div>
    </div>
  );
}
