import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="38134040728-pqqeht4v4f2ehttsdt4if9bf5132scl3.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
  // </React.StrictMode>
);
