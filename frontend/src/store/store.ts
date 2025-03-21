// EXTERNAL MODULES
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// SLICES
import loadedReducer from "@store/slices/loadedSlice";
import infoReducer from "@store/slices/infoSlice";
import companyReducer from "@store/slices/companySlice";
import contactReducer from "@store/slices/contactSlice";
import communicationReducer from "@store/slices/communicationSlice";
import bankReducer from "@store/slices/bankSlice";

/******************************************************************************/

const store = configureStore({
  reducer: {
    loaded: loadedReducer,
    info: infoReducer,
    company: companyReducer,
    contact: contactReducer,
    communication: communicationReducer,
    bank: bankReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
