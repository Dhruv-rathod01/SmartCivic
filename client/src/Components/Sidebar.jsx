import { Link } from "react-router-dom";
import { FaHome, FaFileAlt, FaClipboardList, FaSearch, FaUser} from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import axios from "axios";




const Sidebar = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const items = [
    { name: "Home", path: "/home", icon: <FaHome className="cursor-pointer text-xl hover:text-emerald-400"/> },
    { name: "Report Issue", path: "/report-issue", icon: <FaFileAlt className="cursor-pointer text-xl hover:text-emerald-400" /> },
    { name: "My Reports", path: "/my-reports", icon: <FaClipboardList className="cursor-pointer text-xl hover:text-emerald-400" /> },
    { name: "Browse Issues", path: "/browse-issues", icon: <FaSearch className="cursor-pointer text-xl hover:text-emerald-400" /> },
    { name: "Profile", path: "/profile", icon: <FaUser className="cursor-pointer text-xl hover:text-emerald-400" /> },
    
  ];
  

return (
    <aside className="flex min-h-screen w-60 flex-col bg-[#091310] p-4 text-white">
      <div>
        {items.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-4 rounded-lg px-4 py-3 hover:bg-emerald-400"
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
<button
  onClick={async () => {
    const response = await axios.get(
      `${API_URL}/logout`,
      { withCredentials: true }
    );

    if (response.data.success) {
      navigate("/login");
    }
  }}
  className="flex items-center gap-4 rounded-lg px-4 py-3 hover:bg-emerald-400"
>
  <TbLogout2 className="text-xl" />
  Logout
</button>
        
          </aside>
        );
      };

export default Sidebar;