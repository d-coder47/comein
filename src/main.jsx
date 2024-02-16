import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { hydrate, render } from "react-dom";
import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import "./i18n";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(
    <GoogleOAuthProvider clientId="389516593557-oddt3jjpfitndmb56epen9ohi6qgfm85.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>,
    rootElement
  );
} else {
  render(
    <GoogleOAuthProvider clientId="389516593557-oddt3jjpfitndmb56epen9ohi6qgfm85.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>,
    rootElement
  );
}

ReactDOM.createRoot(rootElement);
