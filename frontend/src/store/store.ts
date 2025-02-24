// EXTERNAL MODULES
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// SLICES
import loadedReducer from "@store/slices/loadedSlice";

/******************************************************************************/

const store = configureStore({
  reducer: { loaded: loadedReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
