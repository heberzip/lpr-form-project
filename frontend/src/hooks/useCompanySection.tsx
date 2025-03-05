// EXTERNAL MODULES
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
// CUSTOM HOOKS
import useSection from "@hooks/useSection";
// STORE
import { useAppDispatch } from "@store/store";
import {
  setCompanyData,
  selectCompany,
  isComanyFilled,
} from "@store/slices/companySlice";
// TYPES AND SCHEMAS
import { companySchema } from "@schema/sectionSchemas";
import { CompanyType, CountryType } from "../types";

/******************************************************************************/

const useCompanySection = () => {
  // section data from custom hook
  const section = useSection();
  // dispatch from store
  const dispatch = useAppDispatch();
  // company data from store with custom selector
  const companyData = useSelector(selectCompany);

  // state to avoid first validation on mount
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const isFilled = useSelector(isComanyFilled);

  // filter state to obtain only the fields values and not their required status
  const parsedDefaultValues = Object.fromEntries(
    Object.entries(companyData).map(([key, field]) => [key, field.value])
  );

  // initialize form with react-hook-form and real-time validation
  const {
    register,
    watch,
    handleSubmit,
    formState,
    setValue,
    reset,
    trigger, // to validate form in real-time
  } = useForm<CompanyType>({
    resolver: zodResolver(companySchema),
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
  const handleInputChange = (name: keyof CompanyType, value: string) => {
    dispatch(setCompanyData({ key: name, value }));
    setValue(name, value, { shouldValidate: true, shouldDirty: true });
  };

  // handle item selection in dropdown (the country in this case)
  const handleItemSelect = (selectedItem: CountryType) => {
    handleInputChange("country", selectedItem.name);
  };

  // filter function for dropdown
  const filterFn = (item: CountryType, query: string) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  };

  // handler for form submission
  const onSubmit = (data: CompanyType) => {
    console.log("test");
    console.log("Form Data:", data);
  };

  return {
    section,
    register,
    watch,
    handleSubmit,
    formState,
    handleInputChange,
    handleItemSelect,
    filterFn,
    onSubmit,
  };
};

export default useCompanySection;
