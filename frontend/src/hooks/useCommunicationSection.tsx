// EXTERNAL MODULES
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@store/store";
import { useSelector } from "react-redux";
import { useState } from "react";
// CUSTOM HOOKS
import useSection from "@hooks/useSection";
import useDymanicReset from "./useDynamicReset";
// STORE
import {
  setCommunicationData,
  selectCommunication,
  isCommunicationFilled,
} from "@store/slices/communicationSlice";
// TYPES AND SCHEMAS
import { communicationSchema } from "@schema/sectionSchemas";
import { CommunicationType } from "../types";
/** ***************************************************************************/

const useCommunicationSection = () => {
  // section data from store with custom selector
  const section = useSection();
  // dispatch
  const dispatch = useAppDispatch();
  // data from store with custom selector
  const communicationData = useSelector(selectCommunication);

  // state for first radio button
  const [hasWhatsapp, setHasWhatsapp] = useState<boolean>(
    communicationData.whatsappAvailable as boolean
  );

  // filter state to obtain only the fields values and not their required status
  const parsedDefaultValues = Object.fromEntries(
    Object.entries(communicationData).map(([key, field]) => {
      if (typeof field === "object" && field !== null) {
        if (Array.isArray(field)) {
          return [key, field.map((item) => item.value)]; // return array of values
        } else if ("value" in field) {
          return [key, field.value]; // return value
        }
      }
      return [key, field]; // return boolean
    })
  ) as CommunicationType;

  // initialize form with react-hook-form and real-time validation
  const {
    register,
    watch,
    handleSubmit,
    formState,
    setValue,
    getValues,
    trigger,
    reset,
  } = useForm<CommunicationType>({
    resolver: zodResolver(communicationSchema),
    defaultValues: parsedDefaultValues,
    mode: "onChange", // authomatic validation on change
  });

  // ensure that `defaultValues` are updated dynamically
  useDymanicReset({
    parsedDefaultValues,
    resetCondition: !hasWhatsapp,
    reset,
    trigger,
    isFilled: useSelector(isCommunicationFilled),
    resetFields: {
      whatsappNumber: "",
    },
  });

  // handler for input change
  const handleInputChange = (name: keyof CommunicationType, value: string) => {
    dispatch(setCommunicationData({ key: name, value })); // update redux state
    setValue(name, value, { shouldValidate: true, shouldDirty: true }); // update form state
  };

  // handler for radio button change
  const handleWhatsappChange = (value: boolean) => {
    setHasWhatsapp(value);
    dispatch(setCommunicationData({ key: "whatsappAvailable", value }));
  };

  // handler for form submission
  const onSubmit = (data: CommunicationType) => {
    console.log("Form Data:", data);
  };

  return {
    section,
    communicationData,
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState,
    hasWhatsapp,
    handleInputChange,
    handleWhatsappChange,
    onSubmit,
  };
};

export default useCommunicationSection;
