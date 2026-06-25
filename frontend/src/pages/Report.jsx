import React, { useState } from "react";
import {
  FileText,
  LifeBuoy,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  Plus,
  CheckCircle,
  Search,
  Bell,
  Download,
} from "lucide-react";

const ReportsSupportCenter = () => {
  const [reportName, setReportName] = useState("");

  const tickets = [
    {
      id: "#1024",
      issue: "Dashboard Loading Error",
      status: "Open",
      priority: "High",
    },
    {
      id: "#1025",
      issue: "Data Upload Failed",
      status: "Pending",
      priority: "Medium",
    },
    {
      id: "#1026",
      issue: "Chart Rendering Issue",
      status: "Resolved",
      priority: "Low",
    },
  ];

  const reports = [
    "Monthly Sales Dashboard",
    "Financial Forecast Report",
    "Customer Analytics Dashboard",
    "Revenue Performance Report",
  ];

  return (
    <div className="min-h-screen bg-[#050B18] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-500/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4">
              <ShieldCheck className="text-yellow-400" size={18} />
              <span className="text-yellow-300">
                Enterprise Reports & Support
              </span>
            </div>

            <h1 className="text-5xl font-bold">Reports & Support Center</h1>

            <p className="text-slate-400 mt-3 max-w-3xl">
              Generate reports, manage support tickets, access documentation and
              monitor analytics infrastructure.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-slate-900 border border-slate-700 p-3 rounded-xl">
              <Search size={18} />
            </button>

            <button className="bg-slate-900 border border-slate-700 p-3 rounded-xl">
              <Bell size={18} />
            </button>

            <button className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl hover:scale-105 transition">
              New Report
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-5 mb-10">
          <StatCard title="Reports" value="248" />
          <StatCard title="Open Tickets" value="18" />
          <StatCard title="Resolved" value="97%" />
          <StatCard title="System Uptime" value="99.9%" />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <ActionCard
            icon={<FileText size={32} />}
            title="Create Report"
            color="yellow"
          />

          <ActionCard
            icon={<LifeBuoy size={32} />}
            title="Support Ticket"
            color="blue"
          />

          <ActionCard
            icon={<BookOpen size={32} />}
            title="Knowledge Base"
            color="green"
          />

          <ActionCard
            icon={<MessageSquare size={32} />}
            title="Live Support"
            color="purple"
          />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Report Generator */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-[30px] p-8">
              <div className="flex items-center gap-3 mb-6">
                <Plus className="text-yellow-400" />
                <h2 className="text-2xl font-bold">Generate New Report</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <input
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="Report Name"
                  className="bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-yellow-400"
                />

                <select className="bg-slate-800 border border-slate-700 rounded-xl p-3">
                  <option>Sales Analytics</option>
                  <option>Finance</option>
                  <option>Marketing</option>
                  <option>Operations</option>
                </select>

                <select className="bg-slate-800 border border-slate-700 rounded-xl p-3">
                  <option>Low Priority</option>
                  <option>Medium Priority</option>
                  <option>High Priority</option>
                </select>

                <input
                  type="file"
                  className="bg-slate-800 border border-slate-700 rounded-xl p-3"
                />
              </div>

              <textarea
                rows="4"
                placeholder="Report Description..."
                className="w-full mt-5 bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-yellow-400"
              />

              <div className="flex gap-4 mt-6">
                <button className="bg-yellow-400 text-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition">
                  Generate Report
                </button>

                <button className="border border-slate-700 px-8 py-3 rounded-xl hover:bg-slate-800 transition">
                  Save Draft
                </button>
              </div>
            </div>

            {/* Tickets */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-[30px] p-8">
              <h2 className="text-2xl font-bold mb-6">Support Tickets</h2>

              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-slate-800 rounded-2xl p-5 flex justify-between items-center hover:border-yellow-400/20 border border-transparent transition"
                  >
                    <div>
                      <h3 className="font-semibold">{ticket.issue}</h3>

                      <p className="text-slate-400 text-sm">{ticket.id}</p>
                    </div>

                    <div className="flex gap-3">
                      <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-sm">
                        {ticket.priority}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          ticket.status === "Resolved"
                            ? "bg-green-500/10 text-green-400"
                            : ticket.status === "Pending"
                              ? "bg-yellow-500/10 text-yellow-400"
                              : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* System Status */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-[30px] p-8">
              <h2 className="text-xl font-bold mb-5">System Status</h2>

              <StatusItem title="AI Engine" />
              <StatusItem title="Analytics Server" />
              <StatusItem title="Database" />
              <StatusItem title="Report Generator" />
            </div>

            {/* Knowledge Base */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-[30px] p-8">
              <h2 className="text-xl font-bold mb-5">Knowledge Base</h2>

              <ul className="space-y-4 text-slate-300">
                <li>How to Upload Data</li>
                <li>Dashboard Creation Guide</li>
                <li>Chart Customization</li>
                <li>API Integration</li>
                <li>Export Reports</li>
              </ul>
            </div>

            {/* Recent Reports */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-[30px] p-8">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold">Recent Reports</h2>

                <Download size={18} />
              </div>

              <div className="space-y-4">
                {reports.map((report, i) => (
                  <div
                    key={i}
                    className="bg-slate-800 rounded-xl p-4 hover:bg-slate-700 transition"
                  >
                    <p className="font-medium">{report}</p>

                    <p className="text-slate-400 text-sm">Generated Recently</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
    <p className="text-slate-400 text-sm">{title}</p>
    <h3 className="text-3xl font-bold text-yellow-400 mt-2">{value}</h3>
  </div>
);

const ActionCard = ({ icon, title, color }) => {
  const colors = {
    yellow: "text-yellow-400",
    blue: "text-blue-400",
    green: "text-green-400",
    purple: "text-purple-400",
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 hover:-translate-y-1 hover:border-yellow-500/30 transition-all cursor-pointer">
      <div className={`${colors[color]} mb-4`}>{icon}</div>

      <h3 className="font-bold text-lg">{title}</h3>
    </div>
  );
};

const StatusItem = ({ title }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-800">
    <span>{title}</span>

    <div className="flex items-center gap-2 text-green-400">
      <CheckCircle size={16} />
      Online
    </div>
  </div>
);

export default ReportsSupportCenter;
