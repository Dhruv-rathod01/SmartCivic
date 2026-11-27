import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaCity } from "react-icons/fa";
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineMail, HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlineLockReset } from "react-icons/md";

const API_URL = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);
    setLoading(true);

    try {
      await axios.post(`${API_URL}/forgot-password`, { email });
      setSubmitted(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not send reset link. Please check your email and try again."
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

        <Link
          to="/login"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/90 px-4 py-2 text-sm font-medium text-zinc-200 hover:border-zinc-700 hover:text-white transition"
        >
          <HiOutlineArrowLeft size={15} />
          <span>Back to login</span>
        </Link>
      </header>

      {/* MAIN CONTENT: Asymmetric 2-Column Split */}
      <main className="w-full max-w-[1280px] mx-auto my-auto py-4 grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-14">
        
        {/* LEFT SIDE: Reset Form (5 Columns) */}
        <section className="lg:col-span-5 w-full max-w-[440px] mx-auto lg:mx-0">
          <div className="mb-6">
            <span className="inline-block rounded-md bg-amber-400/10 border border-amber-400/20 px-3 py-1 text-xs font-medium text-amber-300 mb-2.5">
              Account Recovery
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Forgot password?
            </h1>
            <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed">
              Enter your registered email address and we'll send you instructions to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <HiOutlineMail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your registered email"
                  className="w-full rounded-lg border border-zinc-800 bg-[#141820] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 transition"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-400">
                {error}
              </div>
            )}

            {submitted && (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-sm text-emerald-300">
                If an account exists for <span className="font-semibold">{email}</span>, a password reset link has been sent.
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold py-2.5 text-sm transition disabled:opacity-60 cursor-pointer"
            >
              <span>{loading ? "Sending link..." : "Send Reset Link"}</span>
              {!loading && <HiOutlineArrowRight size={16} />}
            </button>
          </form>

          <p className="mt-6 text-sm text-zinc-400">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-medium text-amber-400 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </section>

        {/* RIGHT SIDE: Recovery Guidance Card (7 Columns) */}
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
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 mb-5">
                <MdOutlineLockReset size={24} />
              </div>

              <h2 className="text-2xl font-bold text-white">
                Quick & secure account recovery
              </h2>
              <p className="text-sm text-zinc-400 mt-1.5 max-w-lg leading-relaxed">
                Keep your citizen reports and ward notifications protected. Reset links expire automatically for your security.
              </p>

              <div className="mt-6 space-y-3 border-t border-zinc-800/80 pt-5 text-sm">
                <div className="flex items-center justify-between rounded-xl bg-[#0d1015]/80 px-4 py-3 border border-zinc-800/60">
                  <div className="flex items-center gap-3">
                    <HiOutlineShieldCheck className="text-amber-400 text-lg shrink-0" />
                    <span className="text-zinc-200 font-medium">Check spam or promotions folder</span>
                  </div>
                  <span className="text-xs text-zinc-500">Arrives in ~1 min</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#0d1015]/80 px-4 py-3 border border-zinc-800/60">
                  <div className="flex items-center gap-3">
                    <HiOutlineMail className="text-amber-400 text-lg shrink-0" />
                    <span className="text-zinc-200 font-medium">Signed up with Google?</span>
                  </div>
                  <span className="text-xs text-zinc-500">Use Google sign-in</span>
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

export default ForgotPassword;