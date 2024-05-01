import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../views/Home/Home";
import Navigation from "../components/Navigation/Navigation";

const Layout = () => {
  return (
    <Router>
      <header>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <footer></footer>
    </Router>
  );
};

export default Layout;
