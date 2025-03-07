// EXTERNAL MODULES
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// STORE
import { RootState } from "@store/store";

/******************************************************************************/
// TYPES
export type SectionField = {
  value: string;
  required: boolean;
};
export type BankState = {
  iban: SectionField;
  bankName: SectionField;
  swift: SectionField;
};

/******************************************************************************/
// Load from Local Storage (if exists)
const getBankStateLS = (): BankState => {
  const savedState = localStorage.getItem("bankState");
  return savedState
    ? JSON.parse(savedState)
    : {
        iban: { value: "", required: true },
        bankName: { value: "", required: true },
        swift: { value: "", required: true },
      };
};

const initialState: BankState = getBankStateLS();

const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    setBankData: (
      state,
      action: PayloadAction<{ key: keyof BankState | string; value: string }>
    ) => {
      if (state[action.payload.key as keyof BankState]) {
        state[action.payload.key as keyof BankState].value =
          action.payload.value;
      }
      localStorage.setItem("bankState", JSON.stringify(state));
    },

    resetBankData: () => {
      localStorage.removeItem("bankState");
      return getBankStateLS();
    },
  },
});

// ACTION CREATORS
export const { setBankData, resetBankData } = bankSlice.actions;

// SELECTOR
export const selectBank = (state: RootState) => state.bank;

export const isBankFilled = (state: RootState) => {
  return Object.entries(state.bank)
    .filter(([, field]) => field.required)
    .every(([, field]) => field.value !== "");
};

// REDUCER
export default bankSlice.reducer;
