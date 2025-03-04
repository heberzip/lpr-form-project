// EXTERNAL MODULES
import { FormState, UseFormRegister } from "react-hook-form";
// CUSTOM COMPONENTS
import { CGrid, CAutocomplete, CInput } from "@customs/.";
// STYLES
import { cInputSty, cAutocompleteSty } from "@styles/styleObjs";
// DATA
import positionsData from "@data/positionsData.json";
// TYPES
import { ContactSectionType, ContactType, PositionType } from "../../../types";

/******************************************************************************/
// TYPES
type ContactMainDataProps = {
  section: ContactSectionType;
  register: UseFormRegister<ContactType>;
  formState: FormState<ContactType>;
  handleInputChange: (name: keyof ContactType, value: string) => void;
  handleItemSelect: (selectedItem: PositionType) => void;
  filterFn: (item: PositionType, query: string) => boolean;
};
/******************************************************************************/

const ContactMainData = ({
  section,
  register,
  formState,
  handleInputChange,
  handleItemSelect,
  filterFn,
}: ContactMainDataProps) => {
  return (
    <CGrid data={section.formMainData || []}>
      {(field) =>
        field.role === "select" ? (
          <CAutocomplete // Renders the autocomplete component
            key={field.id}
            data={positionsData}
            filterFn={filterFn}
            onSelect={handleItemSelect}
            placeholder={field.placeholder}
            renderItem={(item) => item.position}
            type={field.type}
            label={field.label}
            required={field.required}
            additionalInfo={field.additionalInfo}
            sty={cAutocompleteSty}
            {...register(field.name as keyof ContactType)}
            error={formState.errors[field.name as keyof ContactType]?.message}
            onChange={(e) =>
              handleInputChange(field.name as keyof ContactType, e.target.value)
            }
          />
        ) : (
          <CInput // Renders the input component
            key={field.id}
            id={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            additionalInfo={field.additionalInfo}
            sty={cInputSty}
            {...register(field.name as keyof ContactType)}
            error={formState.errors[field.name as keyof ContactType]?.message}
            onChange={(e) =>
              handleInputChange(field.name as keyof ContactType, e.target.value)
            }
          />
        )
      }
    </CGrid>
  );
};

export default ContactMainData;
