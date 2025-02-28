// EXTERNAL MODULES
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@store/store";
import { useSelector } from "react-redux";
import { useState } from "react";
// HOOKS
import useSection from "@hooks/useSection";
// STORE
import { setContactData, selectContact } from "@store/slices/contactSlice";
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
  const [hasDetails, setHasDetails] = useState<boolean>(
    contactData.contactDetails
  );

  // form register with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ContactType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      ...contactData,
      ...contactData.additionalFields,
    },
  });

  // handler for input change
  const handleInputChange = (name: keyof ContactType, value: string) => {
    dispatch(setContactData({ [name]: value }));
    setValue(name, value);
  };

  // handler for radio button change
  const handleRadioChange = (value: boolean) => {
    setHasDetails(value);
    dispatch(setContactData({ contactDetails: value }));
  };

  // handler for dropdown's item selection
  const handleItemSelect = (selectedItem: PositionType) => {
    handleInputChange("position", selectedItem.position);
    setValue("position", selectedItem.position);
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
    handleSubmit,
    formState: { errors },
    hasDetails,
    setHasDetails,
    handleInputChange,
    handleRadioChange,
    handleItemSelect,
    filterFn,
    onSubmit,
  };
};

export default useContactSection;
