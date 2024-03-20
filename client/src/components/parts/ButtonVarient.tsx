import React from "react";
import { StringToBoolean, tv } from "tailwind-variants";

enum ColorVariant {
  primary,
  secondary,
  success,
  danger,
}
type Color = keyof typeof ColorVariant;
const customButton = tv({
  slots: {
    base: "relative group w-24",
    background:
      "absolute -inset-0.5 rounded-md blur opacity-80 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 w-full",
    button: "relative rounded-md py-2.5 px-7 transition duration-200",
  },
  variants: {
    /* ToDo add light theme and dark theme*/

    light: {
      primary: {
        background: "bg-gradient-to-r from-blue-500 to-teal-400",
        button: "bg-black text-gray-200 group-hover:text-white",
      },
      secondary: {
        background: "bg-gradient-to-r from-pink-600 to-purple-600",
        button: "bg-black text-gray-200 group-hover:text-white",
      },
      success: {
        background: "bg-gradient-to-r from-green-600 to-green-400",
        button: "bg-black text-gray-200 group-hover:text-white",
      },
      danger: {
        background: "bg-gradient-to-r from-red-600 to-orange-600",
        button: "bg-black text-gray-200 group-hover:text-white",
      },
    },
    dark: {
      primary: {
        background: "bg-gradient-to-r from-blue-500 to-teal-400",
        button: "bg-black text-gray-200 group-hover:text-white",
      },
      secondary: {
        background: "bg-gradient-to-r from-pink-600 to-purple-600",
        button: "bg-black text-gray-200 group-hover:text-white",
      },
      success: {
        background: "bg-gradient-to-r from-green-600 to-green-400",
        button: "bg-black text-gray-200 group-hover:text-white",
      },
      danger: {
        background: "bg-gradient-to-r from-red-600 to-orange-600",
        button: "bg-black text-gray-200 group-hover:text-white",
      },
    },
  },
});

//button({ backgroundColor: "secondary", button: "primary" });

interface ButtonProps {
  theme: "light" | "dark";
  color: Color;
  ariaLabel: string;
  value: string;
  onclick: Function;
}

export default function ButtonVarient(props: ButtonProps) {
  const theme =
    props.theme === "light"
      ? customButton({ light: props.color })
      : customButton({ dark: props.color });
  const { base, background, button } = theme;
  return (
    <div>
      <div className={base()}>
        <div className={background()}></div>

        {/*  bg
        absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-md blur opacity-80 group-hover:opacity-100 transition duration-1000 group-hover:duration-200
         */}

        {/*         btn
        relative bg-black rounded-md py-2.5 px-7 text-gray-200 group-hover:text-white transition duration-200 */}
        <button
          className={button()}
          aria-label={props.ariaLabel}
          onClick={() => props.onclick()}
        >
          {props.value}
        </button>
      </div>
    </div>
  );
}
