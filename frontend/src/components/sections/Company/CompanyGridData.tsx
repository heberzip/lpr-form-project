// EXTERNAL MODULES
import { FormState, UseFormRegister } from "react-hook-form";
// CUSTOM COMPONENTS
import { CGrid, CAutocomplete, CInput } from "@customs/.";
// STYLES
import { cGridSty, cAutocompleteSty, cInputSty } from "@styles/styleObjs";
// DATA
import countriesData from "@data/countriesData.json";
// TYPES
import { CompanyType, CompanySectionType, CountryType } from "../../../types";

/******************************************************************************/
// TYPES
type CompanyGridDataProps = {
  section: CompanySectionType;
  register: UseFormRegister<CompanyType>;
  formState: FormState<CompanyType>;
  handleInputChange: (name: keyof CompanyType, value: string) => void;
  handleItemSelect: (selectedItem: CountryType) => void;
  filterFn: (item: CountryType, query: string) => boolean;
};
/******************************************************************************/

const CompanyGridData = ({
  section,
  register,
  formState,
  handleInputChange,
  handleItemSelect,
  filterFn,
}: CompanyGridDataProps) => {
  return (
    <CGrid data={section.formGridData || []} sty={cGridSty}>
      {(field) =>
        field.role === "select" ? (
          <CAutocomplete
            key={field.id}
            data={countriesData}
            filterFn={filterFn}
            onSelect={handleItemSelect}
            placeholder={field.placeholder}
            renderItem={(item) => item.name}
            label={field.label}
            type={field.type}
            required={field.required}
            additionalInfo={field.additionalInfo}
            sty={cAutocompleteSty}
            {...register(field.name as keyof CompanyType)}
            error={formState.errors[field.name as keyof CompanyType]?.message}
            onChange={(e) =>
              handleInputChange(field.name as keyof CompanyType, e.target.value)
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
            {...register(field.name as keyof CompanyType)}
            error={formState.errors[field.name as keyof CompanyType]?.message}
            onChange={(e) =>
              handleInputChange(field.name as keyof CompanyType, e.target.value)
            }
          />
        )
      }
    </CGrid>
  );
};

export default CompanyGridData;
