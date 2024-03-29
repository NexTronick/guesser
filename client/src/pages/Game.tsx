import React, { useEffect } from "react";
import SeperateImage from "../components/SeperateImage";
import FormGuessAnswer from "../components/FormGuessAnswer";
import {
  selectGameSettings,
  loadAnimalWithGameSettingsThunk,
} from "../features/gameSettings/gameSettingsSlice";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import Hint from "../components/Hint";
import { selectGuess } from "../features/guess/guessSlice";

function Game() {
  const navigate = useNavigate();
  const gameSettings = useAppSelector(selectGameSettings);
  const guess = useAppSelector(selectGuess);
  useEffect(() => {
    console.log("Game Loaded!");
    if (gameSettings.difficulty.value === 0) {
      navigate("/");
    }
  }, []);
  return (
    <div className="">
      {guess !== "" ? <Hint /> : ""}
      <div>
        <SeperateImage />
        <FormGuessAnswer className="mt-5" />
      </div>
    </div>
  );
}

export default Game;
