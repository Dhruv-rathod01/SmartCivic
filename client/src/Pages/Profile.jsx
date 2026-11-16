
import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaEnvelope,
  FaUser,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = awaitaxios.get(`${API_URL}/user/profile`, {
  withCredentials: true
});

        setUser(response.data.user);
        setReports(response.data.reports || []);
      } catch (error) {
        console.log("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [API_URL]);

  const totalReports = reports.length;

  const pendingReports = reports.filter(
    (item) => item.status === "Pending"
  ).length;

  const resolvedReports = reports.filter(
    (item) => item.status === "Resolved"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050d0b] text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#050d0b] pt-16">
      <Nav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <div
          className={`shrink-0 transition-all duration-300 ${
            sidebarOpen ? "w-60" : "w-0"
          }`}
        >
          {sidebarOpen && <Sidebar />}
        </div>

        <main className="flex-1 min-w-0 p-6 md:p-10 text-white">

          {/* Page Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <p className="text-gray-400 mt-2">
              Manage your personal information and contributions.
            </p>
          </div>

          {!user ? (
            <p className="text-gray-400">Unable to load profile.</p>
          ) : (
            <>
              {/* Profile Header */}
              <div className="bg-[#0b1719] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5">
                <FaUserCircle className="text-7xl text-emerald-500" />

                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold">
                    {user.name}
                  </h2>
                  <p className="text-gray-400 mt-1">
                    @{user.username}
                  </p>
                  <p className="text-emerald-400 text-sm mt-2">
                    Citizen Account
                  </p>
                </div>
              </div>

              {/* Personal Information */}
              <section className="mt-8">
                <h2 className="text-xl font-semibold mb-4">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#0b1719] border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-3 text-gray-400 mb-3">
                      <FaUser className="text-emerald-400" />
                      Full Name
                    </div>
                    <p className="font-medium">{user.name}</p>
                  </div>

                  <div className="bg-[#0b1719] border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-3 text-gray-400 mb-3">
                      <FaUser className="text-emerald-400" />
                      Username
                    </div>
                    <p className="font-medium">@{user.username}</p>
                  </div>

                  <div className="bg-[#0b1719] border border-white/10 rounded-xl p-5 md:col-span-2">
                    <div className="flex items-center gap-3 text-gray-400 mb-3">
                      <FaEnvelope className="text-emerald-400" />
                      Email Address
                    </div>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
              </section>

              {/* Contribution Statistics */}
              <section className="mt-8">
                <h2 className="text-xl font-semibold mb-4">
                  My Contributions
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                  <div className="bg-[#0b1719] border border-white/10 rounded-xl p-5">
                    <FaFileAlt className="text-2xl text-emerald-400 mb-3" />
                    <p className="text-gray-400 text-sm">Total Reports</p>
                    <h3 className="text-3xl font-bold mt-1">
                      {totalReports}
                    </h3>
                  </div>

                  <div className="bg-[#0b1719] border border-white/10 rounded-xl p-5">
                    <FaClock className="text-2xl text-yellow-400 mb-3" />
                    <p className="text-gray-400 text-sm">Pending Reports</p>
                    <h3 className="text-3xl font-bold mt-1">
                      {pendingReports}
                    </h3>
                  </div>

                  <div className="bg-[#0b1719] border border-white/10 rounded-xl p-5">
                    <FaCheckCircle className="text-2xl text-green-400 mb-3" />
                    <p className="text-gray-400 text-sm">Resolved Reports</p>
                    <h3 className="text-3xl font-bold mt-1">
                      {resolvedReports}
                    </h3>
                  </div>

                </div>
              </section>

              {/* Recent Reports */}
              <section className="mt-8">
                <h2 className="text-xl font-semibold mb-4">
                  Recent Reports
                </h2>

                <div className="bg-[#0b1719] border border-white/10 rounded-xl p-5">
                  {reports.length === 0 ? (
                    <p className="text-gray-400">
                      You haven't submitted any reports yet.
                    </p>
                  ) : (
                    reports.slice(0, 3).map((item) => (
                      <div
                        key={item._id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-4 border-b border-white/10 last:border-0"
                      >
                        <div>
                          <h3 className="font-medium">
                            {item.category}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            {item.location}
                          </p>
                        </div>

                        <span className={`text-sm font-medium ${
                          item.status === "Resolved"
                            ? "text-green-400"
                            : item.status === "In Progress"
                            ? "text-blue-400"
                            : "text-yellow-400"
                        }`}>
                          {item.status || "Pending"}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
