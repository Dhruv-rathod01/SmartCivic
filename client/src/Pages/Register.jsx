import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCity } from "react-icons/fa";
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineArrowRight } from "react-icons/hi";
import { MdOutlineAddLocationAlt, MdOutlineNotificationsActive, MdOutlineHowToReg } from "react-icons/md";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/register`,
        { name, username, email, password },
        { withCredentials: true }
      );

      if (response.data.success === true) {
        navigate("/home");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0d1015] text-zinc-100 flex flex-col justify-between px-6 py-4 lg:px-14 lg:py-5">
      
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
          <span className="hidden sm:inline text-zinc-400">Already registered?</span>
          <Link
            to="/login"
            className="rounded-lg border border-zinc-800 bg-zinc-900/90 px-4 py-2 font-medium text-zinc-200 hover:border-zinc-700 hover:text-white transition"
          >
            Sign in
          </Link>
        </div>
      </header>

      <main className="w-full max-w-[1280px] mx-auto my-auto py-3 grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-14">
        
        
        <section className="lg:col-span-5 w-full max-w-[440px] mx-auto lg:mx-0">
          <div className="mb-4">
            <span className="inline-block rounded-md bg-amber-400/10 border border-amber-400/20 px-3 py-1 text-xs font-medium text-amber-300 mb-2">
              Citizen Onboarding
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Create your account
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Join your neighborhood network to report and track civic issues.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Full name"
                  className="w-full rounded-lg border border-zinc-800 bg-[#141820] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Username"
                  className="w-full rounded-lg border border-zinc-800 bg-[#141820] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-zinc-800 bg-[#141820] px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Password <span className="text-xs text-zinc-500 font-normal">(min. 6 chars)</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                  placeholder="Create a strong password"
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
              <span>{loading ? "Creating account..." : "Create Account"}</span>
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

        {/* RIGHT SIDE: Onboarding Steps Showcase Card (7 Columns) */}
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
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                  How SmartCivic Works
                </p>
                <h2 className="text-2xl xl:text-[26px] font-bold text-white mt-1.5 leading-snug">
                  Your voice directly shapes your ward.
                </h2>
                <p className="text-sm text-zinc-400 mt-1.5 max-w-lg">
                  One verified citizen account gives you direct access to report infrastructure issues and hold local departments accountable.
                </p>
              </div>

              {/* 3-Step Workflow Cards */}
              <div className="space-y-3.5 border-t border-zinc-800/80 pt-5">
                <div className="flex items-start gap-4 rounded-xl border border-zinc-800 bg-[#0d1015] p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
                    <MdOutlineHowToReg size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">1. Verify your citizen profile</p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Set up your account in under 30 seconds to submit authentic reports.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-zinc-800 bg-[#0d1015] p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
                    <MdOutlineAddLocationAlt size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">2. Pin & submit local problems</p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Report potholes, broken streetlights, or sanitation issues with exact location tags.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-zinc-800 bg-[#0d1015] p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
                    <MdOutlineNotificationsActive size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">3. Track until verified resolution</p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Get live status updates as municipal teams inspect and resolve your ticket.
                    </p>
                  </div>
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

export default Register;