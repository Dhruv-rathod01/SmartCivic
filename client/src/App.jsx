import React from "react";
import Login from "./Pages/Login"
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/Forgot-Password";
import { Routes, Route } from "react-router-dom";

const App =()=>{
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/home" element={<Home />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/Register" element={<Register />} />
</Routes>
    </div>
  );
}

export default App;