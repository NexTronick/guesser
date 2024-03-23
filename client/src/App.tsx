import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import type { AnimalType, ImagePositonType, ThemeType } from "./AllTypes";
import SeperateImage from "./components/SeperateImage";
import FormGuessAnswer from "./components/FormGuessAnswer";
import NavBar from "./components/NavBar";
import GameSettings from "./pages/GameSettings";
import Game from "./pages/Game";
import { useCookies } from "react-cookie";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectTheme, setTheme } from "./features/theme/themeSlice";

function App() {
  const [cookie, setCookie] = useCookies();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    if (cookie["theme"]) {
      dispatch(setTheme(cookie["theme"]));
      setThemeHTML(cookie["theme"]);
    }
  }, []);

  const setThemeHTML = (prevTheme: ThemeType) => {
    let html = document.getElementsByTagName("html")[0];
    html.className = prevTheme.value === "light" ? "brightTheme" : "darkTheme";
  };
  return (
    <div className={"App text-center "}>
      {/* <Counter></Counter> */}

      <div className="layout">
        <div className="nav">
          <NavBar />
        </div>
        <div className="main-content">
          <Router>
            <Routes>
              <Route path="/" element={<GameSettings />}></Route>
              <Route path="/play" element={<Game />}></Route>
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
