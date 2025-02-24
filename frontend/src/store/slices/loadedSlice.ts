// EXTERNAL MODULES
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// STORE
import { RootState } from "@store/store";

/******************************************************************************/
// TYPES
export type LoadedState = {
  supplier: string;
  airports: string[];
};

/******************************************************************************/

const getLoadedStateFromLS = (): LoadedState => {
  const savedState = localStorage.getItem("loadedState");
  return savedState ? JSON.parse(savedState) : { supplier: "", airports: [] };
};

const initialState: LoadedState = getLoadedStateFromLS();

const loadedSlice = createSlice({
  name: "loaded",
  initialState,
  reducers: {
    setLoaded: (state, action: PayloadAction<LoadedState>) => {
      state.supplier = action.payload.supplier;
      state.airports = action.payload.airports;

      localStorage.setItem("loadedState", JSON.stringify(state));
    },
  },
});

// ACTION CREATORS
export const { setLoaded } = loadedSlice.actions;

// SELECTOR
export const selectLoaded = (state: RootState) => state.loaded;

// REDUCER
export default loadedSlice.reducer;
