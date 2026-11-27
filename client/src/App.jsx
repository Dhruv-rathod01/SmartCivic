import React from "react";
import Login from "./Pages/Login"
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/Forgot-Password";
import Report from "./Pages/Report-issue";
import Myreport from "./Pages/My-reports";
import Help from "./Pages/Help";
import Complain from "./Pages/Complain";
import Chatbot from "./Pages/Chatbot"
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

const App =()=>{
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
  <Route path="/login" element={<Login />} />
   <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/Register" element={<Register />} />
  <Route element={<ProtectedRoute />}>
  <Route path="/home" element={<Home />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/report-issue" element={<Report />} />
  <Route path="/my-reports" element={<Myreport />} />
  <Route path="/help" element={<Help />} />
  <Route path="/chatbot" element={<Chatbot />} />
  <Route path="/complain" element={<Complain />} />
  </Route>
</Routes>
    </div>
  );
}

export default App;