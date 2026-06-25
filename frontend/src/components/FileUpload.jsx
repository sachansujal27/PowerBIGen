import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X } from "lucide-react";
import { uploadFile } from "../api/client";
import toast from "react-hot-toast";

const ACCEPTED = {
  "text/csv": [".csv"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xlsx",
  ],
  "application/vnd.ms-excel": [".xls"],
  "application/pdf": [".pdf"],
};

export default function FileUpload({ onDataLoaded }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");

  const onDrop = useCallback(
    async (accepted) => {
      if (!accepted.length) return;
      const file = accepted[0];
      setFileName(file.name);
      setUploading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const { data } = await uploadFile(formData, (evt) => {
          setProgress(Math.round((evt.loaded * 100) / evt.total));
        });
        toast.success(`Loaded ${data.rows} rows × ${data.cols} columns`);
        onDataLoaded(data);
      } catch (err) {
        toast.error(err.response?.data?.error || "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onDataLoaded],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative cursor-pointer rounded-2xl border-2 border-dashed
                  transition-all duration-200 p-8 text-center
                  ${
                    isDragActive
                      ? "border-indigo-400 bg-indigo-500/10"
                      : "border-navy-700 hover:border-indigo-500 bg-navy-800"
                  }`}
    >
      <input {...getInputProps()} />

      {uploading ? (
        <div className="space-y-3">
          <p className="text-slate-300 text-sm">{fileName}</p>
          <div className="w-full bg-navy-700 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-indigo-400 text-sm font-mono">{progress}%</p>
        </div>
      ) : (
        <>
          <Upload className="mx-auto mb-3 text-indigo-400" />
          <p className="text-white font-semibold text-lg">
            {isDragActive ? "Drop it here!" : "Upload your data file"}
          </p>
          <p className="text-slate-400 text-sm mt-1">
            CSV · Excel (.xlsx) · PDF — up to 50 MB
          </p>
          <div className="flex justify-center gap-3 mt-4">
            {["CSV", "XLSX", "PDF"].map((f) => (
              <span
                key={f}
                className="px-3 py-1 bg-navy-700 rounded-full text-xs
                           text-slate-300 border border-navy-600"
              >
                {f}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
