/* // EXTERNAL MODULES
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// STORE
import { RootState } from "@store/store"; */

/******************************************************************************/
// TYPES
export type Vehicle = {
  model: string;
  pax: number;
  quantity: number;
};

export type FleetState = {
  fleet: {
    quantity: number;
    required: boolean;
  };
  vehicles: Vehicle[];
};

/**************************************************************************** */
// Load from Local Storage
/* const getFleetStateLS = (): FleetState => {
  const savedState = localStorage.getItem("fleetState");
  return savedState
    ? JSON.parse(savedState)
    : {
        fleet: { quantity: 1, required: true },
        vehicles: [],
      };
}; */

// const initialState: FleetState = getFleetStateLS();
