import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import animalReducer from "../features/animal/animalSlice";
import imagePositionReducer from "../features/imagePosition/imagePositionSlice";
import themeReducer from "../features/theme/themeSlice";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    animal: animalReducer,
    imagePosition: imagePositionReducer,
    theme: themeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
