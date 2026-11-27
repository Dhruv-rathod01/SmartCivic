import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

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
  }, [API_URL, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveSearch(searchQuery.trim());
  };

  return (
    <div className="min-h-screen w-full bg-[#0d1015] pt-16 text-zinc-100">
      <Nav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <div
          className={`shrink-0 transition-all duration-300 ${
            sidebarOpen ? "w-60" : "w-20"
          }`}
        >
          <Sidebar isOpen={sidebarOpen} />
        </div>

        <main className="min-w-0 flex-1 p-5 text-white md:p-8 lg:p-8">
          {loading ? (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-800 border-t-amber-400" />
              <p className="text-sm text-zinc-400">
                Loading your dashboard...
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold md:text-4xl">
                Find Issues in Your <span className="text-amber-400">City</span>
              </h1>

              <p className="mt-2 text-zinc-400">
                Report civic issues and help make your community better...
              </p>

              <form
                onSubmit={handleSearch}
                className="mt-5 flex w-full flex-col gap-3 sm:flex-row sm:items-center"
              >
                <div className="flex w-full items-center gap-3 rounded-xl border border-zinc-800 bg-[#131720] px-4 py-3 transition focus-within:border-amber-400 sm:w-3/4">
                  <FaSearch className="text-zinc-400" />
                  <input
                    className="w-full bg-transparent text-white placeholder:text-zinc-500 outline-none"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search issues, location"
                  />
                </div>

                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-amber-400 px-9 py-3 font-semibold text-zinc-950 transition hover:bg-amber-300"
                >
                  Search
                </button>
              </form>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-bold md:text-3xl">
                  Recent Issues
                </h2>
                {activeSearch && (
                  <span className="text-sm text-zinc-400">
                    Showing results for{" "}
                    <span className="font-medium text-amber-400">
                      “{activeSearch}”
                    </span>
                  </span>
                )}
              </div>

              <div className="mt-5 rounded-xl border border-zinc-800 bg-[#131720] p-6 text-sm text-zinc-400">
                {activeSearch
                  ? `No recent issues match "${activeSearch}" yet.`
                  : "Recent community reports will appear here as they are published."}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;