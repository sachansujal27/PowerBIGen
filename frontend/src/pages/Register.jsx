import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register/", {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      alert(res.data.message || "Registration Successful!");

      navigate("/login");
    } catch (err) {
      console.log(err);

      if (err.response) {
        console.log(err.response.data);
        alert(err.response.data.error || JSON.stringify(err.response.data));
      } else {
        alert(err.message);
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#071018] flex items-center justify-center">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Glow */}
      <div className="absolute top-[-150px] left-[-150px] w-[450px] h-[450px] bg-emerald-500/20 rounded-full blur-[150px]" />

      <div className="absolute bottom-[-150px] right-[-150px] w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[150px]" />

      <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] bg-teal-400/10 rounded-full blur-[120px]" />

      {/* Left Cards */}
      <div className="hidden lg:flex absolute left-12 flex-col gap-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 w-72">
          <p className="text-gray-400 text-sm">Platform Growth</p>

          <h2 className="text-5xl font-bold text-emerald-400 mt-2">+86%</h2>

          <p className="text-emerald-300 mt-2">Monthly Increase</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 w-72">
          <h3 className="text-white mb-6">Registration Trend</h3>

          <div className="flex items-end gap-3 h-36">
            <div className="w-8 bg-emerald-500 h-12 rounded-t-xl"></div>

            <div className="w-8 bg-cyan-500 h-20 rounded-t-xl"></div>

            <div className="w-8 bg-teal-500 h-28 rounded-t-xl"></div>

            <div className="w-8 bg-emerald-400 h-24 rounded-t-xl"></div>

            <div className="w-8 bg-cyan-400 h-36 rounded-t-xl"></div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 w-72">
          <p className="text-gray-400">Organizations</p>

          <h2 className="text-4xl font-bold text-cyan-400 mt-2">150+</h2>

          <p className="text-cyan-300 mt-2">Connected Teams</p>
        </div>
      </div>

      {/* Register Form */}
      <form
        onSubmit={handleRegister}
        className="relative z-10 w-[460px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-[0_0_60px_rgba(0,0,0,0.4)]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <span className="text-3xl font-bold text-white">BI</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center text-white">
          Create Account
        </h1>

        <p className="text-center text-gray-400 mt-2 mb-8">
          Join the Business Intelligence Platform
        </p>

        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full p-4 mb-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-emerald-400 outline-none"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-4 mb-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-emerald-400 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-4 mb-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-emerald-400 outline-none"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="w-full p-4 mb-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-emerald-400 outline-none"
        />
        <label className="flex items-center gap-0 text-gray-400 text-sm mb-2 whitespace-nowrap">
          <input
            type="checkbox"
            required
            className="w-4 h-4 accent-cyan-500 cursor-pointer flex-shrink-0"
          />

          <span>I agree to the Terms & Conditions</span>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-linear-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:scale-105 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="ml-2 text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            Login
          </button>
        </p>
      </form>

      {/* Floating Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-emerald-300 rounded-full opacity-50 animate-pulse"
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
