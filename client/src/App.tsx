import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeType } from "./AllTypes";
import Header from "./components/Header";
import GameSettings from "./pages/GameSettings";
import Game from "./pages/Game";
import { useCookies } from "react-cookie";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectTheme } from "./features/theme/themeSlice";
import {
  loadCookieStreakThunk,
  selectStreak,
} from "./features/streak/streakSlice";

function App() {
  const [cookie, setCookie] = useCookies();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const streak = useAppSelector(selectStreak);

  useEffect(() => {
    if (cookie["theme"] != undefined) {
      setThemeHTML({ value: cookie.theme });
    }
    if (cookie["streak"] != undefined && streak.value == 0) {
      dispatch(loadCookieStreakThunk());
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
          <Header />
        </div>
        <div className="main-content mt-20 md:w-1/2 md:mx-auto w-full">
          <Routes>
            <Route path="/" element={<GameSettings />}></Route>
            <Route path="/play" element={<Game />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
