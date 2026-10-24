import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="w-full max-w-md rounded-2xl border border-emerald-900 bg-zinc-900 p-8 text-white shadow-2xl">

      <h1 className="mb-2 text-center text-3xl font-bold text-emerald-400">
        Forgot Password?
      </h1>

      <p className="mb-8 text-center text-sm text-zinc-400">
       Enter your registered email to reset your password.
      </p>

      <form>
        <div className="mb-6">
          <input
            type="email"
            name="email"
            placeholder="Enter your registered email"
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition focus:border-emerald-400"
          />
        </div>

        <button
          type="button"
          className="w-full rounded-lg bg-emerald-500 px-3 py-3 font-semibold text-zinc-950 transition hover:bg-emerald-400"
        >
          Send Reset Link
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-zinc-400">
        Remember your password?{" "}
        <Link
          to="/login"
          className="font-medium text-emerald-400 hover:underline"
        >
          Login
        </Link>
      </div>

    </div>
  );
};

export default ForgotPassword;