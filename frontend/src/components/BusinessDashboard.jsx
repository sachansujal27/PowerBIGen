import React, { useEffect, useState } from "react";

// import API from "../api";
import Chart from "react-apexcharts";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
const BusinessDashboard = ({
  refresh,
  userType,
  newUserData,
  onDeleteNewUserRow,
}) => {
  const userMode = localStorage.getItem("userMode");
  const companyName = localStorage.getItem("companyName");

  const [data, setData] = useState([]);

  const [showHistory, setShowHistory] = useState(false);

  const [showPlan, setShowPlan] = useState(false);

  const [formData, setFormData] = useState({
    sales: "",
    expenses: "",
    customers: "",
  });

  // LOAD DATA FROM DJANGO
  // const loadData = async () => {
  //   try {
  //     const res = await API.get("/get-data/1/");

  //     setData(res.data);
  //   } catch (err) {
  //     console.error("Fetch error:", err.response?.data || err.message);
  //   }
  // };

  // useEffect(() => {
  //   if (userType === "new") {
  //     setData(newUserData);
  //   } else {
  //     loadData();
  //   }
  // }, [refresh, userType, newUserData]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(companyName)) || [];

    setData(savedData);
  }, [companyName]);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // // ADD DATA
  const handleAddData = () => {
    if (!formData.sales || !formData.expenses || !formData.customers) {
      alert("Please fill all fields");
      return;
    }

    const newEntry = {
      sales: Number(formData.sales),
      expenses: Number(formData.expenses),
      customers: Number(formData.customers),
    };

    const updatedData = [...data, newEntry];

    setData(updatedData);

    localStorage.setItem(companyName, JSON.stringify(updatedData));

    setFormData({
      sales: "",
      expenses: "",
      customers: "",
    });
  };
  // const handleAddData = () => {
  //   if (!formData.sales || !formData.expenses || !formData.customers) {
  //     alert("Please fill all fields");

  //     return;
  //   }

  //   const newEntry = {
  //     sales: formData.sales,
  //     expenses: formData.expenses,
  //     customers: formData.customers,
  //   };

  //   setData([...data, newEntry]);

  //   setFormData({
  //     sales: "",
  //     expenses: "",
  //     customers: "",
  //   });
  // };

  // DELETE ROW
  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Delete only this selected data?");

    if (!confirmDelete) return;

    const updatedData = data.filter((_, i) => i !== index);

    setData(updatedData);

    if (onDeleteNewUserRow) {
      onDeleteNewUserRow(index);
    }
  };

  const totalSales = data.reduce((sum, item) => sum + Number(item.sales), 0);

  const totalExpenses = data.reduce(
    (sum, item) => sum + Number(item.expenses),
    0,
  );

  const totalCustomers = data.reduce(
    (sum, item) => sum + Number(item.customers),
    0,
  );

  const totalProfit = totalSales - totalExpenses;

  const latest = data[data.length - 1];

  const options = {
    chart: {
      id: "business-chart",
      type: "bar",
      height: 420,
      toolbar: { show: true },
      animations: { enabled: true, speed: 700 },
    },

    theme: {
      mode: "dark",
    },

    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "45%",
      },
    },

    dataLabels: {
      enabled: false,
    },

    xaxis: {
      categories: data.map((_, index) => `Entry ${index + 1}`),
    },

    yaxis: {
      title: {
        text: "Amount",
      },
    },

    tooltip: {
      enabled: true,
    },

    legend: {
      position: "top",
    },

    title: {
      text: "Business Growth Analysis",
      align: "center",
    },

    noData: {
      text: "No graph data available",
    },
  };

  const series = [
    {
      name: "Sales",
      data: data.map((item) => Number(item.sales)),
    },

    {
      name: "Expenses",
      data: data.map((item) => Number(item.expenses)),
    },

    {
      name: "Profit",
      data: data.map((item) => Number(item.sales) - Number(item.expenses)),
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2">{companyName}</h1>

        <p className="text-slate-400">
          Real-time business performance insights and analytics
        </p>

        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 mt-8">
          <h2 className="text-2xl font-bold">Company Name</h2>

          <p className="text-blue-400 text-xl mt-2">{companyName}</p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 mb-10">
        <h2 className="text-3xl font-black mb-6">Enter Business Data</h2>

        <div className="grid md:grid-cols-3 gap-5">
          <input
            type="number"
            name="sales"
            placeholder="Enter Sales"
            value={formData.sales}
            onChange={handleChange}
            className="bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500"
          />

          <input
            type="number"
            name="expenses"
            placeholder="Enter Expenses"
            value={formData.expenses}
            onChange={handleChange}
            className="bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-purple-500"
          />

          <input
            type="number"
            name="customers"
            placeholder="Enter Customers"
            value={formData.customers}
            onChange={handleChange}
            className="bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-500"
          />
        </div>

        <button
          onClick={handleAddData}
          className="mt-6 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-bold transition-all duration-300"
        >
          Save Business Data
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-105 transition-all duration-300">
          <h3 className="text-slate-300 text-lg">Total Sales</h3>

          <p className="text-4xl font-black text-green-400 mt-3">
            ₹ {totalSales}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-105 transition-all duration-300">
          <h3 className="text-slate-300 text-lg">Total Expenses</h3>

          <p className="text-4xl font-black text-red-400 mt-3">
            ₹ {totalExpenses}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-105 transition-all duration-300">
          <h3 className="text-slate-300 text-lg">Total Profit</h3>

          <p className="text-4xl font-black text-yellow-400 mt-3">
            ₹ {totalProfit}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-105 transition-all duration-300">
          <h3 className="text-slate-300 text-lg">Customers</h3>

          <p className="text-4xl font-black text-blue-400 mt-3">
            {totalCustomers}
          </p>
        </div>
      </div>

      {/* AI SUGGESTION */}
      {latest && (
        <div className="bg-linear-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-3xl p-6 mb-8 backdrop-blur-xl">
          <h3 className="text-2xl font-bold mb-3">AI Business Suggestion</h3>

          {Number(latest.sales) < Number(latest.expenses) ? (
            <p className="text-red-300 text-lg">
              ⚠️ Expenses are higher than sales.
            </p>
          ) : (
            <p className="text-green-300 text-lg">
              ✅ Business growth looks healthy.
            </p>
          )}
        </div>
      )}

      {/* CHART */}
      <div className="bg-white/10 border border-white/10 rounded-[30px] p-6 backdrop-blur-xl mb-8">
        <Chart options={options} series={series} type="bar" height={420} />
      </div>

      {/* BUTTONS */}
      <div className="flex flex-wrap gap-5 mb-8">
        <button
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl font-bold transition-all duration-300"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? "Hide Previous Values" : "Show Previous Values"}
        </button>

        <button
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-2xl font-bold transition-all duration-300"
          onClick={() => setShowPlan(!showPlan)}
        >
          {showPlan ? "Hide Graph Plan" : "Show Graph Plan"}
        </button>
      </div>

      {/* GRAPH PLAN */}
      {showPlan && (
        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 mb-8 backdrop-blur-xl">
          <h3 className="text-2xl font-bold mb-4">Graph Plan</h3>

          <div className="space-y-3 text-lg">
            <p className="text-blue-400">🔵 Blue = Sales</p>

            <p className="text-green-400">🟢 Green = Expenses</p>

            <p className="text-yellow-400">🟡 Yellow = Profit</p>
          </div>
        </div>
      )}

      {/* HISTORY TABLE */}
      {showHistory && (
        <div className="bg-white/10 border border-white/10 rounded-[30px] p-6 backdrop-blur-xl overflow-x-auto">
          <h3 className="text-3xl font-black mb-6">Previous Saved Values</h3>

          {data.length === 0 ? (
            <p className="text-slate-300">No previous data available</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-300">
                  <th className="p-4">Entry</th>
                  <th className="p-4">Sales</th>
                  <th className="p-4">Expenses</th>
                  <th className="p-4">Customers</th>
                  <th className="p-4">Profit</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/5 transition-all"
                  >
                    <td className="p-4">Entry {index + 1}</td>

                    <td className="p-4 text-green-400">₹ {item.sales}</td>

                    <td className="p-4 text-red-400">₹ {item.expenses}</td>

                    <td className="p-4">{item.customers}</td>

                    <td className="p-4 text-yellow-400">
                      ₹ {Number(item.sales) - Number(item.expenses)}
                    </td>

                    <td className="p-4">
                      <button
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold transition-all"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default BusinessDashboard;
