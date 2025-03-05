// EXTERNAL MODULES
import { useSelector } from "react-redux";
import { FormState, UseFormRegister } from "react-hook-form";
// CUSTOM COMPONENTS
import { CInput } from "@customs/.";
// STORE
import { selectCompany } from "@store/slices/companySlice";
// STYLES
import { cInputSty, cInputStyDisabled } from "@styles/styleObjs";
// HELPERS
import { getPhonePrefixFromCountry } from "@utils/helpers";
// TYPES
import { ContactSectionType, ContactType } from "../../../types";

/******************************************************************************/
// TYPES
type ContactDependentFieldsProps = {
  section: ContactSectionType;
  register: UseFormRegister<ContactType>;
  formState: FormState<ContactType>;
  hasDetails: boolean;
  handleInputChange: (name: keyof ContactType, value: string) => void;
};
/******************************************************************************/

const ContactDependentFields = ({
  section,
  register,
  formState,
  hasDetails,
  handleInputChange,
}: ContactDependentFieldsProps) => {
  const { country } = useSelector(selectCompany);

  return section.decisionData[0].dependents.map((depField) => (
    <CInput
      key={depField.id}
      id={depField.name}
      label={depField.label}
      type={depField.type}
      placeholder={depField.placeholder}
      additionalInfo={depField.additionalInfo}
      required={depField.required}
      disabled={!hasDetails}
      sty={hasDetails ? cInputSty : cInputStyDisabled}
      {...register(depField.name as keyof ContactType)}
      onChange={(e) =>
        handleInputChange(depField.name as keyof ContactType, e.target.value)
      }
      error={formState.errors[depField.name as keyof ContactType]?.message}
    >
      {depField.type === "tel" && getPhonePrefixFromCountry(country.value)}
      {depField.type === "email" && "@"}
    </CInput>
  ));
};

export default ContactDependentFields;
