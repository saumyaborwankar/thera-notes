import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./rtk-api/authApi";
import userSlice from "./slice/userSlice";
import clientSlice from "./slice/clientSlice";
import { clientApi } from "./rtk-api/clientApi";
import noteSlice from "./slice/noteSlice";

const rootReducer = combineReducers({
  user: userSlice,
  clients: clientSlice,
  notes: noteSlice,
  [authApi.reducerPath]: authApi.reducer,
  [clientApi.reducerPath]: clientApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // @ts-ignore: Unreachable code error
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, clientApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
