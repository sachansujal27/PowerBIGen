export default function DataPreview({ preview, columns, rows, cols }) {
  if (!preview?.length) return null;

  return (
    <div className="bg-navy-800 rounded-2xl border border-navy-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-navy-700 flex items-center justify-between">
        <h3 className="font-semibold text-white text-sm">Data Preview</h3>
        <span className="text-xs text-slate-400 font-mono">
          {rows} rows × {cols} cols
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-navy-700/50">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-3 py-2 text-left text-slate-300
                             font-medium border-r border-navy-700 last:border-0
                             whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preview.slice(0, 8).map((row, i) => (
              <tr
                key={i}
                className="border-t border-navy-700/50
                                     hover:bg-navy-700/30 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col}
                    className="px-3 py-2 text-slate-300 border-r
                               border-navy-700/50 last:border-0
                               font-mono whitespace-nowrap max-w-37.5
                               overflow-hidden text-ellipsis"
                  >
                    {row[col] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
