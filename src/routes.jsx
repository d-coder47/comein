import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserRegistration from "./pages/UserRegistration";
import Home from "./pages/Home";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-registration" element={<UserRegistration />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
