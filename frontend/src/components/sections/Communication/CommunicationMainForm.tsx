// EXTERNAL MODULES
import { FormState, UseFormRegister } from "react-hook-form";
// CUSTOM COMPONENTS
import { CInput } from "@customs/.";
// STYLES
import { cInputSty } from "@styles/styleObjs";
// HELPERS
import { getPhonePrefixFromCountry } from "@utils/helpers";
// TYPES
import { CommunicationSectionType, CommunicationType } from "../../../types";

/******************************************************************************/
// TYPES
type CommunicationMainFormProps = {
  section: CommunicationSectionType;
  register: UseFormRegister<CommunicationType>;
  formState: FormState<CommunicationType>;
  country: { value: string; required: boolean };
  handleInputChange: (name: keyof CommunicationType, value: string) => void;
};
/******************************************************************************/

const CommunicationMainForm = ({
  section,
  register,
  formState,
  country,
  handleInputChange,
}: CommunicationMainFormProps) => {
  return section.formMainData.map((field) => (
    <CInput
      key={field.id}
      id={field.name}
      label={field.label}
      type={field.type}
      placeholder={field.placeholder}
      required={field.required}
      additionalInfo={field.additionalInfo}
      sty={cInputSty}
      {...register(field.name as keyof CommunicationType)}
      error={formState.errors[field.name as keyof CommunicationType]?.message}
      onChange={(e) =>
        handleInputChange(field.name as keyof CommunicationType, e.target.value)
      }
    >
      {field.type === "tel" && getPhonePrefixFromCountry(country.value)}
      {field.type === "email" && "@"}
    </CInput>
  ));
};

export default CommunicationMainForm;
