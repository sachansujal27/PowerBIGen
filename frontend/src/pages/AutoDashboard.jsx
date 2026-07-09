import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

const AutoDashboard = () => {
  const [data, setData] = useState([]);
  const pdfRef = useRef(null);

  // Safe colors
  const COLORS = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#06B6D4",
    "#EC4899",
    "#84CC16",
    "#F97316",
    "#14B8A6",
  ];

  // Remove OKLCH styles before PDF generation
  const cleanStyles = (element) => {
    const all = element.querySelectorAll("*");

    all.forEach((el) => {
      const style = window.getComputedStyle(el);

      try {
        if (style.color.includes("oklch")) {
          el.style.color = "#000000";
        }

        if (style.backgroundColor.includes("oklch")) {
          el.style.backgroundColor = "#ffffff";
        }

        if (style.borderColor.includes("oklch")) {
          el.style.borderColor = "#d1d5db";
        }

        el.style.boxShadow = "none";
        el.style.backdropFilter = "none";
      } catch (err) {
        console.log(err);
      }
    });
  };

  const downloadPDF = async () => {
    try {
      const input = pdfRef.current;

      if (!input) return;

      const clone = input.cloneNode(true);

      clone.style.position = "absolute";
      clone.style.left = "-9999px";
      clone.style.top = "0";
      clone.style.background = "#ffffff";
      clone.style.color = "#000000";
      clone.style.width = `${input.offsetWidth}px`;

      document.body.appendChild(clone);

      cleanStyles(clone);

      // REMOVE TABLE FROM PDF
      const table = clone.querySelector("#pdf-table");
      if (table) {
        table.remove();
      }

      const canvas = await html2canvas(clone, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      document.body.removeChild(clone);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a3");

      const imgProps = pdf.getImageProperties(imgData);

      const pdfWidth = pdf.internal.pageSize.getWidth();

      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);

      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;

        pdf.addPage();

        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);

        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save("Dashboard_Report.pdf");
      // const pdf = new jsPDF("l", "mm", "a3");

      // const pageWidth = pdf.internal.pageSize.getWidth();
      // const pageHeight = pdf.internal.pageSize.getHeight();

      // const margin = 10;

      // const imgWidth = pageWidth - margin * 2;
      // const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Professional Header
      // pdf.setFillColor(30, 41, 59);
      // pdf.rect(0, 0, 210, 25, "F");

      // pdf.setTextColor(255, 255, 255);
      // pdf.setFont("helvetica", "bold");
      // pdf.setFontSize(22);
      // pdf.text("AI Analytics Dashboard Report", 105, 15, {
      //   align: "center",
      // });

      // pdf.setFontSize(10);
      // pdf.text(`Generated on: ${new Date().toLocaleString()}`, 105, 22, {
      //   align: "center",
      // });
      // pdf.setFontSize(18);
      // pdf.text("AI Analytics Dashboard Report", 10, 15);

      pdf.addImage(imgData, "PNG", 10, 25, pdfWidth, pdfHeight);

      // pdf.save("Dashboard_Report.pdf");
    } catch (error) {
      console.error(error);
      alert("PDF generation failed. Check browser console.");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const ext = file.name.split(".").pop().toLowerCase();

    if (ext === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setData(result.data);
        },
      });
    }

    if (ext === "xlsx" || ext === "xls") {
      const reader = new FileReader();

      reader.onload = (evt) => {
        const workbook = XLSX.read(evt.target.result, {
          type: "binary",
        });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const json = XLSX.utils.sheet_to_json(sheet);

        setData(json);
      };

      reader.readAsBinaryString(file);
    }

    if (ext === "json") {
      const reader = new FileReader();

      reader.onload = (evt) => {
        setData(JSON.parse(evt.target.result));
      };

      reader.readAsText(file);
    }
  };

  if (!data.length) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <div className="bg-slate-900 p-10 rounded-3xl w-[600px]">
          <h1 className="text-5xl text-white font-bold mb-4">AI Dashboard</h1>

          <p className="text-slate-400 mb-6">Upload CSV, Excel or JSON file.</p>

          <input
            type="file"
            accept=".csv,.xlsx,.xls,.json"
            onChange={handleFileUpload}
            className="w-full p-4 bg-slate-800 text-white rounded-xl"
          />
        </div>
      </div>
    );
  }

  const keys = Object.keys(data[0]);

  const chartColumn =
    keys.find(
      (k) =>
        k.toLowerCase().includes("department") ||
        k.toLowerCase().includes("designation") ||
        k.toLowerCase().includes("city"),
    ) || keys[1];

  const groupedData = {};

  data.forEach((row) => {
    const key = row[chartColumn] || "Unknown";

    groupedData[key] = (groupedData[key] || 0) + 1;
  });

  const chartData = Object.entries(groupedData).map(([name, value]) => ({
    name,
    value,
  }));

  const chartDataLimited = chartData.slice(0, 15);
  return (
    <div className="min-h-screen bg-[#050816] text-white p-8">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-6xl font-black mb-3">Power BI Analytics</h1>
        <p className="text-slate-400">AI Generated Dashboard</p>
      </div>

      {/* FILE UPLOAD */}
      <div className="mb-6">
        <input
          type="file"
          accept=".csv,.xlsx,.xls,.json"
          onChange={handleFileUpload}
          className="p-4 rounded-xl bg-slate-900 border border-slate-700"
        />
      </div>

      {/* DOWNLOAD BUTTON */}
      <div className="mb-8">
        <button
          onClick={downloadPDF}
          className="bg-green-600 px-6 py-3 rounded-xl font-bold"
        >
          Download Dashboard PDF
        </button>
      </div>

      {/* PDF SECTION */}
      <div
        ref={pdfRef}
        style={{
          backgroundColor: "#000000",
          color: "#000000",
          padding: "30px",
          borderRadius: "20px",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "linear-gradient(90deg,#1e293b,#334155)",
            color: "#fff",
            padding: "10px",
            borderRadius: "12px",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              margin: 0,
              fontWeight: "bold",
            }}
          >
            AI Analytics Dashboard Report
          </h1>
        </div>

        {/* KPI */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "#f3f4f6",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Rows</h3>
            <h2>{data.length}</h2>
          </div>

          <div
            style={{
              background: "#f3f4f6",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Columns</h3>
            <h2>{keys.length}</h2>
          </div>

          <div
            style={{
              background: "#f3f4f6",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Records</h3>
            <h2>{chartData.length}</h2>
          </div>

          <div
            style={{
              background: "#f3f4f6",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Charts</h3>
            <h2>4</h2>
          </div>
        </div>

        {/* CHARTS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {/* BAR */}
          <div
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h2>Bar Chart</h2>

            <ResponsiveContainer width="90%" height={200}>
              <BarChart data={chartDataLimited}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#FFD700" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* LINE */}
          <div
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h2>Line Chart</h2>

            <ResponsiveContainer width="90%" height={200}>
              <LineChart data={chartDataLimited}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#06B6D4" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* PIE */}
          {/* PIE */}
          <div
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h2>Donut Chart</h2>

            <ResponsiveContainer width="90%" height={250}>
              <PieChart>
                <Pie
                  data={chartDataLimited}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={true}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
                {chartDataLimited.length <= 10 && <Legend />}
                {/* <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  formatter={(value, entry, index) =>
                    `${chartData[index]?.name} (${chartData[index]?.value})`
                  }
                /> */}
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* AREA */}
          <div
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h2>Area Chart</h2>

            <ResponsiveContainer width="90%" height={200}>
              <AreaChart data={chartDataLimited}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  fill="#10B981"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TABLE */}
        {/* TABLE */}
        <div
          id="pdf-table"
          style={{
            marginTop: "30px",
            color: "#ffffff",
            maxHeight: "600px",
            overflowY: "auto",
            border: "1px solid #374151",
            borderRadius: "10px",
          }}
        >
          <h2 style={{ color: "#ffffff" }}>Dataset Preview</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: "#ffffff",
            }}
          >
            <thead>
              <tr>
                {keys.map((k) => (
                  <th
                    key={k}
                    style={{
                      padding: "12px",
                      border: "1px solid #e5e7eb",
                      backgroundColor: "#111827",
                      color: "#ffffff",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    {k}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.slice().map((row, i) => (
                <tr key={i}>
                  {keys.map((k) => (
                    <td
                      key={k}
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        color: "#ffffff",
                      }}
                    >
                      {row[k]}
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

export default AutoDashboard;

//   return (
//     <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">
//       {/* Animated Background */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-500/10 blur-[200px] animate-pulse rounded-full"></div>

//         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[200px] animate-pulse rounded-full"></div>
//       </div>

//       <div className="relative z-10 p-8 max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-10">
//           <h1 className="text-6xl font-black mb-3">Power BI Analytics</h1>

//           <p className="text-slate-400 text-lg">AI Generated Dashboard</p>
//         </div>

//         {/* Upload Again */}
//         <div className="mb-8">
//           <input
//             type="file"
//             accept=".csv,.xlsx,.xls,.json"
//             onChange={handleFileUpload}
//             className="p-4 rounded-xl bg-slate-900 border border-slate-700"
//           />
//         </div>
//         <div
//           ref={pdfRef}
//           style={{
//             background: "#ffffff",
//             padding: "30px",
//             borderRadius: "20px",
//             color: "#000000",
//           }}
//         ></div>
//         {/* KPI CARDS */}
//         {/* KPI CARDS */}
//         <div className="grid md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-105 transition">
//             <p className="text-slate-400">Rows</p>
//             <h2 className="text-4xl font-bold text-yellow-400">
//               {data.length}
//             </h2>
//           </div>

//           <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-105 transition">
//             <p className="text-slate-400">Columns</p>
//             <h2 className="text-4xl font-bold text-cyan-400">{keys.length}</h2>
//           </div>

//           <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-105 transition">
//             <p className="text-slate-400">Records</p>
//             <h2 className="text-4xl font-bold text-green-400">
//               {chartData.length}
//             </h2>
//           </div>

//           <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-105 transition">
//             <p className="text-slate-400">Charts</p>
//             <h2 className="text-4xl font-bold text-purple-400">4</h2>
//           </div>
//         </div>

//         {/* CHARTS */}
//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* BAR */}
//           <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 shadow-[0_0_50px_rgba(255,215,0,0.15)] hover:-translate-y-2 transition">
//             <h2 className="text-2xl font-bold mb-5">3D Bar Chart</h2>

//             <ResponsiveContainer width="100%" height={350}>
//               <BarChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" stroke="#ccc" />
//                 <YAxis stroke="#ccc" />
//                 <Tooltip />
//                 <Legend />

//                 <Bar dataKey="value" fill="#FFD700" radius={[12, 12, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* LINE */}
//           <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 shadow-[0_0_50px_rgba(6,182,212,0.15)] hover:-translate-y-2 transition">
//             <h2 className="text-2xl font-bold mb-5">Trend Analysis</h2>

//             <ResponsiveContainer width="100%" height={350}>
//               <LineChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />

//                 <Line dataKey="value" stroke="#06B6D4" strokeWidth={4} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* DONUT */}
//           {/* DONUT */}
//           {/* DONUT */}
//           <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6">
//             <h2 className="text-2xl font-bold mb-5">Donut Analytics</h2>

//             <ResponsiveContainer width="100%" height={500}>
//               <PieChart>
//                 <Pie
//                   data={chartData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={80}
//                   outerRadius={160}
//                   dataKey="value"
//                   nameKey="name"
//                   label
//                 >
//                   {chartData.map((entry, index) => (
//                     <Cell
//                       key={index}
//                       fill={`hsl(${(index * 60) % 360}, 70%, 55%)`}
//                     />
//                   ))}
//                 </Pie>

//                 <Tooltip />

//                 <Legend />

//                 <text
//                   x="50%"
//                   y="48%"
//                   textAnchor="middle"
//                   fill="#ffffff"
//                   fontSize="28"
//                   fontWeight="bold"
//                 >
//                   {chartData.length}
//                 </text>

//                 <text
//                   x="50%"
//                   y="55%"
//                   textAnchor="middle"
//                   fill="#94A3B8"
//                   fontSize="14"
//                 >
//                   Records
//                 </text>
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Area chart */}
//           <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 shadow-[0_0_50px_rgba(16,185,129,0.15)] hover:-translate-y-2 transition">
//             <h2 className="text-2xl font-bold mb-5">Area Analytics</h2>

//             <ResponsiveContainer width="100%" height={350}>
//               <AreaChart data={chartData}>
//                 <defs>
//                   <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
//                     <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>

//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />

//                 <Area
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#10B981"
//                   fillOpacity={1}
//                   fill="url(#colorValue)"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//         <div className="mb-8">
//           <button
//             onClick={downloadPDF}
//             className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-bold"
//           >
//             Download Dashboard PDF
//           </button>
//         </div>

//         {/* DATA TABLE */}
//         {/* DATA TABLE */}
//         <div className="mt-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 overflow-auto">
//           <h2 className="text-2xl font-bold mb-6">Dataset Preview</h2>

//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-white/5">
//                 {keys.map((k) => (
//                   <th
//                     key={k}
//                     className="p-4 text-left border-b border-slate-700"
//                   >
//                     {k}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {data.slice(0, 20).map((row, i) => (
//                 <tr key={i} className="hover:bg-white/5">
//                   {keys.map((k) => (
//                     <td key={k} className="p-4 border-b border-slate-800">
//                       {row[k]}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AutoDashboard;
