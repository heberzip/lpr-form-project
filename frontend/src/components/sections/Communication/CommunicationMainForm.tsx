// EXTERNAL MODULES
import {
  FormState,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
// CUSTOM COMPONENTS
import { CAutocomplete, CGrid, CInput } from "@customs/.";
// STORE
import { useAppDispatch } from "@store/store";
import { addLanguage } from "@store/slices/communicationSlice";
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
  communicationData: CommunicationType;
  register: UseFormRegister<CommunicationType>;
  formState: FormState<CommunicationType>;
  country: { value: string; required: boolean };
  handleInputChange: (name: keyof CommunicationType, value: string) => void;
  setValue: UseFormSetValue<CommunicationType>;
  getValues: UseFormGetValues<CommunicationType>;
};
/******************************************************************************/

const CommunicationMainForm = ({
  section,
  communicationData,
  register,
  formState,
  country,
  handleInputChange,
  setValue,
}: CommunicationMainFormProps) => {
  const dispatch = useAppDispatch();

  //console.log(languageData);

  const filterFn = (item: LanguageType, query: string) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  };

  const handleLanguageChange = (
    name: keyof CommunicationType,
    value: string
  ) => {
    // Obtiene los idiomas actuales o un array vacío
    setValue(name, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // handle item selection in dropdown (the country in this case
  const handleItemSelect = (selectedItem: LanguageType) => {
    const prevLanguages = communicationData.languages.map(
      (lang) => lang?.value
    );

    dispatch(addLanguage(selectedItem.name));

    setValue("languages", [...prevLanguages, selectedItem.name], {
      shouldValidate: true,
      shouldDirty: true,
    });
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
                onChange={(e) => {
                  console.log(e.target.value);
                  handleLanguageChange(
                    field.name as keyof CommunicationType,
                    e.target.value
                  );
                }}
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
