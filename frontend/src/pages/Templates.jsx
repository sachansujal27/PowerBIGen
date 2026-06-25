import { useState } from "react";
import templates from "../data/templates";
import TemplateCard from "../components/TemplateCard";

export default function Templates({ recommended, onSelect }) {
  const [search, setSearch] = useState("");

  const onlineTemplates = [
    {
      id: 1,
      name: "Quality Dashboard",
      image:
        "https://ajelix.com/wp-content/themes/yootheme/cache/e0/Quality-dashboard-by-ajelix-edited-scaled-e0e91020.webp",
    },
    {
      id: 2,
      name: "CRM Dashboard",
      image:
        "https://blog.coupler.io/app/uploads/2025/08/pipedrive-crm-dashboard-power-bi.png",
    },
    {
      id: 3,
      name: "Customer Support Dashboard",
      image:
        "https://www.geckoboard.com/uploads/Live-customer-support-dashboard-example.png",
    },
    {
      id: 4,
      name: "Amazon Sales Dashboard",
      image:
        "https://i0.wp.com/thedeveloperyt.com/wp-content/uploads/2024/07/zjP-FhG6PAU-HD-2.jpg?fit=1280%2C720&ssl=1",
    },

    {
      id: 6,
      name: "Analytics Dashboard",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    },
  ];

  const filteredTemplates = templates.filter(
    (t) =>
      (t.category === recommended || t.category === "general") &&
      t.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-white">
          📊 Aurex BI Dashboard Templates
        </h1>

        <p className="text-slate-400 mt-3">
          Choose a professional Power BI-style dashboard template for your
          uploaded dataset.
        </p>

        <input
          type="text"
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            mt-5
            w-full
            bg-slate-900
            border
            border-slate-700
            rounded-xl
            px-4
            py-3
            text-white
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        />
      </div>

      {/* Online Dashboard Gallery */}
      <div className="max-w-7xl mx-auto mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">
          🌎 Professional Dashboard Gallery
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {onlineTemplates.map((template) => (
            <div
              key={template.id}
              className="
                bg-slate-900
                rounded-3xl
                overflow-hidden
                border
                border-slate-700
                hover:border-cyan-500
                transition-all
                duration-300
                hover:-translate-y-2
                shadow-lg
              "
            >
              <img
                src={template.image}
                alt={template.name}
                loading="lazy"
                className="w-full h-56 object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80";
                }}
              />

              <div className="p-5">
                <h3 className="text-white font-bold text-lg">
                  {template.name}
                </h3>

                <p className="text-slate-400 text-sm mt-2">
                  Interactive Power BI-style dashboard with KPIs, charts,
                  analytics and filters.
                </p>

                <button
                  onClick={() => onSelect?.(template)}
                  className="
                    mt-4
                    w-full
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    text-white
                    py-3
                    rounded-xl
                    font-semibold
                    hover:opacity-90
                  "
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommended Templates */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">
          🚀 AI Recommended Templates
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={onSelect}
            />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center text-slate-400 mt-10">
            No templates found.
          </div>
        )}
      </div>
    </div>
  );
}
