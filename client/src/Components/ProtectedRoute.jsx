
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/home`, {
        withCredentials: true,
      })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, [API_URL]);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
