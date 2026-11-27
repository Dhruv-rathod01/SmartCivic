import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsWechat } from "react-icons/bs";
import {
  HiOutlineHome,
  HiOutlineClipboardDocumentList,
  HiOutlineDocumentPlus,
  HiOutlineUser,
  HiOutlineQuestionMarkCircle,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";

const API_URL = import.meta.env.VITE_API_URL;

const Sidebar = ({ isOpen = true }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const workspaceItems = [
    { name: "Home", path: "/home", icon: HiOutlineHome },
    { name: "Report Issue", path: "/report-issue", icon: HiOutlineDocumentPlus },
    { name: "My Reports", path: "/my-reports", icon: HiOutlineClipboardDocumentList },
  ];

  const accountItems = [
    { name: "Profile", path: "/profile", icon: HiOutlineUser },
    { name: "Help & Support", path: "/help", icon: HiOutlineQuestionMarkCircle },
    { name: "Chatbot", path: "/chatbot", icon: BsWechat },
  ];

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      const response = await axios.get(`${API_URL}/logout`, {
        withCredentials: true,
      });

      if (response.data.success) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  const renderLink = (item) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;

    return (
      <Link
        key={item.name}
        to={item.path}
        className={`group relative flex items-center rounded-xl py-2.5 text-sm font-medium transition-all duration-200 ${
          isOpen ? "gap-3.5 px-3.5" : "justify-center px-0"
        } ${
          isActive
            ? "border border-zinc-700/80 bg-zinc-800/95 text-white shadow-sm"
            : "border border-transparent text-zinc-400 hover:bg-zinc-900/90 hover:text-zinc-100"
        }`}
      >
        {/* Left Amber Accent Bar on Active Item */}
        {isActive && isOpen && (
          <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-amber-400" />
        )}

        <Icon
          className={`shrink-0 text-xl transition-colors ${
            isActive
              ? "text-amber-400"
              : "text-zinc-500 group-hover:text-zinc-200"
          }`}
        />

        {isOpen ? (
          <span className="truncate">{item.name}</span>
        ) : (
          /* Custom Floating Tooltip on Collapsed Rail */
          <span className="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-lg border border-zinc-700/80 bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100">
            {item.name}
          </span>
        )}

        {/* Active Dot Indicator when Collapsed */}
        {!isOpen && isActive && (
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-amber-400" />
        )}
      </Link>
    );
  };

  return (
    <aside
      className={`fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] select-none flex-col justify-between border-r border-zinc-800/80 bg-[#0f131a] py-5 text-zinc-100 transition-all duration-300 ${
        isOpen ? "w-60 px-4" : "w-20 px-3"
      }`}
    >
      {/* TOP: Grouped Navigation */}
      <div className="space-y-6">
        {/* Workspace Links */}
        <div>
          {isOpen && (
            <p className="mb-2 px-3.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              Workspace
            </p>
          )}
          <nav className="space-y-1">{workspaceItems.map(renderLink)}</nav>
        </div>

        {/* Subtle Divider when Collapsed */}
        {!isOpen && <div className="mx-auto h-px w-8 bg-zinc-800/80" />}

        {/* Account Links */}
        <div>
          {isOpen && (
            <p className="mb-2 px-3.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              Account
            </p>
          )}
          <nav className="space-y-1">{accountItems.map(renderLink)}</nav>
        </div>
      </div>

      {/* BOTTOM: Sign Out Button */}
      <div className="border-t border-zinc-800/80 pt-3.5">
        <button
          type="button"
          onClick={handleLogout}
          className={`group relative flex w-full cursor-pointer items-center rounded-xl border border-transparent py-2.5 text-sm font-medium text-zinc-400 transition-all hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400 ${
            isOpen ? "gap-3.5 px-3.5" : "justify-center px-0"
          }`}
        >
          <HiOutlineArrowRightOnRectangle className="shrink-0 text-xl" />
          {isOpen ? (
            <span className="whitespace-nowrap">Sign out</span>
          ) : (
            <span className="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-lg border border-zinc-700/80 bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-red-400 opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100">
              Sign out
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;