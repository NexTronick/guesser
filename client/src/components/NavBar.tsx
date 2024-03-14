import React from "react";
import SwtichTheme from "./SwitchTheme";

function NavBar() {
  return (
    <div className="">
      <SwtichTheme />
      <nav className="flex justify-center">
        <ul>
          <li>Games</li>
          <li>Play</li>
        </ul>
      </nav>
    </div>
  );
}
export default NavBar;
