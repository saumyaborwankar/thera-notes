import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./rtk-api/authApi";
import userSlice from "./slice/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
  [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // @ts-ignore: Unreachable code error
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
