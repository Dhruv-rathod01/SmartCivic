import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/home`, {
        withCredentials: true,
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        navigate("/login", { replace: true });
      });
  }, []);

  


  return (
    <div className="w-full min-h-screen bg-[#050d0b]">
      <Nav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <div
          className={`shrink-0 overflow-hidden duration-300 ${
            sidebarOpen ? "w-60" : "w-0"
          }`}
        >
          <Sidebar />
        </div>

        
      <main className="flex-1 p-8 text-white">
        {loading ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-emerald-400" />
            <p className="text-sm text-zinc-400">
              Loading your dashboard...
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold">
              Find Issues in Your City
            </h1>

            <p className="mt-2 text-zinc-400">
              Report civic issues and help make your community better...
            </p>

            <div className="mt-5 flex w-full items-center gap-3">
              <div className="flex w-3/4 items-center gap-3 rounded-xl border border-zinc-700 bg-[#0b1714] px-4 py-3 focus-within:border-emerald-500">
                <FaSearch />
                <input
                  className="w-full bg-transparent text-white outline-none"
                  type="text"
                  placeholder="Search issues, location"
                />
              </div>

              <button className="cursor-pointer rounded-xl bg-emerald-500 px-9 py-3 text-white hover:bg-emerald-600">
                Search
              </button>
            </div>

            <h2 className="mt-10 text-3xl font-semibold">
              Recent Issues
            </h2>
          </>
        )}
      </main>

        
       
      </div>
    </div>
  );
};

export default Home;