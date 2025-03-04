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
  contactDetails: boolean;
  phone: SectionField;
  email: SectionField;
};

/******************************************************************************/
// Load from Local Storage (if exists)
const getContactStateLS = (): ContactState => {
  const savedState = localStorage.getItem("contactState");
  return savedState
    ? JSON.parse(savedState)
    : {
        firstName: { value: "", required: true },
        lastName: { value: "", required: true },
        position: { value: "", required: true },
        contactDetails: false,
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
        key: keyof ContactState;
        value: string | boolean;
      }>
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
  return (
    state.contact.firstName.value !== "" &&
    state.contact.lastName.value !== "" &&
    state.contact.position.value !== ""
  );
};

// REDUCER
export default contactSlice.reducer;
