import React, { useEffect } from "react";
import SeperateImage from "../components/SeperateImage";
import FormGuessAnswer from "../components/FormGuessAnswer";
import {
  selectGameSettings,
  loadAnimalWithGameSettingsThunk,
} from "../features/gameSettings/gameSettingsSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
function Game() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const gameSettings = useAppSelector(selectGameSettings);
  useEffect(() => {
    console.log("Game Loaded!");
    if (gameSettings.difficulty.value === 0) {
      navigate("/");
    }
  }, []);
  return (
    <div className="">
      <h1>Guess</h1>
      <div>
        <SeperateImage />
        <FormGuessAnswer className="mt-5" />
      </div>
    </div>
  );
}

export default Game;
