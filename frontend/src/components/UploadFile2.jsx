import React, { useState } from "react";
import API from "../api";

const UploadFile2 = ({ onFileAnalyzed }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      const res = await API.post("/upload-file/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onFileAnalyzed(res.data);

      alert("File analyzed successfully");
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);

      alert(err.response?.data?.error || "File upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[88%] mx-auto my-9 p-9 rounded-[28px] bg-white/95 text-gray-900 shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
      <h2 className="text-3xl font-bold text-slate-900 mb-3">
        Upload Company Data
      </h2>

      <p className="text-slate-600 text-base font-semibold">
        Supported files: CSV, Excel
      </p>

      <form onSubmit={handleUpload} className="mt-5">
        <input
          className="p-4 border-2 border-dashed border-slate-400 rounded-2xl bg-slate-50 text-base m-4"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="px-8 py-4 rounded-2xl bg-linear-to-br from-blue-600 to-blue-700 text-white text-lg font-extrabold"
          type="submit"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>
      </form>
    </div>
  );
};

export default UploadFile2;
