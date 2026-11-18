
import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaEdit ,
  FaUnlockAlt,
  FaEnvelope,
  FaUser,
  FaFileAlt,
  FaClock,
} from "react-icons/fa";

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
const [passwordOpen, setPasswordOpen] = useState(false);

const [editForm, setEditForm] = useState({
  name: "",
  username: "",
  email: ""
});

const [passwordForm, setPasswordForm] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: ""
});

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/profile`, {
          withCredentials: true,
        });

        setUser(response.data.user);
        setEditForm({
          name: response.data.user.name || "",
          username: response.data.user.username || "",
          email: response.data.user.email || ""
        });
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const handleEditProfile = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.put(
      `${API_URL}/update-profile`,
      editForm,
      { withCredentials: true }
    );

    setUser(response.data.user);
    setEditOpen(false);

    alert("Profile updated successfully!");
  } catch (error) {
    alert(error.response?.data?.message || "Update failed");
  }
};


const handleChangePassword = async (e) => {
  e.preventDefault();

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    return alert("New passwords do not match");
  }

  if (passwordForm.newPassword.length < 8) {
    return alert("Password must be at least 8 characters");
  }

  try {
    const response = await axios.put(
      `${API_URL}/change-password`,
      {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      },
      { withCredentials: true }
    );

    alert(response.data.message);

    setPasswordOpen(false);

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });

  } catch (error) {
    alert(error.response?.data?.message || "Password change failed");
  }
};

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
<div className="mt-5 ">
  <h2 className="text-xl font-bold text-white mb-5">
    Personal Information
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">

    
    <div className="bg-[#0b1719] rounded-2xl p-5">
      <p className="text-sm text-gray-400 mb-2 ">Full Name</p>
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
       

<div className="mt-8">
  <h2 className="text-xl font-bold text-white mb-5">
    Account Settings
  </h2>

 
  <button
    onClick={() => setEditOpen(true)}
    className="w-full flex items-center justify-between bg-[#0b1719] border border-white/10 rounded-2xl p-5 mb-3 hover:border-emerald-500/40 transition"
  >
    <div className="flex items-center gap-4 text-left">
      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
        <FaEdit  className="text-emerald-400 text-xl" />
      </div>

      <div>
        <h3 className="text-white font-bold">Edit Profile</h3>
        <p className="text-gray-400 text-sm">
          Update your name, username or email address.
        </p>
      </div>
    </div>

    <span className="text-gray-400 text-xl">›</span>
  </button>

 
  <button
    onClick={() => setPasswordOpen(true)}
    className="w-full flex items-center justify-between bg-[#0b1719] border border-white/10 rounded-2xl p-5 hover:border-emerald-500/40 transition"
  >
    <div className="flex items-center gap-4 text-left">
      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
        <FaUnlockAlt className="text-emerald-400 text-xl" />
      </div>

      <div>
        <h3 className="text-white font-bold">Change Password</h3>
        <p className="text-gray-400 text-sm">
          Update your account password to keep it secure.
        </p>
      </div>
    </div>

    <span className="text-gray-400 text-xl">›</span>
  </button>
</div>



{editOpen && (
  <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
    <form
      onSubmit={handleEditProfile}
      className="bg-[#0b1719] border border-white/10 rounded-2xl p-6 w-full max-w-md"
    >
      <h2 className="text-xl font-bold text-white mb-6">
        Edit Profile
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={editForm.name}
          onChange={(e) =>
            setEditForm({ ...editForm, name: e.target.value })
          }
          required
          className="w-full bg-[#050d0b] border border-white/10 rounded-xl p-3 text-white outline-none focus:border-emerald-500"
        />

        <input
          type="text"
          placeholder="Username"
          value={editForm.username}
          onChange={(e) =>
            setEditForm({ ...editForm, username: e.target.value })
          }
          required
          className="w-full bg-[#050d0b] border border-white/10 rounded-xl p-3 text-white outline-none focus:border-emerald-500"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={editForm.email}
          onChange={(e) =>
            setEditForm({ ...editForm, email: e.target.value })
          }
          required
          className="w-full bg-[#050d0b] border border-white/10 rounded-xl p-3 text-white outline-none focus:border-emerald-500"
        />
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={() => setEditOpen(false)}
          className="flex-1 py-3 rounded-xl bg-gray-700 text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
)}



{passwordOpen && (
  <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
    <form
      onSubmit={handleChangePassword}
      className="bg-[#0b1719] border border-white/10 rounded-2xl p-6 w-full max-w-md"
    >
      <h2 className="text-xl font-bold text-white mb-6">
        Change Password
      </h2>

      <div className="space-y-4">
        <input
          type="password"
          placeholder="Current Password"
          value={passwordForm.currentPassword}
          onChange={(e) =>
            setPasswordForm({
              ...passwordForm,
              currentPassword: e.target.value
            })
          }
          required
          className="w-full bg-[#050d0b] border border-white/10 rounded-xl p-3 text-white outline-none focus:border-emerald-500"
        />

        <input
          type="password"
          placeholder="New Password"
          value={passwordForm.newPassword}
          onChange={(e) =>
            setPasswordForm({
              ...passwordForm,
              newPassword: e.target.value
            })
          }
          minLength={8}
          required
          className="w-full bg-[#050d0b] border border-white/10 rounded-xl p-3 text-white outline-none focus:border-emerald-500"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={passwordForm.confirmPassword}
          onChange={(e) =>
            setPasswordForm({
              ...passwordForm,
              confirmPassword: e.target.value
            })
          }
          minLength={8}
          required
          className="w-full bg-[#050d0b] border border-white/10 rounded-xl p-3 text-white outline-none focus:border-emerald-500"
        />
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={() => setPasswordOpen(false)}
          className="flex-1 py-3 rounded-xl bg-gray-700 text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500"
        >
          Update Password
        </button>
      </div>
    </form>
  </div>
)}


        </main>
      </div>
    </div>
  );
};

export default Profile;
