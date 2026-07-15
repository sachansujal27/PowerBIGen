import DownloadButtons from "./DownloadButtons";

export default function ReportPreview({ report }) {
  if (!report) return null;

  const dataset = report.dataset_information || {};
  const statistics = report.statistics || {};
  const insights = report.insights || [];
  const risks = report.risks || [];
  const opportunities = report.opportunities || [];
  const recommendations = report.recommendations || [];
  const kpis = report.kpis || [];

  return (
    <div className="mt-10 space-y-10">
      {/* Cover */}
      <div className="rounded-2xl bg-white p-10 shadow-xl">
        <h1 className="text-4xl font-bold text-blue-700">{report.title}</h1>

        <p className="mt-2 text-gray-500">
          Generated on {report.generated_date}
        </p>

        <h2 className="mt-8 text-2xl font-bold border-b pb-2">
          Executive Summary
        </h2>

        <p className="mt-4 leading-8">{report.executive_summary}</p>
      </div>

      {/* Dataset */}
      <div className="rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-5">Dataset Information</h2>

        <table className="w-full border">
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

      {/* KPI */}
      <div className="rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-5">KPI Summary</h2>

        <div className="grid md:grid-cols-4 gap-5">
          {kpis.map((kpi, index) => (
            <div key={index} className="rounded-xl bg-blue-50 p-5 border">
              <h3 className="font-semibold text-blue-700">{kpi.title}</h3>

              <p className="text-2xl font-bold mt-2">{kpi.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-5">Statistics</h2>

        {Object.keys(statistics).length === 0 ? (
          <p>No statistics available.</p>
        ) : (
          Object.entries(statistics).map(([column, values]) => (
            <div key={column} className="border rounded-xl p-5 mb-5">
              <h3 className="font-bold text-xl mb-3">{column}</h3>

              <p>Count : {values.count}</p>
              <p>Mean : {values.mean}</p>
              <p>Median : {values.median}</p>
              <p>Minimum : {values.min}</p>
              <p>Maximum : {values.max}</p>
              <p>Sum : {values.sum}</p>
              <p>Std Dev : {values.std}</p>
            </div>
          ))
        )}
      </div>

      {/* Insights */}
      <div className="rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold">Business Insights</h2>

        <ul className="list-disc ml-8 mt-5">
          {insights.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Risks */}
      <div className="rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold">Risks</h2>

        <ul className="list-disc ml-8 mt-5">
          {risks.map((risk, index) => (
            <li key={index}>{risk}</li>
          ))}
        </ul>
      </div>

      {/* Opportunities */}
      <div className="rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold">Opportunities</h2>

        <ul className="list-disc ml-8 mt-5">
          {opportunities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Recommendations */}
      <div className="rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold">Recommendations</h2>

        <ul className="list-disc ml-8 mt-5">
          {recommendations.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Conclusion */}
      <div className="rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold">Conclusion</h2>

        <p className="mt-5 leading-8">{report.conclusion}</p>
      </div>

      <DownloadButtons />
    </div>
  );
}
