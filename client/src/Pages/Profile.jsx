import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import {useState} from "react"

const Profile = () => {
   const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="w-full min-h-screen bg-[#050d0b] pt-16">
      <Nav onMenuClick={()=> setSidebarOpen(!sidebarOpen)} 
        />
            <div className="flex">
      <div
        className={`shrink-0 transition-all duration-300 ${
          sidebarOpen ? "w-60" : "w-0"
        }`}
      >
        {sidebarOpen && <Sidebar />}
      </div>
      <h1 className="p-10 text-3xl font-bold text-white">
         Your Profile
      </h1>
    </div>
    </div>
  );
};

export default Profile;