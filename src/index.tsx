import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { LoginProvider } from "./context/LoginContext/LoginContext";
import { GameProvider } from "./context/GameContext/GameContext";
import { paths } from "./paths";
import { theme } from "./theme/theme";
import Layout from "./Layout/Layout";
import Home from "./views/Home/Home";
import Champion from "./components/Champion/Champion";
import AuthPage from "./views/AuthPage/AuthPage";
import Lore from "./views/Lore/Lore";
import Hangman from "./views/Hangman/Hangman";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LoginProvider>
      <ThemeProvider theme={theme}>
        <Router basename="/">
          <Routes>
            <Route path={paths.HOME} element={<Layout />}>
              <Route path={paths.HOME} element={<Home />} />
              <Route path={paths.CHAMPION_DETAIL} element={<Champion />} />
              <Route
                path={paths.HANGMAN}
                element={
                  <GameProvider>
                    <Hangman />
                  </GameProvider>
                }
              />
              <Route path={paths.AUTH + "/*"} element={<AuthPage />} />

              <Route path={paths.LORE} element={<Lore />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </LoginProvider>
  </React.StrictMode>
);
