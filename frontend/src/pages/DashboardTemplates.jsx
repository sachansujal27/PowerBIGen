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

const DashboardTemplates = () => {
  const navigate = useNavigate();

  const templates = [
    {
      title: "Sales Dashboard",
      icon: TrendingUp,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Finance Dashboard",
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Retail Analytics",
      icon: ShoppingCart,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "HR Analytics",
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Business KPI",
      icon: Briefcase,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Healthcare Dashboard",
      icon: HeartPulse,
      color: "from-red-500 to-pink-600",
    },
    {
      title: "Education Analytics",
      icon: GraduationCap,
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Real Estate",
      icon: Building2,
      color: "from-slate-500 to-slate-700",
    },
    {
      title: "Supply Chain",
      icon: Truck,
      color: "from-cyan-500 to-teal-500",
    },
    {
      title: "Executive Overview",
      icon: BarChart3,
      color: "from-violet-500 to-purple-600",
    },
    {
      title: "Global Analytics",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Banking Dashboard",
      icon: Banknote,
      color: "from-green-500 to-lime-500",
    },
  ];

  const handleTemplateSelect = (template) => {
    const dashboardData = JSON.parse(localStorage.getItem("dashboardData"));

    if (!dashboardData) {
      alert("Please upload dataset first");
      navigate("/builder");
      return;
    }

    localStorage.setItem("selectedTemplate", JSON.stringify(template));

    navigate("/generated-dashboard", {
      state: {
        ...dashboardData,
        selectedTemplate: template,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">Choose Dashboard Template</h1>

          <p className="text-slate-400 mt-4">
            Select a dashboard design for your uploaded dataset.
          </p>
        </div>

        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template, index) => {
            const Icon = template.icon;

            return (
              <div
                key={index}
                onClick={() => handleTemplateSelect(template)}
                className="
                  cursor-pointer
                  rounded-3xl
                  overflow-hidden
                  border
                  border-slate-700
                  bg-slate-900
                  hover:border-cyan-500
                  hover:-translate-y-2
                  transition-all
                "
              >
                <div className={`h-44 bg-gradient-to-br ${template.color} p-5`}>
                  <Icon size={50} />
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg">{template.title}</h3>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplateSelect(template);
                    }}
                    className="
                      mt-4
                      w-full
                      py-3
                      rounded-xl
                      bg-cyan-600
                      hover:bg-cyan-700
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

export default DashboardTemplates;
