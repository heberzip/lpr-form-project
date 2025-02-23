import { configureStore } from "@reduxjs/toolkit";

// SLICES
import loadedReducer from "./slices/loadedSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: { loaded: loadedReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
