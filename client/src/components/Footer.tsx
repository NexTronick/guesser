import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../features/theme/themeSlice";

export default function Footer() {
  const theme = useAppSelector(selectTheme);
  return (
    <div className="bottom-0 absolute w-full">
      <div
        className={` p-6 text-center ${
          theme === "light"
            ? "bg-neutral-200 text-neutral-900"
            : "bg-neutral-900 text-neutral-200"
        }`}
      >
        <span> © {new Date(Date.now()).getFullYear()} </span>
        <a
          className={`font-semibold hover:underline no-underline ${
            theme === "light" ? "text-neutral-600" : "text-neutral-300"
          }`}
          href="/"
        >
          Natraj Padwani
        </a>
        <span>. All rights Reserved.</span>
      </div>
    </div>
  );
}
