import React from "react";

const InsightSuggestion2 = ({ analysis, data }) => {
  if (!analysis || !data || data.length === 0) return null;

  const numericColumns = analysis.numericColumns || [];
  const textColumns = analysis.textColumns || [];

  const bestX = textColumns[0] || analysis.columns[0];
  const bestY = numericColumns[0];

  let suggestion = "Upload structured data to get better visualization.";

  if (textColumns.length > 0 && numericColumns.length > 0) {
    suggestion = `Use Bar Chart with '${bestX}' on X-axis and '${bestY}' on Y-axis.`;
  }

  return (
    <div className="max-w-6xl mx-auto my-10 grid md:grid-cols-2 gap-6">
      {/* AI Card */}
      <div className="bg-linear-to-br from-purple-100 to-purple-50 border border-purple-200 rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-2">🤖 AI Analysis</h2>

        <p className="text-gray-600 mb-4">
          Analyzed {data.length} data points across {analysis.columns.length}{" "}
          fields.
        </p>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Key Insight</h3>
          <p className="text-gray-600 text-sm">{suggestion}</p>
        </div>
      </div>

      {/* Tags / Summary */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Quick Info</h2>

        <div className="flex flex-wrap gap-3">
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            X: {bestX}
          </span>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            Y: {bestY}
          </span>

          <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
            Rows: {data.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InsightSuggestion2;
