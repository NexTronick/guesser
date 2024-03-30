import { createSlice, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { StreakType } from "../../AllTypes";
import { ThunkAction } from "redux-thunk";
import { getCookie, setCookie } from "../../util/CookieUtil";

// Define the initial state using that type
const initialState: StreakType = {
  value: 0, //steak number
  createdAtInTicks: Date.now(), //created
};

export const streakSlice = createSlice({
  name: "streak",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setStreak: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
      state.createdAtInTicks = Date.now();
    },
  },
});

export const { setStreak } = streakSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectStreak = (state: RootState) => state.streak;

export const createStreakThunk =
  (guessTimes: number): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch, getState) => {
    try {
      //make sure the guessTimes number is not null
      if (guessTimes === null) return;

      //get the streak
      const newState = getState();
      console.log("newState Streak Value: ", newState.streak.value);
      let streakValue = guessTimes > 5 ? 0 : newState.streak.value + 1; //if guessTimes more than 5 than streak ended

      dispatch(setStreak(streakValue));
      await setCookieStreak(streakValue);
    } catch (error) {
      console.log("Failed create Streak Thunk", error);
    }
  };
//}

export const loadCookieStreakThunk =
  (): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch) => {
    try {
      let streak = await getCookieStreak("streak");
      if (streak == null) {
        return;
      }
      dispatch(setStreak(streak.value));
    } catch (error) {
      console.log("Failed load Streak Thunk", error);
    }
  };

async function getCookieStreak(name: string) {
  let streak = getCookie(name);
  if (streak == null) {
    return null;
  }
  console.log(JSON.parse(streak));
  let d: StreakType = JSON.parse(streak);
  console.log(d);
  return d;
}

async function setCookieStreak(value: number) {
  let week = 7 * 24 * 60 * 60 * 1000;
  let date = new Date(Date.now() + week);
  let store = JSON.stringify({
    value: value,
    createdAtInTicks: date.getTime(),
  });

  setCookie("streak", store, date);
}

export default streakSlice.reducer;
