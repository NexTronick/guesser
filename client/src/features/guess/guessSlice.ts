import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define the initial state using that type
const initialState = {
  value: "", //animal value
};

export const guessSlice = createSlice({
  name: "guess",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setGuess: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setGuess } = guessSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGuess = (state: RootState) => state.guess.value;

export default guessSlice.reducer;
