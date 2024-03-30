import React, { createElement, useEffect, useRef, useState } from "react";
import type { AnimalType } from "../AllTypes";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectAnimal } from "../features/animal/animalSlice";
import {
  loadAnimalWithGameSettingsThunk,
  selectGameSettings,
} from "../features/gameSettings/gameSettingsSlice";
import { selectTheme } from "../features/theme/themeSlice";
import ButtonVarient from "./parts/ButtonVarient";
import { firstLetterUppercase } from "../util/Funtionalitise";
import { setGuess, selectGuess } from "../features/guess/guessSlice";
import { createStreakThunk } from "../features/streak/streakSlice";

interface Props {
  className: string;
}
function FormGuessAnswer(props: Props) {
  const [answer, setAnswer] = useState<string>("");
  const animal = useAppSelector(selectAnimal);
  const theme = useAppSelector(selectTheme);
  const gameSettings = useAppSelector(selectGameSettings);
  const dispatch = useAppDispatch();
  const inputRef = useRef();
  const [span, setSpan] = useState(<span></span>);
  const [guessTimes, setGuessTimes] = useState(0);
  const guess = useAppSelector(selectGuess);

  const submitHandler = (event: any) => {
    event.preventDefault();
    const check = event.target.animal.value;
    if (animal.value.animal === check.toLowerCase()) {
      event.target.animal.value = "";
      setAnswer("");

      setSpan(
        <>
          <br />
          <span className=" text-green-500">
            Yay! you got it right! <br />
            {`${firstLetterUppercase(animal.value.animal)} Fact: ${
              animal.value.fact
            }`}
          </span>
        </>
      );
      dispatch(createStreakThunk(guessTimes));
      dispatch(loadAnimalWithGameSettingsThunk(gameSettings));
    } else {
      setGuessTimes(guessTimes + 1);
      setSpan(
        <>
          <br />
          <span className="text-red-500">
            Ooops! you got it wrong. Try again!
          </span>
        </>
      );
    }
    if (guessTimes >= 2) {
      dispatch(setGuess(check));
    }
  };

  const submit = (e: React.FormEvent<HTMLInputElement>) => {};

  useEffect(() => {
    dispatch(setGuess(""));
    setAnswer("");
    setGuessTimes(0);
  }, [animal, dispatch]);

  return (
    <div className={props.className}>
      <form action="" onSubmit={submitHandler} id="guess">
        {/*  */}
        <input
          ref={inputRef.current}
          type="text"
          name="animal"
          id="animal"
          onChange={(e) => setAnswer(e.target.value)}
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   submit(e);
          // }}
          //outline outline-gray-400  focus:outline-gray-800
          className={`outline-0 focus:outline-0 border-gray-400 border-b-[1px] px-2 h-10 bg-transparent text-center text-lg ${
            theme === "light"
              ? "text-black focus:text-black focus:border-black "
              : "text-white focus:text-white focus:bo rder-white"
          }`}
          placeholder="Type here..."
        />
        <br />
        {span}
        <br />
        <ButtonVarient
          color="primary"
          // === "light" ? "light" : "dark"
          theme={theme}
          ariaLabel="Submit"
          value="Guess"
          onclick={(e: React.FormEvent<HTMLInputElement>) => {}}
          className="md:w-52 mx-auto mt-8 w-1/2"
          //m-2 border-gray-950 bg-blue-800 p-2 text-white hover:bg-blue-700 active:bg-blue-950 px-8
        />
      </form>
    </div>
  );
}

export default FormGuessAnswer;
