import { useState } from "react";
import FileUploads from "../components/FileUploads";
import ReportPreview from "../components/ReportPreview";

export default function ReportGenerator() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  // File select
  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setReport(null);
    setError("");

    console.log("Selected File:", selectedFile);
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

      const response = await fetch("http://127.0.0.1:8000/api/report/upload/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Report generation failed");
      }

      console.log("Generated Report:", data);

      /*
        Your API returns serializer data.
        Convert it if required.
      */

      const formattedReport = {
        summary: {
          rows: data.rows,
          columns: data.columns,
          numeric_columns: data.numeric_columns || [],
          categorical_columns: data.categorical_columns || [],
        },

        insights: data.insights || [],

        recommendations: data.recommendations || [],

        conclusion: data.conclusion || "",

        executive_summary: data.executive_summary || "",

        pdf_report: data.pdf_report,

        docx_report: data.docx_report,
      };

      setReport(formattedReport);
    } catch (err) {
      console.error("Report Error:", err);

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold text-white">
          AI Report Generator
        </h1>

        <FileUploads file={file} onFileSelect={handleFileSelect} />

        {error && (
          <div className="mt-5 rounded-lg bg-red-900/30 p-4 text-red-400">
            {error}
          </div>
        )}

        {file && (
          <button
            onClick={handleGenerateReport}
            disabled={loading}
            className="
            mt-6 rounded-xl 
            bg-indigo-600 
            px-8 py-3 
            font-semibold 
            text-white
            hover:bg-indigo-700
            disabled:opacity-50
            "
          >
            {loading ? "Generating Report..." : "Generate Dashboard Report"}
          </button>
        )}

        {report && <ReportPreview report={report} />}
      </div>
    </div>
  );
}
