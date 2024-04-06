import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout/Layout";
import "./index.css";
import { LoginProvider } from "./context/LoginContext/LoginContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LoginProvider>
      <Layout />
    </LoginProvider>
  </React.StrictMode>
);
