import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { ImageDataType } from "../../AllTypes";

//interface use ImageDataType
// export interface ImageData {
//   value: ImageDataType;
// }

// Define the initial state using that type
const initialState: ImageDataType = {
  generatedNumbers: {
    positions: [{ x: 0, y: 0 }],
    xSize: 0,
    ySize: 0,
  },
  images: {
    chosenPositions: [{ x: 0, y: 0 }],
    urls: [""],
  },
};

export const imageDataSlice = createSlice({
  name: "imageData",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setImageData: (state, action: PayloadAction<ImageDataType>) => {
      state.generatedNumbers = action.payload.generatedNumbers;
      state.images = action.payload.images;
    },
    setPartialImages: (
      state,
      action: PayloadAction<typeof initialState.images>
    ) => {
      state.images = action.payload;
    },
  },
});

export const { setImageData } = imageDataSlice.actions;

export const selectImageData = (state: RootState) => state.imageData;

export default imageDataSlice.reducer;
