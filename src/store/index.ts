import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import globalReducer from "./global";
import libraryReducer from "./library";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    global: globalReducer,
    library: libraryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
