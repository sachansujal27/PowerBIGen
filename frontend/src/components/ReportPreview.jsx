import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

import DownloadButtons from "./DownloadButtons";
import { useState } from "react";
import FileUploads from "../components/FileUploads";

export default function ReportPreview({ report }) {
  if (!report) return null;

  const summary = report.summary || {};

  const insights = report.insights || [];

  const chartData =
    report.charts?.bar_chart?.categories?.map((item, index) => ({
      name: item,
      value: report.charts.bar_chart.series[0].data[index],
    })) || [];

  return (
    <div className="mt-10 space-y-10">
      {/* PAGE 1 COVER */}

      <div className="bg-white text-black rounded-2xl p-10 shadow-xl">
        <h1 className="text-4xl font-bold">Business Intelligence Report</h1>

        <p className="text-gray-500 mt-2">
          AI Generated Business Analysis Report
        </p>

        <hr className="my-8" />

        <h2 className="text-2xl font-bold">Executive Summary</h2>

        <p className="mt-4 text-gray-700">
          This report provides automated analysis of uploaded business data. The
          system analyzed sales, performance metrics, and generated actionable
          insights.
        </p>

        <div className="grid grid-cols-3 gap-5 mt-8">
          <div className="p-5 rounded-xl bg-blue-100">
            <h3 className="text-gray-600">Total Records</h3>

            <p className="text-3xl font-bold">{summary.rows}</p>
          </div>

          <div className="p-5 rounded-xl bg-green-100">
            <h3>Total Columns</h3>

            <p className="text-3xl font-bold">{summary.columns}</p>
          </div>

          <div className="p-5 rounded-xl bg-yellow-100">
            <h3>Numeric Metrics</h3>

            <p className="text-3xl font-bold">
              {summary.numeric_columns?.length}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-10">Dataset Overview</h2>

        <table className="w-full border mt-4">
          <tbody>
            <tr>
              <td className="border p-3">Rows</td>

              <td className="border p-3">{summary.rows}</td>
            </tr>

            <tr>
              <td className="border p-3">Columns</td>

              <td className="border p-3">{summary.columns}</td>
            </tr>

            <tr>
              <td className="border p-3">Categories</td>

              <td className="border p-3">
                {summary.categorical_columns?.join(", ")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PAGE 2 ANALYSIS */}

      <div className="bg-white text-black rounded-2xl p-10 shadow-xl">
        <h2 className="text-3xl font-bold">Business Performance Analysis</h2>

        <div className="h-[400px] mt-8">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <h2 className="text-2xl font-bold mt-10">Key Metrics</h2>

        <table className="w-full border mt-5">
          <thead>
            <tr>
              <th className="border p-3">Metric</th>

              <th className="border p-3">Total</th>

              <th className="border p-3">Average</th>

              <th className="border p-3">Maximum</th>
            </tr>
          </thead>

          <tbody>
            {insights.map((item, index) => (
              <tr key={index}>
                <td className="border p-3">{item.column}</td>

                <td className="border p-3">{item.total}</td>

                <td className="border p-3">{item.average}</td>

                <td className="border p-3">{item.maximum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGE 3 */}

      <div className="bg-white text-black rounded-2xl p-10 shadow-xl">
        <h2 className="text-3xl font-bold">Recommendations</h2>

        <ul className="list-disc ml-8 mt-5 space-y-3">
          <li>Optimize low performing business areas.</li>

          <li>Improve resource allocation using data insights.</li>

          <li>Monitor revenue and profit trends regularly.</li>

          <li>Focus on high performing products and regions.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10">Conclusion</h2>

        <p className="mt-3">
          The analysis indicates important business patterns and provides
          data-driven recommendations for future improvement.
        </p>

        <DownloadButtons />
      </div>
    </div>
  );
}
