// EXTERNAL MODULES
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
// HOOKS
import useSection from "@hooks/useSection";
// STORE
import { useAppDispatch } from "@store/store";
import { setCompanyData, selectCompany } from "@store/slices/companySlice";
// TYPES AND SCHEMAS
import { companySchema } from "@schema/sectionSchemas";
import { CompanyType, CountryType } from "../types";

/******************************************************************************/

const useCompanySection = () => {
  // section data from store with custom selector
  const section = useSection();
  // dispatch
  const dispatch = useAppDispatch();
  // data from store with custom selector
  const companyData = useSelector(selectCompany);

  // form register with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CompanyType>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      ...companyData,
      ...companyData.additionalFields,
    },
  });

  // handler for input change
  const handleInputChange = (name: keyof CompanyType, value: string) => {
    dispatch(setCompanyData({ [name]: value }));
    setValue(name, value);
  };

  // handler for dropdown's item selection
  const handleItemSelect = (selectedItem: CountryType) => {
    handleInputChange("country", selectedItem.name);
    setValue("country", selectedItem.name);
  };

  // filter function for dropdown
  const filterFn = (item: CountryType, query: string) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  };

  // handler for form submission
  const onSubmit = (data: CompanyType) => {
    console.log("Form Data:", data);
  };

  return {
    section,
    register,
    handleSubmit,
    formState: { errors },
    handleInputChange,
    handleItemSelect,
    filterFn,
    onSubmit,
  };
};

export default useCompanySection;
