// EXTERNAL MODULES
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@store/store";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
// HOOKS
import useSection from "@hooks/useSection";
// STORE
import {
  setContactData,
  selectContact,
  isContactFilled,
} from "@store/slices/contactSlice";
// TYPES AND SCHEMAS
import { contactSchema } from "@schema/sectionSchemas";
import { ContactType, PositionType } from "../types";

/******************************************************************************/

const useContactSection = () => {
  // section data from store with custom selector
  const section = useSection();
  // dispatch
  const dispatch = useAppDispatch();
  // data from store with custom selector
  const contactData = useSelector(selectContact);
  // state for first radio btn
  const [hasDetails, setHasDetails] = useState<boolean>(
    contactData.contactDetails as boolean
  );

  // state to avoid first validation on mount
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const isFilled = useSelector(isContactFilled);

  // filter state to obtain only the fields values and not their required status
  const parsedDefaultValues = Object.fromEntries(
    Object.entries(contactData).map(([key, field]) => {
      if (typeof field === "object" && field !== null && "value" in field) {
        return [key, field.value]; // return value
      } else return [key, field]; // return boolean
    })
  );

  // initialize form with react-hook-form and real-time validation
  const { register, watch, handleSubmit, formState, setValue, trigger, reset } =
    useForm<ContactType>({
      resolver: zodResolver(contactSchema),
      defaultValues: parsedDefaultValues,
      mode: "onChange", // authomatic validation on change
    });

  // ensure that `defaultValues` are updated dynamically
  useEffect(() => {
    reset(parsedDefaultValues); // update values when state changes
    if (isFirstLoad) {
      setIsFirstLoad(false);
      if (isFilled) trigger();
    } else {
      trigger();
    }
  }, [reset, trigger]); // eslint-disable-line

  // handler for input change
  const handleInputChange = (name: keyof ContactType, value: string) => {
    dispatch(setContactData({ key: name, value }));
    setValue(name, value, { shouldValidate: true, shouldDirty: true });
  };

  // handler for radio button change
  const handleRadioChange = (value: boolean) => {
    setHasDetails(value);
    dispatch(setContactData({ key: "contactDetails", value }));
  };

  // handler for dropdown's item selection
  const handleItemSelect = (selectedItem: PositionType) => {
    handleInputChange("position", selectedItem.position);
  };

  // filter function for dropdown
  const filterFn = (item: PositionType, query: string) => {
    return item.position.toLowerCase().includes(query.toLowerCase());
  };

  // handler for form submission
  const onSubmit = (data: ContactType) => {
    console.log("Form Data:", data);
  };

  return {
    section,
    register,
    watch,
    handleSubmit,
    formState,
    hasDetails,
    handleInputChange,
    handleRadioChange,
    handleItemSelect,
    filterFn,
    onSubmit,
  };
};

export default useContactSection;
