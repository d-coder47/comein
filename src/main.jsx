import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
<<<<<<< HEAD

import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="38134040728-pqqeht4v4f2ehttsdt4if9bf5132scl3.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
=======
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
>>>>>>> 1853da9b55d1d48b1298a70febc1d55e7e08bd8c
  </React.StrictMode>
);
