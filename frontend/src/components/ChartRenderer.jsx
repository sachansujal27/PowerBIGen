import { Download, Trash2, Clock } from "lucide-react";

export default function ChartRenderer({ charts, onClear }) {
  if (!charts.length) return null;

  const downloadChart = (imageUrl, title) => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `${title.replace(/\s+/g, "_")}.png`;
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">
          Generated Charts
          <span
            className="ml-2 text-xs bg-indigo-500/20 text-indigo-300
                           border border-indigo-500/30 rounded-full px-2 py-0.5"
          >
            {charts.length}
          </span>
        </h3>
        {charts.length > 1 && (
          <button
            onClick={onClear}
            className="text-xs text-slate-400 hover:text-red-400
                       flex items-center gap-1 transition-colors"
          >
            <Trash2 size={12} /> Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {charts.map((chart) => (
          <div
            key={chart.id}
            className="bg-navy-800 rounded-2xl border border-navy-700
                       overflow-hidden hover:border-indigo-500/40
                       transition-colors group"
          >
            {/* Header */}
            <div
              className="px-4 py-3 border-b border-navy-700
                            flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-white">
                  {chart.title}
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <Clock size={10} />
                  {new Date(chart.created_at).toLocaleTimeString()}
                </p>
              </div>
              <button
                onClick={() => downloadChart(chart.image_url, chart.title)}
                className="opacity-0 group-hover:opacity-100 transition-opacity
                           bg-indigo-600 hover:bg-indigo-500 text-white
                           text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                <Download size={12} /> PNG
              </button>
            </div>
            {/* Chart image */}
            <div className="p-2 bg-navy-900/50">
              <img
                src={chart.image_url}
                alt={chart.title}
                className="w-full rounded-lg object-contain max-h-80"
                loading="lazy"
              />
            </div>
            {/* Metadata pills */}
            <div className="px-4 py-2 flex gap-2 flex-wrap">
              <span
                className="text-xs bg-navy-700 text-slate-300
                               border border-navy-600 rounded-full px-2 py-0.5"
              >
                {chart.chart_type}
              </span>
              {chart.x_axis && (
                <span
                  className="text-xs bg-emerald-500/10 text-emerald-400
                                 border border-emerald-500/20 rounded-full px-2 py-0.5"
                >
                  X: {chart.x_axis}
                </span>
              )}
              {chart.y_axis && (
                <span
                  className="text-xs bg-amber-500/10 text-amber-400
                                 border border-amber-500/20 rounded-full px-2 py-0.5"
                >
                  Y: {chart.y_axis}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
