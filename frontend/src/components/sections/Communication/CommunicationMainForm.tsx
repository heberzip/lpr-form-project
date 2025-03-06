// EXTERNAL MODULES
import { FormState, UseFormRegister } from "react-hook-form";
// CUSTOM COMPONENTS
import { CAutocomplete, CGrid, CInput } from "@customs/.";
// STYLES
import { cAutocompleteSty, cGridSty, cInputSty } from "@styles/styleObjs";
// HELPERS
import { getPhonePrefixFromCountry } from "@utils/helpers";
// TYPES
import {
  CommunicationSectionType,
  CommunicationType,
  LanguageType,
} from "../../../types";

import languageData from "@data/languagesData.json";

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
  const filterFn = (item: LanguageType, query: string) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  };

  const handleItemSelect = (selectedItem: LanguageType) => {
    console.log(selectedItem);
  };

  return (
    <>
      {section.formMainData.map((field) => (
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
          error={
            formState.errors[field.name as keyof CommunicationType]?.message
          }
          onChange={(e) =>
            handleInputChange(
              field.name as keyof CommunicationType,
              e.target.value
            )
          }
        >
          {field.type === "tel" && getPhonePrefixFromCountry(country.value)}
          {field.type === "email" && "@"}
        </CInput>
      ))}

      {
        <CGrid data={section.formGridData || []} sty={cGridSty}>
          {(field) =>
            field.role === "select" ? (
              <CAutocomplete
                key={field.id}
                data={languageData}
                filterFn={filterFn}
                onSelect={handleItemSelect}
                placeholder={field.placeholder}
                renderItem={(item) => item.name}
                label={field.label}
                type={field.type}
                required={field.required}
                additionalInfo={field.additionalInfo}
                sty={cAutocompleteSty}
                {...register(field.name as keyof CommunicationType)}
                error={
                  formState.errors[field.name as keyof CommunicationType]
                    ?.message
                }
                onChange={(e) =>
                  handleInputChange(
                    field.name as keyof CommunicationType,
                    e.target.value
                  )
                }
              />
            ) : (
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
                error={
                  formState.errors[field.name as keyof CommunicationType]
                    ?.message
                }
                onChange={(e) =>
                  handleInputChange(
                    field.name as keyof CommunicationType,
                    e.target.value
                  )
                }
              />
            )
          }
        </CGrid>
      }
    </>
  );
};

export default CommunicationMainForm;
