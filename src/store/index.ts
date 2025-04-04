import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import globalReducer from "./global";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    global: globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
