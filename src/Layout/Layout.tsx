import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { getJinx } from "../api/firebase/firebse";
import Home from "../views/Home/Home";
import LoginPage from "../views/LoginPage/LoginPage";
import RegisterPage from "../views/RegisterPage/RegisterPage";
import { HOME, LOGIN, REGISTER } from "../paths";

// getJinx();

const Layout = () => {
  return (
    <Router>
      <header>
        <ul>
          <Link to={HOME}>
            <li>Home</li>
          </Link>
          <Link to={LOGIN}>
            <li>Login</li>
          </Link>
        </ul>
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
