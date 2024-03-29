import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import animalReducer from "../features/animal/animalSlice";
import imagePositionReducer from "../features/imagePosition/imagePositionSlice";
import themeReducer from "../features/theme/themeSlice";
import gameSettingsReducer from "../features/gameSettings/gameSettingsSlice";
import imageDataSlice from "../features/imageData/imageDataSlice";
import dataStatusReducer from "../features/dataStatus/dataStatusSlice";
import guessReducer from "../features/guess/guessSlice";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    animal: animalReducer,
    imagePosition: imagePositionReducer,
    theme: themeReducer,
    gameSettings: gameSettingsReducer,
    imageData: imageDataSlice,
    dataStatus: dataStatusReducer,
    guess: guessReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
store.subscribe(() => {
  const state = store.getState();
  document.cookie = `theme=${state.theme.value}`;
});
export default store;
