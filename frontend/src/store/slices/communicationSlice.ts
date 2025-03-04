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

export type CommunicationState = {
  emergencyPhone: SectionField;
  reservationEmail: SectionField;
  whatsappAvailable: boolean;
  sameAsEmergency: boolean;
  whatsappNumber: SectionField;
  additionalNumbers: SectionField[];
  additionalEmails: SectionField[];
};

/******************************************************************************/
// Load from Local Storage (if exists)
const getCommunicationStateLS = (): CommunicationState => {
  const savedState = localStorage.getItem("communicationState");
  return savedState
    ? JSON.parse(savedState)
    : {
        emergencyPhone: { value: "", required: true },
        reservationEmail: { value: "", required: true },
        whatsappAvailable: false,
        sameAsEmergency: false,
        whatsappNumber: { value: "", required: false },
        additionalNumbers: [],
        additionalEmails: [],
      };
};

// Initialize State
const initialState: CommunicationState = getCommunicationStateLS();

const communicationSlice = createSlice({
  name: "communication",
  initialState,
  reducers: {
    // Action to save the maain form data, such as the decisions
    setCommunicationData: (
      state,
      action: PayloadAction<{
        key: keyof CommunicationState;
        value: string | boolean;
      }>
    ) => {
      const field = state[action.payload.key];
      if (typeof field === "object" && field !== null && "value" in field) {
        field.value = action.payload.value as string;
      } else if (typeof field === "boolean") {
        state[action.payload.key] = action.payload.value as never;
      }

      // Sync WhatsApp Number if "Same as Emergency" is true
      if (
        action.payload.key === "sameAsEmergency" &&
        action.payload.value === true
      ) {
        state.whatsappNumber.value = state.emergencyPhone.value;
      }

      // Save to local storage
      localStorage.setItem("communicationState", JSON.stringify(state));
    },

    // Action to add contacts, phone numbers or emails
    addContact: (
      state,
      action: PayloadAction<{ type: "phone" | "email"; value: string }>
    ) => {
      if (action.payload.type === "phone") {
        state.additionalNumbers.push({
          value: action.payload.value,
          required: false,
        });
      } else {
        state.additionalEmails.push({
          value: action.payload.value,
          required: false,
        });
      }
      localStorage.setItem("communicationState", JSON.stringify(state));
    },

    // Action to remove contacts, phone numbers or emails
    removeContact: (
      state,
      action: PayloadAction<{ type: "phone" | "email"; index: number }>
    ) => {
      if (action.payload.type === "phone") {
        state.additionalNumbers.splice(action.payload.index, 1);
      } else {
        state.additionalEmails.splice(action.payload.index, 1);
      }
      localStorage.setItem("communicationState", JSON.stringify(state));
    },

    // Action to reset the form data
    resetCommunicationData: () => {
      localStorage.removeItem("communicationState");
      return getCommunicationStateLS();
    },
  },
});

/******************************************************************************/
// ACTION CREATORS
export const {
  setCommunicationData,
  addContact,
  removeContact,
  resetCommunicationData,
} = communicationSlice.actions;

// SELECTOR
export const selectCommunication = (state: RootState) => state.communication;

export const isCommunicationFilled = (state: RootState) => {
  return (
    state.communication.emergencyPhone.value !== "" &&
    state.communication.reservationEmail.value !== ""
  );
};

// REDUCER
export default communicationSlice.reducer;
