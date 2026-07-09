import { useState, useEffect } from "react";

// Dashboard Images
import dashboard1 from "../assets/dashboard1.png";
import dashboard2 from "../assets/dashboard2.png";
import dashboard3 from "../assets/dashboard3.png";
import dashboard4 from "../assets/dashboard4.png";
import dashboard5 from "../assets/dashboard5.png";
import dashboard6 from "../assets/dashboard6.png";
import dashboard7 from "../assets/dashboard7.png";
import dashboard8 from "../assets/dashboard8.png";
import dashboard9 from "../assets/dashboard9.png";
import dashboard10 from "../assets/dashboard10.png";
import dashboard11 from "../assets/dashboard11.png";
import dashboard12 from "../assets/dashboard12.png";
import dashboard13 from "../assets/dashboard13.png";
import dashboard14 from "../assets/dashboard14.png";
import dashboard15 from "../assets/dashboard15.png";
import dashboard16 from "../assets/dashboard16.png";
import dashboard17 from "../assets/dashboard17.png";
import dashboard18 from "../assets/dashboard18.png";
import dashboard19 from "../assets/dashboard19.png";
import dashboard20 from "../assets/dashboard20.png";
import dashboard21 from "../assets/dashboard21.png";
import dashboard22 from "../assets/dashboard22.png";
import dashboard23 from "../assets/dashboard23.png";
import dashboard24 from "../assets/dashboard24.png";
import dashboard25 from "../assets/dashboard25.png";

const CATEGORIES = [
  "All",
  "Sales",
  "Finance",
  "Marketing",
  "Operations",
  "Analytics",
];

export default function Templates() {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const templates = [
    { id: 1, name: "Sales Dashboard", image: dashboard1, category: "Sales" },
    {
      id: 2,
      name: "Finance Dashboard",
      image: dashboard2,
      category: "Finance",
    },
    {
      id: 3,
      name: "Marketing Dashboard",
      image: dashboard3,
      category: "Marketing",
    },
    { id: 4, name: "HR Dashboard", image: dashboard4, category: "Operations" },
    {
      id: 5,
      name: "Inventory Dashboard",
      image: dashboard5,
      category: "Operations",
    },
    {
      id: 6,
      name: "Executive Dashboard",
      image: dashboard6,
      category: "Analytics",
    },
    { id: 7, name: "Customer Dashboard", image: dashboard7, category: "Sales" },
    {
      id: 8,
      name: "Business Analytics",
      image: dashboard8,
      category: "Analytics",
    },
    {
      id: 9,
      name: "Healthcare Dashboard",
      image: dashboard9,
      category: "Operations",
    },
    { id: 10, name: "Retail Dashboard", image: dashboard10, category: "Sales" },
    {
      id: 11,
      name: "Manufacturing Dashboard",
      image: dashboard11,
      category: "Operations",
    },
    {
      id: 12,
      name: "Logistics Dashboard",
      image: dashboard12,
      category: "Operations",
    },
    {
      id: 13,
      name: "Project Dashboard",
      image: dashboard13,
      category: "Analytics",
    },
    {
      id: 14,
      name: "KPI Dashboard",
      image: dashboard14,
      category: "Analytics",
    },
    {
      id: 15,
      name: "Revenue Dashboard",
      image: dashboard15,
      category: "Finance",
    },
    {
      id: 16,
      name: "Profit Dashboard",
      image: dashboard16,
      category: "Finance",
    },
    {
      id: 17,
      name: "E-Commerce Dashboard",
      image: dashboard17,
      category: "Sales",
    },
    {
      id: 18,
      name: "Education Dashboard",
      image: dashboard18,
      category: "Operations",
    },
    {
      id: 19,
      name: "Banking Dashboard",
      image: dashboard19,
      category: "Finance",
    },
    {
      id: 20,
      name: "Quality Dashboard",
      image: dashboard20,
      category: "Operations",
    },
    {
      id: 21,
      name: " Warehouse Operations Dashboard",
      image: dashboard21,
      category: "Operations",
    },
    {
      id: 22,
      name: "Sales Performance Dashboard",
      image: dashboard22,
      category: "sales",
    },
    {
      id: 23,
      name: "Executive Business Dashboard",
      image: dashboard23,
      category: "Finance",
    },
    {
      id: 24,
      name: "Digital Marketing Analytics Dashboard",
      image: dashboard24,
      category: "Analytics",
    },
    {
      id: 25,
      name: "Power BI Business Overview",
      image: dashboard25,
      category: "Operations",
    },
  ];

  const filtered = templates.filter((t) => {
    const matchesCategory =
      activeCategory === "All" || t.category === activeCategory;
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.94); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .fade-up {
          animation: fadeUp 0.5s ease both;
        }
        .modal-fade {
          animation: fadeIn 0.2s ease both;
        }
        .modal-scale {
          animation: scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      {/* Header */}
      <div className="bg-[#0F1420]/95 backdrop-blur-md border-b border-white/5 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="fade-up">
              <p className="text-xs font-semibold tracking-widest text-teal-400 uppercase mb-2">
                Template Library
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Dashboard Templates
              </h1>
              <p className="text-slate-400 mt-2 max-w-xl">
                Production-ready Power BI layouts you can generate instantly
                with AI. Browse by category or search by name.
              </p>
            </div>

            {/* Search */}
            <div
              className="w-full md:w-72 fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="relative flex items-center">
                ewBox=""
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search templates..."
                  className="w-full  rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 focus:bg-white/[0.07] transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div
            className="flex flex-wrap gap-2 mt-6 fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-teal-500 text-[#0B0F19] border-teal-500 shadow-lg shadow-teal-500/20 scale-105"
                    : "bg-white/5 text-slate-300 border-white/10 hover:border-teal-500/40 hover:text-teal-300 hover:bg-white/[0.08]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">
            {filtered.length} template{filtered.length !== 1 && "s"}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 modal-fade">
            <p className="text-slate-500 text-sm">
              No templates match your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((template, i) => (
              <div
                key={template.id}
                onClick={() => setSelected(template)}
                className="group relative bg-[#131A2A] rounded-2xl overflow-hidden border border-white/5 shadow-lg hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-1.5 hover:border-teal-500/30 transition-all duration-300 cursor-pointer fade-up"
                style={{ animationDelay: `${Math.min(i * 0.04, 0.5)}s` }}
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-[#1A2233]">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="text-white text-sm font-medium px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      Preview
                    </span>
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-white truncate">
                    {template.name}
                  </h2>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 whitespace-nowrap ml-2 border border-teal-500/20">
                    {template.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-[#0B0F19]/95 backdrop-blur-md z-50 flex items-center justify-center p-6 modal-fade"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full modal-scale"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">
                {selected.name}
              </h3>
              <button
                onClick={() => setSelected(null)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-teal-500/20 hover:rotate-90 text-white transition-all duration-300"
                aria-label="Close preview"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <img
              src={selected.image}
              alt={selected.name}
              className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </div>
  );
}
