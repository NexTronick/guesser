import { createSlice, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import type { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { setAnimal, Animal } from "../animal/animalSlice";
import { setImageData } from "../imageData/imageDataSlice";
import type { AnimalType, ImageDataType } from "../../AllTypes";
import axios from "axios";
import { setStatus, Status } from "../dataStatus/dataStatusSlice";
import { setGuess } from "../guess/guessSlice";
import { setCookie, getCookie } from "../../util/CookieUtil";
// Define a type for the slice state
export interface GameSettingsType {
  difficulty: { text: string; value: number };
  guessItem: { text: string; value: number };
}

// Define the initial state using that type
const initialState: GameSettingsType = {
  difficulty: { text: "", value: 0 },
  guessItem: { text: "", value: 0 },
};

export const gameSettingsSlice = createSlice({
  name: "gameSettings",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setGameSettings: (state, action: PayloadAction<GameSettingsType>) => {
      console.log("setGameSettings: ", action.payload);
      state.difficulty = action.payload.difficulty;
      state.guessItem = action.payload.guessItem;
    },
  },
});

export const { setGameSettings } = gameSettingsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGameSettings = (state: RootState) => state.gameSettings;

export const loadAnimalWithGameSettingsThunk =
  (
    gameSettings: GameSettingsType
  ): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch) => {
    try {
      //make sure the gameSettings object is not empty
      if (!gameSettings) {
        return false;
      }
      dispatch(setGameSettings(gameSettings));
      dispatch(setStatus(Status.Loading));
      dispatch(setGuess(""));

      const data = await loadGameSettings(gameSettings);

      if (data?.animal == null || data?.imageData == null) {
        return false;
      }
      //dispatch(setGameSettings(gameSettings));
      dispatch(setAnimal(data.animal));
      dispatch(setImageData(data.imageData));
      dispatch(setStatus(Status.Loaded));
      // const newDispatch = useAppDispatch();
      // newDispatch();
    } catch (error) {
      console.log("Failed load Animal With Game Settings Thunk", error);
      // dispatch(setGameSettingsFailure());
    }
  };

async function loadGameSettings(gameSettings: GameSettingsType) {
  let randomAnimal = await axios.get("/api/animal/random");
  if (randomAnimal.status !== 200) {
    return;
  }
  console.log(randomAnimal.data.animalData);
  let animal: AnimalType = randomAnimal.data.animalData;

  let userHashKey: string = randomAnimal.data.userHashKey;
  userHashKey = handleCookieChange("userHashKey", userHashKey);

  //to do : add the game settings details in backend such as difficulty.
  let randomImage = await axios.post("/api/animal/random/img", {
    image: animal.image,
    reShuffled: false,
    difficulty: gameSettings.difficulty,
    userHashKey: userHashKey,
  });

  //checks for status result
  if (randomImage.status !== 200) {
    return;
  }
  let imageData: ImageDataType = randomImage.data;
  console.log(imageData);
  return {
    animal: animal,
    imageData: imageData,
  };
}

function handleCookieChange(name: string, value: string) {
  let oldCookie = getCookie(name);
  if (oldCookie !== "") {
    return oldCookie;
  }
  let addDate = new Date(Date.now());
  addDate.setFullYear(addDate.getFullYear() + 1);
  setCookie("userHashKey", value, addDate);
  return value;
}
export default gameSettingsSlice.reducer;
