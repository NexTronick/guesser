import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setTheme, selectTheme } from "../features/theme/themeSlice";
import { ThemeType } from "../AllTypes";
import { MdDarkMode } from "react-icons/md";
import { IconContext } from "react-icons";
import { MdLightMode } from "react-icons/md";
import { useCookies } from "react-cookie";

function SwtichTheme() {
  const [cookie, setCookie] = useCookies();
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  //   const [onHoverState, onHoverStateChange] = useState(false);

  const handleModeChange = (e: any) => {
    let html = document.getElementsByTagName("html")[0];
    let themeStyle = theme === "light" ? "darkTheme" : "brightTheme";
    html.className = themeStyle;
    let newTheme: ThemeType =
      theme === "light" ? { value: "dark" } : { value: "light" };

    dispatch(setTheme(newTheme));
    let date = new Date(Date.now());
    date.setMonth(date.getMonth() + 1);
    setCookie("theme", newTheme.value, { path: "/", expires: date });
  };
  return (
    <div className="m-2 relative float-right">
      {/* <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={handleModeChange}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium">Change Theme</span>
      </label>*/}

      <button
        className="text-white bg-black rounded-md"
        onClick={handleModeChange}
      >
        {/*
          hover:animate-fade-down hover:animate-once  hover:animate-duration-500 hover:animate-ease-linear
          
          <IconContext.Provider
            value={{
              color: "gray",
              style: { backgroundColor: "black" },
              size: "40px",
              className: "px-2 py-1 hover:text-yellow-400",
            }}
          > */}
        {theme === "light" ? (
          <MdLightMode
            className="px-2 py-2 text-yellow-400 hover:text-gray-400"
            size={45}
          />
        ) : (
          <MdDarkMode
            className="px-2 py-2 text-yellow-400 hover:text-gray-400"
            size={45}
          />
        )}
        {/* <MdDarkMode className=" hover:text-yellow-400 hover:animate-[fadeIn_0.5s_ease-in]" />
          <MdLightMode /> */}
        {/* </IconContext.Provider> */}
      </button>
    </div>
  );
}

export default SwtichTheme;
