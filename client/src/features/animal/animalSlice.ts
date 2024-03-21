import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { AnimalType } from "../../AllTypes";

//Interface Animal
export interface Animal {
  value: AnimalType;
}

// Define the initial state using that type
const initialState: Animal = {
  value: {
    animal: "",
    image: "",
    fact: "",
    image_id: "",
    fact_id: "",
  },
};

export const animalSlice = createSlice({
  name: "animal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAnimal: (state, action: PayloadAction<AnimalType>) => {
      state.value = action.payload;
    },
  },
});

export const { setAnimal } = animalSlice.actions;

export const selectAnimal = (state: RootState) => state.animal;

export default animalSlice.reducer;
