
import {FaLandmark, FaBell,FaUser,FaBars,} from "react-icons/fa";

const Nav = ({ onMenuClick }) => {
  return (
    <nav className="flex h-16 items-center justify-between border-b border-white/10 bg-[#091310] px-6 text-white">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick}>
           <FaBars className="cursor-pointer text-xl hover:text-emerald-400" />
           </button>

        <div className="flex items-center gap-3">
          <FaLandmark className="text-3xl text-emerald-400" />
          <h1 className="text-xl font-bold">
            Smart<span className="text-emerald-400">Civic</span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <FaBell className="cursor-pointer text-zinc-300" />
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-700">
          <FaUser />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
