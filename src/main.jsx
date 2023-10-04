import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="389516593557-oddt3jjpfitndmb56epen9ohi6qgfm85.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
  // </React.StrictMode>
);
