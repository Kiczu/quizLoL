import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

const Layout = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Hello World</div>} />
      </Routes>
    </Router>
  );
};

export default Layout;
