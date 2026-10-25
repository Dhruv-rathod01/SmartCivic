import React from "react";
import Login from "./Pages/Login"
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/Forgot-Password";
import Report from "./Pages/Report-issue";
import Myreport from "./Pages/My-reports";
import Browseissue from "./Pages/Browse-issues";
import { Routes, Route } from "react-router-dom";

const App =()=>{
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/home" element={<Home />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/Register" element={<Register />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/report-issue" element={<Report />} />
  <Route path="/my-reports" element={<Myreport />} />
  <Route path="/browse-issues" element={<Browseissue />} />
</Routes>
    </div>
  );
}

export default App;