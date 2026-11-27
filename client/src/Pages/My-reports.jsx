import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import { RiProgress3Fill } from "react-icons/ri";
import {
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const Myreport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${API_URL}/my-reports`, {
          withCredentials: true,
        });
        setReports(Array.isArray(response.data?.reports) ? response.data.reports : []);
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [API_URL]);

  const totalReports = reports.length;
  const resolvedReports = reports.filter((item) => item.status === "Resolved").length;
  const pendingReports = reports.filter(
    (item) => !item.status || item.status === "Pending"
  ).length;
  const progressReports = reports.filter(
    (item) => item.status === "In Progress"
  ).length;

  const filteredReports =
    statusFilter === "All"
      ? reports
      : reports.filter((item) => (item.status || "Pending") === statusFilter);

  return (
    <div className="min-h-screen w-full bg-[#0d1015] pt-16 text-white">
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
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">
                Citizen <span className="text-amber-400">Dashboard</span>
              </h1>
              <p className="mt-2 text-zinc-400">
                Track the status of issues you've reported. Together, we can build a cleaner, safer and smarter community.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/report-issue")}
              className="cursor-pointer rounded-xl bg-amber-400 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-amber-300"
            >
              + Report New Issue
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-zinc-800 bg-[#131720] p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-zinc-400">
                  Total Reports
                </h3>
                <FaFileAlt className="text-2xl text-amber-400" />
              </div>
              <p className="mt-3 text-3xl font-bold text-white">
                {totalReports}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Total submitted reports
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-[#131720] p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-zinc-400">
                  Resolved Reports
                </h3>
                <FaCheckCircle className="text-2xl text-emerald-400" />
              </div>
              <p className="mt-3 text-3xl font-bold text-white">
                {resolvedReports}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Successfully resolved
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-[#131720] p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-zinc-400">
                  Pending Reports
                </h3>
                <FaClock className="text-2xl text-yellow-400" />
              </div>
              <p className="mt-3 text-3xl font-bold text-white">
                {pendingReports}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Waiting for action
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-[#131720] p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-zinc-400">
                  In Progress Reports
                </h3>
                <RiProgress3Fill className="text-2xl text-sky-400" />
              </div>
              <p className="mt-3 text-3xl font-bold text-white">
                {progressReports}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Work in progress
              </p>
            </div>
          </div>

          <section className="mt-10 rounded-xl border border-zinc-800 bg-[#131720] p-5 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-5">
              <div>
                <h2 className="text-2xl font-bold">Your Submitted Reports</h2>
                <p className="mt-1 text-sm text-zinc-400 md:text-base">
                  Filter reports by status to inspect progress and location details.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["All", "Pending", "In Progress", "Resolved"].map((tab) => {
                  const active = statusFilter === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setStatusFilter(tab)}
                      className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition ${
                        active
                          ? "bg-amber-400 font-semibold text-zinc-950"
                          : "border border-zinc-800 bg-[#0d1015] text-zinc-400 hover:border-amber-400 hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {loading ? (
              <div className="mt-6 space-y-4">
                {[1, 2].map((n) => (
                  <div
                    key={n}
                    className="h-44 animate-pulse rounded-xl border border-zinc-800 bg-[#0d1015]"
                  />
                ))}
              </div>
            ) : filteredReports.length === 0 ? (
              <div className="mt-6 rounded-xl border border-zinc-800 bg-[#0d1015] p-8 text-center">
                <FaFileAlt className="mx-auto mb-3 text-3xl text-amber-400" />
                <h3 className="text-lg font-semibold text-white">
                  No {statusFilter !== "All" ? statusFilter.toLowerCase() : ""} reports found
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Click “+ Report New Issue” to submit a concern.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-5">
                {filteredReports.map((item) => {
                  const statusLabel = item.status || "Pending";
                  return (
                    <div
                      key={item._id}
                      className="rounded-xl border border-zinc-800 bg-[#0d1015] p-5 transition hover:border-amber-400"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row">
                        <div className="sm:w-44 sm:shrink-0">
                          {item.photo ? (
                            <img
                              src={`${API_URL}/${item.photo.replace(/\\/g, "/")}`}
                              alt={item.category}
                              className="h-44 w-full rounded-xl object-cover"
                            />
                          ) : (
                            <div className="flex h-44 w-full items-center justify-center rounded-xl border border-zinc-800 bg-[#131720] text-zinc-500">
                              <FaFileAlt className="text-3xl text-amber-400" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <h3 className="text-xl font-bold text-white">
                              {item.category}
                            </h3>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
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

                          <p className="mt-3 text-sm leading-6 text-zinc-400">
                            {item.description}
                          </p>

                          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-400">
                            <span>
                              <FaMapMarkerAlt className="mr-2 inline text-amber-400" />
                              {item.location}
                            </span>

                            <span>
                              <FaCalendarAlt className="mr-2 inline text-amber-400" />
                              {item.date
                                ? new Date(item.date).toLocaleDateString("en-IN")
                                : "Recent"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Myreport;