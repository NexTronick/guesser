import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setTheme, selectTheme } from "../features/theme/themeSlice";
import { ThemeType } from "../AllTypes";
import { MdDarkMode } from "react-icons/md";
import { IconContext } from "react-icons";
import { MdLightMode } from "react-icons/md";
import { useCookies } from "react-cookie";

function SwtichTheme() {
  const [cookie, setCookie, RemoveCookie] = useCookies(["theme"]);
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const defaultTheme = () => {
    let currentTheme = cookie.theme == undefined ? "light" : cookie.theme;
    dispatch(setTheme({ value: currentTheme }));
  };
  useEffect(() => {
    window.onchange = () => {
      setInnerWidth(window.innerWidth);
    };
  }, [window.innerWidth]);

  //   const [onHoverState, onHoverStateChange] = useState(false);

  const handleModeChange = (e: any) => {
    let html = document.getElementsByTagName("html")[0];
    let themeStyle = theme === "light" ? "darkTheme" : "brightTheme";
    html.className = themeStyle;
    // let newTheme: ThemeType =
    //   theme === "light" ? { value: "dark" } : { value: "light" };
    // dispatch(setTheme(newTheme));
    let opposite: typeof theme = theme == "light" ? "dark" : "light";
    RemoveCookie("theme", { path: "/" });
    setCookie("theme", opposite, {
      path: "/",
      expires: new Date(new Date().getMonth() + 1),
    });
    dispatch(setTheme({ value: opposite }));
  };

  useEffect(() => {
    defaultTheme();
  }, []);

  return (
    <div className="m-2 relative float-right pt-4">
      <button
        className={`text-white border hover:border-gray-400 ${
          theme === "dark"
            ? "border border-yellow-500 "
            : "border border-yellow-600 "
        } rounded-md`}
        onClick={handleModeChange}
      >
        {theme === "dark" ? (
          <MdLightMode
            className="px-1 py-1 text-yellow-500 hover:text-gray-400"
            size={innerWidth > 768 ? 40 : 40}
          />
        ) : (
          <MdDarkMode
            className="px-1 py-1 text-yellow-600 hover:text-gray-400"
            size={innerWidth > 768 ? 40 : 40}
          />
        )}
      </button>
    </div>
  );
}

export default SwtichTheme;
