
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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/profile`, {
          withCredentials: true,
        });

        setUser(response.data.user);
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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

          
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">
                Your Profile
              </h1>

            <span className="flex items-center gap-2 text-sm font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full">
          <FaUserCircle className="text-base" />
          Citizen Account
        </span>
            </div>

            <p className="text-gray-400 mt-3">
              Manage your personal information and contributions.
            </p>
          </div>

          
          {loading ? (
            <div className="bg-[#0b1719] border border-white/10 rounded-2xl p-6 animate-pulse">
              <div className="flex items-center gap-5">

                <div className="w-20 h-20 rounded-full bg-gray-700"></div>

                
                <div className="space-y-3">
                  <div className="h-5 w-40 bg-gray-700 rounded"></div>
                  <div className="h-3 w-32 bg-gray-700 rounded"></div>
                  <div className="h-3 w-48 bg-gray-700 rounded"></div>
                </div>

              </div>
            </div>
          ) : user ? (
            <div className="bg-[#0b1719] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-5">

                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-emerald-400">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>

                
                <div className="mt-2">
                  <h2 className="text-xl font-bold text-white">
                    {user.name}
                  </h2>

                  <p className="text-gray-400 text-sm mt-1">
                    @{user.username}
                  </p>

                  <p className=" text-sm text-emerald-400">
                    {user.email}
                  </p>
                </div>

              </div>
            </div>
          ) : (
            <p className="text-red-400">
              Unable to load profile.
            </p>
          )}
<div className="mt-5">
  <h2 className="text-xl font-bold text-white mb-5">
    Personal Information
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

    
    <div className="bg-[#0b1719] rounded-2xl p-5">
      <p className="text-sm text-gray-400 mb-2">Full Name</p>
      <h3 className="text-lg font-bold text-white">
        {user?.name || "Not available"}
      </h3>
    </div>
    <div className="bg-[#0b1719] rounded-2xl p-5">
      <p className="text-sm text-gray-400 mb-2">Username</p>
      <h3 className="text-lg font-bold text-white">
        @{user?.username || "Not available"}
      </h3>
    </div>

    <div className="bg-[#0b1719] rounded-2xl p-5">
      <p className="text-sm text-gray-400 mb-2">Email Address</p>
      <h3 className="text-lg font-bold text-white break-all">
        {user?.email || "Not available"}
      </h3>
    </div>

    <div className="bg-[#0b1719] rounded-2xl p-5">
      <p className="text-sm text-gray-400 mb-2">Account Type</p>
      <h3 className="text-lg font-bold text-emerald-400">
        Citizen
      </h3>
    </div>

  </div>
</div>
       <div className="mt-5">
        <h2 className="text-xl font-bold text-white mb-5">
    Account Setting
  </h2>
       </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
