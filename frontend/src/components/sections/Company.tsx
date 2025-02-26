// CUSTOM COMPONENTS
import { CAutocomplete, CSeparator, CInput, CGrid } from "@customs/.";

// CUSTOM HOOKS
import useSection from "@hooks/useSection";

// STYLES
import style from "@styles/global.style";

// DATA
import countriesData from "@data/countriesData.json";

/******************************************************************************/
// TYPES
type CountryType = {
  name: string;
  code: string;
};

/******************************************************************************/

const Company = () => {
  const section = useSection();

  const cInputSty = {
    container: style.input.container,
    label: style.input.label,
    required: style.input.required,
    input: style.input.standard,
  };

  const cGridSty = {
    ...cInputSty,
    gridContainer: style.grid.container,
  };

  const cAutocompleteSty = {
    ...cInputSty,
    dropdown: "bg-light border border-zip-gray-500 shadow-xl",
    dropdownItem: "hover:bg-zip-gray-500 p-2",
  };

  const filterFn = (item: CountryType, query: string) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  };

  const handleSelect = (selectedItem: CountryType) => {
    console.log(selectedItem);
  };

  return (
    <section id="company" className={style.section.grid}>
      <div className={style.section.leftCol}>
        <h3>{section?.title}</h3>
        <small>{section?.description}</small>
        <CSeparator />
      </div>

      <div className={style.section.rightCol}>
        <form className={style.form.container}>
          {section?.formMainData.map((field) => (
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
          ))}

          <CSeparator />

          <CGrid data={section?.formGridData || []} sty={cGridSty}>
            {(field) =>
              field.role === "select" ? (
                <CAutocomplete
                  key={field.id}
                  dataSelector={countriesData}
                  filterFn={filterFn}
                  onSelect={handleSelect}
                  placeholder={field.placeholder}
                  renderItem={(item) => item.name}
                  name={field.name}
                  label={field.label}
                  required={field.required}
                  additionalInfo={field.additionalInfo}
                  sty={cAutocompleteSty}
                />
              ) : null
            }
          </CGrid>
        </form>
        <CSeparator className="flex justify-center items-center w-full max-w-3xs mt-4 mb-3 md:hidden" />
        <CSeparator className="flex justify-center items-center w-full max-w-[90px] m-0 p-0 md:hidden" />
      </div>
    </section>
  );
};

export default Company;
