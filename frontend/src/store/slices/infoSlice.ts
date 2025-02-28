// EXTERNAL MODULES
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// STORE
import { RootState } from "@store/store";

/******************************************************************************/
// TYPES
export type InfoState = {
  label: string;
  additionalInfo: string;
};

/******************************************************************************/
const initialState: InfoState = {
  label: "",
  additionalInfo: "",
};

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setInfo: (
      state,
      action: PayloadAction<Partial<InfoState & { autoHide?: number }>>
    ) => {
      return { ...state, ...action.payload };
    },

    clearInfo: () => initialState,
  },
});

/******************************************************************************/
// ACTION CREATORS
export const { setInfo, clearInfo } = infoSlice.actions;

/******************************************************************************/
// SELECTOR
export const selectInfo = (state: RootState) => state.info;

/******************************************************************************/
// REDUCER
export default infoSlice.reducer;
