// EXTERNAL MODULES
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
// CUSTOM HOOKS
import useSection from "@hooks/useSection";
// STORE
import { useAppDispatch } from "@store/store";
import { setBankData, selectBank, isBankFilled } from "@store/slices/bankSlice";
// TYPES AND SCHEMAS
import { bankSchema } from "@schema/sectionSchemas";
import { BankType } from "../types";

/******************************************************************************/

const useBankSection = () => {
  // section data from store with custom selector
  const section = useSection();
  // dispatch
  const dispatch = useAppDispatch();
  // bank data from store with custom selector
  const bankData = useSelector(selectBank);

  // state to avoid first validation on mount
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const isFilled = useSelector(isBankFilled);

  // filter state to obtain only the fields values and not their required status
  const parsedDefaultValues = Object.fromEntries(
    Object.entries(bankData).map(([key, field]) => [key, field.value])
  );

  // initialize form with react-hook-form and real-time validation
  const { register, watch, handleSubmit, formState, setValue, trigger, reset } =
    useForm<BankType>({
      resolver: zodResolver(bankSchema),
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

  // handler to update the form and redux state in real time
  const handleInputChange = (name: keyof BankType, value: string) => {
    dispatch(setBankData({ key: name, value }));
    setValue(name, value, { shouldValidate: true, shouldDirty: true });
  };

  // handler for form submission
  const onSubmit = (data: BankType) => {
    console.log("Form Data:", data);
  };

  return {
    section,
    register,
    watch,
    handleSubmit,
    formState,
    handleInputChange,
    onSubmit,
  };
};

export default useBankSection;
