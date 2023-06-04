import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserRegistration from "./pages/UserRegistration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/Profile/EditProfile";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
