import React from "react";

const DataPreview2 = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto my-12">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Data</h2>
            <p className="text-gray-500 text-sm">Showing first 8 rows</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="px-4 py-3 font-semibold">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.slice(0, 8).map((row, i) => (
                <tr key={i} className="border-t hover:bg-gray-50 transition">
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="px-4 py-3 text-gray-800">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataPreview2;
