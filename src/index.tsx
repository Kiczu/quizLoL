import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LoginProvider } from "./context/LoginContext/LoginContext";
import { HOME, LOGIN, REGISTER } from "./paths";
import Layout from "./Layout/Layout";
import Home from "./views/Home/Home";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LoginProvider>
      <Router basename="/">
        <Layout>
          <Routes>
            <Route path={HOME} element={<Home />} />
            <Route path={LOGIN} element={<LoginPage />} />

            <Route path={REGISTER} element={<RegisterPage />} />
          </Routes>
        </Layout>
      </Router>
    </LoginProvider>
  </React.StrictMode>
);
