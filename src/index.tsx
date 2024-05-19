import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LoginProvider } from "./context/LoginContext/LoginContext";
import { paths } from "./paths";
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
        <Routes>
          <Route path={paths.HOME} element={<Layout />}>
            <Route path={paths.HOME} element={<Home />} />
            <Route path={paths.LOGIN} element={<LoginPage />} />

            <Route path={paths.REGISTER} element={<RegisterPage />} />
          </Route>
        </Routes>
      </Router>
    </LoginProvider>
  </React.StrictMode>
);
