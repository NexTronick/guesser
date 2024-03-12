import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { ImagePositonType } from "../../AllTypes";

//Interface ImagePosition
interface ImagePosition {
  imagePosition: Array<ImagePositonType>;
}

// Define the initial state using that type
const initialState: ImagePosition = {
  imagePosition: new Array<ImagePositonType>(),
};

export const imagePositionSlice = createSlice({
  name: "imagePosition",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setImagePosition: (state, action: PayloadAction<ImagePosition>) => {
      state.imagePosition = action.payload.imagePosition;
    },
  },
});

export const { setImagePosition } = imagePositionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default imagePositionSlice.reducer;
