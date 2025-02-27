// EXTERNAL MODULES
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// STORE
import { RootState } from "@store/store";

/******************************************************************************/
// TYPES
export type CompanyState = {
  companyName: string;
  tradeName: string;
  vat: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  country: string;
  province: string;
  additionalFields: Record<string, string>;
};

/******************************************************************************/
const getCompanyStateLS = (): CompanyState => {
  const savedState = localStorage.getItem("companyState");
  return savedState
    ? JSON.parse(savedState)
    : {
        companyName: "",
        tradeName: "",
        vat: "",
        streetAddress: "",
        city: "",
        zipCode: "",
        country: "",
        province: "",
        additionalFields: {},
      };
};

const initialState: CompanyState = getCompanyStateLS();

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanyData: (state, action: PayloadAction<Partial<CompanyState>>) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (key in state) {
          state[key as keyof CompanyState] = value as any; // eslint-disable-line
        } else {
          state.additionalFields[key] = value as string;
        }
      });
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

// REDUCER
export default companySlice.reducer;
