import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { LoginProvider } from "./context/LoginContext/LoginContext";
import { paths } from "./paths";
import Layout from "./Layout/Layout";
import Home from "./views/Home/Home";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import Lore from "./views/Lore/Lore";
import ForgotPassword from "./views/ForgotPassword/ForgotPassword";
import "./index.css";

const defaultTheme = createTheme();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LoginProvider>
      <ThemeProvider theme={defaultTheme}>
        <Router basename="/">
          <Routes>
            <Route path={paths.HOME} element={<Layout />}>
              <Route path={paths.HOME} element={<Home />} />
              <Route path={paths.LOGIN} element={<LoginPage />} />
              <Route path={paths.LORE} element={<Lore />} />

              <Route path={paths.RESET_PASSWORD} element={<ForgotPassword />} />
              <Route path={paths.REGISTER} element={<RegisterPage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </LoginProvider>
  </React.StrictMode>
);
