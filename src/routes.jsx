import React, { useEffect, useState } from "react";
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
import AdicionarPrograma from "./pages/Programa/Adicionar";
import EditarPrograma from "./pages/Programa/Editar";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registar" element={<UserRegistration />} />
          <Route path="/resetar-palavra-passe" element={<ResetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil/:userId/:userName" element={<Profile />} />
          <Route
            path="/editar-perfil/:userId/:userName"
            element={<EditProfile />}
          />
          <Route path="/:type/:id/:name" element={<CardDetailed />} />
          <Route path="/eventos/adicionar" element={<AdicionarEvento />} />
          <Route path="/eventos/editar/:id" element={<EditarEvento />} />
          <Route
            path="/eventos/adicionar-programa/:id"
            element={<AdicionarPrograma />}
          />
          <Route
            path="/eventos/editar-programa/:idPrograma"
            element={<EditarPrograma />}
          />
          <Route path="/projetos/adicionar" element={<AdicionarProjeto />} />
          <Route path="/projetos/editar/:id" element={<EditarProjeto />} />
          <Route path="/mapa" element={<Map />} />
          <Route
            path="/perfil-utilizador-configuracao/:userId/:userName"
            element={<ProfileConfiguration />}
          />
        </Routes>
      </Router>
    </>
  );
};
export default AppRoutes;
