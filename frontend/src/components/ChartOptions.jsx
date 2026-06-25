import { useState, useEffect } from "react";
import { getChartTypes, generateChart } from "../api/client";
import { Sparkles, BarChart2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ChartOptions({ sessionData, onChartGenerated }) {
  const [chartTypes, setChartTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("bar");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const { session_id, columns = [], dtypes = {} } = sessionData;

  useEffect(() => {
    getChartTypes().then((r) => {
      setChartTypes(r.data);
      if (columns.length) {
        setXAxis(columns[0]);
        const num = columns.find((c) => dtypes[c] === "numeric");
        setYAxis(num || columns[1] || columns[0]);
      }
    });
  }, [columns]);

  const numericCols = columns.filter((c) => dtypes[c] === "numeric");
  const categoricalCols = columns.filter((c) => dtypes[c] === "categorical");
  const needsY =
    chartTypes.find((t) => t.type === selectedType)?.needs_y ?? true;

  const handleGenerate = async () => {
    if (!xAxis) return toast.error("Select X-axis column");
    setLoading(true);
    try {
      const { data } = await generateChart({
        session_id,
        chart_type: selectedType,
        x_axis: xAxis,
        y_axis: needsY ? yAxis : "",
        title:
          title || `${selectedType} — ${xAxis}${yAxis ? " vs " + yAxis : ""}`,
      });
      onChartGenerated(data);
      toast.success("Chart generated!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-navy-800 rounded-2xl border border-navy-700 p-5 space-y-5">
      <h3 className="font-semibold text-white flex items-center gap-2">
        <BarChart2 size={16} className="text-indigo-400" />
        Chart Builder
      </h3>

      {/* Chart type grid */}
      <div>
        <label className="block text-xs text-slate-400 mb-2 uppercase tracking-wider">
          Chart Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {chartTypes.map((ct) => (
            <button
              key={ct.type}
              onClick={() => setSelectedType(ct.type)}
              title={ct.description}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border
                          text-xs font-medium transition-all duration-150
                          ${
                            selectedType === ct.type
                              ? "border-indigo-500 bg-indigo-500/20 text-indigo-300"
                              : "border-navy-600 bg-navy-700/50 text-slate-400 hover:border-indigo-500/50"
                          }`}
            >
              <span className="text-xl">{ct.icon}</span>
              {ct.label}
            </button>
          ))}
        </div>
      </div>

      {/* Axis selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">
            X Axis (Category)
          </label>
          <select
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
            className="w-full bg-navy-700 border border-navy-600 rounded-lg
                       px-3 py-2 text-sm text-white focus:outline-none
                       focus:border-indigo-500 transition-colors"
          >
            <option value="">Select column…</option>
            {columns.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {needsY && (
          <div>
            <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">
              Y Axis (Value)
            </label>
            <select
              value={yAxis}
              onChange={(e) => setYAxis(e.target.value)}
              className="w-full bg-navy-700 border border-navy-600 rounded-lg
                         px-3 py-2 text-sm text-white focus:outline-none
                         focus:border-indigo-500 transition-colors"
            >
              <option value="">Select column…</option>
              {(numericCols.length ? numericCols : columns).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Chart title */}
      <div>
        <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">
          Chart Title (optional)
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My Chart Title"
          className="w-full bg-navy-700 border border-navy-600 rounded-lg
                     px-3 py-2 text-sm text-white placeholder-slate-500
                     focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading || !xAxis}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50
                   disabled:cursor-not-allowed text-white font-semibold rounded-xl
                   flex items-center justify-center gap-2 transition-all duration-150
                   shadow-lg shadow-indigo-900/40"
      >
        <Sparkles size={16} />
        {loading ? "Generating…" : "Generate Chart"}
      </button>
    </div>
  );
}
