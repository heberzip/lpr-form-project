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
  sameAccountHolder: boolean;
  accountHolder: SectionField;
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
        sameAccountHolder: true,
        accountHolder: {
          value: "",
          required: false,
        },
      };
};

const initialState: BankState = getBankStateLS();

const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    setBankData: (
      state,
      action: PayloadAction<{ key: keyof BankState; value: string | boolean }>
    ) => {
      const field = state[action.payload.key];
      if (typeof field === "object" && field !== null && "value" in field) {
        field.value = action.payload.value as string;
      } else if (typeof field === "boolean") {
        state[action.payload.key] = action.payload.value as never;
      }

      // Save to Local Storage by creating a new property
      localStorage.setItem("contactState", JSON.stringify(state));
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
  return (
    state.bank.iban.value !== "" &&
    state.bank.bankName.value !== "" &&
    state.bank.swift.value !== ""
  );
};

// REDUCER
export default bankSlice.reducer;
