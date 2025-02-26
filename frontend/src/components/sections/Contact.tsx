// CUSTOM COMPONENTS
import { CSeparator, CInput, CAutocomplete } from "@customs/.";

// CUSTOM HOOKS
import useSection from "@hooks/useSection";

// STYLES
import style from "@styles/global.style";

// DATA
import positionsData from "@data/positionsData.json";

/******************************************************************************/
// TYPES
type PositionType = {
  id: number;
  position: string;
};

/******************************************************************************/

const Contact = () => {
  const section = useSection();

  const cInputSty = {
    container: style.input.container,
    label: style.input.label,
    required: style.input.required,
    input: style.input.standard,
  };

  const cAutocompleteSty = {
    ...cInputSty,
    dropdown: "bg-light border border-zip-gray-500 shadow-xl",
    dropdownItem: "hover:bg-zip-gray-500 p-2",
  };

  const filterFn = (item: PositionType, query: string) => {
    return item.position.toLowerCase().includes(query.toLowerCase());
  };

  const handleSelect = (selectedItem: PositionType) => {
    console.log(selectedItem);
  };

  return (
    <section id="contact" className={style.section.grid}>
      <div className={style.section.leftCol}>
        <h3>{section?.title}</h3>
        <small>{section?.description}</small>
        <CSeparator />
      </div>

      <div className={style.section.rightCol}>
        <form className={style.form.container}>
          {section?.formMainData.map((field) =>
            field.role === "select" ? (
              <CAutocomplete
                key={field.id}
                dataSelector={positionsData}
                filterFn={filterFn}
                onSelect={handleSelect}
                placeholder={field.placeholder}
                renderItem={(item) => {
                  if (!item || typeof item !== "object") return "";
                  return item.position || String(item);
                }}
                name={field.name}
                label={field.label}
                required={field.required}
                additionalInfo={field.additionalInfo}
                sty={cAutocompleteSty}
              />
            ) : (
              <CInput
                key={field.id}
                name={field.name}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                additionalInfo={field.additionalInfo}
                sty={cInputSty}
              />
            )
          )}
          <CSeparator />
        </form>
        <CSeparator className="flex justify-center items-center w-full max-w-3xs mt-4 mb-3 md:hidden" />
        <CSeparator className="flex justify-center items-center w-full max-w-[90px] m-0 p-0 md:hidden" />
      </div>
    </section>
  );
};

export default Contact;
