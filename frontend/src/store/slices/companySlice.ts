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
export type CompanyState = {
  companyName: SectionField;
  tradeName: SectionField;
  vat: SectionField;
  streetAddress: SectionField;
  city: SectionField;
  zipCode: SectionField;
  country: SectionField;
  province: SectionField;
};

/******************************************************************************/
const getCompanyStateLS = (): CompanyState => {
  const savedState = localStorage.getItem("companyState");
  return savedState
    ? JSON.parse(savedState)
    : {
        companyName: { value: "", required: true },
        tradeName: { value: "", required: false },
        vat: { value: "", required: true },
        streetAddress: { value: "", required: true },
        city: { value: "", required: true },
        zipCode: { value: "", required: true },
        country: { value: "", required: true },
        province: { value: "", required: false },
      };
};

const initialState: CompanyState = getCompanyStateLS();

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanyData: (
      state,
      action: PayloadAction<{ key: keyof CompanyState | string; value: string }>
    ) => {
      if (state[action.payload.key as keyof CompanyState]) {
        state[action.payload.key as keyof CompanyState].value =
          action.payload.value;
      }
      localStorage.setItem("companyState", JSON.stringify(state));
    },

    resetCompanyData: () => {
      localStorage.removeItem("companyState");
      return getCompanyStateLS();
    },
  },
});

// ACTION CREATORS
export const { setCompanyData, resetCompanyData } = companySlice.actions;

// SELECTOR
export const selectCompany = (state: RootState) => state.company;

export const isComanyFilled = (state: RootState) => {
  return Object.entries(state.company)
    .filter(([, field]) => field.required)
    .every(([, field]) => field.value !== "");
};

// REDUCER
export default companySlice.reducer;
