import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCity, FaBars, FaBell, FaUser } from "react-icons/fa";

const Nav = ({ onMenuClick }) => {
  const [active, setActive] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-zinc-800/80 bg-[#0f131a] px-4 sm:px-6 text-zinc-100 select-none">
      
      <div className="flex items-center gap-3.5">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-transparent text-zinc-400 transition hover:border-zinc-700/80 hover:bg-zinc-800/80 hover:text-white"
        >
          <FaBars className="text-base" />
        </button>

        <Link to="/home" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-zinc-950">
            <FaCity size={15} />
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-white">
            Smart<span className="text-amber-400">Civic</span>
          </span>
        </Link>
      </div>

      
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => setActive(!active)}
          aria-label="Notifications"
          className={`relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border transition ${
            active
              ? "border-amber-400/30 bg-amber-400/10 text-amber-400"
              : "border-zinc-800 bg-[#141923] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
          }`}
        >
          <FaBell className="text-sm" />
          {active && (
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-amber-400" />
          )}
        </button>

        <Link
          to="/profile"
          title="Profile"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700/80 bg-[#181e29] text-zinc-300 transition hover:border-amber-400/60 hover:text-amber-400"
        >
          <FaUser className="text-xs" />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;