import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/home`, {
        withCredentials: true,
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        navigate("/login", { replace: true });
      });
  }, []);

  if (loading) {
    return <p className="bg-[#050d0b] min-h-screen text-white p-8">Loading...</p>;
  }

  return (
    <div className="w-full min-h-screen bg-[#050d0b]">
      <Nav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <div
          className={`shrink-0 overflow-hidden duration-300 ${
            sidebarOpen ? "w-60" : "w-0"
          }`}
        >
          <Sidebar />
        </div>

        <main className="min-w-0 flex-1 p-8 text-white">
          <h1 className="text-3xl font-bold">
            Find Issues in Your City
          </h1>
          <p className="mt-2 text-zinc-400">
            Report civic issues and help make your community better.
          </p>
        </main>
      </div>
    </div>
  );
};

export default Home;