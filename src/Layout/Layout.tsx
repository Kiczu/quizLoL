import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../views/Home/Home";

import Navigation from "../components/Navigation/Navigation";
import LoginPage from "../views/LoginPage/LoginPage";
import RegisterPage from "../views/RegisterPage/RegisterPage";
import { HOME, LOGIN, REGISTER } from "../paths";

const Layout = () => {
  return (
    <Router>
      <header>
      <Navigation />
      </header>
      <main>
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path={LOGIN} element={<LoginPage />} />
          
          <Route path={REGISTER} element={<RegisterPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default Layout;
