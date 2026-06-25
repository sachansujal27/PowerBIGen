import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-400/20 blur-[150px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full"></div>

      {/* Floating Analytics Cards */}
      <div className="hidden lg:flex absolute left-12 flex-col gap-6">
        {/* Revenue Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 w-64 shadow-xl animate-pulse">
          <p className="text-gray-300 text-sm">Revenue</p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-2">$124K</h2>

          <p className="text-green-400 mt-2">+18.5% this month</p>

          <div className="w-full h-2 bg-white/20 rounded-full mt-4">
            <div className="w-[82%] h-full bg-yellow-400 rounded-full"></div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 w-72 shadow-xl">
          <h3 className="text-white mb-5 font-semibold">Sales Analytics</h3>

          <div className="flex items-end gap-3 h-36">
            <div className="w-8 bg-yellow-400 h-16 rounded-t-lg"></div>
            <div className="w-8 bg-blue-500 h-24 rounded-t-lg"></div>
            <div className="w-8 bg-green-500 h-20 rounded-t-lg"></div>
            <div className="w-8 bg-purple-500 h-28 rounded-t-lg"></div>
            <div className="w-8 bg-cyan-400 h-32 rounded-t-lg"></div>
          </div>
        </div>

        {/* Users Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 w-64 shadow-xl">
          <p className="text-gray-300 text-sm">Active Users</p>

          <h2 className="text-4xl font-bold text-blue-400 mt-2">8,241</h2>

          <p className="text-green-400 mt-2">+12% Growth</p>
        </div>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="
          relative
          z-10
          w-[420px]
          bg-white/10
          backdrop-blur-2xl
          border
          border-white/20
          rounded-[30px]
          p-8
          shadow-2xl
        "
      >
        {/* Power BI Logo */}
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-400 p-4 rounded-2xl">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="black">
              <rect x="2" y="10" width="4" height="10" />
              <rect x="9" y="6" width="4" height="14" />
              <rect x="16" y="2" width="4" height="18" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-white">
          Power BI Analytics
        </h1>

        <p className="text-center text-gray-300 mt-2 mb-8">
          Access dashboards, reports and insights
        </p>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email Address"
            required
            className="
              w-full
              p-4
              rounded-xl
              bg-white/10
              border border-white/20
              text-white
              placeholder-gray-400
              outline-none
              focus:border-yellow-400
            "
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            required
            className="
              w-full
              p-4
              rounded-xl
              bg-white/10
              border border-white/20
              text-white
              placeholder-gray-400
              outline-none
              focus:border-yellow-400
            "
          />
        </div>

        {/* Remember */}
        <div className="flex justify-between items-center mb-6 text-sm">
          <label className="text-gray-300 flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <button
            type="button"
            className="text-yellow-400 hover:text-yellow-300"
          >
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="
            w-full
            py-4
            rounded-xl
            bg-yellow-400
            hover:bg-yellow-300
            transition-all
            duration-300
            font-bold
            text-black
            shadow-lg
          "
        >
          Sign In
        </button>

        {/* Register */}
        <p className="text-center text-gray-300 mt-6">
          New User?
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="ml-2 text-yellow-400 hover:text-yellow-300 font-semibold"
          >
            Create Account
          </button>
        </p>
      </form>

      {/* Floating Dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-50 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
