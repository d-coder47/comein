import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserRegistration from "./pages/UserRegistration";
import Login from "./pages/Login";
import Home from "./pages/Home";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/user-login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
