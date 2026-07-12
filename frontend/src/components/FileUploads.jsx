import { useRef } from "react";

export default function FileUpload({ file, onFileSelect }) {
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    const ext = f.name.toLowerCase();
    if (
      !(
        ext.endsWith(".xlsx") ||
        ext.endsWith(".xls") ||
        ext.endsWith(".csv") ||
        ext.endsWith(".pdf")
      )
    ) {
      alert("Only Excel, CSV, or PDF files are allowed.");
      return;
    }
    onFileSelect(f);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
      }}
      onClick={() => inputRef.current?.click()}
      className="border-2 border-dashed border-slate-600 rounded-2xl p-10 text-center cursor-pointer hover:border-blue-500 transition"
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".xlsx,.xls,.csv,.pdf"
        onChange={(e) => handleFile(e.target.files[0])}
      />
      <h2 className="text-2xl font-semibold">Upload Excel or PDF</h2>
      <p className="text-slate-400 mt-2">
        Drag & drop a file here or click to browse.
      </p>

      {file && (
        <div className="mt-6 rounded-lg bg-slate-800 p-4 text-left">
          <p>
            <strong>Name:</strong> {file.name}
          </p>
          <p>
            <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
          </p>
          <p>
            <strong>Type:</strong> {file.type || "Unknown"}
          </p>
        </div>
      )}
    </div>
  );
}
