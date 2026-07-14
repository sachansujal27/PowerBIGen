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

      <div className="rounded-2xl bg-white p-10 text-black shadow-xl border">
        <h1 className="text-4xl font-bold text-blue-700 border-b-4 border-blue-700 pb-3">
          {report.title || "Business Analysis Report"}
        </h1>

        <p className="mt-2 text-gray-500">
          Generated on {report.generated_date}
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-700 border-b pb-2">
            Executive Summary
          </h2>

          <p className="mt-4 leading-8 text-justify">
            {report.executive_summary}
          </p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-700 border-b pb-2">
          Dataset Information
        </h2>

        <table className="w-full mt-5 border">
          <tbody>
            <tr>
              <td className="border p-3 font-semibold">Rows</td>

              <td className="border p-3">{dataset.Rows}</td>
            </tr>

            <tr>
              <td className="border p-3 font-semibold">Columns</td>

              <td className="border p-3">{dataset.Columns}</td>
            </tr>

            <tr>
              <td className="border p-3 font-semibold">Missing Values</td>

              <td className="border p-3">{dataset["Missing Values"]}</td>
            </tr>

            <tr>
              <td className="border p-3 font-semibold">Duplicate Rows</td>

              <td className="border p-3">{dataset["Duplicate Rows"]}</td>
            </tr>

            <tr>
              <td className="border p-3 font-semibold">Memory Usage</td>

              <td className="border p-3">{dataset["Memory Usage"]}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-blue-700 border-b pb-2">
          Business Statistics
        </h2>

        <div className="space-y-6 mt-6">
          {Object.entries(statistics).map(([column, values]) => (
            <div key={column} className="border rounded-xl p-5 bg-blue-50">
              <h3 className="text-xl font-bold text-blue-700">{column}</h3>

              <p className="mt-2">
                <b>Total:</b> {values.total}
              </p>

              <p>
                <b>Average:</b> {values.mean}
              </p>

              <p>
                <b>Maximum:</b> {values.max}
              </p>

              <p>
                <b>Minimum:</b> {values.min}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-green-700 border-b pb-2">
          Business Insights
        </h2>

        <ul className="list-disc ml-8 mt-5 space-y-3">
          {insights.map((item, index) => (
            <li key={index}>
              {typeof item === "string" ? item : JSON.stringify(item)}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-red-700 border-b pb-2">
          Business Risks
        </h2>

        <ul className="list-disc ml-8 mt-5">
          {risks.map((risk, index) => (
            <li key={index}>{risk}</li>
          ))}
        </ul>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-red-700 border-b pb-2">
          Business Risks
        </h2>

        <ul className="list-disc ml-8 mt-5">
          {risks.map((risk, index) => (
            <li key={index}>{risk}</li>
          ))}
        </ul>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-indigo-700 border-b pb-2">
          Recommendations
        </h2>

        <ul className="list-disc ml-8 mt-5">
          {recommendations.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-blue-700 border-b pb-2">
          Conclusion
        </h2>

        <p className="mt-5 leading-8">{report.conclusion}</p>
      </div>

      <DownloadButtons />
    </div>
  );
}
