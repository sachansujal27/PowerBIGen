import { useState } from "react";
import BulkEntry from "../components/BulkEntry";
import DataGridPanel from "../components/DataGrid";

export default function ExcelDataManager() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [headerInput, setHeaderInput] = useState("");
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState("");

  const createHeaders = () => {
    const cols = headerInput
      .split(",")
      .map((h) => h.trim())
      .filter((h) => h !== "");

    if (cols.length === 0) {
      setError("Please enter at least one column name.");
      return;
    }

    setError("");
    setHeaders(cols);
  };

  const resetHeaders = () => {
    setHeaders([]);
    setHeaderInput("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .fade-up { animation: fadeUp 0.5s ease both; }
        .fade-in { animation: fadeIn 0.3s ease both; }
        .shake { animation: shake 0.3s ease; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="bg-[#131A2A] rounded-2xl border border-white/5 shadow-lg p-7 mb-6 fade-up">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-teal-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-teal-400 uppercase mb-1">
                Data Tools
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Dynamic Excel Data Manager
              </h1>
            </div>
          </div>

          <p className="text-slate-400 mt-4 leading-relaxed">
            Enter your Excel column names first. The form, table, import, and
            export will use these columns automatically.
          </p>
        </div>

        {/* Header Input */}
        <div
          className="bg-[#131A2A] rounded-2xl border border-white/5 shadow-lg p-7 mb-6 fade-up"
          style={{ animationDelay: "0.08s" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-7 h-7 rounded-full bg-teal-500 text-[#0B0F19] text-xs font-bold flex items-center justify-center flex-shrink-0">
              1
            </span>
            <h2 className="text-lg font-semibold text-white">
              Enter Excel Headers
            </h2>
            {headers.length > 0 && (
              <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-full fade-in">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {headers.length} columns set
              </span>
            )}
          </div>

          <input
            type="text"
            value={headerInput}
            onChange={(e) => {
              setHeaderInput(e.target.value);
              if (error) setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && createHeaders()}
            placeholder="Example: Name, Email, Phone, Age, City"
            disabled={headers.length > 0}
            className={`w-full rounded-xl p-3.5 text-sm text-white placeholder-slate-500 bg-white/5 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 disabled:opacity-50 disabled:cursor-not-allowed ${
              error ? "border-red-500/50 shake" : "border-white/10"
            }`}
          />

          {error && (
            <p className="text-red-400 text-sm mt-2 fade-in">{error}</p>
          )}

          <div className="flex gap-3 mt-5">
            {headers.length === 0 ? (
              <button
                onClick={createHeaders}
                className="bg-teal-500 text-[#0B0F19] font-semibold px-6 py-2.5 rounded-xl hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-200 active:scale-95"
              >
                Create Form
              </button>
            ) : (
              <button
                onClick={resetHeaders}
                className="flex items-center gap-2 bg-white/5 text-slate-300 border border-white/10 font-medium px-6 py-2.5 rounded-xl hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200 active:scale-95"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reset Headers
              </button>
            )}
          </div>
        </div>

        {/* Show Form only after headers are created */}
        {headers.length > 0 && (
          <div className="fade-up" style={{ animationDelay: "0.12s" }}>
            <div className="bg-[#131A2A] rounded-2xl border border-white/5 shadow-lg p-7 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-teal-500 text-[#0B0F19] text-xs font-bold flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <h2 className="text-lg font-semibold text-white">
                  Add Entries
                </h2>
              </div>
              <BulkEntry
                headers={headers}
                onSubmitted={() => setRefreshKey((k) => k + 1)}
              />
            </div>

            <div className="bg-[#131A2A] rounded-2xl border border-white/5 shadow-lg p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-teal-500 text-[#0B0F19] text-xs font-bold flex items-center justify-center flex-shrink-0">
                  3
                </span>
                <h2 className="text-lg font-semibold text-white">
                  View & Manage Data
                </h2>
              </div>
              <DataGridPanel headers={headers} refreshKey={refreshKey} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
