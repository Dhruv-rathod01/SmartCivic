
import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaRedo,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowRight,
  FaEllipsisV,
  FaLeaf,
  FaTrophy,
  FaQuestionCircle,
  FaComments,
} from "react-icons/fa";

const Myreport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
  const fetchReports = async () => {
    try {
      const response = await axios.get(`${API_URL}/my-reports`, {
        withCredentials: true
      });

      setReports(response.data.reports);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  fetchReports();
}, []);
        const totalReports = reports.length;

      const resolvedReports = reports.filter(
        (item) => item.status === "Resolved"
      ).length;

      const pendingReports = reports.filter(
        (item) => item.status === "Pending"
      ).length;
  return (
    <div className="min-h-screen w-full bg-[#050d0b] pt-16 text-white">
      <Nav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        
        <div
          className={`shrink-0 transition-all duration-300 ${
            sidebarOpen ? "w-60" : "w-0"
          }`}
        >
          {sidebarOpen && <Sidebar />}
        </div>

        
        <main className="min-w-0 flex-1 px-5 py-8 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">
                Citizen <span className="text-emerald-400">Dashboard</span>
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                Track the status of issues you've reported. Together,
                we can build a cleaner, safer and smarter community.
              </p>
            </div>

            <button className="rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-black transition hover:bg-emerald-500"  onClick={() => navigate("/report-issue")}>
              + Report New Issue
            </button>
          </div>
       <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">


  <div className="rounded-2xl border border-emerald-900/40 bg-[#0b1719] p-5">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-zinc-400">
        Total Reports
      </h3>
      <FaFileAlt className="text-2xl text-red-500" />
    </div>

    <p className="mt-3 text-3xl font-bold text-white">
      {totalReports}
    </p>
    <p className="mt-1 text-xs text-zinc-500">
      Total submitted reports
    </p>
  </div>

  <div className="rounded-2xl border border-emerald-900/40 bg-[#0b1719] p-5">
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


  <div className="rounded-2xl border border-emerald-900/40 bg-[#0b1719] p-5">
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

</div>
         
     
{reports.map((item) => (
  <div
    key={item._id}
   className=" mt-5 group rounded-2xl border border-white/10 bg-[#0b1719] p-4 transition hover:border-emerald-500/40"
  >
    <div className="flex flex-col gap-4 sm:flex-row">

     
      <div className="sm:w-44 sm:shrink-0">
        {item.photo ? (
          <img
            src={`${API_URL}/${item.photo.replace(/\\/g, "/")}`}
            alt={item.category}
            className="h-44 w-full rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-44 w-full items-center justify-center rounded-xl bg-[#142321] text-zinc-500">
            <FaFileAlt className="text-4xl" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">

        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-white">
            {item.category}
          </h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              item.status === "Resolved"
                ? "bg-emerald-500/10 text-emerald-400"
                : item.status === "In Progress"
                ? "bg-blue-500/10 text-blue-400"
                : "bg-yellow-500/10 text-yellow-400"
            }`}
          >
            {item.status || "Pending"}
          </span>
        </div>

        
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          {item.description}
        </p>

        
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-400">

          <span>
            <FaMapMarkerAlt className="mr-2 inline text-emerald-400" />
            {item.location}
          </span>

          <span>
            <FaCalendarAlt className="mr-2 inline text-emerald-400" />
            {new Date(item.date).toLocaleDateString("en-IN")}
          </span>

        </div>

      </div>
    </div>
  </div>
))}
 
    </main>
      </div>
    </div>
  );
};

export default Myreport;
