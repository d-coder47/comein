import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserRegistration from "./pages/UserRegistration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/Profile/EditProfile";
import ProfileConfiguration from "./pages/Profile/ProfileConfiguration";
import ResetPassword from "./pages/ResetPassword";
import CardDetailed from "./components/CardDetailed";
import AdicionarEvento from "./pages/Eventos/Adicionar";
import EditarEvento from "./pages/Eventos/Editar";
import AdicionarProjeto from "./pages/Projetos/Adicionar";
import Map from "./pages/Map/index";
import EditarProjeto from "./pages/Projetos/Editar";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-registration" element={<UserRegistration />} />
          <Route path="/user-reset-password" element={<ResetPassword />} />
          <Route path="/user-login" element={<Login />} />
          <Route path="/user-profile/:userId/:userName" element={<Profile />} />
          <Route
            path="/edit-profile/:userId/:userName"
            element={<EditProfile />}
          />
          <Route path="/:type/:id/:name" element={<CardDetailed />} />
          <Route path="/eventos/adicionar" element={<AdicionarEvento />} />
          <Route path="/eventos/editar/:id" element={<EditarEvento />} />
          <Route path="/projetos/adicionar" element={<AdicionarProjeto />} />
          <Route path="/projetos/editar/:id" element={<EditarProjeto />} />
          <Route path="/map" element={<Map />} />
          <Route
            path="/user-profile-configuration/:userId/:userName"
            element={<ProfileConfiguration />}
          />
        </Routes>
      </Router>
    </>
  );
};
export default AppRoutes;
