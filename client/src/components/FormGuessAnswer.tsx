import React, { useState } from "react";
import type { AnimalType } from "../AllTypes";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectAnimal } from "../features/animal/animalSlice";
import {
  loadAnimalWithGameSettingsThunk,
  selectGameSettings,
} from "../features/gameSettings/gameSettingsSlice";
// interface Props {
//   animalName: string;
//   getFactAndReshuffle: Function;
// }
function FormGuessAnswer() {
  const [answer, setAnswer] = useState<string>("");
  const animal = useAppSelector(selectAnimal);
  const gameSettings = useAppSelector(selectGameSettings);
  const dispatch = useAppDispatch();

  const submitHandler = (event: any) => {
    event.preventDefault();
    const check = event.target.animal.value;
    if (animal.value.animal === check.toLowerCase()) {
      event.target.animal.value = "";
      alert("Yay! you got it right!");
      dispatch(loadAnimalWithGameSettingsThunk(gameSettings));
    } else {
      alert("Ooops! you got it wrong. Try again!");
    }
  };
  return (
    <div>
      <form action="" onSubmit={submitHandler}>
        Guess Animal:{" "}
        <input
          type="text"
          name="animal"
          onChange={(e) => setAnswer(e.target.value)}
          className=" outline outline-gray-400 outline-1 focus:outline-2 focus:outline-gray-800 px-2"
        />
        <button
          type="submit"
          className=" m-2 border-gray-950 bg-blue-800 p-2 text-white hover:bg-blue-700 active:bg-blue-950 px-8"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormGuessAnswer;
