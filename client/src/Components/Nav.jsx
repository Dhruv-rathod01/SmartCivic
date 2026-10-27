
import {FaLandmark, FaBell,FaUser,FaBars,} from "react-icons/fa";
import {Link} from "react-router-dom";
import { useState } from "react";

const Nav = ({ onMenuClick }) => {
  const [active, setActive] = useState(false);
  return (
   <nav className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-[#091310] px-6 text-white">
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
       <FaBell
        onClick={() => setActive(!active)}
        className={`cursor-pointer ${
          active ? "text-yellow-400" : "text-zinc-300"
        }`}
      />
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-700">
            <Link to="/profile">
            <FaUser className="cursor-pointer" /></Link>
        
          
        </div>
      </div>
    </nav>
  );
};

export default Nav;
