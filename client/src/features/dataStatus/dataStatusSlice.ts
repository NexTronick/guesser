import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export enum Status {
  Loading,
  Loaded,
  Unloaded,
}
interface StatusType {
  status: Status;
}
// Define the initial state using that type
const initialState: StatusType = {
  status: Status.Unloaded,
};

export const dataStatusSlice = createSlice({
  name: "status",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = dataStatusSlice.actions;

export const selectStatus = (state: RootState) => state.dataStatus;

export default dataStatusSlice.reducer;
