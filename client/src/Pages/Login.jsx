import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaCity } from "react-icons/fa";
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineArrowRight } from "react-icons/hi";
import { MdOutlineVerified, MdOutlineSpeed, MdOutlineLocationCity } from "react-icons/md";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { username, email, password },
        { withCredentials: true }
      );

      if (response.data.success === true) {
        setUsername("");
        setEmail("");
        setPassword("");
        navigate("/home");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0d1015] text-zinc-100 flex flex-col justify-between px-6 py-4 lg:px-14 lg:py-5">
      
      {/* TOP NAVIGATION BAR */}
      <header className="w-full max-w-[1280px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400 text-zinc-950">
            <FaCity size={18} />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            SmartCivic
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className="hidden sm:inline text-zinc-400">Don't have an account?</span>
          <Link
            to="/register"
            className="rounded-lg border border-zinc-800 bg-zinc-900/90 px-4 py-2 font-medium text-zinc-200 hover:border-zinc-700 hover:text-white transition"
          >
            Create account
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT: Asymmetric 2-Column Split */}
      <main className="w-full max-w-[1280px] mx-auto my-auto py-3 grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-14">
        
        {/* LEFT SIDE: Properly Scaled Login Form (5 Columns) */}
        <section className="lg:col-span-5 w-full max-w-[440px] mx-auto lg:mx-0">
          <div className="mb-5">
            <span className="inline-block rounded-md bg-amber-400/10 border border-amber-400/20 px-3 py-1 text-xs font-medium text-amber-300 mb-2.5">
              Citizen Portal
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Sign in to report issues and monitor your ward's progress.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3.5">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
                className="w-full rounded-lg border border-zinc-800 bg-[#141820] px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-zinc-800 bg-[#141820] px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-zinc-300">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-amber-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-zinc-800 bg-[#141820] px-4 py-2.5 pr-11 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 cursor-pointer"
                >
                  {showPassword ? <HiOutlineEyeOff size={18} /> : <HiOutlineEye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1 flex items-center justify-center gap-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold py-2.5 text-sm transition disabled:opacity-60 cursor-pointer"
            >
              <span>{loading ? "Signing in..." : "Sign in to Dashboard"}</span>
              {!loading && <HiOutlineArrowRight size={16} />}
            </button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-xs font-medium text-zinc-500">OR</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          <a
            href={`${API_URL}/auth/google`}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-zinc-800 bg-[#141820] hover:bg-zinc-800/80 py-2.5 text-sm font-medium text-zinc-200 transition"
          >
            <svg viewBox="0 0 48 48" className="h-4 w-4">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.08 13.22l7.98 6.19C12.95 13.72 18.02 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.62 5.91c4.45-4.11 7.14-10.17 7.14-17.56z" />
              <path fill="#FBBC05" d="M10.06 28.59A14.4 14.4 0 0 1 9.3 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.58 10.78l7.48-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.89l-7.62-5.91c-2.12 1.42-4.83 2.26-8.28 2.26-5.98 0-11.05-4.22-12.94-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            Continue with Google
          </a>
        </section>

        {/* RIGHT SIDE: Civic Command Showcase Card (7 Columns) */}
        <section className="hidden lg:block lg:col-span-7">
          <div className="rounded-2xl border border-zinc-800/90 bg-[#131720] p-8 xl:p-9 relative overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "radial-gradient(#fbbf24 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                    SmartCivic Network
                  </p>
                  <h2 className="text-2xl xl:text-[26px] font-bold text-white mt-1.5 leading-snug">
                    Cleaner streets, faster municipal action.
                  </h2>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-medium text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Live Portal
                </span>
              </div>

              {/* 3 Horizontal Metric Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl border border-zinc-800 bg-[#0d1015] p-4">
                  <p className="text-xs text-zinc-400">Avg. Response</p>
                  <p className="text-xl font-bold text-white mt-1">24 hrs</p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-[#0d1015] p-4">
                  <p className="text-xs text-zinc-400">Issues Resolved</p>
                  <p className="text-xl font-bold text-amber-400 mt-1">94.2%</p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-[#0d1015] p-4">
                  <p className="text-xs text-zinc-400">Active Wards</p>
                  <p className="text-xl font-bold text-white mt-1">48 Zones</p>
                </div>
              </div>

              {/* Feature Rows */}
              <div className="space-y-3 border-t border-zinc-800/80 pt-5 text-sm">
                <div className="flex items-center justify-between rounded-xl bg-[#0d1015]/80 px-4 py-3 border border-zinc-800/60">
                  <div className="flex items-center gap-3">
                    <MdOutlineLocationCity className="text-amber-400 text-lg" />
                    <span className="text-zinc-200 font-medium">Geo-tagged civic complaints</span>
                  </div>
                  <span className="text-xs text-zinc-500">Auto-routed to dept</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#0d1015]/80 px-4 py-3 border border-zinc-800/60">
                  <div className="flex items-center gap-3">
                    <MdOutlineSpeed className="text-amber-400 text-lg" />
                    <span className="text-zinc-200 font-medium">Real-time status timeline</span>
                  </div>
                  <span className="text-xs text-zinc-500">Instant notifications</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#0d1015]/80 px-4 py-3 border border-zinc-800/60">
                  <div className="flex items-center gap-3">
                    <MdOutlineVerified className="text-amber-400 text-lg" />
                    <span className="text-zinc-200 font-medium">Photo-verified completion</span>
                  </div>
                  <span className="text-xs text-zinc-500">Citizen sign-off</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* MINIMAL FOOTER */}
      <footer className="w-full max-w-[1280px] mx-auto flex items-center justify-between text-xs text-zinc-500">
        <span>© 2026 SmartCivic Platform</span>
        <span>Built for better neighbourhoods</span>
      </footer>
    </div>
  );
};

export default Login;