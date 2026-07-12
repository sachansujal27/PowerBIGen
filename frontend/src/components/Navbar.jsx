import { BarChart3, Database, FileText, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Home from "../pages/Home";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const checkLogin = (path) => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    sessionStorage.setItem("isLoggedIn", "true");
    console.log(isLoggedIn);

    if (isLoggedIn === "true") {
      setShowLogin(false);
      navigate(path);
    } else {
      setShowLogin(true);
    }
  };
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  return (
    <div>
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20

px-4 md:px-8 bg-[#111827]/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between lg:px-8"
      >
        {/* Background Glow */}
        <div className="absolute left-0 top-0 w-72 h-20 bg-yellow-400/10 blur-3xl pointer-events-none"></div>

        {/* Logo */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-60 animate-pulse rounded-xl"></div>

            <div className="relative w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="text-black" size={24} />
            </div>
          </div>

          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold  text-white">
              PowerBI
              <span className="text-yellow-400">Gen</span>
            </h1>

            <p className="text-xs text-slate-400">
              Analytics Intelligence Platform
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <button
            className="group relative text-slate-300 hover:text-white transition "
            onClick={() => checkLogin("/SupportPage")}
          >
            Reports
            <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            className="group relative text-slate-300 hover:text-white transition "
            onClick={() => checkLogin("/auto-dashboard")}
          >
            Auto Dashboard
            <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </button>

          <button
            className="group relative text-slate-300 hover:text-white transition"
            onClick={() => checkLogin("/Homes")}
          >
            Data Sources
            <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            className="group relative text-slate-300 hover:text-white transition"
            onClick={() => checkLogin("/templates")}
          >
            Template
            <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            className="group relative text-slate-300 hover:text-white transition"
            onClick={() => checkLogin("/report-generator")}
          >
            Report Generator
            <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Live Analytics Badge */}
          <div className="hidden md:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
            <div className="relative">
              <div className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            </div>

            <span className="text-emerald-300 text-sm">Live Analytics</span>
          </div>

          {/* Sign In */}
          <button
            onClick={() => {
              setShowLogin(false);
              navigate("/login");
            }}
            className="text-slate-300 hover:text-white font-medium transition"
          >
            Sign In
          </button>

          {/* Get Started Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <button
              onClick={() => navigate("/register")}
              className="
          bg-gradient-to-r
          from-yellow-400
          to-yellow-500
          text-black
          font-bold
          px-6
          py-3
          rounded-xl
          hover:scale-105
          transition-all
          duration-300
          shadow-lg
        "
            >
              Get Started
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 top-16 w-[340px]
        bg-[#111827]
        border border-white/10
        rounded-3xl
        shadow-2xl
        transition-all duration-300
        ${
          showMenu
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-3 invisible"
        }`}
            >
              <div className="p-5 space-y-4">
                <div
                  className="flex
flex-col
sm:flex-row
gap-4
p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center text-xl">
                    🚀
                  </div>

                  <div>
                    <h4 className="font-semibold text-white">Create Report</h4>

                    <p className="text-sm text-slate-400">
                      Generate reports instantly using AI.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center text-xl">
                    📊
                  </div>

                  <div>
                    <h4 className="font-semibold text-white">
                      Dashboard Templates
                    </h4>

                    <p className="text-sm text-slate-400">
                      Ready-made Power BI dashboards.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-xl">
                    🔗
                  </div>

                  <div>
                    <h4 className="font-semibold text-white">Connect Data</h4>

                    <p className="text-sm text-slate-400">
                      Excel, SQL, CSV and APIs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* -----Excel Button */}
          {/* -----Excel Button */}
          <button
            onClick={() => checkLogin("/excel-data-manager")}
            className="
bg-gradient-to-r
from-cyan-500
to-blue-600
text-white
font-semibold
px-5
py-3
rounded-xl
hover:scale-105
transition-all
duration-300
shadow-lg
flex
items-center
gap-2
```

"
          >
            DataVault Pro
          </button>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="
        p-3
        rounded-xl
        bg-white/5
        border border-white/10
        hover:bg-white/10
        transition
      "
          >
            {open ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>
      </nav>
      {showLogin && (
        <div className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center">
          <div className="bg-slate-900 p-8 rounded-2xl w-[400px] border border-yellow-400">
            <h2 className="text-3xl text-white font-bold text-center">
              Login Required
            </h2>

            <p className="text-gray-300 text-center mt-4">
              Please Login or Register first.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="w-full mt-6 py-3 rounded-xl bg-yellow-400 font-bold"
            >
              Login
            </button>

            <button
              onClick={() => {
                setShowLogin(false);
                navigate("/register");
              }}
              className="w-full mt-4 py-3 rounded-xl bg-blue-600 text-white"
            >
              Register
            </button>
          </div>
        </div>
      )}

      <Home />
    </div>
  );
}

// import { BarChart } from "lucide-react";

// export default function Navbar() {
//   return (
//     <nav
//       className="fixed top-0 left-0 right-0 z-50 h-14
//                     bg-navy-800 border-b border-navy-700
//                     flex items-center px-4 gap-3 shadow-lg"
//     >
//       <BarChart className="text-indigo-400" size={22} />
//       <span className="font-bold text-lg tracking-tight text-white">
//         DataViz <span className="text-indigo-400">Pro</span>
//       </span>
//       <span className="ml-auto text-xs text-slate-400">
//         Power BI-Style Analytics
//       </span>
//     </nav>
//   );
// }
