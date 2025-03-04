// EXTERNAL MODULES
import { FormState, UseFormRegister } from "react-hook-form";
// CUSTOM COMPONENTS
import { CInput } from "@customs/.";
// STYLES
import { cInputSty } from "@styles/styleObjs";
// TYPES
import { CompanyType, CompanySectionType } from "../../../types";

/******************************************************************************/
// TYPES
type CompanyMainFormProps = {
  section: CompanySectionType;
  register: UseFormRegister<CompanyType>;
  formState: FormState<CompanyType>;
  handleInputChange: (name: keyof CompanyType, value: string) => void;
};
/******************************************************************************/

const CompanyMainForm = ({
  section,
  register,
  formState,
  handleInputChange,
}: CompanyMainFormProps) => {
  return section.formMainData.map((field) => (
    // Map through Company name, Trade name, and VAT
    <CInput
      key={field.id}
      id={field.name}
      label={field.label}
      type={field.type}
      placeholder={field.placeholder}
      required={field.required}
      additionalInfo={field.additionalInfo}
      sty={cInputSty}
      {...register(field.name as keyof CompanyType)}
      error={formState.errors[field.name as keyof CompanyType]?.message}
      onChange={(e) =>
        handleInputChange(field.name as keyof CompanyType, e.target.value)
      }
    />
  ));
};

export default CompanyMainForm;
