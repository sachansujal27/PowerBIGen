const API_BASE = "http://127.0.0.1:8000/api/report";

export default function DownloadButtons() {
  const openUrl = (path) => window.open(`${API_BASE}/${path}`, "_blank");

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <button
        onClick={() => openUrl("pdf/")}
        className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold"
      >
        Download PDF
      </button>

      <button
        onClick={() => openUrl("docx/")}
        className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        Download Word
      </button>

      <button
        onClick={() => window.print()}
        className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
      >
        Print Report
      </button>
    </div>
  );
}
