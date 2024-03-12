import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { AnimalType } from "../../AllTypes";

//Interface Animal
interface Animal {
  animal: AnimalType;
}

// Define the initial state using that type
const initialState: Animal = {
  animal: {
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
      state.animal = action.payload;
    },
  },
});

export const { setAnimal } = animalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default animalSlice.reducer;
