import React, { useState } from "react";
import { LifeBuoy, Mail, User, Send, AlertCircle } from "lucide-react";

const SupportPage = () => {
  const companyEmail = "sachansujal27@gmail.com";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Dashboard Issue",
    priority: "Medium",
    issue: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/send-email/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `${formData.category} (${formData.priority})`,
          message: formData.issue,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(" Support request submitted successfully.");

        setFormData({
          name: "",
          email: "",
          category: "Dashboard Issue",
          priority: "Medium",
          issue: "",
        });
      } else {
        setMessage(data.error || "Failed to send request.");
      }
    } catch (err) {
      setMessage("❌ Server connection failed.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050B18] flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl p-8 md:p-10 text-white">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-yellow-400/10 p-3 rounded-full">
            <LifeBuoy size={34} className="text-yellow-400" />
          </div>

          <div>
            <h1 className="text-4xl font-bold"> POWERBIGEN Support Center</h1>

            <p className="text-slate-400 text-lg mt-1">
              Submit your issue directly to our support team
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-lg mb-2 text-slate-300">
              User Name
            </label>

            <div className="flex items-center h-14 bg-slate-800 border border-slate-700 rounded-xl px-4 focus-within:ring-2 focus-within:ring-yellow-400">
              <User size={20} className="text-slate-400 mr-3 flex-shrink-0" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-400 mt-3"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg mb-2 text-slate-300">
              User Email
            </label>

            <div className="flex items-center h-14 bg-slate-800 border border-slate-700 rounded-xl px-4 focus-within:ring-2 focus-within:ring-yellow-400">
              <Mail size={20} className="text-slate-400 mr-3 flex-shrink-0" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-400 mt-3"
              />
            </div>
          </div>

          {/* Company Email */}
          <div>
            <label className="block text-lg mb-2 text-slate-300">
              Company Support Email
            </label>

            <input
              type="email"
              value={companyEmail}
              readOnly
              className="w-full h-14 px-4 rounded-xl bg-slate-700 border border-slate-600 text-yellow-400 cursor-not-allowed outline-none mt-3"
            />
          </div>

          {/* Category + Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg mb-2 text-slate-300">
                Issue Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full h-14 px-4 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option>Dashboard Issue</option>
                <option>Data Upload Error</option>
                <option>Chart Problem</option>
                <option>Login Problem</option>
                <option>Payment Issue</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-lg mb-2 text-slate-300">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full h-14 px-4 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>

          {/* Issue */}
          <div>
            <label className="block text-lg mb-2 text-slate-300">
              Describe Your Issue
            </label>

            <textarea
              rows={6}
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              required
              placeholder="Explain your problem in detail..."
              className="w-full rounded-xl bg-slate-800 border border-slate-700 p-4 outline-none resize-none focus:ring-2 focus:ring-yellow-400 placeholder:text-slate-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-xl bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 text-black font-bold flex justify-center items-center gap-3 disabled:opacity-70"
          >
            <Send size={20} />

            {loading ? "Sending..." : "Submit Support Ticket"}
          </button>

          {/* Message */}
          {message && (
            <div className="flex items-center gap-3 rounded-xl bg-slate-800 border border-slate-700 p-4">
              <AlertCircle className="text-yellow-400" size={20} />
              <span>{message}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SupportPage;
