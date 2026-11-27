import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaEdit,
  FaUnlockAlt,
  FaEnvelope,
  FaIdBadge,
  FaShieldAlt,
  FaTimes,
} from "react-icons/fa";

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    username: "",
    email: "",
  });
  const [editError, setEditError] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

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
  }, [API_URL]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setEditOpen(false);
        setPasswordOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openEditModal = () => {
    setEditError("");
    setEditForm({
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
    });
    setEditOpen(true);
  };

  const openPasswordModal = () => {
    setPasswordError("");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordOpen(true);
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setEditError("");
    setSavingProfile(true);

    try {
      const response = await axios.post(
        `${API_URL}/update-profile`,
        editForm,
        { withCredentials: true }
      );

      setUser(response.data.user);
      setEditForm({ name: "", username: "", email: "" });
      setEditOpen(false);
      alert("Profile updated successfully!");
    } catch (error) {
      setEditError(error.response?.data?.message || "Update failed");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    setSavingPassword(true);
    try {
      const response = await axios.post(
        `${API_URL}/update-password`,
        {
          currentpassword: passwordForm.currentPassword,
          newpassword: passwordForm.newPassword,
        },
        { withCredentials: true }
      );

      alert(response.data.message);
      setPasswordOpen(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setPasswordError(error.response?.data?.message || "Password change failed");
    } finally {
      setSavingPassword(false);
    }
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

        <main className="min-w-0 flex-1 p-6 text-white md:p-10">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-3xl font-bold md:text-4xl">
                Your <span className="text-amber-400">Profile</span>
              </h1>

              <span className="flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-sm font-medium text-amber-300">
                <FaUserCircle className="text-base" />
                Citizen Account
              </span>
            </div>

            <p className="mt-3 text-zinc-400">
              Manage your personal information and contributions.
            </p>
          </div>

          {/* Identity Summary Card */}
          {loading ? (
            <div className="animate-pulse rounded-2xl border border-zinc-800 bg-[#131720] p-6">
              <div className="flex items-center gap-5">
                <div className="h-20 w-20 rounded-full bg-zinc-800" />
                <div className="space-y-3">
                  <div className="h-5 w-40 rounded bg-zinc-800" />
                  <div className="h-3 w-32 rounded bg-zinc-800" />
                  <div className="h-3 w-48 rounded bg-zinc-800" />
                </div>
              </div>
            </div>
          ) : user ? (
            <section className="rounded-2xl border border-zinc-800 bg-[#131720] p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/15">
                    <span className="text-3xl font-bold text-amber-400">
                      {user.name?.charAt(0).toUpperCase() || "C"}
                    </span>
                  </div>

                  <div className="mt-2 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="truncate text-xl font-bold text-white">
                        {user.name}
                      </h2>
                      <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                        Active
                      </span>
                    </div>

                    <p className="mt-1 truncate text-sm text-zinc-400">
                      @{user.username}
                    </p>

                    <p className="break-all text-sm text-amber-400">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={openEditModal}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-700 bg-[#0d1015] px-4 py-2.5 text-sm font-medium text-white transition hover:border-amber-400/60 hover:text-amber-300"
                  >
                    <FaEdit className="text-amber-400" />
                    <span>Edit Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={openPasswordModal}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300"
                  >
                    <FaUnlockAlt className="text-sm" />
                    <span>Change Password</span>
                  </button>
                </div>
              </div>
            </section>
          ) : (
            <p className="text-red-400">Unable to load profile.</p>
          )}

          {/* Personal Information Grid */}
          <section className="mt-5">
            <h2 className="mb-5 text-xl font-bold text-white">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800 bg-[#131720] p-5">
                <div className="mb-2 flex items-center justify-between text-sm text-zinc-400">
                  <span>Full Name</span>
                  <FaIdBadge className="text-base text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {user?.name || "Not available"}
                </h3>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-[#131720] p-5">
                <div className="mb-2 flex items-center justify-between text-sm text-zinc-400">
                  <span>Username</span>
                  <FaUserCircle className="text-base text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  @{user?.username || "Not available"}
                </h3>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-[#131720] p-5">
                <div className="mb-2 flex items-center justify-between text-sm text-zinc-400">
                  <span>Email Address</span>
                  <FaEnvelope className="text-base text-amber-400" />
                </div>
                <h3 className="break-all text-lg font-bold text-white">
                  {user?.email || "Not available"}
                </h3>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-[#131720] p-5">
                <div className="mb-2 flex items-center justify-between text-sm text-zinc-400">
                  <span>Account Type</span>
                  <FaShieldAlt className="text-base text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-amber-400">
                  Citizen
                </h3>
              </div>
            </div>
          </section>

          {/* Security & Account Actions */}
          <section className="mt-8">
            <h2 className="mb-5 text-xl font-bold text-white">
              Account Settings
            </h2>

            <button
              type="button"
              onClick={openEditModal}
              className="mb-3 flex w-full cursor-pointer items-center justify-between rounded-2xl border border-zinc-800 bg-[#131720] p-5 text-left transition hover:border-amber-400/50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">
                  <FaEdit className="text-xl text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Edit Profile</h3>
                  <p className="text-sm text-zinc-400">
                    Update your name, username or email address.
                  </p>
                </div>
              </div>
              <span className="text-xl text-zinc-400">›</span>
            </button>

            <button
              type="button"
              onClick={openPasswordModal}
              className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-zinc-800 bg-[#131720] p-5 text-left transition hover:border-amber-400/50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">
                  <FaUnlockAlt className="text-xl text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Change Password</h3>
                  <p className="text-sm text-zinc-400">
                    Update your account password to keep it secure.
                  </p>
                </div>
              </div>
              <span className="text-xl text-zinc-400">›</span>
            </button>
          </section>

          {/* Edit Profile Modal */}
          {editOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
              <form
                onSubmit={handleEditProfile}
                className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#131720] p-6"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Edit Profile</h2>
                  <button
                    type="button"
                    onClick={() => setEditOpen(false)}
                    aria-label="Close modal"
                    className="cursor-pointer rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-[#0d1015] p-3 text-white placeholder:text-zinc-500 outline-none focus:border-amber-400"
                  />

                  <input
                    type="text"
                    placeholder="Username"
                    value={editForm.username}
                    onChange={(e) =>
                      setEditForm({ ...editForm, username: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-[#0d1015] p-3 text-white placeholder:text-zinc-500 outline-none focus:border-amber-400"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-[#0d1015] p-3 text-white placeholder:text-zinc-500 outline-none focus:border-amber-400"
                  />
                </div>

                {editError && (
                  <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-sm text-red-400">
                    {editError}
                  </p>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEditOpen(false)}
                    className="flex-1 cursor-pointer rounded-xl bg-zinc-800 py-3 font-medium text-zinc-200 transition hover:bg-zinc-700"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="flex-1 cursor-pointer rounded-xl bg-amber-400 py-3 font-semibold text-zinc-950 transition hover:bg-amber-300 disabled:opacity-60"
                  >
                    {savingProfile ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Change Password Modal */}
          {passwordOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
              <form
                onSubmit={handleChangePassword}
                className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#131720] p-6"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">
                    Change Password
                  </h2>
                  <button
                    type="button"
                    onClick={() => setPasswordOpen(false)}
                    aria-label="Close modal"
                    className="cursor-pointer rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="space-y-4">
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-[#0d1015] p-3 text-white placeholder:text-zinc-500 outline-none focus:border-amber-400"
                  />

                  <input
                    type="password"
                    placeholder="New Password"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    minLength={6}
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-[#0d1015] p-3 text-white placeholder:text-zinc-500 outline-none focus:border-amber-400"
                  />

                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    minLength={6}
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-[#0d1015] p-3 text-white placeholder:text-zinc-500 outline-none focus:border-amber-400"
                  />
                </div>

                {passwordError && (
                  <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-sm text-red-400">
                    {passwordError}
                  </p>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPasswordOpen(false)}
                    className="flex-1 cursor-pointer rounded-xl bg-zinc-800 py-3 font-medium text-zinc-200 transition hover:bg-zinc-700"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={savingPassword}
                    className="flex-1 cursor-pointer rounded-xl bg-amber-400 py-3 font-semibold text-zinc-950 transition hover:bg-amber-300 disabled:opacity-60"
                  >
                    {savingPassword ? "Updating..." : "Update Password"}
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