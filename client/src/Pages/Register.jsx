import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock,FaUser,FaUserCircle} from "react-icons/fa";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const Register = () => {
  const[name,setName]= useState("")
  const[username,setUsername]= useState("")
  const[email,setEmail]= useState("")
  const[password,setPassword]= useState("")
  const[error , setError]= useState("")
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md rounded-2xl border border-emerald-900 bg-zinc-900 p-8 text-white shadow-2xl">

      <h1 className="mb-2 text-center text-3xl font-bold text-emerald-400">
        SmartCivic
      </h1>

      <p className="mb-8 text-center text-sm text-zinc-400">
        Create your account to get started.
      </p>

      <form
        onSubmit={async (e) => {
          try {
            e.preventDefault();
            const response = await axios.post(
              `${API_URL}/register`,
              { name, username, email, password },
              { withCredentials: true }
            );

            console.log(response.data.message);
            console.log(response.data);

            if (response.data.success === true) {
              navigate("/home");
            }
          } catch (error) {
            console.log(error.response?.data?.message);
            setError(
              error.response?.data?.message || "Registration failed. Please try again."
            );
            setName("")
            setUsername("");
            setEmail("");
            setPassword("");
          }
        }}
      >
        <div className="relative mb-4">
          <FaUserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              size={20}/>
          <input
            type="text"
            name="name"
            value={name} onChange={(e)=> setName(e.target.value)}
            required
            placeholder="Enter your name"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800  py-3 pl-12 outline-none transition focus:border-emerald-400"
          />
        </div>

        <div className="relative mb-4">
           <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              size={20}/>
          <input
            type="text"
            name="username"
            value={username} onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Choose a username"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800  py-3 pl-12  outline-none transition focus:border-emerald-400"
          />
        </div>

        <div className="relative mb-4">
           <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              size={20} />
          <input
            type="email"
            name="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-3 pl-12 outline-none transition focus:border-emerald-400"
          />
        </div>

        <div className="relative mb-6">
           <FaLock 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              size={20}
            />
          
          <input
            type="password"
            name="password"
            value={password} onChange={(e)=> setPassword(e.target.value)}
            required
            placeholder="Create a strong password"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800  py-3 pl-12 outline-none transition focus:border-emerald-400"
          />
        </div>
         {error && (
          <p className=" px-4 py-3 text-center text-sm font-medium text-red-400">{error}</p>
        )}
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-500 px-3 py-3 font-semibold text-zinc-950 transition hover:bg-emerald-400"
        >
          Create Account
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="flex-1 border-t border-zinc-700"></div>
        <span className="text-sm text-zinc-500">OR CONTINUE WITH</span>
        <div className="flex-1 border-t border-zinc-700"></div>
      </div>

      <a
        href={`${API_URL}/auth/google`}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="h-5 w-5"
        >
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.08 13.22l7.98 6.19C12.95 13.72 18.02 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.62 5.91c4.45-4.11 7.14-10.17 7.14-17.56z" />
          <path fill="#FBBC05" d="M10.06 28.59A14.4 14.4 0 0 1 9.3 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.58 10.78l7.48-6.19z" />
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.89l-7.62-5.91c-2.12 1.42-4.83 2.26-8.28 2.26-5.98 0-11.05-4.22-12.94-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        </svg>
        <span>Continue with Google</span>
      </a>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-emerald-400 hover:underline"
        >
          Login
        </Link>
      </p>

    </div>
  );
};

export default Register;