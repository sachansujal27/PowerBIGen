import React, { useState } from "react";
import API from "../api";

// --------------------------------------------------------------------------------

const uploadFile = async () => {
  const formData = new FormData();

  formData.append("file", selectedFile);

  const response = await API.post("/generate-dashboard/", formData);

  console.log(response.data);
};

// -------------------------------------------------------------------------------------
const UploadData = ({ onDataSaved, userType }) => {
  const [form, setForm] = useState({
    sales: "",
    expenses: "",
    customers: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      sales: Number(form.sales),
      expenses: Number(form.expenses),
      customers: Number(form.customers),
      user: 1, // Django User ID
    };

    try {
      // Save in Django API
      if (userType === "old") {
        await API.post("/add-data/", newData);
      }

      // Save locally
      onDataSaved(newData);

      alert("Data Saved Successfully");

      setForm({
        sales: "",
        expenses: "",
        customers: "",
      });
    } catch (err) {
      console.error("Save error:", err.response?.data || err.message);
      alert("Error saving data");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-4 items-center"
      >
        {/* Sales */}
        <input
          className="w-full md:w-1/4 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition"
          type="number"
          placeholder="Sales"
          value={form.sales}
          onChange={(e) => setForm({ ...form, sales: e.target.value })}
        />

        {/* Expenses */}
        <input
          className="w-full md:w-1/4 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition"
          type="number"
          placeholder="Expenses"
          value={form.expenses}
          onChange={(e) => setForm({ ...form, expenses: e.target.value })}
        />

        {/* Customers */}
        <input
          className="w-full md:w-1/4 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition"
          type="number"
          placeholder="Customers"
          value={form.customers}
          onChange={(e) => setForm({ ...form, customers: e.target.value })}
        />

        {/* Button */}
        <button
          className="w-full md:w-auto px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-800 text-white font-semibold hover:scale-105 transition-all"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadData;
