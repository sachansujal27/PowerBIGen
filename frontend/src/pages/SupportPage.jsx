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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        setMessage("Support request submitted successfully.");
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
      setMessage("Server connection failed.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050B18] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-slate-900/80 border border-slate-800 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <LifeBuoy className="text-yellow-400" size={34} />
          <div>
            <h1 className="text-3xl font-bold">Aurex BI Support Center</h1>
            <p className="text-slate-400">
              Submit your issue directly to our support team
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-slate-300">User Name</label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-4 text-slate-400"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full pl-10 p-3 bg-slate-800 border border-slate-700 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-slate-300">User Email</label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-4 text-slate-400"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full pl-10 p-3 bg-slate-800 border border-slate-700 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-slate-300">
              Company Support Email
            </label>

            <input
              type="email"
              value={companyEmail}
              readOnly
              className="w-full p-3 bg-slate-700 text-yellow-400 border border-slate-600 rounded-xl cursor-not-allowed"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Issue Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl"
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
              <label className="block mb-2">Priority</label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2">Describe Your Issue</label>

            <textarea
              rows="6"
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              required
              placeholder="Explain your problem in detail..."
              className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition"
          >
            <Send size={18} />
            {loading ? "Sending..." : "Submit Support Ticket"}
          </button>

          {message && (
            <div className="mt-4 bg-slate-800 p-4 rounded-xl flex items-center gap-2">
              <AlertCircle size={18} />
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SupportPage;
