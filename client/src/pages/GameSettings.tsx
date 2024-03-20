import React, { useState, useEffect } from "react";
import SelectSettings from "../components/SelectSettings";
import ButtonVarient from "../components/parts/ButtonVarient";
import { useNavigate } from "react-router-dom";

const Difficulty = [
  { text: "Easy", value: 3 },
  { text: "Medium", value: 4 },
  { text: "Hard", value: 5 },
];

function GameSettings() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-3xl">Game Settings</h1>
      <div className="mt-30">
        <div>
          <SelectSettings label="Difficulty" options={Difficulty} />
        </div>
        <div>
          <SelectSettings label="Guess?" options={Difficulty} />
        </div>
        <div className="mt-2 flex justify-center">
          <ButtonVarient
            theme="light"
            color="primary"
            ariaLabel="Play"
            value="Play"
            onclick={() => {
              navigate("/play");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default GameSettings;
