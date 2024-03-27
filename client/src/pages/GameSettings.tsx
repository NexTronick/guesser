import React, { useState, useEffect } from "react";
import SelectSettings from "../components/SelectSettings";
import ButtonVarient from "../components/parts/ButtonVarient";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectGameSettings,
  setGameSettings,
  GameSettingsType,
  loadAnimalWithGameSettingsThunk,
} from "../features/gameSettings/gameSettingsSlice";

const Difficulty = [
  { text: "Easy", value: 4 },
  { text: "Medium", value: 5 },
  { text: "Hard", value: 10 },
];
const GuessItem = [{ text: "Animal", value: 1 }];

function GameSettings() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const gameSettings = useAppSelector(selectGameSettings);
  const [difficulty, setDifficulty] = useState(gameSettings.difficulty);
  const [guessItem, setGuessItem] = useState(gameSettings.guessItem);

  return (
    <div>
      <h1 className="text-3xl">Game Settings</h1>
      <div className="mt-5">
        <div>
          <SelectSettings
            label="Difficulty"
            options={Difficulty}
            onChange={setDifficulty}
          />
        </div>
        <div>
          <SelectSettings
            label="Guess Item"
            options={GuessItem}
            onChange={setGuessItem}
          />
        </div>
        <div className="mt-4 flex justify-center">
          <ButtonVarient
            className="md:w-[180px] w-2/3"
            theme="light"
            color="primary"
            ariaLabel="Play"
            value="Play"
            onclick={() => {
              dispatch(
                loadAnimalWithGameSettingsThunk({
                  difficulty: difficulty,
                  guessItem: guessItem,
                })
              );
              navigate("/play");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default GameSettings;
