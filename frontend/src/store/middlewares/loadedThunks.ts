// STORE
import { AppDispatch } from "@store/store";
import { setLoaded } from "@store/slices/loadedSlice";

/******************************************************************************/

export const initializeLoaded = (search: string) => {
  return async (dispatch: AppDispatch) => {
    const params = new URLSearchParams(search);
    const supplier = params.get("supplier") || "";
    const airports = params.get("airports")
      ? params.get("airports")!.split(",")
      : [];

    dispatch(setLoaded({ supplier, airports }));
  };
};
