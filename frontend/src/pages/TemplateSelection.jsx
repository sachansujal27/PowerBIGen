import React from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Briefcase,
  HeartPulse,
  GraduationCap,
  Building2,
  Truck,
  BarChart3,
  Globe,
  Banknote,
} from "lucide-react";

const TemplateSelection = () => {
  const navigate = useNavigate();

  const templates = [
    {
      id: 1,
      title: "Sales Dashboard",
      icon: TrendingUp,
      color: "from-cyan-500 to-blue-600",
    },
    {
      id: 2,
      title: "Finance Dashboard",
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 3,
      title: "Retail Analytics",
      icon: ShoppingCart,
      color: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      title: "HR Analytics",
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 5,
      title: "Business KPI",
      icon: Briefcase,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 6,
      title: "Healthcare Dashboard",
      icon: HeartPulse,
      color: "from-red-500 to-pink-600",
    },
    {
      id: 7,
      title: "Education Analytics",
      icon: GraduationCap,
      color: "from-indigo-500 to-blue-500",
    },
    {
      id: 8,
      title: "Real Estate",
      icon: Building2,
      color: "from-slate-500 to-slate-700",
    },
    {
      id: 9,
      title: "Supply Chain",
      icon: Truck,
      color: "from-cyan-500 to-teal-500",
    },
    {
      id: 10,
      title: "Executive Overview",
      icon: BarChart3,
      color: "from-violet-500 to-purple-600",
    },
    {
      id: 11,
      title: "Global Analytics",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 12,
      title: "Banking Dashboard",
      icon: Banknote,
      color: "from-green-500 to-lime-500",
    },
  ];

  const handleTemplateSelect = (template) => {
    const dashboardData = JSON.parse(localStorage.getItem("dashboardData"));

    if (!dashboardData) {
      alert("No uploaded data found. Please upload a file first.");
      navigate("/upload");
      return;
    }

    localStorage.setItem("selectedTemplate", JSON.stringify(template));

    navigate("/dashboard", {
      state: {
        ...dashboardData,
        selectedTemplate: template,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
            Power BI Template Gallery
          </span>

          <h1 className="text-5xl font-bold mt-5">Choose Dashboard Template</h1>

          <p className="text-slate-400 mt-4 text-lg">
            Select a dashboard design for your uploaded dataset.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => {
            const Icon = template.icon;

            return (
              <div
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className="
                  cursor-pointer
                  rounded-3xl
                  overflow-hidden
                  bg-slate-900
                  border
                  border-slate-800
                  hover:border-cyan-500
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >
                {/* Preview */}
                <div
                  className={`h-44 bg-gradient-to-br ${template.color} relative p-5`}
                >
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-xl" />
                    <div className="absolute top-4 right-4 w-20 h-10 bg-white rounded-lg" />
                    <div className="absolute bottom-4 left-4 right-4 h-16 bg-white rounded-xl" />
                  </div>

                  <Icon size={50} className="text-white relative z-10" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold">{template.title}</h3>

                  <p className="text-slate-400 text-sm mt-2">
                    Power BI style dashboard with KPIs, charts and analytics.
                  </p>

                  <button
                    className="
                      mt-4
                      w-full
                      py-3
                      rounded-xl
                      bg-cyan-600
                      hover:bg-cyan-700
                      font-semibold
                    "
                  >
                    Use Template
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
