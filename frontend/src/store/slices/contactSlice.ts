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
export type ContactState = {
  firstName: SectionField;
  lastName: SectionField;
  position: SectionField;
  contactDetails: {
    value: boolean;
    required: boolean;
  };
  phone: SectionField;
  email: SectionField;
};

/******************************************************************************/
const getContactStateLS = (): ContactState => {
  const savedState = localStorage.getItem("contactState");
  return savedState
    ? JSON.parse(savedState)
    : {
        firstName: { value: "", required: true },
        lastName: { value: "", required: true },
        position: { value: "", required: true },
        contactDetails: { value: false, required: true },
        phone: { value: "", required: false },
        email: { value: "", required: false },
      };
};

const initialState: ContactState = getContactStateLS();

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContactData: (
      state,
      action: PayloadAction<{
        key: keyof ContactState | string;
        value: string | boolean;
      }>
    ) => {
      if (state[action.payload.key as keyof ContactState]) {
        state[action.payload.key as keyof ContactState].value =
          action.payload.value;
      }
      localStorage.setItem("contactState", JSON.stringify(state));
    },

    resetContactData: () => {
      localStorage.removeItem("contactState");
      return getContactStateLS();
    },
  },
});

// ACTION CREATORS
export const { setContactData, resetContactData } = contactSlice.actions;

// SELECTOR
export const selectContact = (state: RootState) => state.contact;

export const isContactFilled = (state: RootState) => {
  return Object.entries(state.contact)
    .filter(([key]) => key !== "contactDetails") // exclude contactDetails thats boolean
    .filter(([, field]) => field.required)
    .every(([, field]) => field.value !== "");
};

// REDUCER
export default contactSlice.reducer;
