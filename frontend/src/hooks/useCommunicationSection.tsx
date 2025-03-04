// EXTERNAL MODULES
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@store/store";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
// CUSTOM HOOKS
import useSection from "@hooks/useSection";
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

  // state for second radio button
  const [isSameAsEmergency, setIsSameAsEmergency] = useState<boolean>(
    communicationData.sameAsEmergency as boolean
  );

  // state to avoid first validation on mount
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const isFilled = useSelector(isCommunicationFilled);

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
  );

  // initialize form with react-hook-form and real-time validation
  const { register, watch, handleSubmit, formState, setValue, trigger, reset } =
    useForm<CommunicationType>({
      resolver: zodResolver(communicationSchema),
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
  const handleInputChange = (name: keyof CommunicationType, value: string) => {
    dispatch(setCommunicationData({ key: name, value })); // update redux state
    setValue(name, value, { shouldValidate: true, shouldDirty: true }); // update form state
  };

  // handler for radio button change
  const handleWhatsappChange = (value: boolean) => {
    setHasWhatsapp(value);
    dispatch(setCommunicationData({ key: "whatsappAvailable", value }));
    if (!value)
      dispatch(setCommunicationData({ key: "sameAsEmergency", value: true }));
  };

  const handleSameAsEmergencyChange = (value: boolean) => {
    setIsSameAsEmergency(value);
    dispatch(setCommunicationData({ key: "sameAsEmergency", value }));
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
    formState,
    hasWhatsapp,
    handleInputChange,
    handleWhatsappChange,
    isSameAsEmergency,
    handleSameAsEmergencyChange,
    onSubmit,
  };
};

export default useCommunicationSection;
