// EXTERNAL MODULES
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// STORE
import { RootState } from "@store/store";

/******************************************************************************/
// TYPES
export type ContactState = {
  firstName: string;
  lastName: string;
  position: string;
  contactDetails: boolean;
  phone: string;
  email: string;
  additionalFields: Record<string, string>;
};

/******************************************************************************/
const getContactStateLS = (): ContactState => {
  const savedState = localStorage.getItem("contactState");
  return savedState
    ? JSON.parse(savedState)
    : {
        firstName: "",
        lastName: "",
        position: "",
        contactDetails: false,
        phone: "",
        email: "",
        additionalFields: {},
      };
};

const initialState: ContactState = getContactStateLS();

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContactData: (state, action: PayloadAction<Partial<ContactState>>) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (key in state) {
          state[key as keyof ContactState] = value as never;
        } else {
          state.additionalFields[key] = value as string;
        }
      });
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

// REDUCER
export default contactSlice.reducer;
