import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { getJinx } from "../api/firebase/firebse";
import Home from "../views/Home/Home";

getJinx();

const Layout = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default Layout;
