import { createSlice, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import type { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { setAnimal, Animal } from "../animal/animalSlice";
import { setImageData, ImageData } from "../imageData/imageDataSlice";
import type { AnimalType, ImageDataType } from "../../AllTypes";
import axios from "axios";
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
    // setGameSettingsFailure: (
    //   state,
    //   action: PayloadAction<GameSettingsType>
    // ) => {
    //   // state.difficulty = state.difficulty;
    //   // state.guessItem = state.guessItem;
    //   console.log("Failed");
    // },
  },
});

export const { setGameSettings } = gameSettingsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGameSettings = (state: RootState) => state.gameSettings;

// export const thunkMiddleware =
//   (gameSettings: GameSettingsType) =>
//   ({ dispatch, getState }: { dispatch: any; getState: any }) =>
//   (next: any) =>
//   (action: any) => {
//     // If the "action" is actually a function instead...
//     if (typeof action === "function") {
//       // then call the function and pass `dispatch` and `getState` as arguments
//       return action(dispatch, getState);
//     }

//     // Otherwise, it's a normal action - send it onwards
//     return next(action);
//   };

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
      //dispatch(setGameSettings(gameSettings));

      const data = await loadGameSettings(gameSettings);

      if (data?.animal == null || data?.imageData == null) {
        return false;
      }
      dispatch(setGameSettings(gameSettings));
      dispatch(setAnimal(data.animal));
      dispatch(setImageData(data.imageData));
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
  //to do : add the game settings details in backend such as difficulty.
  let randomImage = await axios.post("/api/animal/random/img", {
    image: animal.image,
    reShuffled: false,
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

export default gameSettingsSlice.reducer;
