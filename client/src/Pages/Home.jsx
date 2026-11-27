import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserCircle,
  FaFileAlt,
  FaTimes,
} from "react-icons/fa";


const Home = () => {
   
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
     
    const fetchHomeFeed = async () => {
      try {
        const response = await axios.get(`${API_URL}/home`, {
          withCredentials: true,
        });

        const data = response.data;
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.reports)
          ? data.reports
          : Array.isArray(data?.posts)
          ? data.posts
          : Array.isArray(data?.issues)
          ? data.issues
          : [];

        setReports(list);
        setLoading(false);
      } catch {
        navigate("/login", { replace: true });
      }
    };

    fetchHomeFeed();
  }, [API_URL, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveSearch(searchQuery.trim());
  };

  const clearSearch = () => {
    setSearchQuery("");
    setActiveSearch("");
  };

  const queryTerm = (activeSearch || searchQuery).trim().toLowerCase();

  const filteredReports = queryTerm
    ? reports.filter((item) => {
        const category = (item.category || "").toLowerCase();
        const location = (item.location || "").toLowerCase();
        const description = (item.description || "").toLowerCase();
        const status = (item.status || "Pending").toLowerCase();
        const username = (
          item.user?.username ||
          item.username ||
          item.user?.name ||
          item.postedBy ||
          ""
        ).toLowerCase();

        return (
          category.includes(queryTerm) ||
          location.includes(queryTerm) ||
          description.includes(queryTerm) ||
          status.includes(queryTerm) ||
          username.includes(queryTerm)
        );
      })
    : reports;

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
                  <FaSearch className="shrink-0 text-zinc-400" />
                  <input
                    className="w-full bg-transparent text-white placeholder:text-zinc-500 outline-none"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (!e.target.value.trim()) setActiveSearch("");
                    }}
                    placeholder="Search by issue, location, or @username"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      aria-label="Clear search"
                      className="cursor-pointer text-zinc-400 transition hover:text-white"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-amber-400 px-9 py-3 font-semibold text-zinc-950 transition hover:bg-amber-300"
                >
                  Search
                </button>
              </form>

              {/* Feed Header */}
              <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-bold md:text-3xl">
                  Recent Issues
                </h2>

                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  {queryTerm && (
                    <span>
                      Matching{" "}
                      <span className="font-medium text-amber-400">
                        “{activeSearch || searchQuery}”
                      </span>
                    </span>
                  )}
                  <span>
                    {filteredReports.length}{" "}
                    {filteredReports.length === 1 ? "issue" : "issues"}
                  </span>
                </div>
              </div>

              {/* Community Reports Grid */}
              {filteredReports.length === 0 ? (
                <div className="mt-5 rounded-xl border border-zinc-800 bg-[#131720] p-8 text-center text-sm text-zinc-400">
                  {queryTerm
                    ? `No issues match "${activeSearch || searchQuery}".`
                    : "No community reports posted yet."}
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {filteredReports.map((item, idx) => {
                    const statusLabel = item.status || "Pending";
                    const posterUsername =
                      item.user?.username ||
                      item.username ||
                      item.user?.name ||
                      item.postedBy ||
                      "citizen";

                    return (
                      <article
                        key={item._id || idx}
                        className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-[#131720] transition hover:border-amber-400/50"
                      >
                        
                        <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 px-5 py-3.5">
                          <div className="flex min-w-0 items-center gap-2.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/15 text-xs font-bold text-amber-400">
                              {posterUsername.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-white">
                                @{posterUsername}
                              </p>
                              {item.user?.name && item.user?.username && (
                                <p className="truncate text-xs text-zinc-500">
                                  {item.user.name}
                                </p>
                              )}
                            </div>
                          </div>

                          <span
                            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                              statusLabel === "Resolved"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : statusLabel === "In Progress"
                                ? "bg-sky-500/10 text-sky-400"
                                : "bg-yellow-500/10 text-yellow-400"
                            }`}
                          >
                            {statusLabel}
                          </span>
                        </div>

                        {/* Issue Photo */}
                        {item.photo ? (
                          <img
                            src={`${API_URL}/${item.photo.replace(/\\/g, "/")}`}
                            alt={item.category || "Reported issue"}
                            className="h-48 w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-48 w-full items-center justify-center bg-[#0d1015] text-zinc-600">
                            <FaFileAlt className="text-4xl" />
                          </div>
                        )}

                        {/* Card Details */}
                        <div className="flex flex-1 flex-col justify-between p-5">
                          <div>
                            <h3 className="text-xl font-bold text-white">
                              {item.category}
                            </h3>

                            <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-400">
                              {item.description}
                            </p>
                          </div>

                          <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800/80 pt-3.5 text-sm text-zinc-400">
                            <span className="inline-flex items-center">
                              <FaMapMarkerAlt className="mr-2 shrink-0 text-amber-400" />
                              {item.location}
                            </span>

                            <span className="inline-flex items-center text-xs text-zinc-500">
                              <FaCalendarAlt className="mr-1.5 shrink-0 text-amber-400" />
                              {item.date || item.createdAt
                                ? new Date(
                                    item.date || item.createdAt
                                  ).toLocaleDateString("en-IN")
                                : "Recent"}
                            </span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;